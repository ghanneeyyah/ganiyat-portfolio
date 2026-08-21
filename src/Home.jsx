import React, { useEffect, useRef, useState, useCallback } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ganiyat_headshot from "./assets/ganiyat_headshot.jpg";
import reunite_dashboard from "./assets/reunite_dashboard.jpeg";
import mindease_dashboard from "./assets/mindease_dashboard.jpeg";
import emotion_demo from "./assets/emotion_demo.png";
import birthday from "./assets/birthday.jpg";
import eid from "./assets/eid.jpg";
import excursion from "./assets/excursion.jpg";
import findout from "./assets/findout.jpg";
import signout from "./assets/signout.jpg";

/* ------------------------------------------------------------------ */
/* Typewriter hook (unchanged)                                         */
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

const GREEN = "#39ff88";

/* ------------------------------------------------------------------ */
/* Content — three faces of the mast.                                  */
/* Each stop now carries its own `image` (or none, for the wip/deck    */
/* placeholders) so every renderer can just read `stop.image` instead  */
/* of a different hardcoded import per JSX branch.                     */
/* ------------------------------------------------------------------ */

const STOPS_WORK = [
  { key: "wip", label: "Above the nest", height: "240 FT", kind: "wip", tag: "Currently building", title: "In the works", sub: "Details coming soon", body: "A new build is underway — check back for the full story.", image: null },
  { key: "nest", label: "Crow's nest", height: "210 FT", kind: "hero", tag: "Flagship project", title: "MindEase", sub: "AI-powered student stress management system", body: "Final-year project: a full-stack mental wellness app with conversational support, emotion detection, mood tracking, and guided breathing. Built the React frontend, Spring Boot backend, Python emotion-detection service, auth, database layer, and AI integration as a modular system.", tech: ["React", "TypeScript", "Spring Boot", "Python", "Flask", "PostgreSQL", "Hugging Face", "Gemini API", "JWT", "Docker"], year: "2025–2026", link: "https://github.com/ghanneeyyah/mindease", image: mindease_dashboard },
  { key: "p2", label: "Upper mast", height: "140 FT", kind: "project", tag: "Solo · ML / Backend", title: "Emotion Detector API", sub: "Emotion classification API from natural-language text", body: "An NLP-powered REST API that classifies text into 28 emotion categories using a fine-tuned transformer model, with confidence scores returned through a FastAPI endpoint.", tech: ["Python", "FastAPI", "PyTorch", "Pandas", "GoEmotions", "REST API"], year: "2026", link: "https://feelings-jar-demo.onrender.com/", image: emotion_demo },
  { key: "p1", label: "Mid mast", height: "90 FT", kind: "project", tag: "Hackathon team", title: "Reunite AI", sub: "AI-powered solution for a real-world problem", body: "Built as part of a hackathon team within a limited timeframe — contributed to the technical implementation and helped turn the initial idea into a functional prototype.", tech: ["AI", "Python", "JavaScript", "REST APIs"], year: "2025", link: "https://frontends-evmq.onrender.com/", image: reunite_dashboard },
  { key: "deck", label: "The deck", height: "0 FT", kind: "intro", title: "Olaiwon Ganiyat", handle: "ghanneeyyah", sub: "Full-stack developer", body: "Computer science student and full-stack developer who enjoys turning ideas and real-world problems into working software. Usually found at the backend — building APIs, designing databases, and figuring out how to make applications reliable, scalable, and actually useful.", image: ganiyat_headshot },
];

// Personal face — project screenshots live on the Work face already, so
// this stays focused on the person: overview, hobbies, and a scattered
// gallery of photos, all under a space theme. Swap placeholder text/photos
// for the real thing once you send it.
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
    body: "I’m probably reading. I’m an avid reader who believes in escaping reality when things get tough, and my safe space is somewhere between thriller and romance novels. \n I genuinely believe that humans are born creative. Our creativity may not always conform to society’s definition of what creativity is, but either way, I believe we’re all creatives. I’m on a journey to explore the different ways people express that creativity. So, apart from reading, I watch movies, anime, and short films, and I read poetry and articles. When I’m not reading or watching something, I’m probably taking a long stroll, trying to make sense of my own creative mind. And I love having conversations with people, especially when they involve asking complex questions and exploring ideas that make me think.",
  },
  {
    key: "overview", label: "Personal log", height: "SCAN 33%", kind: "text-card", tag: "Personal overview",
    title: "A bit more about me",
    body: "I love solving problems, especially problems that have a direct impact on people’s safety and everyday lives. Ever since I was a kid, I’ve been curious about how people live, what challenges they face, and how those challenges could be solved in ways that actually fit into their lifestyles. That curiosity eventually led me to technology. I realised that technology is deeply woven into the way people live, work, communicate, and experience the world, and I wanted to be part of creating solutions that make those experiences better. I’m especially drawn to problems that sit at the intersection of people and technology, problems that require me to understand not just *what* needs to be built, but *why* it needs to exist in the first place. Right now, I’m exploring tourism and the problems within it, particularly how technology can make travelling and experiencing new places safer, easier, and more meaningful.",
  },
  { key: "photo", label: "Ship's log", height: "SCAN 0%", kind: "photo-intro", title: "Behind the code", sub: "Full-stack developer", body: "I am a cracked dev", image: ganiyat_headshot },
];

