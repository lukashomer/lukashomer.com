"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { desk } from "@/data/projects";

/**
 * macOS login screen as the password wall. Correct password sets the
 * access cookie (via /api/unlock) and reloads into the desktop.
 */
export default function UnlockPage() {
    const [password, setPassword] = useState("");
    const [shake, setShake] = useState(0);
    const [checking, setChecking] = useState(false);

    const submit = async () => {
        if (!password || checking) return;
        setChecking(true);
        const res = await fetch("/api/unlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        }).catch(() => null);
        if (res?.ok) {
            window.location.reload();
            return;
        }
        setChecking(false);
        setPassword("");
        setShake((s) => s + 1); // wrong password → macOS head-shake
    };

    return (
        <main className="flex min-h-dvh flex-col items-center justify-center bg-white">
            <Image
                src={desk.character.src}
                alt=""
                width={desk.character.width}
                height={desk.character.height}
                priority
                className="h-40 w-auto [image-rendering:pixelated]"
            />
            <p className="mt-4 text-[15px] font-semibold text-black/85">Lukáš Homér</p>

            <motion.form
                key={shake}
                initial={shake ? { x: 0 } : false}
                animate={shake ? { x: [0, -12, 10, -7, 5, 0] } : undefined}
                transition={{ duration: 0.4 }}
                className="relative mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <input
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    aria-label="Password"
                    className="h-9 w-56 rounded-full bg-black/[0.06] px-4 pr-10 text-center text-[16px] text-black/85 placeholder:text-black/35 focus:outline-none sm:text-[13px]"
                />
                <button
                    type="submit"
                    aria-label="Unlock"
                    disabled={checking}
                    className={`absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors duration-100 ease-linear ${
                        password ? "bg-[#2962d9]" : "bg-black/20"
                    }`}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5h6M5.5 2.5L8 5 5.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </motion.form>

            <p className="mt-3 text-[11px] text-black/35">Enter the password to view the site</p>
        </main>
    );
}
