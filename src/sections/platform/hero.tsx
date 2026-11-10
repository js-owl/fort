import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { platformHero } from "@/content/platform";

export function PlatformHero() {
  return (
    <section className="flex flex-col bg-panel">
      <div className="bg-dark">
        <SiteHeader />
      </div>
      <div className="flex flex-col gap-10 px-page py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <h1 className="min-w-0 flex-1 text-h1 font-medium uppercase">
            {platformHero.title}
          </h1>
          <p className="text-lead text-muted lg:w-[560px] lg:shrink-0">
            {platformHero.text}
          </p>
        </div>
        <div className="relative aspect-[1490/694] w-full max-w-[1490px] overflow-hidden">
          <Image
            src={platformHero.image}
            alt={platformHero.imageAlt}
            fill
            priority
            sizes="(min-width: 1920px) 1490px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/13" />
        </div>
      </div>
    </section>
  );
}
