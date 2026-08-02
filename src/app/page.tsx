"use client";
import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import CalendlyPopupButton from "./components/CalendlyPopupButton";
import HomeConversionSections from "./components/HomeConversionSections";
import Lightbox from "./components/LightBox";
import Reveal from "./components/Reveal";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

type TabKey = "all" | "portraits" | "events" | "brands" | "misc";

const tabs: { key: TabKey; display: string }[] = [
  { key: "all", display: "All" },
  { key: "portraits", display: "Portraits" },
  { key: "events", display: "Events" },
  { key: "brands", display: "Brands" },
  { key: "misc", display: "Misc" },
];

type Photo = {
  publicId: string;
  alt: string;
  tags: string[];
};

const heroLine1 = ["The", "version", "of", "you"];
const heroLine2 = ["worth", "remembering."];

export default function Home() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxList, setLightboxList] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  useEffect(() => {
    fetch("/api/photos")
      .then((r) => r.json())
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  const visiblePhotos =
    activeTab === "all"
      ? photos
      : photos.filter((p) => p.tags.includes(activeTab));

  const openLightbox = (list: Photo[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="grow">
        {/* ---------- Hero ---------- */}
        <section className="mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center px-5 pt-28 sm:px-8">
          <p
            className="word-rise eyebrow text-xs uppercase tracking-[0.32em] text-muted"
            style={{ animationDelay: "80ms" }}
          >
            René Vision — Photographer, New York City
          </p>

          <h1 className="mt-8 font-display text-[13vw] leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            <span className="block">
              {heroLine1.map((word, i) => (
                <span key={word} className="word-mask mr-[0.24em]">
                  <span
                    className="word-rise"
                    style={{ animationDelay: `${160 + i * 80}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
            <span className="block italic">
              {heroLine2.map((word, i) => (
                <span key={word} className="word-mask mr-[0.24em]">
                  <span
                    className="word-rise"
                    style={{
                      animationDelay: `${160 + (heroLine1.length + i) * 80}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div
            className="word-rise mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            style={{ animationDelay: "760ms" }}
          >
            <p className="max-w-md text-base leading-7 text-muted">
              Portraits, editorial, and special events — shot with honesty and
              intention. No performative poses. No awkward direction.
            </p>
            <div className="flex items-center gap-6">
              <CalendlyPopupButton
                url={calendlyUrl}
                label="Book a session"
                className="rounded-full bg-ink px-7 py-3.5 text-[13px] uppercase tracking-[0.18em] text-paper transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-ink/20"
              />
              <a
                href="#work"
                className="link-underline text-[13px] uppercase tracking-[0.18em] text-ink"
              >
                See the work
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Gallery ---------- */}
        <section
          id="work"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
        >
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-6 border-t border-ink/10 pt-8">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Selected work
              </h2>
              <div className="flex flex-wrap gap-x-7 gap-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`link-underline text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      activeTab === tab.key
                        ? "is-active text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {tab.display}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12">
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] w-full animate-pulse bg-ink/[0.06]"
                  />
                ))}
              </div>
            ) : visiblePhotos.length === 0 ? (
              <p className="py-16 text-center text-muted">No photos yet.</p>
            ) : (
              <div
                key={activeTab}
                className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
              >
                {visiblePhotos.map((photo, index) => (
                  <Reveal key={photo.publicId} delay={(index % 3) * 90}>
                    <button
                      type="button"
                      className="img-zoom group block w-full overflow-hidden bg-ink/[0.04]"
                      onClick={() => openLightbox(visiblePhotos, index)}
                    >
                      <CldImage
                        src={photo.publicId}
                        alt={photo.alt}
                        width={640}
                        height={800}
                        crop="fill"
                        gravity="auto"
                        loading={index < 3 ? "eager" : "lazy"}
                        className="aspect-[4/5] h-auto w-full object-cover"
                      />
                    </button>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        <HomeConversionSections />
      </main>

      {lightboxList.length > 0 && (
        <Lightbox
          isOpen
          onClose={() => setLightboxList([])}
          photos={lightboxList}
          index={lightboxIndex}
          onChange={setLightboxIndex}
        />
      )}

      <SiteFooter />
    </div>
  );
}
