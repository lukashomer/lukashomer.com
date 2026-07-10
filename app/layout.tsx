import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
    // Replace with the real domain before going live.
    metadataBase: new URL("https://lukashomer.com"),
    title: "Lukas — Product Designer & Engineer",
    description:
        "Lukáš Homér — senior product designer & design engineer. 17 years across product design, design systems, and front-end. Building AI tools for real estate at Elli & Sara, and e-commerce plugins at Plugdeck. Studio: moow s.r.o.",
    openGraph: {
        title: "Lukas — Product Designer & Engineer",
        description:
            "I design products, and then I build them. AI tools for real estate at Elli & Sara, e-commerce plugins at Plugdeck.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
            {/* Google tag (gtag.js) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-F5LPMQWTH0"
                strategy="beforeInteractive"
            />
            <Script id="google-analytics" strategy="beforeInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-F5LPMQWTH0');`}
            </Script>
        </html>
    );
}
