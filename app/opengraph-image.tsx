import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lukas — Product Designer & Engineer";

/**
 * OG image matching the live site: white macOS desktop, the greeting on the
 * left, the pixelated character on the right.
 */
export default async function OpenGraphImage() {
    const character = await readFile(join(process.cwd(), "public/objects/character.png"));
    const characterSrc = `data:image/png;base64,${character.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* menu bar hint */}
                <div
                    style={{
                        position: "absolute",
                        top: 22,
                        left: 40,
                        display: "flex",
                        fontSize: 20,
                        fontWeight: 700,
                    }}
                >
                    lukashomer.com
                </div>
                {/* greeting */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: 64,
                        width: 780,
                        fontSize: 52,
                        lineHeight: 1.25,
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <span>Hi,&nbsp;</span>
                        <span style={{ fontWeight: 700 }}>I’m Lukas.</span>
                    </div>
                    <div style={{ display: "flex" }}>I used to be a designer,</div>
                    <div style={{ display: "flex" }}>
                        <span>but now I’m&nbsp;</span>
                        <span style={{ fontWeight: 700 }}>a Design Engineer.</span>
                    </div>
                </div>
                {/* character */}
                <img
                    src={characterSrc}
                    alt=""
                    width={318}
                    height={565}
                    style={{ position: "absolute", right: 60, top: 40 }}
                />
            </div>
        ),
        size,
    );
}
