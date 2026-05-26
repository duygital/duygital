import { getEmbedUrl } from "../../utils/videoProviders";

interface VimeoPlayerProps {
  id: string;
  originalUrl: string;
  title: string;
  startSeconds?: number;
  className?: string;
}

export default function VimeoPlayer({ id, originalUrl, title, startSeconds = 0, className = "" }: VimeoPlayerProps) {
  const embedUrl = getEmbedUrl("vimeo", id, originalUrl, startSeconds);

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
