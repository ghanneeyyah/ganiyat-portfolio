// Home.jsx
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import LazyImage from "./components/LazyImage";
import DOMPurify from 'dompurify';

// NOTE: point these at your optimized webp output (see scripts/optimize-images.js).
// Run `npm run optimize-images` first, which writes to src/assets-optimized/.
import ganiyat_headshot from "./assets-optimized/ganiyat_bw.webp";
import reunite_dashboard from "./assets-optimized/reunite_dashboard.webp";
import mindease_dashboard from "./assets-optimized/mindease_dashboard.webp";
import emotion_demo from "./assets-optimized/emotion_demo.webp";
import birthday from "./assets-optimized/birthday.webp";
import eid from "./assets-optimized/eid.webp";
import excursion from "./assets-optimized/excursion.webp";
import findout from "./assets-optimized/findout.webp";
import signout from "./assets-optimized/signout.webp";

// Firebase is now loaded lazily — see useComments() below — so it never
// blocks first paint and isn't in the main bundle at all until someone
// actually rotates to the CONNECT face.

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const GREEN = "#39ff88";
const ANIMATION = {
  ROPE_DURATION: 1500,
  SPIN_DURATION: 900,
  MAST_HIDE_DELAY: 2200,
  TYPEWRITER_SPEED: 85,
};
const LIMITS = {
  COMMENT_NAME_MAX: 60,
  COMMENT_MESSAGE_MAX: 500,
  RATE_LIMIT_MS: 10000,
};

/* ------------------------------------------------------------------ */
/* Typewriter hook                                                     */
/* ------------------------------------------------------------------ */
function useTypewriter(text, { speed = 60, startDelay = 0, pauseBeforeLoop = 1800, loop = false } = {}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let typeTimer, loopTimer;
    setOut("");
    const start = setTimeout(() => {
      typeTimer = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(typeTimer);
          if (loop) {
            loopTimer = setTimeout(() => {
              i = 0;
              setOut("");
              typeTimer = setInterval(() => {
                i += 1;
                setOut(text.slice(0, i));
                if (i >= text.length) clearInterval(typeTimer);
              }, speed);
            }, pauseBeforeLoop);
          }
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(typeTimer); clearTimeout(loopTimer); };
  }, [text, speed, startDelay, pauseBeforeLoop, loop]);
  return out;
}

/* ------------------------------------------------------------------ */
/* Content — three faces of the mast.                                  */
/* ------------------------------------------------------------------ */

const STOPS_WORK = [
  { key: "wip", label: "Above the nest", height: "240 FT", kind: "wip", tag: "Currently building", title: "In the works", sub: "Details coming soon", body: "A new build is underway — check back for the full story.", image: null },
  { key: "nest", label: "Crow's nest", height: "210 FT", kind: "hero", tag: "Flagship project", title: "MindEase", sub: "AI-powered student stress management system", body: "Final-year project: a full-stack mental wellness app with conversational support, emotion detection, mood tracking, and guided breathing. Built the React frontend, Spring Boot backend, Python emotion-detection service, auth, database layer, and AI integration as a modular system.", tech: ["React", "TypeScript", "Spring Boot", "Python", "Flask", "PostgreSQL", "Hugging Face", "Gemini API", "JWT", "Docker"], year: "2025–2026", link: "https://github.com/ghanneeyyah/mindease", image: mindease_dashboard },
  { key: "p2", label: "Upper mast", height: "140 FT", kind: "project", tag: "Solo · ML / Backend", title: "Emotion Detector API", sub: "Emotion classification API from natural-language text", body: "An NLP-powered REST API that classifies text into 28 emotion categories using a fine-tuned transformer model, with confidence scores returned through a FastAPI endpoint.", tech: ["Python", "FastAPI", "PyTorch", "Pandas", "GoEmotions", "REST API"], year: "2026", link: "https://feelings-jar-demo.onrender.com/", image: emotion_demo },
  { key: "p1", label: "Mid mast", height: "90 FT", kind: "project", tag: "Hackathon team", title: "Reunite AI", sub: "AI-powered solution for a real-world problem", body: "Built as part of a hackathon team within a limited timeframe — contributed to the technical implementation and helped turn the initial idea into a functional prototype.", tech: ["AI", "Python", "JavaScript", "REST APIs"], year: "2025", link: "https://frontends-evmq.onrender.com/", image: reunite_dashboard },
  { key: "deck", label: "The deck", height: "0 FT", kind: "intro", title: "Olaiwon Ganiyat", handle: "ghanneeyyah", sub: "Full-stack developer", body: "Computer science student and full-stack developer who enjoys turning ideas and real-world problems into working software. Usually found at the backend — building APIs, designing databases, and figuring out how to make applications reliable, scalable, and actually useful." },
];

