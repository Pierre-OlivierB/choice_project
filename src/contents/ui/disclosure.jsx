import { useId, useRef, useState } from "react";

// Same duration as the unfolding in screens.css.
const UNFOLD_DURATION_MS = 550;

// The page follows the panel frame by frame while it grows, so unfolding and
// scrolling read as one motion instead of two jolts.
function keepInView(element) {
  const scroller = element.closest(".app-main");
  const end = performance.now() + UNFOLD_DURATION_MS;

  function step(time) {
    const overflow =
      element.getBoundingClientRect().bottom - scroller.getBoundingClientRect().bottom;

    if (overflow > 0) {
      scroller.scrollTop += overflow;
    }

    if (time < end) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

// The native details element opens in one frame and cannot be animated in every
// browser, so the panel unfolds through its grid row in CSS instead.
function Disclosure({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();

  function handleToggle() {
    if (!isOpen) {
      keepInView(rootRef.current);
    }

    setIsOpen(!isOpen);
  }

  return (
    <section
      className={`panel disclosure ${isOpen ? "disclosure--open" : ""}`}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="disclosure-summary"
        onClick={handleToggle}
        type="button"
      >
        <span>{title}</span>
        <span className="disclosure-chevron" aria-hidden="true" />
      </button>
      <div className="disclosure-panel" id={panelId}>
        <div className="disclosure-clip">
          <div className="disclosure-body" tabIndex={isOpen ? 0 : -1}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Disclosure;
