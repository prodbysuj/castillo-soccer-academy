"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "../app/components/lib/site";
import styles from "./RestaurantChatWidget.module.css";

const RESTAURANT = {
  name: site.name,
  logo: site.logo,
  phone: site.phoneLabel,
  phoneHref: site.phoneHref,
  address: site.address,
  mapsUrl: site.mapsUrl,
  hours: {
    "Sun–Thu": site.hours[0].time,
    "Fri–Sat": site.hours[1].time,
  },
};

const STARTER_CHIPS = [
  "View hours",
  "Ask about menu",
  "Reservations",
  "Delivery info",
];

const CHAT_URL = "/api/curry-up/chat";
const HEALTH_URL = "/api/curry-up/health";

function createMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
    timestamp: Date.now(),
  };
}

function renderInline(text) {
  const chunks = text.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*)/g);

  return chunks.map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={index} className={styles.strong}>
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    if (chunk.startsWith("*") && chunk.endsWith("*")) {
      return <em key={index}>{chunk.slice(1, -1)}</em>;
    }

    return chunk;
  });
}

function parseDish(line) {
  const patterns = [
    /^[-•]\s+\*\*(.+?)\*\*:\s*(.*)$/,
    /^[-•]\s+\*?(.+?):\*\s+(.+)$/,
    /^\*\*(.+?)\*\*:\s*(.+)$/,
    /^\*(.+?):\*\s+(.+)$/,
    /^(.+?):\*\s+(.+)$/,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      return {
        name: match[1].replace(/\*+$/g, "").trim(),
        detail: match[2].trim(),
      };
    }
  }

  if (/^[-•]\s+/.test(line)) {
    return { name: "", detail: line.replace(/^[-•]\s+/, "") };
  }

  return null;
}

