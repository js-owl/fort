import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col lg:min-h-[1080px]"
    >
      <Image
        src="/images/home/hero.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/25 lg:hidden" />
      <SiteHeader />
      <div className="relative z-10 flex flex-1 flex-col justify-between px-page py-page">
        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="flex flex-col gap-5">
            <span className="text-h1 font-medium uppercase">Форт - 9</span>
            <span className="text-h2 font-medium uppercase">
              Технологии защиты
              <br />в едином комплексе
            </span>
          </h1>
          <p className="max-w-[600px] text-lead text-muted">
            Выявление, сопровождение и нейтрализация воздушных угроз с помощью
            объединенных технологий единой цифровой платформы
          </p>
        </div>
        <Button href="#capabilities" className="mt-12 w-fit">
          Определиться с конфигурацией
          <Image
            src="/images/home/chevron-right.svg"
            alt=""
            width={24}
            height={24}
          />
        </Button>
      </div>
    </section>
  );
}
