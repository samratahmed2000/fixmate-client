import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { getMongoUserIdFilter } from "@/lib/auth/mongo-user-id";

const getCustomerSession = async (request: NextRequest) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return {
      response: NextResponse.json(
        { success: false, message: "Sign in to apply as a technician" },
        { status: 401 },
      ),
    };
  }
  if (session.user.role !== "customer") {
    return {
      response: NextResponse.json(
        { success: false, message: "Only customers can apply as technicians" },
        { status: 403 },
      ),
    };
  }
  return { user: session.user };
};

export async function GET(request: NextRequest) {
  try {
    const result = await getCustomerSession(request);
    if ("response" in result) return result.response;

    await mongoClient.connect();
    const user = await mongoClient
      .db("fixMate")
      .collection("user")
      .findOne(getMongoUserIdFilter(result.user.id), {
        projection: { technicianApplication: 1 },
      });

    return NextResponse.json({
      success: true,
      data: user?.technicianApplication ?? null,
    });
  } catch (error) {
    console.error("Failed to fetch technician application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application status" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await getCustomerSession(request);
    if ("response" in result) return result.response;

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid application details" },
        { status: 400 },
      );
    }

    const application = body as Record<string, unknown>;
    const category =
      typeof application.category === "string"
        ? application.category.trim()
        : "";
    const serviceArea =
      typeof application.serviceArea === "string"
        ? application.serviceArea.trim()
        : "";
    const bio = typeof application.bio === "string" ? application.bio.trim() : "";

    if (
      !category ||
      category.length > 100 ||
      !serviceArea ||
      serviceArea.length > 150 ||
      !bio ||
      bio.length > 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Choose a category and provide a service area and bio within the allowed lengths",
        },
        { status: 400 },
      );
    }

    await mongoClient.connect();
    const users = mongoClient.db("fixMate").collection("user");
    const submittedAt = new Date();
    const updateResult = await users.updateOne(
      {
        ...getMongoUserIdFilter(result.user.id),
        role: "customer",
        technicianApplication: { $exists: false },
      },
      {
        $set: {
          technicianApplication: {
            category,
            serviceArea,
            bio,
            status: "pending",
            submittedAt,
          },
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      const currentUser = await users.findOne(
        getMongoUserIdFilter(result.user.id),
        { projection: { role: 1 } },
      );
      if (!currentUser) {
        return NextResponse.json(
          { success: false, message: "User account not found" },
          { status: 404 },
        );
      }
      if (currentUser.role !== "customer") {
        return NextResponse.json(
          { success: false, message: "Only customers can apply as technicians" },
          { status: 403 },
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: "A technician application has already been submitted",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Technician application submitted for review",
        data: {
          category,
          serviceArea,
          bio,
          status: "pending",
          submittedAt: submittedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to submit technician application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit technician application" },
      { status: 500 },
    );
  }
}
