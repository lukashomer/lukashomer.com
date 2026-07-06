"use client";

import { useSyncExternalStore } from "react";
import { menuBar, type NavAction } from "@/data/projects";

/**
 * macOS menu bar, 1:1 from the Figma design (node 14:619): Apple logo,
 * bold app name, semibold menu items, SF-symbol status icons, live clock.
 * Persistent across views — Home / Linkedin / Mail are the working entries.
 */

const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

function subscribeClock(onChange: () => void) {
    const id = setInterval(onChange, 15_000);
    return () => clearInterval(id);
}

function formatMenuTime() {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Bratislava",
    })
        .format(new Date())
        .replace(/,/g, "");
}

export function MenuBar({ onAction }: { onAction: (action: NavAction) => void }) {
    const time = useSyncExternalStore(subscribeClock, formatMenuTime, () => "Mon Jun 10 9:41 AM");

    return (
        <header
            className="fixed inset-x-0 top-0 z-50"
            style={{ fontFamily: APPLE_FONT }}
        >
            {/* progressive blur backdrop, as in the design's masked blur frame */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[72px] backdrop-blur-[18px] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[72px] bg-white/15 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
            />

            <div className="relative flex items-center justify-between px-2.5 py-[5px]">
                <nav aria-label="Primary" className="flex items-center">
                    <span className="rounded-[4px] px-[11px] py-1 text-[13px] leading-4 font-bold text-black">
                        {menuBar.appName}
                    </span>
                    {menuBar.items.map((item, i) => {
                        // macOS menu highlight: blue with white text while pressed
                        const className = `rounded-[4px] px-[11px] py-1 text-[13px] leading-4 font-semibold text-black transition-colors duration-100 ease-linear hover:bg-black/5 active:bg-[#2962d9] active:text-white ${
                            i > 2 ? "hidden md:block" : "hidden sm:block"
                        }`;
                        return item.action.type === "link" ? (
                            <a
                                key={item.label}
                                href={item.action.href}
                                target={item.action.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noreferrer noopener"
                                className={className}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => onAction(item.action)}
                                className={`${className} ${item.action.type === "none" ? "cursor-default" : ""}`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="flex items-center text-black">
                    <span
                        className="rounded-[4px] px-[11px] py-1 text-[13px] leading-4 font-semibold whitespace-nowrap"
                        suppressHydrationWarning
                    >
                        {time}
                    </span>
                </div>
            </div>
        </header>
    );
}
