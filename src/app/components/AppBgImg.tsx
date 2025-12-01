import Image from "next/image";
import bgImage from "../../../public/photo-portfolio-bg-2.jpg";

export default function AppBgImg() {
  return (
    <Image
      src={bgImage}
      placeholder="blur"
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
        opacity: 0.7,
      }}
      alt={""}
      quality={2}
    />
  );
}
