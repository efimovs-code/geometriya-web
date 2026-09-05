<template>
  <header
    class="header-section"
    :class="{
      'is-scrolled': isScrolled,
      'is-hidden': isHidden,
    }"
  >
    <div class="header-container">
      <!-- ==========================================================================
           LEFT SLOT: LOGO
           ========================================================================== -->
      <div class="header-slot logo-slot">
        <a href="#" class="logo" @click.prevent="scrollToSection('top')">
          GEOMETRIYA
        </a>
      </div>

      <!-- ==========================================================================
           CENTER SLOT: NAVIGATION
           ========================================================================== -->
      <nav class="desktop-nav">
        <a
          href="#expertise"
          class="nav-link"
          @click.prevent="scrollToSection('expertise')"
          >Послуги</a
        >
        <a
          href="#portfolio"
          class="nav-link"
          @click.prevent="scrollToSection('portfolio')"
          >Проєкти</a
        >
        <a
          href="#reviews"
          class="nav-link"
          @click.prevent="scrollToSection('reviews')"
          >Про нас</a
        >
        <a
          href="#footer"
          class="nav-link"
          @click.prevent="scrollToSection('footer')"
          >Зв'язатися</a
        >
      </nav>

      <!-- ==========================================================================
           RIGHT SLOT: CTA / BURGER
           ========================================================================== -->
      <div class="header-slot action-slot">
        <div class="desktop-action">
          <div class="btn-wrapper">
            <button class="btn-contact" @click="openContactModal">
              Обговорити проєкт
            </button>
          </div>
        </div>

        <button
          class="burger-btn"
          :class="{ 'is-active': isMobileMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle Menu"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Fullscreen Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <a
            href="#expertise"
            class="mobile-link"
            @click.prevent="scrollToSectionMobile('expertise')"
            >Послуги</a
          >
          <a
            href="#portfolio"
            class="mobile-link"
            @click.prevent="scrollToSectionMobile('portfolio')"
            >Проєкти</a
          >
          <a
            href="#reviews"
            class="mobile-link"
            @click.prevent="scrollToSectionMobile('reviews')"
            >Про нас</a
          >
          <a
            href="#footer"
            class="mobile-link"
            @click.prevent="scrollToSectionMobile('footer')"
            >Зв'язатися</a
          >
        </nav>

        <div class="mobile-footer">
          <span class="mobile-contact">Київ, вул. Спаська, 31-б</span>
          <a href="tel:+380956284131" class="mobile-phone"
            >+380 (95) 628-41-31</a
          >
        </div>
      </div>
    </div>
  </header>

  <!-- Modal Teleportation -->
  <Teleport to="body">
    <ContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ContactModal from "./ContactModal.vue";

const isScrolled = ref(false);
const isHidden = ref(false);
const isMobileMenuOpen = ref(false);
const isModalOpen = ref(false);

let lastScrollY = 0;
let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth <= 992;

      isScrolled.value = currentScrollY > 50;

      if (!isMobile && currentScrollY > lastScrollY && currentScrollY > 200) {
        if (!isMobileMenuOpen.value && !isModalOpen.value) {
          isHidden.value = true;
        }
      } else {
        isHidden.value = false;
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
};

const scrollToSection = (sectionId) => {
  if (sectionId === "top") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const section = document.getElementById(sectionId);

  if (section) {
    const headerOffset = 80;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = "";
  }
};

const scrollToSectionMobile = (sectionId) => {
  closeMenu();
  setTimeout(() => {
    scrollToSection(sectionId);
  }, 300);
};

const openContactModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* ==========================================================================
   HEADER SECTION BASE
   ========================================================================== */
.header-section {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 100;
  padding: 32px 0px;
  box-sizing: border-box;
  background-color: transparent;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.4s ease,
    padding 0.4s ease,
    box-shadow 0.4s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-section.is-hidden {
  transform: translateY(-200px);
}

.header-section.is-scrolled {
  padding: 16px 0px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
}

.header-container {
  width: 1400px;
  margin: 0px auto;
  padding: 0px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 101;
}

/* ==========================================================================
   EQUAL SLOTS FOR PERFECT CENTERING
   ========================================================================== */
.header-slot {
  width: 320px;
  display: flex;
  align-items: center;
}

.logo-slot {
  justify-content: flex-start;
}

.action-slot {
  justify-content: flex-end;
}

/* ==========================================================================
   BRANDING & NAVIGATION
   ========================================================================== */
.logo {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #050505;
  text-decoration: none;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  gap: 40px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #4a4a4a;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #050505;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0px;
  width: 0px;
  height: 1px;
  background-color: #c5a059;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Specific exact PX widths for hover lines */
.nav-link[href="#expertise"]:hover::after {
  width: 62px;
}
.nav-link[href="#portfolio"]:hover::after {
  width: 63px;
}
.nav-link[href="#reviews"]:hover::after {
  width: 60px;
}
.nav-link[href="#footer"]:hover::after {
  width: 75px;
}

/* ==========================================================================
   CALL TO ACTION BUTTON
   ========================================================================== */
.btn-wrapper {
  display: inline-flex;
  padding-top: 4px;
  margin-top: -4px;
}

.btn-contact {
  padding: 12px 32px;
  background-color: transparent;
  color: #050505;
  border: 1px solid rgba(5, 5, 5, 0.2);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow, border-color;
  transform: translateZ(0px);
}

.btn-wrapper:hover .btn-contact {
  background-color: #050505;
  color: #ffffff;
  border-color: #050505;
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}

/* ==========================================================================
   MOBILE BURGER ICON
   ========================================================================== */
.burger-btn {
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 102;
}

.burger-line {
  position: absolute;
  left: 8px;
  width: 24px;
  height: 1px;
  background-color: #050505;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.burger-line:first-child {
  top: 15px;
}
.burger-line:last-child {
  bottom: 15px;
}

.burger-btn.is-active .burger-line:first-child {
  top: 19px;
  left: 8px;
  transform: rotate(45deg);
}

.burger-btn.is-active .burger-line:last-child {
  bottom: 20px;
  left: 8px;
  transform: rotate(-45deg);
}

/* ==========================================================================
   MOBILE FULLSCREEN MENU
   ========================================================================== */
.mobile-menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #ffffff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 40px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu.is-open {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 0px auto;
  gap: 60px;
  transform: translateY(20px);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.1s;
}

.mobile-menu.is-open .mobile-menu-content {
  transform: translateY(0px);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  width: 320px;
}

.mobile-link {
  font-size: 18px;
  font-weight: 500;
  color: #050505;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 24px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: block;
  width: 320px;
  text-align: left;
  transition: color 0.3s ease;
}

.mobile-link:first-child {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.mobile-link:hover {
  color: #c5a059;
}

.mobile-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
}

.mobile-contact {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888888;
}

.mobile-phone {
  font-size: 20px;
  color: #c5a059;
  text-decoration: none;
  font-weight: 500;
}

/* ==========================================================================
   RESPONSIVE DESIGN BREAKPOINTS
   ========================================================================== */
@media (max-width: 992px) {
  .desktop-nav,
  .desktop-action {
    display: none;
  }
  .burger-btn {
    display: block;
  }

  .header-slot {
    width: 140px;
  }

  /* Hard-locked mobile header */
  .header-section {
    padding: 16px 0px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05) !important;
  }

  .header-section.is-hidden {
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .header-container,
  .mobile-menu {
    padding: 0px 24px;
  }
  .mobile-menu-content,
  .mobile-nav,
  .mobile-link {
    width: 280px;
  }
}
</style>
