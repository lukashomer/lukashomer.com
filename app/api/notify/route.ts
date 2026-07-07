import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

/**
 * Stores notify-me submissions as private JSON blobs in the
 * lukashomer-notify store — one file per submission under notify/.
 */
export async function POST(request: Request) {
    const { email, project } = await request
        .json()
        .catch(() => ({ email: "", project: "" }) as { email: string; project: string });

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        return NextResponse.json({ ok: false }, { status: 400 });
    }

    const slug = String(project || "unknown").slice(0, 64);
    await put(
        `notify/${Date.now()}-${slug}.json`,
        JSON.stringify({ email, project: slug, date: new Date().toISOString() }),
        { access: "private", contentType: "application/json" },
    );

    return NextResponse.json({ ok: true });
}
