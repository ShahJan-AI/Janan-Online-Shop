
const menuToggle = document.getElementById("menuToggle");
const dropdown = document.getElementById("jananDropdown");
const menuClose = document.getElementById("menuClose");
const overlay = document.getElementById("menuOverlay");

const submenuButtons = document.querySelectorAll(".submenu-toggle");

function openMenu() {
    dropdown.classList.add("open");
    overlay.classList.add("active");
    dropdown.removeAttribute("inert");
    dropdown.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    menuClose.focus();
}

function closeMenu() {
    dropdown.classList.remove("open");
    overlay.classList.remove("active");
    dropdown.setAttribute("inert", "");
    dropdown.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.focus();
}

// Open / close the main menu
menuToggle.addEventListener("click", () => {
    if (dropdown.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close button
menuClose.addEventListener("click", closeMenu);

// Close when clicking outside the menu
overlay.addEventListener("click", closeMenu);

// Expand or collapse submenus
submenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const submenuId = button.getAttribute("aria-controls");
        const submenu = document.getElementById(submenuId);
        const isExpanded =
            button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        submenu.hidden = isExpanded;
    });
});

// Close with Escape key
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        dropdown.classList.contains("open")
    ) {
        closeMenu();
    }
});

// Close after navigating to a link
dropdown.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});