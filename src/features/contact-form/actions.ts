"use server";

import { contactWebhookUrl } from "@/lib/env";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
} from "@/features/contact-form/schema";

const textFields = ["name", "company", "phone", "email", "task"] as const;

function readField(formData: FormData, key: (typeof textFields)[number]) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function fieldErrorsOf(error: {
  issues: { path: PropertyKey[]; message: string }[];
}) {
  const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      key === "name" ||
      key === "company" ||
      key === "phone" ||
      key === "email" ||
      key === "task" ||
      key === "consentPersonal" ||
      key === "consentMarketing"
    ) {
      fieldErrors[key] ??= issue.message;
    }
  }

  return fieldErrors;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: readField(formData, "name"),
    company: readField(formData, "company"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    task: readField(formData, "task"),
    consentPersonal: formData.get("consentPersonal") === "on",
    consentMarketing: formData.get("consentMarketing") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Проверьте поля формы",
      fieldErrors: fieldErrorsOf(parsed.error),
    };
  }

  const webhook = contactWebhookUrl();

  try {
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        return {
          status: "error",
          message: "Не удалось отправить заявку. Попробуйте ещё раз.",
        };
      }
    } else {
      console.info("contact request accepted");
    }
  } catch (error) {
    console.error("contact request failed", error);
    return {
      status: "error",
      message: "Не удалось отправить заявку. Попробуйте ещё раз.",
    };
  }

  return {
    status: "success",
    message: "Заявка отправлена. Мы свяжемся с вами.",
  };
}
