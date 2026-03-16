import Image from "next/image";
import { useState } from "react";

interface PhotoCardProps {
  src: string;
  alt: string;
}

function CardImage({ src, alt }: PhotoCardProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const fallbackSrc = "/photo-portfolio-bg.jpg";

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

export default function PhotoCard({ src, alt }: PhotoCardProps) {
  return <CardImage key={src} src={src} alt={alt} />;
}
