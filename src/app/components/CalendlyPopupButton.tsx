"use client";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

type CalendlyPopupButtonProps = {
  url?: string;
  label: string;
  className?: string;
  onOpen?: () => void;
};

export default function CalendlyPopupButton({
  url,
  label,
  className,
  onOpen,
}: CalendlyPopupButtonProps) {
  const handleOpen = () => {
    if (!url) {
      return;
    }

    onOpen?.();
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      disabled={!url}
      className={className}
    >
      {label}
    </button>
  );
}
