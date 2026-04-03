import connectMongoDB from "@/lib/db";
import { PromoCode } from "@/models/promoCode";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code, coursePrice } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Please enter a code" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Look up in DB — only active codes are valid
    const promo = await PromoCode.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
    });

    if (!promo) {
      return NextResponse.json({ valid: false, message: "Invalid promotion code" });
    }

    const discount = promo.discountPercent / 100;
    let discountedPrice = null;
    if (coursePrice && !isNaN(coursePrice)) {
      discountedPrice = Math.round(Number(coursePrice) * (1 - discount));
    }

    return NextResponse.json({
      valid: true,
      discountPercent: promo.discountPercent,
      discountedPrice,
    });
  } catch (error) {
    console.error("Promo validate error:", error);
    return NextResponse.json(
      { valid: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
