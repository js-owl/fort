"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Product } from "@/content/home";

export function CapabilitiesSlider({
  products,
}: {
  products: readonly Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const root = scroller.current;
    const card = root?.querySelector<HTMLElement>("[data-card]");
    if (!root || !card) return;

    const gap = Number.parseFloat(getComputedStyle(root).columnGap);
    root.scrollBy({
      left: direction * (card.offsetWidth + (Number.isFinite(gap) ? gap : 0)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <div className="flex min-w-0 flex-col gap-10">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-h2 font-medium uppercase">Технические средства</h2>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="grid size-12 cursor-pointer place-items-center border border-muted"
            aria-label="Предыдущая карточка"
            onClick={() => scrollByCard(-1)}
          >
            <Image
              src="/images/home/chevron-right.svg"
              alt=""
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
          <button
            type="button"
            className="grid size-12 cursor-pointer place-items-center border border-muted"
            aria-label="Следующая карточка"
            onClick={() => scrollByCard(1)}
          >
            <Image
              src="/images/home/chevron-right.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="flex min-w-0 snap-x snap-mandatory scroll-px-page [scrollbar-width:none] gap-5 overflow-x-auto lg:gap-[60px] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <article
            key={product.id}
            data-card
            className="flex w-[min(85vw,700px)] shrink-0 snap-start flex-col gap-5 bg-panel p-6 sm:p-10"
          >
            <div className="relative h-[280px] sm:h-[400px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 768px) 700px, 85vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-h3 leading-[1.4] font-medium">
              {product.title}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
