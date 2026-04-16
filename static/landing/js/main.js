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
  revealEls.forEach(function (el, idx) {
    if (!el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add(idx % 2 === 0 ? "reveal-left" : "reveal-right");
    }
  });

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

  // Count-up animation for stat numbers
  const countEls = document.querySelectorAll("[data-count-to]");

  function formatValue(value, decimals) {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.round(value).toString();
  }

  function animateCount(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";

    const target = parseFloat(el.getAttribute("data-count-to") || "0");
    const decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    const prefix = el.getAttribute("data-count-prefix") || "";
    const suffix = el.getAttribute("data-count-suffix") || "";
    const duration = 1900;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + formatValue(current, decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + formatValue(target, decimals) + suffix;
      }
    }

    requestAnimationFrame(frame);
  }

  if (countEls.length) {
    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      countEls.forEach(function (el) {
        counterObserver.observe(el);
      });
    } else {
      countEls.forEach(animateCount);
    }
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
