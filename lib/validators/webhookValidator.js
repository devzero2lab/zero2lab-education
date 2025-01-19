export function validateUserPayload({ id, email, first_name, last_name }) {
  if (!id || typeof id !== "string") return false;
  if (!email || typeof email !== "string" || !email.includes("@")) return false;
  if (first_name && typeof first_name !== "string") return false;
  if (last_name && typeof last_name !== "string") return false;

  return true;
}
