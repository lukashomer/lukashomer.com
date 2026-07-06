"use client";

import { useRef, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectThumb } from "@/components/project-thumb";

const SIZE_CLASSES: Record<Project["size"], string> = {
    lg: "w-[220px] lg:w-[280px]",
    md: "w-[180px] lg:w-[224px]",
    sm: "w-[140px] lg:w-[168px]",
};

const ASPECT_CLASSES: Record<Project["aspect"], string> = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
};

export function CanvasItem({
    project,
    order,
    constraintsRef,
    isTop,
    onDragStart,
    onOpen,
}: {
    project: Project;
    order: number;
    constraintsRef: RefObject<HTMLDivElement | null>;
    isTop: boolean;
    onDragStart: (id: string) => void;
    onOpen: (project: Project, trigger: HTMLElement | null) => void;
}) {
    const reduced = useReducedMotion();
    const triggerRef = useRef<HTMLDivElement>(null);
    // Deterministic float phase per item — never random, no hydration drift.
    const floatDuration = 6 + (order % 4) * 0.9;
    const floatDelay = (order * 0.37) % 2;

    const open = () => onOpen(project, triggerRef.current);

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${project.position.x}%`,
                top: `${project.position.y}%`,
                x: "-50%",
                y: "-50%",
                zIndex: isTop ? 20 : undefined,
            }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, marginTop: 20, scale: 0.97 }}
            animate={
                reduced
                    ? { opacity: 1 }
                    : { opacity: 1, marginTop: 0, scale: 1 }
            }
            exit={
                reduced
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : { opacity: 0, scale: 0.96, transition: { duration: 0.18, delay: order * 0.02 } }
            }
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                delay: 0.08 + order * 0.05,
            }}
        >
            <motion.div
                ref={triggerRef}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${project.title} — open project details`}
                className={`group block cursor-grab touch-none select-none active:cursor-grabbing ${SIZE_CLASSES[project.size]}`}
                drag
                dragConstraints={constraintsRef}
                dragMomentum
                dragElastic={0.12}
                dragTransition={{ power: 0.16, timeConstant: 180 }}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileDrag={reduced ? undefined : { scale: 1.06 }}
                onDragStart={() => onDragStart(project.id)}
                onTap={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open();
                    }
                }}
            >
                <motion.div
                    animate={reduced ? undefined : { y: [0, -2.5, 0, 2.5, 0] }}
                    transition={
                        reduced
                            ? undefined
                            : {
                                  duration: floatDuration,
                                  delay: floatDelay,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                              }
                    }
                    style={{ rotate: project.rotation }}
                >
                    <div
                        className={`relative overflow-hidden bg-paper shadow-[0_1px_2px_rgba(26,24,19,0.10),0_10px_28px_-14px_rgba(26,24,19,0.30)] ring-1 ring-line transition-shadow duration-100 ease-linear group-hover:shadow-[0_2px_4px_rgba(26,24,19,0.10),0_18px_40px_-16px_rgba(26,24,19,0.40)] group-active:shadow-[0_4px_8px_rgba(26,24,19,0.12),0_28px_56px_-18px_rgba(26,24,19,0.45)] ${ASPECT_CLASSES[project.aspect]}`}
                    >
                        <ProjectThumb
                            project={project}
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                        />
                    </div>
                    <div className="mt-2.5 flex items-baseline gap-2 px-0.5">
                        <span className="font-mono text-[10px] text-ink-faint transition-colors duration-100 ease-linear group-hover:text-accent">
                            {project.index}
                        </span>
                        <span className="text-micro font-medium text-ink-soft transition-colors duration-100 ease-linear group-hover:text-ink">
                            {project.label}
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
