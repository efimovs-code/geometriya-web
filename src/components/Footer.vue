<template>
  <footer id="footer" class="footer-section">
    <div class="footer-container">
      <!-- ==========================================================================
           CALL TO ACTION (CTA)
           ========================================================================== -->
      <div class="footer-cta-wrapper">
        <h2 class="footer-title animate-on-scroll fade-up">
          Ваш ідеальний простір <br />
          починається з розмови.
        </h2>

        <p class="footer-description animate-on-scroll fade-up delay-100">
          Зв'яжіться з нами напряму — ми обговоримо ваші ідеї.
        </p>

        <!-- Кнопка преміум-вигляду -->
        <div class="btn-wrapper animate-on-scroll fade-up delay-200">
          <button class="btn-cta" @click="openModal">
            <span>Замовити меблі</span>
          </button>
        </div>

        <!-- ==========================================================================
             CONTACT LINKS (INLINE)
             ========================================================================== -->
        <div class="footer-contacts-inline animate-on-scroll fade-up delay-300">
          <a href="tel:+380956284131" class="minimal-link phone-link"
            >+380 (95) 628-41-31</a
          >
          <a
            href="viber://chat?number=%2B380956284131"
            class="minimal-link viber-link"
            >Viber</a
          >

          <!-- ОНОВЛЕНЕ посилання на Facebook -->
          <a
            href="https://www.facebook.com/GEOMETRIYA.KIEV/"
            target="_blank"
            rel="noopener noreferrer"
            class="minimal-link fb-link"
            >Facebook</a
          >

          <!-- SMART EMAIL BUTTON (Виглядає як посилання, працює як кнопка) -->
          <button
            @click="handleEmailClick"
            class="minimal-link btn-reset email-link"
            :class="{ 'text-success': isEmailCopied }"
          >
            {{
              isEmailCopied ? "Email скопійовано!" : "geometriya.info@gmail.com"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         BOTTOM PANEL & COPYRIGHT
         ========================================================================== -->
    <div class="footer-bottom">
      <span class="copyright">© 2026 GEOMETRIYA. Всі права захищено.</span>

      <!-- Reusable Efimovs Agency Badge Component -->
      <EfimovsBadge />
    </div>

    <!-- Підключення модального вікна -->
    <ContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import EfimovsBadge from "./EfimovsBadge.vue";
import ContactModal from "./ContactModal.vue";

const isModalOpen = ref(false);
const isEmailCopied = ref(false); // state to track if email is copied

const openModal = () => {
  isModalOpen.value = true;
};

/**
 * Logic for handling click on Email in footer
 */
const handleEmailClick = async () => {
  const email = "geometriya.info@gmail.com";
  const subject = "Обговорення проєкту (GEOMETRIYA)";
  const body = "Добрий день! Мене цікавить співпраця...";

  try {
    await navigator.clipboard.writeText(email);
    isEmailCopied.value = true;

    setTimeout(() => {
      isEmailCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Помилка копіювання: ", err);
  }

  // Launching the native email client
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ==========================================================================
   BASE LAYOUT
   ========================================================================== */
.footer-section {
  position: relative;
  width: 1920px;
  margin: 0px auto;
  padding: 160px 0px 40px 0px;
  background-color: #f8f8f8;
  color: #050505;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.footer-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0px auto;
  padding: 0px 40px;
  text-align: center;
}

/* ==========================================================================
   CALL TO ACTION (CTA)
   ========================================================================== */
.footer-cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1120px;
}

.footer-title {
  margin: 0px 0px 32px 0px;
  font-size: 64px;
  font-weight: 500;
  line-height: 67px;
  color: #050505;
  letter-spacing: -2px;
}

.footer-description {
  width: 600px;
  margin: 0px 0px 40px 0px;
  font-size: 18px;
  line-height: 29px;
  color: #666666;
}

/* --- STYLES FOR THE BUTTON --- */
.btn-wrapper {
  display: inline-flex;
  padding-top: 4px;
  margin: -4px 0px 64px 0px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 56px;
  background-color: #050505;
  color: #ffffff;
  border: none;
  border-radius: 100px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow;
  transform: translateZ(0px);
}

.btn-wrapper:hover .btn-cta {
  background-color: #c5a059;
  transform: translateY(-4px) translateZ(0px);
  box-shadow: 0px 15px 30px rgba(197, 160, 89, 0.2);
}

/* ==========================================================================
   CONTACT LINKS
   ========================================================================== */
.footer-contacts-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 56px;
}

/* Скидання стилів для кнопки-посилання */
.btn-reset {
  appearance: none;
  outline: none;
  background: transparent;
  border: none;
  padding: 0px;
  font-family: inherit;
  cursor: pointer;
}

.minimal-link {
  position: relative;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  color: #050505;
  text-decoration: none;
  transition: color 0.4s ease;
}

.minimal-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0px;
  width: 0px;
  height: 1px;
  background-color: #c5a059;
  transition:
    width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.4s ease;
}

.minimal-link:hover {
  color: #c5a059;
}

/* Strict PX Widths for Link Hover Animations */
.phone-link:hover::after {
  width: 220px;
}
.viber-link:hover::after {
  width: 62px;
}
.fb-link:hover::after {
  width: 110px;
}
.email-link:hover::after {
  width: 340px;
}

/* Styles for Success Message */
.minimal-link.text-success {
  color: #4ade80;
}
.minimal-link.text-success::after {
  background-color: #4ade80;
  width: 240px;
}

/* ==========================================================================
   BOTTOM PANEL
   ========================================================================== */
.footer-bottom {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1300px;
  margin: 160px auto 0px auto;
  padding: 0px 40px;
  box-sizing: border-box;
}

.copyright {
  font-size: 14px;
  line-height: 20px;
  color: #888888;
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
.animate-on-scroll {
  opacity: 0;
  transition:
    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, opacity;
}

.fade-up {
  transform: translateY(40px);
}

.animate-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0px);
}

.delay-100 {
  transition-delay: 0.1s !important;
}
.delay-200 {
  transition-delay: 0.2s !important;
}
.delay-300 {
  transition-delay: 0.3s !important;
}

/* ==========================================================================
   STRICT ADAPTIVE DESIGN (ONLY PX)
   ========================================================================== */
@media (max-width: 1400px) {
  .footer-section {
    width: 1400px;
  }
  .footer-container {
    width: 1140px;
  }
  .footer-cta-wrapper {
    width: 1060px;
  }
  .footer-bottom {
    width: 1140px;
  }
}

@media (max-width: 1200px) {
  .footer-section {
    width: 1200px;
  }
  .footer-container {
    width: 960px;
  }
  .footer-cta-wrapper {
    width: 880px;
  }
  .footer-bottom {
    width: 960px;
  }
}

@media (max-width: 992px) {
  .footer-section {
    width: 992px;
  }
  .footer-container {
    width: 720px;
  }
  .footer-cta-wrapper {
    width: 640px;
  }

  .footer-title {
    font-size: 51px;
    line-height: 58px;
  }
  .footer-contacts-inline {
    flex-direction: column;
    gap: 32px;
  }

  .footer-bottom {
    width: 720px;
  }
}

@media (max-width: 768px) {
  .footer-section {
    width: 768px;
    padding: 100px 0px 32px 0px;
  }
  .footer-container {
    width: 540px;
    padding: 0px 24px;
  }
  .footer-cta-wrapper {
    width: 492px;
  }

  .footer-title {
    margin: 0px 0px 24px 0px;
    font-size: 38px;
    line-height: 46px;
  }
  .footer-description {
    width: 492px;
    margin: 0px 0px 32px 0px;
    font-size: 17px;
    line-height: 27px;
  }

  .btn-wrapper {
    width: 492px;
    margin: 0px 0px 48px 0px;
  }
  .btn-cta {
    width: 492px;
    padding: 20px 0px;
  }

  .minimal-link {
    font-size: 20px;
    line-height: 28px;
  }

  /* Adjusted PX Hover widths for 20px font */
  .phone-link:hover::after {
    width: 185px;
  }
  .viber-link:hover::after {
    width: 52px;
  }
  .fb-link:hover::after {
    width: 95px;
  }
  .email-link:hover::after {
    width: 285px;
  }
  .minimal-link.text-success::after {
    width: 205px;
  }

  .footer-bottom {
    width: 540px;
    padding: 0px 24px;
    margin: 100px auto 0px auto;
    flex-direction: column;
    gap: 32px;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .footer-section {
    width: 576px;
    padding: 80px 0px 32px 0px;
  }
  .footer-container {
    width: 320px;
    padding: 0px 10px;
  }
  .footer-cta-wrapper {
    width: 300px;
  }

  .footer-title {
    font-size: 28px;
    line-height: 36px;
    white-space: nowrap;
  }
  .footer-description {
    width: 280px;
    padding: 0px 10px;
    margin: 0px 0px 32px 0px;
    font-size: 15px;
    line-height: 24px;
  }

  .btn-wrapper {
    width: 300px;
    margin: 0px 0px 40px 0px;
  }
  .btn-cta {
    width: 300px;
    font-size: 11px;
    white-space: nowrap;
  }

  .footer-contacts-inline {
    gap: 24px;
  }
  .minimal-link {
    font-size: 18px;
    line-height: 26px;
  }

  /* Adjusted PX Hover widths for 18px font */
  .phone-link:hover::after {
    width: 168px;
  }
  .viber-link:hover::after {
    width: 46px;
  }
  .fb-link:hover::after {
    width: 85px;
  }
  .email-link:hover::after {
    width: 255px;
  }
  .minimal-link.text-success::after {
    width: 185px;
  }

  .footer-bottom {
    width: 320px;
    padding: 0px 10px;
    margin: 80px auto 0px auto;
    gap: 24px;
  }
}
</style>
