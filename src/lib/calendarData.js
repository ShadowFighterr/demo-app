// src/lib/calendarData.js
const EVENTS_KEY = 'startup_demo_events';

export function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
