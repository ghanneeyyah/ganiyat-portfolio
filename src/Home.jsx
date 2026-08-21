import React, { useEffect, useRef, useState, useCallback } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ganiyat_headshot from "./assets/ganiyat_headshot.jpg";
import reunite_dashboard from "./assets/reunite_dashboard.jpeg";
import mindease_dashboard from "./assets/mindease_dashboard.jpeg";
import portfolio from "./assets/portfolio.png";

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
/* Content — three faces of the mast (unchanged)                       */
/* ------------------------------------------------------------------ */

const STOPS_WORK = [
  { key: "wip", label: "Above the nest", height: "240 FT", kind: "wip", tag: "Currently building", title: "In the works", sub: "Details coming soon", body: "A new build is underway — check back for the full story." },
  { key: "nest", label: "Crow's nest", height: "210 FT", kind: "hero", tag: "Flagship project", title: "MindEase", sub: "AI-powered student stress management system", body: "Final-year project: a full-stack mental wellness app with conversational support, emotion detection, mood tracking, and guided breathing. Built the React frontend, Spring Boot backend, Python emotion-detection service, auth, database layer, and AI integration as a modular system.", tech: ["React", "TypeScript", "Spring Boot", "Python", "Flask", "PostgreSQL", "Hugging Face", "Gemini API", "JWT", "Docker"], year: "2025–2026", link: "https://github.com/ghanneeyyah/mindease" },
  { key: "p2", label: "Upper mast", height: "140 FT", kind: "project", tag: "Solo · ML / Backend", title: "Emotion Detector API", sub: "Emotion classification API from natural-language text", body: "An NLP-powered REST API that classifies text into 28 emotion categories using a fine-tuned transformer model, with confidence scores returned through a FastAPI endpoint.", tech: ["Python", "FastAPI", "PyTorch", "Pandas", "GoEmotions", "REST API"], year: "2026", link: "https://github.com/ghanneeyyah/emotion-detector" },
  { key: "p1", label: "Mid mast", height: "90 FT", kind: "project", tag: "Hackathon team", title: "Reunite AI", sub: "AI-powered solution for a real-world problem", body: "Built as part of a hackathon team within a limited timeframe — contributed to the technical implementation and helped turn the initial idea into a functional prototype.", tech: ["AI", "Python", "JavaScript", "REST APIs"], year: "2025", link: "https://frontends-evmq.onrender.com/" },
  { key: "deck", label: "The deck", height: "0 FT", kind: "intro", title: "Olaiwon Ganiyat", handle: "ghanneeyyah", sub: "Full-stack developer", body: "Computer science student and full-stack developer who enjoys turning ideas and real-world problems into working software. Usually found at the backend — building APIs, designing databases, and figuring out how to make applications reliable, scalable, and actually useful." },
];

const STOPS_ABOUT = [
  { key: "frame3", label: "Frame 03", height: "SCAN 100%", kind: "frame", tag: "Live project", title: "MindEase — dashboard", body: "" },
  { key: "frame2", label: "Frame 02", height: "SCAN 66%", kind: "frame", tag: "Live project", title: "Emotion Detector API", body: "" },
  { key: "frame1", label: "Frame 01", height: "SCAN 33%", kind: "frame", tag: "This site", title: "Portfolio — the build you're looking at", body: "" },
  { key: "photo", label: "Ship's log", height: "SCAN 0%", kind: "photo-intro", title: "Behind the code", sub: "Full-stack developer", body: "I am a cracked dev" },
];

const STOPS_LINKS = [
  { key: "projlink3", label: "Signal 03", height: "92%", kind: "project-link", title: "MindEase", desc: "Flagship project — AI-powered student stress management system.", href: "https://github.com/ghanneeyyah/mindease" },
  { key: "projlink2", label: "Signal 02", height: "60%", kind: "project-link", title: "Emotion Detector API", desc: "Emotion classification API built on the GoEmotions dataset.", href: "https://github.com/ghanneeyyah/emotion-detector" },
  { key: "projlink1", label: "Signal 01", height: "30%", kind: "project-link", title: "Reunite AI", desc: "Hackathon build — AI-powered solution shipped under time pressure.", href: "https://frontends-evmq.onrender.com/" },
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
      <div className="w-full flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40" style={{ height: 120, background: "repeating-linear-gradient(...)" }}>
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
    <div className="text-left">
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
  );
}

