/**
 * Single source of truth for all portfolio content.
 * Edit copy, positions, and images here — components never hardcode content.
 *
 * position: art-directed constants, % of the canvas (item is center-anchored).
 * rotation: fixed degrees, keep within ±3.
 * images:   drop real assets into /public/projects/<slug>/ using the paths
 *           referenced below — placeholder blocks render until they exist.
 */

export type SectionId = "work" | "ideas" | "about";

export type ThumbSize = "sm" | "md" | "lg";
export type ThumbAspect = "landscape" | "portrait" | "square";

export interface ProjectImage {
    src: string;
    alt: string;
}

export interface Project {
    id: string;
    slug: string;
    section: Extract<SectionId, "work" | "ideas">;
    index: string;
    title: string;
    /** Uppercase micro-label shown under the thumbnail on the canvas. */
    label: string;
    /** 2–3 sentences shown in the detail overlay. */
    description: string;
    role: string;
    stack: string[];
    images: ProjectImage[];
    link?: { href: string; label: string };
    position: { x: number; y: number };
    rotation: number;
    size: ThumbSize;
    aspect: ThumbAspect;
}

export const projects: Project[] = [
    // ——— WORK ———————————————————————————————————————————————
    {
        id: "sara-ai",
        slug: "sara-ai",
        section: "work",
        index: "01",
        title: "Sara AI",
        label: "Sara AI — Broker Assistant",
        description:
            "An AI assistant for real-estate brokers, taken from first landing-page draft to paid product. I designed and built the marketing site and product UI, wired up Stripe billing, and shaped the brand.",
        role: "Brand · Product UI · Landing page · Stripe integration",
        stack: ["Next.js", "React", "Stripe", "Figma"],
        images: [
            { src: "/projects/sara-ai/01.jpg", alt: "Sara AI — chat interface" },
            { src: "/projects/sara-ai/02.jpg", alt: "Sara AI — landing page" },
            { src: "/projects/sara-ai/03.jpg", alt: "Sara AI — brand elements" },
        ],
        link: { href: "https://sarabroker.com", label: "sarabroker.com" },
        position: { x: 30, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "simplicity",
        slug: "simplicity",
        section: "work",
        index: "02",
        title: "Simplicity",
        label: "Simplicity — Product & Engineering",
        description:
            "Real-estate SaaS where I own the product design end to end and ship it myself — new features, e-commerce themes, landing pages, and marketing assets, designed in Figma and built into production code with AI-assisted development.",
        role: "Senior Product Designer & Design Engineer",
        stack: ["Figma", "React", "TypeScript", "Claude Code"],
        images: [
            { src: "/projects/simplicity/01.jpg", alt: "Simplicity — product dashboard" },
            { src: "/projects/simplicity/02.jpg", alt: "Simplicity — design system" },
        ],
        position: { x: 50, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "youdare",
        slug: "youdare",
        section: "work",
        index: "03",
        title: "Youdare",
        label: "Youdare — Co-Founder · CMO",
        description:
            "A startup I co-founded — designed the app screens, built several landing pages, and led marketing initiatives across the CEE region and the USA.",
        role: "Co-Founder · CMO",
        stack: ["Figma", "Landing pages", "Growth"],
        images: [
            { src: "/projects/youdare/01.jpg", alt: "Youdare — app screens" },
            { src: "/projects/youdare/02.jpg", alt: "Youdare — landing page" },
        ],
        position: { x: 70, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "realtyscanner",
        slug: "realtyscanner",
        section: "work",
        index: "04",
        title: "RealtyScanner",
        label: "RealtyScanner — Co-Founder · CEO",
        description:
            "A real-estate startup I co-founded and led. I took charge of the UI/UX design and brand — from crafting the logo to establishing the full identity — while steering the product as CEO.",
        role: "Co-Founder · CEO",
        stack: ["Figma", "Brand", "UI/UX"],
        images: [
            { src: "/projects/realtyscanner/01.jpg", alt: "RealtyScanner — product UI" },
            { src: "/projects/realtyscanner/02.jpg", alt: "RealtyScanner — brand identity" },
        ],
        position: { x: 30, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "plugdeck",
        slug: "plugdeck",
        section: "work",
        index: "05",
        title: "Plugdeck",
        label: "Plugdeck — E-commerce Plugins",
        description:
            "E-commerce plugins for Shoptet and Shopify stores — designed, built, and maintained as products. Small tools with real users, where I do both the product thinking and the engineering.",
        role: "Product · Engineering",
        stack: ["TypeScript", "React", "Shopify", "Shoptet"],
        images: [
            { src: "/projects/plugdeck/01.jpg", alt: "Plugdeck — plugin storefront" },
            { src: "/projects/plugdeck/02.jpg", alt: "Plugdeck — plugin settings UI" },
        ],
        position: { x: 50, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "thedogwod",
        slug: "thedogwod",
        section: "work",
        index: "06",
        title: "Thedogwod",
        label: "Thedogwod",
        description:
            "Design and build work for Thedogwod — brand, web, and e-commerce.",
        role: "Design · Development",
        stack: ["Figma", "Web"],
        images: [
            { src: "/projects/thedogwod/01.jpg", alt: "Thedogwod — web design" },
        ],
        position: { x: 70, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "cafepoint",
        slug: "cafepoint",
        section: "work",
        index: "07",
        title: "Cafepoint",
        label: "Cafepoint — AI Chatbot Pipeline",
        description:
            "An AI chatbot pipeline for Slovakia's premier coffee company — embeddings, pgvector retrieval, and Slovak-language NLU — plus e-commerce feed work behind the shop.",
        role: "AI engineering · E-commerce",
        stack: ["PostgreSQL · pgvector", "Embeddings", "Slovak NLU"],
        images: [
            { src: "/projects/cafepoint/01.jpg", alt: "Cafepoint — chatbot conversation" },
            { src: "/projects/cafepoint/02.jpg", alt: "Cafepoint — retrieval pipeline diagram" },
        ],
        position: { x: 30, y: 80 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },

    // ——— IDEAS ——————————————————————————————————————————————
    {
        id: "office-management",
        slug: "office-management",
        section: "ideas",
        index: "08",
        title: "Office Management App",
        label: "Office Management App",
        description:
            "A concept for an office management app — desks, rooms, people, and bookings brought together in one calm overview.",
        role: "Concept · Product design",
        stack: ["Figma", "Prototyping"],
        images: [
            { src: "/projects/office-management/01.jpg", alt: "Office management app — overview concept" },
        ],
        position: { x: 50, y: 45 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
];

// ——— ABOUT ———————————————————————————————————————————————————
export const about = {
    name: "Lukáš Homér",
    headline: "Product Designer & Engineer",
    studio: "moow s.r.o.",
    location: "Bratislava, Slovakia",
    // Positioning statement — refined tone, same meaning.
    statement:
        "I design products, and then I build them. Seventeen years across product design, design systems, and front-end engineering — currently building AI tools for real estate at Elli and Sara, and e-commerce plugins at Plugdeck.",
    facts: [
        { label: "Experience", value: "17+ years" },
        { label: "Based", value: "Bratislava, SK" },
    ],
    portraitAlt: "Portrait of Lukáš Homér",
};

export const contact = {
    email: "luk.homer@gmail.com",
    linkedin: "https://www.linkedin.com/in/lukashomer/",
};

// ——— DESK (landing, 1:1 from Figma node 12:2) ————————————————
// A macOS desktop: menu bar, desktop icons, greeting, and the character.
// The character render lives at /public/objects/character.png — replace
// that file to update it everywhere (landing + About overlay).

export const desk = {
    greeting: [
        { text: "Hi, " },
        { text: "I’m Lukas.", bold: true },
        { text: "\nI used to be a designer,\nbut now I’m " },
        { text: "a Design Engineer.", bold: true },
    ],
    character: {
        src: "/objects/character.png",
        alt: "Lukáš Homér as a 3D game character",
        // pixelated source (regenerate larger/smaller to tune the effect)
        width: 264,
        height: 469,
        /** Optional drop-in for the parked 3D scene (components/character-3d.tsx). */
        glb: "/objects/character.glb",
    },
};

export type NavAction =
    | { type: "home" }
    | { type: "finder"; section: "work" | "ideas" }
    | { type: "note" }
    | { type: "overlay"; kind: "contacts" | "resume" }
    | { type: "link"; href: string }
    | { type: "none" }; // decorative menu entry

export const menuBar = {
    appName: "lukashomer.com",
    items: [
        { label: "Home", action: { type: "home" } },
        { label: "Linkedin", action: { type: "link", href: "https://www.linkedin.com/in/lukashomer/" } },
        { label: "Mail", action: { type: "link", href: "mailto:luk.homer@gmail.com" } },
    ] as { label: string; action: NavAction }[],
};

export interface DesktopIconDef {
    id: string;
    label: string;
    icon: string;
    action: NavAction;
    /** Figma position mapped to % of the 1512×982 frame (icon column is 8.33% wide). */
    position: { x: number; y: number };
}

export const desktopIcons: DesktopIconDef[] = [
    {
        id: "aboutme",
        label: "aboutme",
        icon: "/desktop/aboutme.png",
        action: { type: "note" },
        position: { x: 2.315, y: 16.084 },
    },
    {
        id: "myworks",
        label: "myworks",
        icon: "/desktop/myworks.png",
        action: { type: "finder", section: "work" },
        position: { x: 53.05, y: 6.11 },
    },
    {
        id: "ideas",
        label: "ideas",
        icon: "/desktop/ideas.png",
        action: { type: "finder", section: "ideas" },
        position: { x: 62.57, y: 10.993 },
    },
    {
        id: "contacts",
        label: "contacts",
        icon: "/desktop/contacts.png",
        action: { type: "overlay", kind: "contacts" },
        position: { x: 54.236, y: 23.111 },
    },
];

// ——— RESUME ——————————————————————————————————————————————————
export const resume = {
    /** Drop the real PDF into /public/resume.pdf */
    pdf: "/resume.pdf",
    expertise:
        "Figma & design systems, Claude Code (AI-assisted development), HTML/CSS/JS, e-commerce themes, Adobe Photoshop & Illustrator",
    experience: [
        {
            years: "2024 — Present",
            role: "Senior Product Designer & Design Engineer",
            company: "Simplicity",
        },
        { years: "2023 — 2024", role: "Co-Founder · CEO", company: "RealtyScanner" },
        { years: "2021 — 2023", role: "Co-Founder · CMO", company: "Youdare" },
        { years: "2020 — 2024", role: "Designer & Marketing Manager", company: "Cafepoint" },
        { years: "2018 — 2021", role: "Graphic & Social Media Manager", company: "Visibility" },
        { years: "2017 — 2019", role: "Content Partnerships Manager", company: "Reebok" },
        { years: "2015 — 2020", role: "Marketing & Graphic Manager", company: "The Streets" },
    ],
};
