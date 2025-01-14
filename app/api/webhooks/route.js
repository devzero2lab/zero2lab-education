import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";

export async function POST(req) {
  // Validate environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Validate headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing required Svix headers" },
      { status: 400 }
    );
  }

  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Handle only user.created events
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      // Validate required data
      const email = email_addresses[0]?.email_address;
      if (!email) {
        return NextResponse.json(
          { error: "Invalid email address in payload" },
          { status: 400 }
        );
      }

      try {
        const user = await createUser({
          clerkId: id,
          email,
          firstName: first_name || "",
          lastName: last_name || "",
        });

        // Update Clerk metadata with database ID
        if (user?._id) {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: user._id.toString(),
            },
          });
        }

        return NextResponse.json({
          message: "User processed successfully",
          user,
        });
      } catch (error) {
        console.error("Error processing user:", error);
        return NextResponse.json(
          { error: "Database operation failed" },
          { status: 500 }
        );
      }
    }

    // Return success for other event types
    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
