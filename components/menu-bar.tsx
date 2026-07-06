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

function AppleLogo() {
    return (
        <svg width="14" height="17" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
    );
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
                    <span className="flex h-6 w-[33px] items-center justify-center text-black">
                        <AppleLogo />
                    </span>
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
