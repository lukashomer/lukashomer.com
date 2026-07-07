"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { desk, desktopIcons, type NavAction } from "@/data/projects";
import { DesktopIcon } from "@/components/desktop-icon";

/**
 * The landing — exactly 1:1 with the Figma "MacBook Pro 14'" frame
 * (node 12:2, 1512×982). Every position/size below is the Figma value
 * mapped to a percentage of the frame, so it is pixel-true at 1512×982
 * and stays proportional at other viewport sizes.
 *
 *   greeting  x69.07  y591.96  (57.521px SF Pro Text, tracking 1.1504)
 *   jaaj 1    x1009   y71.05   w466.53 h828.947
 *   icons     aboutme x35 y157.95 · myworks x802.12 y60
 *             rejected x946.03 y107.95 · contacts x820.05 y226.95  (w125.949)
 */

const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

export function Desk({
    onCharacterClick,
    onIconActivate,
}: {
    onCharacterClick: (trigger: HTMLElement | null) => void;
    onIconActivate: (action: NavAction, trigger: HTMLElement | null) => void;
}) {
    const reduced = useReducedMotion();
    const constraintsRef = useRef<HTMLElement | null>(null);
    const charDragging = useRef(false);

    // Greeting split into lines/words for the keynote-style staggered reveal.
    const greetingLines = (() => {
        const lines: { text: string; bold: boolean }[][] = [[]];
        for (const segment of desk.greeting) {
            segment.text.split("\n").forEach((part, pi) => {
                if (pi > 0) lines.push([]);
                for (const word of part.split(" ")) {
                    if (word) lines[lines.length - 1].push({ text: word, bold: !!segment.bold });
                }
            });
        }
        return lines;
    })();
    let wordIndex = 0;

    const characterFigure = (
        <>
            <span className="relative block">
                <Image
                    src={desk.character.src}
                    alt=""
                    width={desk.character.width}
                    height={desk.character.height}
                    priority
                    sizes="(max-width: 768px) 70vw, 31vw"
                    draggable={false}
                    className="h-auto w-full [image-rendering:pixelated]"
                />
            </span>
        </>
    );

    return (
        <motion.section
            ref={constraintsRef}
            aria-label="Desktop"
            className="relative min-h-full md:h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            style={{ fontFamily: APPLE_FONT }}
        >
            {/* Desktop icons */}
            <div className="hidden md:block">
                {desktopIcons.map((item, i) => (
                    <div
                        key={item.id}
                        // icons shrunk from the Figma 8.33% to 5.8%, kept centered on their spots
                        className="absolute w-[5.8%]"
                        style={{
                            left: `calc(${item.position.x}% + 1.265%)`,
                            top: `calc(${item.position.y}% + 0.6%)`,
                        }}
                    >
                        <DesktopIcon item={item} order={i} constraintsRef={constraintsRef} onActivate={onIconActivate} />
                    </div>
                ))}
            </div>
            <div className="mx-auto mt-16 grid w-full max-w-[240px] grid-cols-2 gap-x-8 gap-y-6 px-4 md:hidden">
                {desktopIcons.map((item, i) => (
                    <DesktopIcon key={`m-${item.id}`} item={item} order={i} mobile onActivate={onIconActivate} />
                ))}
            </div>

            {/* Greeting — SF Pro, exact Figma position, word-by-word reveal */}
            <h1 className="px-6 pt-10 text-[26px] leading-[1.2] font-normal tracking-[0.02em] text-black md:absolute md:left-[4.568%] md:top-[60.281%] md:px-0 md:pt-0 md:text-[3.8043vw]">
                {greetingLines.map((line, li) => (
                    <span key={li} className="block">
                        {line.map((word, wi) => {
                            const delay = 0.2 + wordIndex++ * 0.055;
                            return (
                                <Fragment key={wi}>
                                    <motion.span
                                        className={`inline-block ${word.bold ? "font-bold" : ""}`}
                                        initial={
                                            reduced
                                                ? { opacity: 0 }
                                                : { opacity: 0, y: 14, filter: "blur(8px)" }
                                        }
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.55,
                                            ease: [0.2, 0.6, 0.2, 1],
                                            delay,
                                        }}
                                    >
                                        {word.text}
                                    </motion.span>{" "}
                                </Fragment>
                            );
                        })}
                    </span>
                ))}
            </h1>

            {/* Character (jaaj 1) */}
            <motion.div
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${desk.character.alt} — open about`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onCharacterClick(e.currentTarget);
                    }
                }}
                drag
                dragConstraints={constraintsRef}
                dragMomentum={false}
                onDragStart={() => (charDragging.current = true)}
                onDragEnd={() => setTimeout(() => (charDragging.current = false), 0)}
                onTap={(e) => {
                    if (charDragging.current) return;
                    onCharacterClick(e.currentTarget as HTMLElement | null);
                }}
                className="relative mx-auto mt-8 block w-[70%] max-w-[340px] cursor-grab select-none active:cursor-grabbing md:absolute md:left-[66.733%] md:top-[7.235%] md:mx-0 md:mt-0 md:w-[30.855%] md:max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
                {characterFigure}
            </motion.div>

            {/* spacer so the mobile flow breathes at the bottom */}
            <div className="h-16 md:hidden" aria-hidden="true" />
        </motion.section>
    );
}
