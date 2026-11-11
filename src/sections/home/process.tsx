import Image from "next/image";
import { processSteps } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-6">
      <Image
        src="/images/home/process-bg.webp"
        alt=""
        fill
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-linear-to-b from-dark from-[6%] to-transparent to-[55%]" />
      <Container className="relative flex flex-col gap-10 py-page lg:gap-[60px]">
        <SectionHeading
          title={"От обследования объекта\nдо внедрения защиты"}
          description={
            "Мы обеспечиваем полный цикл\nвнедрения на вашем объекте"
          }
        />
        <ol className="flex max-w-[880px] flex-col gap-5">
          {processSteps.map((step) => (
            <li key={step.number} className="flex items-stretch">
              <div
                className="flex w-16 shrink-0 items-center justify-center text-h3 font-medium sm:w-20"
                style={{ backgroundColor: step.tone }}
              >
                {step.number}
              </div>
              <div className="flex flex-1 flex-col gap-2.5 bg-[rgb(44_45_48/50%)] px-6 py-5 sm:px-10">
                <h3 className="text-h3 font-medium">{step.title}</h3>
                <p className="text-lead text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
