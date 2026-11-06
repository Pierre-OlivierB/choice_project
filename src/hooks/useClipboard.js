import { useCallback, useEffect, useRef, useState } from "react";

const FEEDBACK_DURATION_MS = 2200;

// status is "idle", "copied" or "failed": the clipboard API can be refused, for
// example outside HTTPS, and the player must be told.
export function useClipboard() {
  const [status, setStatus] = useState("idle");
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async (text) => {
    let nextStatus = "copied";

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      nextStatus = "failed";
    }

    setStatus(nextStatus);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => setStatus("idle"),
      FEEDBACK_DURATION_MS
    );
  }, []);

  return { copy, status };
}
