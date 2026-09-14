/* =========================================================
   KHAN TABREZ RAZA - PERSONAL PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
       ========================= */

    const html = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const backToTop = document.getElementById("backToTop");

    const currentYear = document.getElementById("currentYear");

    /* =========================
       DARK / LIGHT MODE
       ========================= */

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (html.classList.contains("dark")) {
            icon.className = "fas fa-sun";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("title", "Light mode");
        } else {
            icon.className = "fas fa-moon";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("title", "Dark mode");
        }
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {
            html.classList.add("dark");
        } else if (savedTheme === "light") {
            html.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;

            if (prefersDark) {
                html.classList.add("dark");
            }
        }

        updateThemeIcon();
    }

    applySavedTheme();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            html.classList.toggle("dark");

            const isDark = html.classList.contains("dark");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();
        });
    }


    /* =========================
       MOBILE MENU
       ========================= */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fas fa-times"
                    : "fas fa-bars";
            }
        });


        /* Close menu after clicking a link */

        const links = navLinks.querySelectorAll("a");

        links.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fas fa-bars";
                }
            });

        });
    }


    /* =========================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================= */

    document.addEventListener("click", (event) => {

        if (!navLinks || !menuToggle) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {
            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fas fa-bars";
            }
        }
    });


    /* =========================
       SMOOTH SCROLL
       ========================= */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

    });


    /* =========================
       ACTIVE NAV LINK
       ========================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 130;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================
       SCROLL REVEAL
       ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    /* =========================
       BACK TO TOP
       ========================= */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents = "auto";
        } else {
            backToTop.style.opacity = "0";
            backToTop.style.pointerEvents = "none";
        }
    }

    if (backToTop) {

        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents = "none";

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    /* =========================
       CONTACT FORM
       ========================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* Validation */

                if (!name || !email || !message) {

                    showFormStatus(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;
                }


                if (!isValidEmail(email)) {

                    showFormStatus(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                if (message.length < 10) {

                    showFormStatus(
                        "Message should contain at least 10 characters.",
                        "error"
                    );

                    return;
                }


                /*
                   Portfolio currently has no backend/email
                   service connected.

                   So we prepare a mailto link instead of
                   silently pretending that the message was sent.
                */

                const subject =
                    encodeURIComponent(
                        `Portfolio Contact - ${name}`
                    );

                const body =
                    encodeURIComponent(
                        `Name: ${name}\n` +
                        `Email: ${email}\n\n` +
                        `Message:\n${message}`
                    );

                const mailto =
                    `mailto:tabrezrazakhan@gmail.com` +
                    `?subject=${subject}` +
                    `&body=${body}`;


                showFormStatus(
                    "Opening your email app...",
                    "success"
                );

                window.location.href = mailto;
            }
        );
    }


    /* =========================
       EMAIL VALIDATION
       ========================= */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    /* =========================
       FORM STATUS
       ========================= */

    function showFormStatus(message, type) {

        if (!formStatus) return;

        formStatus.textContent = message;

        if (type === "success") {

            formStatus.style.color =
                "var(--success)";

        } else if (type === "error") {

            formStatus.style.color =
                "var(--danger)";

        } else {

            formStatus.style.color =
                "var(--text-soft)";
        }
    }


    /* =========================
       CURRENT YEAR
       ========================= */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =========================
       EXTERNAL PLACEHOLDER LINKS
       ========================= */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    placeholderLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            /*
               Ignore buttons/links that are only used
               for JavaScript or navigation.
            */

            const text =
                link.textContent.trim().toLowerCase();

            if (
                text.includes("github") ||
                text.includes("linkedin") ||
                text.includes("source code") ||
                text.includes("live demo") ||
                text.includes("whatsapp")
            ) {
                event.preventDefault();

                showTemporaryMessage(
                    "This link will be added when the real URL is available."
                );
            }

        });

    });


    /* =========================
       TEMPORARY MESSAGE
       ========================= */

    function showTemporaryMessage(message) {

        const existing =
            document.querySelector(".temporary-message");

        if (existing) {
            existing.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            "temporary-message";

        notification.textContent =
            message;

        notification.style.position = "fixed";
        notification.style.left = "50%";
        notification.style.bottom = "25px";
        notification.style.transform =
            "translateX(-50%)";

        notification.style.zIndex = "9999";

        notification.style.maxWidth = "calc(100% - 30px)";

        notification.style.padding =
            "12px 18px";

        notification.style.border =
            "1px solid var(--border)";

        notification.style.borderRadius =
            "12px";

        notification.style.background =
            "var(--bg-card)";

        notification.style.color =
            "var(--text)";

        notification.style.boxShadow =
            "var(--shadow-md)";

        notification.style.fontSize =
            "0.85rem";

        notification.style.textAlign =
            "center";

        document.body.appendChild(notification);


        setTimeout(() => {

            notification.style.opacity = "0";
            notification.style.transition =
                "opacity 0.3s ease";

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3000);
    }


    /* =========================
       KEYBOARD ACCESSIBILITY
       ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("open")
            ) {

                navLinks.classList.remove("open");

                if (menuToggle) {
                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {
                        icon.className =
                            "fas fa-bars";
                    }
                }
            }

        }
    );

});
