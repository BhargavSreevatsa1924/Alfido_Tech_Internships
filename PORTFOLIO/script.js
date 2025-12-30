gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* AI Name typing */
gsap.to(".ai-name", {
    text: "Bhargav Sreevatsa",
    duration: 2,
    delay: 1
});
// Scroll Reveal Animation
const contact = document.getElementById("contact");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contact.classList.add("show");
        }
    });
}, { threshold: 0.3 });

observer.observe(contact);

/* Cursor glow */
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
    gsap.to(cursor, { x: e.clientX - 9, y: e.clientY - 9, duration: .2 });
});

/* Scroll progress */
window.addEventListener("scroll", () => {
    const h = document.documentElement;
    document.getElementById("scroll-progress").style.width =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});
/* Section reveal */
gsap.utils.toArray(".reveal").forEach(sec => {
    gsap.to(sec, {
        opacity: 1, y: 0, duration: 1.2,
        scrollTrigger: { trigger: sec, start: "top 80%" }
    });
});

const arrow = document.querySelector(".scroll-arrow");

/* GSAP Bounce Animation */
gsap.to(arrow, {
    y: 15,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

/* Smooth Scroll */
arrow.addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth"
    });
});

/* Magnetic Hover Effect */
arrow.addEventListener("mousemove", (e) => {
    const rect = arrow.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(arrow, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3
    });
});

arrow.addEventListener("mouseleave", () => {
    gsap.to(arrow, {
        x: 0,
        y: 0,
        duration: 0.3
    });
});