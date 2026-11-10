import { describe, expect, it } from "vitest";
import { contactSchema } from "@/features/contact-form/schema";

const valid = {
  name: "Иван",
  company: "Форт",
  contact: "+7 900 000-00-00",
  task: "Нужна защита периметра объекта",
};

describe("contactSchema", () => {
  it("accepts a complete request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = contactSchema.safeParse({
      name: "  Иван  ",
      company: "  Форт  ",
      contact: "  ivan@example.com  ",
      task: "  Нужна защита периметра  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Иван");
      expect(result.data.contact).toBe("ivan@example.com");
    }
  });

  it("rejects empty fields", () => {
    const result = contactSchema.safeParse({
      name: " ",
      company: "",
      contact: "123",
      task: "коротко",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toEqual(
        expect.arrayContaining(["name", "company", "contact", "task"]),
      );
    }
  });
});
