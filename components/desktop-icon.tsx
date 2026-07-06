"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { DesktopIconDef } from "@/data/projects";
import { resume } from "@/data/projects";

const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/**
 * One macOS desktop icon (126px icon + 19.65px label in the 1512 frame).
 * The resume.pdf icon also gets a macOS context menu on right-click with
 * a download entry.
 */
export function DesktopIcon({
    item,
    order,
    mobile = false,
    onActivate,
}: {
    item: DesktopIconDef;
    order: number;
    mobile?: boolean;
    onActivate: (action: DesktopIconDef["action"], trigger: HTMLElement | null) => void;
}) {
    const reduced = useReducedMotion();
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
    const hasContextMenu = item.id === "resume";

    return (
        <>
            <motion.button
                type="button"
                aria-haspopup={item.action.type === "overlay" ? "dialog" : undefined}
                aria-label={item.label}
                onClick={(e) => onActivate(item.action, e.currentTarget)}
                onContextMenu={
                    hasContextMenu
                        ? (e) => {
                              e.preventDefault();
                              setMenu({ x: e.clientX, y: e.clientY });
                          }
                        : undefined
                }
                className="group flex w-full flex-col items-center focus-visible:outline-none"
                style={{ fontFamily: APPLE_FONT }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.15 + order * 0.06 }}
                whileHover={reduced || mobile ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
            >
                <span className="relative block aspect-square w-full">
                    <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes={mobile ? "96px" : "7vw"}
                        className="object-contain [image-rendering:pixelated]"
                    />
                </span>
                <span
                    // macOS desktop selection: label becomes a blue pill on focus
                    className={`-mt-0.5 rounded-[4px] px-1.5 leading-[1.3] font-medium tracking-[0.02em] text-black group-focus-visible:bg-[#2962d9] group-focus-visible:text-white ${
                        mobile ? "text-[13px]" : "text-[clamp(11px,1vw,15px)]"
                    }`}
                >
                    {item.label}
                </span>
            </motion.button>

            {/* macOS context menu */}
            {menu && (
                <>
                    <div
                        className="fixed inset-0 z-[120]"
                        onClick={() => setMenu(null)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setMenu(null);
                        }}
                        aria-hidden="true"
                    />
                    <div
                        role="menu"
                        className="fixed z-[121] min-w-44 rounded-[10px] border-[0.5px] border-black/15 bg-white/90 p-[5px] text-[13px] text-black/85 shadow-[0_10px_34px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                        style={{ left: menu.x, top: menu.y, fontFamily: APPLE_FONT }}
                    >
                        <button
                            type="button"
                            role="menuitem"
                            className="block w-full rounded-[6px] px-2.5 py-[3px] text-left hover:bg-[#2962d9] hover:text-white"
                            onClick={(e) => {
                                setMenu(null);
                                onActivate(item.action, e.currentTarget);
                            }}
                        >
                            Open
                        </button>
                        <a
                            role="menuitem"
                            href={resume.pdf}
                            download
                            className="block w-full rounded-[6px] px-2.5 py-[3px] text-left hover:bg-[#2962d9] hover:text-white"
                            onClick={() => setMenu(null)}
                        >
                            Download “{item.label}”
                        </a>
                    </div>
                </>
            )}
        </>
    );
}
