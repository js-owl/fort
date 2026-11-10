"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { submitContact } from "@/features/contact-form/actions";
import { initialContactState } from "@/features/contact-form/schema";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <p role="status" className="text-h3 font-medium">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field
        label="Имя"
        name="name"
        autoComplete="name"
        required
        error={errors?.name}
      />
      <Field
        label="Компания"
        name="company"
        autoComplete="organization"
        required
        error={errors?.company}
      />
      <Field
        label="Контакт для связи"
        name="contact"
        type="text"
        autoComplete="tel"
        required
        error={errors?.contact}
      />
      <Field
        label="Задача"
        name="task"
        multiline
        required
        error={errors?.task}
      />
      {state.status === "error" && state.message ? (
        <p role="alert" className="text-base text-brand">
          {state.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="w-full"
        aria-describedby="contact-status"
      >
        {pending ? "Отправляем…" : "Отправить запрос"}
      </Button>
      <p id="contact-status" className="sr-only" aria-live="polite">
        {pending ? "Отправляем заявку" : ""}
      </p>
    </form>
  );
}
