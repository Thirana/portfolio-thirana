"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Colombo",
});

/** A tiny clock store that ticks every 30 seconds. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

/** The current minute, so the snapshot only changes when the display would. */
function getSnapshot() {
  return Math.floor(Date.now() / 60_000);
}

/** No time on the server: its clock would not match the visitor's render. */
function getServerSnapshot() {
  return null;
}

/** The current time in Colombo, where the site is written. */
export function LocalTime() {
  const minute = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  if (minute === null) return null;

  const now = new Date(minute * 60_000);
  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span aria-hidden className="size-1.5 rounded-full bg-gl-swatch-1" />
      <time dateTime={now.toISOString()}>
        {formatter.format(now).toLowerCase()} in Colombo, Sri Lanka
      </time>
    </span>
  );
}
