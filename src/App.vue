<template>
  <main class="app-container">
    <!-- ==========================================================================
         GLOBAL HEADER
         ========================================================================== -->
    <Header />

    <!-- ==========================================================================
         PAGE COMPONENTS (Rendered in natural flow)
         ========================================================================== -->
    <Hero />
    <Expertise />
    <Catalog />
    <Reviews />
    <Founder />
    
    <!-- ==========================================================================
         GLOBAL FOOTER
         ========================================================================== -->
    <Footer />
  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';

// ==========================================================================
// COMPONENT IMPORTS
// ==========================================================================
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Expertise from './components/Expertise.vue';
import Catalog from './components/Catalog.vue';
import Reviews from './components/Reviews.vue';
import Founder from './components/Founder.vue';
import Footer from './components/Footer.vue';

// ==========================================================================
// LENIS SMOOTH SCROLL INITIALIZATION
// ==========================================================================
let lenis;
let rafId;

// Глобальный перехватчик кликов по якорным ссылкам
const handleAnchorClick = (e) => {
  const anchor = e.target.closest('a');
  
  if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
    const target = anchor.getAttribute('href');
    
    e.preventDefault(); // Отключаем нативный браузерный прыжок
    
    // Если клик по логотипу (вверх)
    if (target === '#top' || target === '#') {
      lenis.scrollTo(0, {
        duration: 1.5, // Увеличено для более мягкого эффекта
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      // Скролл к секциям
      lenis.scrollTo(target, {
        offset: -100, 
        duration: 1.5, // Увеличено для более мягкого эффекта
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  }
};

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2, 
  });

  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
  document.addEventListener('click', handleAnchorClick);
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  document.removeEventListener('click', handleAnchorClick);
});
</script>

<style scoped>
/* ==========================================================================
   APP CONTAINER (GLOBAL ROOT)
   ========================================================================== */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  /* Global font family fallback */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ==========================================================================
   SMOOTH SCROLL OFFSET FIX
   ========================================================================== */
/* 
  Використовуємо :deep(), щоб достукатися до кореневих елементів <section> 
  всередині дочірніх компонентів. Це захищає заголовки від перекриття 
  фіксованою шапкою при прямому переході за якірним посиланням (#id).
*/
:deep(section),
:deep(footer) {
  scroll-margin-top: 100px;
}
</style>