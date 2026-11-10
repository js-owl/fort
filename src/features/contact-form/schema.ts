import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  company: z.string().trim().min(2, "Укажите компанию").max(160),
  contact: z.string().trim().min(5, "Укажите контакт для связи").max(160),
  task: z.string().trim().min(10, "Опишите задачу").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