const STOPS_ABOUT = [
  {
    key: "gallery", label: "Field photos", height: "SCAN 100%", kind: "gallery",
    photos: [
      { key: "g1", rotate: -6, caption: "20th birthday", src: birthday },
      { key: "g2", rotate: 4, caption: "Eid celebration", src: eid },
      { key: "g3", rotate: -3, caption: "Nature excursion", src: excursion },
      { key: "g4", rotate: 7, caption: "Discovery day", src: findout },
      { key: "g5", rotate: -8, caption: "Sign-out", src: signout },
    ],
  },
  {
    key: "hobbies", label: "Off-duty log", height: "SCAN 66%", kind: "text-card", tag: "Hobbies",
    title: "When I'm not shipping code,",
    body: "I'm probably reading. I'm an avid reader who believes in escaping reality when things get tough, and my safe space is somewhere between thriller and romance novels. \n I genuinely believe that humans are born creative. Our creativity may not always conform to society's definition of what creativity is, but either way, I believe we're all creatives. I'm on a journey to explore the different ways people express that creativity. So, apart from reading, I watch movies, anime, and short films, and I read poetry and articles. When I'm not reading or watching something, I'm probably taking a long stroll, trying to make sense of my own creative mind. And I love having conversations with people, especially when they involve asking complex questions and exploring ideas that make me think.",
  },
  {
    key: "overview", label: "Personal log", height: "SCAN 33%", kind: "text-card", tag: "Personal overview",
    title: "A bit more about me",
    body: "I love solving problems, especially problems that have a direct impact on people's safety and everyday lives. Ever since I was a kid, I've been curious about how people live, what challenges they face, and how those challenges could be solved in ways that actually fit into their lifestyles. That curiosity eventually led me to technology. I realised that technology is deeply woven into the way people live, work, communicate, and experience the world, and I wanted to be part of creating solutions that make those experiences better. I'm especially drawn to problems that sit at the intersection of people and technology, problems that require me to understand not just *what* needs to be built, but *why* it needs to exist in the first place. Right now, I'm exploring tourism and the problems within it, particularly how technology can make travelling and experiencing new places safer, easier, and more meaningful.",
  },
  { key: "photo", label: "Ship's log", height: "SCAN 0%", kind: "photo-intro", title: "Behind the code", sub: "Full-stack developer", body: "I am a cracked dev", image: ganiyat_headshot },
];

const STOPS_LINKS = [
  { key: "comments", label: "Open frequency", height: "100%", kind: "comment-wall", title: "Leave a transmission", sub: "Say hello — it lands as a ship on the wall below" },
  {
    key: "connect-intro", label: "Open channel", height: "0%", kind: "connect-intro", title: "Let's connect", sub: "Reach me here",
    links: [
      { name: "GitHub", handle: "@ghanneeyyah", href: "https://github.com/ghanneeyyah" },
      { name: "LinkedIn", handle: "ganiyat-o-32344b250", href: "https://www.linkedin.com/in/ganiyat-o-32344b250" },
      { name: "Email", handle: "olaiwonganiyat18@gmail.com", href: "mailto:olaiwonganiyat18@gmail.com" },
    ],
  },
];

const FACES_META = [
  { key: "work", name: "WORK", verb: "CLIMBING", altPrefix: "ALT", stops: STOPS_WORK },
  { key: "about", name: "ABOUT", verb: "SCANNING", altPrefix: "SCAN", stops: STOPS_ABOUT },
  { key: "connect", name: "CONNECT", verb: "SIGNALING", altPrefix: "SIGNAL", stops: STOPS_LINKS },
];

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

// Corner brackets used by BracketCard, IntroBlock's photo frame, and
// anywhere else that wants the "targeting reticle" look. Pulled out once
// instead of duplicated three times.
const CornerBrackets = React.memo(function CornerBrackets({ accent, size = "w-3 h-3" }) {
  return (
    <>
      {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} ${size} z-10`}
          style={{
            borderTop: i < 2 ? `2px solid ${accent}` : "none",
            borderBottom: i >= 2 ? `2px solid ${accent}` : "none",
            borderLeft: i % 2 === 0 ? `2px solid ${accent}` : "none",
            borderRight: i % 2 === 1 ? `2px solid ${accent}` : "none",
          }}
        />
      ))}
    </>
  );
});

const BracketCard = React.memo(function BracketCard({ children, accent }) {
  return (
    <div className="relative border border-white/12 bg-white/[0.03] px-4 py-5 sm:px-6 sm:py-6 max-w-md w-full">
      <CornerBrackets accent={accent} />
      {children}
    </div>
  );
});

// Twinkling star backdrop, used only behind the About face.
const Starfield = React.memo(function Starfield() {
  const stars = React.useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        key: i,
        top: (i * 37) % 100,
        left: (i * 53) % 100,
        size: 1 + (i % 3),
        delay: (i % 6) * 0.4,
        duration: 2 + (i % 4),
      })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <span
          key={s.key}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: 0.5,
            animation: `twinkleStar ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <div
        className="absolute rounded-full"
        style={{ top: "12%", right: "10%", width: 46, height: 46, background: `radial-gradient(circle at 35% 30%, ${GREEN}55, transparent 70%)`, opacity: 0.5 }}
      />
      <div
        className="absolute rounded-full border"
        style={{ bottom: "18%", left: "8%", width: 70, height: 70, borderColor: `${GREEN}33`, opacity: 0.4 }}
      />
    </div>
  );
});

// A single scattered photo, rotated like it's been pinned to a corkboard.
// Uses LazyImage — IntersectionObserver-based, so it fetches only once the
// gallery scrolls near the viewport rather than on initial mount (which
// matters here since all three mast faces stay mounted simultaneously).
const PolaroidPhoto = React.memo(function PolaroidPhoto({ src, caption, rotate = 0 }) {
  return (
    <div
      className="bg-white/[0.04] border border-white/12 p-1.5 pb-2.5 sm:p-2 sm:pb-3 w-28 sm:w-40 shrink-0"
      style={{ transform: `rotate(${rotate * 0.6}deg)`, boxShadow: "0 8px 16px -6px rgba(0,0,0,0.5)" }}
    >
      {src ? (
        <LazyImage
          src={src}
          alt={caption}
          className="w-full h-24 sm:h-32 object-cover"
        />
      ) : (
        <div
          className="w-full h-24 sm:h-32 flex items-center justify-center text-[9px] font-mono tracking-widest text-white/30"
          style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 8px, transparent 8px, transparent 16px)" }}
        >
          PHOTO
        </div>
      )}
      <p className="text-[9px] sm:text-[10px] font-mono text-white/40 mt-1.5 sm:mt-2 text-center truncate">{caption}</p>
    </div>
  );
});

