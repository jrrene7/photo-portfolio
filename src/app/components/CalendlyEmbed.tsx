type CalendlyEmbedProps = {
  url?: string;
};

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  if (!url) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/25 bg-black/20 p-8 text-center text-stone-200">
        Set <code>NEXT_PUBLIC_CALENDLY_URL</code> to your Calendly booking link to
        enable the inline scheduler.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
      <iframe
        src={url}
        title="Book a session with René Vision on Calendly"
        className="h-[760px] w-full"
        style={{ minWidth: "320px" }}
        loading="lazy"
      />
    </div>
  );
}
