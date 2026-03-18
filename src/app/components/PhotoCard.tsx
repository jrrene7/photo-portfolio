"use client";

import Image from "next/image";
import { useState } from "react";

interface PhotoCardProps {
  src: string;
  alt: string;
}

// 1x1 dark grey pixel as a lightweight blur placeholder
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function CardImage({ src, alt }: PhotoCardProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const fallbackSrc = "/photo-portfolio-bg.jpg";

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/5">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        priority={src === "/bgImg.jpg"}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className={`object-cover transition-opacity duration-500 ease-out group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </div>
  );
}

export default function PhotoCard({ src, alt }: PhotoCardProps) {
  return <CardImage key={src} src={src} alt={alt} />;
}
