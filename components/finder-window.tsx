"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

/**
 * "myworks" as a macOS Finder window — exact rebuild of Figma node 15:1853:
 * 26px window, glass sidebar panel (18px, 240px column), liquid-glass pill
 * controls (segmented back/forward, tool group, compose, search), 20px list
 * rows with the design's document icon and #2962d9 selection.
 */

type Section = "work" | "ideas";

const SECTION_LABELS: Record<Section, string> = { work: "myworks", ideas: "ideas" };

// Sizes stay playful; dates come from the data file (real project timeline).
function rowSize(index: number) {
    return `${13 + index * 7} MB`;
}

/** Liquid-glass pill: #f7f7f7 fill + the kit's soft 40px shadow. */
function GlassPill({ className = "", children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={`relative flex items-center rounded-full bg-[#f7f7f7] shadow-[0_0_0_0.5px_rgba(0,0,0,0.06),0_8px_40px_0_rgba(0,0,0,0.12)] ${className}`}
        >
            {children}
        </div>
    );
}

const GLYPH = {
    folder: (className = "", strokeWidth = 1.3) => (
        <svg viewBox="0 0 16 14" fill="none" className={className} aria-hidden="true">
            <path
                d="M1.5 3.2c0-.9.7-1.7 1.7-1.7h3l1.4 1.6h5.2c.9 0 1.7.8 1.7 1.7v6c0 .9-.8 1.7-1.7 1.7H3.2c-1 0-1.7-.8-1.7-1.7v-7.6z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
        </svg>
    ),
    trash: (
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" aria-hidden="true">
            <path d="M1.5 3.5h11M5.5 3V1.8c0-.4.3-.8.8-.8h1.4c.5 0 .8.4.8.8V3M3 3.5l.7 9c.05.7.6 1.2 1.3 1.2h4c.7 0 1.25-.5 1.3-1.2l.7-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M5.5 6v5M8.5 6v5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
    ),
    archivebox: (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="12" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2.5 5v6c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5V5M5.8 7.5h3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
    tag: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M1.5 6.5v-4c0-.6.4-1 1-1h4c.3 0 .5.1.7.3l6 6c.4.4.4 1 0 1.4l-4 4c-.4.4-1 .4-1.4 0l-6-6a1 1 0 01-.3-.7z" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
        </svg>
    ),
    compose: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M9.8 2.2l3 3L6 12l-3.6.6L3 9l6.8-6.8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
    ),
    search: (
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 10l3.4 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
    sidebarToggle: (
        <svg width="15" height="12" viewBox="0 0 17 14" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="15" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6.5 1v12" stroke="currentColor" strokeWidth="1.3" />
        </svg>
    ),
    chevronDown: (className = "") => (
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className={className} aria-hidden="true">
            <path d="M1 1.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

function ChevronH({ dir }: { dir: "left" | "right" }) {
    return (
        <svg width="8" height="13" viewBox="0 0 9 15" fill="none" aria-hidden="true">
            <path
                d={dir === "left" ? "M7.5 1.5l-6 6 6 6" : "M1.5 1.5l6 6-6 6"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

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
            className={`top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 text-[13px] text-black/85 ${
                zoomed
                    ? "h-[92dvh] w-[96vw]"
                    : "h-[min(696px,82dvh)] w-[min(996px,94vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            {/* Sidebar: 240px column, glass panel inset 8px, radius 18px */}
            <aside
                className="hidden w-[240px] shrink-0 flex-col p-2 sm:flex"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <div className="flex h-full w-full flex-col rounded-[18px] bg-[#f5f5f5]/95 py-2.5 shadow-[0_8px_40px_0_rgba(0,0,0,0.12)]">
                    {/* window controls row */}
                    <div className="relative h-8 w-full shrink-0">
                        <span className="absolute top-0 left-2.5" onPointerDown={(e) => e.stopPropagation()}>
                            <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                        </span>
                        <span
                            className="absolute -top-1 right-2.5 flex size-6 items-center justify-center rounded-full text-[#1a1a1a]"
                            aria-hidden="true"
                        >
                            {GLYPH.sidebarToggle}
                        </span>
                    </div>
                    {/* section header, per spec: pt-15 pb-5 pl-18 pr-12 */}
                    <div className="flex items-center justify-between pt-[15px] pr-3 pb-[5px] pl-[18px]">
                        <span className="text-[11px] leading-[14px] font-semibold text-black/50">
                            Projects
                        </span>
                        {GLYPH.chevronDown("text-black/25")}
                    </div>
                    <nav aria-label="Sections" className="flex w-full flex-col">
                        {(["work", "ideas"] as const).map((id) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setSection(id)}
                                onPointerDown={(e) => e.stopPropagation()}
                                aria-current={section === id ? "true" : undefined}
                                className="flex h-6 w-full items-center px-2.5"
                            >
                                <span
                                    className={`flex h-full w-full items-center gap-1.5 rounded-[8px] py-1 pr-2.5 pl-1.5 transition-colors duration-100 ease-linear ${
                                        section === id ? "bg-black/[0.11]" : "hover:bg-black/5"
                                    }`}
                                >
                                    {GLYPH.folder(
                                        `h-3.5 w-4 shrink-0 ${section === id ? "text-[#2962d9]" : "text-black/50"}`,
                                    )}
                                    {SECTION_LABELS[id]}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Trailing pane */}
            <div className="flex min-w-0 flex-1 flex-col bg-white">
                {/* Toolbar: p-8 gap-8, liquid-glass pills */}
                <div
                    className="flex items-center gap-2 p-2"
                    onPointerDown={(e) => startDrag.current(e)}
                >
                    <div className="flex items-center pl-1 sm:hidden" onPointerDown={(e) => e.stopPropagation()}>
                        <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                    </div>

                    {/* segmented back / forward */}
                    <GlassPill className="p-1">
                        <button
                            type="button"
                            onClick={onClose}
                            onPointerDown={(e) => e.stopPropagation()}
                            aria-label="Back to desktop"
                            className="flex h-7 min-w-7 items-center justify-center rounded-full text-[#1a1a1a] transition-colors duration-100 ease-linear hover:bg-black/5"
                        >
                            <ChevronH dir="left" />
                        </button>
                        <span className="mx-px h-5 w-px bg-[#d9d9d9]" aria-hidden="true" />
                        <span
                            className="flex h-7 min-w-7 items-center justify-center rounded-full text-[#bfbfbf]"
                            aria-hidden="true"
                        >
                            <ChevronH dir="right" />
                        </span>
                    </GlassPill>

                    <h2 className="text-[15px] leading-4 font-bold text-black/85">
                        {SECTION_LABELS[section]}
                    </h2>

                    <div className="min-w-0 flex-1" />

                    {/* tool group */}
                    <GlassPill className="hidden gap-1 p-1 lg:flex">
                        {[GLYPH.folder("h-3.5 w-4", 1.2), GLYPH.trash, GLYPH.archivebox, GLYPH.tag].map(
                            (glyph, i) => (
                                <span
                                    key={i}
                                    aria-hidden="true"
                                    className="flex h-7 min-w-7 items-center justify-center rounded-full px-[5px] text-[#1a1a1a]"
                                >
                                    {glyph}
                                </span>
                            ),
                        )}
                    </GlassPill>
                    {/* compose */}
                    <GlassPill className="hidden p-1 lg:flex">
                        <span
                            className="flex h-7 min-w-7 items-center justify-center rounded-full text-[#1a1a1a]"
                            aria-hidden="true"
                        >
                            {GLYPH.compose}
                        </span>
                    </GlassPill>
                    {/* search */}
                    <GlassPill className="hidden h-9 w-[130px] gap-1.5 rounded-full px-2.5 md:flex">
                        <span className="text-[#727272]">{GLYPH.search}</span>
                        <span className="text-[13px] leading-4 font-medium text-[#727272]">Search</span>
                    </GlassPill>
                </div>

                {/* Content area */}
                <div className="relative flex min-h-0 flex-1">
                    {/* decorative scrollbar, per design */}
                    <div className="absolute top-7 right-0 bottom-0 w-3 overflow-hidden" aria-hidden="true">
                        <div className="absolute top-[3px] left-1/2 h-1/2 w-1.5 -translate-x-1/2 rounded-full bg-black/15" />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col pr-0.5">
                        {/* column headers: 28px, 11px labels, sorted = bold */}
                        <div className="flex w-full items-center pb-[5px]">
                            <div className="flex h-7 min-w-0 flex-1 items-center border-b border-black/5 pt-1 pb-[5px] pl-12">
                                <span className="truncate text-[11px] leading-[14px] font-medium text-black/50">
                                    Name
                                </span>
                            </div>
                            <div className="hidden h-7 w-[190px] shrink-0 items-center gap-1 border-b border-l border-black/5 border-l-black/10 pt-1 pb-[5px] pl-2 sm:flex">
                                <span className="text-[11px] leading-[14px] font-bold text-black/85">
                                    Date Modified
                                </span>
                                {GLYPH.chevronDown("text-black/40")}
                            </div>
                            <div className="flex h-7 w-[72px] shrink-0 items-center border-b border-l border-black/5 border-l-black/10 pt-1 pb-[5px] pl-2 sm:w-[100px]">
                                <span className="text-[11px] leading-[14px] font-medium text-black/50">
                                    Size
                                </span>
                            </div>
                            <div className="hidden h-7 w-[160px] shrink-0 items-center border-b border-l border-black/5 border-l-black/10 pt-1 pb-[5px] pl-2 sm:flex">
                                <span className="text-[11px] leading-[14px] font-medium text-black/50">
                                    Kind
                                </span>
                            </div>
                        </div>

                        {/* rows: 20px, alternating rgba(0,0,0,0.03), selection #2962d9 */}
                        <ul className="flex-1 overflow-y-auto" role="list">
                            {rows.map((project, i) => {
                                const isSelected = selected === project.slug;
                                const rowBg = isSelected
                                    ? "bg-[#2962d9] text-white"
                                    : i % 2 === 0
                                      ? "bg-black/[0.03] hover:bg-black/[0.07]"
                                      : "hover:bg-black/[0.07]";
                                const dim = isSelected ? "text-white/85" : "text-black/55";
                                return (
                                    <li key={project.id}>
                                        <button
                                            type="button"
                                            aria-haspopup="dialog"
                                            onClick={(e) => {
                                                setSelected(project.slug);
                                                onOpenProject(project, e.currentTarget);
                                            }}
                                            className={`flex h-6 w-full items-center rounded-[8px] text-left transition-colors duration-100 ease-linear sm:h-5 ${rowBg}`}
                                        >
                                            <span className="flex h-full min-w-0 flex-1 items-center gap-1 pl-2.5">
                                                <span
                                                    aria-hidden="true"
                                                    className={`flex w-4 justify-center ${
                                                        isSelected ? "text-white/70" : "text-black/25"
                                                    }`}
                                                >
                                                    <svg width="6" height="10" viewBox="0 0 7 11" fill="none">
                                                        <path d="M1 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                <Image
                                                    src="/desktop/file-row.png"
                                                    alt=""
                                                    width={36}
                                                    height={36}
                                                    className="h-4 w-[18px] object-contain"
                                                />
                                                <span className="truncate leading-[20px]">{project.title}</span>
                                            </span>
                                            <span className={`hidden w-[190px] shrink-0 px-2 leading-[20px] sm:block ${dim}`}>
                                                {project.modified}
                                            </span>
                                            <span className={`w-[72px] shrink-0 px-2 leading-[20px] sm:w-[100px] ${dim}`}>
                                                {rowSize(i)}
                                            </span>
                                            <span className={`hidden w-[160px] shrink-0 px-2 leading-[20px] sm:block ${dim}`}>
                                                File
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </MacWindowFrame>
    );
}
