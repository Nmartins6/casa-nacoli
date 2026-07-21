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
