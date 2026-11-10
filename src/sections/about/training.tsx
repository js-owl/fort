import Image from "next/image";
import { aboutTraining } from "@/content/about";

export function AboutTraining() {
  return (
    <section className="relative flex min-h-[640px] items-start overflow-hidden lg:h-[800px]">
      <Image
        src={aboutTraining.image}
        alt=""
        fill
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/75 to-transparent lg:hidden" />
      <div className="relative z-10 flex flex-col gap-8 px-page py-16 lg:gap-10 lg:p-page">
        <h2 className="max-w-[900px] text-h2 font-medium whitespace-pre-line uppercase">
          {aboutTraining.title}
        </h2>
        <p className="max-w-[600px] text-lead text-muted">{aboutTraining.text}</p>
      </div>
    </section>
  );
}
