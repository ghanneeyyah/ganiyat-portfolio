import ganiyat_headshot from "../assets-optimized/ganiyat_bw.webp";
import reunite_dashboard from "../assets-optimized/reunite_dashboard.webp";
import mindease_dashboard from "../assets-optimized/mindease_dashboard.webp";
import emotion_demo from "../assets-optimized/emotion_demo.webp";
import birthday from "../assets-optimized/birthday.webp";
import eid from "../assets-optimized/eid.webp";
import excursion from "../assets-optimized/excursion.webp";
import findout from "../assets-optimized/findout.webp";
import signout from "../assets-optimized/signout.webp";

export const PROFILE = {
  name: "Olaiwon Ganiyat",
  handle: "ghanneeyyah",
  role: "Full-stack developer",
  intro:
    "Computer science student and full-stack developer who enjoys turning ideas and real-world problems into working software. Usually found at the backend, building APIs, designing databases, and figuring out how to make applications reliable, scalable, and actually useful.",
  headshot: ganiyat_headshot,
};

export const PROJECTS = [
  {
    key: "mindease",
    title: "MindEase",
    tag: "Flagship project",
    sub: "AI-powered student stress management system",
    body: "Final-year project: a full-stack mental wellness app with conversational support, emotion detection, mood tracking, and guided breathing. Built the React frontend, Spring Boot backend, Python emotion-detection service, auth, database layer, and AI integration as a modular system.",
    tech: ["React", "TypeScript", "Spring Boot", "Python", "Flask", "PostgreSQL", "Hugging Face", "Gemini API", "JWT", "Docker"],
    year: "2025–2026",
    link: "https://github.com/ghanneeyyah/mindease",
    image: mindease_dashboard,
  },
  {
    key: "emotion",
    title: "Emotion Detector API",
    tag: "Solo · ML / Backend",
    sub: "Emotion classification API from natural-language text",
    body: "An NLP-powered REST API that classifies text into 28 emotion categories using a fine-tuned transformer model, with confidence scores returned through a FastAPI endpoint.",
    tech: ["Python", "FastAPI", "PyTorch", "Pandas", "GoEmotions", "REST API"],
    year: "2026",
    link: "https://feelings-jar-demo.onrender.com/",
    image: emotion_demo,
  },
  {
    key: "reunite",
    title: "Reunite AI",
    tag: "Hackathon team",
    sub: "AI-powered solution for a real-world problem",
    body: "Built as part of a hackathon team within a limited timeframe. Contributed to the technical implementation and helped turn the initial idea into a functional prototype.",
    tech: ["AI", "Python", "JavaScript", "REST APIs"],
    year: "2025",
    link: "https://frontends-evmq.onrender.com/",
    image: reunite_dashboard,
  },
  {
    key: "wip",
    title: "In the works",
    tag: "Currently building",
    sub: "Details coming soon",
    body: "A new build is underway. Check back for the full story.",
    tech: [],
    year: "Soon",
    link: null,
    image: null,
  },
];

// TODO(ganiyat): the old site had no experience section. Replace these
// placeholder rows with real roles before merging.
export const EXPERIENCE = [
  { key: "x1", role: "[Role]", org: "[Company or organisation]", years: "[Year] to [Year]" },
  { key: "x2", role: "[Role]", org: "[Company or organisation]", years: "[Year] to [Year]" },
  { key: "x3", role: "[Role]", org: "[Company or organisation]", years: "[Year] to [Year]" },
];

export const ABOUT = {
  overview: [
    "I love solving problems, especially problems that have a direct impact on people's safety and everyday lives. Ever since I was a kid, I've been curious about how people live, what challenges they face, and how those challenges could be solved in ways that actually fit into their lifestyles. That curiosity eventually led me to technology.",
    "I'm especially drawn to problems that sit at the intersection of people and technology, problems that require me to understand not just what needs to be built, but why it needs to exist in the first place. Right now, I'm exploring tourism and the problems within it, particularly how technology can make travelling and experiencing new places safer, easier, and more meaningful.",
  ],
  hobbiesTitle: "When I'm not shipping code,",
  hobbies: [
    "I'm probably reading. I'm an avid reader who believes in escaping reality when things get tough, and my safe space is somewhere between thriller and romance novels.",
    "I genuinely believe that humans are born creative. Apart from reading, I watch movies, anime, and short films, and I read poetry and articles. When I'm not reading or watching something, I'm probably taking a long stroll, and I love conversations that involve asking complex questions and exploring ideas that make me think.",
  ],
  photos: [
    { key: "g1", rotate: -6, caption: "20th birthday", src: birthday },
    { key: "g2", rotate: 4, caption: "Eid celebration", src: eid },
    { key: "g3", rotate: -3, caption: "Nature excursion", src: excursion },
    { key: "g4", rotate: 7, caption: "Discovery day", src: findout },
    { key: "g5", rotate: -8, caption: "Sign-out", src: signout },
  ],
};

export const LINKS = [
  { name: "GitHub", handle: "@ghanneeyyah", href: "https://github.com/ghanneeyyah" },
  { name: "LinkedIn", handle: "ganiyat-o-32344b250", href: "https://www.linkedin.com/in/ganiyat-o-32344b250" },
  { name: "Email", handle: "olaiwonganiyat18@gmail.com", href: "mailto:olaiwonganiyat18@gmail.com" },
];
