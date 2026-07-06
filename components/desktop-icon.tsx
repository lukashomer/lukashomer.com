"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { DesktopIconDef } from "@/data/projects";

const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/**
 * One macOS desktop icon (126px icon + 19.65px label in the 1512 frame).
 * Sized by its wrapper; label scales with the frame via cqw-free vw units.
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

    return (
        <motion.button
            type="button"
            aria-haspopup={item.action.type === "overlay" ? "dialog" : undefined}
            aria-label={item.label}
            onClick={(e) => onActivate(item.action, e.currentTarget)}
            className="group flex w-full flex-col items-center focus-visible:outline-none"
            style={{ fontFamily: APPLE_FONT }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.15 + order * 0.06 }}
            whileHover={reduced ? undefined : { scale: 1.02 }}
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
                className={`-mt-0.5 rounded-[5px] px-1.5 leading-[1.3] font-medium tracking-[0.02em] text-black group-focus-visible:bg-[#2962d9] group-focus-visible:text-white ${
                    mobile ? "text-[13px]" : "text-[clamp(11px,1vw,15px)]"
                }`}
            >
                {item.label}
            </span>
        </motion.button>
    );
}
