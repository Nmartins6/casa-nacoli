import { trackEvent } from "./analytics";

const menu = document.querySelector<HTMLDetailsElement>("[data-mobile-menu]");

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.removeAttribute("open"));
});

document.querySelectorAll<HTMLElement>("[data-analytics-event]").forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.dataset.analyticsEvent;
    if (!name) return;

    trackEvent({ name, context: item.dataset.analyticsContext });
  });
});

const pageView = document.querySelector<HTMLElement>("[data-page-view]");
const pageViewName = pageView?.dataset.pageView;

if (pageView && pageViewName) {
  trackEvent({ name: pageViewName, context: pageView.dataset.pageContext });
}

const revealItems = Array.from(
  document.querySelectorAll<HTMLElement>("[data-reveal]"),
);
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (
  revealItems.length > 0 &&
  !prefersReducedMotion &&
  "IntersectionObserver" in window
) {
  document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]")).forEach(
      (item, index) => {
        item.style.setProperty("--reveal-order", String(Math.min(index, 4)));
      },
    );
  });

  let pendingItems = revealItems.length;
  const reveal = (item: HTMLElement, observer: IntersectionObserver) => {
    if (item.classList.contains("is-revealed")) return;
    item.classList.add("is-revealed");
    observer.unobserve(item);
    pendingItems -= 1;
    if (pendingItems === 0) observer.disconnect();
  };

  try {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement, observer);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));

    document.addEventListener("focusin", (event) => {
      const target = event.target as HTMLElement | null;
      const item = target?.closest<HTMLElement>("[data-reveal]");
      if (item) reveal(item, observer);
    });
    window.addEventListener("pagehide", () => observer.disconnect(), {
      once: true,
    });
  } catch {
    // Sem observador, o HTML mantém seu estado visível original.
  }
}
