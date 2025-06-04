import { users } from "@/lib/adminAppwrite";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, newPassword } = body;

    if (!userId || !newPassword) {
      return new Response(
        JSON.stringify({ error: "Missing userId or password" }),
        { status: 400 }
      );
    }

    await users.updatePassword(userId, newPassword);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return new Response(JSON.stringify({ error: "Failed to reset password" }), {
      status: 500,
    });
  }
}
