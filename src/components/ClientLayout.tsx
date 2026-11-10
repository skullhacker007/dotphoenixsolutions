"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import SidebarForm from "@/components/SidebarForm";

declare global {
  interface Window {
    scrollToSection?: (target: string | HTMLElement) => void;
  }
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  /* ---------------- Sidebar events ---------------- */
  useEffect(() => {
    const handleOpen = () => setIsSidebarOpen(true);
    const handleClose = () => setIsSidebarOpen(false);

    window.addEventListener("open-sidebar", handleOpen);
    window.addEventListener("close-sidebar", handleClose);

    return () => {
      window.removeEventListener("open-sidebar", handleOpen);
      window.removeEventListener("close-sidebar", handleClose);
    };
  }, []);

  /* ---------------- Lenis init ---------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    /* Global scrollTo helper */
    window.scrollToSection = (target) => {
      if (!lenisRef.current) return;

      if (typeof target === "string") {
        try {
          const el = document.querySelector(target);
          if (el instanceof HTMLElement) {
            lenisRef.current.scrollTo(el);
          }
        } catch {
          // Ignore invalid selector syntax
        }
      } else if (target instanceof HTMLElement) {
        lenisRef.current.scrollTo(target);
      }
    };

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.scrollToSection;
    };
  }, []);

  /* ---------------- Pause Lenis on sidebar ---------------- */
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isSidebarOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isSidebarOpen]);

  return (
    <>
      <SidebarForm
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Page transition wrapper */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </>
  );
}
