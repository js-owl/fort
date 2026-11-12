import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { aboutHero } from "@/content/about";

export function AboutHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-dark lg:aspect-[1920/1080] lg:min-h-0">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={aboutHero.image}
          alt=""
          width={694}
          height={538}
          preload
          sizes="(min-width: 1024px) 67vw, 100vw"
          className="absolute top-0 left-[32.83%] h-auto w-[67.19%] max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#191919_32.969%,transparent_65.469%)]" />
        <div className="absolute inset-0 bg-dark/75 lg:hidden" />
      </div>
      <div className="relative z-10 bg-dark">
        <SiteHeader />
      </div>
      <div className="relative z-10 flex flex-col gap-8 px-page py-16 lg:gap-10 lg:p-page">
        <h1 className="max-w-[1100px] text-h1 font-medium whitespace-pre-line uppercase">
          {aboutHero.title}
        </h1>
        <p className="max-w-[600px] text-lead text-muted">{aboutHero.text}</p>
        <p className="text-xl leading-[1.2] font-medium text-muted uppercase">
          {aboutHero.note}
        </p>
      </div>
    </section>
  );
}
