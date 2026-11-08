import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { SECTIONS } from "./data";
import { useIsMobile, useScrollY } from "./hooks";
import { Menu } from "./Icons";
import { nextNavHidden } from "./nav";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

function activeSectionAt(scrollY) {
  if (typeof window === "undefined") return SECTIONS[0].id;
  const line = scrollY + window.innerHeight * 0.35;
  let active = SECTIONS[0].id;
  for (const s of SECTIONS) {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top + scrollY <= line) active = s.id;
  }
  return active;
}

export default function OnePage() {
  const mobile = useIsMobile();
  const scrollY = useScrollY();
  const active = activeSectionAt(scrollY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  // Hide the bar while scrolling down, bring it back on any scroll up.
  // It always shows near the top of the page and while the phone menu is open.
  useEffect(() => {
    const prevY = lastY.current;
    lastY.current = scrollY;
    setNavHidden((hidden) => nextNavHidden({ prevY, y: scrollY, hidden, menuOpen }));
  }, [scrollY, menuOpen]);

  const activeNum = `0${SECTIONS.findIndex((s) => s.id === active) + 1}`;

  return (
    <div className="gp">
      <header className={`gp-nav${navHidden ? " hide" : ""}`}>
        <div className="gp-nav-row">
          <span className="gp-nav-name">Olaiwon Ganiyat</span>
          {!mobile && (
            <nav className="gp-nav-links" aria-label="Sections">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={s.id === active ? "on" : undefined} aria-current={s.id === active ? "location" : undefined}>
                  {s.label}
                </a>
              ))}
            </nav>
          )}
          <span className="gp-nav-end">
            <span className="gp-num">{activeNum} / 05</span>
            {mobile && (
              <button type="button" className="gp-burger" aria-expanded={menuOpen} aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
                <Menu />
              </button>
            )}
          </span>
        </div>
        {mobile && menuOpen && (
          <nav className="gp-menu" aria-label="Sections">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className={s.id === active ? "on" : undefined} onClick={() => setMenuOpen(false)}>
                {s.label} <span>0{i + 1}</span>
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Hero mobile={mobile} />
        <About mobile={mobile} />
        <Projects mobile={mobile} scrollY={scrollY} />
        <Experience mobile={mobile} />
        <Contact mobile={mobile} />
      </main>
    </div>
  );
}
