"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { APPLE_FONT } from "@/components/mac-window";

/**
 * macOS-style notification banner shown once per session, ~2s after the
 * desktop loads — tells first-time visitors the desktop is interactive.
 */
export function WelcomeNotification() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("lh-welcomed")) return;
        const showTimer = setTimeout(() => setShow(true), 2000);
        const hideTimer = setTimeout(() => {
            setShow(false);
            sessionStorage.setItem("lh-welcomed", "1");
        }, 12000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const dismiss = () => {
        setShow(false);
        sessionStorage.setItem("lh-welcomed", "1");
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.aside
                    role="status"
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 90, transition: { duration: 0.25 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="fixed top-11 right-3 z-[80] flex w-[min(344px,92vw)] items-center gap-3 rounded-[14px] border-[0.5px] border-black/10 bg-white/85 p-3 shadow-[0_10px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                    style={{ fontFamily: APPLE_FONT }}
                >
                    <Image
                        src="/desktop/myworks.png"
                        alt=""
                        width={38}
                        height={38}
                        className="size-9 shrink-0 object-contain [image-rendering:pixelated]"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] leading-tight font-semibold text-black/85">
                            Welcome to my desktop
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-black/55">
                            Open <b>myworks</b> for projects — or just drag things around.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Dismiss notification"
                        onClick={dismiss}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full text-black/40 transition-colors duration-100 ease-linear hover:bg-black/5 hover:text-black/70"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                    </button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
