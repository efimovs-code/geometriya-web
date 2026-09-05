<template>
  <section class="founder-section">
    <div class="founder-container">
      
      <!-- ==========================================================================
           TEXT BLOCK (OVERLAYS IMAGE)
           ========================================================================== -->
      <div class="founder-quote-box animate-on-scroll fade-up delay-100">
        
        <h2 class="quote-title">Безкомпромісність у кожному міліметрі.</h2>
        
        <p class="quote-text">
          <span>Моя головна мета — створити простір, де ідеальна геометрія та якість матеріалів відчуваються щоразу, коли ви торкаєтесь наших меблів.</span>
          <!-- Secondary text hidden on mobile screens -->
          <span class="desktop-only-text"> Я особисто контролюю кожен проєкт від першого креслення до фінального зазору на монтажі, адже за кожним об'єктом стоїть моя репутація.</span>
        </p>
        
        <div class="founder-signature">
          <div class="signature-details">
            <span class="name">Роман</span>
            <span class="role">Засновник мануфактури GEOMETRIYA</span>
          </div>
          <div class="signature-line"></div>
        </div>
      </div>

      <!-- ==========================================================================
           VISUAL BLOCK
           ========================================================================== -->
      <div class="founder-visual">
        <div class="image-wrapper animate-on-scroll scale-up">
          <img 
            src="/src/assets/founder.png" 
            alt="Роман, Засновник GEOMETRIYA" 
            class="founder-image"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let observer = null;

onMounted(() => {
  // Initialize Intersection Observer for scroll animations
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
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
.founder-section {
  padding: 160px 0px;
  background-color: #ffffff;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.founder-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 1400px;
  margin: 0px auto;
  padding: 0px 40px;
}

/* ==========================================================================
   VISUAL ASSET (RIGHT ALIGNED)
   ========================================================================== */
.founder-visual {
  position: relative;
  z-index: 1;
  width: 850px;
  margin-left: auto; 
  perspective: 1200px; /* Required for translateZ 3D scale effect */
}

.image-wrapper {
  width: 850px;
  height: 700px;
  overflow: hidden;
  border-radius: 32px;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.08);
}

.founder-image {
  width: 850px;
  height: 700px;
  object-fit: cover;
  transform: translateZ(0px); /* Strict PX alternative to scale() */
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.founder-container:hover .founder-image {
  transform: translateZ(40px); /* Strict PX alternative to scale(1.05) */
}

/* ==========================================================================
   TEXT BLOCK (LEFT ALIGNED OVERLAY)
   ========================================================================== */
.founder-quote-box {
  position: absolute;
  left: 40px;
  z-index: 10;
  width: 600px;
  padding: 80px 72px;
  
  /* ЗАЩИТА СТИЛЕЙ: Жестко фиксируем цвет и размытие для продакшена Vercel */
  background-color: rgba(255, 255, 255, 0.85) !important; 
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  box-shadow: 0px 40px 80px rgba(0, 0, 0, 0.06), 0px 10px 20px rgba(0, 0, 0, 0.03);
  transform: translateZ(0px); 
}

.quote-title {
  position: relative;
  z-index: 2;
  margin: 0px 0px 24px 0px;
  font-size: 35px;
  font-weight: 600;
  line-height: 42px;
  color: #050505;
}

.quote-text {
  position: relative;
  z-index: 2;
  margin: 0px 0px 48px 0px;
  font-size: 18px;
  font-weight: 300;
  line-height: 31px;
  color: #4a4a4a;
}

/* --- Signature Details --- */
.founder-signature {
  display: flex;
  align-items: center;
  gap: 24px;
}

.signature-details {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #050505;
}

.role {
  margin-top: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #888888;
}

.signature-line {
  width: 180px; /* Strict PX alternative to flex-grow: 1 */
  height: 1px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
.animate-on-scroll {
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, opacity;
}

.fade-up { transform: translateY(40px); }
.scale-up { transform: translateZ(-100px); } /* Strict PX alternative to scale() */

.animate-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0px) translateZ(0px); /* Reset to exact zero */
}

.delay-100 { transition-delay: 0.1s !important; }

/* ==========================================================================
   STRICT ADAPTIVE DESIGN (ONLY PX)
   ========================================================================== */
@media (max-width: 1400px) {
  .founder-container { width: 1140px; }
  .founder-quote-box { width: 550px; padding: 64px 48px; }
  .founder-visual { width: 650px; }
  .image-wrapper, .founder-image { width: 650px; height: 600px; }
}

@media (max-width: 1200px) {
  .founder-container { width: 960px; }
  .founder-quote-box { width: 480px; padding: 48px 40px; }
  .founder-visual { width: 540px; }
  .image-wrapper, .founder-image { width: 540px; height: 500px; }
  .quote-title { font-size: 30px; line-height: 38px; }
}

@media (max-width: 992px) {
  .founder-container { 
    width: 720px; 
    flex-direction: column; 
    padding: 0px 24px; 
  }
  
  .founder-visual { 
    width: 672px; 
    margin-left: 0px; 
  }
  
  .image-wrapper, .founder-image { 
    width: 672px; 
    height: 500px; 
  }

  .founder-quote-box {
    position: relative;
    left: 0px;
    width: 600px;
    margin-top: -120px; 
    padding: 48px;
  }
}

@media (max-width: 768px) {
  .founder-section { padding: 100px 0px; }
  .founder-container { width: 540px; }
  .founder-visual { width: 492px; }
  
  .image-wrapper, .founder-image { 
    width: 492px; 
    height: 400px; 
    border-radius: 24px; 
  }

  .founder-quote-box {
    width: 460px;
    margin-top: -80px;
    padding: 40px 32px;
    border-radius: 20px;
  }

  .quote-title { font-size: 28px; line-height: 36px; }
  .quote-text { margin-bottom: 32px; font-size: 16px; line-height: 28px; }
  .signature-line { width: 120px; }
}

@media (max-width: 576px) {
  .founder-section { padding: 80px 0px; }
  .founder-container { width: 320px; padding: 0px 10px; }
  .founder-visual { width: 300px; }
  
  .image-wrapper, .founder-image { 
    width: 300px; 
    height: 340px; 
    border-radius: 20px; 
  }

  .founder-quote-box {
    width: 280px; 
    margin-top: -60px;
    padding: 32px 24px; 
    border-radius: 16px;
  }

  .quote-title { margin-bottom: 16px; font-size: 24px; line-height: 32px; }
  .desktop-only-text { display: none; }
  .quote-text { margin-bottom: 24px; font-size: 15px; line-height: 24px; }
  .name { font-size: 18px; line-height: 26px; }
  .role { font-size: 13px; line-height: 18px; }
  .signature-line { width: 80px; }
}
</style>