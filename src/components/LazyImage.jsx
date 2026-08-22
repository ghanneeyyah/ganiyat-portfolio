// components/LazyImage.jsx
import React, { useState, useEffect, useRef } from 'react';

/**
 * IntersectionObserver-based lazy image with skeleton/error states.
 *
 * Pass `eager` for the single image visible on first paint (skips the
 * observer entirely and sets loading="eager" + fetchpriority="high").
 * Everything else should be left as the default (lazy).
 */
function LazyImage({ src, alt, className, placeholder = true, eager = false, width, height }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(eager);
  const imgRef = useRef(null);

  useEffect(() => {
    if (eager) return; // no observer needed, already visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before visible
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      ref={imgRef}
      className="relative"
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {!isLoaded && !isError && placeholder && (
        <div className={`${className} animate-pulse bg-white/5`} />
      )}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
      {isError && (
        <div className={`${className} flex items-center justify-center text-white/30 bg-white/5`}>
          Failed to load
        </div>
      )}
    </div>
  );
}

export default LazyImage;