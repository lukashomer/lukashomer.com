"use client";

import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectThumb } from "@/components/project-thumb";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

/**
 * Project detail as a macOS preview window: title-bar with traffic lights
 * and a centered document title, white body, kit label colors, blue links.
 * Draggable by the title bar; red light / ESC / Back close it.
 */
export function ProjectOverlay({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const [zoomed, setZoomed] = useState(false);
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    return (
        <MacWindowFrame
            label={`${project.title} — preview`}
            className={`top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col text-black ${
                zoomed ? "h-[92dvh] w-[96vw]" : "max-h-[86dvh] w-[min(720px,94vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            {/* Title bar */}
            <div
                className="relative flex shrink-0 items-center border-b border-black/10 px-4 py-3"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <span onPointerDown={(e) => e.stopPropagation()}>
                    <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                </span>
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-black/85">
                    {project.slug}
                </span>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-7 py-6">
                <p className="text-[11px] font-semibold text-black/40">
                    {project.index} · {project.section === "work" ? "myworks" : "ideas"}
                </p>
                <h2 className="mt-1.5 text-[22px] leading-tight font-bold text-black/85">
                    {project.title}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-black/60">
                    {project.description}
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-5 border-t border-black/10 pt-5 sm:grid-cols-2">
                    <div>
                        <dt className="text-[11px] font-semibold text-black/40">Role</dt>
                        <dd className="mt-1 text-[13px] leading-relaxed text-black/80">
                            {project.role}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[11px] font-semibold text-black/40">Stack</dt>
                        <dd className="mt-1.5 flex flex-wrap gap-1.5">
                            {project.stack.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full bg-black/[0.06] px-2.5 py-0.5 text-[12px] text-black/70"
                                >
                                    {item}
                                </span>
                            ))}
                        </dd>
                    </div>
                </dl>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {project.images.slice(0, 4).map((image, i) => (
                        <div
                            key={image.src}
                            className={`relative overflow-hidden rounded-[8px] ring-1 ring-black/10 ${
                                i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                            }`}
                        >
                            <ProjectThumb
                                project={project}
                                src={image.src}
                                alt={image.alt}
                                sizes="(max-width: 768px) 100vw, 720px"
                            />
                        </div>
                    ))}
                </div>

                {project.link && (
                    <a
                        href={project.link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2962d9] hover:underline"
                    >
                        {project.link.label}
                        <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M1.5 9.5l8-8M3.5 1.5h6v6" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </a>
                )}
            </div>
        </MacWindowFrame>
    );
}
