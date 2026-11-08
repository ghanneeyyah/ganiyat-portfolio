import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./folders.css";
import { PROFILE, PROJECTS, EXPERIENCE, ABOUT, LINKS } from "./content";
import { buildTimeline, frameAt, targetFor } from "./scrollModel";

const SECTIONS = [
  { key: "hero", label: "HERO", tone: "deep" },
  { key: "projects", label: "PROJECTS", tone: "stone" },
  { key: "experience", label: "EXPERIENCE", tone: "sage" },
  { key: "about", label: "ABOUT", tone: "stone" },
  { key: "contact", label: "CONTACT", tone: "deep" },
];
const N = SECTIONS.length;
const PROJECTS_INDEX = 1;

const EAR_PATH =
  "M0 38C10 38 12 34 14 24L17 9C18.5 3 22 0 28 0L164 0C170 0 173.5 3 175.5 9L180 24C182 34 186 38 200 38Z";

// Where each project card sits before it "rewinds" up into the grid:
// [rotate deg, extra drop vh, sideways vw]
const SCATTER = [
  [-14, 12, -4],
  [9, 28, 3],
  [-6, 4, -2],
  [12, 20, 5],
];

const pad = (n) => (n < 10 ? "0" : "") + n;

function Asterisk({ size = 72 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className="fp-asterisk">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse key={r} cx="50" cy="29" rx="11" ry="20" transform={`rotate(${r} 50 50)`} />
      ))}
    </svg>
  );
}

function Ear({ label, onClick }) {
  return (
    <button type="button" className="fp-ear" onClick={onClick} aria-label={`Go to ${label.toLowerCase()}`}>
      <svg className="fp-ear-shape" viewBox="0 0 200 38" preserveAspectRatio="none" aria-hidden="true">
        <path d={EAR_PATH} />
      </svg>
      <span className="fp-ear-label">( {label} )</span>
    </button>
  );
}

