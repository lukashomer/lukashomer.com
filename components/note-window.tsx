"use client";

import { useRef, useState } from "react";
import { about } from "@/data/projects";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

/**
 * "aboutme" as a macOS Notes-style window: plain toolbar, centered date,
 * bold note title, and the positioning statement as the note body.
 */
export function NoteWindow({ onClose }: { onClose: () => void }) {
    const [zoomed, setZoomed] = useState(false);
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    return (
        <MacWindowFrame
            label="aboutme — Notes"
            className={`top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col text-black ${
                zoomed ? "h-[88dvh] w-[90vw]" : "w-[min(540px,92vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            {/* Notes toolbar */}
            <div
                className="flex items-center gap-3 border-b border-black/10 bg-[#f8f8f8] px-4 py-3"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <span onPointerDown={(e) => e.stopPropagation()}>
                    <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                </span>
                <span className="ml-1 text-[13px] font-semibold text-black/60">aboutme</span>
                <span className="ml-auto flex items-center gap-4 text-black/45" aria-hidden="true">
                    {/* checklist / compose glyphs, decorative */}
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M1.5 3.5l1.2 1.2 2-2.4M1.5 8.5l1.2 1.2 2-2.4M7 4h6.5M7 9h6.5M1.5 13.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M9.8 2.2l3 3L6 12l-3.6.6L3 9l6.8-6.8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>

            {/* Note body */}
            <div className="max-h-[64dvh] overflow-y-auto px-7 py-6">
                <p className="text-center text-[11px] text-black/40">June 10, 2025 at 9:41 AM</p>
                <h2 className="mt-3 text-[22px] leading-tight font-bold">aboutme</h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-black/80">{about.statement}</p>
                <ul className="mt-5 flex flex-col gap-1 text-[14.5px] leading-relaxed text-black/80">
                    {about.facts.map((fact) => (
                        <li key={fact.label}>
                            <span className="text-black/45">{fact.label}:</span> {fact.value}
                        </li>
                    ))}
                </ul>
                <p className="mt-5 text-[14.5px] text-black/80">— Lukáš</p>
            </div>
        </MacWindowFrame>
    );
}
