import { useRef, useState } from "react";
import { EXPERIENCE, NOW_MONTH, TIMELINE_MONTHS } from "./data";
import { useSeen } from "./hooks";
import { Chart } from "./Icons";

const pct = (months) => `${((months / TIMELINE_MONTHS) * 100).toFixed(2)}%`;
const YEARS = ["2023", "2024", "2025", "2026"];

function Chips({ items }) {
  if (!items.length) return null;
  return (
    <div className="gp-chips">
      {items.map((t) => <span key={t} className="gp-chip">{t}</span>)}
    </div>
  );
}

export default function Experience({ mobile }) {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const [selected, setSelected] = useState(2);
  const current = EXPERIENCE[selected];

  return (
    <section id="experience" ref={ref} className={`gp-panel${seen ? " in" : ""}`} aria-label="Experience">
      <h2 className="gp-h gp-rv gp-xp-title">/ Experience{mobile ? <br /> : " "}line</h2>

      {mobile ? (
        <>
          <div className="gp-ticks" aria-hidden="true">{YEARS.map((y) => <span key={y}>{y}</span>)}</div>
          {EXPERIENCE.map((x, i) => {
            const open = i === selected;
            return (
              <div key={x.title} className={`gp-item${open ? " sel" : ""}`}>
                <button type="button" className="gp-item-head" aria-expanded={open} onClick={() => setSelected(open ? -1 : i)}>
                  <span className="gp-item-row">
                    <span className="gp-item-title">{x.title}</span>
                    <span className="gp-item-period">{x.period}</span>
                  </span>
                  <span className="gp-ttrack">
                    <span className="gp-seg" style={{ left: pct(x.from), width: pct(x.to - x.from), background: x.bg, transitionDelay: `${0.2 + i * 0.15}s` }}>
                      <span className="gp-dot sm" />
                    </span>
                    <span className="gp-now-line" style={{ left: pct(NOW_MONTH) }} />
                  </span>
                </button>
                {open && (
                  <div className="gp-item-body">
                    <p className="gp-item-org">{x.org}</p>
                    <p className="gp-item-text">{x.body}</p>
                    <Chips items={x.tech} />
                  </div>
                )}
              </div>
            );
          })}
          <p className="gp-legend"><span />Red line marks now. Tap a row for details.</p>
        </>
      ) : (
        <>
          <div className="gp-scroll-x">
            <div className="gp-tl">
              <div className="gp-years">{YEARS.map((y) => <span key={y}>{y}</span>)}</div>
              <div className="gp-months">
                {YEARS.flatMap((y) => [<span key={`${y}a`}>Jan</span>, <span key={`${y}b`} className="end">Jul</span>])}
              </div>
              <div className="gp-rows">
                {[25, 50, 75].map((l) => <span key={l} className="gp-vline" style={{ left: `${l}%` }} />)}
                <span className="gp-now" style={{ left: pct(NOW_MONTH) }}><span>Now</span></span>
                {EXPERIENCE.map((x, i) => (
                  <div key={x.title} className="gp-row">
                    <button
                      type="button"
                      className={`gp-bar${i === selected ? " sel" : ""}`}
                      aria-pressed={i === selected}
                      onClick={() => setSelected(i)}
                      style={{ left: pct(x.from), width: pct(x.to - x.from), background: x.bg, color: x.fg, transitionDelay: `${0.2 + i * 0.15}s, 0s, 0s` }}
                    >
                      <Chart />
                      <span className="gp-bar-label">{x.short}</span>
                      <span className="gp-dot" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {current && (
            <div className="gp-xdetail" aria-live="polite">
              <div className="gp-xdetail-head">
                <span className="gp-chip" style={{ background: current.bg, color: current.fg, borderColor: "transparent" }}>{current.period}</span>
                <h3 className="gp-xdetail-title">{current.title}</h3>
                <p className="gp-xdetail-org">{current.org}</p>
              </div>
              <div className="gp-xdetail-body">
                <p>{current.body}</p>
                <Chips items={current.tech} />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
