import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: "LH" monogram on a dark rounded square. */
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#1a1a1a",
                    borderRadius: 7,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: -0.5,
                    fontFamily: "sans-serif",
                }}
            >
                LH
            </div>
        ),
        size,
    );
}
