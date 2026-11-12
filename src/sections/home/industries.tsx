import Image from "next/image";
import { industries } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const cardFrame = industries.reduce((tallest, industry) =>
  industry.height * tallest.width > tallest.height * industry.width
    ? industry
    : tallest,
);

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-6 bg-dark py-page">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Обеспечиваем безопасность в критически важных отраслях"
          description="Комплесный подход к безопасности объектов различного назначения и масштаба"
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.title} className="h-full">
              <article
                className="@container relative h-full bg-[#25272a]"
                style={{
                  aspectRatio: `${cardFrame.width} / ${cardFrame.height}`,
                }}
              >
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain object-top"
                />
                <h3 className="absolute inset-x-0 bottom-0 p-8 text-[clamp(1.125rem,6.2cqi,1.75rem)] leading-[1.2] font-bold wrap-break-word uppercase md:p-10">
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
