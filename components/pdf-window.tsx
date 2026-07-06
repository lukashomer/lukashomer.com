"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { resume } from "@/data/projects";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

/**
 * "lukashomercv.pdf" opened like macOS Preview: title bar with the
 * document name and a download action, the rendered page on Preview's
 * gray reading background.
 */
export function PdfWindow({ onClose }: { onClose: () => void }) {
    const [zoomed, setZoomed] = useState(false);
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    return (
        <MacWindowFrame
            label="lukashomercv.pdf — Preview"
            className={`top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col text-black ${
                zoomed ? "h-[94dvh] w-[96vw]" : "h-[min(820px,88dvh)] w-[min(700px,94vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            {/* Title bar */}
            <div
                className="relative flex shrink-0 items-center border-b border-black/[0.07] bg-[#f8f8f8] px-4 py-3"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <span onPointerDown={(e) => e.stopPropagation()}>
                    <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                </span>
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-black/85">
                    lukashomercv.pdf
                </span>
                <a
                    href={resume.pdf}
                    download
                    onPointerDown={(e) => e.stopPropagation()}
                    className="ml-auto flex h-7 items-center gap-1.5 rounded-full bg-white px-3 text-[12px] font-medium text-black/70 shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.1)] transition duration-100 ease-linear hover:text-black"
                >
                    <svg width="10" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1.5 10h8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Download
                </a>
            </div>

            {/* Preview reading area */}
            <div className="flex-1 overflow-y-auto bg-[#e8e8e8] p-5">
                <div className="mx-auto w-full max-w-[600px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                    <Image
                        src="/lukashomercv-preview.png"
                        alt="Lukáš Homér — CV"
                        width={794}
                        height={1123}
                        className="h-auto w-full"
                        priority
                    />
                </div>
            </div>
        </MacWindowFrame>
    );
}
