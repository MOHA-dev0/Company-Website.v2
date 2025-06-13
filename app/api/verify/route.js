import { users } from "@/lib/adminAppwrite";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
      });
    }

    await users.updateEmailVerification(userId, true);

    return new Response(JSON.stringify({ message: "Account verified" }), {
      status: 200,
    });
  } catch (error) {
    console.error("POST /api/verify error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
