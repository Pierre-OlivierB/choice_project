import { useEffect } from "react";

// Page changes can otherwise leave the player scrolled into the previous screen
// on mobile. Pass every value whose change means "new page".
export function useScrollToTop(...pageKeys) {
  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    // The keys are the dependencies: the list is built by the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, pageKeys);
}
