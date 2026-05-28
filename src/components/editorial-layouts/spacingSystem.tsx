import React from 'react';

interface SpacingProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * BreathingContainer - Generates the massive gutters (padding: 4rem to 8rem) 
 * specified in the design guidelines to allow visual pacing and quiet margins.
 */
export function BreathingContainer({ children, className = '', id }: SpacingProps) {
  return (
    <div
      id={id}
      className={`px-6 py-16 md:px-16 md:py-28 lg:py-36 xl:py-44 max-w-7xl mx-auto flex flex-col justify-between ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * ScreenSpacer - A structured vertical gap representing cinematic silence.
 * Implements optional high-contrast, sub-visible single-pixel dividers.
 */
export function ScreenSpacer({ className = '', id }: { className?: string; id?: string }) {
  return (
    <div
      id={id}
      className={`h-16 md:h-28 lg:h-36 xl:h-48 flex items-center w-full relative ${className}`}
    >
      {/* 1px low-opacity horizon anchor line in the spacer */}
      <span className="w-full h-[1px] bg-paper/[0.04] block absolute left-0 right-0" />
    </div>
  );
}

/**
 * ArtisticVoid - Generates off-center asymmetric offsets to prevent
 * standard dashboard panel looks, establishing negative space voids.
 */
export function ArtisticVoid({ children, className = '', id }: SpacingProps) {
  return (
    <div
      id={id}
      className={`lg:pl-24 xl:pl-36 2xl:pl-48 pr-0 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * AsymmetricSplit - Creates a column offset layout with a clean off-axis
 * narrative panel next to an empty or media-locked column.
 */
export function AsymmetricSplit({ children, className = '', id }: SpacingProps) {
  return (
    <div
      id={id}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-start w-full ${className}`}
    >
      {children}
    </div>
  );
}
