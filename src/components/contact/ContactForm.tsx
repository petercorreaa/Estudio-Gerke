"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import type { Dictionary } from "@/content";
import type { Locale } from "@/i18n/routing";

type FormCopy = Dictionary["ui"]["form"];
type ValidationCopy = Dictionary["ui"]["validation"];

type FieldName = "name" | "company" | "email" | "phone" | "areaId" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

/** Visual top-to-bottom order, used to focus the first invalid field on submit. */
const FIELD_ORDER: readonly (keyof Errors)[] = ["name", "email", "phone", "message"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s0-9]{6,20}$/;

function validate(values: Values, v: ValidationCopy): Errors {
  const errors: Errors = {};

  const name = values.name.trim();
  if (!name) errors.name = v.required;
  else if (name.length < 3) errors.name = v.nameTooShort;

  const email = values.email.trim();
  if (!email) errors.email = v.required;
  else if (!EMAIL_RE.test(email)) errors.email = v.emailInvalid;

  const phone = values.phone.trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = v.phoneInvalid;

  const message = values.message.trim();
  if (!message) errors.message = v.required;
  else if (message.length < 20) errors.message = v.messageTooShort;
  else if (message.length > 2000) errors.message = v.messageTooLong;

  return errors;
}

const fieldBase =
  "min-h-[48px] w-full rounded-md border bg-paper px-4 py-2.5 text-base text-ink transition-colors duration-200 ease-out placeholder:text-ink/70 focus:border-2 focus:border-brand-700";

function fieldClass(hasError: boolean, extra?: string) {
  return [fieldBase, hasError ? "border-error" : "border-neutral-500", extra]
    .filter(Boolean)
    .join(" ");
}

export function ContactForm({
  locale,
  practiceAreas,
  initialAreaId,
  form,
  validation,
  ariaLabel,
}: {
  locale: Locale;
  practiceAreas: readonly { id: string; name: string }[];
  initialAreaId: string;
  form: FormCopy;
  validation: ValidationCopy;
  ariaLabel: string;
}) {
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    phone: "",
    areaId: initialAreaId,
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends FieldName>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, validation);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field so its label and error are
      // announced immediately, without this, a screen-reader user gets no
      // feedback at all that the submission failed, since nothing else here
      // is a live region.
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          email: values.email,
          phone: values.phone,
          areaId: values.areaId,
          message: values.message,
          locale,
          honeypot,
          startedAt,
        }),
      });
      const data: { ok: boolean } = await response.json();

      if (response.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-brand-600 bg-paper-alt p-6">
        <p className="u-display u-h3">{form.successTitle}</p>
        <p className="u-body mt-3">{form.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={ariaLabel} className="flex flex-col gap-6">
      {status === "error" ? (
        <div role="status" className="rounded-md border border-error bg-paper-alt p-4">
          <p className="font-medium text-error">{form.errorTitle}</p>
          <p className="mt-1 text-sm text-ink">{form.errorBody}</p>
        </div>
      ) : null}

      {/* Honeypot, invisible and unreachable by keyboard/AT, real users never fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          type="text"
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
          {form.name} <span className="font-normal text-ink/70">({form.requiredMark})</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-2 text-sm text-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-2 block text-sm font-medium text-ink">
          {form.organization} <span className="font-normal text-ink/70">{form.optional}</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
          {form.email} <span className="font-normal text-ink/70">({form.requiredMark})</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-2 text-sm text-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-ink">
          {form.phone} <span className="font-normal text-ink/70">{form.optional}</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={fieldClass(Boolean(errors.phone))}
        />
        {errors.phone ? (
          <p id="contact-phone-error" className="mt-2 text-sm text-error">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-area" className="mb-2 block text-sm font-medium text-ink">
          {form.practiceArea} <span className="font-normal text-ink/70">{form.optional}</span>
        </label>
        <select
          id="contact-area"
          name="areaId"
          value={values.areaId}
          onChange={(e) => update("areaId", e.target.value)}
          className={fieldClass(false)}
        >
          <option value="">{form.practiceAreaPlaceholder}</option>
          {practiceAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
          {form.message} <span className="font-normal text-ink/70">({form.requiredMark})</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={fieldClass(Boolean(errors.message), "min-h-[140px] resize-y")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 text-sm text-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? form.submitting : form.submit}
      </Button>

      <p className="text-xs text-ink/70">{form.disclaimer}</p>
    </form>
  );
}

export default ContactForm;
