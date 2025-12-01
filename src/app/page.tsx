"use client";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
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
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
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
          const mapped: Photo[] = data.photos.map((p: any) => ({
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
    setLightboxPhoto(null);
    setLightboxList([]);
  };

  const filteredPhotos = (tabKey: TabKey) =>
    tabKey === "all"
      ? photos
      : photos.filter((photo) => photo.category === tabKey);

  const openFromTab = (list: Photo[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
    setLightboxPhoto(list[index]);
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
            href="#"
            className="rounded-full border border-white/50 px-4 py-2 text-white transition hover:border-white hover:bg-white/10 hover:shadow-lg hover:-translate-y-[1px]"
          >
            Get in touch
          </Link>
        </header>

        <main className="grow">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12">
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
          </div>
        </main>

        {lightboxList.length > 0 && (
          <Lightbox
            isOpen
            onClose={handleCloseLightbox}
            photos={lightboxList}
            index={lightboxIndex}
            onChange={(nextIndex) => {
              setLightboxIndex(nextIndex);
              setLightboxPhoto(lightboxList[nextIndex]);
            }}
          />
        )}
      </div>
    </div>
  );
}
