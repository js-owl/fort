import { z } from "zod";

const webhookSchema = z.string().url();

export function contactWebhookUrl() {
  const raw = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!raw) return undefined;

  const parsed = webhookSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("CONTACT_WEBHOOK_URL is not a valid URL");
  }

  return parsed.data;
}
