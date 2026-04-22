import { z } from "zod";
import { projectTypes } from "@/lib/data";

export const contactLeadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z
    .string()
    .min(1, "Please select a project type")
    .refine((v) => projectTypes.some((p) => p.value === v), {
      message: "Please select a project type",
    }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const minimalContactLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactLeadFormData = z.infer<typeof contactLeadFormSchema>;
export type MinimalContactLeadFormData = z.infer<typeof minimalContactLeadSchema>;

export const PROJECT_TYPE_EMAIL_LABELS: Record<string, string> =
  Object.fromEntries(projectTypes.map(({ value, label }) => [value, label]));
