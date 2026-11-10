import Image from "next/image";
import { contactPerson } from "@/content/home";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/features/contact-form/contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-6 bg-panel py-page">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className="flex max-w-[700px] flex-col gap-10">
          <h2 className="text-h1 font-medium whitespace-pre-line uppercase">
            {"обсудим\nнашу задачу"}
          </h2>
          <p className="max-w-[640px] text-[clamp(1.25rem,1rem+0.7vw,2rem)] leading-[1.4]">
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
          <div className="flex flex-col gap-5">
            <p className="text-xl leading-[1.2] font-medium text-white/65">
              {contactPerson.label}
            </p>
            <div className="flex flex-col gap-2.5">
              <p className="text-lead">{contactPerson.name}</p>
              <p className="text-xl leading-[1.2] font-medium text-brand">
                {contactPerson.role}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[700px] lg:justify-self-end">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
