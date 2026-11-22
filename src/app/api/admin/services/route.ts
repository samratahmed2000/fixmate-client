import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth, mongoClient } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    await mongoClient.connect();
    const status = request.nextUrl.searchParams.get("status") || "pending";
    const normalizedStatus =
      status === "all" ||
      status === "approved" ||
      status === "rejected"
        ? status
        : "pending";
    const serviceCollection = mongoClient.db("fixMate").collection("services");
    const services =
      normalizedStatus === "all"
        ? await serviceCollection
            .aggregate([
              {
                $addFields: {
                  approvalOrder: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $eq: [
                              { $toLower: { $ifNull: ["$approvalStatus", "pending"] } },
                              "pending",
                            ],
                          },
                          then: 0,
                        },
                        {
                          case: {
                            $eq: [
                              { $toLower: "$approvalStatus" },
                              "approved",
                            ],
                          },
                          then: 1,
                        },
                      ],
                      default: 2,
                    },
                  },
                },
              },
              { $sort: { approvalOrder: 1, createdAt: 1, _id: 1 } },
              { $project: { approvalOrder: 0 } },
            ])
            .toArray()
        : await serviceCollection
            .find({
              approvalStatus: {
                $regex: `^${normalizedStatus}$`,
                $options: "i",
              },
            })
            .sort(
              normalizedStatus === "pending"
                ? { createdAt: 1, _id: 1 }
                : { updatedAt: -1, createdAt: -1, _id: -1 },
            )
            .toArray();

    return NextResponse.json({
      success: true,
      message: "Admin services fetched successfully",
      data: services.map((service) => ({
        ...service,
        _id: String(service._id),
        approvalStatus:
          String(service.approvalStatus || "Pending").toLowerCase() === "approved"
            ? "Approved"
            : String(service.approvalStatus || "Pending").toLowerCase() === "rejected"
              ? "Rejected"
              : "Pending",
      })),
    });
  } catch (error) {
    console.error("Failed to fetch admin services:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
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

    const { id, approvalStatus } = await request.json();
    if (!ObjectId.isValid(id) || !["Approved", "Rejected"].includes(approvalStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid approval request" },
        { status: 400 },
      );
    }

    await mongoClient.connect();
    const isApproved = approvalStatus === "Approved";
    const result = await mongoClient
      .db("fixMate")
      .collection("services")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            approvalStatus,
            isActive: isApproved,
            availability: isApproved ? "Active" : "Not-Active",
            approvedAt: isApproved ? new Date() : null,
            rejectedAt: isApproved ? null : new Date(),
            updatedAt: new Date(),
          },
        },
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Service ${approvalStatus.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Failed to update admin service approval:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service approval" },
      { status: 500 },
    );
  }
}
