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
        <div class="image-wrapper animate-on-scroll fade-up">
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
  width: 100%;
  padding: 160px 0;
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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ==========================================================================
   VISUAL ASSET (RIGHT ALIGNED)
   ========================================================================== */
.founder-visual {
  position: relative;
  z-index: 1;
  width: 65%;
  margin-left: auto; 
}

.image-wrapper {
  width: 100%;
  height: 700px;
  overflow: hidden;
  border-radius: 32px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
}

.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.founder-container:hover .founder-image {
  transform: scale(1.05);
}

/* ==========================================================================
   TEXT BLOCK (LEFT ALIGNED OVERLAY)
   ========================================================================== */
.founder-quote-box {
  position: absolute;
  left: 40px;
  z-index: 10;
  width: 45%;
  padding: 80px 72px;
  background-color: rgba(255, 255, 255, 0.85) !important; 
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.06), 0 10px 20px rgba(0, 0, 0, 0.03);
  transform: translateZ(0); 
}

.quote-title {
  position: relative;
  z-index: 2;
  margin: 0 0 24px 0;
  font-size: 35.2px;
  font-weight: 600;
  line-height: 1.2;
  color: #050505;
}

.quote-text {
  position: relative;
  z-index: 2;
  margin: 0 0 48px 0;
  font-size: 18.4px;
  font-weight: 300;
  line-height: 1.7;
  color: #4a4a4a;
}

/* ==========================================================================
   SIGNATURE DETAILS
   ========================================================================== */
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
  color: #050505;
}

.role {
  margin-top: 4px;
  font-size: 14.4px;
  color: #888888;
}

.signature-line {
  flex-grow: 1;
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

.animate-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s !important; }

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 1200px) {
  .founder-quote-box {
    width: 55%;
    padding: 64px 48px;
  }
  .founder-visual {
    width: 60%;
  }
  .image-wrapper {
    height: 600px;
  }
}

@media (max-width: 992px) {
  .founder-container {
    flex-direction: column;
    padding: 0 24px;
  }
  
  .founder-visual {
    width: 100%;
    margin-left: 0;
  }
  
  .image-wrapper {
    height: 500px;
  }

  .founder-quote-box {
    position: relative;
    left: 0;
    width: 90%;
    margin-top: -120px; 
    padding: 48px;
  }
}

@media (max-width: 768px) {
  .founder-section {
    padding: 100px 0;
  }
  
  .image-wrapper {
    height: 400px;
    border-radius: 24px;
  }

  .founder-quote-box {
    width: 95%;
    margin-top: -80px;
    padding: 40px 32px;
    border-radius: 20px;
  }

  .quote-title {
    font-size: 28px;
  }

  .quote-text {
    margin-bottom: 32px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .founder-section {
    padding: 80px 0;
  }
  
  .image-wrapper {
    height: 340px; 
    border-radius: 20px;
  }

  .founder-quote-box {
    width: calc(100% - 16px); 
    margin-top: -60px;
    padding: 32px 24px; 
    border-radius: 16px;
  }

  .quote-title {
    margin-bottom: 16px;
    font-size: 24px; 
  }

  .desktop-only-text {
    display: none;
  }

  .quote-text {
    margin-bottom: 24px;
    font-size: 15px; 
    line-height: 1.6;
  }

  .name {
    font-size: 18.4px;
  }

  .role {
    font-size: 13.6px;
  }
}
</style>