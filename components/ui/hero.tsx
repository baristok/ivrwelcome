"use client";

import * as React from "react";
import { ArrowUpRight, Layers, ShieldCheck, Zap } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

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
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [enablePointerParallax, setEnablePointerParallax] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerMode = () => {
      setEnablePointerParallax(mediaQuery.matches && !shouldReduceMotion);
    };

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.5 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.5 });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.4,
  });

  const parallaxEnabled = !shouldReduceMotion;
  const pointerFactor = enablePointerParallax ? 1 : 0;

  const videoY = useTransform(smoothScroll, [0, 1], [0, -18]);
  const videoX = useTransform(smoothPointerX, [-1, 1], [6 * pointerFactor, -6 * pointerFactor]);
  const videoOffset = useMotionTemplate`translate3d(${videoX}px, ${videoY}px, 0)`;
  const cardFloatY = useTransform(smoothPointerY, [-1, 1], [4 * pointerFactor, -4 * pointerFactor]);

  const glowLayerY = useTransform(smoothScroll, [0, 1], [0, -26]);
  const glowLayerX = useTransform(smoothPointerX, [-1, 1], [10 * pointerFactor, -10 * pointerFactor]);
  const glowLayerOffset = useMotionTemplate`translate3d(${glowLayerX}px, ${glowLayerY}px, 0)`;

  const atmosphereY = useTransform(smoothScroll, [0, 1], [0, -14]);
  const atmosphereX = useTransform(smoothPointerX, [-1, 1], [5 * pointerFactor, -5 * pointerFactor]);
  const atmosphereOffset = useMotionTemplate`translate3d(${atmosphereX}px, ${atmosphereY}px, 0)`;

  const readabilityY = useTransform(smoothScroll, [0, 1], [0, -8]);
  const readabilityX = useTransform(smoothPointerX, [-1, 1], [3 * pointerFactor, -3 * pointerFactor]);
  const readabilityOffset = useMotionTemplate`translate3d(${readabilityX}px, ${readabilityY}px, 0)`;

  const contentY = useTransform(smoothScroll, [0, 1], [0, -34]);
  const contentX = useTransform(smoothPointerX, [-1, 1], [-12 * pointerFactor, 12 * pointerFactor]);
  const contentOffset = useMotionTemplate`translate3d(${contentX}px, ${contentY}px, 0)`;

  const badgeY = useTransform(smoothScroll, [0, 1], [0, -16]);
  const badgeX = useTransform(smoothPointerX, [-1, 1], [-8 * pointerFactor, 8 * pointerFactor]);
  const badgeOffset = useMotionTemplate`translate3d(${badgeX}px, ${badgeY}px, 0)`;

  const cardsY = useTransform(smoothScroll, [0, 1], [0, -20]);
  const cardsX = useTransform(smoothPointerX, [-1, 1], [-6 * pointerFactor, 6 * pointerFactor]);
  const cardsOffset = useMotionTemplate`translate3d(${cardsX}px, ${cardsY}px, 0)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!enablePointerParallax || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(Number.isFinite(x) ? Math.max(-1, Math.min(1, x)) : 0);
    pointerY.set(Number.isFinite(y) ? Math.max(-1, Math.min(1, y)) : 0);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#07080d] text-white"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="absolute inset-0 z-0 hero-parallax-layer"
        style={parallaxEnabled ? { transform: videoOffset } : undefined}
      >
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
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[11] opacity-80 hero-parallax-layer [background:radial-gradient(circle_at_16%_18%,rgba(125,211,252,0.18),transparent_20%),radial-gradient(circle_at_84%_22%,rgba(192,132,252,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(45,212,191,0.14),transparent_28%)]"
        style={parallaxEnabled ? { transform: glowLayerOffset } : undefined}
      />
      <motion.div
        className="absolute inset-0 z-[12] hero-parallax-layer bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_32%),linear-gradient(180deg,rgba(4,6,12,0.2)_0%,rgba(4,6,12,0.56)_45%,rgba(4,6,12,0.84)_100%)]"
        style={parallaxEnabled ? { transform: atmosphereOffset } : undefined}
      />
      <motion.div
        className="absolute inset-0 z-[13] hero-parallax-layer bg-[linear-gradient(180deg,rgba(4,6,12,0.58)_0%,rgba(4,6,12,0.24)_28%,rgba(4,6,12,0.76)_100%)] md:bg-[linear-gradient(90deg,rgba(4,6,12,0.76)_0%,rgba(4,6,12,0.46)_35%,rgba(4,6,12,0.12)_100%)]"
        style={parallaxEnabled ? { transform: readabilityOffset } : undefined}
      />

      <motion.div
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-12 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-20 lg:pt-24"
        style={parallaxEnabled ? { transform: contentOffset } : undefined}
      >
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
          <motion.span
            className="hero-badge inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-white/75 uppercase backdrop-blur-md sm:px-4 sm:text-xs"
            style={parallaxEnabled ? { transform: badgeOffset } : undefined}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
            Yeni Nesil IVR Deneyimi
          </motion.span>

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
              className="min-w-[12.75rem] justify-center text-white shadow-[0_0_30px_rgba(34,211,238,0.18)]"
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
              className="min-w-[15rem] justify-center text-white shadow-[0_0_28px_rgba(129,140,248,0.14)]"
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

          <motion.div
            id="overview"
            className="grid gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:gap-4 sm:pt-8 lg:grid-cols-3"
            style={parallaxEnabled ? { transform: cardsOffset } : undefined}
          >
            {heroHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  className="hero-parallax-card"
                  style={
                    parallaxEnabled
                      ? {
                          animationDelay: `${index * 120}ms`,
                          y: cardFloatY,
                        }
                      : { animationDelay: `${index * 120}ms` }
                  }
                >
                  <SpotlightCard
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
