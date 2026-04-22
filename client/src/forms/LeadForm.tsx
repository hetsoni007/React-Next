import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/lib/emailjs";
import { generateLeadHTML } from "@/lib/emailjs-content";
import { projectTypes } from "@/lib/data";
import {
  contactLeadFormSchema,
  minimalContactLeadSchema,
  PROJECT_TYPE_EMAIL_LABELS,
  type ContactLeadFormData,
  type MinimalContactLeadFormData,
} from "@/forms/leadFormSchema";

export interface LeadFormProps {
  onSuccess?: () => void;
  /** Hide project type (e.g. A/B minimal contact variant) */
  minimal?: boolean;
}

const emptyStandard: ContactLeadFormData = {
  name: "",
  email: "",
  projectType: projectTypes[0]?.value ?? "other",
  message: "",
};

const emptyMinimal: MinimalContactLeadFormData = {
  name: "",
  email: "",
  message: "",
};

export function LeadForm({ onSuccess, minimal = false }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactLeadFormData | MinimalContactLeadFormData>({
    resolver: zodResolver(
      minimal ? minimalContactLeadSchema : contactLeadFormSchema,
    ),
    defaultValues: minimal ? emptyMinimal : emptyStandard,
  });

  async function onSubmit(
    data: ContactLeadFormData | MinimalContactLeadFormData,
  ) {
    setIsSubmitting(true);
    try {
      const inquiry = minimal
        ? {}
        : {
            inquiry_label: "Project Type" as const,
            inquiry_value:
              PROJECT_TYPE_EMAIL_LABELS[
                (data as ContactLeadFormData).projectType
              ] ?? (data as ContactLeadFormData).projectType,
          };

      await sendEmail({
        subject: "New Lead from Website",
        htmlContent: generateLeadHTML({
          full_name: data.name,
          email: data.email,
          company: "N/A",
          message: data.message,
          ...inquiry,
        }),
        replyToEmail: data.email,
      });

      setIsSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset(minimal ? emptyMinimal : emptyStandard);
      onSuccess?.();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          data-testid="button-send-another"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      data-testid="form-contact-lead"
    >
      <div className="space-y-2">
        <Label htmlFor="lead-name">Name</Label>
        <Input
          id="lead-name"
          placeholder="Your name"
          {...form.register("name")}
          data-testid="input-name"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-email">Email</Label>
        <Input
          id="lead-email"
          type="email"
          placeholder="your@email.com"
          {...form.register("email")}
          data-testid="input-email"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {!minimal && (
        <div className="space-y-2">
          <Label htmlFor="lead-project-type">Project Type</Label>
          <Select
            value={form.watch("projectType" as keyof ContactLeadFormData) as string}
            onValueChange={(value) =>
              form.setValue(
                "projectType" as keyof ContactLeadFormData,
                value,
                { shouldValidate: true },
              )
            }
          >
            <SelectTrigger id="lead-project-type" data-testid="select-project-type">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {"projectType" in form.formState.errors &&
            form.formState.errors.projectType && (
              <p className="text-sm text-destructive">
                {form.formState.errors.projectType.message}
              </p>
            )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="lead-message">Message</Label>
        <Textarea
          id="lead-message"
          placeholder="Tell me about your project..."
          className="min-h-[150px] resize-none"
          {...form.register("message")}
          data-testid="input-message"
        />
        {form.formState.errors.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        data-testid="button-submit-contact"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
