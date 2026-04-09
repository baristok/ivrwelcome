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

      <div className="absolute inset-0 z-[12] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_32%),linear-gradient(180deg,rgba(4,6,12,0.28)_0%,rgba(4,6,12,0.62)_45%,rgba(4,6,12,0.92)_100%)]" />
      <div className="absolute inset-0 z-[13] bg-[linear-gradient(180deg,rgba(4,6,12,0.68)_0%,rgba(4,6,12,0.35)_28%,rgba(4,6,12,0.82)_100%)] md:bg-[linear-gradient(90deg,rgba(4,6,12,0.82)_0%,rgba(4,6,12,0.55)_35%,rgba(4,6,12,0.15)_100%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-12 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
          <span className="inline-flex max-w-full items-center rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-white/75 uppercase backdrop-blur-md sm:px-4 sm:text-xs">
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

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="mailto:hello@example.com"
              className="neumorphic-button inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/12 px-6 text-sm font-medium text-white shadow-[0_0_30px_rgba(96,165,250,0.18)] backdrop-blur-md transition-all duration-300 hover:border-sky-300/35 hover:bg-white/16 sm:w-auto"
            >
              Demo Talep Et
            </a>
            <a
              href="#overview"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/14 bg-black/12 px-6 text-sm font-medium text-white/82 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Nasıl Çalıştığını İncele
            </a>
          </div>

          <div
            id="overview"
            className="grid gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:gap-4 sm:pt-8 lg:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:p-5">
              <p className="font-medium text-white">Sinematik ilk izlenim</p>
              <p className="mt-2 leading-6 text-white/66">
                Optimize edilmiş loop video ile güçlü ama kontrollü bir görsel giriş.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:p-5">
              <p className="font-medium text-white">Yüksek okunabilirlik</p>
              <p className="mt-2 leading-6 text-white/66">
                Katmanlı overlay yapısı sayesinde başlık, açıklama ve CTA’lar net kalır.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:p-5">
              <p className="font-medium text-white">Performans odaklı</p>
              <p className="mt-2 leading-6 text-white/66">
                WebM ve MP4 fallback yapısıyla kaliteyi korurken yükü düşük tutar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
