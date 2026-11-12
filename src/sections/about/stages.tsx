import Image from "next/image";
import { aboutStages } from "@/content/about";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutStages() {
  return (
    <section className="bg-dark py-page">
      <Container className="flex flex-col gap-16 lg:gap-20">
        <SectionHeading
          title={aboutStages.title}
          description={aboutStages.text}
        />
        <ul className="grid items-stretch gap-5 lg:grid-cols-3">
          {aboutStages.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-8 bg-panel p-6 sm:gap-10 sm:p-10"
            >
              <div className="flex flex-1 flex-col gap-5">
                <h3 className="text-h3 font-medium">{item.title}</h3>
                <p className="text-lead text-muted">{item.text}</p>
              </div>
              <div className="relative aspect-[290/201] w-full">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-contain object-top"
                />
              </div>
              <p className="text-lead text-brand">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
