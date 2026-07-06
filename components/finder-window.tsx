"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

/**
 * "myworks" as a macOS 26 Finder window — styled after the Liquid Glass
 * community library (floating inset sidebar, glass toolbar pills, 26px
 * window radius). Clicking a row opens the project detail overlay.
 */

type Section = "work" | "ideas";

const SECTION_LABELS: Record<Section, string> = { work: "myworks", ideas: "ideas" };

// Deterministic Finder-style metadata per row (no real dates in project data).
function rowMeta(index: number) {
    const minutes = String((17 * (index + 3)) % 60).padStart(2, "0");
    const hour = 9 + (index % 3);
    return {
        date: `Apr 1, 2025 at ${hour}:${minutes} AM`,
        size: `${13 + index * 7} MB`,
    };
}

function FolderGlyph({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 14" fill="none" className={className} aria-hidden="true">
            <path
                d="M1.5 3.2c0-.9.7-1.7 1.7-1.7h3l1.4 1.6h5.2c.9 0 1.7.8 1.7 1.7v6c0 .9-.8 1.7-1.7 1.7H3.2c-1 0-1.7-.8-1.7-1.7v-7.6z"
                stroke="currentColor"
                strokeWidth="1.3"
            />
        </svg>
    );
}

const TOOL_GLYPHS = [
    // new folder
    <svg key="nf" width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
        <path d="M1.5 3.2c0-.9.7-1.7 1.7-1.7h3l1.4 1.6h5.2c.9 0 1.7.8 1.7 1.7v6c0 .9-.8 1.7-1.7 1.7H3.2c-1 0-1.7-.8-1.7-1.7v-7.6z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 6v4M6 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    // trash
    <svg key="tr" width="14" height="15" viewBox="0 0 14 15" fill="none" aria-hidden="true">
        <path d="M1.5 3.5h11M5.5 3V1.8c0-.4.3-.8.8-.8h1.4c.5 0 .8.4.8.8V3M3 3.5l.7 9c.05.7.6 1.2 1.3 1.2h4c.7 0 1.25-.5 1.3-1.2l.7-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.5 6v5M8.5 6v5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>,
    // archive box
    <svg key="ar" width="15" height="14" viewBox="0 0 15 14" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="12" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.5 5v6c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5V5M5.8 7.5h3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
    // tag
    <svg key="tg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M1.5 6.5v-4c0-.6.4-1 1-1h4c.3 0 .5.1.7.3l6 6c.4.4.4 1 0 1.4l-4 4c-.4.4-1 .4-1.4 0l-6-6a1 1 0 01-.3-.7z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
    </svg>,
];

