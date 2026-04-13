"use client";

import { ArrowUpRight, Layers, ShieldCheck, Zap } from "lucide-react";

import { GlassButton } from "@/components/ui/glass-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const heroHighlights = [
  {
    title: "Sinematik ilk izlenim",
    description:
      "Optimize edilmiş loop video ile güçlü ama kontrollü bir görsel giriş.",
    stat: "4K hissi",
    spotlightColor: "rgba(14, 165, 233, 0.18)",
    icon: Layers,
    iconWrapClassName:
      "bg-sky-950/60 border-sky-400/15 text-sky-300",
    numberClassName:
      "border-sky-400/15 bg-sky-400/10 text-sky-200",
  },
  {
    title: "Yüksek okunabilirlik",
    description:
      "Katmanlı overlay yapısı sayesinde başlık, açıklama ve CTA’lar net kalır.",
    stat: "Net hiyerarşi",
    spotlightColor: "rgba(168, 85, 247, 0.2)",
    icon: ShieldCheck,
    iconWrapClassName:
      "bg-violet-950/60 border-violet-400/15 text-violet-300",
    numberClassName:
      "border-violet-400/15 bg-violet-400/10 text-violet-200",
  },
  {
    title: "Performans odaklı",
    description:
      "WebM ve MP4 fallback yapısıyla kaliteyi korurken yükü düşük tutar.",
    stat: "Hafif yük",
    spotlightColor: "rgba(52, 211, 153, 0.18)",
    icon: Zap,
    iconWrapClassName:
      "bg-emerald-950/60 border-emerald-400/15 text-emerald-300",
    numberClassName:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-200",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07080d] text-white">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/hero-poster.webp"
          className="hero-video block h-full w-full object-cover object-center md:hidden"
          aria-hidden="true"
        >
          <source src="/videos/hero/hero-mobile.webm" type="video/webm" />
          <source src="/videos/hero/hero-mobile.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/hero-poster.webp"
          className="hero-video hidden h-full w-full object-cover object-[center_35%] md:block"
          aria-hidden="true"
        >
          <source src="/videos/hero/hero-desktop.webm" type="video/webm" />
          <source src="/videos/hero/hero-desktop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-[11] opacity-80 [background:radial-gradient(circle_at_16%_18%,rgba(125,211,252,0.18),transparent_20%),radial-gradient(circle_at_84%_22%,rgba(192,132,252,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(45,212,191,0.14),transparent_28%)]" />
      <div className="absolute inset-0 z-[12] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_32%),linear-gradient(180deg,rgba(4,6,12,0.2)_0%,rgba(4,6,12,0.56)_45%,rgba(4,6,12,0.84)_100%)]" />
      <div className="absolute inset-0 z-[13] bg-[linear-gradient(180deg,rgba(4,6,12,0.58)_0%,rgba(4,6,12,0.24)_28%,rgba(4,6,12,0.76)_100%)] md:bg-[linear-gradient(90deg,rgba(4,6,12,0.76)_0%,rgba(4,6,12,0.46)_35%,rgba(4,6,12,0.12)_100%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-12 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
          <span className="hero-badge inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-white/75 uppercase backdrop-blur-md sm:px-4 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
            Yeni Nesil IVR Deneyimi
          </span>

          <div className="space-y-4 sm:space-y-5">
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl lg:leading-[1.02]">
              Karşılama anını daha akıllı, daha etkileyici ve daha akıcı hale getir.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-white/72 sm:max-w-2xl sm:text-lg sm:leading-8">
              Video tabanlı güçlü bir ilk ekran, net mesajlaşma ve premium bir arayüz
              hissiyle ziyaretçiyi ilk saniyede yakalayan modern bir deneyim sun.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <GlassButton
              type="button"
              variant="accent"
              className="min-w-[12.75rem] justify-center text-white"
              onClick={() => {
                window.location.href = "mailto:hello@example.com";
              }}
            >
              <span>Demo Talep Et</span>
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </GlassButton>
            <GlassButton
              type="button"
              variant="default"
              className="min-w-[15rem] justify-center text-white/96"
              onClick={() => {
                document.getElementById("overview")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span>Nasıl Çalıştığını İncele</span>
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </GlassButton>
          </div>

          <div
            id="overview"
            className="grid gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:gap-4 sm:pt-8 lg:grid-cols-3"
          >
            {heroHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <SpotlightCard
                  key={item.title}
                  className="hero-info-card group rounded-[22px] border-white/10 bg-transparent px-4 py-3.5 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 sm:px-4.5 sm:py-4"
                  spotlightColor={item.spotlightColor}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-3">
                      <div
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${item.iconWrapClassName}`}
                      >
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>

                      <div className="space-y-1.5">
                        <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-white/62 uppercase backdrop-blur-md">
                          {item.stat}
                        </span>
                        <p className="text-[15px] font-medium text-white">{item.title}</p>
                      </div>
                    </div>

                    <span
                      className={`mt-0.5 inline-flex h-8.5 w-8.5 items-center justify-center rounded-xl border text-xs font-medium backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${item.numberClassName}`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-3 max-w-[32ch] text-sm leading-5.5 text-white/66">
                    {item.description}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
