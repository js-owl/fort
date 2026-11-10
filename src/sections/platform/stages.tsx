import Image from "next/image";
import { platformStages } from "@/content/platform";
import { Container } from "@/components/ui/container";

export function PlatformStages() {
  return (
    <section className="bg-dark py-page">
      <Container className="flex flex-col gap-10">
        <h2 className="text-h2 font-medium uppercase">Три этапа защиты</h2>
        <ol className="grid items-stretch gap-5 lg:grid-cols-3">
          {platformStages.map((stage) => (
            <li key={stage.number} className="flex bg-panel p-6 sm:p-10">
              <div className="flex w-full flex-col justify-between gap-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2.5">
                    <p
                      className="text-[1.75rem] leading-[1.2] font-light"
                      style={{ color: stage.tone }}
                    >
                      {stage.number}
                    </p>
                    <h3 className="text-h3 font-medium">{stage.title}</h3>
                  </div>
                  <p className="text-lead text-muted">{stage.text}</p>
                </div>
                <div className="relative h-52 w-full sm:h-64 lg:h-80">
                  <Image
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
