"use client";

import { useRef, useState } from "react";
import { site } from "../lib/site";
import styles from "./contact-form.module.css";

const TOPICS = [
  { value: "question", label: "Menu question" },
  { value: "order", label: "Order / pickup" },
  { value: "group", label: "Group or catering" },
  { value: "other", label: "Something else" },
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  topic: "question",
  note: "",
  website: "",
};

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  return value.replace(/\D/g, "").length >= 10;
}

function fieldErrors(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!isPhone(values.phone)) {
    errors.phone = "Enter a phone number with at least 10 digits.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

const FIELD_ORDER = ["name", "phone", "email"];

export default function ContactForm({ framed = true }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function validateField(name) {
    const next = fieldErrors(values);
    setErrors((current) => {
      const copy = { ...current };
      if (next[name]) copy[name] = next[name];
      else delete copy[name];
      return copy;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (values.website) return;

    const next = fieldErrors(values);
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setShowSummary(false);
    setSubmitted(true);
  }

  const errorList = FIELD_ORDER.filter((name) => errors[name]);
  const sectionClass = `${styles.section} ${framed ? "" : styles.flush}`.trim();

  if (submitted) {
    return (
      <section
        id="contact"
        className={sectionClass}
        aria-labelledby="contact-title"
      >
        <div className={styles.inner}>
          <div className={styles.success} role="status">
            <p className={styles.eyebrow}>Message saved</p>
            <h2 id="contact-title" className={styles.title}>
              Thanks — we’ll take it from here
            </h2>
            <p className={styles.lead}>
              For a faster answer, call {site.name} at {site.phoneLabel}.
            </p>
            <a href={site.phoneHref} className={styles.submit}>
              Call {site.phoneLabel}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={sectionClass} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-title" className={styles.title}>
            Ask Curry Up Pizza
          </h2>
          <p className={styles.lead}>
            Questions about the menu, an order, or a group? Leave a note, or
            call the restaurant.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {showSummary && errorList.length > 0 && (
            <div
              ref={summaryRef}
              className={styles.summary}
              role="alert"
              tabIndex={-1}
              aria-labelledby="contact-error-title"
            >
              <p id="contact-error-title" className={styles.summaryTitle}>
                Please fix the following
              </p>
              <ul className={styles.summaryList}>
                {errorList.map((name) => (
                  <li key={name}>
                    <a href={`#${name}`}>{errors[name]}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.grid}>
            <Field
              id="name"
              label="Name"
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={(value) => update("name", value)}
              onBlur={() => validateField("name")}
            />

            <Field
              id="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              error={errors.phone}
              hint="Include the area code."
              onChange={(value) => update("phone", value)}
              onBlur={() => validateField("phone")}
            />

            <Field
              id="email"
              className={styles.span}
              label="Email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              onChange={(value) => update("email", value)}
              onBlur={() => validateField("email")}
            />
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>What is this about?</legend>
            <div className={styles.pills}>
              {TOPICS.map((option) => (
                <label key={option.value} className={styles.pill}>
                  <input
                    type="radio"
                    name="topic"
                    value={option.value}
                    checked={values.topic === option.value}
                    onChange={() => update("topic", option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`${styles.field} ${styles.span}`}>
            <label htmlFor="note" className={styles.label}>
              Note <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              id="note"
              className={styles.textarea}
              rows={4}
              maxLength={500}
              value={values.note}
              onChange={(event) => update("note", event.target.value)}
            />
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send to {site.shortName}
          </button>

          <p className={styles.aside}>
            Or call{" "}
            <a href={site.phoneHref} className={styles.phone}>
              {site.phoneLabel}
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  inputMode,
  value,
  error,
  hint,
  className = "",
  onChange,
  onBlur,
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
