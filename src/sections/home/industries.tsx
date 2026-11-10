import Image from "next/image";
import { industries } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-6 bg-dark py-page">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title={"Критически важные отрасли.\nреальные задачи"}
          description="Комплесный подход к безопасности объектов различного назначения и масштаба"
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.title}>
              <article className="relative flex h-[420px] flex-col justify-end p-8 md:h-[550px] md:p-10">
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <h3 className="relative text-[1.75rem] leading-[1.2] font-bold uppercase">
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
