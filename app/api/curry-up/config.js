const DEFAULT_BASE = "https://curryuppizzaai.onrender.com";

function trimSlash(value) {
  return value.replace(/\/$/, "");
}

export function getApiBase() {
  return trimSlash(process.env.CURRY_UP_API_BASE || DEFAULT_BASE);
}

export function getChatUrl() {
  return process.env.CURRY_UP_CHAT_URL || `${getApiBase()}/chat`;
}

export function getHealthUrl() {
  return process.env.CURRY_UP_HEALTH_URL || `${getApiBase()}/health`;
}
