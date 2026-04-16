(function () {
  "use strict";

  const toggle = document.getElementById("billingToggle");
  const priceEls = document.querySelectorAll("[data-price-monthly][data-price-yearly]");

  function syncPrices() {
    const yearly = toggle && toggle.checked;
    priceEls.forEach(function (el) {
      const m = el.getAttribute("data-price-monthly");
      const y = el.getAttribute("data-price-yearly");
      el.textContent = yearly ? y : m;
    });
  }

  if (toggle) {
    toggle.addEventListener("change", syncPrices);
    syncPrices();
  }

  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  const nav = document.querySelector(".navbar-landing");
  if (nav) {
    window.addEventListener(
      "scroll",
      function () {
        nav.style.background = window.scrollY > 40 ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.96)";
      },
      { passive: true }
    );
  }
})();
