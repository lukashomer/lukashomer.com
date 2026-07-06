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
        id: "elli-ai",
        slug: "elli-ai",
        section: "work",
        index: "01",
        title: "Elli AI",
        label: "Elli AI — Real Estate SaaS",
        description:
            "A SaaS platform that puts AI to work for real-estate agents and brokerages. I own the product design end to end — the design system, the UX copy, and a large share of the production front-end.",
        role: "Product design · Design system · UX copy · Front-end",
        stack: ["Figma", "React", "TypeScript", "Tailwind CSS"],
        images: [
            { src: "/projects/elli-ai/01.jpg", alt: "Elli AI — product dashboard" },
            { src: "/projects/elli-ai/02.jpg", alt: "Elli AI — design system components" },
            { src: "/projects/elli-ai/03.jpg", alt: "Elli AI — listing workflow" },
        ],
        position: { x: 24, y: 33 },
        rotation: -2,
        size: "lg",
        aspect: "landscape",
    },
    {
        id: "sara-ai",
        slug: "sara-ai",
        section: "work",
        index: "02",
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
        position: { x: 68, y: 23 },
        rotation: 1.6,
        size: "md",
        aspect: "portrait",
    },
    {
        id: "plugdeck",
        slug: "plugdeck",
        section: "work",
        index: "03",
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
        position: { x: 82, y: 40 },
        rotation: -1.2,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "academy-of-coffee",
        slug: "academy-of-coffee",
        section: "work",
        index: "04",
        title: "Academy of Coffee",
        label: "Academy of Coffee — Full Rebuild",
        description:
            "A full rebuild of the Academy of Coffee website on a custom stack — content modelled in Sanity, checkout on Stripe, data in Supabase. Designed and shipped end to end.",
        role: "Design · Full-stack build",
        stack: ["Next.js", "Supabase", "Stripe", "Sanity"],
        images: [
            { src: "/projects/academy-of-coffee/01.jpg", alt: "Academy of Coffee — homepage" },
            { src: "/projects/academy-of-coffee/02.jpg", alt: "Academy of Coffee — course checkout" },
            { src: "/projects/academy-of-coffee/03.jpg", alt: "Academy of Coffee — course detail" },
        ],
        position: { x: 33, y: 67 },
        rotation: 2.4,
        size: "md",
        aspect: "portrait",
    },
    {
        id: "cafepoint",
        slug: "cafepoint",
        section: "work",
        index: "05",
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
        position: { x: 59, y: 62 },
        rotation: -2.6,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "usat",
        slug: "usat",
        section: "work",
        index: "06",
        title: "USAT",
        label: "USAT — 3D Icon Set",
        description:
            "A 3D icon set for a travel whitelabel app — a family of consistent, softly lit objects designed to carry the app's visual identity across the whole product.",
        role: "3D & icon design",
        stack: ["3D", "Iconography", "Figma"],
        images: [
            { src: "/projects/usat/01.jpg", alt: "USAT — 3D icon family overview" },
            { src: "/projects/usat/02.jpg", alt: "USAT — icon detail renders" },
        ],
        position: { x: 81, y: 68 },
        rotation: 1.8,
        size: "sm",
        aspect: "square",
    },

    // ——— IDEAS ——————————————————————————————————————————————
    {
        id: "runner-concept",
        slug: "runner-concept",
        section: "ideas",
        index: "07",
        title: "Sub-3 Runner",
        label: "Running App Concept",
        description:
            "A concept for a marathon-training companion built around one goal: a sub-three-hour finish. Training load, pacing, and race readiness rendered as a single calm surface.",
        role: "Concept · Product design",
        stack: ["Figma", "Prototyping"],
        images: [
            { src: "/projects/runner-concept/01.jpg", alt: "Sub-3 Runner — training dashboard concept" },
            { src: "/projects/runner-concept/02.jpg", alt: "Sub-3 Runner — pacing screen concept" },
        ],
        position: { x: 31, y: 37 },
        rotation: -2.2,
        size: "md",
        aspect: "portrait",
    },
    {
        id: "three-d-icons",
        slug: "3d-icons",
        section: "ideas",
        index: "08",
        title: "3D Icon Studies",
        label: "3D Icon Experiments",
        description:
            "Ongoing renders and icon studies — materials, lighting, and how far a small 3D object can carry an interface before it starts shouting.",
        role: "Exploration · 3D",
        stack: ["3D", "Rendering"],
        images: [
            { src: "/projects/3d-icons/01.jpg", alt: "3D icon studies — material tests" },
            { src: "/projects/3d-icons/02.jpg", alt: "3D icon studies — lighting variations" },
        ],
        position: { x: 60, y: 60 },
        rotation: 1.6,
        size: "md",
        aspect: "square",
    },
    {
        id: "ai-workflows",
        slug: "ai-workflows",
        section: "ideas",
        index: "09",
        title: "AI Workflows",
        label: "AI Workflow Experiments",
        description:
            "Prompts, pipelines, and AI-assisted design-to-code workflows — working notes from shipping real products with an AI pair at the keyboard.",
        role: "Research · Tooling",
        stack: ["Claude", "Prompting", "Automation"],
        images: [
            { src: "/projects/ai-workflows/01.jpg", alt: "AI workflows — prompt pipeline sketch" },
        ],
        position: { x: 73, y: 30 },
        rotation: -1.4,
        size: "sm",
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
        { label: "Studio", value: "moow s.r.o." },
        { label: "Now", value: "AI × real estate · e-commerce" },
    ],
    portraitAlt: "Portrait of Lukáš Homér",
};

export const contact = {
    email: "PLACEHOLDER_EMAIL",
    linkedin: "PLACEHOLDER_LINKEDIN",
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
        width: 240,
        height: 426,
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
        { label: "Linkedin", action: { type: "link", href: "PLACEHOLDER_LINKEDIN" } },
        { label: "Mail", action: { type: "link", href: "mailto:PLACEHOLDER_EMAIL" } },
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
