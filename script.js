let profileSections = {};

const panel = document.querySelector("#panel");
const tabButtons = [...document.querySelectorAll(".modal-tab")];

function createDetailCard(item, compact) {
  const article = document.createElement("article");
  article.className = `detail-card${compact ? " compact" : ""}`;

  const tags = item.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  const logoHtml = item.logo ? `<img src="${item.logo}" alt="${item.title}" class="detail-logo" style="width: 40px; height: 40px; min-width: 40px; border-radius: 8px; object-fit: cover; ${item.style || ''}" loading="lazy">` : `<div class="modal-item-icon">#</div>`;

  article.innerHTML = `
    ${logoHtml}
    <div class="modal-item-text">
      <strong style="font-size: 0.95rem; margin-bottom: 2px;">${item.title}</strong>
      <span>${item.period}</span>
      <p style="margin: 6px 0 0; font-size: 0.85rem; line-height: 1.4;">${item.body}</p>
      ${tags ? `<div class="detail-tags" aria-label="Etiketler">${tags}</div>` : ""}
    </div>
    <div class="modal-item-arrow">→</div>
  `;

  return article;
}

function renderPanel(key) {
  const section = profileSections[key];
  
  if (section.compact) {
    panel.classList.add("compact");
  } else {
    panel.classList.remove("compact");
  }

  const cards = section.items.map((item) => createDetailCard(item, section.compact));
  panel.replaceChildren(...cards);
  panel.setAttribute("aria-labelledby", `tab-${key}`);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.panel;

    tabButtons.forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });

    renderPanel(key);
  });
});

async function loadData() {
  try {
    const [exp, edu, cert] = await Promise.all([
      fetch("experience.json").then((res) => res.json()),
      fetch("education.json").then((res) => res.json()),
      fetch("certificates.json").then((res) => res.json()),
    ]);
    profileSections = {
      experience: exp,
      education: edu,
      certificates: cert,
    };
    renderPanel("experience");
  } catch (error) {
    console.error("Data fetch error:", error);
    panel.innerHTML = `<div style="grid-column: 1/-1; padding: 20px; border: 1px solid var(--coral); border-radius: 12px; background: var(--paper); color: var(--ink);">
      <h3 style="color: var(--coral); margin-top: 0;">⚠️ Veriler Yüklenemedi</h3>
      <p>JSON dosyaları tarayıcınızın güvenlik ayarları (CORS) nedeniyle yüklenemedi. Eğer <code>index.html</code> dosyasını çift tıklayarak (<code>file:///</code> protokolü ile) açtıysanız bu hata normaldir.</p>
      <p><strong>Çözüm:</strong> Sistemi yerel bir sunucuda (örn. VS Code Live Server uzantısı) çalıştırmanız veya dosyaları asıl web sunucunuza yüklemeniz gerekmektedir.</p>
    </div>`;
  }
}
loadData();

// Hamburger Menu Logic
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
}


// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.remove("light");
    themeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.add("light");
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    localStorage.setItem("theme", "light");
  }
}

// Check saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  setTheme(false);
} else {
  setTheme(true);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isCurrentlyLight = document.documentElement.classList.contains("light");
    setTheme(isCurrentlyLight);
  });
}
