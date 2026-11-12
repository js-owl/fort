import Image from "next/image";
import { Container } from "@/components/ui/container";
import {
  configurationCounter,
  configurationDetection,
} from "@/content/configurations";

export function ConfigurationSystems() {
  return (
    <section className="bg-dark py-page">
      <Container className="flex flex-col gap-16 lg:gap-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h2 className="text-h2 font-medium uppercase">
            {configurationDetection.title}
          </h2>
          <p className="text-h3 leading-[1.4] font-normal whitespace-pre-line lg:w-[560px] lg:shrink-0">
            {configurationDetection.text}
          </p>
        </div>
        <ul className="grid gap-5 lg:grid-cols-2">
          {configurationDetection.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col justify-end gap-8 bg-panel p-6 sm:p-10 lg:flex-row lg:items-end lg:gap-10"
            >
              <div className="flex w-full shrink-0 flex-col gap-5 lg:w-[min(400px,52%)]">
                <h3 className="text-h3 font-medium">{item.title}</h3>
                <p className="text-lead text-muted">{item.text}</p>
              </div>
              <div className="relative aspect-square w-full lg:min-w-0 lg:flex-1">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-5">
          <h2 className="text-h2 font-medium uppercase">
            {configurationCounter.title}
          </h2>
          <p className="max-w-[800px] text-h3 leading-[1.4] font-normal">
            {configurationCounter.text}
          </p>
        </div>
        <ul className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {configurationCounter.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-8 bg-panel p-6 sm:p-10 lg:flex-row lg:items-start lg:gap-2.5"
            >
              <div className="flex w-full shrink-0 flex-col gap-5 lg:w-[min(400px,52%)]">
                <h3 className="text-h3 leading-[1.4] font-normal">
                  {item.title}
                </h3>
                <Image
                  src={configurationCounter.accent}
                  alt=""
                  width={109}
                  height={2}
                />
                <p className="text-h3 leading-[1.4] font-normal">{item.text}</p>
              </div>
              <div className="relative aspect-square w-full lg:min-w-0 lg:flex-1">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
