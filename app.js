const CASE_NOTES = [
  {
    id: "CN-01",
    slug: "finansia",
    title: "Finansia: Personal Finance Management System",
    period: "Jan. 2025 - Present",
    category: "fullstack",
    categoryLabel: "Full-Stack / RESTful API",
    status: "Active Development",
    screenshot: "app-ss/finansia.png",
    screenshotAlt: "Production web interface and financial dashboard of Finansia Personal Finance Management System",
    screenshotCaption: "Artifact Evidence: Finansia user interface, cashflow consolidation, and financial analytics dashboard",
    summary:
      "Full-stack personal finance application built with a Laravel RESTful API backend and a responsive front-end dashboard to track user transactions, budget targets, and monthly analytics.",
    architecture:
      "Service-separated RESTful API backend on PHP (Laravel) and relational SQL storage, paired with a responsive web dashboard for transaction logging and monthly aggregation queries.",
    challenge:
      "Recording daily user transactions, enforcing monthly budget target thresholds, and aggregating monthly spending analytics accurately without slowing down dashboard response times.",
    stack: ["PHP (Laravel)", "RESTful API", "SQL", "HTML", "CSS", "JavaScript"],
    solution:
      "Architected and implemented structured Laravel RESTful API endpoints with transaction validation schemas and a responsive front-end dashboard to track user transactions, budget targets, and monthly financial analytics.",
    deliverables: [
      "Laravel RESTful API architecture for transaction logging and budget categorization.",
      "Relational SQL schema tracking monthly budget targets against actual spending.",
      "Responsive front-end dashboard displaying monthly financial analytics and transaction history."
    ]
  },
  {
    id: "CN-02",
    slug: "e-procurement-v236",
    title: "E-Procurement Platform (Version 2.3.6)",
    period: "Apr. 2025",
    category: "release-qa",
    categoryLabel: "Release Engineering & QA Optimization",
    status: "Shipped Release (v2.3.6)",
    screenshot: "app-ss/eprocurement.png",
    screenshotAlt: "Production dashboard and multi-vendor procurement task monitoring interface of E-Procurement Platform v2.3.6",
    screenshotCaption: "Artifact Evidence: Corporate e-procurement management dashboard, bidding task list, and transaction tracking",
    summary:
      "Contributed to the core v2.3.6 release cycle by optimizing multi-vendor bidding workflows, refining database integrity constraints, and resolving critical performance bottlenecks during staging.",
    architecture:
      "Multi-vendor corporate procurement platform with centralized bidding workflows, relational database integrity constraints, and a pre-release staging verification pipeline.",
    challenge:
      "Multi-vendor bidding workflows hit performance bottlenecks during staging load tests and required stricter database integrity constraints to prevent invalid vendor bid records.",
    stack: ["Laravel", "PostgreSQL", "MySQL", "Git", "Postman", "Staging QA"],
    solution:
      "Implemented optimized multi-vendor bidding workflows for the v2.3.6 release cycle, refined relational database integrity constraints, and resolved critical software performance bottlenecks during the staging phase.",
    deliverables: [
      "Optimized multi-vendor bidding execution paths to reduce transaction bottlenecks.",
      "Refined relational database integrity constraints across vendor procurement tables.",
      "Staging performance audit and bottleneck resolution prior to the v2.3.6 production release."
    ]
  }
];

