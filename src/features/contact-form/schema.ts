import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  company: z.string().trim().min(2, "Укажите компанию").max(160),
  phone: z.string().trim().min(5, "Укажите телефон").max(40),
  email: z.string().trim().email("Укажите электронную почту").max(160),
  task: z.string().trim().min(10, "Опишите задачу").max(2000),
  consentPersonal: z.literal(true, {
    errorMap: () => ({
      message: "Нужно согласие на обработку персональных данных",
    }),
  }),
  consentMarketing: z.boolean(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
