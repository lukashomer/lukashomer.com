"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { about, contact, resume } from "@/data/projects";
import { MacWindowFrame, TrafficLights } from "@/components/mac-window";

export type InfoKind = "contacts" | "resume";

/**
 * "contacts" and "resume" as macOS windows — Contacts-card and document
 * styles, kit label colors, system-blue links and push button.
 */

function ContactsBody() {
    return (
        <div className="flex flex-col items-center px-7 py-6">
            <Image
                src="/objects/headshot.jpg"
                alt={about.portraitAlt}
                width={380}
                height={380}
                className="size-16 rounded-full object-cover"
            />
            <h2 className="mt-3 text-[17px] font-bold text-black/85">{about.name}</h2>
            <p className="text-[12px] text-black/45">{about.headline}</p>

            <dl className="mt-5 w-full border-t border-black/[0.05]">
                {[
                    {
                        label: "email",
                        value: (
                            <a href={`mailto:${contact.email}`} className="break-all text-[#2962d9] hover:underline">
                                {contact.email}
                            </a>
                        ),
                    },
                    {
                        label: "LinkedIn",
                        value: (
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-[#2962d9] hover:underline"
                            >
                                {contact.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                            </a>
                        ),
                    },
                    { label: "location", value: about.location },
                    { label: "availability", value: "40 hours a week, flexible working hours" },
                ].map((row) => (
                    <div
                        key={row.label}
                        className="flex items-baseline gap-4 border-b border-black/[0.05] py-2 last:border-b-0"
                    >
                        <dt className="w-24 shrink-0 text-right text-[11px] font-semibold text-black/40">
                            {row.label}
                        </dt>
                        <dd className="min-w-0 text-[13px] text-black/80">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

function ResumeBody() {
    return (
        <div className="px-7 py-6">
            <ol className="flex flex-col">
                {resume.experience.map((entry) => (
                    <li
                        key={`${entry.company}-${entry.years}`}
                        className="flex flex-col gap-0.5 border-b border-black/[0.05] py-2.5 first:pt-0 sm:flex-row sm:items-baseline sm:gap-5"
                    >
                        <span className="w-32 shrink-0 text-[12px] text-black/40 tabular-nums">
                            {entry.years}
                        </span>
                        <span className="text-[13px] leading-snug text-black/85">
                            {entry.role} <span className="text-black/45">at {entry.company}</span>
                        </span>
                    </li>
                ))}
            </ol>
            <div className="mt-5">
                <p className="text-[11px] font-semibold text-black/40">Expert at</p>
                <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-black/60">
                    {resume.expertise}
                </p>
            </div>
            <a
                href={resume.pdf}
                download
                className="mt-6 inline-flex items-center gap-1.5 rounded-[6px] bg-[#2962d9] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.15)] transition duration-100 ease-linear hover:brightness-105"
            >
                Download PDF
                <svg width="10" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1.5 10h8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </a>
        </div>
    );
}

export function InfoOverlay({ kind, onClose }: { kind: InfoKind; onClose: () => void }) {
    const [zoomed, setZoomed] = useState(false);
    const startDrag = useRef<(e: React.PointerEvent) => void>(() => {});

    return (
        <MacWindowFrame
            label={kind}
            className={`top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col text-black ${
                zoomed
                    ? "h-[88dvh] w-[90vw]"
                    : kind === "contacts"
                      ? "w-[min(420px,92vw)]"
                      : "w-[min(560px,94vw)]"
            }`}
            startDragRef={(fn) => (startDrag.current = fn)}
        >
            <div
                className="relative flex shrink-0 items-center border-b border-black/[0.07] bg-[#f8f8f8] px-4 py-3"
                onPointerDown={(e) => startDrag.current(e)}
            >
                <span onPointerDown={(e) => e.stopPropagation()}>
                    <TrafficLights onClose={onClose} onZoom={() => setZoomed((z) => !z)} />
                </span>
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-black/85">
                    {kind}
                </span>
            </div>
            <div className="max-h-[68dvh] overflow-y-auto">
                {kind === "contacts" ? <ContactsBody /> : <ResumeBody />}
            </div>
        </MacWindowFrame>
    );
}
