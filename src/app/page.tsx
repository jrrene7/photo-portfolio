"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import CalendlyPopupButton from "./components/CalendlyPopupButton";
import HomeConversionSections from "./components/HomeConversionSections";
import PhotoCard from "./components/PhotoCard";
import Lightbox from "./components/LightBox";
import SiteHeader from "./components/SiteHeader";

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
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [lightboxList, setLightboxList] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleCloseLightbox = () => {
    setLightboxList([]);
  };

  const filteredPhotos = (tabKey: TabKey) =>
    tabKey === "all"
      ? fallbackPhotos
      : fallbackPhotos.filter((photo) => photo.category === tabKey);

  const openFromTab = (list: Photo[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[url('/photo-portfolio-bg-2.jpg')] bg-top bg-cover">
      <div className="min-h-screen bg-gradient-to-b from-black/70 via-black/60 to-black/75">
        <SiteHeader />

        <main className="grow">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
            <section className="w-full rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-300">
                    René Vision
                  </p>
                  <h1 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                    Portraits, editorials, and visual stories with a sharper edge.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
                    Explore the portfolio, then open the scheduler when you are
                    ready to lock in a session.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                  <CalendlyPopupButton
                    url={calendlyUrl}
                    label="Open scheduler"
                    className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
                  />
                  <Link
                    href="mailto:renevision.media@gmail.com"
                    className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                  >
                    Contact directly
                  </Link>
                </div>
              </div>
            </section>

            <Tab.Group selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
              <Tab.List className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                {tabs.map((tab) => (
                  <Tab key={tab.key}>
                    {({ selected }) => (
                      <span
                        className={
                          selected
                            ? "font-display border-b-2 border-white pb-1 text-lg text-white sm:text-xl"
                            : "text-sm text-stone-200 transition hover:text-white sm:text-base"
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
                      <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
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

            <HomeConversionSections />
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
