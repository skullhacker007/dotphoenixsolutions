"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import "./header.css";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Research", href: "/research" },
  { label: "Careers", href: "/careers" },
  { label: "Company", href: "/company" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y / 16}rem`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  const handleNavigate = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 120);
  };

  return (
    <header className="site-header" data-menu-open={open ? "true" : "false"}>
      <Container className="header-inner">
        <Link href="/" className="phoenixlogo flex items-center gap-2">
          <Image
            src="/phoenixlogo.svg"
            alt="Dot Phoenix Solutions logo"
            width={44}
            height={44}
            priority
            className="phoenix-logo"
          />
          <span>Dot Phoenix</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          ☰
        </button>
      </Container>

      <div className="mobile-nav-wrap">
        <div className="nav-mobile">
          <div className="mobile-nav-header">
            <span className="mobile-logo">Dot Phoenix</span>
            <button
              className="mobile-close"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          <ul className="mobile-nav-list" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <li key={item.href} className="mobile-nav-item">
                <button
                  className="nav-link-mobile"
                  onClick={() => handleNavigate(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
