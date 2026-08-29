// Single source of content for the whole site.
// Ownership matters here: "projects" are Alejandro's own (solo/indie), while
// client/employer work goes under "experience" — never the reverse. See
// experience[0] (Opal Interactive) for how client deliverables are credited
// without implying personal ownership of them.

export const profile = {
  name: "Alejandro Zumbado Vargas",
  roles: [
    "Full Stack Developer",
    "Game & VR Developer",
    "Backend Developer",
    "Frontend Developer",
  ],
  location: "Poás, Alajuela, Costa Rica",
  phone: "+506 6022-1640",
  email: "aazv.ale@gmail.com",
  github: "https://github.com/alejandroZumbado",
  linkedin: null as string | null,
  about:
    "Ingeniero en Computación (TEC, 2019) con más de 4 años construyendo productos de extremo a extremo: sitios y aplicaciones web, experiencias de realidad virtual, y videojuegos multijugador. Trabajo en Opal Interactive desarrollando proyectos de clientes (simuladores XR, apps de kiosco/AR, avatares con IA), y en paralelo diseño, desarrollo y publico mis propios productos — un pipeline de noticias con IA, videojuegos multijugador, y un paquete de networking para Unity — cubriendo todo el ciclo: diseño, código, despliegue y mantenimiento.",
};

export const heroTags = ["Full Stack", "Videojuegos & VR", "Inteligencia Artificial", "Unity / C#"];

// Counts kept honest and re-derived from `projects` below + the Opal
// Interactive experience entry — don't hand-tune these without recounting.
export const stats = [
  { value: 4, suffix: "+", label: "Años de experiencia" },
  { value: 16, suffix: "", label: "Proyectos" },
  { value: 2, suffix: "", label: "Idiomas" },
];

export const skillGroups: Record<string, string[]> = {
  "Lenguajes": ["JavaScript", "TypeScript", "Python", "C#", "C/C++"],
  "Frontend": ["React", "Next.js", "Astro", "Vue.js", "Three.js / WebGL", "A-Frame.js (VR web)", "HTML/CSS"],
  "Backend": ["Node.js", "Express", "NestJS", "Django", "Laravel / PHP", "REST APIs"],
  "Videojuegos / XR": ["Unity", "Netcode for GameObjects", "Unity Relay", "Shader Graph", "ARFoundation", "Meta Quest / XREAL"],
  "Hardware / IoT": ["Raspberry Pi", "Python (control de dispositivos)"],
  "IA": ["Integración de LLMs (Gemini)", "pipelines RAG", "IA de autojuego"],
  "Herramientas": ["Git/GitHub", "GitHub Actions (CI/CD)", "Vercel", "Firebase", "Vitest"],
};

export type ProjectCategory = "fullstack" | "ai" | "games" | "vr";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "IA" },
  { id: "games", label: "Videojuegos" },
  { id: "vr", label: "VR" },
];

export interface Project {
  name: string;
  emoji: string;
  description: string;
  tech: string[];
  categories: ProjectCategory[];
  demo?: string | null;
  repo?: string | null;
  status?: string | null;
}

