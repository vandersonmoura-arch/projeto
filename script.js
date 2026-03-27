const yearElement = document.getElementById("current-year");
const navLinks = document.querySelectorAll(".site-nav a");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("is-active"));
        link.classList.add("is-active");
    });
});
