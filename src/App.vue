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
import { onMounted, onUnmounted, provide, shallowRef } from 'vue';
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
//We use `shallowRef` and `provide` to pass Lenis to `Header.vue`.
const lenis = shallowRef(null);
provide('lenis', lenis);

let rafId;

// Global anchor link click interceptor
const handleAnchorClick = (e) => {
 
  if (e.defaultPrevented) return;

  const anchor = e.target.closest('a');
  
  if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
    const target = anchor.getAttribute('href');
    
    e.preventDefault(); 
    
    
    if (target === '#top' || target === '#') {
      lenis.value?.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
     
      lenis.value?.scrollTo(target, {
        offset: -100, 
        duration: 1.5, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  }
};

onMounted(() => {
  lenis.value = new Lenis({
    duration: 1.2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2, 
  });

  function raf(time) {
    lenis.value?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
  document.addEventListener('click', handleAnchorClick);
});

onUnmounted(() => {
  if (lenis.value) {
    lenis.value.destroy();
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
Vickory uses :deep() to reach root <section> elements 
  in the middle of the subsidiary components. This protects headers from being overwritten 
  with a fixed header when going directly to the main message (#id).
*/
:deep(section),
:deep(footer) {
  scroll-margin-top: 100px;
}
</style>