"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { industries } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const desktopMedia = "(min-width: 80rem)";

const cardFrame = industries.reduce((tallest, industry) =>
  industry.height * tallest.width > tallest.height * industry.width
    ? industry
    : tallest,
);

export function Industries() {
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const process = document.getElementById("process");
    if (!process) return;

    const media = window.matchMedia(desktopMedia);
    const sync = () => {
      setHeight(media.matches ? process.offsetHeight * 0.95 : undefined);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(process);
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      id="industries"
      className="scroll-mt-6 bg-dark py-page xl:flex xl:min-h-[calc(100vw*941*0.9/1670)] xl:flex-col xl:overflow-hidden"
      style={height === undefined ? undefined : { height }}
    >
      <Container className="flex flex-col gap-10 lg:gap-[60px] xl:min-h-0 xl:flex-1">
        <div className="shrink-0">
          <SectionHeading
            title="Обеспечиваем безопасность в критически важных отраслях"
            description="Комплесный подход к безопасности объектов различного назначения и масштаба"
          />
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-3 xl:grid-rows-2">
          {industries.map((industry) => (
            <li key={industry.title} className="h-full min-h-0">
              <article
                className="@container relative h-full bg-[#25272a] max-xl:[aspect-ratio:var(--frame)]"
                style={
                  {
                    "--frame": `${cardFrame.width} / ${cardFrame.height}`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain object-top xl:object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t from-dark from-25% to-transparent xl:block" />
                <h3 className="absolute inset-x-0 bottom-0 z-10 p-8 text-[clamp(1.125rem,5.0cqi,1.75rem)] leading-[1.2] font-bold wrap-break-word uppercase md:p-10">
                  {industry.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}