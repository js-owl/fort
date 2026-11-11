import type { Metadata } from "next";
import { BuildTag } from "@/components/layout/build-tag";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Форт-9 — технологии защиты в едином комплексе",
    template: "%s — Форт-9",
  },
  description:
    "Выявление, сопровождение и нейтрализация воздушных угроз с помощью объединенных технологий единой цифровой платформы.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full scroll-smooth antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/montserrat-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          К содержанию
        </a>
        <div className="mx-auto w-full max-w-[1920px]">{children}</div>
        <BuildTag />
      </body>
    </html>
  );
}
