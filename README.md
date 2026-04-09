# Startup Template

Next.js 16 ve App Router üzerine kurulmuş sade bir başlangıç tabanı.

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Kapsam

- create-next-app başlangıç kalıntıları temizlendi
- temel metadata yapısı kuruldu
- global tipografi ve stil tabanı sadeleştirildi
- `robots.txt` ve `sitemap.xml` üretimi eklendi

## Özelleştirme

Başlangıç metinleri ve marka alanları için ilk bakılacak dosyalar:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/robots.ts`
- `app/sitemap.ts`

## Deploy

Varsayılan `build` ve `start` scriptleri Node.js tabanlı dağıtım için hazırdır. Container tabanlı dağıtım gerekiyorsa `next.config.ts` içinde `output: "standalone"` ayrıca değerlendirilebilir.
