import type { Metadata } from "next";
import { PlatformCapabilities } from "@/sections/platform/capabilities";
import { PlatformComplex } from "@/sections/platform/complex";
import { PlatformHero } from "@/sections/platform/hero";
import { PlatformOverview } from "@/sections/platform/overview";
import { PlatformStages } from "@/sections/platform/stages";

export const metadata: Metadata = {
  title: "Платформа",
  description:
    "Единое информационное пространство для обнаружения, анализа и координации действий. Все объекты, угрозы и средства в реальном времени — в одной системе.",
};

export default function PlatformPage() {
  return (
    <main id="content" className="bg-black">
      <PlatformHero />
      <PlatformComplex />
      <PlatformStages />
      <PlatformOverview />
      <PlatformCapabilities />
    </main>
  );
}
