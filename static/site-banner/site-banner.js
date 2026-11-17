/* Site banner. Settings: site_banner_* params in the site config; see "Site banner" in README.md.
 * A scheduled message replaces the simple banner while it is active.
 * On Netlify previews and local builds, ?banner-time=<ISO 8601 time> or ?banner=<id> previews the schedule.
 */
(() => {
  "use strict";
  const root = document.querySelector("[data-site-banner]");
  if (!root) return;
  const config = JSON.parse(root.dataset.siteBanner);
  const message = root.querySelector(".site-banner__message");
  const button = root.querySelector(".site-banner__cta");
  const close = root.querySelector(".site-banner__close");
  const schedule = config.schedule || [];
  const simple = config.enabled && config.text ? config : null;
  const host = window.location.hostname;
  const previewHost = /--.+\.netlify\.app$/.test(host) || host === "localhost" || host === "127.0.0.1";
  const query = new URLSearchParams(previewHost ? window.location.search : "");
  const pinned = schedule.find(entry => entry.id && entry.id === query.get("banner"));
  const previewTime = Date.parse(query.get("banner-time") || "");
  const previewing = Boolean(pinned) || !Number.isNaN(previewTime);
  const key = banner => "site-banner:" + (banner.start || "") + ":" + banner.text;
  const dismissed = new Set();
  let active;
  let timer;
  const isDismissed = banner => {
    if (dismissed.has(key(banner))) return true;
    if (previewing) return false;
    try { return localStorage.getItem(key(banner)) === "1"; } catch { return false; }
  };
  const show = banner => {
    const href = banner.href || config.href;
    const label = banner.label || config.label;
    if (href && !label) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = banner.text;
      message.replaceChildren(link);
    } else {
      message.replaceChildren(banner.text);
    }
    button.hidden = !(href && label);
    if (href && label) {
      button.href = href;
      button.textContent = label;
    }
  };
  // Some themes float the header over the page; reserve its height without changing its behavior.
  const header = document.querySelector("header");
  const position = () => {
    root.style.marginBlockStart = "";
    if (root.hidden || !header) return;
    const mode = getComputedStyle(header).position;
    if (mode !== "absolute" && mode !== "fixed") return;
    const bottom = header.getBoundingClientRect().bottom + (mode === "fixed" ? 0 : window.scrollY);
    const top = root.getBoundingClientRect().top + window.scrollY;
    root.style.marginBlockStart = Math.max(0, bottom - top) + "px";
  };
  const render = () => {
    clearTimeout(timer);
    const now = Number.isNaN(previewTime) ? Date.now() : previewTime;
    active = pinned || schedule.find(entry => now >= Date.parse(entry.start) && now < Date.parse(entry.end)) || simple;
    root.hidden = !active || isDismissed(active);
    if (!root.hidden) show(active);
    position();
    if (previewing) return;
    // Recheck at the next start or end, and at least once a minute for clock changes and throttled tabs.
    const next = schedule.flatMap(entry => [Date.parse(entry.start), Date.parse(entry.end)]).filter(time => time > now);
    if (next.length) timer = setTimeout(render, Math.min(60000, Math.min(...next) - now));
  };
  close.addEventListener("click", () => {
    if (!active) return;
    dismissed.add(key(active));
    if (!previewing) {
      try { localStorage.setItem(key(active), "1"); } catch { /* Kept for this page view only. */ }
    }
    render();
  });
  document.addEventListener("visibilitychange", render);
  window.addEventListener("pageshow", render);
  window.addEventListener("focus", render);
  window.addEventListener("storage", render);
  window.addEventListener("resize", position);
  if (header && window.ResizeObserver) new ResizeObserver(position).observe(header);
  render();
})();
