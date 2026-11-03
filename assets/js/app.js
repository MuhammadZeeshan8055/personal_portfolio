/* ============================================================
   M Zeeshan Portfolio — interactions, routing, motion
   ============================================================ */

const CONFIG = {
  email: "muhammadzeeeshan8055@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-zeeshan-b1906a21a/",
  whatsapp: "https://wa.me/923185340505",
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

/* ---------- Config links ---------- */
function applyConfig() {
  document.querySelectorAll('[data-config="email"]').forEach((el) => {
    el.setAttribute("href", `mailto:${CONFIG.email}`);
    const label = el.querySelector("[data-email-label], strong");
    if (label && el.matches(".channel")) label.textContent = CONFIG.email;
  });
  document.querySelectorAll('[data-config="linkedin"]').forEach((el) => {
    el.setAttribute("href", CONFIG.linkedin);
    const label = el.querySelector("strong");
    if (label && el.matches(".channel")) label.textContent = "linkedin.com/in/muhammad-zeeshan";
  });
  document.querySelectorAll('[data-config="whatsapp"]').forEach((el) => {
    el.setAttribute("href", CONFIG.whatsapp);
  });
}

/* ---------- Loader ---------- */
function initLoader() {
  const loader = document.getElementById("pageLoader");
  const finish = () => {
    loader?.classList.add("is-done");
    document.body.style.overflow = "";
    requestAnimationFrame(runHeroEntrance);
  };

  document.body.style.overflow = "hidden";
  if (reduceMotion) {
    finish();
    return;
  }
  window.setTimeout(finish, 900);
}

/* ---------- Navigation ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const sections = [...document.querySelectorAll("main section[id]")];

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    const progress = document.getElementById("scrollProgress");
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = `${pct}%`;
    }

    if (document.getElementById("homeView").classList.contains("is-active")) {
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) current = section.id;
      }
      links.querySelectorAll("[data-nav]").forEach((a) => {
        const href = a.getAttribute("href") || "";
        a.classList.toggle("is-active", href === `#${current}`);
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Hero motion ---------- */
function splitHeroTitle() {
  const title = document.querySelector("[data-hero-title]");
  if (!title) return;

  const accentWords = new Set(["Digital", "Experiences", "Real", "Problems."]);
  let charIndex = 0;

  title.querySelectorAll("[data-hero-words]").forEach((line) => {
    const text = line.getAttribute("data-hero-words") || "";
    line.textContent = "";
    text.split(" ").forEach((word) => {
      if (!word) return;
      const wordEl = document.createElement("span");
      wordEl.className = "word";
      if (accentWords.has(word)) wordEl.classList.add("is-accent-word");

      [...word].forEach((ch) => {
        const charEl = document.createElement("span");
        charEl.className = "char";
        if (accentWords.has(word)) charEl.classList.add("is-accent");
        charEl.textContent = ch;
        charEl.style.animationDelay = `${0.35 + charIndex * 0.028}s`;
        wordEl.appendChild(charEl);
        charIndex += 1;
      });

      line.appendChild(wordEl);
    });
  });
}

function runHeroEntrance() {
  splitHeroTitle();

  if (reduceMotion) {
    document.querySelectorAll("[data-hero-item], [data-hero-visual], .hero-title .char").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.animation = "none";
    });
    document.querySelector("[data-hero-title]")?.classList.add("is-ready");
    return;
  }

  const title = document.querySelector("[data-hero-title]");
  const items = [...document.querySelectorAll("[data-hero-item]")];
  const visual = document.querySelector("[data-hero-visual]");

  requestAnimationFrame(() => title?.classList.add("is-ready"));

  items.forEach((item, i) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(22px)";
    item.style.transition = `opacity 0.7s ease ${0.55 + i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.08}s`;
    requestAnimationFrame(() => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
  });

  if (visual) {
    visual.style.opacity = "0";
    visual.style.transform = "translateY(36px) scale(0.96)";
    visual.style.transition = "opacity 1s ease 0.25s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s";
    requestAnimationFrame(() => {
      visual.style.opacity = "1";
      visual.style.transform = "none";
    });
  }
}

function initSpotlight() {
  const spot = document.getElementById("heroSpotlight");
  const hero = document.getElementById("home");
  if (!spot || !hero || reduceMotion || isMobile()) return;

  hero.addEventListener("pointermove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spot.style.setProperty("--spot-x", `${x}%`);
    spot.style.setProperty("--spot-y", `${y}%`);
  });
}

/* ---------- Magnetic buttons ---------- */
function initMagnetic() {
  if (reduceMotion || isMobile()) return;
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ---------- Scroll reveals ---------- */
function initReveals() {
  const nodes = document.querySelectorAll("[data-reveal], .clip-reveal");
  if (reduceMotion) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((n) => io.observe(n));
}

/* ---------- Section navigation ---------- */
function initRouter() {
  document.addEventListener("click", (e) => {
    const homeLink = e.target.closest("[data-home]");
    if (homeLink) {
      e.preventDefault();
      location.hash = "home";
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      e.preventDefault();
      location.hash = id.slice(1);
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
}

/* ---------- Placeholder project links ---------- */
function initProjectLinks() {
  document.querySelectorAll("[data-demo], [data-repo]").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (a.getAttribute("href") === "#") {
        e.preventDefault();
        a.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }],
          { duration: 280 }
        );
      }
    });
  });
}

function initProjectGalleries() {
  document.querySelectorAll("[data-fan]").forEach((fan) => {
    const cards = [...fan.querySelectorAll("[data-fan-card]")];
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("is-front"));
        card.classList.add("is-front");
      });
    });
  });
}

/* ---------- Footer ---------- */
function initFooter() {
  document.getElementById("year").textContent = String(new Date().getFullYear());
  document.getElementById("backTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initNav();
  initSpotlight();
  initMagnetic();
  initRouter();
  initProjectLinks();
  initProjectGalleries();
  initFooter();
  initLoader();
  requestAnimationFrame(initReveals);
});
