"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { submitContact } from "@/features/contact-form/actions";
import { initialContactState } from "@/features/contact-form/schema";

function Consent({
  name,
  label,
  required,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
}) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div>
      <label className="flex items-start gap-5">
        <span className="relative mt-0.5 grid size-6 shrink-0">
          <input
            type="checkbox"
            name={name}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className="peer size-6 appearance-none border border-muted bg-[rgb(101_101_101/65%)] checked:bg-brand"
          />
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden size-6 text-white peer-checked:block"
          >
            <path
              d="M6 12.5 10 16.5 18 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
        <span className="text-xl leading-[1.2] text-muted">{label}</span>
      </label>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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
      <div className="flex flex-col gap-2.5">
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
          label="Телефон"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          error={errors?.phone}
        />
        <Field
          label="Электронная почта"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors?.email}
        />
        <Field
          label="Опишите задачу"
          name="task"
          required
          error={errors?.task}
        />
      </div>
      <Consent
        name="consentPersonal"
        label="Я согласен на обработку моих персональных данных"
        required
        error={errors?.consentPersonal}
      />
      <Consent
        name="consentMarketing"
        label="Я согласен на получение информационных и рекламных материалов"
        error={errors?.consentMarketing}
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
