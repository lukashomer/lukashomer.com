"use client";

import { useRef, useState } from "react";
import { contact, type Project } from "@/data/projects";
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
    const [email, setEmail] = useState("");
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    const notify = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Notify me: ${project.title}`);
        const body = encodeURIComponent(
            `Hi Lukas, let me know when the ${project.title} case study is live.\n\n— ${email}`,
        );
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    };

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
                className="relative flex shrink-0 items-center border-b border-black/[0.07] px-4 py-3"
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

                <dl className="mt-6 grid grid-cols-1 gap-5 border-t border-black/[0.05] pt-5 sm:grid-cols-2">
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

                {/* case study TBD — content is on the way */}
                <div className="mt-6 flex flex-col items-center rounded-[10px] bg-[#f7f7f7] px-6 py-8 text-center">
                    <div className="h-1 w-44 overflow-hidden rounded-full bg-black/10">
                        <div
                            className="h-full w-1/3 rounded-full bg-[#2962d9]"
                            style={{ animation: "loading-slide 1.6s ease-in-out infinite" }}
                        />
                    </div>
                    <p className="mt-4 text-[13px] font-semibold text-black/85">
                        Case study is loading…
                    </p>
                    <p className="mt-1 max-w-[38ch] text-[12px] leading-relaxed text-black/50">
                        Visuals for this one are still being polished. Leave your email and
                        I’ll let you know the moment it’s live.
                    </p>
                    <form className="mt-4 flex w-full max-w-[320px] gap-2" onSubmit={notify}>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            aria-label="Your email"
                            className="h-8 min-w-0 flex-1 rounded-[6px] bg-white px-3 text-[13px] text-black/85 shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)] placeholder:text-black/30 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="h-8 shrink-0 rounded-[6px] bg-[#2962d9] px-3 text-[13px] font-medium text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.15)] transition duration-100 ease-linear hover:brightness-105"
                        >
                            Notify me
                        </button>
                    </form>
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
