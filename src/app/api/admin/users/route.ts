import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";

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
