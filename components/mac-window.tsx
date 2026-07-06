"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";

export const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/**
 * Red / yellow / green window controls. Red closes, green zooms. Like real
 * macOS, hovering the group reveals the ×/−/+ symbols on all three lights.
 */
export function TrafficLights({
    onClose,
    onZoom,
}: {
    onClose: () => void;
    onZoom?: () => void;
}) {
    const symbolClass =
        "absolute inset-0 flex items-center justify-center text-black/55 opacity-0 transition-opacity duration-100 ease-linear group-hover/lights:opacity-100";

    return (
        <div className="group/lights flex items-center gap-2">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close window"
                className="relative size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset transition duration-100 ease-linear active:brightness-90"
            >
                <span className={symbolClass} aria-hidden="true">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
            <span
                aria-hidden="true"
                className="relative size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset"
            >
                <span className={symbolClass}>
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                        <path d="M1 3.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                </span>
            </span>
            <button
                type="button"
                onClick={onZoom}
                aria-label="Zoom window"
                className="relative size-3 rounded-full bg-[#1ac332] ring-1 ring-black/10 ring-inset transition duration-100 ease-linear active:brightness-90"
            >
                <span className={symbolClass} aria-hidden="true">
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                        <path d="M3.5 1v5M1 3.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
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
            className={`fixed z-[90] overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_30px_90px_-20px_rgba(0,0,0,0.4)] outline-none ${className}`}
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
