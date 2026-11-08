import { useRef } from "react";
import { INTEREST_TAGS, PHOTOS } from "./data";
import { useSeen } from "./hooks";

export default function About({ mobile }) {
  const ref = useRef(null);
  const seen = useSeen(ref);

  return (
    <section id="about" ref={ref} className={`gp-panel${seen ? " in" : ""}`} aria-label="About">
      <h2 className="gp-h gp-rv">/ About</h2>
      <div className="gp-about">
        <div className="gp-photos">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.caption}
              className="gp-ph"
              style={{ ...(mobile ? p.mobile : p.desktop), rotate: `${p.rotate}deg`, zIndex: i + 2, transitionDelay: `${0.1 + i * 0.2}s` }}
            >
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" style={{ aspectRatio: p.ratio }} />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
          <span className="gp-tag gp-sticker" style={{ background: "#FF5A5F", color: "#0B0A24", transitionDelay: "0.7s" }}>
            Full-stack developer
          </span>
        </div>

        <div className="gp-about-copy">
          <h3 className="gp-rv gp-h3" style={{ transitionDelay: "0.15s" }}>A bit more about me</h3>
          <p className="gp-rv gp-p" style={{ transitionDelay: "0.25s" }}>
            I love solving problems, especially ones that touch people's safety and everyday lives. Since I was a kid I've
            been curious about how people live and what gets in their way, and that curiosity led me to technology. I like
            problems where people and technology meet, where I have to understand why something should exist before
            deciding what to build.
          </p>
          <p className="gp-rv gp-p" style={{ transitionDelay: "0.3s" }}>
            Right now I'm exploring tourism, and how technology can make travelling and seeing new places safer, easier
            and more meaningful.
          </p>
          <h3 className="gp-rv gp-h3 small" style={{ transitionDelay: "0.35s" }}>When I'm not shipping code</h3>
          <p className="gp-rv gp-p" style={{ transitionDelay: "0.4s" }}>
            I'm probably reading, somewhere between thriller and romance. I watch movies, anime and short films, read
            poetry, take long walks, and love conversations that ask hard questions.
          </p>
          <div className="gp-tags">
            {INTEREST_TAGS.map((t, i) => (
              <span
                key={t.label}
                className="gp-tag"
                style={{ background: t.bg, color: t.fg, rotate: `${t.rotate}deg`, transitionDelay: `${(0.5 + i * 0.07).toFixed(2)}s` }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
