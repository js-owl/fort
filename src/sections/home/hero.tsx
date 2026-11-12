import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vw*941/1672)] flex-col"
    >
      <Image
        src="/images/home/hero.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-contain object-top"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/25 lg:hidden" />
      <SiteHeader />
      <div className="relative z-10 flex flex-1 flex-col justify-between px-page py-page">
        <div className="flex max-w-4xl flex-col gap-10">
          <h1 className="flex flex-col gap-10">
            <span className="text-h1 font-medium uppercase">
              Аэромакс защита
            </span>
            <span className="max-w-[17em] text-[clamp(1.75rem,0.9rem+1.4vw,3.125rem)] leading-[1.2] font-medium uppercase">
              Комплексные решения для защиты объектов от БПЛА
            </span>
          </h1>
          <p className="max-w-[600px] text-lead text-muted">
            Средства обнаружения и противодействия воздушным угрозам в единой
            цифровой платформе
          </p>
        </div>
        <Button href="#contact" className="mt-12 w-fit">
          Подобрать конфигурацию
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