// Project quick-links now live on the Work face (each project card links
// out directly), so this face is just: contact info at the bottom, and a
// live comment wall above it.
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
/* Shared bits (unchanged)                                             */
/* ------------------------------------------------------------------ */

function BracketCard({ children, accent }) {
  return (
    <div className="relative border border-white/12 bg-white/[0.03] px-6 py-6 max-w-md w-full">
      {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} w-3 h-3`}
          style={{
            borderTop: i < 2 ? `2px solid ${accent}` : "none",
            borderBottom: i >= 2 ? `2px solid ${accent}` : "none",
            borderLeft: i % 2 === 0 ? `2px solid ${accent}` : "none",
            borderRight: i % 2 === 1 ? `2px solid ${accent}` : "none",
          }}
        />
      ))}
      {children}
    </div>
  );
}

// Twinkling star backdrop, used only behind the About face.
function Starfield() {
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
      {/* a couple of distant planets for depth */}
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
}

// A single scattered photo, rotated like it's been pinned to a corkboard.
// Pass a real `src` once you have photos; otherwise it shows a placeholder slot.
function PolaroidPhoto({ src, caption, rotate = 0 }) {
  return (
    <div
      className="bg-white/[0.04] border border-white/12 p-2 pb-3 w-36 sm:w-40 shrink-0"
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: "0 8px 16px -6px rgba(0,0,0,0.5)" }}
    >
      {src ? (
        <img src={src} alt={caption} className="w-full h-28 sm:h-32 object-cover" />
      ) : (
        <div
          className="w-full h-28 sm:h-32 flex items-center justify-center text-[9px] font-mono tracking-widest text-white/30"
          style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 8px, transparent 8px, transparent 16px)" }}
        >
          PHOTO
        </div>
      )}
      <p className="text-[10px] font-mono text-white/40 mt-2 text-center truncate">{caption}</p>
    </div>
  );
}

function Screenshot({ label, src }) {
  if (src) {
    return (
      <div className="mt-4 border border-white/10 overflow-hidden">
        <img src={src} alt={label} className="w-full h-auto block" />
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
}

function IntroBlock({ stop }) {
  const name = useTypewriter(stop.title, { speed: 85, startDelay: 300 });
  const role = useTypewriter(stop.sub, { speed: 55, startDelay: 300 + stop.title.length * 85 + 400, loop: true, pauseBeforeLoop: 2200 });
  const nameDone = name.length >= stop.title.length;
  const roleDone = role.length >= stop.sub.length;
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-center sm:items-start gap-8 sm:gap-10">
      <div className="text-left flex-1 min-w-0">
        <p className="font-mono text-xs tracking-widest text-white/40 mb-2">HI, MY NAME IS</p>
        <h1 className="text-5xl font-bold text-white leading-tight">
          {name}
          <span style={{ color: GREEN, opacity: nameDone ? 0 : 1, animation: "blinkCursor 0.9s step-end infinite" }}>|</span>
        </h1>
        {stop.handle && <p className="text-xs mt-2 font-mono text-white/40">@{stop.handle}</p>}
        <p className="text-lg mt-3 min-h-[1.5em]" style={{ color: GREEN }}>
          {role}
          {nameDone && <span style={{ opacity: roleDone ? 0 : 1, animation: "blinkCursor 0.9s step-end infinite" }}>|</span>}
        </p>
        <p className="text-sm mt-4 leading-relaxed max-w-sm text-white/60">{stop.body}</p>
      </div>

      {stop.image && (
        <div className="relative shrink-0 w-40 h-40 sm:w-44 sm:h-44">
          {["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} w-4 h-4 z-10`}
              style={{
                borderTop: i < 2 ? `2px solid ${GREEN}` : "none",
                borderBottom: i >= 2 ? `2px solid ${GREEN}` : "none",
                borderLeft: i % 2 === 0 ? `2px solid ${GREEN}` : "none",
                borderRight: i % 2 === 1 ? `2px solid ${GREEN}` : "none",
              }}
            />
          ))}
          <div className="w-full h-full border border-white/12 bg-white/[0.03] overflow-hidden">
            <img src={stop.image} alt={stop.title} className="w-full h-full object-cover" />
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
    <section id={`stop-${stop.key}`} className={`py-16 flex flex-col ${isIntro ? "items-start" : "items-center"} ${isBottom ? "pb-24" : ""}`}>
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/35 mb-3">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <IntroBlock stop={stop} />
      ) : isHero ? (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h2 className="text-3xl font-bold text-white mt-3">{stop.title}</h2>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-3 leading-relaxed text-white/65">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={stop.image} />
          <div className="flex flex-wrap gap-2 mt-4">
            {stop.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-1 border border-white/15 text-white/50">{t}</span>
            ))}
          </div>
        </BracketCard>
      ) : isWip ? (
        <div className="relative border border-dashed px-6 py-6 max-w-md w-full" style={{ borderColor: `${GREEN}66`, background: "rgba(57,255,136,0.03)" }}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ background: GREEN, color: "#001a0d" }}>{stop.tag}</span>
          <h3 className="text-xl font-bold text-white mt-3">{stop.title}</h3>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label="Work in progress" src={stop.image} />
        </div>
      ) : (
        <div className="relative border border-white/12 bg-white/[0.03] px-6 py-6 max-w-md w-full">
          <span className="font-mono text-[10px] tracking-widest text-white/40">{stop.tag}</span>
          <h3 className="text-2xl font-bold text-white mt-2">{stop.title}</h3>
          <p className="text-sm mt-1 text-white/55">{stop.sub}</p>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={stop.image} />
          <div className="flex flex-wrap gap-2 mt-3">
            {stop.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-1 border border-white/15 text-white/45">{t}</span>
            ))}
          </div>
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
    <section id={`stop-${stop.key}`} className={`py-16 flex flex-col items-center ${isBottom ? "pb-24" : ""}`}>
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/35 mb-3">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <div className="text-center max-w-sm">
          {stop.image ? (
            <div className="mx-auto w-32 h-32 rounded-full border overflow-hidden" style={{ borderColor: `${GREEN}55` }}>
              <img src={stop.image} alt="Olaiwon Ganiyat" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="mx-auto w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40"
              style={{
                borderColor: `${GREEN}55`,
                background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 10px, transparent 10px, transparent 20px)",
              }}
            >
              YOUR PHOTO
            </div>
          )}
          <h2 className="text-2xl font-bold text-white mt-5">{stop.title}</h2>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-3 leading-relaxed text-white/60">{stop.body}</p>
        </div>
      ) : isGallery ? (
        <div className="w-full max-w-md">
          <p className="text-center font-mono text-[10px] tracking-widest mb-6" style={{ color: GREEN }}>
            ⁕ TRANSMISSION: PHOTO LOG ⁕
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
            {stop.photos.map((p) => (
              <PolaroidPhoto key={p.key} src={p.src} caption={p.caption} rotate={p.rotate} />
            ))}
          </div>
        </div>
      ) : isTextCard ? (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h3 className="text-xl font-bold text-white mt-3">{stop.title}</h3>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
        </BracketCard>
      ) : (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h3 className="text-xl font-bold text-white mt-3">{stop.title}</h3>
          {stop.body && <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>}
          <Screenshot label={stop.title} src={stop.image} />
        </BracketCard>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Face 3 — CONNECT stop renderer (unchanged, no images here)          */
/* ------------------------------------------------------------------ */

// A single comment, rendered as a little ship with blinking green running
// lights. Body copy sits inside the "cockpit" window.
function SpaceshipComment({ name, message }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative shrink-0" style={{ width: 26, height: 44 }}>
        {/* running lights */}
        <span
          className="absolute rounded-full"
          style={{ top: 4, left: 11, width: 4, height: 4, background: GREEN, animation: "blinkDot 1.6s ease-in-out infinite" }}
        />
        <span
          className="absolute rounded-full"
          style={{ bottom: 10, left: 2, width: 3, height: 3, background: GREEN, animation: "blinkDot 1.6s ease-in-out infinite", animationDelay: "0.4s" }}
        />
        <span
          className="absolute rounded-full"
          style={{ bottom: 10, right: 2, width: 3, height: 3, background: GREEN, animation: "blinkDot 1.6s ease-in-out infinite", animationDelay: "0.8s" }}
        />
        {/* hull */}
        <div
          className="absolute inset-x-0 top-0 bottom-2"
          style={{
            background: "linear-gradient(180deg, #2a2f3a 0%, #1a1e26 100%)",
            border: `1px solid ${GREEN}44`,
            borderRadius: "50% 50% 20% 20% / 60% 60% 15% 15%",
          }}
        />
        {/* cockpit window */}
        <div
          className="absolute rounded-full"
          style={{ top: 10, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, background: `${GREEN}33`, border: `1px solid ${GREEN}88` }}
        />
      </div>

      <div className="flex-1 min-w-0 border border-white/12 bg-white/[0.03] px-4 py-3">
        <p className="font-mono text-[10px] tracking-widest" style={{ color: GREEN }}>{name.toUpperCase()}</p>
        <p className="text-sm text-white/70 mt-1 break-words">{message}</p>
      </div>
    </div>
  );
}

