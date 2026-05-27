import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, User } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  question: z.string().min(10, "Please write your question (min 10 chars)"),
});

type FormData = z.infer<typeof schema>;

interface Question {
  id: string;
  name: string;
  date: string;
  question: string;
  answer?: string;
  pending?: boolean;
}

interface BlogQuestionFormProps {
  postSlug: string;
}

const STORAGE_KEY = (slug: string) => `blog-questions-${slug}`;
const SUBMITTED_KEY = (slug: string) => `blog-submitted-${slug}`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function BlogQuestionForm({ postSlug }: BlogQuestionFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAll, setShowAll] = useState(false);
  const PAGE_SIZE = 5;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY(postSlug));
      if (stored) setQuestions(JSON.parse(stored));
    } catch {}
  }, [postSlug]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", question: "" },
  });

  const questionText = watch("question", "");

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "blog_question", postSlug }),
      });

      const newQ: Question = {
        id: Date.now().toString(),
        name: data.name.split(" ")[0] + (data.name.split(" ")[1] ? ` ${data.name.split(" ")[1][0]}.` : ""),
        date: new Date().toISOString(),
        question: data.question,
        pending: true,
      };

      const updated = [newQ, ...questions];
      setQuestions(updated);
      try {
        localStorage.setItem(STORAGE_KEY(postSlug), JSON.stringify(updated));
        localStorage.setItem(SUBMITTED_KEY(postSlug), newQ.id);
      } catch {}

      setStatus("success");
      reset();

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_name: "blog_question",
          source_page: window.location.pathname,
        });
      }
    } catch {
      setStatus("error");
    }
  };

  const submittedId = (() => {
    try { return localStorage.getItem(SUBMITTED_KEY(postSlug)); } catch { return null; }
  })();

  const visibleQuestions = showAll ? questions : questions.slice(0, PAGE_SIZE);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Have a question about this topic?</h3>
      <p className="text-gray-500 text-sm mb-6">Ask below — Het Soni personally responds to every question.</p>

      {status === "success" ? (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-400">Your question has been submitted — Het Soni will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                {...register("name")}
                placeholder="Your name *"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm"
                data-testid="input-blog-name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email (not published) *"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm"
                data-testid="input-blog-email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <textarea
              {...register("question")}
              rows={4}
              placeholder="e.g. How much would it cost to add X feature?"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm resize-none"
              data-testid="textarea-blog-question"
            />
            <div className="flex justify-between mt-1">
              {errors.question ? <p className="text-red-500 text-xs">{errors.question.message}</p> : <span />}
              <span className="text-xs text-gray-400">{questionText.length} chars</span>
            </div>
          </div>
          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Please email us at hello@soniconsultancyservices.com</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-60 transition-colors"
            data-testid="button-blog-question-submit"
          >
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Your Question →"}
          </button>
        </form>
      )}

      {/* Q&A Thread */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Questions from readers</h4>
          {visibleQuestions.map((q) => (
            <div key={q.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{q.name}</span>
                <span className="text-xs text-gray-400">{formatDate(q.date)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{q.question}</p>
              {q.pending && q.id === submittedId && (
                <p className="text-xs text-gray-400 mt-2 italic">Your question is awaiting review.</p>
              )}
              {q.answer && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 mb-1">Answered by Het Soni</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
          {questions.length > PAGE_SIZE && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm text-gray-500 hover:text-black dark:hover:text-white underline"
            >
              Load {questions.length - PAGE_SIZE} more questions
            </button>
          )}
        </div>
      )}
    </div>
  );
}
