"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Product } from "@/content/home";

const AUTOPLAY_MS = 5000;
const SCROLL_MS = 550;

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function cardScrollLeft(root: HTMLElement, card: HTMLElement) {
  return (
    root.scrollLeft +
    card.getBoundingClientRect().left -
    root.getBoundingClientRect().left
  );
}

function maxStartIndex(root: HTMLElement, cards: HTMLElement[]) {
  const limit = root.scrollWidth - root.clientWidth;
  let max = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card && cardScrollLeft(root, card) <= limit + 1) max = i;
  }

  return max;
}

function isMostlyVisible(root: HTMLElement) {
  const rect = root.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return false;

  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);

  return visible >= Math.min(rect.height, viewport) * 0.15;
}

export function CapabilitiesSlider({
  products,
}: {
  products: readonly Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const index = useRef(0);
  const pointerPaused = useRef(false);
  const ignoreScroll = useRef(false);
  const frame = useRef<number | null>(null);
  const moveId = useRef(0);
  const stepRef = useRef<(direction: -1 | 1) => void>(() => {});
  const armRef = useRef<() => void>(() => {});

  function cancelFrame() {
    if (frame.current === null) return;
    cancelAnimationFrame(frame.current);
    frame.current = null;
  }

  function scrollToLeft(root: HTMLElement, left: number, smooth: boolean) {
    const id = ++moveId.current;
    cancelFrame();
    ignoreScroll.current = true;
    // Snap otherwise cancels a scripted scroll that did not come from a click.
    root.style.scrollSnapType = "none";

    let settled = false;
    let fallback = 0;

    const settle = () => {
      if (settled || id !== moveId.current) return;
      settled = true;
      window.clearTimeout(fallback);
      cancelFrame();

      root.scrollLeft = left;
      root.style.scrollSnapType = "";
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        if (id !== moveId.current) return;
        if (Math.abs(root.scrollLeft - left) > 1) root.scrollLeft = left;
        ignoreScroll.current = false;
      });
      window.setTimeout(() => {
        if (id !== moveId.current) return;
        ignoreScroll.current = false;
      }, 50);
    };

    if (!smooth) {
      settle();
      return;
    }

    const start = root.scrollLeft;
    const delta = left - start;
    const startedAt = performance.now();

    const tick = (now: number) => {
      if (id !== moveId.current) return;

      const progress = Math.min(1, (now - startedAt) / SCROLL_MS);
      const eased = 1 - (1 - progress) ** 3;
      root.scrollLeft = start + delta * eased;

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }

      settle();
    };

    frame.current = requestAnimationFrame(tick);
    // Hidden tabs pause animation frames, so the slide still lands.
    fallback = window.setTimeout(settle, SCROLL_MS + 80);
  }

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

    const target = items[next];
    if (!target) return;

    index.current = next;
    scrollToLeft(
      root,
      cardScrollLeft(root, target),
      !wrapping && !prefersReducedMotion(),
    );
  }

  stepRef.current = step;

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;

    let timer: number | null = null;

    const arm = () => {
      if (timer !== null) window.clearInterval(timer);

      timer = window.setInterval(() => {
        if (
          pointerPaused.current ||
          document.hidden ||
          prefersReducedMotion() ||
          !isMostlyVisible(root)
        ) {
          return;
        }

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
        const item = items[i];
        if (!item) continue;

        const distance = Math.abs(cardScrollLeft(root, item) - root.scrollLeft);
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
      const item = items[max];
      if (!item) return;
      scrollToLeft(root, cardScrollLeft(root, item), false);
    };

    const stopAnimation = () => {
      moveId.current += 1;
      cancelFrame();
      root.style.scrollSnapType = "";
      ignoreScroll.current = false;
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerdown", stopAnimation);
    root.addEventListener("wheel", stopAnimation, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (timer !== null) window.clearInterval(timer);
      moveId.current += 1;
      cancelFrame();
      root.style.scrollSnapType = "";
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerdown", stopAnimation);
      root.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="flex min-w-0 flex-col gap-10"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        pointerPaused.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
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
        className="relative flex min-w-0 snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <article
            key={product.id}
            data-card
            className="flex w-full shrink-0 snap-start flex-col gap-5 bg-panel p-5 sm:w-[calc((100%-1.25rem)/2)] sm:p-6 lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="relative aspect-[1440/787]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-contain"
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
