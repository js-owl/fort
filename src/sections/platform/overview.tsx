import Image from "next/image";
import { platformOverview } from "@/content/platform";
import { Container } from "@/components/ui/container";

export function PlatformOverview() {
  return (
    <section className="bg-black py-page" aria-label="Возможности платформы">
      <Container>
        <div className="relative aspect-[1301/815] w-full">
          <Image
            src={platformOverview.image}
            alt={platformOverview.imageAlt}
            fill
            sizes="(min-width: 1920px) 1720px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
