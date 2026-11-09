import { useEffect, useRef, useState } from "react";
import { LINKS, NOTE_COLOURS } from "./data";
import { freshNoteIds } from "./notes";
import { useSeen } from "./hooks";
import { LinkIcon } from "./Icons";
import { useComments } from "./useComments";

const NAME_MAX = 60;
const MESSAGE_MAX = 500;
const RATE_LIMIT_MS = 10000;

export default function Contact({ mobile }) {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const { comments, loading, error, addComment } = useComments(seen);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const lastSent = useRef(0);

  const notes = comments.slice(-12).reverse();

  // Notes that arrive after the wall first loads drop in from above.
  const seenIds = useRef(null);
  const [dropping, setDropping] = useState(() => new Set());
  useEffect(() => {
    if (loading) return;
    const { fresh, seen: next } = freshNoteIds(seenIds.current, comments.map((c) => c.id));
    seenIds.current = next;
    if (fresh.length) setDropping((prev) => new Set([...prev, ...fresh]));
  }, [comments, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) {
      setFormError("Add your name and a message.");
      return;
    }
    if (Date.now() - lastSent.current < RATE_LIMIT_MS) {
      setFormError("Give it a few seconds before sending another note.");
      return;
    }
    setSending(true);
    setFormError("");
    try {
      await addComment({ name: n.slice(0, NAME_MAX), message: m.slice(0, MESSAGE_MAX) });
      lastSent.current = Date.now();
      setName("");
      setMessage("");
    } catch (err) {
      setFormError(err.message || "Could not send your note. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const links = (
    <div className="gp-links">
      {LINKS.map((l, i) => (
        <a
          key={l.name}
          className="gp-link"
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
          style={{ background: l.bg, color: l.fg, rotate: `${mobile ? l.rotate / 2 : l.rotate}deg`, marginLeft: mobile ? (i === 1 ? 18 : 0) : l.indent, transitionDelay: `${0.2 + i * 0.12}s, ${0.2 + i * 0.12}s, 0s` }}
        >
          <span className="gp-lglyph"><LinkIcon name={l.icon} size={mobile ? 20 : 22} /></span>
          <span>
            {l.name}
            <span className="gp-handle">{l.handle}</span>
          </span>
        </a>
      ))}
    </div>
  );

  const heading = (
    <>
      <h2 className="gp-rv gp-connect" style={{ transitionDelay: "0.1s" }}>Connect</h2>
      <p className="gp-rv gp-lede" style={{ transitionDelay: "0.2s" }}>Building something, hiring, or just want to talk ideas? Reach me here.</p>
    </>
  );

  return (
    <section id="contact" ref={ref} className={`gp-panel${seen ? " in" : ""}`} aria-label="Contact">
      <div className="gp-contact">
        <div className="gp-contact-main">
          {mobile ? <>{heading}{links}</> : <>{links}{heading}</>}
        </div>
        <div className="gp-rv gp-contact-side" style={{ transitionDelay: "0.3s" }}>
          <form className="gp-form" onSubmit={onSubmit} noValidate>
            <h3 className="gp-form-title">Leave a note</h3>
            <p className="gp-muted">Say hello. It lands on the wall below.</p>
            <label className="gp-field">
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={NAME_MAX} placeholder="Your name" autoComplete="name" />
            </label>
            <label className="gp-field">
              Message
              <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={MESSAGE_MAX} placeholder="Your message" />
            </label>
            {formError && <p className="gp-error" role="alert">{formError}</p>}
            <button className="gp-send" type="submit" disabled={sending}>{sending ? "Sending..." : "Send note"}</button>
          </form>
          <div className="gp-notes" aria-live="polite">
            {loading && seen && !error && <p className="gp-muted small">Loading notes...</p>}
            {error && <p className="gp-muted small">{error}</p>}
            {!loading && !error && notes.length === 0 && <p className="gp-muted small">No notes yet. Be the first.</p>}
            {notes.map((n, i) => (
              <span key={n.id} className={`gp-note${dropping.has(n.id) ? " drop" : ""}`} style={{ background: NOTE_COLOURS[i % NOTE_COLOURS.length], rotate: `${[-4, 3, -2, 5, -3][i % 5]}deg` }}>
                <strong>{n.name}</strong>
                <span>{n.message}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="gp-foot">
        <span>Olaiwon Ganiyat · 2026</span>
        <a href="#profile">Back to top</a>
      </div>
    </section>
  );
}
