"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";

export const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/** Red / yellow / green window controls. Red closes, green zooms. */
export function TrafficLights({
    onClose,
    onZoom,
}: {
    onClose: () => void;
    onZoom?: () => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close window"
                className="size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset transition duration-100 ease-linear hover:brightness-90"
            />
            <span
                aria-hidden="true"
                className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset"
            />
            <button
                type="button"
                onClick={onZoom}
                aria-label="Zoom window"
                className="size-3 rounded-full bg-[#1ac332] ring-1 ring-black/10 ring-inset transition duration-100 ease-linear hover:brightness-90"
            />
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
            className={`fixed z-[90] overflow-hidden rounded-[26px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_30px_90px_-20px_rgba(0,0,0,0.4)] outline-none ${className}`}
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
