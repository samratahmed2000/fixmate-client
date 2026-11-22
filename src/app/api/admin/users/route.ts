import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth, mongoClient } from "@/lib/auth";
import { getMongoUserIdFilter } from "@/lib/auth/mongo-user-id";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    await mongoClient.connect();
    const users = await mongoClient
      .db("fixMate")
      .collection("user")
      .find(
        {
          role: { $ne: "admin" },
        },
        {
          projection: {
            _id: 1,
            name: 1,
            email: 1,
            image: 1,
            role: 1,
            createdAt: 1,
            technicianApplication: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .toArray();

    const data = users.map((user) => ({
      id: String(user._id),
      name: typeof user.name === "string" ? user.name : null,
      email: typeof user.email === "string" ? user.email : "",
      image: typeof user.image === "string" ? user.image : null,
      role:
        user.role === "technician" || user.role === "admin"
          ? user.role
          : "customer",
      createdAt:
        user.createdAt instanceof Date
          ? user.createdAt.toISOString()
          : user.createdAt
            ? new Date(user.createdAt).toISOString()
            : null,
      technicianApplication:
        user.technicianApplication &&
        typeof user.technicianApplication === "object"
          ? {
              category:
                typeof user.technicianApplication.category === "string"
                  ? user.technicianApplication.category
                  : "",
              serviceArea:
                typeof user.technicianApplication.serviceArea === "string"
                  ? user.technicianApplication.serviceArea
                  : "",
              bio:
                typeof user.technicianApplication.bio === "string"
                  ? user.technicianApplication.bio
                  : "",
              status:
                user.technicianApplication.status === "approved"
                  ? "approved"
                  : "pending",
              submittedAt:
                user.technicianApplication.submittedAt instanceof Date
                  ? user.technicianApplication.submittedAt.toISOString()
                  : user.technicianApplication.submittedAt
                    ? new Date(
                        user.technicianApplication.submittedAt,
                      ).toISOString()
                    : null,
            }
          : null,
    }));

    return NextResponse.json({
      success: true,
      message: "Users fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Failed to fetch admin users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    const body: unknown = await request.json().catch(() => null);
    const id =
      body && typeof body === "object" && "id" in body
        ? body.id
        : undefined;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    await mongoClient.connect();
    const users = mongoClient.db("fixMate").collection("user");
    const now = new Date();
    const updateResult = await users.updateOne(
      {
        ...getMongoUserIdFilter(id),
        role: "customer",
        "technicianApplication.status": "pending",
      },
      [
        {
          $set: {
            role: "technician",
            area: "$technicianApplication.serviceArea",
            bio: "$technicianApplication.bio",
            updatedAt: now,
            "technicianApplication.status": "approved",
            "technicianApplication.approvedAt": now,
          },
        },
      ],
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No pending technician application found for this customer",
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer approved as a technician",
    });
  } catch (error) {
    console.error("Failed to approve technician application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to approve technician application" },
      { status: 500 },
    );
  }
}