export function FinderWindow({
    initialSection,
    onClose,
    onOpenProject,
}: {
    initialSection: Section;
    onClose: () => void;
    onOpenProject: (project: Project, trigger: HTMLElement | null) => void;
}) {
    const [section, setSection] = useState<Section>(initialSection);
    const [selected, setSelected] = useState<string | null>(null);
    const [zoomed, setZoomed] = useState(false);
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    const rows = projects.filter((p) => p.section === section);

    return (
        <MacWindowFrame
            label={`${SECTION_LABELS[section]} — Finder`}
            className={`top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 text-[13px] text-black ${
                zoomed
                    ? "h-[92dvh] w-[96vw]"
                    : "h-[min(696px,82dvh)] w-[min(996px,94vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            {/* Floating inset sidebar (Liquid Glass style) */}
            <aside
                className="hidden shrink-0 p-3 pr-0 sm:block"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <div className="flex h-full w-[208px] flex-col rounded-[10px] bg-[#f8f8f8] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_4px_18px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-between px-4 pt-4 pb-5">
                        <span onPointerDown={(e) => e.stopPropagation()}>
                            <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                        </span>
                        {/* sidebar toggle glyph */}
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" className="text-black/45" aria-hidden="true">
                            <rect x="1" y="1" width="15" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M6.5 1v12" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                    </div>
                    <nav aria-label="Sections" className="flex flex-col gap-0.5 px-2.5">
                        <p className="px-2 pb-1 text-[11px] font-semibold text-black/40">Projects</p>
                        {(["work", "ideas"] as const).map((id) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setSection(id)}
                                onPointerDown={(e) => e.stopPropagation()}
                                aria-current={section === id ? "true" : undefined}
                                className={`flex items-center gap-2 rounded-[6px] px-2 py-1 text-left transition-colors duration-100 ease-linear ${
                                    section === id ? "bg-black/10" : "hover:bg-black/5"
                                }`}
                            >
                                <FolderGlyph className={`h-3.5 w-4 ${section === id ? "text-[#2962d9]" : "text-black/50"}`} />
                                {SECTION_LABELS[id]}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Content column */}
            <div className="flex min-w-0 flex-1 flex-col bg-white">
                {/* Toolbar */}
                <div
                    className="flex items-center gap-2.5 px-4 py-3"
                    onPointerDown={(e) => startDrag.current(e)}
                >
                    <div className="flex items-center sm:hidden" onPointerDown={(e) => e.stopPropagation()}>
                        <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        onPointerDown={(e) => e.stopPropagation()}
                        aria-label="Back to desktop"
                        className="flex size-8 items-center justify-center rounded-[6px] text-black/75 transition-colors duration-100 ease-linear hover:bg-black/5 hover:text-black"
                    >
                        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
                            <path d="M7.5 1.5l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="flex size-8 items-center justify-center text-black/25" aria-hidden="true">
                        <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                            <path d="M1.5 1.5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <h2 className="ml-1 text-[15px] font-bold">{SECTION_LABELS[section]}</h2>

                    <div className="ml-auto flex items-center gap-2.5">
                        {/* glass tool pill */}
                        <div
                            className="hidden items-center rounded-[8px] bg-white px-1 py-1 text-black/60 shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.1)] lg:flex"
                            aria-hidden="true"
                        >
                            {TOOL_GLYPHS.map((glyph, i) => (
                                <span key={i} className="px-2.5 py-0.5">
                                    {glyph}
                                </span>
                            ))}
                        </div>
                        {/* compose button */}
                        <span
                            className="hidden size-8 items-center justify-center rounded-[8px] bg-white text-black/60 shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.1)] lg:flex"
                            aria-hidden="true"
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M9.8 2.2l3 3L6 12l-3.6.6L3 9l6.8-6.8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                        </span>
                        {/* search pill */}
                        <div className="hidden h-8 w-44 items-center gap-1.5 rounded-[8px] bg-[#eeeeee] px-2.5 text-black/40 md:flex">
                            <svg width="12" height="12" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <circle cx="6.5" cy="6.5" r="4.6" stroke="currentColor" strokeWidth="1.4" />
                                <path d="M10 10l3.4 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            Search
                        </div>
                    </div>
                </div>

                {/* Column headers */}
                <div className="flex items-center gap-3 border-b border-black/10 px-4 pb-1 text-[11px] text-black/45">
                    <span className="min-w-0 flex-1 pl-6">Name</span>
                    <span className="w-[176px] shrink-0 font-semibold text-black/60">
                        Date Modified <span aria-hidden="true">⌄</span>
                    </span>
                    <span className="w-[72px] shrink-0">Size</span>
                    <span className="hidden w-[72px] shrink-0 sm:block">Kind</span>
                </div>

                {/* Rows */}
                <ul className="flex-1 overflow-y-auto px-1.5 py-1.5" role="list">
                    {rows.map((project, i) => {
                        const meta = rowMeta(i);
                        const isSelected = selected === project.slug;
                        return (
                            <li key={project.id}>
                                <button
                                    type="button"
                                    aria-haspopup="dialog"
                                    onClick={(e) => {
                                        setSelected(project.slug);
                                        onOpenProject(project, e.currentTarget);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-[5px] px-2.5 py-[3px] text-left transition-colors duration-100 ease-linear ${
                                        isSelected
                                            ? "bg-[#2962d9] text-white"
                                            : i % 2 === 0
                                              ? "bg-[#f7f7f7] hover:bg-black/10"
                                              : "hover:bg-black/10"
                                    }`}
                                >
                                    <span className="flex min-w-0 flex-1 items-center gap-2">
                                        <span
                                            aria-hidden="true"
                                            className={isSelected ? "text-white/80" : "text-black/30"}
                                        >
                                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                                                <path d="M1 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <Image
                                            src="/desktop/myworks.png"
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="size-4 object-contain [image-rendering:pixelated]"
                                        />
                                        <span className="truncate">{project.title}</span>
                                    </span>
                                    <span className={`w-[176px] shrink-0 ${isSelected ? "text-white/85" : "text-black/55"}`}>
                                        {meta.date}
                                    </span>
                                    <span className={`w-[72px] shrink-0 ${isSelected ? "text-white/85" : "text-black/55"}`}>
                                        {meta.size}
                                    </span>
                                    <span className={`hidden w-[72px] shrink-0 sm:block ${isSelected ? "text-white/85" : "text-black/55"}`}>
                                        Folder
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </MacWindowFrame>
    );
}
