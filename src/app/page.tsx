"use client";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import CalendlyEmbed from "./components/CalendlyEmbed";
import PhotoCard from "./components/PhotoCard";
import Lightbox from "./components/LightBox";

type TabKey = "all" | "humans" | "nature" | "everything-else";

const tabs: { key: TabKey; display: string }[] = [
  { key: "all", display: "All" },
  { key: "humans", display: "Humans" },
  { key: "nature", display: "Nature" },
  { key: "everything-else", display: "Everything Else" },
];

type Photo = {
  src: string;
  alt: string;
  category: Exclude<TabKey, "all">;
};

type RemotePhoto = {
  src: string;
  alt?: string;
  name?: string;
};

const fallbackPhotos: Photo[] = [
  {
    src: "/photo-portfolio-bg.jpg",
    alt: "Portrait with red scarf",
    category: "humans",
  },
  {
    src: "/photo-portfolio-bg-2.jpg",
    alt: "Woman seated on floor",
    category: "humans",
  },
  { src: "/bgImg.jpg", alt: "Model leaning against wall", category: "humans" },
  {
    src: "/photo-portfolio-bg-2.jpg",
    alt: "Editorial pose",
    category: "everything-else",
  },
];

export default function Home() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);
  const [lightboxList, setLightboxList] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/frameio/photos");
        if (!res.ok) throw new Error("Frame.io request failed");
        const data = await res.json();
        if (Array.isArray(data.photos) && data.photos.length) {
          const mapped: Photo[] = data.photos.map((p: RemotePhoto) => ({
            src: p.src,
            alt: p.alt || p.name || "Frame.io photo",
            category: "everything-else",
          }));
          setPhotos(mapped);
        }
      } catch (err) {
        console.error("Frame.io fetch error", err);
      }
    };
    load();
  }, []);

  const handleCloseLightbox = () => {
    setLightboxList([]);
  };

  const filteredPhotos = (tabKey: TabKey) =>
    tabKey === "all"
      ? photos
      : photos.filter((photo) => photo.category === tabKey);

  const openFromTab = (list: Photo[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg-2.jpg')] bg-top bg-cover">
      <div className="min-h-screen bg-gradient-to-b from-black/70 via-black/60 to-black/75">
        <header className="flex items-center justify-between h-[90px] px-12 border-b border-white/15 bg-black/25 backdrop-blur">
          <div className="text-transparent">.</div>
          <span className="font-display text-2xl font-semibold uppercase tracking-[0.22em] text-white drop-shadow">
            René Vision
          </span>
          <Link
            href="#book"
            className="rounded-full border border-white/50 px-4 py-2 text-white transition hover:border-white hover:bg-white/10 hover:shadow-lg hover:-translate-y-[1px]"
          >
            Book a session
          </Link>
        </header>

        <main className="grow">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 py-12">
            <Tab.Group selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
              <Tab.List className="mb-8 flex flex-wrap items-center justify-center gap-10">
                {tabs.map((tab) => (
                  <Tab key={tab.key}>
                    {({ selected }) => (
                      <span
                        className={
                          selected
                            ? "font-display text-xl text-white border-b-2 border-white pb-1"
                            : "text-stone-200 transition hover:text-white"
                        }
                      >
                        {tab.display}
                      </span>
                    )}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="w-full">
                {tabs.map((tab) => {
                  const list = filteredPhotos(tab.key);
                  return (
                    <Tab.Panel key={tab.key}>
                      <div className="flex flex-wrap justify-center gap-8">
                        {list.length === 0 ? (
                          <p className="text-stone-200">No photos yet.</p>
                        ) : (
                          list.map((photo, index) => (
                            <button
                              type="button"
                              key={`${photo.alt}-${index}`}
                              className="group rounded-3xl bg-gradient-to-br from-white/40 via-white/20 to-white/5 p-[3px] shadow-xl transition hover:scale-[1.02] hover:shadow-2xl"
                              onClick={() => openFromTab(list, index)}
                            >
                              <div className="rounded-3xl bg-black/60 p-2">
                                <PhotoCard src={photo.src} alt={photo.alt} />
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>
            </Tab.Group>

            <section
              id="book"
              className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
            >
              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                    Book René Vision
                  </p>
                  <h2 className="font-display text-4xl text-white sm:text-5xl">
                    Reserve your shoot without leaving the site.
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-stone-200">
                    Use the embedded Calendly scheduler to choose a time, confirm
                    details, and lock in your session. If you prefer the direct
                    booking page, use the button below.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={calendlyUrl ?? "#"}
                    target={calendlyUrl ? "_blank" : undefined}
                    rel={calendlyUrl ? "noreferrer" : undefined}
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
                  >
                    Open booking page
                  </Link>
                  <Link
                    href="mailto:hello@renevizion.com"
                    className="rounded-full border border-white/35 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                  >
                    Email instead
                  </Link>
                </div>
              </div>

              <CalendlyEmbed url={calendlyUrl} />
            </section>
          </div>
        </main>

        {lightboxList.length > 0 && (
          <Lightbox
            isOpen
            onClose={handleCloseLightbox}
            photos={lightboxList}
            index={lightboxIndex}
            onChange={setLightboxIndex}
          />
        )}
      </div>
    </div>
  );
}
