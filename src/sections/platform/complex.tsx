import Image from "next/image";
import { platformComplex } from "@/content/platform";

export function PlatformComplex() {
  return (
    <section
      aria-label="Согласованные элементы"
      className="relative aspect-[1920/879] w-full overflow-hidden"
    >
      <Image
        src={platformComplex.image}
        alt={platformComplex.imageAlt}
        width={1024}
        height={1536}
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="absolute top-[-204.32%] left-0 h-[327.64%] w-full max-w-none"
      />
    </section>
  );
}
