import ganiyatHeadshot from "../assets-optimized/ganiyat_bw.webp";
import excursion from "../assets-optimized/excursion.webp";
import eid from "../assets-optimized/eid.webp";
import mindeaseShot from "../assets-optimized/mindease_dashboard.webp";
import emotionShot from "../assets-optimized/emotion_demo.webp";
import reuniteShot from "../assets-optimized/reunite_dashboard.webp";

export const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const INK = "#0B0A24";

// [name, glyph, x%, y%, rotation, background, text colour, font size]
export const TOOL_PILLS = [
  ["React", "Re", 22, 2, -12, "#FF5A5F", INK, 30],
  ["Spring Boot", "Sb", 60, 9, 6, "#FBF6C4", INK, 26],
  ["TypeScript", "Ts", 2, 17, -8, "#F7F7FB", INK, 20],
  ["Python", "Py", 16, 30, -14, "#FFFFFF", INK, 34],
  ["PostgreSQL", "Pg", 64, 27, 5, "#9AA0F5", INK, 24],
  ["FastAPI", "Fa", 30, 47, -4, "#3D6BF6", "#FFFFFF", 30],
  ["PyTorch", "Pt", 74, 44, 20, "#F9C9AD", INK, 24],
  ["Hugging Face", "Hf", 8, 62, 8, "#F9C9AD", INK, 26],
  ["Docker", "Dk", 66, 63, -10, "#9AA0F5", INK, 26],
  ["Gemini API", "Gm", 16, 80, -6, "#B7F7A6", INK, 30],
  ["Flask", "Fl", 70, 84, 4, "#FBF6C4", INK, 24],
].map(([name, glyph, x, y, rotate, bg, fg, size]) => ({ name, glyph, x, y, rotate, bg, fg, size }));

export const PHOTOS = [
  { src: ganiyatHeadshot, alt: "Portrait of Ganiyat", caption: "Behind the code", ratio: "4 / 5", desktop: { left: "4%", top: 0, width: "62%" }, mobile: { left: 0, top: 0, width: "64%" }, rotate: -4 },
  { src: excursion, alt: "Nature excursion", caption: "Nature excursion", ratio: "1 / 1", desktop: { right: 0, top: "30%", width: "46%" }, mobile: { right: 0, top: "34%", width: "50%" }, rotate: 7 },
  { src: eid, alt: "Eid celebration", caption: "Eid celebration", ratio: "1 / 1", desktop: { left: "14%", bottom: 0, width: "42%" }, mobile: { left: "8%", bottom: 0, width: "44%" }, rotate: -9 },
];

export const INTEREST_TAGS = [
  ["Thrillers", "#1E50F0", "#FFFFFF", -3],
  ["Romance novels", "#F9C9AD", INK, 2],
  ["Anime", "#B7F7A6", INK, -2],
  ["Short films", "#FBF6C4", INK, 3],
  ["Poetry", "#9AA0F5", INK, -4],
  ["Long walks", "#E4E7F6", INK, 2],
  ["Tourism tech", "#FF5A5F", INK, -2],
].map(([label, bg, fg, rotate]) => ({ label, bg, fg, rotate }));

