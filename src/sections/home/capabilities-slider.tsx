"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Product } from "@/content/home";

const AUTOPLAY_MS = 5000;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function maxStartIndex(root: HTMLElement, cards: HTMLElement[]) {
  const limit = root.scrollWidth - root.clientWidth;
  let max = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].offsetLeft <= limit + 1) max = i;
  }

  return max;
}

export function CapabilitiesSlider({
  products,
}: {
  products: readonly Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const index = useRef(0);
  const pointerPaused = useRef(false);
  const offscreen = useRef(true);
  const ignoreScroll = useRef(false);
  const stepRef = useRef<(direction: -1 | 1) => void>(() => {});
  const armRef = useRef<() => void>(() => {});

  function step(direction: -1 | 1) {
    const root = scroller.current;
    if (!root) return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-card]")];
    if (items.length === 0) return;

    const max = maxStartIndex(root, items);
    if (max === 0) return;

    let next = Math.min(index.current, max) + direction;
    const wrapping = next > max || next < 0;
    if (next > max) next = 0;
    if (next < 0) next = max;

    index.current = next;
    ignoreScroll.current = true;
    root.scrollTo({
      left: items[next].offsetLeft,
      behavior: wrapping || prefersReducedMotion() ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      ignoreScroll.current = false;
    }, 800);
  }

  stepRef.current = step;

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;

    let timer: number | null = null;

    const arm = () => {
      if (timer !== null) window.clearInterval(timer);
      if (prefersReducedMotion()) return;

      timer = window.setInterval(() => {
        if (pointerPaused.current || offscreen.current || document.hidden)
          return;
        stepRef.current(1);
      }, AUTOPLAY_MS);
    };

    armRef.current = arm;
    arm();

    const onScroll = () => {
      if (ignoreScroll.current) return;

      const items = [...root.querySelectorAll<HTMLElement>("[data-card]")];
      const max = maxStartIndex(root, items);
      let closest = 0;
      let best = Number.POSITIVE_INFINITY;

      for (let i = 0; i <= max; i++) {
        const distance = Math.abs(items[i].offsetLeft - root.scrollLeft);
        if (distance < best) {
          best = distance;
          closest = i;
        }
      }

      index.current = closest;
    };

    const onResize = () => {
      const items = [...root.querySelectorAll<HTMLElement>("[data-card]")];
      const max = maxStartIndex(root, items);
      if (index.current <= max) return;

      index.current = max;
      root.scrollTo({ left: items[max]?.offsetLeft ?? 0, behavior: "auto" });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        offscreen.current = !entry?.isIntersecting;
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (timer !== null) window.clearInterval(timer);
      observer.disconnect();
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="flex min-w-0 flex-col gap-10"
      onMouseEnter={() => {
        pointerPaused.current = true;
      }}
      onMouseLeave={() => {
        pointerPaused.current = false;
      }}
      onFocusCapture={() => {
        pointerPaused.current = true;
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        pointerPaused.current = false;
      }}
    >
      <h2 className="text-h2 font-medium uppercase">Технические средства</h2>
      <div
        ref={scroller}
        className="relative flex min-w-0 snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <article
            key={product.id}
            data-card
            className="flex w-full shrink-0 snap-start flex-col gap-5 bg-panel p-5 sm:w-[calc((100%-1.25rem)/2)] sm:p-6 lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="relative aspect-[7/4]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-h3 leading-[1.4] font-medium">
              {product.title}
            </h3>
          </article>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          className="grid size-12 cursor-pointer place-items-center border border-muted"
          aria-label="Предыдущая карточка"
          onClick={() => {
            step(-1);
            armRef.current();
          }}
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
          onClick={() => {
            step(1);
            armRef.current();
          }}
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
  );
}
