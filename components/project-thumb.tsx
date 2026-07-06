"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

function initialsOf(title: string) {
    return title
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
}

/**
 * Renders the real asset via next/image when it exists in /public/projects/…,
 * and falls back to a precise gray placeholder block (initials + index) until
 * real assets are supplied.
 */
export function ProjectThumb({
    project,
    src,
    alt,
    sizes,
}: {
    project: Project;
    src: string;
    alt: string;
    sizes?: string;
}) {
    const [missing, setMissing] = useState(false);

    if (missing) {
        return (
            <div
                role="img"
                aria-label={alt}
                className="relative flex h-full w-full items-center justify-center bg-[#f2f2f7]"
            >
                <span className="absolute top-2 left-2.5 font-mono text-[10px] text-black/30">
                    {project.index}
                </span>
                <span className="text-[15px] font-semibold tracking-[0.3em] text-black/25 uppercase">
                    {initialsOf(project.title)}
                </span>
                <span className="absolute inset-1.5 rounded-[4px] border border-black/[0.07]" aria-hidden="true" />
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(max-width: 768px) 50vw, 300px"}
            className="object-cover"
            onError={() => setMissing(true)}
        />
    );
}
