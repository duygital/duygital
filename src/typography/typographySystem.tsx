import React from 'react';

interface TypoProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}

/**
 * Editorial Serif (Cormorant Garamond) & Grotesk Sans-serif (Inter) System
 */

export function DisplayTitle({ children, className = '', id }: TypoProps) {
  return (
    <h1
      id={id}
      className={`font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-current leading-none select-none ${className}`}
    >
      {children}
    </h1>
  );
}

export function SectionHeader({ children, className = '', id }: TypoProps) {
  return (
    <h2
      id={id}
      className={`font-serif text-2xl md:text-3xl lg:text-4xl italic font-light text-current leading-relaxed tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function EditorialProse({ children, className = '', id }: TypoProps) {
  return (
    <p
      id={id}
      className={`font-sans text-sm md:text-base leading-relaxed text-current/80 font-light max-w-xl ${className}`}
    >
      {children}
    </p>
  );
}

export function TelemetryStamp({ children, className = '', id }: TypoProps) {
  return (
    <span
      id={id}
      className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-current/60 select-none ${className}`}
    >
      {children}
    </span>
  );
}

/* --- Added Cinematic Editorial Primitives --- */

/**
 * ManifestoText - Extremely generous letter-spacing, elegant line height,
 * designed for slow reading of artistic creeds.
 */
export function ManifestoText({ children, className = '', id }: TypoProps) {
  return (
    <div
      id={id}
      className={`font-serif text-xl md:text-2xl lg:text-3xl font-light leading-relaxed md:leading-loose text-current/95 tracking-normal max-w-3xl ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * CinematicQuote - Solitary, isolated statement styled like sub-titles
 * or dramatic dialogue lines from silent films.
 */
export function CinematicQuote({ children, className = '', id }: TypoProps) {
  return (
    <blockquote
      id={id}
      className={`relative py-10 pl-8 border-l border-amber-500/30 max-w-2xl ${className}`}
    >
      <span className="font-mono text-[9px] text-amber-500 absolute left-0 top-0 opacity-80 tracking-widest select-none">// STATEMENT</span>
      <p className="font-serif italic text-xl md:text-2xl lg:text-3xl font-light text-current/90 leading-relaxed tracking-tight">
        "{children}"
      </p>
    </blockquote>
  );
}

/**
 * EditorialNote - Tiny archival notes for coordinates, time stamps,
 * or catalog registrations found in museum exhibits.
 */
export function EditorialNote({ children, className = '', id }: TypoProps) {
  return (
    <div
      id={id}
      className={`font-mono text-[10px] uppercase tracking-[0.25em] text-current/45 font-light leading-relaxed select-none ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * ProjectEssay - Tailored specifically for long-form essays.
 * Restricts line length to 60-70 characters (max-w-prose) for optimal reading pacing.
 */
export function ProjectEssay({ children, className = '', id }: TypoProps) {
  return (
    <article
      id={id}
      className={`font-serif text-base md:text-lg lg:text-xl font-light leading-loose text-current/80 max-w-prose space-y-8 tracking-wide ${className}`}
    >
      {children}
    </article>
  );
}

/**
 * AmbientCaption - Low-key notes placed under assets or diagrams,
 * mimicking clinical details from structural dossiers.
 */
export function AmbientCaption({ children, className = '', id }: TypoProps) {
  return (
    <figcaption
      id={id}
      className={`font-sans italic text-xs md:text-sm font-light text-current/50 mt-3 flex items-center gap-3 select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
      <span>{children}</span>
    </figcaption>
  );
}

/**
 * FullscreenStatement - A massive, single-screen typographic projection
 * reminiscent of avant-garde titles.
 */
export function FullscreenStatement({ children, className = '', id }: TypoProps) {
  return (
    <div
      id={id}
      className={`font-serif text-3xl md:text-5xl lg:text-7xl xl:text-8xl italic font-light tracking-tighter text-center max-w-5xl leading-tight text-current select-none ${className}`}
    >
      {children}
    </div>
  );
}
