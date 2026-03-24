"use client";
import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import CalendlyPopupButton from "./components/CalendlyPopupButton";
import HomeConversionSections from "./components/HomeConversionSections";
import Lightbox from "./components/LightBox";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

type TabKey = "all" | "portraits" | "events" | "brands" | "misc";

const tabs: { key: TabKey; display: string }[] = [
  { key: "all", display: "All" },
  { key: "portraits", display: "Portraits" },
  { key: "events", display: "Events" },
  { key: "brands", display: "Brands" },
  { key: "misc", display: "Miscellaneous" },
];

type Photo = {
  publicId: string;
  alt: string;
  tags: string[];
};

export default function Home() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxList, setLightboxList] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    fetch("/api/photos")
      .then((r) => r.json())
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPhotos = (tabKey: TabKey) =>
    tabKey === "all"
      ? photos
      : photos.filter((p) => p.tags.includes(tabKey));

  const openFromTab = (list: Photo[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col">
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
                    Portraits, special events, and travel stories with a sharper edge.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
                    Based in New York City, to a city near you. Explore the portfolio
                    and book when you're ready to lock in.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 lg:items-center">
                  <div className="relative h-52 w-52 overflow-hidden rounded-2xl">
                    <Image
                      src="/my-portrait.png"
                      alt="Jean-Robert — René Vision"
                      fill
                      sizes="160px"
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-col">
                    <CalendlyPopupButton
                      url={calendlyUrl}
                      label="Open scheduler"
                      className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-[1px] hover:shadow-xl"
                    />
                    <Link
                      href="/contact"
                      className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                    >
                      Contact directly
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur sm:p-8">
              <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
                <TabList className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
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
                </TabList>

                <TabPanels className="w-full">
                  {tabs.map((tab) => {
                    const list = filteredPhotos(tab.key);
                    return (
                      <TabPanel key={tab.key}>
                        {loading ? (
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div key={i} className="aspect-square w-full animate-pulse rounded-2xl bg-white/10" />
                            ))}
                          </div>
                        ) : list.length === 0 ? (
                          <p className="text-center text-stone-200">No photos yet.</p>
                        ) : (
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {list.map((photo, index) => (
                              <button
                                type="button"
                                key={photo.publicId}
                                className="group aspect-square overflow-hidden rounded-2xl bg-white/5 shadow-xl transition hover:scale-[1.02] hover:shadow-2xl"
                                onClick={() => openFromTab(list, index)}
                              >
                                <CldImage
                                  src={photo.publicId}
                                  alt={photo.alt}
                                  width={400}
                                  height={400}
                                  crop="fill"
                                  gravity="auto"
                                  loading={index === 0 ? "eager" : "lazy"}
                                  className="h-full w-full object-cover transition-opacity duration-500"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </TabGroup>
            </section>

            <HomeConversionSections />
          </div>
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