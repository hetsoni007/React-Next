import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Download, Check, Archive, Search, Filter, LogOut } from "lucide-react";

interface Submission {
  id: string;
  formType: string;
  fullName?: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service?: string;
  description?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  howHeard?: string;
  postSlug?: string;
  status: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin-auth", password);
      onAuth();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-white dark:text-black" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Enter the admin password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm"
            data-testid="input-admin-password"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            data-testid="button-admin-login"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

function exportCSV(submissions: Submission[]) {
  const headers = ["Date", "Form Type", "Name", "Email", "Phone", "Company", "Country", "Service", "Budget", "Timeline", "Status", "Message"];
  const rows = submissions.map((s) => [
    formatDate(s.createdAt),
    s.formType,
    s.fullName || "",
    s.email,
    s.phone || "",
    s.company || "",
    s.country || "",
    s.service || s.projectType || "",
    s.budget || "",
    s.timeline || "",
    s.status,
    (s.description || "").replace(/,/g, ";").replace(/\n/g, " "),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminSubmissions() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("admin-auth"));
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const qc = useQueryClient();

  const adminPassword = () => sessionStorage.getItem("admin-auth") || "";

  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
    queryKey: ["/api/admin/submissions"],
    enabled: authed,
    queryFn: async () => {
      const res = await fetch("/api/admin/submissions", {
        headers: { "x-admin-password": adminPassword() },
      });
      if (!res.ok) { setAuthed(false); throw new Error("Unauthorized"); }
      return res.json();
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/submissions/${id}/read`, {
        method: "PATCH",
        headers: { "x-admin-password": adminPassword() },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/submissions"] }),
  });

  const archive = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/submissions/${id}/archive`, {
        method: "PATCH",
        headers: { "x-admin-password": adminPassword() },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/submissions"] }),
  });

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  const formTypes = ["all", ...Array.from(new Set(submissions.map((s) => s.formType)))];

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.email.toLowerCase().includes(q) ||
      (s.fullName || "").toLowerCase().includes(q) ||
      (s.company || "").toLowerCase().includes(q) ||
      (s.description || "").toLowerCase().includes(q);
    const matchType = filterType === "all" || s.formType === filterType;
    return matchSearch && matchType;
  });

  const unread = submissions.filter((s) => s.status === "unread").length;
  const thisWeek = submissions.filter((s) => {
    const d = new Date(s.createdAt);
    return d > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }).length;

  return (
    <>
      <SeoHead
        title="Admin — Form Submissions"
        description="Admin dashboard for managing inquiry submissions."
        canonical="/admin/submissions"
        noIndex
      />
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Form Submissions</h1>
              <p className="text-gray-500 text-sm mt-0.5">All inquiry and lead form submissions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => exportCSV(filtered)}
                className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
                data-testid="button-admin-export"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button
                onClick={() => { sessionStorage.removeItem("admin-auth"); setAuthed(false); }}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm"
                data-testid="button-admin-logout"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total", value: submissions.length },
              { label: "This Week", value: thisWeek },
              { label: "Unread", value: unread },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or message..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm"
                data-testid="input-admin-search"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none"
                data-testid="select-admin-filter"
              >
                {formTypes.map((t) => (
                  <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            {isLoading ? (
              <div className="py-16 text-center text-gray-400 text-sm">Loading submissions...</div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No submissions found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-100 dark:border-gray-800">
                    <tr className="text-xs uppercase tracking-widest text-gray-400">
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                      <th className="text-left px-5 py-3 font-medium">Type</th>
                      <th className="text-left px-5 py-3 font-medium">Name</th>
                      <th className="text-left px-5 py-3 font-medium">Email</th>
                      <th className="text-left px-5 py-3 font-medium">Service</th>
                      <th className="text-left px-5 py-3 font-medium">Message</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {filtered.map((s) => (
                      <tr
                        key={s.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${s.status === "unread" ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}
                        data-testid={`row-submission-${s.id}`}
                      >
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap text-xs">{formatDate(s.createdAt)}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">
                            {s.formType}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {s.fullName || "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                          <a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a>
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{s.service || s.projectType || "—"}</td>
                        <td className="px-5 py-4 text-gray-500 max-w-xs">
                          <span className="block truncate text-xs">{s.description || "—"}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
                            s.status === "unread" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                            s.status === "archived" ? "bg-gray-100 dark:bg-gray-800 text-gray-500" :
                            "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {s.status === "unread" && (
                              <button
                                onClick={() => markRead.mutate(s.id)}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors"
                                title="Mark as read"
                                data-testid={`button-markread-${s.id}`}
                              >
                                <Check className="w-3.5 h-3.5" /> Read
                              </button>
                            )}
                            {s.status !== "archived" && (
                              <button
                                onClick={() => archive.mutate(s.id)}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors"
                                title="Archive"
                                data-testid={`button-archive-${s.id}`}
                              >
                                <Archive className="w-3.5 h-3.5" /> Archive
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
