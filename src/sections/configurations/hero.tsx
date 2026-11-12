import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { configurationHero } from "@/content/configurations";

export function ConfigurationHero() {
  return (
    <section className="flex flex-col bg-dark">
      <SiteHeader />
      <div className="relative flex min-h-[calc(100vw*941/1672)] flex-1 flex-col justify-between gap-12 px-page py-16 lg:p-page">
        <Image
          src={configurationHero.image}
          alt={configurationHero.imageAlt}
          fill
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-contain object-top"
        />
        <div className="relative z-10 flex max-w-[1100px] flex-col gap-8 lg:gap-10">
          <h1 className="text-h1 font-medium whitespace-pre-line uppercase">
            {configurationHero.title}
          </h1>
          <p className="max-w-[600px] text-lead text-muted">
            {configurationHero.text}
          </p>
        </div>
        <Button
          href={configurationHero.ctaHref}
          className="relative z-10 w-fit bg-[#cd2026] px-10 sm:px-[60px]"
        >
          {configurationHero.cta}
        </Button>
      </div>
    </section>
  );
}
