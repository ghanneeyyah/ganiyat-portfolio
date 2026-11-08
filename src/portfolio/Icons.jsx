const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const ArrowDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const ArrowOut = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}><path d="M7 17L17 7M9 7h8v8" /></svg>
);
export const Menu = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}><path d="M4 8h16M4 16h16" /></svg>
);
export const Chart = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7} style={{ flex: "none" }}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="M8 15l3-3 2 2 3-4" /></svg>
);
const linkIcons = {
  code: <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.5v.01M12 16v-5.5M12 13c0-1.7 1-2.5 2.2-2.5S16 11.3 16 13v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
};
export const LinkIcon = ({ name, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>{linkIcons[name]}</svg>
);
