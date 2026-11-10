import type { Metadata } from "next";
import { Capabilities } from "@/sections/home/capabilities";
import { Contact } from "@/sections/home/contact";
import { Hero } from "@/sections/home/hero";
import { Industries } from "@/sections/home/industries";
import { Process } from "@/sections/home/process";

export const metadata: Metadata = {
  title: { absolute: "Форт-9 — технологии защиты в едином комплексе" },
  description:
    "Выявление, сопровождение и нейтрализация воздушных угроз. Комплексная защита объектов критически важных отраслей.",
};

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Industries />
      <Process />
      <Capabilities />
      <Contact />
    </main>
  );
}
