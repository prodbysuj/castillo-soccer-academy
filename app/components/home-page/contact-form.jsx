"use client";

import { useRef, useState } from "react";
import { site } from "../lib/site";
import { fill } from "../lib/i18n";
import { useLanguage } from "../language-provider";
import styles from "./contact-form.module.css";

const AGE_VALUES = ["6-8", "9-11", "12-14", "15-18", "unsure"];

const CONTACT_VALUES = [
  { value: "call", labelKey: "call" },
  { value: "text", labelKey: "text" },
  { value: "email", labelKey: "emailOpt" },
];

const EMPTY = {
  parentName: "",
  phone: "",
  email: "",
  playerName: "",
  playerAge: "",
  preferredContact: "call",
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

  if (!values.parentName.trim()) {
    errors.parentName = "nameRequired";
  }

  if (!values.phone.trim()) {
    errors.phone = "phoneRequired";
  } else if (!isPhone(values.phone)) {
    errors.phone = "phoneInvalid";
  }

  if (!values.email.trim()) {
    errors.email = "emailRequired";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "emailInvalid";
  }

  if (!values.playerName.trim()) {
    errors.playerName = "playerRequired";
  }

  if (!values.playerAge) {
    errors.playerAge = "ageRequired";
  }

  return errors;
}

const FIELD_ORDER = [
  "parentName",
  "phone",
  "email",
  "playerName",
  "playerAge",
];

export default function ContactForm({ framed = true }) {
  const { copy } = useLanguage();
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
  const errorText = copy.form.errors;

  if (submitted) {
    return (
      <section
        id="contact"
        className={sectionClass}
        aria-labelledby="contact-title"
      >
        <div className={styles.inner}>
          <div className={styles.success} role="status">
            <p className={styles.eyebrow}>{copy.form.successEyebrow}</p>
            <h2 id="contact-title" className={styles.title}>
              {copy.form.successTitle}
            </h2>
            <p className={styles.lead}>
              {fill(copy.form.successLead, {
                name: site.shortName,
                player: values.playerName.trim() || copy.form.yourPlayer,
                phone: site.phoneLabel,
              })}
            </p>
            <a href={site.phoneHref} className={styles.submit}>
              {fill(copy.form.callCta, { phone: site.phoneLabel })}
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
          <p className={styles.eyebrow}>{copy.form.eyebrow}</p>
          <h2 id="contact-title" className={styles.title}>
            {copy.form.title}
          </h2>
          <p className={styles.lead}>{copy.form.lead}</p>
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
                {copy.form.summaryTitle}
              </p>
              <ul className={styles.summaryList}>
                {errorList.map((name) => (
                  <li key={name}>
                    <a href={`#${name}`}>{errorText[errors[name]]}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.grid}>
            <Field
              id="parentName"
              label={copy.form.parentName}
              autoComplete="name"
              value={values.parentName}
              error={errorText[errors.parentName]}
              onChange={(value) => update("parentName", value)}
              onBlur={() => validateField("parentName")}
            />

            <Field
              id="phone"
              label={copy.form.phone}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              error={errorText[errors.phone]}
              hint={copy.form.phoneHint}
              onChange={(value) => update("phone", value)}
              onBlur={() => validateField("phone")}
            />

            <Field
              id="email"
              className={styles.span}
              label={copy.form.email}
              type="email"
              autoComplete="email"
              value={values.email}
              error={errorText[errors.email]}
              onChange={(value) => update("email", value)}
              onBlur={() => validateField("email")}
            />

            <Field
              id="playerName"
              label={copy.form.playerName}
              autoComplete="off"
              value={values.playerName}
              error={errorText[errors.playerName]}
              onChange={(value) => update("playerName", value)}
              onBlur={() => validateField("playerName")}
            />

            <div className={styles.field}>
              <label htmlFor="playerAge" className={styles.label}>
                {copy.form.playerAge}
              </label>
              <select
                id="playerAge"
                className={`${styles.input} ${errors.playerAge ? styles.invalid : ""}`}
                value={values.playerAge}
                aria-invalid={errors.playerAge ? "true" : undefined}
                aria-describedby={errors.playerAge ? "playerAge-error" : undefined}
                onChange={(event) => update("playerAge", event.target.value)}
                onBlur={() => validateField("playerAge")}
              >
                <option value="">{copy.form.chooseAge}</option>
                {AGE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {copy.form.ages[value]}
                  </option>
                ))}
              </select>
              {errors.playerAge && (
                <p id="playerAge-error" className={styles.error}>
                  {errorText[errors.playerAge]}
                </p>
              )}
            </div>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>{copy.form.preferred}</legend>
            <div className={styles.pills}>
              {CONTACT_VALUES.map((option) => (
                <label key={option.value} className={styles.pill}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value={option.value}
                    checked={values.preferredContact === option.value}
                    onChange={() => update("preferredContact", option.value)}
                  />
                  {copy.form[option.labelKey]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`${styles.field} ${styles.span}`}>
            <label htmlFor="note" className={styles.label}>
              {copy.form.note}{" "}
              <span className={styles.optional}>{copy.form.optional}</span>
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
            <label htmlFor="website">{copy.form.website}</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </div>

          <button type="submit" className={styles.submit}>
            {fill(copy.form.submit, { name: site.shortName })}
          </button>

          <p className={styles.aside}>
            {copy.form.orCall}{" "}
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