function CommentWall({ stop, comments, onAddComment }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddComment({ name: name.trim() || "Anonymous", message: message.trim() });
    setMessage("");
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-white text-center">{stop.title}</h2>
      <p className="text-sm mt-1 mb-6 text-center" style={{ color: GREEN }}>{stop.sub}</p>

      <form onSubmit={submit} className="flex flex-col gap-2 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="bg-white/[0.03] border border-white/12 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--g)]"
          style={{ "--g": GREEN }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
          rows={3}
          className="bg-white/[0.03] border border-white/12 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--g)] resize-none"
          style={{ "--g": GREEN }}
        />
        <button
          type="submit"
          className="self-end font-mono text-xs tracking-widest px-4 py-2 border transition-colors hover:bg-[var(--g)] hover:text-black"
          style={{ color: GREEN, borderColor: `${GREEN}66`, "--g": GREEN }}
        >
          LAUNCH ↑
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-center font-mono text-[11px] tracking-widest text-white/30">NO TRANSMISSIONS YET — BE THE FIRST</p>
        ) : (
          comments.map((c) => <SpaceshipComment key={c.id} name={c.name} message={c.message} />)
        )}
      </div>

      <p className="text-center font-mono text-[9px] tracking-widest text-white/20 mt-6">
        NOTE: NOT YET CONNECTED TO A BACKEND — MESSAGES RESET ON REFRESH
      </p>
    </div>
  );
}

