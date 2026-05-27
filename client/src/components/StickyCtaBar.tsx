import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import { ProjectInquiryModal } from "./ProjectInquiryModal";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [location] = useLocation();

  const hiddenPaths = ["/contact", "/estimate", "/admin"];

  useEffect(() => {
    if (dismissed) return;
    if (hiddenPaths.some((p) => location.startsWith(p))) {
      setVisible(false);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, location]);

  if (!visible || dismissed || hiddenPaths.some((p) => location.startsWith(p))) {
    return modalOpen ? <ProjectInquiryModal open={modalOpen} onClose={() => setModalOpen(false)} /> : null;
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-black text-white py-3 px-4 flex items-center justify-between shadow-2xl"
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        <p className="text-sm font-medium hidden sm:block">
          Ready to build your product?
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          data-testid="button-sticky-cta"
        >
          Get a Free Consultation →
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="ml-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss"
          data-testid="button-sticky-dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <ProjectInquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
