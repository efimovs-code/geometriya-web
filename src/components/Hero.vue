<template>
  <!-- Привязываем динамическую высоту в px через JS -->
  <section class="hero-section" :style="{ minHeight: heroHeight }">
    <div class="hero-container">
      
      <!-- ==========================================================================
           CONTENT BLOCK
           ========================================================================== -->
      <div class="hero-content">
        <!-- Headline -->
        <h1 class="hero-title animate-title">
          Створюємо нові<br/>концепції
        </h1>
        
        <!-- Subtitle / Description -->
        <p class="hero-description animate-desc">
          Наша мета — наповнити кожен простір справжнім затишком,<br />
          поєднавши бездоганну естетику та абсолютний комфорт.
        </p>
        
        <!-- Call to Action Buttons -->
        <div class="hero-actions animate-actions">
          <div class="btn-wrapper">
            <a 
              href="#portfolio" 
              class="btn btn-dark"
              @click="handleScrollTo($event, '#portfolio')"
            >
              Переглянути колекцію
            </a>
          </div>
          
          <div class="btn-wrapper">
            <button class="btn btn-outline" @click="openModal">Обговорити проєкт</button>
          </div>
        </div>
      </div>

      <!-- ==========================================================================
           3D GEOMETRY VISUAL
           ========================================================================== -->
      <div class="hero-visual animate-visual">
        <div class="geometry-wrapper">
          <div class="cube outer-cube">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
          <div class="cube inner-cube">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         MODAL TELEPORT
         ========================================================================== -->
    <Teleport to="body">
      <ContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import ContactModal from './ContactModal.vue';

const isModalOpen = ref(false);

const lenis = inject('lenis');

const openModal = () => {
  isModalOpen.value = true;
};

// ==========================================================================
// SMOOTH SCROLL LOGIC
// ==========================================================================
const handleScrollTo = (e, target) => {
  e.preventDefault(); 

  const isMobile = window.innerWidth <= 992;

  if (lenis && lenis.value) {
    lenis.value.scrollTo(target, {
      offset: -100, 
      // Extreme duration: 12 seconds on mobile for absolute zero-gravity float
      duration: isMobile ? 12.0 : 4.0, 
      // Power 10 curve (Decic Out) for the longest possible deceleration tail
      easing: (t) => 1 - Math.pow(1 - t, 10) 
    });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
};

// ==========================================================================
// FULLSCREEN HEIGHT LOGIC
// ==========================================================================
const heroHeight = ref('100vh'); 
let lastWidth = 0;
let resizeTimeout = null;

const calculateHeight = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }

  // Prevents Layout Thrashing on mobile scroll
  resizeTimeout = setTimeout(() => {
    const currentWidth = window.innerWidth;
    const isMobile = currentWidth <= 992;
    
    if (isMobile && currentWidth === lastWidth) {
      return; 
    }
    
    heroHeight.value = `${window.innerHeight}px`;
    lastWidth = currentWidth;
  }, 150);
};

onMounted(() => {
  heroHeight.value = `${window.innerHeight}px`;
  lastWidth = window.innerWidth;
  
  window.addEventListener('resize', calculateHeight);
});

onUnmounted(() => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  window.removeEventListener('resize', calculateHeight);
});
</script>

<style scoped>
/* ==========================================================================
   LAYOUT & TYPOGRAPHY FUNDAMENTALS
   ========================================================================== */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* Высота теперь полностью управляется через JS :style="{ minHeight: heroHeight }" */
  background-color: #e6e6e6;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ==========================================================================
   CONTENT TYPOGRAPHY
   ========================================================================== */
.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 650px;
}

.hero-title {
  margin: 0 0 24px 0;
  font-size: 88px;
  font-weight: 600;
  color: #795c46;
  line-height: 1.1;
  letter-spacing: -0.03em;
  white-space: nowrap; 
}

.hero-description {
  margin: 0 0 48px 0;
  font-size: 20px;
  color: #4a4a4a;
  line-height: 1.7;
}

/* ==========================================================================
   INTERACTIVE ELEMENTS (PILL BUTTONS)
   ========================================================================== */
.hero-actions {
  display: flex;
  gap: 20px;
}

