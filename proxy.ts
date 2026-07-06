import { NextResponse, type NextRequest } from "next/server";

const ACCESS_COOKIE = "lh-access";

/**
 * Soft password wall: page requests without the access cookie render the
 * /unlock screen (URL stays put). The password check lives in
 * /api/unlock, which sets the cookie. Static assets are not gated.
 */
export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname === "/unlock") return NextResponse.next();
    if (request.cookies.get(ACCESS_COOKIE)?.value === "granted") return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = "/unlock";
    return NextResponse.rewrite(url);
}

export const config = {
    // gate page routes only — skip api, next internals, meta images, and files
    matcher: ["/((?!api|_next|favicon.ico|icon|opengraph-image|.*\\..*).*)"],
};
