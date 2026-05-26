import { getEmbedUrl } from "../../utils/videoProviders";

interface TikTokPlayerProps {
  id: string;
  originalUrl: string;
  title: string;
  className?: string;
}

export default function TikTokPlayer({ id, originalUrl, title, className = "" }: TikTokPlayerProps) {
  const embedUrl = getEmbedUrl("tiktok", id, originalUrl);

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
