import { useState } from "react";
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
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { socialLinks, projectTypes } from "@/lib/data";

export default function ContactPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Header />
      
      <main className="pt-24 lg:pt-32">
        <section
          ref={heroRef}
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

                        <div className="space-y-2">
                          <Label htmlFor="projectType">Project Type</Label>
                          <Select
                            onValueChange={(value) => form.setValue("projectType", value)}
                            defaultValue={form.getValues("projectType")}
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
                          {form.formState.errors.projectType && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.projectType.message}
                            </p>
                          )}
                        </div>

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
    </div>
  );
}
