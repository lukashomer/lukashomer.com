import Image from "next/image";
import Link from "next/link";

/** 404 as a macOS dialog — the metaphor holds even off the happy path. */
export default function NotFound() {
    return (
        <main
            className="flex min-h-dvh items-center justify-center bg-white px-4"
            style={{
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
        >
            <div className="flex w-[min(420px,94vw)] flex-col items-center rounded-[12px] bg-white px-8 py-7 text-center shadow-[0_0_0_0.5px_rgba(0,0,0,0.15),0_16px_48px_0_rgba(0,0,0,0.3)]">
                <Image
                    src="/desktop/ideas.png"
                    alt=""
                    width={70}
                    height={70}
                    className="size-14 object-contain"
                />
                <h1 className="mt-3 text-[15px] font-bold text-black/85">
                    The file can’t be found.
                </h1>
                <p className="mt-1 text-[13px] leading-relaxed text-black/50">
                    It may have been moved to the Trash, renamed, or it never existed.
                </p>
                <Link
                    href="/"
                    className="mt-5 rounded-[6px] bg-[#2962d9] px-4 py-1.5 text-[13px] font-medium text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.15)] transition duration-100 ease-linear hover:brightness-105"
                >
                    Back to Desktop
                </Link>
            </div>
        </main>
    );
}
