import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialIcons } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { z } from "zod";
import { Mail, CheckCircle2, Loader2, ArrowRight, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { usePageView, useTrackEvent } from "@/hooks/use-analytics";
import { useABTest, contactFormTest } from "@/hooks/use-ab-test";
import { socialLinks, projectTypes } from "@/lib/data";
import { HireUsBadge } from "@/components/HireUsBadge";

const minimalContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MinimalContactForm = z.infer<typeof minimalContactSchema>;

export default function ContactPage() {
  usePageView("/contact");
  const { trackEvent } = useTrackEvent();
  const { variantId, trackConversion, isLoading: variantLoading } = useABTest(contactFormTest);
  const isMinimalForm = variantLoading || variantId === "minimal";
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const standardForm = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const minimalForm = useForm<MinimalContactForm>({
    resolver: zodResolver(minimalContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const form = isMinimalForm ? minimalForm : standardForm;

  const mutation = useMutation({
    mutationFn: async (data: InsertContact | MinimalContactForm) => {
      const submitData = {
        ...data,
        projectType: "projectType" in data && data.projectType ? data.projectType : "general",
      };
      return apiRequest("POST", "/api/contact", submitData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      standardForm.reset();
      minimalForm.reset();
      trackEvent("form_submit", "/contact", { form: "contact", variant: variantId });
      trackConversion("form_submit");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact | MinimalContactForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <section className="py-12 lg:py-16 px-6 lg:px-8 bg-card border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
              <FileText className="h-6 w-6 text-foreground" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Know what you want to build?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Use our guided Project Planner to share your requirements. 
              It's like a free consultation that helps us understand exactly what you need.
            </p>
            <Link href="/estimate">
              <Button size="lg" data-testid="button-contact-planner-cta">
                Plan Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">
              We'll review and respond within 24 hours
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Not ready to talk yet?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              If you're still figuring things out, that's okay. 
              We help people at the idea stage too.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/services">
                <Button variant="outline" data-testid="button-contact-explore-options">
                  Explore options
                </Button>
              </Link>
              <Link href="/estimate">
                <Button data-testid="button-contact-plan-project">
                  Plan a project
                </Button>
              </Link>
              <Link href="#contact-form">
                <Button variant="ghost" data-testid="button-contact-talk-to-someone">
                  Talk to someone
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={heroRef}
          id="contact-form"
          className="py-16 lg:py-24 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div
                className={`transition-all duration-700 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
                  data-testid="text-contact-page-title"
                >
                  Let's Talk
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Fill out the form 
                  and I'll get back to you within 24 hours.
                </p>

                <div className="mt-12 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-muted-foreground transition-colors break-all"
                      data-testid="link-contact-email"
                    >
                      {socialLinks.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="flex items-center gap-1">
                      <SocialIcons />
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Prefer email?</span>
                    {" "}No problem. Send me a message directly at{" "}
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="underline underline-offset-4"
                    >
                      {socialLinks.email}
                    </a>
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Card className="shadow-xl">
                  <CardContent className="p-8">
                    {isSubmitted ? (
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
                          onClick={() => setIsSubmitted(false)}
                          data-testid="button-send-another"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
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
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
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

                        {!isMinimalForm && (
                          <div className="space-y-2">
                            <Label htmlFor="projectType">Project Type</Label>
                            <Select
                              onValueChange={(value) => standardForm.setValue("projectType", value)}
                              defaultValue={standardForm.getValues("projectType")}
                            >
                              <SelectTrigger data-testid="select-project-type">
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
                            {standardForm.formState.errors.projectType && (
                              <p className="text-sm text-destructive">
                                {standardForm.formState.errors.projectType.message}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
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
                          disabled={mutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {mutation.isPending ? (
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
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <HireUsBadge />
    </div>
  );
}
