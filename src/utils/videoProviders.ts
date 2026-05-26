export type VideoProvider = "youtube" | "vimeo" | "tiktok" | "unknown";

export interface ParsedVideo {
  provider: VideoProvider;
  id: string;
  originalUrl: string;
}

/**
 * Parses any video URL or ID to identify provider and video ID
 */
export function parseVideoUrl(url: string | null | undefined): ParsedVideo {
  if (!url) {
    return { provider: "unknown", id: "", originalUrl: "" };
  }

  const str = String(url).trim();

  // 1. YouTube Detection
  // Check Shorts format explicitly
  const shortsMatch = str.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return { provider: "youtube", id: shortsMatch[1], originalUrl: str };
  }

  // Check watch?v= or v= or standard queries
  const ytQueryMatch = str.match(/(?:youtube\.com.*(?:\?|&|#)v=|youtu\.be\/|v\/|embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytQueryMatch && ytQueryMatch[1]) {
    return { provider: "youtube", id: ytQueryMatch[1], originalUrl: str };
  }

  // General YouTube pattern
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = str.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return { provider: "youtube", id: match[2], originalUrl: str };
  }

  // 11-char fallback for raw IDs
  if (str.length === 11 && !str.includes("/") && !str.includes(".")) {
    return { provider: "youtube", id: str, originalUrl: str };
  }

  // 2. Vimeo Detection
  const vimeoMatch = str.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/|vimeo\.com\/groups\/\w+\/videos\/)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return { provider: "vimeo", id: vimeoMatch[1], originalUrl: str };
  }

  // Raw numeric ID check for Vimeo
  if (/^\d+$/.test(str)) {
    return { provider: "vimeo", id: str, originalUrl: str };
  }

  // 3. TikTok Detection
  // Patterns like tiktok.com/@user/video/1234567 or tiktok.com/v/1234567
  const tiktokMatch = str.match(/(?:tiktok\.com\/@[\w.-]+\/video\/|tiktok\.com\/v\/)(\d+)/);
  if (tiktokMatch && tiktokMatch[1]) {
    return { provider: "tiktok", id: tiktokMatch[1], originalUrl: str };
  }

  // vt.tiktok.com short links, we don't know numeric ID yet, but we can treat the whole link/slug as part of originalUrl
  if (str.includes("tiktok.com")) {
    // If we have vt.tiktok.com or similar, let's extract the code after path
    const shortTiktok = str.match(/tiktok\.com\/([\w\d]+)/);
    const fallbackId = shortTiktok ? shortTiktok[1] : "tiktok-video";
    return { provider: "tiktok", id: fallbackId, originalUrl: str };
  }

  return { provider: "unknown", id: "", originalUrl: str };
}

/**
 * Returns the embed URL for a given project/video source, supporting timestamps (seek/start time)
 */
export function getEmbedUrl(provider: VideoProvider, id: string, originalUrl: string, startSeconds = 0): string {
  if (provider === "youtube") {
    let url = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&showinfo=0`;
    if (startSeconds > 0) {
      url += `&start=${startSeconds}`;
    }
    return url;
  }

  if (provider === "vimeo") {
    let url = `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&byline=0&title=0&portrait=0`;
    if (startSeconds > 0) {
      url += `#t=${startSeconds}s`;
    }
    return url;
  }

  if (provider === "tiktok") {
    // According to Tiktok official embedded player docs: https://www.tiktok.com/player/v1/VIDEO_ID
    return `https://www.tiktok.com/player/v1/${id}?autoplay=1&muted=0`;
  }

  return "";
}

/**
 * Parses timestamp strings like "1:24" or "0:02" to total seconds
 */
export function parseTimeToSeconds(timeStr: string | null | undefined): number {
  if (!timeStr) return 0;
  const parts = String(timeStr).trim().split(":").map(Number);
  if (parts.length === 2) {
    if (isNaN(parts[0]) || isNaN(parts[1])) return 0;
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    if (isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return 0;
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  const parsed = parseInt(timeStr, 10);
  return isNaN(parsed) ? 0 : parsed;
}
