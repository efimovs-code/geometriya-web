<template>
  <!-- Динамически биндим точную высоту в пикселях -->
  <section class="hero-section" :style="{ minHeight: exactHeightPx + 'px' }">
    <div class="hero-container">
      
      <!-- ==========================================================================
           CONTENT BLOCK
           ========================================================================== -->
      <div class="hero-content">
        <h1 class="hero-title animate-title">
          Створюємо нові<br/>концепції
        </h1>
        
        <p class="hero-description animate-desc">
          Наша мета — наповнити кожен простір справжнім затишком,<br />
          поєднавши бездоганну естетику та абсолютний комфорт.
        </p>
        
        <div class="hero-actions animate-actions">
          <div class="btn-wrapper">
            <a href="#portfolio" class="btn btn-dark">Переглянути колекцію</a>
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

    <Teleport to="body">
      <ContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ContactModal from './ContactModal.vue';

const isModalOpen = ref(false);

// Устанавливаем базовое значение в пикселях (fallback)
const exactHeightPx = ref(900); 

const openModal = () => {
  isModalOpen.value = true;
};

// Функция для точного расчета высоты экрана в пикселях
const calculateScreenHeight = () => {
  exactHeightPx.value = window.innerHeight;
};

onMounted(() => {
  // Сразу при монтировании компонента вычисляем высоту
  calculateScreenHeight();
  
  // Добавляем слушатель изменения размера окна (если пользователь перевернет телефон)
  window.addEventListener('resize', calculateScreenHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateScreenHeight);
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
  /* min-height удален отсюда, так как теперь он задается строго в JS */
  background-color: #e6e6e6;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  perspective: 2000px; 
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 1300px;
  margin: 0px auto;
  padding: 0px 40px;
}

/* ==========================================================================
   CONTENT TYPOGRAPHY
   ========================================================================== */
.hero-content {
  display: flex;
  flex-direction: column;
  width: 650px;
}

.hero-title {
  margin: 0px 0px 24px 0px;
  font-size: 88px;
  font-weight: 600;
  color: #795c46;
  line-height: 96px;
  letter-spacing: -2px;
  white-space: nowrap; 
}

.hero-description {
  margin: 0px 0px 48px 0px;
  font-size: 20px;
  color: #4a4a4a;
  line-height: 34px;
}

/* ==========================================================================
   INTERACTIVE ELEMENTS (PILL BUTTONS)
   ========================================================================== */
.hero-actions {
  display: flex;
  gap: 20px;
  width: 650px;
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
  box-shadow: 0px 15px 30px rgba(197, 160, 89, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: #050505;
  border: 1px solid rgba(5, 5, 5, 0.3);
}

.btn-wrapper:hover .btn-outline {
  border-color: #050505;
  transform: translateY(-4px);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.08);
}

/* ==========================================================================
   3D GEOMETRY VISUALS
   ========================================================================== */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 500px;
}

.geometry-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  perspective: 1200px;
  filter: drop-shadow(0px 40px 50px rgba(121, 92, 70, 0.15));
}

.cube {
  position: absolute;
  top: 200px; 
  left: 200px;
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
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  transition: all 0.3s ease;
}

/* Outer Cube Faces */
.outer-cube .face {
  width: 280px;
  height: 280px;
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
  width: 140px;
  height: 140px;
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
  100% { opacity: 1; transform: translateY(0px); }
}

@keyframes scaleFadeIn {
  0% { opacity: 0; transform: translateZ(-300px); }
  100% { opacity: 1; transform: translateZ(0px); }
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
   STRICT ADAPTIVE DESIGN (ONLY PX)
   ========================================================================== */
@media (max-width: 1400px) {
  .hero-container { width: 1140px; }
  .hero-content { width: 550px; }
  .hero-visual { width: 450px; }
}

@media (max-width: 1200px) {
  .hero-container { width: 960px; }
  .hero-content { width: 450px; }
  .hero-title { font-size: 64px; line-height: 72px; }
  .hero-visual { width: 400px; }
}

@media (max-width: 992px) {
  .hero-container { 
    width: 720px; 
    flex-direction: column; 
    justify-content: center;
    text-align: center;
    padding: 0px 24px; 
  }
  .hero-content { 
    width: 720px; 
    align-items: center; 
  }
  .hero-title { font-size: 56px; line-height: 64px; }
  .hero-description { width: 500px; margin-bottom: 40px; }
  
  .hero-description br { display: none; }
  
  .hero-actions { justify-content: center; }
  .hero-visual { display: none; }
}

@media (max-width: 768px) {
  .hero-container { width: 540px; }
  .hero-content { width: 540px; }
}

@media (max-width: 576px) {
  .hero-container { width: 320px; padding: 0px 10px; }
  .hero-content { width: 300px; }
  .hero-title { font-size: 32px; line-height: 40px; }
  .hero-description { width: 300px; font-size: 16px; line-height: 28px; }
  
  .hero-actions { 
    flex-direction: column; 
    width: 300px; 
    gap: 16px; 
  }
  
  .btn-wrapper, .btn { 
    width: 300px; 
  }
  
  .btn { 
    padding: 18px 16px; 
    font-size: 12px; 
  }
}
</style>