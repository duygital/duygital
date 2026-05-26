import { useState } from "react";
import { Play } from "lucide-react";
import { Project } from "../../types";
import { parseVideoUrl, parseTimeToSeconds } from "../../utils/videoProviders";
import YouTubePlayer from "./YouTubePlayer";
import VimeoPlayer from "./VimeoPlayer";
import TikTokPlayer from "./TikTokPlayer";
import VideoThumbnail from "./VideoThumbnail";

interface UnifiedVideoPlayerProps {
  project: Project;
  autoplay?: boolean;
  className?: string;
  onActivated?: () => void;
}

export default function UnifiedVideoPlayer({
  project,
  autoplay = false,
  className = "",
  onActivated
}: UnifiedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // 1. Get YT, Vimeo URL references
  const ytVideo = parseVideoUrl(project.youtube_url);
  const vimeoVideo = parseVideoUrl(project.vimeo_url);

  // 2. Resolve final provider & ID
  let activeVideo = ytVideo;
  if (ytVideo.provider === "unknown" && vimeoVideo.provider === "vimeo") {
    activeVideo = vimeoVideo;
  }

  // 3. Detect TikTok URL if present in any of the fields
  const possibleTiktokUrl = [project.youtube_url, project.vimeo_url, project.thumbnail_url].find(u => u && u.includes("tiktok.com"));
  const parsedTiktok = parseVideoUrl(possibleTiktokUrl);
  if (parsedTiktok.provider === "tiktok") {
    activeVideo = parsedTiktok;
  }

  const seconds = parseTimeToSeconds(project.thumbnail_time);

  const startPlaying = () => {
    setIsPlaying(true);
    if (onActivated) onActivated();
  };

  // If we decided it's unknown or we are not playing, show the thumbnail and an elegant play button overlay
  if (!isPlaying) {
    return (
      <div 
        onClick={startPlaying}
        className={`relative w-full h-full cursor-pointer group overflow-hidden ${className}`}
      >
        <VideoThumbnail project={project} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-[1.02] group-hover:opacity-95 transition-all duration-700" />
        
        {/* Cinematic Backdrop Vignette */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-10" />

        {/* Dynamic elegant play indicator */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-[#D9381E] text-white flex items-center justify-center border border-white/10 shadow-[0_4px_30px_rgba(217,56,30,0.6)] group-hover:scale-110 group-hover:text-black group-hover:bg-white transition-all duration-300">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
        </div>
      </div>
    );
  }

  // If playing, resolve the active provider player component
  if (activeVideo.provider === "youtube") {
    return (
      <YouTubePlayer
        id={activeVideo.id}
        originalUrl={activeVideo.originalUrl}
        title={project.title}
        startSeconds={seconds}
        className={className}
      />
    );
  }

  if (activeVideo.provider === "vimeo") {
    return (
      <VimeoPlayer
        id={activeVideo.id}
        originalUrl={activeVideo.originalUrl}
        title={project.title}
        startSeconds={seconds}
        className={className}
      />
    );
  }

  if (activeVideo.provider === "tiktok") {
    return (
      <TikTokPlayer
        id={activeVideo.id}
        originalUrl={activeVideo.originalUrl}
        title={project.title}
        className={className}
      />
    );
  }

  // Pure Fallback: If unknown format or error occurs, display elegant placeholder that retries playing
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#07010C]">
      <Play className="w-12 h-12 text-[#D9381E] mb-4 animate-pulse" />
      <p className="text-[#F5F5F0] font-mono text-sm tracking-wider uppercase">
        Video player connection pending or unavailable
      </p>
    </div>
  );
}
