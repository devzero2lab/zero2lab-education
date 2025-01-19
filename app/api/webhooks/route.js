import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";
import { validateUserPayload } from "@/lib/validators/webhookValidator";

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
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  if (
    !svixHeaders["svix-id"] ||
    !svixHeaders["svix-timestamp"] ||
    !svixHeaders["svix-signature"]
  ) {
    return NextResponse.json(
      { error: "Missing required Svix headers" },
      { status: 400 }
    );
  }

  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const webhook = new Webhook(WEBHOOK_SECRET);
    const evt = webhook.verify(body, svixHeaders);

    // Handle only "user.created" events
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      // Validate payload structure and data
      const email = email_addresses?.[0]?.email_address;
      if (!validateUserPayload({ id, email, first_name, last_name })) {
        return NextResponse.json(
          { error: "Invalid payload structure or missing data" },
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

        if (user?._id) {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: user._id.toString(),
            },
          });
        }

        return NextResponse.json({
          message: "User created successfully",
          user,
        });
      } catch (error) {
        console.error("Error saving user to database:", error);
        return NextResponse.json(
          { error: "Database operation failed" },
          { status: 500 }
        );
      }
    }

    // Ignore other events but return success
    return NextResponse.json({ message: "Event ignored" });
  } catch (error) {
    console.error("Webhook verification or processing error:", error);
    return NextResponse.json(
      { error: "Invalid or unauthorized webhook" },
      { status: 400 }
    );
  }
}
