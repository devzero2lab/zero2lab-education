import connectMongoDB from "@/lib/db";
import { PromoCode } from "@/models/promoCode";
import { NextResponse } from "next/server";

// PUT — update a promo code (edit fields or toggle isActive)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectMongoDB();

    const updated = await PromoCode.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Promo code not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Promo code updated.", code: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating promo code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE — permanently remove a promo code
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const deleted = await PromoCode.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Promo code not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Promo code deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting promo code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