function Hero() {
  return (
    <div className="fp-hero">
      <div className="fp-row">
        <Asterisk />
        <p className="fp-kicker fp-right">
          FULL-STACK
          <br />
          DEVELOPER
          <br />@{PROFILE.handle.toUpperCase()}
        </p>
      </div>
      <h1 className="fp-display">
        Port<em>folio</em>
      </h1>
      <div className="fp-row fp-hero-foot">
        <span className="fp-name">{PROFILE.name.toUpperCase()}</span>
        <span className="fp-cue">
          ( SCROLL )
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Projects({ up }) {
  return (
    <>
      <div className="fp-head">
        <h2 className="fp-title">Projects</h2>
        <span className="fp-count">( {pad(PROJECTS.length)} )</span>
      </div>
      <p className="fp-lede">{PROFILE.intro}</p>
      <div className="fp-grid">
        {PROJECTS.map((p, i) => {
          const s = SCATTER[i % SCATTER.length];
          const style = {
            transform: up ? "none" : `translate(${s[2]}vw, calc(100vh + ${s[1]}vh)) rotate(${s[0]}deg)`,
            transitionDelay: up ? `${(0.35 + i * 0.09).toFixed(2)}s` : "0s",
          };
          const inner = (
            <>
              <span className="fp-card-img">
                {p.image ? (
                  <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" decoding="async" />
                ) : (
                  <span className="fp-card-wip">IN THE WORKS</span>
                )}
              </span>
              <span className="fp-card-top">
                <span className="fp-card-title">{p.title}</span>
                <span className="fp-card-year">{p.year}</span>
              </span>
              <span className="fp-card-tag">{p.tag}</span>
              <span className="fp-card-body">{p.body}</span>
              {p.tech.length > 0 && <span className="fp-card-tech">{p.tech.join(" · ")}</span>}
              {p.link && <span className="fp-card-link">VIEW PROJECT →</span>}
            </>
          );
          const cls = `fp-card${up ? " up" : ""}`;
          return p.link ? (
            <a key={p.key} className={cls} style={style} href={p.link} target="_blank" rel="noreferrer">
              {inner}
            </a>
          ) : (
            <div key={p.key} className={cls} style={style}>
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}

function Experience({ landed }) {
  return (
    <>
      <div className="fp-head">
        <h2 className="fp-title">Experience</h2>
        <span className="fp-count">( {pad(EXPERIENCE.length)} )</span>
      </div>
      <ul className="fp-xlist">
        {EXPERIENCE.map((x, i) => (
          <li key={x.key} className={`fp-xrow${landed ? " in" : ""}`} style={{ transitionDelay: landed ? `${0.3 + i * 0.1}s` : "0s" }}>
            <span className="fp-xrole">{x.role}</span>
            <span>{x.org}</span>
            <span className="fp-xyears">{x.years}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function About() {
  return (
    <>
      <div className="fp-head">
        <h2 className="fp-title">About</h2>
        <span className="fp-count">( {PROFILE.role.toUpperCase()} )</span>
      </div>
      <div className="fp-about">
        <img className="fp-headshot" src={PROFILE.headshot} alt={PROFILE.name} loading="lazy" decoding="async" />
        <div className="fp-about-text">
          {ABOUT.overview.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <h3 className="fp-subtitle">{ABOUT.hobbiesTitle}</h3>
          {ABOUT.hobbies.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
      <ul className="fp-photos" aria-label="Photos">
        {ABOUT.photos.map((ph) => (
          <li key={ph.key} className="fp-photo" style={{ "--r": `${ph.rotate * 0.6}deg` }}>
            <img src={ph.src} alt={ph.caption} loading="lazy" decoding="async" />
            <span>{ph.caption}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Contact({ onTop }) {
  return (
    <div className="fp-contact">
      <h2 className="fp-title">Let&apos;s connect</h2>
      <ul className="fp-links">
        {LINKS.map((l) => (
          <li key={l.name}>
            <span className="fp-link-name">{l.name.toUpperCase()}</span>
            <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
              {l.handle}
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="fp-ghost" onClick={onTop}>
        ( BACK TO TOP )
      </button>
    </div>
  );
}

export default function FolderPortfolio() {
  const scrollerRef = useRef(null);
  const bodyRefs = useRef([]);
  const contentRefs = useRef([]);
  const rafRef = useRef(0);

  const [opened, setOpened] = useState(false);
  const [y, setY] = useState(0);
  const [vh, setVh] = useState(() => (typeof window === "undefined" ? 800 : window.innerHeight));
  const [extras, setExtras] = useState(() => SECTIONS.map(() => 0));

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setVh(el.clientHeight || window.innerHeight);
    const next = SECTIONS.map((_, k) => {
      const body = bodyRefs.current[k];
      const content = contentRefs.current[k];
      if (!body || !content) return 0;
      // offsetHeight, not scrollHeight: the project cards park far below
      // the grid before they rise, and scrollHeight would count that.
      return Math.max(0, Math.ceil(content.offsetHeight - body.clientHeight));
    });
    setExtras((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (scrollerRef.current) ro.observe(scrollerRef.current);
    contentRefs.current.forEach((c) => c && ro.observe(c));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onScroll = useCallback((e) => {
    const top = e.currentTarget.scrollTop;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setY(top));
  }, []);

  const tl = useMemo(() => buildTimeline(vh, extras), [vh, extras]);
  const frame = useMemo(() => frameAt(y, tl), [y, tl]);

  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const go = useCallback(
    (k) => {
      scrollerRef.current?.scrollTo({ top: targetFor(k, tl), behavior: reducedMotion ? "auto" : "smooth" });
    },
    [tl, reducedMotion]
  );

  const open = () => {
    setOpened(true);
    // Let the scroller become scrollable, then take keyboard focus so
    // arrow keys and space scroll the stack straight away.
    requestAnimationFrame(() => scrollerRef.current?.focus({ preventScroll: true }));
  };

  const current = SECTIONS[frame.current];

  const renderBody = (key) => {
    switch (key) {
      case "hero":
        return <Hero />;
      case "projects":
        return <Projects up={frame.progress[PROJECTS_INDEX] >= 0.85} />;
      case "experience":
        return <Experience landed={frame.progress[2] >= 0.85} />;
      case "about":
        return <About />;
      default:
        return <Contact onTop={() => go(0)} />;
    }
  };

  return (
    <div className={`fp-root${opened ? " open" : ""}`} style={{ "--n": N }}>
      <div className="fp-scroller" ref={scrollerRef} onScroll={onScroll} tabIndex={-1}>
        <div className="fp-track" style={{ height: opened ? Math.round(tl.track) : "100%" }}>
          <div className="fp-stage">
            <div className="fp-blur" aria-hidden="true">
              <span className="fp-blob b1" />
              <span className="fp-blob b2" />
              <span className="fp-blob b3" />
            </div>
            <p className="fp-welcome" aria-hidden={opened}>
              Welcome<em>!</em>
            </p>
            <p className="fp-hint" aria-hidden="true">
              ( CLICK THE FOLDER TO OPEN )
            </p>
            <button type="button" className="fp-opener" onClick={open} aria-label="Open the portfolio" hidden={opened} />

            <main className="fp-cover" inert={!opened}>
              {SECTIONS.map((s, k) => {
                const p = frame.progress[k];
                const covered = frame.bodyOpacity[k] < 0.05;
                return (
                  <section
                    key={s.key}
                    aria-label={s.label.toLowerCase()}
                    className={`fp-folder tone-${s.tone}${k === 0 ? " base" : ""}${p <= 0 ? " parked" : ""}`}
                    style={{
                      "--k": k,
                      zIndex: k + 1,
                      transform: k === 0 ? undefined : `translateY(calc(${(1 - p).toFixed(4)} * (100% + 80px)))`,
                    }}
                  >
                    <Ear label={s.label} onClick={() => go(k)} />
                    <div
                      className="fp-body"
                      ref={(el) => (bodyRefs.current[k] = el)}
                      style={{ opacity: frame.bodyOpacity[k] }}
                      inert={covered || p <= 0}
                    >
                      <div
                        className={`fp-content${k === 0 ? " fill" : ""}`}
                        ref={(el) => (contentRefs.current[k] = el)}
                        style={{ transform: frame.offset[k] ? `translateY(${-frame.offset[k]}px)` : undefined }}
                      >
                        {renderBody(s.key)}
                      </div>
                    </div>
                  </section>
                );
              })}
            </main>

            <p className={`fp-where tone-${current.tone}`} aria-live="polite">
              {pad(frame.current + 1)} / {pad(N)} &nbsp;( {current.label} )
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
