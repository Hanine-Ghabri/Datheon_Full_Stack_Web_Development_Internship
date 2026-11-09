
/* ===== ADDED: theme toggle, hamburger menu, project modal ===== */
document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;
    const themeBtn = document.getElementById("themeToggle");
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
        themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        try { localStorage.setItem("theme", theme); } catch (e) {}
    }
    applyTheme(saved || "light");
    themeBtn.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    const header = document.querySelector("header");
    const menuBtn = document.getElementById("menuToggle");
    menuBtn.addEventListener("click", function () {
        const open = header.classList.toggle("menu-open");
        menuBtn.setAttribute("aria-expanded", open);
    });
    header.querySelectorAll(":scope > a").forEach(function (a) {
        a.addEventListener("click", function () {
            header.classList.remove("menu-open");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

    const modal = document.getElementById("projectModal");
    let lastFocus = null;
    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (lastFocus) lastFocus.focus();
    }
    document.querySelectorAll(".details-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const card = btn.closest(".project-card");
            lastFocus = btn;
            document.getElementById("modalTitle").textContent = card.querySelector("h3").textContent;
            const desc = card.querySelector("p").textContent.split("✨").map(function (s) { return s.trim(); })
                .filter(Boolean).map(function (s) { return "✨ " + s; }).join("\n");
            document.getElementById("modalDesc").textContent = desc;
            document.getElementById("modalTools").textContent = card.querySelector(".tools").textContent;
            const links = document.getElementById("modalLinks");
            links.innerHTML = "";
            card.querySelectorAll("a").forEach(function (a) {
                const c = document.createElement("a");
                c.href = a.href; c.target = "_blank"; c.rel = "noopener";
                c.textContent = a.textContent;
                links.appendChild(c);
            });
            modal.hidden = false;
            document.body.style.overflow = "hidden";
            document.getElementById("modalClose").focus();
        });
    });
    document.getElementById("modalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });
});