// Alejandro's OWN projects only — personal/indie (mostly under the "Mandrix"
// solo-dev alias). Client work done through Opal Interactive lives in
// `experience`, not here — see the note at the top of this file.
export const projects: Project[] = [
  {
    name: "NewsPulse",
    emoji: "📰",
    description:
      "Sitio de noticias 100% autónomo: un pipeline en Python investiga, redacta con IA en 4 idiomas, verifica los hechos y publica sin intervención humana.",
    tech: ["Python", "LLM", "Astro", "Tailwind", "GitHub Actions", "Vercel"],
    categories: ["fullstack", "ai"],
    demo: "https://newspulse.dev",
    repo: null,
  },
  {
    name: "FeedBack Figuras 3D",
    emoji: "🧸",
    description:
      "Sistema de recolección de feedback de clientes para figuras 3D personalizadas: calificación por categorías, subida de fotos, panel de administración y exportación de datos.",
    tech: ["Next.js 15", "React 19", "Supabase", "Tailwind", "Zod"],
    categories: ["fullstack"],
    demo: null,
    repo: "https://github.com/alejandroZumbado/funkos-feedback",
  },
  {
    name: "Tinted Showdown",
    emoji: "🎮",
    description:
      "Juego multijugador 2–4 jugadores publicado en WebGL. Netcode for GameObjects + Unity Relay, con varios bugs reales de producción resueltos.",
    tech: ["Unity 6000", "C#", "Netcode", "Unity Relay", "WebGL"],
    categories: ["games"],
    demo: "https://alejandrozumbado.github.io/tinted-showdown-build/",
    repo: "https://github.com/alejandroZumbado/TintedShowdown",
  },
  {
    name: "QuickLobby — Netcode Relay Kit",
    emoji: "🔌",
    description:
      "Paquete de Unity extraído de Tinted Showdown: sistema de salas multijugador por código, listo para publicar como asset independiente (Fab.com).",
    tech: ["Unity", "C#", "Netcode for GameObjects", "Unity Relay"],
    categories: ["games"],
    demo: null,
    repo: null,
    status: "En desarrollo — pre-lanzamiento",
  },
  {
    name: "Cannons",
    emoji: "🏰",
    description:
      "Tower-defense en Unity con progresión de hasta 500 niveles y herramientas propias de editor para generación de niveles. PC y Android.",
    tech: ["Unity", "C#", "Android"],
    categories: ["games"],
    demo: "https://alejandrozumbado.github.io/cannons-build/",
    repo: "https://github.com/alejandroZumbado/cannons",
  },
  {
    name: "CannonsLevelGen",
    emoji: "🤖",
    description:
      "IA de autojuego en Python que aprende a jugar Cannons y usa lo aprendido para diseñar niveles nuevos, corriendo en GitHub Actions.",
    tech: ["Python", "Self-play AI", "GitHub Actions"],
    categories: ["ai", "games"],
    demo: null,
    repo: "https://github.com/alejandroZumbado/cannonslevelgen",
  },
  {
    name: "One-Way Royale",
    emoji: "🕹️",
    description: "Battle royale en Unity con backend propio en Heroku y multijugador vía Photon. Build jugable en WebGL.",
    tech: ["Unity", "C#", "Photon", "Heroku", "WebGL"],
    categories: ["games"],
    demo: null,
    repo: "https://github.com/JZ1999/One-Way-Royale",
  },
  {
    name: "ready-gamer (Game Boy homebrew)",
    emoji: "👾",
    description:
      "Desarrollo homebrew en C para hardware real de Game Boy, dentro de las restricciones de memoria del sistema original.",
    tech: ["C", "GBDK / ZGB", "Hardware embebido"],
    categories: ["games"],
    demo: null,
    repo: "https://github.com/JZ1999/ready-gamer",
  },
  {
    name: "Tibetan Calligraphy VR",
    emoji: "🖋️",
    description:
      "Aplicación de realidad virtual para Meta Quest con interacción de trazo de caligrafía tibetana. Co-desarrollada en equipo.",
    tech: ["Unity", "Meta Quest", "VR"],
    categories: ["vr", "games"],
    demo: null,
    repo: "https://github.com/estkm/TibetanCalligraphyVRapp",
  },
  {
    name: "Giz (WOW Emotions)",
    emoji: "🌿",
    description:
      "Experiencia web VR inmersiva de fauna y flora con más de 5 niveles, desarrollada para WOW Emotions.",
    tech: ["A-Frame.js", "WebXR", "Shaders"],
    categories: ["vr"],
    demo: null,
    repo: "https://github.com/alejandroZumbado/Giz",
  },
];

export interface TimelineEntry {
  role: string;
  company: string;
  dates: string;
  sub?: string;
  bullets: string[];
}

