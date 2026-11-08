import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./data";
import { docTop, useSeen } from "./hooks";
import { ArrowOut } from "./Icons";
import { activeIndex, cardPose, scrollProgress, scrollTargetForCard } from "./wheel";

const LAYOUT = {
  desktop: { stickyTop: 76, step: 16, radius: 500 },
  mobile: { stickyTop: 64, step: 30, radius: 260 },
};

function ViewLink({ href }) {
  return (
    <a className="gp-go" href={href} target="_blank" rel="noreferrer">
      View project <ArrowOut />
    </a>
  );
}

function Chips({ items, className = "gp-chip" }) {
  return (
    <div className="gp-chips">
      {items.map((t) => <span key={t} className={className}>{t}</span>)}
    </div>
  );
}

export default function Projects({ mobile, scrollY }) {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const layout = mobile ? LAYOUT.mobile : LAYOUT.desktop;
  const count = PROJECTS.length;

  const [geometry, setGeometry] = useState(null);

  // Re-measure as the page scrolls or resizes. Images above can load late and
  // push the section down, so a one-off measurement isn't enough.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = { sectionTop: docTop(el), sectionHeight: el.offsetHeight, viewportHeight: window.innerHeight, stickyTop: layout.stickyTop };
    setGeometry((prev) =>
      prev &&
      prev.sectionTop === next.sectionTop &&
      prev.sectionHeight === next.sectionHeight &&
      prev.viewportHeight === next.viewportHeight &&
      prev.stickyTop === next.stickyTop
        ? prev
        : next
    );
  }, [scrollY, layout.stickyTop]);

  const progress = geometry ? scrollProgress({ scrollY, ...geometry }) : 0;
  const offset = progress * (count - 1);
  const active = activeIndex(offset, count);

  const goTo = (index) => {
    if (!geometry) return;
    window.scrollTo({ top: scrollTargetForCard({ index, count, ...geometry }), behavior: "smooth" });
  };

  const counter = `0${active + 1} / 0${count}`;

  return (
    <section id="projects" ref={ref} className="gp-track" aria-label="Projects">
      <div className={`gp-stick${seen ? " in" : ""}`}>
        {!mobile && (
          <div className="gp-info" aria-live="polite">
            <h2 className="gp-h gp-rv">/ Projects</h2>
            <div className="gp-slot">
              {PROJECTS.map((p, i) => (
                <article key={p.title} className={`gp-detail${i === active ? " on" : ""}`} aria-hidden={i !== active}>
                  <span className="gp-chip" style={{ background: p.bg, color: p.fg, borderColor: "transparent" }}>{p.tag}</span>
                  <h3 className="gp-ptitle">{p.title}</h3>
                  <p className="gp-psub">{p.sub}</p>
                  <p className="gp-pbody">{p.body}</p>
                  <Chips items={p.tech} />
                  {p.link && i === active && <ViewLink href={p.link} />}
                </article>
              ))}
            </div>
            <div className="gp-count">
              <span>{counter}</span>
              <span className="gp-hint">Keep scrolling to turn the wheel</span>
            </div>
            <div className="gp-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
          </div>
        )}

        {mobile && <h2 className="gp-h gp-rv">/ Projects</h2>}

        <div className="gp-wheel" aria-live={mobile ? "polite" : undefined}>
          <div className="gp-hub">
            {PROJECTS.map((p, i) => {
              const pose = cardPose(i, offset, layout.step);
              const transform = `rotate(${pose.angle.toFixed(2)}deg) translateX(${layout.radius}px)`;
              const opacity = mobile ? (pose.isFront ? 1 : pose.distance < 1.6 ? 0.45 : 0) : pose.isFront ? 1 : 0.9;
              const style = { transform, opacity, zIndex: pose.zIndex, background: p.bg, color: p.fg };

              if (mobile) {
                return (
                  <article key={p.title} className="gp-card m" style={style} aria-hidden={i !== active}>
                    <span className="gp-card-meta"><span>0{i + 1}</span><span>{p.year}</span></span>
                    {p.shot ? (
                      <img className="gp-shot m" src={p.shot} alt={`${p.title} screenshot`} loading="lazy" decoding="async" />
                    ) : (
                      <span className="gp-soon m" aria-hidden="true">04</span>
                    )}
                    <span className="gp-card-tag">{p.tag}</span>
                    <h3 className="gp-card-title">{p.title}</h3>
                    <p className="gp-card-body">{p.short}</p>
                    <Chips items={p.tech.slice(0, 4)} className="gp-chip card" />
                    {p.link && i === active && <ViewLink href={p.link} />}
                  </article>
                );
              }

              return (
                <button key={p.title} type="button" className="gp-card" style={style} onClick={() => goTo(i)} aria-label={`Show ${p.title}`}>
                  <span className="gp-card-media">
                    {p.shot ? (
                      <img className="gp-shot" src={p.shot} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="gp-soon" aria-hidden="true">04</span>
                    )}
                  </span>
                  <span className="gp-card-text">
                    <span className="gp-card-meta"><span>0{i + 1}</span><span>{p.year}</span></span>
                    <span className="gp-card-big">{p.title}</span>
                    <span className="gp-card-sub">{p.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {mobile && (
          <div className="gp-count">
            <span>{counter}</span>
            <span className="gp-progress grow" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></span>
            <span className="gp-hint">Keep scrolling</span>
          </div>
        )}
      </div>
    </section>
  );
}
