"use client";

import { useSyncExternalStore } from "react";

const preferenceEvent = "kph-preference-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(preferenceEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(preferenceEvent, callback);
  };
}

export function useLocalPreference(key: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );

  function setValue(next: string) {
    try {
      localStorage.setItem(key, next);
      window.dispatchEvent(new Event(preferenceEvent));
      return true;
    } catch {
      return false;
    }
  }
  return [value, setValue] as const;
}

function subscribeTablet(callback: () => void) {
  const media = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useTablet() {
  return useSyncExternalStore(
    subscribeTablet,
    () =>
      window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches,
    () => false,
  );
}