const state = {
  activeCategory: "all",
  searchQuery: "",
  viewState: "ready",
  activeModalId: null,
  activeLightboxTrigger: null
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFilteredProjects() {
  return CASE_NOTES.filter((item) => {
    const matchesCategory =
      state.activeCategory === "all" || item.category === state.activeCategory;
    const query = state.searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const haystack = [
      item.id,
      item.title,
      item.period,
      item.categoryLabel,
      item.summary,
      item.architecture,
      item.challenge,
      item.solution,
      item.stack.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && haystack.includes(query);
  });
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  const countLabel = document.getElementById("projects-count");
  if (!container || !countLabel) return;

  if (state.viewState === "loading") {
    countLabel.textContent = "STATUS: LOADING CASE-NOTES...";
    container.innerHTML = `
      <div class="surface-panel rounded-md p-6 sm:p-8" role="status" aria-live="polite">
        <div class="flex items-center gap-3 mb-3">
          <span class="status-dot" aria-hidden="true"></span>
          <p class="font-mono-tech text-sm font-medium">Loading project specifications from local index...</p>
        </div>
        <p class="text-sm" style="color: var(--text-muted);">
          Synchronizing architecture notes, engineering challenges, and technical stack records.
        </p>
      </div>
    `;
    return;
  }

  if (state.viewState === "error") {
    countLabel.textContent = "STATUS: INDEX LOAD ERROR";
    container.innerHTML = `
      <div class="error-banner rounded-md p-6 sm:p-8" role="alert">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="font-mono-tech text-xs uppercase tracking-wider mb-1">ERR_INDEX_SYNC_FAILED</p>
            <h3 class="text-base font-semibold mb-1">Unable to load project specification index</h3>
            <p class="text-sm">
              Reading the case-notes index failed. Use the recovery button to reload the local project records.
            </p>
          </div>
          <button
            type="button"
            id="retry-projects-btn"
            class="control-interactive px-4 py-2.5 rounded text-sm font-medium shrink-0"
          >
            Reload Project Index
          </button>
        </div>
      </div>
    `;
    const retryBtn = document.getElementById("retry-projects-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        setViewState("ready");
      });
    }
    return;
  }

  const filtered = getFilteredProjects();

  if (state.viewState === "empty" || filtered.length === 0) {
    countLabel.textContent = "SHOWING 0 OF 2 PROJECTS";
    const activeQuery = state.searchQuery.trim()
      ? `keyword "${escapeHtml(state.searchQuery.trim())}"`
      : "the selected category filter";
    container.innerHTML = `
      <div class="surface-panel rounded-md p-6 sm:p-8" role="status" aria-live="polite">
        <p class="font-mono-tech text-xs mb-2" style="color: var(--text-muted);">[0 MATCHING RECORDS]</p>
        <h3 class="text-base font-semibold mb-2">No case-notes match ${activeQuery}</h3>
        <p class="text-sm mb-5" style="color: var(--text-secondary);">
          This repository index contains 2 verified projects from the resume (Finansia and E-Procurement Platform v2.3.6). Reset the active filter to restore all records.
        </p>
        <button
          type="button"
          id="reset-filter-btn"
          class="control-primary px-4 py-2.5 rounded text-sm"
        >
          Reset Filter &amp; Search
        </button>
      </div>
    `;
    const resetBtn = document.getElementById("reset-filter-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", resetFilters);
    }
    return;
  }

  countLabel.textContent = `SHOWING ${filtered.length} OF ${CASE_NOTES.length} PROJECTS`;

  container.innerHTML = filtered
    .map(
      (project) => `
      <article class="surface-panel surface-panel-interactive rounded-md p-5 sm:p-7">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r pb-5 lg:pb-0 lg:pr-6" style="border-color: var(--border-subtle);">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="font-mono-tech text-xs px-2 py-1 rounded-sm" style="background-color: var(--bg-elevated); border: 1px solid var(--border-subtle); color: var(--accent-primary);">
                  ${escapeHtml(project.id)} // ${escapeHtml(project.categoryLabel)}
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold mb-2">${escapeHtml(project.title)}</h3>
              <p class="font-mono-tech text-xs mb-4" style="color: var(--text-muted);">
                Timeline: ${escapeHtml(project.period)} · Status: ${escapeHtml(project.status)}
              </p>
              <p class="text-sm mb-5" style="color: var(--text-secondary);">
                ${escapeHtml(project.summary)}
              </p>
            </div>

            <div>
              <p class="font-mono-tech text-xs mb-2" style="color: var(--text-muted);">TECHNICAL STACK:</p>
              <div class="flex flex-wrap gap-1.5 mb-5">
                ${project.stack
                  .map((tech) => `<span class="tech-tag font-mono-tech">${escapeHtml(tech)}</span>`)
                  .join("")}
              </div>
              <button
                type="button"
                data-open-spec="${escapeHtml(project.id)}"
                class="control-interactive w-full sm:w-auto px-4 py-2.5 rounded text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <span>Inspect Technical Spec (${escapeHtml(project.id)})</span>
              </button>
            </div>
          </div>

          <div class="lg:col-span-8 flex flex-col gap-5">
            <div class="surface-elevated rounded p-3.5 sm:p-4">
              <div class="flex items-center justify-between gap-2 pb-2 mb-3 border-b" style="border-color: var(--border-subtle);">
                <span class="font-mono-tech text-xs" style="color: var(--accent-primary);">
                  APPLICATION EVIDENCE // ${escapeHtml(project.screenshot)}
                </span>
                <button
                  type="button"
                  data-open-lightbox="${escapeHtml(project.id)}"
                  class="control-interactive px-2.5 py-1 rounded font-mono-tech text-xs inline-flex items-center gap-1.5"
                  aria-label="Expand screenshot for ${escapeHtml(project.title)}"
                >
                  <span>Expand Preview</span>
                </button>
              </div>
              <button
                type="button"
                data-open-lightbox="${escapeHtml(project.id)}"
                class="w-full text-left p-0 rounded overflow-hidden block group focus-visible:outline-none"
                style="border: 1px solid var(--border-subtle); background-color: var(--bg-surface);"
              >
                <img
                  src="${escapeHtml(project.screenshot)}"
                  alt="${escapeHtml(project.screenshotAlt)}"
                  class="w-full h-auto max-h-72 sm:max-h-80 object-cover object-top transition-opacity duration-150 group-hover:opacity-95"
                  loading="lazy"
                >
              </button>
              <p class="font-mono-tech text-xs mt-2" style="color: var(--text-muted);">
                ${escapeHtml(project.screenshotCaption)}
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="surface-elevated rounded p-4">
                <p class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">01 / ARCHITECTURE</p>
                <p class="text-sm" style="color: var(--text-secondary);">${escapeHtml(project.architecture)}</p>
              </div>
              <div class="surface-elevated rounded p-4">
                <p class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">02 / ENGINEERING CHALLENGE</p>
                <p class="text-sm" style="color: var(--text-secondary);">${escapeHtml(project.challenge)}</p>
              </div>
              <div class="surface-elevated rounded p-4 sm:col-span-2">
                <p class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">03 / SOLUTION &amp; IMPLEMENTATION</p>
                <p class="text-sm" style="color: var(--text-secondary);">${escapeHtml(project.solution)}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  container.querySelectorAll("[data-open-spec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-spec");
      openSpecModal(id);
    });
  });

  container.querySelectorAll("[data-open-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-lightbox");
      const project = CASE_NOTES.find((item) => item.id === id);
      if (project) {
        openLightbox(project.screenshot, project.screenshotAlt, project.screenshotCaption, btn);
      }
    });
  });
}

function updateStateButtons() {
  document.querySelectorAll("[data-state-trigger]").forEach((btn) => {
    const targetState = btn.getAttribute("data-state-trigger");
    const isActive = targetState === state.viewState;
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    if (isActive) {
      btn.style.borderColor = "var(--accent-primary)";
      btn.style.backgroundColor = "var(--accent-surface)";
    } else {
      btn.style.borderColor = "var(--border-control)";
      btn.style.backgroundColor = "var(--bg-surface)";
    }
  });
}

function setViewState(nextState) {
  state.viewState = nextState;
  updateStateButtons();
  renderProjects();
}

function resetFilters() {
  state.activeCategory = "all";
  state.searchQuery = "";
  state.viewState = "ready";

  const searchInput = document.getElementById("project-search");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll(".filter-tab").forEach((tab) => {
    const cat = tab.getAttribute("data-category");
    tab.setAttribute("aria-selected", cat === "all" ? "true" : "false");
  });

  updateStateButtons();
  renderProjects();
}

function openSpecModal(projectId) {
  const project = CASE_NOTES.find((item) => item.id === projectId);
  const modal = document.getElementById("spec-modal");
  const modalBody = document.getElementById("spec-modal-body");
  const modalTitle = document.getElementById("spec-modal-title");
  const closeBtn = document.getElementById("spec-modal-close");

  if (!project || !modal || !modalBody || !modalTitle) return;

  state.activeModalId = projectId;
  modalTitle.textContent = `${project.id} // ${project.title}`;
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-2 font-mono-tech text-xs" style="color: var(--text-muted);">
        <span>Timeline: ${escapeHtml(project.period)}</span>
        <span>·</span>
        <span>Scope: ${escapeHtml(project.categoryLabel)}</span>
        <span>·</span>
        <span>Status: ${escapeHtml(project.status)}</span>
      </div>

      <div class="surface-elevated rounded p-3.5">
        <div class="flex items-center justify-between pb-2 mb-2 border-b" style="border-color: var(--border-subtle);">
          <span class="font-mono-tech text-xs" style="color: var(--accent-primary);">VERIFIED ARTIFACT SCREENSHOT</span>
          <a
            href="${escapeHtml(project.screenshot)}"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono-tech text-xs underline"
            style="color: var(--text-primary);"
          >
            Open Original File
          </a>
        </div>
        <img
          src="${escapeHtml(project.screenshot)}"
          alt="${escapeHtml(project.screenshotAlt)}"
          class="w-full h-auto max-h-64 object-cover object-top rounded"
          style="border: 1px solid var(--border-subtle);"
        >
        <p class="font-mono-tech text-xs mt-2" style="color: var(--text-muted);">
          ${escapeHtml(project.screenshotCaption)}
        </p>
      </div>

      <div class="surface-elevated rounded p-4">
        <h4 class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">SYSTEM ARCHITECTURE</h4>
        <p class="text-sm" style="color: var(--text-secondary);">${escapeHtml(project.architecture)}</p>
      </div>
      <div class="surface-elevated rounded p-4">
        <h4 class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">ENGINEERING CHALLENGE</h4>
        <p class="text-sm" style="color: var(--text-secondary);">${escapeHtml(project.challenge)}</p>
      </div>
      <div class="surface-elevated rounded p-4">
        <h4 class="font-mono-tech text-xs mb-1.5" style="color: var(--accent-primary);">SOLUTION &amp; DELIVERABLES</h4>
        <p class="text-sm mb-3" style="color: var(--text-secondary);">${escapeHtml(project.solution)}</p>
        <ul class="list-disc pl-5 space-y-1.5 text-sm" style="color: var(--text-secondary);">
          ${project.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}
        </ul>
      </div>
      <div>
        <h4 class="font-mono-tech text-xs mb-2" style="color: var(--text-muted);">STACK COMPONENTS:</h4>
        <div class="flex flex-wrap gap-1.5">
          ${project.stack.map((t) => `<span class="tech-tag font-mono-tech">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  if (closeBtn) closeBtn.focus();
}

function closeSpecModal() {
  const modal = document.getElementById("spec-modal");
  if (!modal || modal.classList.contains("hidden")) return;

  const previousId = state.activeModalId;
  state.activeModalId = null;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  if (previousId) {
    const trigger = document.querySelector(`[data-open-spec="${previousId}"]`);
    if (trigger) trigger.focus();
  }
}

function openLightbox(src, alt, caption, triggerEl) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  if (!modal || !img || !cap || !closeBtn) return;

  state.activeLightboxTrigger = triggerEl;
  img.src = src;
  img.alt = alt;
  cap.textContent = caption;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal || modal.classList.contains("hidden")) return;

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  const trigger = state.activeLightboxTrigger;
  state.activeLightboxTrigger = null;
  if (trigger && typeof trigger.focus === "function") {
    trigger.focus();
  }
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const labelSpan = document.getElementById("theme-toggle-label");
  if (!toggleBtn || !labelSpan) return;

  const savedTheme = localStorage.getItem("ws_portfolio_theme") || "dark";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("ws_portfolio_theme", next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const isLight = theme === "light";
    toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
    labelSpan.textContent = isLight ? "Theme: Light" : "Theme: Dark";
  }
}

function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const menuLabel = document.getElementById("mobile-menu-label");
  if (!menuBtn || !mobileNav || !menuLabel) return;

  function setMenuOpen(isOpen) {
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuLabel.textContent = isOpen ? "Close" : "Menu";
    if (isOpen) {
      mobileNav.classList.remove("hidden");
    } else {
      mobileNav.classList.add("hidden");
    }
  }

  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    setMenuOpen(!expanded);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (menuBtn.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuBtn.focus();
      }
      closeLightbox();
      closeSpecModal();
    }
  });
}


function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const feedback = document.getElementById("copy-feedback");
  if (!copyBtn || !feedback) return;

  const email = "wahyusnjy@gmail.com";

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      feedback.textContent = "Copied to clipboard: wahyusnjy@gmail.com";
      feedback.classList.remove("hidden");
    } catch {
      feedback.textContent = "Copy email address manually: wahyusnjy@gmail.com";
      feedback.classList.remove("hidden");
    }
  });
}

function initProjectControls() {
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category") || "all";
      state.activeCategory = category;
      state.viewState = "ready";

      document.querySelectorAll(".filter-tab").forEach((item) => {
        item.setAttribute(
          "aria-selected",
          item.getAttribute("data-category") === category ? "true" : "false"
        );
      });

      updateStateButtons();
      renderProjects();
    });
  });

  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.searchQuery = event.target.value || "";
      state.viewState = "ready";
      updateStateButtons();
      renderProjects();
    });
  }

  document.querySelectorAll("[data-state-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetState = btn.getAttribute("data-state-trigger") || "ready";
      setViewState(targetState);
    });
  });

  const modal = document.getElementById("spec-modal");
  const closeBtn = document.getElementById("spec-modal-close");
  const closeFooterBtn = document.getElementById("spec-modal-close-footer");

  if (closeBtn) closeBtn.addEventListener("click", closeSpecModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener("click", closeSpecModal);
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeSpecModal();
    });
  }

  const lightbox = document.getElementById("lightbox-modal");
  const lightboxClose = document.getElementById("lightbox-close");
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initProjectControls();
  initCopyEmail();
  updateStateButtons();
  renderProjects();
});
