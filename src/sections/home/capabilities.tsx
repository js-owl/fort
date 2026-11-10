import { products } from "@/content/home";
import { Container } from "@/components/ui/container";
import { CapabilitiesSlider } from "@/sections/home/capabilities-slider";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-6 overflow-hidden bg-dark py-page"
    >
      <Container>
        <CapabilitiesSlider products={products} />
      </Container>
    </section>
  );
}