export const experience: TimelineEntry[] = [
  {
    role: "Full-Stack / Videojuegos & VR Developer",
    company: "Opal Interactive",
    dates: "Abr. 2026 — Actualidad",
    sub: "Estudio que recibe proyectos de distintas empresas y los reparte entre su equipo de desarrolladores",
    bullets: [
      "HealthSim: simulador de entrenamiento en Unity XR (lentes XREAL) para uso de equipo médico láser, con sesiones remotas experto–aprendiz vía Netcode for GameObjects + Unity Relay.",
      "totempanadol: aplicación Unity de kiosco/AR para una activación de marca, con cámara térmica, detección facial y generación de códigos QR (Firebase).",
      "Opal Web Avatar: plataforma de avatares interactivos con IA — lipsync, seguimiento de mirada por webcam, cerebro de IA conectable (React 19 + Express).",
      "Contribución a Startus: plataforma SaaS de 4 repositorios (backend NestJS, frontend React, microservicio de IA en FastAPI, extensión de Chrome).",
      "Proyectos adicionales de VR/Unity para clientes del estudio (minigolf VR, activación de marca BrissaNova).",
    ],
  },
  {
    role: "Desarrollador independiente / productos propios",
    company: "NewsPulse, Tinted Showdown, Cannons y otros",
    dates: "2025 — Actualidad",
    sub: "Diseño, desarrollo, despliegue y mantenimiento de proyectos propios",
    bullets: [
      "Construí y publiqué NewsPulse: pipeline de noticias con IA 100% autónomo, en producción en newspulse.dev.",
      "Publiqué varios videojuegos multijugador en WebGL/Android (Tinted Showdown, Cannons, One-Way Royale) y desarrollo QuickLobby, un paquete de networking para Unity de próximo lanzamiento.",
    ],
  },
  {
    role: "Desarrollador React / Frontend",
    company: "Freelance",
    dates: "2021 — Actualidad",
    sub: "Múltiples clientes y proyectos",
    bullets: [
      "Solucom — Apertura Remota (2023): sistema de control de acceso IoT con Raspberry Pi (Python), frontend en Vue.js y backend en Laravel/PHP, sincronizado por API con una base de datos de contraseñas.",
      "Aplicaciones y componentes con React: arquitectura limpia, componentes reutilizables, diseño responsivo.",
      "Integración con APIs, corrección de errores y mejoras de rendimiento bajo plazos ajustados.",
    ],
  },
  {
    role: "Desarrollador Full-Stack Jr/Mid",
    company: "IMMERSO",
    dates: "Abr. 2021 — Ene. 2023",
    bullets: [
      "Frontends con React.js/Next.js conectados a backends en Django.",
      "Experiencias web y VR interactivas con A-Frame.js.",
    ],
  },
  {
    role: "Desarrollador Full-Stack Jr/Mid",
    company: "WOW Emotions",
    dates: "Ene. 2022 — Feb. 2023",
    bullets: [
      "Lideré de extremo a extremo un sitio web VR para el proyecto 'Doit'.",
      "Diseñé y desarrollé 'Giz', experiencia inmersiva con 5+ niveles VR.",
    ],
  },
  {
    role: "Desarrollador Full-Stack Jr",
    company: "SolvoSoft",
    dates: "Ago. 2020 — Feb. 2021",
    bullets: [
      "Desarrollo y optimización de funcionalidades web con JavaScript y Django sobre sistemas legados.",
    ],
  },
  {
    role: "Ingeniería en Computación",
    company: "Tecnológico de Costa Rica (TEC)",
    dates: "2019",
    sub: "Educación",
    bullets: [],
  },
];

export interface CvLink {
  label: string;
  lang: "ES" | "EN";
  href: string;
  pdfHref: string;
}

export const cvIndex: CvLink[] = [
  { label: "Full Stack", lang: "ES", href: "/cv/ES/Full-Stack/CV_Alejandro_Zumbado_FullStack_ES.html", pdfHref: "/cv/ES/Full-Stack/CV_Alejandro_Zumbado_FullStack_ES.pdf" },
  { label: "Full Stack", lang: "EN", href: "/cv/EN/Full-Stack/CV_Alejandro_Zumbado_FullStack_EN.html", pdfHref: "/cv/EN/Full-Stack/CV_Alejandro_Zumbado_FullStack_EN.pdf" },
  { label: "Frontend", lang: "ES", href: "/cv/ES/Frontend/CV_Alejandro_Zumbado_Frontend_ES.html", pdfHref: "/cv/ES/Frontend/CV_Alejandro_Zumbado_Frontend_ES.pdf" },
  { label: "Frontend", lang: "EN", href: "/cv/EN/Frontend/CV_Alejandro_Zumbado_Frontend_EN.html", pdfHref: "/cv/EN/Frontend/CV_Alejandro_Zumbado_Frontend_EN.pdf" },
  { label: "Backend", lang: "ES", href: "/cv/ES/Backend/CV_Alejandro_Zumbado_Backend_ES.html", pdfHref: "/cv/ES/Backend/CV_Alejandro_Zumbado_Backend_ES.pdf" },
  { label: "Backend", lang: "EN", href: "/cv/EN/Backend/CV_Alejandro_Zumbado_Backend_EN.html", pdfHref: "/cv/EN/Backend/CV_Alejandro_Zumbado_Backend_EN.pdf" },
  { label: "Videojuegos & VR", lang: "ES", href: "/cv/ES/Videojuegos-VR/CV_Alejandro_Zumbado_Videojuegos_VR_ES.html", pdfHref: "/cv/ES/Videojuegos-VR/CV_Alejandro_Zumbado_Videojuegos_VR_ES.pdf" },
  { label: "Video Games & VR", lang: "EN", href: "/cv/EN/Video-Games-VR/CV_Alejandro_Zumbado_VideoGames_VR_EN.html", pdfHref: "/cv/EN/Video-Games-VR/CV_Alejandro_Zumbado_VideoGames_VR_EN.pdf" },
  { label: "General (no técnico)", lang: "ES", href: "/cv/ES/General-No-Tecnico/CV_Alejandro_Zumbado_General_ES.html", pdfHref: "/cv/ES/General-No-Tecnico/CV_Alejandro_Zumbado_General_ES.pdf" },
  { label: "General (non-technical)", lang: "EN", href: "/cv/EN/General-Non-Technical/CV_Alejandro_Zumbado_General_EN.html", pdfHref: "/cv/EN/General-Non-Technical/CV_Alejandro_Zumbado_General_EN.pdf" },
];
