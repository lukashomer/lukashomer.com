"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { projects, type NavAction, type Project } from "@/data/projects";
import { Desk } from "@/components/desk";
import { MenuBar } from "@/components/menu-bar";
import { FinderWindow } from "@/components/finder-window";
import { NoteWindow } from "@/components/note-window";
import { ProjectOverlay } from "@/components/project-overlay";
import { InfoOverlay, type InfoKind } from "@/components/info-overlay";

type Modal =
    | { type: "project"; slug: string }
    | { type: "info"; kind: InfoKind }
    | { type: "finder"; section: "work" | "ideas" }
    | { type: "note" };
interface HistoryState {
    modal: Modal | null;
}

export default function Home() {
    const [modal, setModal] = useState<Modal | null>(null);

    const modalRef = useRef<Modal | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        modalRef.current = modal;
    }, [modal]);

    // Every window/overlay is a history entry, so the browser Back button
    // always does the expected thing: project → finder window → desktop.
    // popstate is the single "go back" path.
    const push = useCallback((s: HistoryState) => {
        window.history.pushState(s, "");
        setModal(s.modal);
    }, []);

    const goBack = useCallback(() => window.history.back(), []);

    useEffect(() => {
        if (window.history.state?.modal === undefined) {
            window.history.replaceState({ modal: null } satisfies HistoryState, "");
        }
        const onPop = (e: PopStateEvent) => {
            const next: Modal | null = e.state?.modal ?? null;
            const hadModal = modalRef.current !== null;
            setModal(next);
            if (hadModal && !next) {
                triggerRef.current?.focus();
                triggerRef.current = null;
            }
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    // ESC mirrors Back while anything is open.
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && modalRef.current) window.history.back();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // Lock background scroll (mobile) while something is open.
    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal]);

    const handleNavAction = useCallback(
        (action: NavAction, trigger: HTMLElement | null = null) => {
            const current = modalRef.current;
            switch (action.type) {
                case "home":
                    if (current) push({ modal: null });
                    break;
                case "finder":
                    if (current?.type === "finder" && current.section === action.section) return;
                    triggerRef.current = trigger;
                    push({ modal: { type: "finder", section: action.section } });
                    break;
                case "note":
                    if (current?.type === "note") return;
                    triggerRef.current = trigger;
                    push({ modal: { type: "note" } });
                    break;
                case "overlay":
                    if (current?.type === "info" && current.kind === action.kind) return;
                    triggerRef.current = trigger;
                    push({ modal: { type: "info", kind: action.kind } });
                    break;
                // "link" renders as a plain anchor; "none" is decorative
            }
        },
        [push],
    );

    const openProject = useCallback(
        (project: Project, trigger: HTMLElement | null) => {
            if (modalRef.current?.type === "project") return;
            triggerRef.current = trigger;
            push({ modal: { type: "project", slug: project.slug } });
        },
        [push],
    );

    const activeProject =
        modal?.type === "project"
            ? (projects.find((p) => p.slug === modal.slug) ?? null)
            : null;

    return (
        <div className="relative min-h-dvh md:h-dvh md:overflow-hidden">
            <MenuBar onAction={handleNavAction} />

            <main className="relative md:h-full">
                <Desk
                    onCharacterClick={(trigger) => handleNavAction({ type: "note" }, trigger)}
                    onIconActivate={handleNavAction}
                />
            </main>

            <AnimatePresence>
                {modal?.type === "finder" && (
                    <FinderWindow
                        key="finder"
                        initialSection={modal.section}
                        onClose={goBack}
                        onOpenProject={openProject}
                    />
                )}
                {modal?.type === "note" && <NoteWindow key="note" onClose={goBack} />}
                {modal?.type === "info" && (
                    <InfoOverlay key={modal.kind} kind={modal.kind} onClose={goBack} />
                )}
                {activeProject && (
                    <ProjectOverlay key="project" project={activeProject} onClose={goBack} />
                )}
            </AnimatePresence>
        </div>
    );
}
