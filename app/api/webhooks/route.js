import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Error: SIGNING_SECRET is not defined");
    return NextResponse.json({ error: "Please add SIGNING_SECRET from Clerk Dashboard to .env" }, { status: 400 });
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing Svix headers");
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Error: Verification error" }, { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    // Ensure email_addresses[0] exists and has a valid email
    const email = email_addresses[0]?.email_address;
    if (!email) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const user = {
      clerkId: id,
      email: email,
      firstName: first_name || "",
      lastName: last_name || "",
    };

    try {
      const newUser = await createUser(user);

      if (newUser) {
        if (clerkClient.users && typeof clerkClient.users.updateUserMetadata === "function") {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: newUser._id,
            },
          });
        } else {
          console.error("Error: Clerk client users API is not available");
        }

        return NextResponse.json({
          message: "New user created",
          user: newUser,
        });
      } else {
        return NextResponse.json({ error: "User not created" }, { status: 500 });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
  }

  console.log(`Received webhook with event type: ${eventType}`);
  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
