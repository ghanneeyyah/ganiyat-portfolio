import { useRef } from "react";
import { TOOL_PILLS } from "./data";
import { useSeen } from "./hooks";
import { ArrowDown } from "./Icons";

function Pill({ pill, style }) {
  return (
    <span className="gp-pill" style={{ background: pill.bg, color: pill.fg, ...style }}>
      <span className="gp-glyph" aria-hidden="true">{pill.glyph}</span>
      {pill.name}
    </span>
  );
}

export default function Hero({ mobile }) {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const half = Math.ceil(TOOL_PILLS.length / 2);
  const rows = [TOOL_PILLS.slice(0, half), TOOL_PILLS.slice(half)];

  return (
    <section id="profile" ref={ref} className={`gp-panel gp-hero${seen ? " in" : ""}`} aria-label="Profile">
      {mobile ? (
        <div className="gp-belt" aria-label="Tools I build with">
          {rows.map((row, r) => (
            <div key={r} className={`gp-belt-track${r ? " rev" : ""}`}>
              {row.concat(row).map((p, i) => <Pill key={i} pill={p} />)}
            </div>
          ))}
        </div>
      ) : (
        <div className="gp-cloud" aria-label="Tools I build with">
          {TOOL_PILLS.map((p, i) => (
            <span key={p.name} className="gp-pos" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.rotate}deg)` }}>
              <Pill
                pill={p}
                style={{ fontSize: p.size, transitionDelay: `${(0.4 + i * 0.07).toFixed(2)}s`, animationDelay: `${-(i * 0.7)}s` }}
              />
            </span>
          ))}
        </div>
      )}

      <div className="gp-hero-copy">
        <p className="gp-rv" style={{ margin: "0 0 8px", fontSize: 15, transitionDelay: "0.1s" }}>Hi, my name is</p>
        <h1 className="gp-rv gp-name" style={{ transitionDelay: "0.2s" }}>Ganiyat</h1>
        <p className="gp-rv gp-role" style={{ transitionDelay: "0.3s" }}>Full-stack developer · @ghanneeyyah</p>
        <p className="gp-rv gp-lede" style={{ transitionDelay: "0.4s" }}>
          Computer science student who turns ideas and real-world problems into working software. Usually found at the
          backend, building APIs, designing databases and making apps reliable enough to be useful.
        </p>
        <div className="gp-rv gp-ctas" style={{ transitionDelay: "0.5s" }}>
          <a className="gp-cta primary" href="#projects">See projects</a>
          <a className="gp-cta ghost" href="#contact">Get in touch</a>
        </div>
        {!mobile && (
          <p className="gp-rv gp-cue" style={{ transitionDelay: "0.7s" }}>
            SCROLL <ArrowDown />
          </p>
        )}
      </div>
    </section>
  );
}
