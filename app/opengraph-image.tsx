import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lukas — Product Designer & Engineer";

// OG placeholder — same design language as the site. Replace with a real
// capture of the canvas whenever you like; this ships zero binary assets.
export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 64,
                    backgroundColor: "#f1efea",
                    color: "#1a1813",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 22,
                        letterSpacing: 3,
                        color: "#6e6a60",
                    }}
                >
                    <span>LUKÁŠ HOMÉR — MOOW S.R.O.</span>
                    <span>BRATISLAVA, SK</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ width: 48, height: 48, backgroundColor: "#ff4a00" }} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 32,
                            fontSize: 76,
                            fontWeight: 600,
                            letterSpacing: -2,
                            lineHeight: 1.05,
                        }}
                    >
                        <span>Product Designer</span>
                        <span>&amp; Engineer</span>
                    </div>
                    <div style={{ marginTop: 28, fontSize: 26, color: "#6e6a60" }}>
                        I design products, and then I build them.
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
