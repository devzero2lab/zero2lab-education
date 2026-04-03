import connectMongoDB from "@/lib/db";
import { PromoCode } from "@/models/promoCode";
import { NextResponse } from "next/server";

// GET — fetch all promo codes (admin only)
export async function GET() {
  try {
    await connectMongoDB();
    const codes = await PromoCode.find().sort({ createdAt: -1 });
    return NextResponse.json({ codes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — create a new promo code (admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const { code, discountPercent, description } = body;

    if (!code || !discountPercent) {
      return NextResponse.json(
        { error: "code and discountPercent are required." },
        { status: 400 }
      );
    }

    if (discountPercent < 1 || discountPercent > 100) {
      return NextResponse.json(
        { error: "discountPercent must be between 1 and 100." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const existing = await PromoCode.findOne({
      code: code.trim().toUpperCase(),
    });
    if (existing) {
      return NextResponse.json(
        { error: "A promo code with this code already exists." },
        { status: 409 }
      );
    }

    const newCode = await PromoCode.create({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      description: description?.trim() || "",
    });

    return NextResponse.json(
      { message: "Promo code created.", code: newCode },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating promo code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