.btn-wrapper {
  display: inline-flex;
  padding-top: 4px;
  margin-top: -4px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  white-space: nowrap; 
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow, border-color;
}

.btn-dark {
  background-color: #050505;
  color: #ffffff;
  border: 1px solid #050505;
}

.btn-wrapper:hover .btn-dark {
  background-color: #c5a059;
  border-color: #c5a059;
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(197, 160, 89, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: #050505;
  border: 1px solid rgba(5, 5, 5, 0.3);
}

.btn-wrapper:hover .btn-outline {
  border-color: #050505;
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

/* ==========================================================================
   3D GEOMETRY VISUALS
   ========================================================================== */
.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 500px;
}

.geometry-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  perspective: 1200px;
  filter: drop-shadow(0 40px 50px rgba(121, 92, 70, 0.15));
}

.cube {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
}

.outer-cube {
  width: 280px;
  height: 280px;
  margin-top: -140px;
  margin-left: -140px;
  animation: spinOuter 25s infinite linear;
}

.inner-cube {
  width: 140px;
  height: 140px;
  margin-top: -70px;
  margin-left: -70px;
  animation: spinInner 15s infinite linear reverse;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
}

/* Outer Cube Faces */
.outer-cube .face {
  border: 1px solid rgba(121, 92, 70, 0.4);
  background: rgba(121, 92, 70, 0.03);
}
.outer-cube .front  { transform: rotateY(0deg) translateZ(140px); }
.outer-cube .back   { transform: rotateY(180deg) translateZ(140px); }
.outer-cube .right  { transform: rotateY(90deg) translateZ(140px); }
.outer-cube .left   { transform: rotateY(-90deg) translateZ(140px); }
.outer-cube .top    { transform: rotateX(90deg) translateZ(140px); }
.outer-cube .bottom { transform: rotateX(-90deg) translateZ(140px); }

/* Inner Cube Faces */
.inner-cube .face {
  border: 2px solid rgba(5, 5, 5, 0.8);
  background: rgba(5, 5, 5, 0.05);
}
.inner-cube .front  { transform: rotateY(0deg) translateZ(70px); }
.inner-cube .back   { transform: rotateY(180deg) translateZ(70px); }
.inner-cube .right  { transform: rotateY(90deg) translateZ(70px); }
.inner-cube .left   { transform: rotateY(-90deg) translateZ(70px); }
.inner-cube .top    { transform: rotateX(90deg) translateZ(70px); }
.inner-cube .bottom { transform: rotateX(-90deg) translateZ(70px); }

/* ==========================================================================
   KEYFRAMES & ENTRY ANIMATIONS
   ========================================================================== */
@keyframes spinOuter {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
}

@keyframes spinInner {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(-360deg) rotateZ(360deg); }
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scaleFadeIn {
  0% { opacity: 0; transform: scale(0.8) translateZ(-100px); }
  100% { opacity: 1; transform: scale(1) translateZ(0); }
}

/* Staggered Entry Sequence */
.animate-title, .animate-desc, .animate-actions, .animate-visual {
  opacity: 0;
  will-change: transform, opacity;
}
.animate-title   { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s; }
.animate-desc    { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s; }
.animate-actions { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s; }
.animate-visual  { animation: scaleFadeIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.6s; }

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 992px) {
  .hero-container {
    justify-content: center;
    text-align: center;
    padding: 0 24px;
  }
  
  .hero-content {
    align-items: center;
    max-width: 100%;
    margin-top: 80px; /* <--- ИЗМЕНЕНИЕ ЗДЕСЬ: Отступ компенсирует высоту шапки */
  }
  
  .hero-title {
    font-size: 56px;
  }
  
  .hero-description {
    max-width: 500px;
    margin-bottom: 40px;
  }

  /* Hide <br> tags on mobile for natural text flow */
  .hero-description br {
    display: none;
  }

  .hero-visual {
    display: none;
  }
}

@media (max-width: 576px) {
  .hero-container {
    padding: 0 20px;
  }

  .hero-title {
    font-size: 38px; 
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }

  .btn-wrapper, .btn {
    width: 100%;
  }

  .btn {
    padding: 18px 16px;
    font-size: 11.5px;
  }
}
</style>