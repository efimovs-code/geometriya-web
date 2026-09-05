<template>
  <header
    class="header-section"
    :class="{
      'is-scrolled': isScrolled,
      'is-hidden': isHidden,
    }"
  >
    <div class="header-container">
      <a href="#" class="logo" @click.prevent="scrollToSection('top')"> GEOMETRIYA </a>

      <nav class="desktop-nav">
        <a href="#expertise" class="nav-link" @click.prevent="scrollToSection('expertise')">Послуги</a>
        <a href="#portfolio" class="nav-link" @click.prevent="scrollToSection('portfolio')">Проєкти</a>
        <a href="#reviews" class="nav-link" @click.prevent="scrollToSection('reviews')">Про нас</a>
        <a href="#footer" class="nav-link" @click.prevent="scrollToSection('footer')">Зв'язатися</a>
      </nav>

      <div class="desktop-action">
        <div class="btn-wrapper">
          <button class="btn-contact" @click="openContactModal">Обговорити проєкт</button>
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

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <a href="#expertise" class="mobile-link" @click.prevent="scrollToSectionMobile('expertise')">Послуги</a>
          <a href="#portfolio" class="mobile-link" @click.prevent="scrollToSectionMobile('portfolio')">Проєкти</a>
          <a href="#reviews" class="mobile-link" @click.prevent="scrollToSectionMobile('reviews')">Про нас</a>
          <a href="#footer" class="mobile-link" @click.prevent="scrollToSectionMobile('footer')">Зв'язатися</a>
        </nav>

        <div class="mobile-footer">
          <span class="mobile-contact">Київ, вул. Спаська, 31-б</span>
          <a href="tel:+380956284131" class="mobile-phone">+380 (95) 628-41-31</a>
        </div>
      </div>
    </div>
  </header>

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

const handleScroll = () => {
  if (window.innerWidth <= 992) {
    isScrolled.value = false;
    isHidden.value = false;
    lastScrollY = window.scrollY;
    return;
  }

  const currentScrollY = window.scrollY;

  isScrolled.value = currentScrollY > 50;

  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    if (!isMobileMenuOpen.value && !isModalOpen.value) {
      isHidden.value = true;
    }
  } else {
    isHidden.value = false;
  }

  lastScrollY = currentScrollY;
};

const scrollToSection = (sectionId) => {
  if (sectionId === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
      behavior: "smooth"
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
  }, 10); // Уменьшил задержку скролла, так как меню закрывается моментально
};

const openContactModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.header-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 32px 0;
  box-sizing: border-box; 
  background-color: transparent;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.4s ease,
    padding 0.4s ease,
    box-shadow 0.4s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-section.is-hidden {
  transform: translateY(-100%);
}

.header-section.is-scrolled {
  padding: 16px 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 101;
}

.logo {
  font-size: 19.2px;
  font-weight: 700;
  letter-spacing: 2.88px;
  color: #050505;
  text-decoration: none;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  font-size: 14.4px;
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
  left: 0;
  width: 0;
  height: 1px;
  background-color: #c5a059;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}

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
  font-size: 13.6px;
  font-weight: 600; 
  text-transform: uppercase;
  letter-spacing: 0.68px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow, border-color;
  transform: translateZ(0);
}

.btn-wrapper:hover .btn-contact {
  background-color: #050505;
  color: #ffffff;
  border-color: #050505;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

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
  left: 50%;
  width: 24px;
  height: 1px;
  background-color: #050505;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateX(-50%);
}

.burger-line:first-child { top: 15px; }
.burger-line:last-child { bottom: 15px; }

.burger-btn.is-active .burger-line:first-child {
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.burger-btn.is-active .burger-line:last-child {
  bottom: 50%;
  transform: translate(-50%, 50%) rotate(-45deg);
}

/* ================== УБРАНЫ АНИМАЦИИ В БЛОКАХ НИЖЕ ================== */

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  opacity: 0;
  visibility: hidden;
  /* transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); — УДАЛЕНО */
}

.mobile-menu.is-open {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 60px;
  /* Смещение вниз и анимации тоже удалены */
}

/* Блок .mobile-menu.is-open .mobile-menu-content { transform: translateY(0); } тоже удален */

.mobile-nav {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.mobile-link {
  font-size: 18.4px;
  font-weight: 500;
  color: #050505;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2.76px;
  padding: 24px 0; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.08); 
  display: block;
  width: 100%;
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
  font-size: 13.6px;
  text-transform: uppercase;
  letter-spacing: 1.36px;
  color: #888888;
}

.mobile-phone {
  font-size: 20px;
  color: #c5a059;
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 992px) {
  .desktop-nav,
  .desktop-action { display: none; }
  .burger-btn { display: block; }
  
  .header-section,
  .header-section.is-scrolled,
  .header-section.is-hidden {
    position: fixed !important;
    top: 0 !important;
    transform: none !important; 
    padding: 20px 0 !important;
    background: #ffffff !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    box-shadow: none !important;
    transition: none !important;
  }
}

@media (max-width: 768px) {
  .header-container, .mobile-menu { padding: 0 24px; }
}
</style>