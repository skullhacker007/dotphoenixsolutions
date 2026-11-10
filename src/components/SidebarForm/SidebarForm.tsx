"use client";

import { useEffect, useRef, useState } from "react";
import { isValidPhoneNumber, formatToE164 } from "@/lib/phone";
import type { CountryCode } from "libphonenumber-js";
import "./SidebarForm.css";

/* ------------------ constants ------------------ */

const REQUIREMENT_OPTIONS = [
  "All",
  "Services",
  "Solutions",
  "Research",
  "Careers",
];

const SUB_OPTIONS: Record<string, string[]> = {
  Services: [
    "ALL",
    "Web Application Development",
    "Mobile Application Development",
    "SaaS Product Development",
    "AI & Intelligent Automation",
    "Digital Marketing",
    "Payroll & Enterprise Systems",
  ],
  Solutions: [
    "Technology & Product Platforms",
    "Business Process & Legal Solutions",
    "Financial Services & FinTech Systems",
    "Healthcare & Medical Systems",
    "Insurance Platforms",
    "Retail & E-commerce Solutions",
    "Manufacturing & Industrial Systems",
    "Education, Training & Research Platforms",
  ],
  Research: ["Generative AI", "AI Agents", "AI Operating System"],
  Careers: [
    "Web Application Developer",
    "Mobile Application Developer",
    "SaaS Product Engineer",
    "AI Engineer",
    "Digital Marketing Specialist",
  ],
};

type FormStatus = "idle" | "loading" | "success" | "serverError";

type CountryCodeItem = {
  country: string;
  iso: string;
  code: string;
  label: string;
};

interface SidebarFormProps {
  open: boolean;
  onClose: () => void;
}

/* ------------------ security helpers ------------------ */

const sanitizeInput = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/['"`;]/g, "")
    .trim();

const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const isValidPhone = (phone: string) => /^[0-9]{7,13}$/.test(phone);

/* ------------------ component ------------------ */

export default function SidebarForm({ open, onClose }: SidebarFormProps) {
  const [requirement, setRequirement] = useState("All");
  const [status, setStatus] = useState<FormStatus>("idle");

  const [countryCodes, setCountryCodes] = useState<CountryCodeItem[]>([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [selectedIso, setSelectedIso] = useState<string>("IN");

  const [lastSubmit, setLastSubmit] = useState(0);

  const [fieldError, setFieldError] = useState<{
    field: "email" | "phone" | null;
    message: string;
  }>({ field: null, message: "" });

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const clearFieldError = (field: "email" | "phone") => {
    if (fieldError.field === field) {
      setFieldError({ field: null, message: "" });
    }
  };

  /* ------------------ load country codes ------------------ */

  useEffect(() => {
    if (!open || countryCodes.length > 0) return;

    let ignore = false;

    const loadCountries = async () => {
      try {
        setCountryLoading(true);
        const res = await fetch("/api/country");
        if (!res.ok) throw new Error();
        const data: CountryCodeItem[] = await res.json();
        if (ignore) return;
        setCountryCodes(data);
        const india = data.find((c) => c.iso === "IN");
        if (india) {
          setSelectedCountryCode(india.code);
          setSelectedIso(india.iso);
        }
      } catch {
        if (!ignore) {
          setCountryCodes([
            { country: "India", iso: "IN", code: "+91", label: "India (+91)" },
          ]);
        }
      } finally {
        if (!ignore) {
          setCountryLoading(false);
        }
      }
    };

    void loadCountries();

    return () => {
      ignore = true;
    };
  }, [open, countryCodes.length]);

  /* ------------------ submit ------------------ */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmit < 5000) return;
    setLastSubmit(now);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot
    if (formData.get("company")) return;

    const email = sanitizeInput(formData.get("email")?.toString() || "");
    const phone = sanitizeInput(formData.get("phone")?.toString() || "");
    const message = sanitizeInput(formData.get("message")?.toString() || "");

    if (!email || !isValidEmail(email)) {
      setFieldError({ field: "email", message: "Enter a valid email." });
      emailRef.current?.focus();
      return;
    }

    const countryIso = (selectedIso || "IN") as CountryCode;
    const isPhoneValid =
      isValidPhoneNumber(phone, countryIso) || isValidPhone(phone);

    if (!phone || !isPhoneValid) {
      setFieldError({
        field: "phone",
        message: "Enter a valid contact number.",
      });
      phoneRef.current?.focus();
      return;
    }

    const formattedPhone =
      formatToE164(phone, countryIso) || `${selectedCountryCode}${phone}`;

    setFieldError({ field: null, message: "" });
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: formattedPhone,
          requirement,
          subCategory: formData.get("subCategory"),
          message,
          source: "sidebar-form",
        }),
      });

      // ✅ ONLY HTTP STATUS CHECK
      setStatus(res.ok ? "success" : "serverError");
    } catch {
      setStatus("serverError");
    } finally {
      // ✅ Clear form (same as Clear button)
      formRef.current?.reset();
      setRequirement("All");

      // ✅ Hide message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  /* ------------------ render ------------------ */

  return (
    <div className="sidebar">
      {open && <div className="sidebar-overlay" onClick={onClose} />}

      <aside
        className={`sidebar-form ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-form-title"
      >
        <div className="sidebar-header">
          <h2 id="sidebar-form-title">We’re Here to Assist</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
          />

          {/* Email */}
          <label>Email</label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="new-password"
            className={fieldError.field === "email" ? "input-error" : ""}
            onChange={() => clearFieldError("email")}
            disabled={status === "loading"}
          />
          {fieldError.field === "email" && (
            <p className="field-error">{fieldError.message}</p>
          )}

          {/* Phone */}
          <label>Contact Number</label>
          <div className="phone-group">
            <select
              value={`${selectedIso}-${selectedCountryCode}`}
              onChange={(e) => {
                const parts = e.target.value.split("-");
                if (parts.length >= 2) {
                  setSelectedIso(parts[0]);
                  setSelectedCountryCode(parts[1]);
                }
              }}
              disabled={countryLoading || status === "loading"}
            >
              {countryCodes.map((c) => (
                <option key={`${c.iso}-${c.code}`} value={`${c.iso}-${c.code}`}>
                  {c.label}
                </option>
              ))}
            </select>

            <input
              ref={phoneRef}
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={13}
              autoComplete="new-password"
              className={fieldError.field === "phone" ? "input-error" : ""}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 13);
                clearFieldError("phone");
              }}
              disabled={status === "loading"}
            />
          </div>
          {fieldError.field === "phone" && (
            <p className="field-error">{fieldError.message}</p>
          )}

          {/* Requirement */}
          <label>Requirement Type</label>
          <select
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            disabled={status === "loading"}
          >
            {REQUIREMENT_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          {SUB_OPTIONS[requirement] && (
            <>
              <label>Sub Category</label>
              <select name="subCategory" disabled={status === "loading"}>
                {SUB_OPTIONS[requirement].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </>
          )}

          {/* Message */}
          <label>Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="How can we assist you?"
            disabled={status === "loading"}
          />

          {/* Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>

            <button
              type="reset"
              className="clear-btn"
              disabled={status === "loading"}
              onClick={() => setRequirement("All")}
            >
              Clear
            </button>
          </div>

          {status === "success" && (
            <p className="form-success">Our team will contact you shortly. </p>
          )}

          {status === "serverError" && (
            <p className="form-error">Submission failed. Please try again.</p>
          )}
        </form>
      </aside>
    </div>
  );
}
