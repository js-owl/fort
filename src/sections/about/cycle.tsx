import Image from "next/image";
import { aboutCycle } from "@/content/about";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutCycle() {
  return (
    <section className="bg-dark py-page">
      <Container className="flex flex-col gap-16 lg:gap-20">
        <SectionHeading title={aboutCycle.title} description={aboutCycle.text} />
        <ul className="grid items-stretch gap-5 lg:grid-cols-3">
          {aboutCycle.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-8 bg-panel p-6 sm:gap-10 sm:p-10"
            >
              <div className="relative aspect-[286/188] w-full">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-h3 font-medium">{item.title}</h3>
                <p className="text-lead text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
