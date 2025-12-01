import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface PhotoCardProps {
  src: string;
  alt: string;
}

export default function PhotoCard({ src, alt }: PhotoCardProps) {
  const resolvedSrc = useMemo(
    () => (src.startsWith("http") ? `/api/proxy-image?url=${encodeURIComponent(src)}` : src),
    [src]
  );
  const [imageSrc, setImageSrc] = useState(resolvedSrc);
  const fallbackSrc = "/photo-portfolio-bg.jpg";

  useEffect(() => {
    setImageSrc(resolvedSrc);
  }, [resolvedSrc]);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="200px"
        priority={src === "/bgImg.jpg"}
        className="object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
        onError={handleError}
      />
    </div>
  );
}
