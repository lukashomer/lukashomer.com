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
    /** Real 'Date Modified' shown in the Finder list. */
    modified: string;
    /** True once real case-study images exist — shows the grid instead of the TBD panel. */
    contentReady?: boolean;
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
        modified: "Jun 18, 2025",
        section: "work",
        index: "01",
        title: "Sara AI",
        label: "Sara AI — Broker Assistant",
        description:
            "An AI assistant for real-estate brokers, taken from first landing-page draft to paid product. I designed and built the marketing site and product UI, wired up Stripe billing, and shaped the brand.",
        role: "Brand · Product UI · Landing page · Stripe integration",
        stack: ["Next.js", "React", "Stripe", "Figma"],
        images: [
            { src: "/projects/sara-ai/01.png", alt: "Sara AI — chat greeting card" },
            { src: "/projects/sara-ai/02.png", alt: "Sara AI — dashboard cards and Pro plan billing" },
            { src: "/projects/sara-ai/03.png", alt: "Sara AI — product shown on a laptop" },
            { src: "/projects/sara-ai/04.png", alt: "Sara AI — chat alongside an MLS map and property listings" },
        ],
        contentReady: true,
        link: { href: "https://sarabroker.com", label: "sarabroker.com" },
        position: { x: 30, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "simplicity",
        slug: "simplicity",
        modified: "May 26, 2025",
        section: "work",
        index: "02",
        title: "Simplicity",
        label: "Simplicity — Travel App",
        description:
            "A consumer travel app where I own the product design end to end and ship it myself — trip planning, hotel booking, eSIM, travel insurance, itineraries, and an in-app AI assistant. Designed in Figma and built into production code with AI-assisted development.",
        role: "Senior Product Designer & Design Engineer",
        stack: ["Figma", "React", "TypeScript", "Claude Code"],
        images: [
            { src: "/projects/simplicity/01.png", alt: "Simplicity — travel app home with categories and destinations" },
            { src: "/projects/simplicity/02.png", alt: "Simplicity — onboarding, eSIM, and travel insurance flows" },
            { src: "/projects/simplicity/03.png", alt: "Simplicity — itinerary widgets and booking confirmation" },
            { src: "/projects/simplicity/04.png", alt: "Simplicity — hotel search and property detail" },
        ],
        contentReady: true,
        position: { x: 50, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "youdare",
        slug: "youdare",
        modified: "Aug 14, 2023",
        section: "work",
        index: "03",
        title: "Youdare",
        label: "Youdare — Social Dares Platform",
        description:
            "A social platform where users create and crowdfund dares — complete the dare and you earn the money — producing a feed of bold, one-of-a-kind videos. As co-founder, I designed the app, built the landing pages, and led growth marketing across the CEE region and the US.",
        role: "Co-Founder · CMO",
        stack: ["Figma", "Landing pages", "Growth"],
        images: [
            { src: "/projects/youdare/01.png", alt: "Youdare — dare feed and crowdfunding screens" },
            { src: "/projects/youdare/02.png", alt: "Youdare — creating and funding a dare in the app" },
            { src: "/projects/youdare/03.png", alt: "Youdare — marketing landing page" },
        ],
        // TODO: add a real outcome if available (users, campaign reach in CEE/US) and a live link.
        contentReady: true,
        position: { x: 70, y: 30 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "realtyscanner",
        slug: "realtyscanner",
        modified: "Feb 9, 2024",
        section: "work",
        index: "04",
        title: "RealtyScanner",
        label: "RealtyScanner — Real-Estate Search",
        description:
            "An AI-powered real-estate platform that surfaces the best listings for each buyer by preference and budget. I co-founded and led it as CEO, owning UI/UX and the full brand — from logo to identity system.",
        role: "Co-Founder · CEO",
        stack: ["Figma", "Brand", "UI/UX"],
        images: [
            { src: "/projects/realtyscanner/01.png", alt: "RealtyScanner — property search interface" },
            { src: "/projects/realtyscanner/02.png", alt: "RealtyScanner — logo and brand identity" },
        ],
        contentReady: true,
        // TODO: confirm beivo.sk is live, then uncomment to link it.
        // link: { href: "https://beivo.sk", label: "beivo.sk" },
        position: { x: 30, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "plugdeck",
        slug: "plugdeck",
        modified: "Apr 30, 2025",
        section: "work",
        index: "05",
        title: "Plugdeck",
        label: "Plugdeck — E-commerce Plugins",
        description:
            "E-commerce plugins for Shoptet and Shopify stores — designed, built, and maintained as products. Small tools with real users, where I do both the product thinking and the engineering.",
        role: "Product · Engineering",
        stack: ["Figma", "TypeScript", "React", "Shopify", "Shoptet"],
        images: [
            { src: "/projects/plugdeck/01.jpg", alt: "Plugdeck — plugin storefront" },
            { src: "/projects/plugdeck/02.jpg", alt: "Plugdeck — plugin settings UI" },
        ],
        link: { href: "https://www.plugdeck.co", label: "plugdeck.co" },
        position: { x: 50, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "thedogwod",
        slug: "thedogwod",
        modified: "Nov 21, 2024",
        section: "work",
        index: "06",
        title: "Thedogwod",
        label: "Thedogwod — Brand & E-commerce",
        description:
            "Brand, website, and online store for Thedogwod, designed and built end to end — from visual identity through the live e-commerce storefront.",
        role: "Design · Development",
        stack: ["Figma", "Web"],
        images: [
            { src: "/projects/thedogwod/01.jpg", alt: "Thedogwod — homepage and storefront design" },
        ],
        // TODO: add specifics (product category, platform, any results) — this one is still thin.
        link: { href: "https://thedogwod.com", label: "thedogwod.com" },
        position: { x: 70, y: 60 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },
    {
        id: "cafepoint",
        slug: "cafepoint",
        modified: "Oct 3, 2024",
        section: "work",
        index: "07",
        title: "Cafepoint",
        label: "Cafepoint — AI Chatbot Pipeline",
        description:
            "An AI chatbot pipeline for Slovakia's premier coffee company — embeddings, pgvector retrieval, and Slovak-language NLU — plus e-commerce feed work behind the shop.",
        role: "AI engineering · E-commerce",
        stack: ["PostgreSQL · pgvector", "Embeddings", "Slovak NLU", "Figma"],
        images: [
            { src: "/projects/cafepoint/01.png", alt: "Cafepoint — brand and store design" },
            { src: "/projects/cafepoint/02.png", alt: "Cafepoint — product feed and shop pages" },
        ],
        // TODO: your résumé lists "Designer & Marketing Manager" here — confirm the AI-engineering framing is how you want this positioned.
        contentReady: true,
        position: { x: 30, y: 80 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },

    {
        id: "cemmac",
        slug: "cemmac",
        section: "work",
        index: "08",
        title: "Cemmac",
        label: "Cemmac — Corporate Website",
        description:
            "UI/UX design for CEMMAC, one of Slovakia’s most modern cement producers — the corporate website from information architecture to the final visual design.",
        role: "UI/UX Design",
        stack: ["Figma", "UI/UX", "Web design"],
        images: [
            { src: "/projects/cemmac/01.png", alt: "Cemmac — website design" },
            { src: "/projects/cemmac/02.png", alt: "Cemmac — page designs" },
            { src: "/projects/cemmac/03.png", alt: "Cemmac — content section" },
        ],
        contentReady: true,
        link: { href: "https://www.cemmac.sk/en/", label: "cemmac.sk" },
        modified: "Mar 12, 2025",
        position: { x: 70, y: 80 },
        rotation: 0,
        size: "md",
        aspect: "landscape",
    },

    // ——— IDEAS ——————————————————————————————————————————————
    {
        id: "office-management",
        slug: "office-management",
        modified: "Jan 15, 2025",
        section: "ideas",
        index: "09",
        title: "Office Management App",
        label: "Office Management App — Tenant Concept",
        description:
            "A concept for a tenant app for a managed office building — parking reservations, meeting-room booking, visitor passes, an amenities directory, and building news, brought together in one calm native home screen.",
        role: "Concept · Product design",
        stack: ["Figma", "Prototyping"],
        images: [
            { src: "/projects/office-management/01.png", alt: "Office app — parking card, building detail, and venue detail screens" },
            { src: "/projects/office-management/02.png", alt: "Office app — visitor invitation, booking form, and opening-hours components" },
            { src: "/projects/office-management/03.png", alt: "Office app — home screen with quick actions, news, and events" },
        ],
        contentReady: true,
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
        "I design products, and then I build them. Seventeen years across product design, design systems, and front-end engineering — currently building an AI travel app at Simplicity, an AI assistant for real-estate brokers at Sara, and e-commerce plugins at Plugdeck.",
    facts: [
        { label: "Experience", value: "17+ years" },
        { label: "Based", value: "Bratislava, SK" },
    ],
    offering:
        "End-to-end product delivery by one person: brand identity, UI/UX and scalable design systems in Figma — plus the production code to ship them. E-commerce themes, landing pages and full websites built daily with AI-assisted development.",
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
        width: 320,
        height: 569,
        /** Optional drop-in for the parked 3D scene (components/character-3d.tsx). */
        glb: "/objects/character.glb",
    },
};

export type NavAction =
    | { type: "home" }
    | { type: "finder"; section: "work" | "ideas" }
    | { type: "note" }
    | { type: "overlay"; kind: "contacts" | "resume" }
    | { type: "pdf" } // open the CV like macOS Preview
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
    // CV PDF hidden for now — restore this icon (and drop the real /public/lukashomercv.pdf)
    // to bring back the Preview window + right-click download.
    // {
    //     id: "resume",
    //     label: "lukashomercv.pdf",
    //     icon: "/desktop/resume.png",
    //     action: { type: "pdf" },
    //     position: { x: 53.8, y: 40.5 },
    // },
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
    pdf: "/lukashomercv.pdf",
    expertise:
        "Figma & design systems, Claude Code (AI-assisted development), HTML/CSS/JS, e-commerce themes, Adobe Photoshop & Illustrator",
    experience: [
        {
            years: "2023 — Present",
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
