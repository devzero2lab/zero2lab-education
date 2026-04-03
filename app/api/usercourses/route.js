import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/course";
import { PromoCode } from "@/models/promoCode";
import { NextResponse } from "next/server";

// Create a UserCourse
export async function POST(request) {
  try {
    const userCourseData = await request.json();
    await connectMongoDB();

    // Check course exists and no duplicate enrollment — parallel
    const [existingCourse, existingEnrollment] = await Promise.all([
      Course.findById(userCourseData.courseId).select("_id price discountPrice"),
      UserCourse.findOne({
        userId: userCourseData.userId,
        courseId: userCourseData.courseId,
      }).select("_id"),
    ]);

    if (!existingCourse) {
      return NextResponse.json(
        { message: "Course does not exist." },
        { status: 404 }
      );
    }

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "You are already enrolled in this course" },
        { status: 400 }
      );
    }

    let basePrice = existingCourse.discountPrice > 0 ? existingCourse.discountPrice : existingCourse.price;
    let expectedFinalPrice = basePrice;
    let appliedPromoCode = null;

    if (userCourseData.promoCode) {
      const promo = await PromoCode.findOne({
        code: userCourseData.promoCode.trim().toUpperCase(),
        isActive: true,
      });

      if (!promo) {
        return NextResponse.json({ message: "Invalid or inactive promotion code" }, { status: 400 });
      }

      expectedFinalPrice = Math.round(basePrice * (1 - promo.discountPercent / 100));
      appliedPromoCode = promo.code;

      // Increment usage count (fire-and-forget, don't block enrollment)
      PromoCode.findByIdAndUpdate(promo._id, { $inc: { usageCount: 1 } }).exec();
    }

    const newUserCourse = await UserCourse.create({
      ...userCourseData,
      promoCode: appliedPromoCode,
      finalPrice: expectedFinalPrice,
    });
    return NextResponse.json(
      { message: "UserCourse created", newUserCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating UserCourse:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all UserCourses or filter by userId
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const action = searchParams.get("action");

    if (!userId) {
      return NextResponse.json({ userCourses: [] }, { status: 200 });
    }

    await connectMongoDB();

    if (action === "count") {
      // ✅ 2 countDocuments queries → 1 aggregation query
      const counts = await UserCourse.aggregate([
        { $match: { userId, status: { $in: ["Approved", "Completed"] } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]);

      const approvedCount = counts.find((c) => c._id === "Approved")?.count || 0;
      const completedCount = counts.find((c) => c._id === "Completed")?.count || 0;

      return NextResponse.json(
        { approvedCount, completedCount },
        { status: 200 }
      );
    }

    // ✅ Lightweight enrollment check — single indexed lookup, no populate
    if (action === "check") {
      const courseId = searchParams.get("courseId");
      if (!courseId) {
        return NextResponse.json({ error: "courseId is required" }, { status: 400 });
      }
      const enrollment = await UserCourse.findOne({ userId, courseId }).select("_id status");
      return NextResponse.json(
        { isEnrolled: !!enrollment, status: enrollment?.status || null },
        { status: 200 }
      );
    }

    const userCourses = await UserCourse.find({ userId }).populate("courseId");
    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}