function parseSectionHeading(line) {
  const markdown = line.match(/^#{1,6}\s+(.+)$/);
  if (markdown) {
    return markdown[1].replace(/:$/, "").trim();
  }

  if (!/:$/.test(line) || /:\s+\S/.test(line)) return null;

  const title = line.replace(/:$/, "").trim();
  if (!title || title.length > 56) return null;

  const words = title.split(/\s+/).length;
  if (
    words <= 6 ||
    /^(regarding|important|note|allergy|please note)/i.test(title)
  ) {
    return title;
  }

  return null;
}

function calloutKind(title) {
  if (/allerg/i.test(title)) return "warning";
  if (/nut|note|cannot|cross-contact|not documented/i.test(title)) {
    return "note";
  }
  return null;
}

function parseBlocks(text) {
  const blocks = [];
  let items = [];
  let callout = null;

  function flushList() {
    if (items.length === 0) return;
    blocks.push({ type: "list", items });
    items = [];
  }

  function flushCallout() {
    if (!callout) return;
    blocks.push(callout);
    callout = null;
  }

  for (const raw of text.split(/\n/)) {
    const line = raw.trim();

    if (!line) {
      flushList();
      continue;
    }

    const heading = parseSectionHeading(line);
    if (heading) {
      flushList();
      flushCallout();
      const kind = calloutKind(heading);
      if (kind) {
        callout = { type: "callout", kind, title: heading, text: "" };
      } else {
        blocks.push({ type: "heading", text: heading });
      }
      continue;
    }

    const dish = parseDish(line);
    if (dish) {
      flushCallout();
      items.push(dish);
      continue;
    }

    const aside = line.match(/^\*(\(.*(?:Note|Warning):[\s\S]*\))\*$/i);
    if (aside) {
      flushList();
      flushCallout();
      blocks.push({ type: "callout", kind: "note", title: "", text: aside[1] });
      continue;
    }

    flushList();

    if (callout) {
      callout.text = callout.text ? `${callout.text} ${line}` : line;
      continue;
    }

    blocks.push({ type: "p", text: line });
  }

  flushList();
  flushCallout();
  return blocks;
}

function MessageContent({ text, role }) {
  if (role === "user") {
    return text;
  }

  const blocks = parseBlocks(text);

  return (
    <div className={styles.prose}>
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={index} className={styles.dishes}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.dish}>
                  {item.name ? (
                    <span className={styles.dishHead}>
                      <strong className={styles.dishName}>{item.name}</strong>
                      {/vegan/i.test(item.name) ? (
                        <span className={styles.badgeVegan}>Vegan</span>
                      ) : null}
                    </span>
                  ) : null}
                  <p className={styles.dishBody}>{renderInline(item.detail)}</p>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "heading") {
          return (
            <p key={index} className={styles.heading}>
              {renderInline(block.text)}
            </p>
          );
        }

        if (block.type === "callout") {
          return (
            <aside
              key={index}
              className={
                block.kind === "warning" ? styles.warning : styles.note
              }
            >
              {block.title ? (
                <strong className={styles.calloutTitle}>{block.title}</strong>
              ) : null}
              {block.text ? (
                <p className={styles.calloutBody}>{renderInline(block.text)}</p>
              ) : null}
            </aside>
          );
        }

        return (
          <p key={index} className={styles.lead}>
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function detectIntent(raw) {
  const text = raw.toLowerCase();

  if (/\b(hour|open|close|tonight|today)\b/.test(text)) return "hours";
  if (/\b(vegetarian|veggie)\b/.test(text)) return "vegetarian";
  if (/\bvegan\b/.test(text)) return "vegan";
  if (/\b(gluten[-\s]?free|gf crust)\b/.test(text)) return "glutenFree";
  if (/\b(menu|pizza|special|topping)\b/.test(text)) return "menu";
  if (/\b(reserv|book|table|dinner)\b/.test(text)) return "reservations";
  if (/\b(deliver|drop off)\b/.test(text)) return "delivery";
  if (/\b(pickup|pick up|takeout|take out)\b/.test(text)) return "pickup";
  if (/\b(cater|event|party|office)\b/.test(text)) return "catering";
  if (/\b(address|location|where|yorba|directions?)\b/.test(text)) {
    return "location";
  }
  if (/\b(phone|call|number|contact)\b/.test(text)) return "phone";
  return "fallback";
}

function replyForIntent(intent) {
  const replies = {
    hours: {
      text: `We’re open Sunday–Thursday ${RESTAURANT.hours["Sun–Thu"]} and Friday–Saturday ${RESTAURANT.hours["Fri–Sat"]}. Holiday hours may differ.`,
      suggestions: ["Ask about menu", "Get directions"],
    },
    menu: {
      text: "Indian pizzas, classics, Jain and vegan options, a Halal menu, wings, pasta, and starters. Ask about a dish or open the menu page.",
      suggestions: ["Vegetarian options", "Vegan options", "Halal menu"],
    },
    vegetarian: {
      text: "Vegetarian pies include Butter Paneer, Curry Paneer, Jain Paneer, Indian Veggie, and more. Call us if you need help choosing.",
      suggestions: ["Vegan options", "Ask about menu"],
    },
    vegan: {
      text: "Vegan pizzas are on a 12\" gluten-free crust for $25.99. Ask about Classic Veggie Vegan, Indian Veggie Vegan, or vegan wings.",
      suggestions: ["Call restaurant", "Vegetarian options"],
    },
    glutenFree: {
      text: "A 12\" gluten-free crust is listed, including cauliflower crust. Vegan pizzas use that 12\" gluten-free crust.",
      suggestions: ["Vegan options", "View hours"],
    },
    reservations: {
      text: `Call ${RESTAURANT.phone} to ask about a table.`,
      suggestions: ["Call restaurant", "View hours"],
    },
    delivery: {
      text: `Call ${RESTAURANT.phone} to ask whether delivery is available for your address.`,
      suggestions: ["Pickup", "View hours"],
    },
    pickup: {
      text: `Pickup is at ${RESTAURANT.address}. Call ${RESTAURANT.phone} to place an order.`,
      suggestions: ["Get directions", "View hours"],
    },
    catering: {
      text: `Call ${RESTAURANT.phone} about a group or catering order.`,
      suggestions: ["Call restaurant", "Ask about menu"],
    },
    location: {
      text: `Find us at ${RESTAURANT.address}.`,
      suggestions: ["Get directions", "View hours"],
    },
    phone: {
      text: `Give us a ring at ${RESTAURANT.phone}. Someone at the counter will pick up.`,
      suggestions: ["Call restaurant", "Reservations"],
    },
    fallback: {
      text: `I’m not sure on that one. Try hours, the menu, delivery, or reservations — or call us at ${RESTAURANT.phone}.`,
      suggestions: STARTER_CHIPS,
    },
  };

  return replies[intent] ?? replies.fallback;
}

/*
 * Curry Up Pizza Assistant — live API
 * Spec: https://curryuppizzaai.onrender.com/openapi.json
 * Docs: https://curryuppizzaai.onrender.com/docs
 *
 * The browser cannot call Render directly (CORS blocks localhost).
 * These helpers go through same-origin Next routes that proxy:
 *   GET    /api/curry-up/health   → GET  /health
 *   POST   /api/curry-up/chat     → POST /chat
 *   DELETE /api/curry-up/session  → clear httpOnly cup_session cookie
 *
 * session_id is a conversation bucket, not an auth token. The Route
 * Handler owns it in an httpOnly cookie (not the URL, not page JS).
 * First message omits the id; the API’s returned id is stored and
 * reused. New chat deletes the cookie.
 *
 * ChatRequest:   { message, session_id? }
 * ChatResponse:  { session_id, response, request_id, latency_ms }
 * ErrorResponse: { error, request_id? }
 */
async function checkAssistantHealth() {
  const response = await fetch(HEALTH_URL, { cache: "no-store" });
  const data = await response.json().catch(() => null);

  if (!response.ok || data?.status !== "ok") {
    throw new Error(
      data?.error || "Cannot connect to the Curry Up Pizza assistant."
    );
  }

  return data;
}

async function requestBotReply(message) {
  const response = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error || "Cannot connect to the Curry Up Pizza assistant."
    );
  }

  if (!data?.response) {
    throw new Error("The assistant sent an empty reply.");
  }

  return {
    text: data.response,
    suggestions: replyForIntent(detectIntent(message)).suggestions,
  };
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.75A2.75 2.75 0 0 1 7.75 4h8.5A2.75 2.75 0 0 1 19 6.75v6.5A2.75 2.75 0 0 1 16.25 16H12l-4.2 2.8A.7.7 0 0 1 6.7 18V16H7.75A2.75 2.75 0 0 1 5 13.25v-6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7l10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5H5v4M15 5h4v4M5 15v4h4M19 15v4h-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5v4H5M15 5v4h4M5 15h4v4M19 15h-4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RestaurantChatWidget() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState(STARTER_CHIPS);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const [unread, setUnread] = useState(1);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [healthReady, setHealthReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const panelRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const sendingRef = useRef(false);

  function scrollToBottom() {
    const node = listRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }

  useEffect(() => {
    let cancelled = false;

    checkAssistantHealth()
      .then(() => {
        if (!cancelled) {
          setOnline(true);
          setError("");
        }
      })
      .catch((caught) => {
        if (cancelled) return;
        setOnline(false);
        setError(
          caught instanceof Error
            ? caught.message
            : "Cannot connect to the Curry Up Pizza assistant."
        );
      })
      .finally(() => {
        if (!cancelled) setHealthReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open || !healthReady) return undefined;

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();

      if (hasWelcomed) return;

      setHasWelcomed(true);
      setMessages([
        createMessage(
          "bot",
          online
            ? "Hey — welcome to Curry Up Pizza. Hours, menu, a table, or delivery: I’ve got you."
            : "I can’t reach the Curry Up Pizza assistant right now. Try again in a moment, or call the restaurant."
        ),
      ]);
      setChips(STARTER_CHIPS);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, hasWelcomed, online, healthReady]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, open]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.localStorage.getItem("cup-chat-expanded") === "1") {
        setExpanded(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const mobile = window.matchMedia("(max-width: 767px)");

    function lockBody() {
      document.body.style.overflow = mobile.matches ? "hidden" : "";
    }

    lockBody();
    mobile.addEventListener("change", lockBody);
    return () => {
      mobile.removeEventListener("change", lockBody);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'button:not([disabled]), [href], textarea, input:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function toggleExpanded() {
    setExpanded((current) => {
      const next = !current;
      window.localStorage.setItem("cup-chat-expanded", next ? "1" : "0");
      return next;
    });
  }

  function closePanel() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || sendingRef.current) return;

    sendingRef.current = true;
    setError("");
    setInput("");
    setChips([]);
    setMessages((current) => [...current, createMessage("user", text)]);
    setTyping(true);

    try {
      const reply = await requestBotReply(text);
      setOnline(true);

      setMessages((current) => [
        ...current,
        createMessage("bot", reply.text),
      ]);
      setChips(reply.suggestions ?? []);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "We couldn’t send that. Try again in a moment.";
      setError(message);
      setOnline(false);
      setChips(["Try again", "Call restaurant"]);
    } finally {
      setTyping(false);
      sendingRef.current = false;
      inputRef.current?.focus();
    }
  }

  function handleChip(label) {
    if (label === "Call restaurant") {
      window.location.href = RESTAURANT.phoneHref;
      return;
    }
    if (label === "Get directions") {
      window.open(RESTAURANT.mapsUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (label === "Try again" && error) {
      const lastUser = [...messages].reverse().find((item) => item.role === "user");
      if (lastUser) sendMessage(lastUser.text);
      return;
    }
    sendMessage(label);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className={`${styles.root} ${open && expanded ? styles.expanded : ""}`}>
      {open && expanded ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Dock chat to the corner"
          onClick={() => {
            setExpanded(false);
            window.localStorage.setItem("cup-chat-expanded", "0");
          }}
        />
      ) : null}
      {open && (
        <section
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onWheel={(event) => {
            if (event.target.closest("textarea")) return;
            const thread = listRef.current;
            if (!thread || thread.contains(event.target)) return;
            thread.scrollTop += event.deltaY;
          }}
        >
          <header className={styles.header}>
            <h2 id={titleId} className={styles.srOnly}>
              {RESTAURANT.name}
            </h2>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.layoutToggle}`}
              onClick={toggleExpanded}
              aria-label={
                expanded ? "Dock chat to the corner" : "Open chat larger in the center"
              }
            >
              {expanded ? <CollapseIcon /> : <ExpandIcon />}
            </button>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.mobileClose}`}
              onClick={closePanel}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </header>

          <div
            ref={listRef}
            className={styles.thread}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.length === 0 && !typing && (
              <div className={styles.empty}>
                <img
                  className={styles.emptyMark}
                  src={RESTAURANT.logo}
                  alt=""
                  width={56}
                  height={56}
                />
                <p>Ask about the menu, hours, or an order.</p>
              </div>
            )}

            {messages.map((message) => (
              <article
                key={message.id}
                className={`${styles.row} ${
                  message.role === "user" ? styles.rowUser : styles.rowBot
                }`}
              >
                {message.role === "bot" ? (
                  <img
                    className={styles.avatar}
                    src={RESTAURANT.logo}
                    alt=""
                    width={28}
                    height={28}
                  />
                ) : null}
                <div className={styles.stack}>
                  <div
                    className={`${styles.bubble} ${
                      message.role === "user" ? styles.bubbleUser : styles.bubbleBot
                    }`}
                  >
                    <MessageContent text={message.text} role={message.role} />
                  </div>
                  <time
                    className={styles.time}
                    dateTime={new Date(message.timestamp).toISOString()}
                  >
                    {formatTime(message.timestamp)}
                  </time>
                </div>
              </article>
            ))}

            {typing && (
              <div className={`${styles.row} ${styles.rowBot}`} aria-label="Assistant is typing">
                <img
                  className={styles.avatar}
                  src={RESTAURANT.logo}
                  alt=""
                  width={28}
                  height={28}
                />
                <div className={styles.stack}>
                  <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typing}`}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.dock}>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            {chips.length > 0 && !typing && (
              <div className={styles.chips} aria-label="Suggested questions">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={styles.chip}
                    onClick={() => handleChip(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <form className={styles.composer} onSubmit={handleSubmit}>
            <label className={styles.srOnly} htmlFor={`${titleId}-input`}>
              Message Curry Up Pizza
            </label>
            <textarea
              id={`${titleId}-input`}
              ref={inputRef}
              className={styles.input}
              rows={1}
              value={input}
              placeholder="Ask about hours, the menu…"
              enterKeyHint="send"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={!input.trim() || typing}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
            </form>
          </div>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-label={open ? "Close Curry Up Pizza chat" : "Open Curry Up Pizza chat"}
        onClick={() => {
          if (open) {
            closePanel();
            return;
          }
          setUnread(0);
          setOpen(true);
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && unread > 0 && (
          <span className={styles.badge} aria-label={`${unread} unread message`}>
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

export default RestaurantChatWidget;
