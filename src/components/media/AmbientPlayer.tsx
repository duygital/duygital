import React, { useState, useEffect } from "react";
import { Project } from "../../types";
import { parseVideoUrl } from "../../utils/videoProviders";

interface AmbientPlayerProps {
  project: Project;
  className?: string;
}

export default function AmbientPlayer({ project, className = "" }: AmbientPlayerProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(false);

  const ytVideo = parseVideoUrl(project.youtube_url || "");
  const vimeoVideo = parseVideoUrl(project.vimeo_url || "");

  const isYoutube = ytVideo.provider === "youtube" && ytVideo.id;
  const isVimeo = vimeoVideo.provider === "vimeo" && vimeoVideo.id;

  // Track if media url is tiktok or invalid
  const hasVideo = isYoutube || isVimeo;

  useEffect(() => {
    setVideoLoaded(false);
    setUseImageFallback(!hasVideo);
  }, [project, hasVideo]);

  // Handle timeout fallback to image if iframe takes too long to load or fails
  useEffect(() => {
    if (hasVideo) {
      const timer = setTimeout(() => {
        if (!videoLoaded) {
          // If after 4s the video state has not fired onload, keep fallback or overlay active
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasVideo, videoLoaded]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Cinematic Static/Grain Overlay for brutal minimalist atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1),rgba(0,0,0,0.6))] mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200')]" />

      {/* Actual Ambient Video Player rendered with pointer-events-none to prevent iframe interaction */}
      {!useImageFallback && isYoutube && (
        <iframe
          src={`https://www.youtube.com/embed/${ytVideo.id}?autoplay=1&mute=1&loop=1&playlist=${ytVideo.id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
          title={project.title}
          allow="autoplay; encrypted-media"
          onLoad={() => setVideoLoaded(true)}
          className={`absolute min-w-[104%] min-h-[104%] w-[104%] h-[104%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none scale-105 transition-opacity duration-1000 ${
            videoLoaded ? "opacity-35" : "opacity-0"
          }`}
        />
      )}

      {!useImageFallback && isVimeo && (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoVideo.id}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&portrait=0`}
          title={project.title}
          allow="autoplay; encrypted-media"
          onLoad={() => setVideoLoaded(true)}
          className={`absolute min-w-[104%] min-h-[104%] w-[104%] h-[104%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none scale-105 transition-opacity duration-1000 ${
            videoLoaded ? "opacity-35" : "opacity-0"
          }`}
        />
      )}

      {/* Cinematic Image Fallback when video has not loaded or is missing */}
      <img
        src={project.thumbnail_url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"}
        alt={project.title}
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-1000 ${
          useImageFallback || !videoLoaded ? "opacity-25" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}