// Project dashboard / demo screenshots — same LazyImage treatment as the
// gallery photos.
const Screenshot = React.memo(function Screenshot({ label, src }) {
  if (src) {
    return (
      <div className="mt-4 border border-white/10 overflow-hidden">
        <LazyImage
          src={src}
          alt={label}
          className="w-full h-auto block"
        />
      </div>
    );
  }
  return (
    <div className="mt-4 border border-white/10 overflow-hidden">
      <div
        className="w-full flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40"
        style={{
          height: 120,
          background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 10px, transparent 10px, transparent 20px)",
        }}
      >
        {label}
      </div>
    </div>
  );
});

function IntroBlock({ stop }) {
  const name = useTypewriter(stop.title, { speed: 85, startDelay: 300 });
  const role = useTypewriter(stop.sub, { speed: 55, startDelay: 300 + stop.title.length * 85 + 400, loop: true, pauseBeforeLoop: 2200 });
  const nameDone = name.length >= stop.title.length;
  const roleDone = role.length >= stop.sub.length;
  const hasImage = Boolean(stop.image);
  return (
    <div className={`w-full flex flex-col-reverse gap-6 sm:gap-10 ${hasImage ? "sm:flex-row items-center sm:items-start" : "items-center"}`}>
      <div className={`flex-1 min-w-0 ${hasImage ? "text-center sm:text-left" : "text-center flex flex-col items-center"}`}>
        <p className="font-mono text-[10px] sm:text-xs tracking-widest text-white/40 mb-2">HI, MY NAME IS</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight break-words">
          {name}
          <span style={{ color: GREEN, opacity: nameDone ? 0 : 1, animation: "blinkCursor 0.9s step-end infinite" }}>|</span>
        </h1>
        {stop.handle && <p className="text-xs mt-2 font-mono text-white/40">@{stop.handle}</p>}
        <p className="text-base sm:text-lg mt-3 min-h-[1.5em]" style={{ color: GREEN }}>
          {role}
          {nameDone && <span style={{ opacity: roleDone ? 0 : 1, animation: "blinkCursor 0.9s step-end infinite" }}>|</span>}
        </p>
        <p className={`text-sm mt-4 leading-relaxed max-w-sm text-white/60 ${hasImage ? "mx-auto sm:mx-0" : "mx-auto"}`}>{stop.body}</p>
      </div>

      {stop.image && (
        <div className="relative shrink-0 w-28 h-28 sm:w-44 sm:h-44">
          <CornerBrackets accent={GREEN} size="w-4 h-4" />
          <div className="w-full h-full border border-white/12 bg-white/[0.03] overflow-hidden">
            {/* This is the one image genuinely visible on first paint (deck/intro
                stop of the WORK face) — eager + high priority, no observer wait. */}
            <LazyImage
              src={stop.image}
              alt={stop.title}
              className="w-full h-full object-cover"
              eager
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Face 1 — WORK stop renderer                                         */
/* ------------------------------------------------------------------ */

function StopWork({ stop, isBottom }) {
  const isHero = stop.kind === "hero";
  const isWip = stop.kind === "wip";
  const isIntro = stop.kind === "intro";

  return (
    <section id={`stop-${stop.key}`} className={`py-10 sm:py-16 flex flex-col ${isIntro && stop.image ? "items-center sm:items-start" : "items-center"} ${isBottom ? "pb-20 sm:pb-24" : ""}`}>
      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-white/35 mb-3 text-center">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <IntroBlock stop={stop} />
      ) : isHero ? (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">{stop.title}</h2>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-3 leading-relaxed text-white/65">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={stop.image} />
          <div className="flex flex-wrap gap-2 mt-4">
            {stop.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-1 border border-white/15 text-white/50">{t}</span>
            ))}
          </div>
          {stop.link && (
            <a
              href={stop.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 mt-4 font-mono text-xs tracking-widest hover:opacity-75 transition-opacity"
              style={{ color: GREEN }}
            >
              VIEW PROJECT →
            </a>
          )}
        </BracketCard>
      ) : isWip ? (
        <div className="relative border border-dashed px-4 py-5 sm:px-6 sm:py-6 max-w-md w-full" style={{ borderColor: `${GREEN}66`, background: "rgba(57,255,136,0.03)" }}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ background: GREEN, color: "#001a0d" }}>{stop.tag}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-3">{stop.title}</h3>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label="Work in progress" src={stop.image} />
        </div>
      ) : (
        <div className="relative border border-white/12 bg-white/[0.03] px-4 py-5 sm:px-6 sm:py-6 max-w-md w-full">
          <span className="font-mono text-[10px] tracking-widest text-white/40">{stop.tag}</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">{stop.title}</h3>
          <p className="text-sm mt-1 text-white/55">{stop.sub}</p>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={stop.image} />
          <div className="flex flex-wrap gap-2 mt-3">
            {stop.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-1 border border-white/15 text-white/45">{t}</span>
            ))}
          </div>
          {stop.link && (
            <a
              href={stop.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 mt-3 font-mono text-xs tracking-widest hover:opacity-75 transition-opacity"
              style={{ color: GREEN }}
            >
              VIEW PROJECT →
            </a>
          )}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Face 2 — ABOUT stop renderer                                        */
/* ------------------------------------------------------------------ */

function StopAbout({ stop, isBottom }) {
  const isIntro = stop.kind === "photo-intro";
  const isGallery = stop.kind === "gallery";
  const isTextCard = stop.kind === "text-card";

  return (
    <section id={`stop-${stop.key}`} className={`py-10 sm:py-16 flex flex-col items-center ${isBottom ? "pb-20 sm:pb-24" : ""}`}>
      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-white/35 mb-3 text-center">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <div className="text-center max-w-sm">
          {stop.image ? (
            <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full border overflow-hidden" style={{ borderColor: `${GREEN}55` }}>
              {/* Not eager: this face is off-screen behind a 3D rotation on
                  first load, so it should wait for the IntersectionObserver
                  like everything else rather than fetching immediately. */}
              <LazyImage
                src={stop.image}
                alt="Olaiwon Ganiyat"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div
              className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full border overflow-hidden flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40"
              style={{
                borderColor: `${GREEN}55`,
                background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 10px, transparent 10px, transparent 20px)",
              }}
            >
              YOUR PHOTO
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-5">{stop.title}</h2>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-3 leading-relaxed text-white/60">{stop.body}</p>
        </div>
      ) : isGallery ? (
        <div className="w-full max-w-md">
          <p className="text-center font-mono text-[10px] tracking-widest mb-5 sm:mb-6" style={{ color: GREEN }}>
            ⁕ TRANSMISSION: PHOTO LOG ⁕
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-1">
            {stop.photos.map((p) => (
              <PolaroidPhoto key={p.key} src={p.src} caption={p.caption} rotate={p.rotate} />
            ))}
          </div>
        </div>
      ) : isTextCard ? (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-3">{stop.title}</h3>
          <p className="text-sm mt-2 leading-relaxed text-white/60 whitespace-pre-line">{stop.body}</p>
        </BracketCard>
      ) : (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-3">{stop.title}</h3>
          {stop.body && <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>}
          <Screenshot label={stop.title} src={stop.image} />
        </BracketCard>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Face 3 — CONNECT stop renderer                                      */
/* ------------------------------------------------------------------ */

const MiniShip = React.memo(function MiniShip({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="View this transmission"
      className="relative shrink-0 transition-transform hover:scale-110"
      style={{ width: 16, height: 26 }}
    >
      <span
        className="absolute rounded-full"
        style={{ top: 2, left: 6, width: 3, height: 3, background: GREEN, opacity: active ? 1 : 0.4 }}
      />
      <div
        className="absolute inset-x-0 top-0 bottom-1"
        style={{
          background: active
            ? `linear-gradient(180deg, ${GREEN}44 0%, ${GREEN}11 100%)`
            : "linear-gradient(180deg, #2a2f3a 0%, #1a1e26 100%)",
          border: `1px solid ${active ? GREEN : `${GREEN}33`}`,
          borderRadius: "50% 50% 20% 20% / 60% 60% 15% 15%",
        }}
      />
    </button>
  );
});

// Firestore is loaded lazily so it never blocks initial page render — it's
// only pulled in (and only subscribes) once the visitor actually reaches
// the CONNECT face.
function useComments(enabled) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dbRef = useRef(null);
  const addDocRef = useRef(null);
  const serverTimestampRef = useRef(null);
  const collectionRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      // If disabled but we had previous data, keep it
      return;
    }
    let unsubscribe = () => {};
    let cancelled = false;

    (async () => {
      try {
        const [{ initializeApp }, firestore] = await Promise.all([
          import("firebase/app"),
          import("firebase/firestore"),
        ]);
        if (cancelled) return;

        const { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } = firestore;

        // Validate environment variables
        const firebaseConfig = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };

        // Check if config exists
        if (!firebaseConfig.apiKey) {
          console.warn('Firebase config missing. Comments will not work.');
          setLoading(false);
          setError('Comments are currently unavailable.');
          return;
        }

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        dbRef.current = db;
        addDocRef.current = addDoc;
        serverTimestampRef.current = serverTimestamp;
        collectionRef.current = collection;

        const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));
        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (cancelled) return;
            setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
            setError(null);
          },
          (err) => {
            console.error("Failed to load comments:", err);
            if (!cancelled) {
              setLoading(false);
              setError('Could not load comments. Please try again later.');
            }
          }
        );
      } catch (err) {
        console.error("Failed to initialize Firebase:", err);
        if (!cancelled) {
          setLoading(false);
          setError('Comments are currently unavailable.');
        }
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [enabled]);

  const addComment = useCallback(async ({ name, message }) => {
    if (!dbRef.current) {
      throw new Error('Firebase not initialized');
    }
    try {
      await addDocRef.current(collectionRef.current(dbRef.current, "comments"), {
        name: DOMPurify.sanitize(name),
        message: DOMPurify.sanitize(message),
        createdAt: serverTimestampRef.current(),
      });
    } catch (err) {
      console.error("Failed to add comment:", err);
      throw new Error('Could not send your transmission. Please try again.');
    }
  }, []);

  return { comments, loading, error, addComment };
}

