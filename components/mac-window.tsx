"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";

export const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/**
 * Red / yellow / green window controls, matched to the real macOS values:
 * fills #FF5F57 / #FEBC2E / #28C840 with hue-matched hairline borders, and
 * hover reveals the glyphs in the dark shade of each hue — ×, −, and the
 * green fullscreen triangles (not a plus).
 */
export function TrafficLights({
    onClose,
    onZoom,
}: {
    onClose: () => void;
    onZoom?: () => void;
}) {
    const symbolClass =
        "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-100 ease-linear group-hover/lights:opacity-100";

    return (
        <div className="group/lights flex items-center gap-[9px]">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close window"
                className="relative size-3.5 rounded-full border-[0.5px] border-black/10 bg-[#ff736a] transition duration-100 ease-linear active:brightness-90"
            >
                <span className={`${symbolClass} text-[#750000]`} aria-hidden="true">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <path d="M1.1 1.1l3.8 3.8M4.9 1.1L1.1 4.9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
            <span
                aria-hidden="true"
                className="relative size-3.5 rounded-full border-[0.5px] border-black/10 bg-[#febc2e]"
            >
                <span className={`${symbolClass} text-[#995700]`}>
                    <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                        <path d="M0.5 1h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                </span>
            </span>
            <button
                type="button"
                onClick={onZoom}
                aria-label="Zoom window"
                className="relative size-3.5 rounded-full border-[0.5px] border-black/10 bg-[#19c332] transition duration-100 ease-linear active:brightness-90"
            >
                <span className={`${symbolClass} text-[#006500]`} aria-hidden="true">
                    {/* fullscreen triangles */}
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="currentColor">
                        <path d="M1 4.2V1h3.2L1 4.2z" />
                        <path d="M6 2.8V6H2.8L6 2.8z" />
                    </svg>
                </span>
            </button>
        </div>
    );
}

/**
 * Draggable macOS window frame: springs in, drags by its title-bar handle
 * (call `startDrag` from a pointer-down in the chrome), focuses itself so
 * ESC lands here, no backdrop — the desktop stays visible like real macOS.
 */
export function MacWindowFrame({
    label,
    className,
    children,
    startDragRef,
}: {
    label: string;
    className: string;
    children: ReactNode;
    startDragRef?: (start: (e: React.PointerEvent) => void) => void;
}) {
    const reduced = useReducedMotion();
    const controls = useDragControls();
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        frameRef.current?.focus();
    }, []);

    startDragRef?.((e) => controls.start(e));

    return (
        <motion.div
            ref={frameRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            drag
            dragControls={controls}
            dragListener={false}
            dragMomentum={false}
            className={`fixed z-[90] overflow-hidden rounded-[26px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.15),0_16px_48px_0_rgba(0,0,0,0.3)] outline-none ${className}`}
            style={{ fontFamily: APPLE_FONT }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={
                reduced
                    ? { opacity: 0, transition: { duration: 0.12 } }
                    : { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.16 } }
            }
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
        >
            {children}
        </motion.div>
    );
}
