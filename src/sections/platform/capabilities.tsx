import Image from "next/image";
import { platformCapabilities } from "@/content/platform";
import { Container } from "@/components/ui/container";

export function PlatformCapabilities() {
  return (
    <section className="bg-panel py-page">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-xl leading-[1.2] font-medium text-muted uppercase">
            {platformCapabilities.eyebrow}
          </p>
          <h2 className="text-h2 font-medium uppercase">
            {platformCapabilities.title}
          </h2>
        </div>
        <ul className="grid items-stretch gap-5 lg:h-[847px] lg:grid-cols-3">
          {platformCapabilities.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-8 bg-black p-6 sm:gap-10 sm:p-10"
            >
              <div className="flex flex-1 flex-col gap-5">
                <h3 className="text-h3 font-medium whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-lead text-muted">{item.text}</p>
              </div>
              <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-[540px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={349}
                  height={435}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className={
                    item.crop
                      ? "absolute top-[-16.32%] left-0 h-[126.32%] w-full max-w-none"
                      : "absolute inset-0 size-full object-cover"
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