function CommentWall({ stop, comments, onAddComment, loading, error: firebaseError }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const userSelectedId = useRef(null);
  const [lastCommentTime, setLastCommentTime] = useState(0);
  const [rateLimitError, setRateLimitError] = useState("");

  // Auto-select newest comment if user hasn't manually selected
  useEffect(() => {
    if (comments.length === 0) {
      setSelectedId(null);
      userSelectedId.current = null;
      return;
    }
    
    if (!userSelectedId.current) {
      setSelectedId(comments[comments.length - 1].id);
    }
  }, [comments]);

  const selectedIndex = comments.findIndex((c) => c.id === selectedId);
  const selected = selectedIndex >= 0 ? comments[selectedIndex] : null;

  const step = (dir) => {
    if (comments.length === 0) return;
    const next = (selectedIndex + dir + comments.length) % comments.length;
    const nextId = comments[next].id;
    userSelectedId.current = nextId;
    setSelectedId(nextId);
  };

  const handleCommentSelect = (id) => {
    userSelectedId.current = id;
    setSelectedId(id);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;
    
    // Rate limiting
    const now = Date.now();
    if (now - lastCommentTime < LIMITS.RATE_LIMIT_MS) {
      setRateLimitError(`Please wait ${Math.ceil((LIMITS.RATE_LIMIT_MS - (now - lastCommentTime)) / 1000)} seconds between transmissions`);
      setTimeout(() => setRateLimitError(""), 4000);
      return;
    }
    
    setRateLimitError("");
    setSubmitting(true);
    setError("");
    try {
      await onAddComment({ 
        name: name.trim() || "Anonymous", 
        message: message.trim() 
      });
      setMessage("");
      setLastCommentTime(now);
    } catch (err) {
      setError(err.message || "Couldn't send that — try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl sm:text-2xl font-bold text-white text-center">{stop.title}</h2>
      <p className="text-sm mt-1 mb-6 text-center" style={{ color: GREEN }}>{stop.sub}</p>

      <form onSubmit={submit} className="flex flex-col gap-2 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          maxLength={LIMITS.COMMENT_NAME_MAX}
          className="bg-white/[0.03] border border-white/12 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--g)]"
          style={{ "--g": GREEN }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
          rows={3}
          maxLength={LIMITS.COMMENT_MESSAGE_MAX}
          className="bg-white/[0.03] border border-white/12 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--g)] resize-none"
          style={{ "--g": GREEN }}
        />
        {rateLimitError && <p className="text-xs text-yellow-400/80 font-mono">{rateLimitError}</p>}
        {error && <p className="text-xs text-red-400/80 font-mono">{error}</p>}
        {firebaseError && <p className="text-xs text-red-400/80 font-mono">{firebaseError}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="self-end font-mono text-xs tracking-widest px-4 py-2 border transition-colors hover:bg-[var(--g)] hover:text-black disabled:opacity-50 disabled:pointer-events-none"
          style={{ color: GREEN, borderColor: `${GREEN}66`, "--g": GREEN }}
        >
          {submitting ? "LAUNCHING…" : "LAUNCH ↑"}
        </button>
      </form>

      {loading ? (
        <p className="text-center font-mono text-[11px] tracking-widest text-white/30">SCANNING FREQUENCY…</p>
      ) : comments.length === 0 ? (
        <p className="text-center font-mono text-[11px] tracking-widest text-white/30">NO TRANSMISSIONS YET — BE THE FIRST</p>
      ) : (
        <div>
          <p className="text-center font-mono text-[10px] tracking-widest mb-3" style={{ color: GREEN }}>
            ⁕ INCOMING FLEET · {comments.length} ⁕
          </p>

          <div className="flex items-end gap-2 overflow-x-auto scrollbar-hide px-1 pb-1">
            {comments.map((c) => (
              <MiniShip key={c.id} active={c.id === selectedId} onClick={() => handleCommentSelect(c.id)} />
            ))}
          </div>

          {selected && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => step(-1)}
                aria-label="Previous transmission"
                className="shrink-0 font-mono text-xs px-1.5 py-3 text-white/40 hover:text-[var(--g)] transition-colors disabled:opacity-30"
                style={{ "--g": GREEN }}
                disabled={comments.length < 2}
              >
                ◀
              </button>

              <div className="flex-1 min-w-0 border border-white/12 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[10px] tracking-widest truncate" style={{ color: GREEN }}>
                    {DOMPurify.sanitize(selected.name.toUpperCase())}
                  </p>
                  <span className="font-mono text-[9px] text-white/30 shrink-0">
                    {selectedIndex + 1}/{comments.length}
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-1 break-words">
                  {DOMPurify.sanitize(selected.message)}
                </p>
              </div>

              <button
                onClick={() => step(1)}
                aria-label="Next transmission"
                className="shrink-0 font-mono text-xs px-1.5 py-3 text-white/40 hover:text-[var(--g)] transition-colors disabled:opacity-30"
                style={{ "--g": GREEN }}
                disabled={comments.length < 2}
              >
                ▶
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StopConnect({ stop, isBottom, comments, onAddComment, commentsLoading, commentsError }) {
  const isIntro = stop.kind === "connect-intro";
  const isCommentWall = stop.kind === "comment-wall";

  return (
    <section id={`stop-${stop.key}`} className={`py-10 sm:py-16 flex flex-col items-center ${isBottom ? "pb-20 sm:pb-24" : ""}`}>
      <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-white/35 mb-3 text-center">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <div className="text-center max-w-sm w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{stop.title}</h2>
          <p className="text-sm mt-1 mb-5" style={{ color: GREEN }}>{stop.sub}</p>
          <div className="flex flex-col gap-2">
            {stop.links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-white/12 px-4 py-3 hover:border-[var(--g)] transition-colors"
                style={{ "--g": GREEN }}
              >
                <span className="font-mono text-xs tracking-widest text-white/70">{l.name.toUpperCase()}</span>
                <span className="text-xs text-white/40 truncate ml-2">{l.handle}</span>
              </a>
            ))}
          </div>
        </div>
      ) : isCommentWall ? (
        <CommentWall 
          stop={stop} 
          comments={comments} 
          onAddComment={onAddComment} 
          loading={commentsLoading}
          error={commentsError}
        />
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Engineer Character — scroll indicator + drag handle + rope-down     */
/* ------------------------------------------------------------------ */

function EngineerCharacter({ progress, onRopeDown }) {
  const [isRoping, setIsRoping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dragStartY = useRef(0);
  const dragStartProgress = useRef(0);
  const trackRef = useRef(null);
  const ropeRAF = useRef(null);

  const buttonBelow = progress > 0.85;

  const handleRopeClick = (e) => {
    e.stopPropagation();
    if (isRoping || progress < 0.7) return;

    setIsRoping(true);
    const startTime = performance.now();
    const duration = ANIMATION.ROPE_DURATION;
    const startProgress = progress;

    const animateRope = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const currentProgress = startProgress * (1 - eased);

      onRopeDown(currentProgress);

      if (t < 1) {
        ropeRAF.current = requestAnimationFrame(animateRope);
      } else {
        setIsRoping(false);
        ropeRAF.current = null;
      }
    };

    ropeRAF.current = requestAnimationFrame(animateRope);
  };

  useEffect(() => () => {
    if (ropeRAF.current) cancelAnimationFrame(ropeRAF.current);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartProgress.current = progress;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartProgress.current = progress;
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;

    const trackHeight = track.getBoundingClientRect().height;
    const deltaY = e.clientY - dragStartY.current;
    const deltaProgress = deltaY / trackHeight;
    const newProgress = Math.max(0, Math.min(1, dragStartProgress.current - deltaProgress));

    onRopeDown(newProgress);
  }, [isDragging, onRopeDown]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;

    const trackHeight = track.getBoundingClientRect().height;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const deltaProgress = deltaY / trackHeight;
    const newProgress = Math.max(0, Math.min(1, dragStartProgress.current - deltaProgress));

    onRopeDown(newProgress);
  }, [isDragging, onRopeDown]);

  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <div
      ref={trackRef}
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{
          bottom: `${progress * 100}%`,
          transition: isRoping || isDragging ? "none" : "bottom 0.15s ease-out",
        }}
      >
        {isRoping && (
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 bg-amber-300/70"
            style={{
              height: `${Math.max(progress * 400, 100)}px`,
              maxHeight: "400px",
              animation: "ropeWave 0.5s ease-in-out infinite",
            }}
          />
        )}

        <div
          className="relative flex items-center justify-center"
          style={{
            width: 40,
            height: 56,
            cursor: isDragging ? "grabbing" : "grab",
            transform: isHovering ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-label="Scroll position"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress > 0.7 && !isRoping && (
            <button
              onClick={handleRopeClick}
              className={`absolute left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono px-2 sm:px-3 py-1 sm:py-1.5 border rounded bg-black/80 hover:bg-black/90 transition-all hover:scale-105 z-50 whitespace-nowrap ${
                buttonBelow ? "top-full mt-2" : "-top-10"
              }`}
              style={{ color: GREEN, borderColor: `${GREEN}55` }}
              title="Rope down to deck"
              aria-label="Rope down to bottom"
            >
              ROPE↓
            </button>
          )}

          <div className="flex flex-col items-center pointer-events-none">
            <div className="relative">
              <div className="w-5 h-2 rounded-t-full" style={{ background: "#FFD700" }} />
              <div className="w-7 h-1.5 -mt-0.5 mx-auto rounded-sm" style={{ background: "#FFD700" }} />
            </div>
            <div className="w-4 h-4 rounded-full border relative -mt-0.5" style={{ borderColor: "#FFD700", background: "#2a1f0c" }}>
              <div className="absolute top-1.5 left-1 w-1 h-1 rounded-full bg-white" />
              <div className="absolute top-1.5 right-1 w-1 h-1 rounded-full bg-white" />
              {isHovering && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-white/30 rounded-full" />
              )}
            </div>
            <div className="w-3 h-6 mt-0.5 relative" style={{ background: "#1a3a2a" }}>
              <div className="absolute inset-x-0 top-1 h-1" style={{ background: "#FF6B35" }} />
              <div className="absolute inset-x-0 top-3 h-1" style={{ background: "#FF6B35" }} />
              <div className="absolute -left-2 top-2 w-2 h-1.5" style={{ background: "#1a3a2a", transform: "rotate(-25deg)" }} />
              <div className="absolute -right-2 top-2 w-2 h-1.5" style={{ background: "#1a3a2a", transform: "rotate(25deg)" }} />
              <div className="absolute -left-1 -bottom-2 w-1 h-2.5" style={{ background: "#2a2a2a", transform: "rotate(15deg)" }} />
              <div className="absolute -right-1 -bottom-2 w-1 h-2.5" style={{ background: "#2a2a2a", transform: "rotate(-15deg)" }} />
            </div>
            <div className="w-4 h-1 -mt-1 rounded-sm" style={{ background: "#8B4513" }} />
            <div className="absolute -right-1 bottom-1 w-1 h-2" style={{ background: "#C0C0C0" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollFace — all three stay mounted, so native scrollTop is already */
/* preserved per-face with no extra state needed.                      */
/* ------------------------------------------------------------------ */

function ScrollFace({ stops, renderStop, containerRef, isActive, onProgress, onInteract }) {
  const rafRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleScroll = useCallback((e) => {
    if (!isActive) return;
    onInteract?.();
    const el = e.target;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const max = el.scrollHeight - el.clientHeight;
      const p = max <= 0 ? 0 : Math.max(0, Math.min(1, 1 - el.scrollTop / max));
      onProgress(p);
    });
  }, [isActive, onProgress, onInteract]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onTouchStart={onInteract}
      className="h-full w-full overflow-y-auto px-4 sm:px-10 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex flex-col">
        {stops.map((s, idx) => renderStop(s, idx === stops.length - 1))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Error Boundary Component                                            */
/* ------------------------------------------------------------------ */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">🚀 Signal Lost</h2>
            <p className="text-white/60 mb-4">Something went wrong with the transmission.</p>
            <button
              onClick={() => window.location.reload()}
              className="font-mono text-xs tracking-widest px-4 py-2 border transition-colors hover:bg-[var(--g)] hover:text-black"
              style={{ color: GREEN, borderColor: `${GREEN}66`, "--g": GREEN }}
            >
              REFRESH ↑
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const [activeFace, setActiveFace] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [panelWidth, setPanelWidth] = useState(480);
  const [isMobile, setIsMobile] = useState(false);

  const [mastVisible, setMastVisible] = useState(true);
  const mastHideTimer = useRef(null);
  const revealMast = useCallback(() => {
    setMastVisible(true);
    if (mastHideTimer.current) clearTimeout(mastHideTimer.current);
    mastHideTimer.current = setTimeout(() => setMastVisible(false), ANIMATION.MAST_HIDE_DELAY);
  }, []);
  
  useEffect(() => {
    if (!isMobile) {
      if (mastHideTimer.current) clearTimeout(mastHideTimer.current);
      setMastVisible(true);
      return;
    }
    revealMast();
    return () => { if (mastHideTimer.current) clearTimeout(mastHideTimer.current); };
  }, [isMobile, revealMast]);

  const [connectVisited, setConnectVisited] = useState(false);
  useEffect(() => {
    if (activeFace === 2) setConnectVisited(true);
  }, [activeFace]);
  
  const { comments, loading: commentsLoading, error: commentsError, addComment } = useComments(connectVisited);

  const sceneRef = useRef(null);
  const scrollRefs = {
    work: useRef(null),
    about: useRef(null),
    connect: useRef(null),
  };

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    let resizeRAF = null;
    const ro = new ResizeObserver((entries) => {
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        for (const entry of entries) {
          setPanelWidth(entry.contentRect.width);
          setIsMobile(entry.contentRect.width < 640);
        }
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
    };
  }, []);

  const radius = useMemo(() => panelWidth / (2 * Math.tan(Math.PI / 3)), [panelWidth]);

  useEffect(() => {
    const key = FACES_META[activeFace].key;
    const el = scrollRefs[key].current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max <= 0 ? 0 : Math.max(0, Math.min(1, 1 - el.scrollTop / max));
    setProgress(p);
  }, [activeFace]);

  const rotate = useCallback((dir) => {
    if (spinning) return;
    setSpinning(true);
    setSpinKey((k) => k + 1);
    setActiveFace((f) => (f + dir + 3) % 3);
    setTimeout(() => setSpinning(false), ANIMATION.SPIN_DURATION);
  }, [spinning]);

  const goTo = useCallback((idx) => {
    if (spinning || idx === activeFace) return;
    setSpinning(true);
    setSpinKey((k) => k + 1);
    setActiveFace(idx);
    setTimeout(() => setSpinning(false), ANIMATION.SPIN_DURATION);
  }, [spinning, activeFace]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") rotate(1);
      if (e.key === "ArrowLeft") rotate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rotate]);

  const active = FACES_META[activeFace];

  const jumpTo = useCallback((key) => {
    const container = scrollRefs[active.key].current;
    const el = container ? container.querySelector(`#stop-${key}`) : null;
    if (el && container) container.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  }, [active.key]);

  const handleRopeDown = useCallback((newProgress) => {
    setProgress(newProgress);
    const container = scrollRefs[active.key].current;
    if (container) {
      const max = container.scrollHeight - container.clientHeight;
      container.scrollTop = max * (1 - newProgress);
    }
  }, [active.key]);

  return (
    <ErrorBoundary>
      <LoadingScreen onLoaded={() => setLoaded(true)} />
      <div
        className="w-screen h-screen relative bg-black overflow-hidden"
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        onTouchStart={revealMast}
      >
        <style>{`
          @keyframes blinkDot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
          @keyframes blinkCursor { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
          @keyframes spinIcon { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes ropeWave {
            0%, 100% { transform: translateX(-50%) rotate(-3deg); }
            50% { transform: translateX(-50%) rotate(3deg); }
          }
          @keyframes twinkleStar { 0%,100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.9; transform: scale(1.2); } }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
          }}
        />

        {/* top bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs tracking-widest text-white/80">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: GREEN, animation: "blinkDot 2s ease-in-out infinite" }} />
            <span className="hidden xs:inline">MAST.{active.verb}</span>
            <span className="xs:hidden">MAST</span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-widest px-1.5 sm:px-2 py-1 rounded border border-white/15 text-white/70">
            {active.altPrefix} {active.key === "work" ? Math.round(progress * 210) : Math.round(progress * 100)}
            {active.key === "work" ? "FT" : "%"}
          </div>
        </div>

        {/* side indicator + dots */}
        <div className="absolute top-14 sm:top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 mt-1 sm:mt-2 whitespace-nowrap">
          <span className="hidden xs:inline">SIDE {activeFace + 1}/3 ·</span> {active.name}
          <span className="flex gap-1 ml-1">
            {FACES_META.map((f, i) => (
              <button
                key={f.key}
                onClick={() => goTo(i)}
                aria-label={`Go to ${f.name} side`}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === activeFace ? GREEN : "rgba(255,255,255,0.25)" }}
              />
            ))}
          </span>
        </div>

        {/* Mast pole + engineer */}
        <div
          className="absolute left-2 sm:left-12 top-28 sm:top-32 bottom-8 sm:bottom-10 z-20 flex items-stretch gap-2 sm:gap-4 transition-all duration-300 ease-out"
          style={
            isMobile
              ? { opacity: mastVisible ? 1 : 0, transform: mastVisible ? "translateX(0)" : "translateX(-16px)", pointerEvents: mastVisible ? "auto" : "none" }
              : undefined
          }
        >
          <div className="relative w-[2px]">
            <div className="absolute inset-0 bg-white/10" />
            <div
              className="absolute bottom-0 w-full transition-all duration-150"
              style={{
                height: `${progress * 100}%`,
                background: GREEN,
                boxShadow: spinning ? `0 0 18px 3px ${GREEN}` : `0 0 8px 1px ${GREEN}`,
              }}
            />
          </div>

          <div className="relative w-7 sm:w-10 pointer-events-auto">
            <EngineerCharacter progress={progress} onRopeDown={handleRopeDown} />
          </div>

          {/* jump markers on desktop only */}
          <div className="relative w-3 hidden sm:flex flex-col justify-between items-center">
            {active.stops.slice().reverse().map((s) => (
              <button
                key={s.key}
                onClick={() => jumpTo(s.key)}
                title={`${s.label} — ${s.height}`}
                aria-label={`Jump to ${s.label}`}
                className="relative z-10 w-3 h-3 border border-white/40 hover:border-[var(--g)] transition-colors shrink-0"
                style={{ "--g": GREEN, background: "#000" }}
              />
            ))}
          </div>
        </div>

        {/* mobile-only jump markers */}
        <div className="absolute right-0 top-28 bottom-24 z-20 flex sm:hidden flex-col justify-between items-center py-1 pr-1">
          {active.stops.slice().reverse().map((s) => (
            <button
              key={s.key}
              onClick={() => jumpTo(s.key)}
              title={`${s.label} — ${s.height}`}
              aria-label={`Jump to ${s.label}`}
              className="relative z-10 w-2 h-2 border border-white/40 active:border-[var(--g)] transition-colors shrink-0"
              style={{ "--g": GREEN, background: "#000" }}
            />
          ))}
        </div>

        {/* rotate controls */}
        <button
          onClick={() => rotate(-1)}
          disabled={spinning}
          aria-label="Rotate to previous side (port)"
          className="absolute right-10 sm:right-20 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1 disabled:opacity-40"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/15 bg-black/50 backdrop-blur-sm hover:border-[var(--g)] transition-colors" style={{ "--g": GREEN }}>
            <span key={`l-${spinKey}`} style={{ color: GREEN, display: "inline-block", animation: spinning ? "spinIcon 0.7s ease-out" : "none" }}>◀</span>
          </span>
          <span className="hidden sm:block font-mono text-[9px] tracking-widest text-white/35">PORT</span>
        </button>
        <button
          onClick={() => rotate(1)}
          disabled={spinning}
          aria-label="Rotate to next side (starboard)"
          className="absolute right-1 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1 disabled:opacity-40"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/15 bg-black/50 backdrop-blur-sm hover:border-[var(--g)] transition-colors" style={{ "--g": GREEN }}>
            <span key={`r-${spinKey}`} style={{ color: GREEN, display: "inline-block", animation: spinning ? "spinIcon 0.7s ease-out" : "none" }}>▶</span>
          </span>
          <span className="hidden sm:block font-mono text-[9px] tracking-widest text-white/35">STARBOARD</span>
        </button>

        {/* the 3-sided mast content itself */}
        <div
          className={`relative z-10 h-full flex justify-center pt-24 sm:pt-28 pb-4 sm:pb-6 pr-10 sm:pr-24 sm:pl-28 transition-[padding-left] duration-300 ease-out ${isMobile ? "" : "pl-12"}`}
          style={isMobile ? { paddingLeft: mastVisible ? 48 : 16 } : undefined}
        >
          <div ref={sceneRef} className="relative w-full" style={{ perspective: 1600, height: "100%" }}>
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${activeFace * -120}deg)`,
                transition: "transform 0.9s cubic-bezier(0.65,0,0.35,1)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ transform: `rotateY(0deg) translateZ(${radius}px)`, backfaceVisibility: "hidden", pointerEvents: activeFace === 0 ? "auto" : "none" }}
              >
                <ScrollFace
                  stops={STOPS_WORK}
                  renderStop={(s, isBottom) => <StopWork key={s.key} stop={s} isBottom={isBottom} />}
                  containerRef={scrollRefs.work}
                  isActive={activeFace === 0}
                  onProgress={setProgress}
                  onInteract={revealMast}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{ transform: `rotateY(120deg) translateZ(${radius}px)`, backfaceVisibility: "hidden", pointerEvents: activeFace === 1 ? "auto" : "none" }}
              >
                <Starfield />
                <ScrollFace
                  stops={STOPS_ABOUT}
                  renderStop={(s, isBottom) => <StopAbout key={s.key} stop={s} isBottom={isBottom} />}
                  containerRef={scrollRefs.about}
                  isActive={activeFace === 1}
                  onProgress={setProgress}
                  onInteract={revealMast}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{ transform: `rotateY(240deg) translateZ(${radius}px)`, backfaceVisibility: "hidden", pointerEvents: activeFace === 2 ? "auto" : "none" }}
              >
                <ScrollFace
                  stops={STOPS_LINKS}
                  renderStop={(s, isBottom) => (
                    <StopConnect
                      key={s.key}
                      stop={s}
                      isBottom={isBottom}
                      comments={comments}
                      onAddComment={addComment}
                      commentsLoading={commentsLoading}
                      commentsError={commentsError}
                    />
                  )}
                  containerRef={scrollRefs.connect}
                  isActive={activeFace === 2}
                  onProgress={setProgress}
                  onInteract={revealMast}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 transition-opacity duration-300 pointer-events-none font-mono"
          style={{ opacity: progress < 0.05 ? 1 : 0 }}
        >
          <span className="text-white/50 text-[10px] sm:text-xs tracking-widest">SCROLL_UP.EXE</span>
          <span style={{ color: GREEN }} className="text-base sm:text-lg leading-none">↑</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}