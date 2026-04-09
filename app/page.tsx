export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 sm:px-10 lg:px-12">
      <section className="max-w-3xl space-y-8">
        <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-medium tracking-tight text-foreground/80 dark:border-white/10 dark:bg-white/5">
          Next.js 16 startup base
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Ürününüzü hızla ayağa kaldırmak için sade bir başlangıç temeli.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg">
            Bu sayfa, create-next-app başlangıç içeriği yerine gerçek ürün
            geliştirmeye uygun temiz bir startup omurgası sunar. Metadata,
            tipografi, global stiller ve temel SEO dosyaları hazırdır.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:hello@example.com"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            İletişime Geç
          </a>
          <a
            href="#overview"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
          >
            Temeli İncele
          </a>
        </div>

        <div
          id="overview"
          className="grid gap-4 border-t border-black/10 pt-8 text-sm text-foreground/70 dark:border-white/10 sm:grid-cols-3"
        >
          <div className="space-y-2 rounded-2xl border border-black/10 p-5 dark:border-white/10">
            <p className="font-medium text-foreground">Temiz başlangıç</p>
            <p>Starter linkleri, demo assetleri ve varsayılan içerikler kaldırıldı.</p>
          </div>
          <div className="space-y-2 rounded-2xl border border-black/10 p-5 dark:border-white/10">
            <p className="font-medium text-foreground">Production tabanı</p>
            <p>Layout, metadata, robots ve sitemap için temel yapı hazırlandı.</p>
          </div>
          <div className="space-y-2 rounded-2xl border border-black/10 p-5 dark:border-white/10">
            <p className="font-medium text-foreground">Kolay özelleştirme</p>
            <p>Başlıklar, CTA ve marka alanları daha sonra hızlıca değiştirilebilir.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
