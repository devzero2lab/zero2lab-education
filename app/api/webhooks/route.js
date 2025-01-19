import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers:", {
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
    console.log("Webhook payload received:", JSON.stringify(payload, null, 2));

    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.error(
          "No email addresses provided in payload:",
          email_addresses
        );
        return NextResponse.json(
          { error: "Email addresses are missing in payload" },
          { status: 400 }
        );
      }

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
          firstName: first_name || "Unknown",
          lastName: last_name || "Unknown",
        };
        console.log("Creating user with data:", userData);

        const user = await createUser(userData);
        console.log("User created successfully:", user);

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
          }
        }

        return NextResponse.json({
          message: "User processed successfully",
          user,
        });
      } catch (error) {
        console.error("Detailed error in createUser:", error);
        return NextResponse.json(
          { error: "Database operation failed", details: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook verification error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed", details: error.message },
      { status: 400 }
    );
  }
}
