"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";
import { CanvasItem } from "@/components/canvas-item";
import { ProjectThumb } from "@/components/project-thumb";

const MOBILE_ASPECT: Record<Project["aspect"], string> = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
};

/**
 * The spatial field. Desktop (≥md): art-directed absolute composition with
 * drag physics. Mobile: the same items as a tight 2-col grid — no drag,
 * usability first. Both trees render; CSS decides which is visible.
 */
export function Canvas({
    items,
    sectionKey,
    topId,
    onDragStart,
    onOpen,
}: {
    items: Project[];
    sectionKey: string;
    topId: string | null;
    onDragStart: (id: string) => void;
    onOpen: (project: Project, trigger: HTMLElement | null) => void;
}) {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    return (
        <>
            {/* Desktop canvas */}
            <div
                ref={constraintsRef}
                className="relative hidden h-full w-full md:block"
            >
                <AnimatePresence>
                    {items.map((project, i) => (
                        <CanvasItem
                            key={`${sectionKey}-${project.id}`}
                            project={project}
                            order={i}
                            constraintsRef={constraintsRef}
                            isTop={topId === project.id}
                            onDragStart={onDragStart}
                            onOpen={onOpen}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Mobile grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 px-5 pt-28 pb-36 md:hidden">
                <AnimatePresence>
                    {items.map((project, i) => (
                        <motion.button
                            key={`m-${sectionKey}-${project.id}`}
                            type="button"
                            aria-haspopup="dialog"
                            className="group block text-left"
                            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ delay: 0.04 * i, duration: 0.3 }}
                            onClick={(e) => onOpen(project, e.currentTarget)}
                        >
                            <div
                                className={`relative overflow-hidden bg-paper shadow-[0_1px_2px_rgba(26,24,19,0.10),0_10px_28px_-14px_rgba(26,24,19,0.30)] ring-1 ring-line ${MOBILE_ASPECT[project.aspect]}`}
                                style={{ rotate: `${project.rotation * 0.5}deg` }}
                            >
                                <ProjectThumb
                                    project={project}
                                    src={project.images[0].src}
                                    alt={project.images[0].alt}
                                />
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-2 px-0.5">
                                <span className="font-mono text-[10px] text-ink-faint">
                                    {project.index}
                                </span>
                                <span className="text-micro font-medium text-ink-soft group-active:text-ink">
                                    {project.label}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
}
