import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREEN = "#39ff88";


/**
 * Loading screen shown while the app initializes.
 * Same engineer character used as the scroll indicator on the mast,
 * here just idling on the rope before the climb begins.
 */
export function LoadingScreen({ onLoaded }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simulate initialization delay — keeps the loading screen visible
    // long enough to be seen, but doesn't block real initialization.
    const timer = setTimeout(() => {
      setShow(false);
      // Allow exit animation to play before calling onLoaded
      setTimeout(onLoaded, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Engineer character hanging */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Rope */}
            <motion.div
              className="w-[2px] h-16"
              style={{ background: `${GREEN}40` }}
              animate={{ scaleY: [1, 0.98, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Hard hat */}
            <svg width="32" height="32" viewBox="0 0 28 28">
              <ellipse cx="14" cy="10" rx="10" ry="4" fill={GREEN} />
              <rect x="8" y="9" width="12" height="6" rx="2" fill="#1f8a52" />
            </svg>

            {/* Body */}
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border"
                style={{ background: `${GREEN}1a`, borderColor: `${GREEN}33` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${GREEN}33` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: `${GREEN}66` }} />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-sm text-white/40 font-mono tracking-wider"
            >
              Hoisting the mast...
            </motion.p>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: `${GREEN}66` }}
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}