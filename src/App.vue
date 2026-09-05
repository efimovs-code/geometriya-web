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
// ==========================================================================
// COMPONENT IMPORTS (Ordered by rendering sequence)
// ==========================================================================
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Expertise from './components/Expertise.vue';
import Catalog from './components/Catalog.vue';
import Reviews from './components/Reviews.vue';
import Founder from './components/Founder.vue';
import Footer from './components/Footer.vue';
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