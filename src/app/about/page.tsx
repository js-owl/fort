import type { Metadata } from "next";
import { AboutCycle } from "@/sections/about/cycle";
import { AboutHero } from "@/sections/about/hero";
import { AboutPractice } from "@/sections/about/practice";
import { AboutStages } from "@/sections/about/stages";
import { AboutTraining } from "@/sections/about/training";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Объединяем людей, технологии и опыт для создания устойчивых и безопасных решений. Полный цикл — от анализа и проектирования до внедрения и сопровождения.",
};

export default function AboutPage() {
  return (
    <main id="content" className="bg-dark">
      <AboutHero />
      <AboutCycle />
      <AboutTraining />
      <AboutStages />
      <AboutPractice />
    </main>
  );
}