function StopConnect({ stop, isBottom, comments, onAddComment }) {
  const isIntro = stop.kind === "connect-intro";
  const isCommentWall = stop.kind === "comment-wall";

  return (
    <section id={`stop-${stop.key}`} className={`py-16 flex flex-col items-center ${isBottom ? "pb-24" : ""}`}>
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/35 mb-3">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <div className="text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white">{stop.title}</h2>
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
                <span className="text-xs text-white/40">{l.handle}</span>
              </a>
            ))}
          </div>
        </div>
      ) : isCommentWall ? (
        <CommentWall stop={stop} comments={comments} onAddComment={onAddComment} />
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
    const duration = 1500;
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
    e.preventDefault();
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
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
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
              className={`absolute left-1/2 -translate-x-1/2 text-[10px] font-mono px-3 py-1.5 border rounded bg-black/80 hover:bg-black/90 transition-all hover:scale-105 z-50 whitespace-nowrap ${
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

function ScrollFace({ stops, renderStop, containerRef, isActive, onProgress }) {
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight; // start at the deck, once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback((e) => {
    if (!isActive) return;
    const el = e.target;
    const max = el.scrollHeight - el.clientHeight;
    const p = max <= 0 ? 0 : Math.max(0, Math.min(1, 1 - el.scrollTop / max));
    onProgress(p);
  }, [isActive, onProgress]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full w-full overflow-y-auto px-6 sm:px-10 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex flex-col">
        {stops.map((s, idx) => renderStop(s, idx === stops.length - 1))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const addComment = useCallback(({ name, message }) => {
    setComments((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, name, message }]);
  }, []);
  const [activeFace, setActiveFace] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [panelWidth, setPanelWidth] = useState(480);

  const sceneRef = useRef(null);
  const scrollRefs = {
    work: useRef(null),
    about: useRef(null),
    connect: useRef(null),
  };

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setPanelWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const radius = panelWidth / (2 * Math.tan(Math.PI / 3));

  useEffect(() => {
    const key = FACES_META[activeFace].key;
    const el = scrollRefs[key].current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max <= 0 ? 0 : Math.max(0, Math.min(1, 1 - el.scrollTop / max));
    setProgress(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFace]);

  const rotate = useCallback((dir) => {
    if (spinning) return;
    setSpinning(true);
    setSpinKey((k) => k + 1);
    setActiveFace((f) => (f + dir + 3) % 3);
    setTimeout(() => setSpinning(false), 900);
  }, [spinning]);

  const goTo = useCallback((idx) => {
    if (spinning || idx === activeFace) return;
    setSpinning(true);
    setSpinKey((k) => k + 1);
    setActiveFace(idx);
    setTimeout(() => setSpinning(false), 900);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.key]);

  const handleRopeDown = useCallback((newProgress) => {
    setProgress(newProgress);
    const container = scrollRefs[active.key].current;
    if (container) {
      const max = container.scrollHeight - container.clientHeight;
      container.scrollTop = max * (1 - newProgress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.key]);

  return (
    <>
      <LoadingScreen onLoaded={() => setLoaded(true)} />
      <div className="w-screen h-screen relative bg-black overflow-hidden" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
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
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/80">
          <span className="w-2 h-2 rounded-full" style={{ background: GREEN, animation: "blinkDot 2s ease-in-out infinite" }} />
          MAST.{active.verb}
        </div>
        <div className="font-mono text-xs tracking-widest px-2 py-1 rounded border border-white/15 text-white/70">
          {active.altPrefix} {active.key === "work" ? Math.round(progress * 210) : Math.round(progress * 100)}
          {active.key === "work" ? " FT" : "%"}
        </div>
      </div>

      {/* side indicator + dots */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 mt-2">
        SIDE {activeFace + 1}/3 · {active.name}
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

      {/* Mast pole + engineer + jump markers */}
      <div className="absolute left-6 sm:left-12 top-32 bottom-10 z-20 flex items-stretch gap-4">
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

        <div className="relative w-10 pointer-events-auto">
          <EngineerCharacter progress={progress} onRopeDown={handleRopeDown} />
        </div>

        <div className="relative w-3 flex flex-col justify-between items-center">
          {active.stops.slice().reverse().map((s) => (
            <button
              key={s.key}
              onClick={() => jumpTo(s.key)}
              title={`${s.label} — ${s.height}`}
              className="relative z-10 w-3 h-3 border border-white/40 hover:border-[var(--g)] transition-colors shrink-0"
              style={{ "--g": GREEN, background: "#000" }}
            />
          ))}
        </div>
      </div>

      {/* rotate controls */}
      <button
        onClick={() => rotate(-1)}
        disabled={spinning}
        aria-label="Rotate to previous side (port)"
        className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1 disabled:opacity-40"
      >
        <span className="w-10 h-10 flex items-center justify-center border border-white/15 bg-black/50 backdrop-blur-sm hover:border-[var(--g)] transition-colors" style={{ "--g": GREEN }}>
          <span key={`l-${spinKey}`} style={{ color: GREEN, display: "inline-block", animation: spinning ? "spinIcon 0.7s ease-out" : "none" }}>◀</span>
        </span>
        <span className="font-mono text-[9px] tracking-widest text-white/35">PORT</span>
      </button>
      <button
        onClick={() => rotate(1)}
        disabled={spinning}
        aria-label="Rotate to next side (starboard)"
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1 disabled:opacity-40"
      >
        <span className="w-10 h-10 flex items-center justify-center border border-white/15 bg-black/50 backdrop-blur-sm hover:border-[var(--g)] transition-colors" style={{ "--g": GREEN }}>
          <span key={`r-${spinKey}`} style={{ color: GREEN, display: "inline-block", animation: spinning ? "spinIcon 0.7s ease-out" : "none" }}>▶</span>
        </span>
        <span className="font-mono text-[9px] tracking-widest text-white/35">STARBOARD</span>
      </button>

      {/* the 3-sided mast content itself */}
      <div className="relative z-10 h-full flex justify-center pt-28 pb-6 pl-20 sm:pl-28 pr-16 sm:pr-24">
        <div ref={sceneRef} className="relative w-full sm:w-[70%]" style={{ perspective: 1600, height: "100%" }}>
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
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ transform: `rotateY(240deg) translateZ(${radius}px)`, backfaceVisibility: "hidden", pointerEvents: activeFace === 2 ? "auto" : "none" }}
            >
              <ScrollFace
                stops={STOPS_LINKS}
                renderStop={(s, isBottom) => (
                  <StopConnect key={s.key} stop={s} isBottom={isBottom} comments={comments} onAddComment={addComment} />
                )}
                containerRef={scrollRefs.connect}
                isActive={activeFace === 2}
                onProgress={setProgress}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 transition-opacity duration-300 pointer-events-none font-mono"
        style={{ opacity: progress < 0.05 ? 1 : 0 }}
      >
        <span className="text-white/50 text-xs tracking-widest">SCROLL_UP.EXE</span>
        <span style={{ color: GREEN }} className="text-lg leading-none">↑</span>
      </div>
      </div>
    </>
  );
}