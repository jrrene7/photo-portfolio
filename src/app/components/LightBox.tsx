import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";

type Photo = { src: string; alt: string };

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  index: number;
  onChange: (nextIndex: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  photos,
  index,
  onChange,
}: LightboxProps) {
  const hasPhotos = photos.length > 0;
  const total = Math.max(photos.length, 1);
  const currentIndex = ((index % total) + total) % total;
  const current = hasPhotos ? photos[currentIndex] : { src: "", alt: "" };

  const resolvedSrc = useMemo(
    () =>
      current.src.startsWith("http")
        ? `/api/proxy-image?url=${encodeURIComponent(current.src)}`
        : current.src,
    [current.src]
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

  const goPrev = () => onChange((currentIndex - 1 + total) % total);
  const goNext = () => onChange((currentIndex + 1) % total);

  if (!hasPhotos) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-black/30 shadow-xl backdrop-blur">
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={imageSrc}
                    alt={current.alt}
                    fill
                    sizes="(min-width: 1024px) 70vw, 90vw"
                    className="object-contain"
                    priority
                    onError={handleError}
                  />
                </div>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white shadow-md backdrop-blur transition hover:-translate-y-1/2 hover:scale-105 hover:border-white/60 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                  onClick={goPrev}
                  aria-label="Previous photo"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 p-2 text-white shadow-md backdrop-blur transition hover:-translate-y-1/2 hover:scale-105 hover:border-white/60 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                  onClick={goNext}
                  aria-label="Next photo"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute top-4 right-4 rounded-full border border-white/30 bg-black/60 p-2 text-white shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
