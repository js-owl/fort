"use server";

import { contactWebhookUrl } from "@/lib/env";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
} from "@/features/contact-form/schema";

function readField(formData: FormData, key: keyof ContactInput) {
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
      key === "contact" ||
      key === "task"
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
    contact: readField(formData, "contact"),
    task: readField(formData, "task"),
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
