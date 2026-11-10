import Image from "next/image";
import { aboutPractice } from "@/content/about";

const photoCrop =
  "absolute top-[-240.83%] left-[-78.6%] h-[340.83%] w-[178.6%] max-w-none";

export function AboutPractice() {
  return (
    <section
      className="relative overflow-hidden bg-dark lg:aspect-[1920/845]"
      aria-labelledby="about-practice-title"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] overflow-hidden lg:block"
        aria-hidden
      >
        <Image
          src={aboutPractice.image}
          alt=""
          width={1024}
          height={1536}
          sizes="(min-width: 1920px) 1080px, 56vw"
          className={photoCrop}
        />
        <div className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-dark to-transparent" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-center gap-8 px-page py-16 lg:w-[50%] lg:py-page">
        <p className="flex items-center gap-4 text-sm leading-[1.2] font-medium tracking-[0.16em] uppercase">
          <span className="h-0.5 w-8 bg-brand" aria-hidden />
          {aboutPractice.eyebrow}
        </p>
        <h2 id="about-practice-title" className="max-w-[640px] text-h2 font-medium">
          {aboutPractice.title}
        </h2>
        <p className="max-w-[640px] text-lead text-muted">{aboutPractice.text}</p>
        <ul className="flex max-w-[640px] flex-col gap-3">
          {aboutPractice.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lead">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 size-6 shrink-0 text-brand"
                aria-hidden
              >
                <path
                  d="M5 12.5 9.2 17 19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-72 overflow-hidden sm:h-[420px] lg:hidden">
        <Image
          src={aboutPractice.image}
          alt={aboutPractice.imageAlt}
          width={1024}
          height={1536}
          sizes="100vw"
          className={photoCrop}
        />
      </div>
    </section>
  );
}
