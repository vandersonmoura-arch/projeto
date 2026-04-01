const yearElement = document.getElementById("current-year");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealElements = [...document.querySelectorAll(".reveal")];
const header = document.querySelector(".site-header");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

function setActiveLink(id) {
    navLinks.forEach(link => {
        link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${id}`
        );
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const targetId = link.getAttribute("href")?.replace("#", "");
        if (targetId) setActiveLink(targetId);
    });
});

function handleScroll() {

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // header state
    if (header) {
        header.classList.toggle("header-scroll", scrollY > 40);
    }

    // reveal elements
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });

    // menu scroll spy
    const scrollPosition = scrollY + 220;

    let currentSection = sections[0]?.id || "";

    sections.forEach(section => {
        if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
        ) {
            currentSection = section.id;
        }
    });

    if (currentSection) {
        setActiveLink(currentSection);
    }

}

window.addEventListener("scroll", handleScroll);

handleScroll();