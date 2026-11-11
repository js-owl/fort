import type { Metadata } from "next";
import { Capabilities } from "@/sections/home/capabilities";
import { Contact } from "@/sections/home/contact";
import { Hero } from "@/sections/home/hero";
import { Industries } from "@/sections/home/industries";
import { Process } from "@/sections/home/process";

export const metadata: Metadata = {
  title: {
    absolute:
      "Аэромакс защита — комплексные решения для защиты объектов от БПЛА",
  },
  description:
    "Средства обнаружения и противодействия воздушным угрозам в единой цифровой платформе.",
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
