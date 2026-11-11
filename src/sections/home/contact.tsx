import Image from "next/image";
import { contactDetails } from "@/content/home";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/features/contact-form/contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-6 bg-panel py-page">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex w-full max-w-[800px] flex-col gap-10 lg:max-w-[700px] lg:gap-[60px]">
          <h2 className="text-h1 font-medium uppercase">
            Получите консультацию
          </h2>
          <p className="max-w-[640px] text-[clamp(1.25rem,1rem+0.7vw,2rem)] leading-[1.4] lg:max-w-none">
            Поможем подобрать подходящее решение и ответим на вопросы. Оставьте
            заявку - мы свяжемся с вами
          </p>
          <Image
            src="/images/home/divider.svg"
            alt=""
            width={700}
            height={1}
            className="h-px w-full max-w-[700px]"
          />
          <div className="flex flex-col text-lead">
            <a href={`mailto:${contactDetails.email}`} className="underline">
              {contactDetails.email}
            </a>
            <p>{contactDetails.phone}</p>
          </div>
        </div>
        <div className="w-full max-w-[700px]">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
