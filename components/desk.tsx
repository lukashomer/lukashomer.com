"use client";

import { Fragment } from "react";
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
 *   shadows   x1091.32 y783.96 / x1248.89 y780.99  w183.181 h94.437 rot −14.58°
 *   icons     aboutme x35 y157.95 · myworks x802.12 y60
 *             rejected x946.03 y107.95 · contacts x820.05 y226.95  (w125.949)
 */

const APPLE_FONT =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

/** One of the two blurred-ellipse ground shadows, geometry per Figma. */
function GroundShadow({ left, top }: { left: string; top: string }) {
    return (
        <div
            aria-hidden="true"
            className="absolute flex items-center justify-center"
            style={{ left, top, width: "39.265%", height: "11.392%" }}
        >
            <div className="relative flex-none rotate-[-14.58deg]" style={{ width: "95.964%", height: "54.916%" }}>
                <div className="absolute inset-[-38.56%_-11.38%]">
                    {/* Figma-exported SVG (gradient ellipse + gaussian blur); stretched like the original */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/objects/shadow.svg" alt="" className="block size-full max-w-none" />
                </div>
            </div>
        </div>
    );
}

export function Desk({
    onCharacterClick,
    onIconActivate,
}: {
    onCharacterClick: (trigger: HTMLElement | null) => void;
    onIconActivate: (action: NavAction, trigger: HTMLElement | null) => void;
}) {
    const reduced = useReducedMotion();

    const greeting = desk.greeting.map((segment, i) =>
        segment.bold ? (
            <strong key={i} className="font-bold">
                {segment.text}
            </strong>
        ) : (
            <Fragment key={i}>{segment.text}</Fragment>
        ),
    );

    const characterFigure = (
        <>
            {/* shadows sit behind the figure, tracking its box */}
            <GroundShadow left="17.645%" top="86.005%" />
            <GroundShadow left="51.42%" top="85.643%" />
            <span className="relative block">
                <Image
                    src={desk.character.src}
                    alt=""
                    width={desk.character.width}
                    height={desk.character.height}
                    priority
                    sizes="(max-width: 768px) 70vw, 31vw"
                    className="h-auto w-full [image-rendering:pixelated]"
                />
            </span>
        </>
    );

    return (
        <motion.section
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
                        <DesktopIcon item={item} order={i} onActivate={onIconActivate} />
                    </div>
                ))}
            </div>
            <div className="mx-auto mt-16 grid w-full max-w-[240px] grid-cols-2 gap-x-8 gap-y-6 px-4 md:hidden">
                {desktopIcons.map((item, i) => (
                    <DesktopIcon key={`m-${item.id}`} item={item} order={i} mobile onActivate={onIconActivate} />
                ))}
            </div>

            {/* Greeting — SF Pro, mixed regular/bold, exact Figma position */}
            <motion.p
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="px-6 pt-10 text-[26px] leading-[1.2] tracking-[0.02em] whitespace-pre-line text-black md:absolute md:left-[4.568%] md:top-[60.281%] md:px-0 md:pt-0 md:text-[3.8043vw] md:whitespace-pre"
            >
                {greeting}
            </motion.p>

            {/* Character (jaaj 1) with its two blurred ground shadows */}
            <motion.button
                type="button"
                aria-haspopup="dialog"
                aria-label={`${desk.character.alt} — open about`}
                onClick={(e) => onCharacterClick(e.currentTarget)}
                className="relative mx-auto mt-8 block w-[70%] max-w-[340px] md:absolute md:left-[66.733%] md:top-[7.235%] md:mx-0 md:mt-0 md:w-[30.855%] md:max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
                {characterFigure}
            </motion.button>

            {/* spacer so the mobile flow breathes at the bottom */}
            <div className="h-16 md:hidden" aria-hidden="true" />
        </motion.section>
    );
}
