import { NextResponse } from "next/server";

// Override in production via the SITE_PASSWORD env var if needed.
const PASSWORD = process.env.SITE_PASSWORD ?? "heslokreslo";

export async function POST(request: Request) {
    const { password } = await request
        .json()
        .catch(() => ({ password: "" }) as { password: string });

    if (password !== PASSWORD) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("lh-access", "granted", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
    return response;
}