/* ------------------------------------------------------------------ */
/* Face renderers (unchanged)                                          */
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
          <Screenshot label={`${stop.title} — screenshot`} src={mindease_dashboard} />
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
          <Screenshot label="Work in progress" />
        </div>
      ) : (
        <div className="relative border border-white/12 bg-white/[0.03] px-6 py-6 max-w-md w-full">
          <span className="font-mono text-[10px] tracking-widest text-white/40">{stop.tag}</span>
          <h3 className="text-2xl font-bold text-white mt-2">{stop.title}</h3>
          <p className="text-sm mt-1 text-white/55">{stop.sub}</p>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={reunite_dashboard} />
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

function StopAbout({ stop, isBottom }) {
  const isIntro = stop.kind === "photo-intro";
  return (
    <section id={`stop-${stop.key}`} className={`py-16 flex flex-col items-center ${isBottom ? "pb-24" : ""}`}>
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/35 mb-3">
        {stop.label.toUpperCase()} · {stop.height}
      </span>

      {isIntro ? (
        <div className="text-center max-w-sm">
          <div
            className="mx-auto w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40"
            style={{
              borderColor: `${GREEN}55`,
              background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 10px, transparent 10px, transparent 20px)",
            }}
          >
            <div className="mx-auto w-32 h-32 rounded-full border overflow-hidden" style={{ borderColor: `${GREEN}55` }}>
              <img src={ganiyat_headshot} alt="Olaiwon Ganiyat" className="w-full h-full object-cover" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-5">{stop.title}</h2>
          <p className="text-sm mt-1" style={{ color: GREEN }}>{stop.sub}</p>
          <p className="text-sm mt-3 leading-relaxed text-white/60">{stop.body}</p>
        </div>
      ) : (
        <BracketCard accent={GREEN}>
          <span className="font-mono text-[10px] tracking-widest px-2 py-1" style={{ color: GREEN, border: `1px solid ${GREEN}55` }}>{stop.tag}</span>
          <h3 className="text-xl font-bold text-white mt-3">{stop.title}</h3>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.body}</p>
          <Screenshot label={`${stop.title} — screenshot`} src={portfolio} />
        </BracketCard>
      )}
    </section>
  );
}

function StopConnect({ stop, isBottom }) {
  const isIntro = stop.kind === "connect-intro";
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
      ) : (
        <div className="relative border border-white/12 bg-white/[0.03] px-6 py-6 max-w-md w-full">
          <h3 className="text-xl font-bold text-white">{stop.title}</h3>
          <p className="text-sm mt-2 leading-relaxed text-white/60">{stop.desc}</p>
          <a
            href={stop.href}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 font-mono text-xs tracking-widest px-3 py-2 border transition-colors hover:bg-[var(--g)] hover:text-black"
            style={{ color: GREEN, borderColor: `${GREEN}66`, "--g": GREEN }}
          >
            VISIT ↗
          </a>
        </div>
      )}
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

  // Flip the rope button below the character once it's high enough that
  // an above-placed button would run off the top of the viewport.
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

      {/* Mast pole + engineer + jump markers — pushed further from the
          edge and given more top clearance so the ROPE↓ button never
          runs off-screen near the top of the climb. */}
      <div className="absolute left-6 sm:left-12 top-32 bottom-10 z-20 flex items-stretch gap-4">
        {/* the pole itself */}
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

        {/* the engineer rides right next to the pole */}
        <div className="relative w-10 pointer-events-auto">
          <EngineerCharacter progress={progress} onRopeDown={handleRopeDown} />
        </div>

        {/* jump-to-stop tick marks */}
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

      {/* the 3-sided mast content itself — sized to ~70% of the viewport
          width on laptop/desktop so the content is the clear visual focus,
          with the rail and rotate controls sitting in the remaining margins. */}
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
                renderStop={(s, isBottom) => <StopConnect key={s.key} stop={s} isBottom={isBottom} />}
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