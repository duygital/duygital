import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { Project } from "../../types";
import { parseVideoUrl } from "../../utils/videoProviders";

interface VideoThumbnailProps {
  project: Project;
  className?: string;
}

export default function VideoThumbnail({ project, className = "" }: VideoThumbnailProps) {
  const mode = (project.thumbnail_mode || "").toLowerCase().trim();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [hasFallbackToHq, setHasFallbackToHq] = useState(false);
  const [hasFallbackToAlternative, setHasFallbackToAlternative] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const ytVideo = parseVideoUrl(project.youtube_url || "");
  const vimeoVideo = parseVideoUrl(project.vimeo_url || "");
  const tiktokVideo = parseVideoUrl(project.youtube_url ? "" : (project.vimeo_url ? "" : (project.tags.find(t => t.toLowerCase() === "tiktok") ? "https://www.tiktok.com/@duygital/video/" : ""))); 
  // Let's inspect url directly to fetch proper video state
  const isYoutube = ytVideo.provider === "youtube";
  const isVimeo = vimeoVideo.provider === "vimeo";

  let activeVideo = ytVideo;
  if (!isYoutube && isVimeo) activeVideo = vimeoVideo;
  
  // Try to find if either of the urls looks like tiktok
  const possibleTiktokUrl = [project.youtube_url, project.vimeo_url, project.thumbnail_url].find(u => u && u.includes("tiktok.com"));
  const parsedTiktok = parseVideoUrl(possibleTiktokUrl);
  const isTiktok = parsedTiktok.provider === "tiktok";
  if (isTiktok) activeVideo = parsedTiktok;

  useEffect(() => {
    setHasFallbackToHq(false);
    setHasFallbackToAlternative(false);

    // 1. TikTok dynamic oEmbed metadata thumbnail
    if (isTiktok && activeVideo.originalUrl) {
      const getTikTokThumbnail = async () => {
        try {
          const fetchUrl = `https://cors-anywhere.herokuapp.com/https://www.tiktok.com/oembed?url=${encodeURIComponent(activeVideo.originalUrl)}`;
          const response = await fetch(fetchUrl);
          const data = await response.json();
          if (data && data.thumbnail_url) {
            setImgSrc(data.thumbnail_url);
            return;
          }
        } catch (e) {
          // If CORS or fetch fails, attempt a clean fallback
          console.warn("TikTok oEmbed fetch failed, falling back to direct oembed URL or standard preview:", e);
        }
        
        // Direct default or Unsplash editor theme fallback
        if (project.thumbnail_url) {
          setImgSrc(project.thumbnail_url);
        } else {
          setImgSrc("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200");
        }
      };

      getTikTokThumbnail();
      return;
    }

    // 2. YouTube modes or defaults
    if (isYoutube && activeVideo.id) {
      if (mode === "custom" && project.thumbnail_url) {
        setImgSrc(project.thumbnail_url);
      } else {
        // Default to maxresdefault for higher resolution
        setImgSrc(`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`);
      }
    } 
    // 3. Vimeo modes or defaults
    else if (isVimeo && activeVideo.id) {
      if (project.thumbnail_url && !project.thumbnail_url.includes("img.youtube.com")) {
        setImgSrc(project.thumbnail_url);
      } else {
        // Vimeo thumbnail oEmbed placeholder or beautiful fallback
        setImgSrc(project.thumbnail_url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200");
      }
    }
    // 4. Custom or absolute static fallback
    else {
      setImgSrc(project.thumbnail_url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200");
    }
  }, [project, mode, activeVideo.id, isYoutube, isVimeo, isTiktok, activeVideo.originalUrl]);

  // Handle YouTube naturalWidth behavior detection (some missing maxresdefault have a 120x90 blank placeholder)
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (isYoutube && activeVideo.id && !hasFallbackToHq && img.naturalWidth === 120) {
      setHasFallbackToHq(true);
      setImgSrc(`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`);
    }
  };

  const handleError = () => {
    // If hqdefault also fails or custom URL fails, go to high definition cinematic fallback
    if (isYoutube && activeVideo.id && !hasFallbackToHq) {
      setHasFallbackToHq(true);
      setImgSrc(`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`);
    } else if (!hasFallbackToAlternative) {
      setHasFallbackToAlternative(true);
      setImgSrc("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200");
    }
  };

  return (
    <img
      ref={imgRef}
      src={imgSrc || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"}
      alt={project.title}
      onLoad={handleLoad}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className || "absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700 select-none pointer-events-none"}
    />
  );
}
