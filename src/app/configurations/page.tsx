import type { Metadata } from "next";
import { ConfigurationHero } from "@/sections/configurations/hero";
import { ConfigurationMatrix } from "@/sections/configurations/matrix";
import { ConfigurationSystems } from "@/sections/configurations/systems";

export const metadata: Metadata = {
  title: "Конфигурации",
  description:
    "Гибкое сочетание радиолокации, оптики, программной платформы и инженерных решений для эффективной защиты вашего объекта.",
};

export default function ConfigurationsPage() {
  return (
    <main id="content" className="bg-[#26292d]">
      <ConfigurationHero />
      <ConfigurationMatrix />
      <ConfigurationSystems />
    </main>
  );
}
