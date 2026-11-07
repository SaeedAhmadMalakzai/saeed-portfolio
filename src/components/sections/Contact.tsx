"use client";

import { useState } from "react";
import { profile, socialLinks } from "@/lib/data";
import { ShelfHead } from "@/components/showcase/ShelfHead";

type Status = "idle" | "sending" | "sent" | "failed";
type FieldErrors = Partial<Record<"firstName" | "lastName" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUDGETS = [
  { value: "< $5k", label: "Less than $5,000" },
  { value: "$5k - $10k", label: "$5,000 to $10,000" },
  { value: "$10k - $25k", label: "$10,000 to $25,000" },
  { value: "$25k - $50k", label: "$25,000 to $50,000" },
  { value: "> $50k", label: "More than $50,000" },
];

const FIELD =
  "w-full border-0 border-b border-[var(--rule)] bg-transparent pb-3 pt-1 text-base text-[var(--ink)] transition-colors focus:border-[var(--ink)] focus:outline-none";

function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!text(formData, "firstName")) errors.firstName = "Please add your first name.";
  if (!text(formData, "lastName")) errors.lastName = "Please add your last name.";
  const email = text(formData, "email");
  if (!email) errors.email = "Please add your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address doesn’t look right.";
  if (!text(formData, "message")) errors.message = "Tell me a little about what you need.";
  return errors;
}

type FieldProps = {
  id: keyof FieldErrors | "company";
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, required = false, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 block">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#b91c1c]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Keep the element before any await; React clears currentTarget after the handler's first tick.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const body = {
      firstName: text(formData, "firstName"),
      lastName: text(formData, "lastName"),
      email: text(formData, "email"),
      company: text(formData, "company"),
      budget: text(formData, "budget"),
      message: text(formData, "message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Contact API answered ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const describedBy = (id: keyof FieldErrors) => (errors[id] ? `${id}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap pb-24">
      <ShelfHead id="contact-title" title="Contact" note="Email · LinkedIn · GitHub" />
      <div className="grid gap-14 pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <p className="max-w-[16ch] text-[clamp(32px,3.6vw,48px)] font-black leading-[0.98] tracking-[-0.04em]">
            Have an app or a site in mind?
          </p>
          <p className="mt-6 max-w-[38ch] text-lg leading-[1.6] text-[var(--ink-2)]">
            Write to me, or use the form. Tell me what you want to build and who it is for.
          </p>
          <p className="mt-8">
            <a href={`mailto:${profile.email}`} className="lnk text-base">
              {profile.email}
            </a>
          </p>
          <ul className="mt-8 flex flex-wrap gap-6">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="lnk">
                  {link.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} noValidate className="grid gap-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <Field id="firstName" label="First name" required error={errors.firstName}>
              <input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                maxLength={200}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={describedBy("firstName")}
                className={FIELD}
              />
            </Field>
            <Field id="lastName" label="Last name" required error={errors.lastName}>
              <input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                maxLength={200}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={describedBy("lastName")}
                className={FIELD}
              />
            </Field>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <Field id="email" label="Email" required error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
                className={FIELD}
              />
            </Field>
            <Field id="company" label="Company (optional)">
              <input id="company" name="company" autoComplete="organization" maxLength={200} className={FIELD} />
            </Field>
          </div>
          <div>
            <label htmlFor="budget" className="label mb-2 block">
              Budget (optional)
            </label>
            <select id="budget" name="budget" defaultValue="" className={`${FIELD} cursor-pointer`}>
              <option value="">Not sure yet</option>
              {BUDGETS.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>
          <Field id="message" label="What do you need?" required error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={5000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
              className={`${FIELD} resize-y`}
            />
          </Field>
          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" disabled={status === "sending"} className="btn cursor-pointer disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {status === "sent" && <span className="text-[var(--live)]">Thank you. Your message is on its way.</span>}
              {status === "failed" && (
                <span className="text-[#b91c1c]">
                  It didn’t send. Please try again, or email {profile.email}.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