export const PROJECTS = [
  {
    title: "MindEase",
    tag: "Flagship project",
    year: "2025 to 2026",
    sub: "AI-powered student stress management system",
    body: "Final-year project. A full-stack mental wellness app with conversational support, emotion detection, mood tracking and guided breathing. I built the React frontend, Spring Boot backend, Python emotion-detection service, auth, database layer and AI integration as one modular system.",
    short: "A full-stack mental wellness app with chat support, emotion detection, mood tracking and guided breathing. I built the frontend, backend, AI service and database layer.",
    tech: ["React", "TypeScript", "Spring Boot", "Python", "Flask", "PostgreSQL", "Hugging Face", "Gemini API", "JWT", "Docker"],
    link: "https://github.com/ghanneeyyah/mindease",
    shot: mindeaseShot,
    bg: "#1E50F0",
    fg: "#FFFFFF",
  },
  {
    title: "Emotion Detector API",
    tag: "Solo · ML and backend",
    year: "2026",
    sub: "Emotion classification from natural-language text",
    body: "An NLP REST API that sorts text into 28 emotion categories with a fine-tuned transformer model, returning confidence scores through a FastAPI endpoint.",
    short: "An NLP REST API that sorts text into 28 emotion categories with a fine-tuned transformer, returning confidence scores through FastAPI.",
    tech: ["Python", "FastAPI", "PyTorch", "Pandas", "GoEmotions", "REST API"],
    link: "https://feelings-jar-demo.onrender.com/",
    shot: emotionShot,
    bg: "#9AA0F5",
    fg: INK,
  },
  {
    title: "Reunite AI",
    tag: "Hackathon team",
    year: "2025",
    sub: "AI-powered solution for a real-world problem",
    body: "Built with a hackathon team on a tight clock. I worked on the technical build and helped turn the first idea into a working prototype.",
    short: "Built with a hackathon team on a tight clock. I worked on the technical build and helped turn the first idea into a working prototype.",
    tech: ["AI", "Python", "JavaScript", "REST APIs"],
    link: "https://frontends-evmq.onrender.com/",
    shot: reuniteShot,
    bg: "#FFFFFF",
    fg: INK,
  },
  {
    title: "In the works",
    tag: "Currently building",
    year: "Soon",
    sub: "Details coming soon",
    body: "A new build is underway. Check back for the full story.",
    short: "A new build is underway. Check back for the full story.",
    tech: ["Coming soon"],
    link: "",
    shot: null,
    bg: "#FF5A5F",
    fg: INK,
  },
];

// Months are counted from January 2023 (0) to December 2026 (47).
export const TIMELINE_MONTHS = 48;
export const NOW_MONTH = 46.3;

export const EXPERIENCE = [
  {
    short: "B.Sc. Computer Science",
    title: "B.Sc. Computer Science",
    org: "[UNIVERSITY]",
    period: "[START YEAR] to 2026",
    from: 0,
    to: 44,
    body: "[One or two lines on focus areas, coursework or societies.]",
    tech: [],
    bg: "#1E50F0",
    fg: "#FFFFFF",
  },
  {
    short: "Reunite AI",
    title: "Reunite AI",
    org: "Hackathon team",
    period: "2025",
    from: 27,
    to: 30,
    body: "Built with a hackathon team on a tight clock. I worked on the technical build and helped turn the first idea into a working prototype.",
    tech: ["AI", "Python", "JavaScript", "REST APIs"],
    bg: "#F9C9AD",
    fg: INK,
  },
  {
    short: "MindEase · Final-year project",
    title: "MindEase",
    org: "Final-year project",
    period: "2025 to 2026",
    from: 30,
    to: 44,
    body: "A full-stack mental wellness app with conversational support, emotion detection, mood tracking and guided breathing. I built the frontend, backend, emotion-detection service, auth, database layer and AI integration.",
    tech: ["React", "Spring Boot", "Python", "PostgreSQL", "Gemini API", "Docker"],
    bg: "#5D52E0",
    fg: "#FFFFFF",
  },
  {
    short: "Emotion Detector API",
    title: "Emotion Detector API",
    org: "Solo build",
    period: "2026",
    from: 37,
    to: 41,
    body: "An NLP REST API that sorts text into 28 emotion categories with a fine-tuned transformer, returning confidence scores through FastAPI.",
    tech: ["Python", "FastAPI", "PyTorch", "GoEmotions"],
    bg: "#B7F7A6",
    fg: INK,
  },
];

export const LINKS = [
  // Deeper, muted versions of the white / cream / coral pills, with light text.
  { name: "GitHub", handle: "@ghanneeyyah", href: "https://github.com/ghanneeyyah", bg: "#2E2D66", fg: "#F2F0E8", rotate: -5, indent: "6%", icon: "code" },
  { name: "LinkedIn", handle: "Ganiyat O.", href: "https://www.linkedin.com/in/ganiyat-o-32344b250", bg: "#5E5733", fg: "#F2F0E8", rotate: 4, indent: "22%", icon: "linkedin" },
  { name: "Email", handle: "olaiwonganiyat18@gmail.com", href: "mailto:olaiwonganiyat18@gmail.com", bg: "#8E3539", fg: "#F2F0E8", rotate: -3, indent: "2%", icon: "mail" },
];

export const NOTE_COLOURS = ["#FBF6C4", "#B7F7A6", "#F9C9AD", "#FFFFFF", "#9AA0F5"];
