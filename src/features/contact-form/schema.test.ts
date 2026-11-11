import { describe, expect, it } from "vitest";
import { contactSchema } from "@/features/contact-form/schema";

const valid = {
  name: "Иван",
  company: "Аэромакс",
  phone: "+7 900 000-00-00",
  email: "ivan@example.com",
  task: "Нужна защита периметра объекта",
  consentPersonal: true,
  consentMarketing: false,
};

describe("contactSchema", () => {
  it("accepts a complete request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = contactSchema.safeParse({
      ...valid,
      name: "  Иван  ",
      company: "  Аэромакс  ",
      email: "  ivan@example.com  ",
      task: "  Нужна защита периметра  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Иван");
      expect(result.data.email).toBe("ivan@example.com");
    }
  });

  it("rejects empty fields and missing consent", () => {
    const result = contactSchema.safeParse({
      name: " ",
      company: "",
      phone: "123",
      email: "not-an-email",
      task: "коротко",
      consentPersonal: false,
      consentMarketing: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toEqual(
        expect.arrayContaining([
          "name",
          "company",
          "phone",
          "email",
          "task",
          "consentPersonal",
        ]),
      );
    }
  });
});
