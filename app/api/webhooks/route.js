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
    console.error("Missing headers:", {
      svix_id,
      svix_timestamp,
      svix_signature,
    });
    return NextResponse.json(
      { error: "Missing required Svix headers" },
      { status: 400 }
    );
  }

  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);
    console.log("Received webhook payload:", payload);

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
      console.log("Processing user data:", {
        id,
        email_addresses,
        first_name,
        last_name,
      });

      // Validate required data - Updated email extraction
      const email = email_addresses[0]?.emailAddress;
      if (!email) {
        console.error("Invalid email in payload:", email_addresses);
        return NextResponse.json(
          { error: "Invalid email address in payload" },
          { status: 400 }
        );
      }

      try {
        const userData = {
          clerkId: id,
          email,
          firstName: first_name || "",
          lastName: last_name || "",
        };
        console.log("Attempting to create user with data:", userData);

        const user = await createUser(userData);
        console.log("User created successfully:", user);

        // Update Clerk metadata with database ID
        if (user?._id) {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userId: user._id.toString(),
              },
            });
            console.log("Clerk metadata updated successfully");
          } catch (clerkError) {
            console.error("Error updating Clerk metadata:", clerkError);
            // Continue execution even if metadata update fails
          }
        }

        return NextResponse.json({
          message: "User processed successfully",
          user,
        });
      } catch (error) {
        console.error("Detailed error in createUser:", {
          message: error.message,
          stack: error.stack,
          code: error.code,
        });
        return NextResponse.json(
          {
            error: "Database operation failed",
            details: error.message,
            code: error.code,
          },
          { status: 500 }
        );
      }
    }

    // Return success for other event types
    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook verification error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Webhook verification failed", details: error.message },
      { status: 400 }
    );
  }
}
