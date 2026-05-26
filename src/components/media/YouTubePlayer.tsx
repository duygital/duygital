import { getEmbedUrl } from "../../utils/videoProviders";

interface YouTubePlayerProps {
  id: string;
  originalUrl: string;
  title: string;
  startSeconds?: number;
  className?: string;
}

export default function YouTubePlayer({ id, originalUrl, title, startSeconds = 0, className = "" }: YouTubePlayerProps) {
  const embedUrl = getEmbedUrl("youtube", id, originalUrl, startSeconds);

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
      className={`w-full h-full border-0 absolute inset-0 z-10 ${className}`}
    />
  );
}
