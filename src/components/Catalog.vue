<template>
  <section id="portfolio" class="catalog-section">
    
    <!-- ==========================================================================
         HEADER
         ========================================================================== -->
    <div class="catalog-container">
      <div class="section-header">
        <span class="subtitle animate-on-scroll fade-up">Мануфактура меблів GEOMETRIYA</span>
        <h2 class="title animate-on-scroll fade-up delay-100">
          Рішення будь-якої <br/> складності
        </h2>
      </div>
    </div>

    <!-- ==========================================================================
         PROJECTS LAYOUT (SCATTER EFFECT)
         ========================================================================== -->
    <div class="scatter-layout">
      
      <!-- ==========================================
           PROJECT 01: KITCHENS (WHITE BG)
           ========================================== -->
      <div class="project-row bg-white">
        <div class="catalog-container row-container">
          <article class="scatter-card align-left animate-on-scroll fade-up">
            <div class="card-image-wrapper slider-wrapper">
              <img 
                v-for="(img, index) in kitchenImages" 
                :key="`kitchen-${index}`"
                :src="img" 
                alt="Кухні за індивідуальними розмірами" 
                class="card-image slider-image" 
                :class="{ 'is-active': currentKitchenIndex === index }"
                loading="lazy" 
                decoding="async"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Кухні за індивідуальними розмірами</h3>
              <p class="card-description">
                Безкоштовне проектування та підбір конфігурації. Ми враховуємо важливе саме для Вас і додаємо своє бачення як рекомендації з точки зору досвіду та практичності.
              </p>
              <span class="card-meta">РЕАЛІЗАЦІЯ: 30 РОБОЧИХ ДНІВ • МОНТАЖ: 1-2 ДНІ</span>
            </div>
          </article>
        </div>
      </div>

      <!-- ==========================================
           PROJECT 02: WARDROBES (GRAY BG)
           ========================================== -->
      <div class="project-row bg-gray">
        <div class="catalog-container row-container">
          <article class="scatter-card align-right animate-on-scroll fade-up">
            <div class="card-image-wrapper slider-wrapper">
              <img 
                v-for="(img, index) in wardrobeImages" 
                :key="`wardrobe-${index}`"
                :src="img" 
                alt="Гардеробні системи" 
                class="card-image slider-image" 
                :class="{ 'is-active': currentWardrobeIndex === index }"
                loading="lazy" 
                decoding="async"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Гардеробні та системи зберігання</h3>
              <p class="card-description">
                Розрахунок вартості в декількох варіаціях. Ми не пропонуємо лише супер-преміум — ми завжди знаходимо альтернативи, щоб зробити практично, на довгі роки та заощадити ваш бюджет.
              </p>
              <span class="card-meta">ЗАМІР, ДОСТАВКА ТА МОНТАЖ — АБСОЛЮТНО БЕЗКОШТОВНО</span>
            </div>
          </article>
        </div>
      </div>

      <!-- ==========================================
           PROJECT 03: FURNITURE (WHITE BG)
           ========================================== -->
      <div class="project-row bg-white">
        <div class="catalog-container row-container">
          <article class="scatter-card align-left animate-on-scroll fade-up">
            <div class="card-image-wrapper slider-wrapper">
              <img 
                v-for="(img, index) in furnitureImages" 
                :key="`furniture-${index}`"
                :src="img" 
                alt="Комплексні меблеві рішення, ЖК Паркові Озера" 
                class="card-image slider-image" 
                :class="{ 'is-active': currentFurnitureIndex === index }"
                loading="lazy" 
                decoding="async"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Комплексні меблеві рішення, ЖК Паркові Озера</h3>
              <p class="card-description">
                Точне фабричне виробництво. Проект вирушає в роботу лише після технічного виміру. Попередня зборка виробів на фабриці зводить до мінімуму будь-які ризики та брак.
              </p>
              <span class="card-meta">НАМ ПОДОБАЮТЬСЯ ЯКІСНІ МЕБЛІ, І МИ ВМІЄМО ЇХ ВИГОТОВЛЯТИ</span>
            </div>
          </article>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         FINAL CTA BLOCK (GRAY BG)
         ========================================================================== -->
    <div class="project-row bg-gray cta-row">
      <div class="catalog-container">
        <div class="catalog-cta">
          <div class="cta-container">
            <div class="btn-wrapper animate-on-scroll fade-up">
              <button class="btn-cta" @click="openModal">
                <span>Замовити консультацію</span>
              </button>
            </div>
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
import { ref, onMounted, onUnmounted } from 'vue';
import ContactModal from './ContactModal.vue'; 

// State management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

// Image assets (Kitchens)
import imgKitchen1 from '../assets/kitchen-1.jpg';
import imgKitchen2 from '../assets/kitchen-2.jpg';
import imgKitchen3 from '../assets/kitchen-3.jpg';

// Image assets (Wardrobes)
import imgWardrobe1 from '../assets/гардероб-1.jpg';
import imgWardrobe2 from '../assets/гардероб-2.jpg';

// Image assets (Furniture)
import imgFurniture1 from '../assets/мебель-1.jpg';
import imgFurniture2 from '../assets/мебель-2.jpg';
import imgFurniture3 from '../assets/мебель-3.jpg';
import imgFurniture4 from '../assets/мебель-4.jpg';

const kitchenImages = [imgKitchen1, imgKitchen2, imgKitchen3];
const wardrobeImages = [imgWardrobe1, imgWardrobe2];
const furnitureImages = [imgFurniture1, imgFurniture2, imgFurniture3, imgFurniture4];

// Slider state
const currentKitchenIndex = ref(0);
const currentWardrobeIndex = ref(0);
const currentFurnitureIndex = ref(0);

// Timer and Observer references
let kitchenInterval = null;
let wardrobeInterval = null;
let furnitureInterval = null;
let observer = null;

onMounted(() => {
  // Initialize asynchronous sliders to create a dynamic feel
  kitchenInterval = setInterval(() => {
    currentKitchenIndex.value = (currentKitchenIndex.value + 1) % kitchenImages.length;
  }, 4000);

  wardrobeInterval = setInterval(() => {
    currentWardrobeIndex.value = (currentWardrobeIndex.value + 1) % wardrobeImages.length;
  }, 4500);

  furnitureInterval = setInterval(() => {
    currentFurnitureIndex.value = (currentFurnitureIndex.value + 1) % furnitureImages.length;
  }, 5000);

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
  // Clean up intervals and observers to prevent memory leaks
  if (kitchenInterval) clearInterval(kitchenInterval);
  if (wardrobeInterval) clearInterval(wardrobeInterval);
  if (furnitureInterval) clearInterval(furnitureInterval);
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ==========================================================================
   BASE SECTION STYLES
   ========================================================================== */
.catalog-section {
  width: 100%;
  padding-top: 140px; 
  background-color: #ffffff; 
  color: #050505;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ==========================================================================
   FULL-WIDTH BACKGROUND BLOCKS
   ========================================================================== */
.project-row {
  width: 100%;
  padding: 60px 0; 
}

.bg-white { background-color: #ffffff; }
.bg-gray { background-color: #f8f8f8; }

.cta-row {
  padding: 80px 0 140px; 
}

.catalog-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
}

.row-container {
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   HEADER
   ========================================================================== */
.section-header {
  margin-bottom: 40px; 
  text-align: center;
}

.subtitle {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2.8px;
  color: #a0a0a0;
}

.title {
  margin: 0;
  font-size: 56px;
  font-weight: 600;
  line-height: 1.15; 
  letter-spacing: -1.12px;
  color: #795c46; 
}

/* ==========================================================================
   CARDS LAYOUT (SCATTER EFFECT)
   ========================================================================== */
.scatter-layout {
  position: relative;
  display: flex;
  flex-direction: column;
}

.scatter-card {
  width: 75%;
  background: rgba(250, 250, 250, 0.9); 
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 32px;
  overflow: hidden;
  backdrop-filter: blur(24px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03); 
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, box-shadow, opacity;
  transform: translateZ(0);
}

.scatter-card:hover {
  border-color: rgba(121, 92, 70, 0.3); 
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.06);
}

.align-left { align-self: flex-start; }
.align-right { align-self: flex-end; }

/* ==========================================================================
   CARD VISUALS (SLIDER)
   ========================================================================== */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 520px; 
  background-color: #f4f4f4; 
  overflow: hidden;
}

.slider-wrapper {
  display: block; 
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  display: block; 
  width: 100%;
  height: 100%; 
  object-fit: cover !important; 
  object-position: center center !important; 
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.slider-image {
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.slider-image.is-active {
  opacity: 1;
  z-index: 2;
}

.scatter-card:hover .card-image {
  transform: scale(1.03); 
}

/* ==========================================================================
   CARD CONTENT
   ========================================================================== */
.card-content {
  padding: 48px;
}

.card-title {
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 500;
  color: #050505; 
}

.card-description {
  max-width: 90%; 
  margin: 0 0 32px 0;
  font-size: 17.6px;
  line-height: 1.6;
  color: #4a4a4a; 
}

.card-meta {
  font-size: 13.6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.36px;
  color: #795c46; 
}

/* ==========================================================================
   CALL TO ACTION (CTA)
   ========================================================================== */
.catalog-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 0 40px;
}

.btn-wrapper {
  display: inline-flex;
  margin-top: -4px;
  padding-top: 4px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 56px; 
  font-size: 12px; 
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  background-color: #050505; 
  border: none;
  border-radius: 100px; 
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow;
  transform: translateZ(0);
}

.btn-wrapper:hover .btn-cta {
  background-color: #c5a059;
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(197, 160, 89, 0.2);
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
.animate-on-scroll {
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
@media (max-width: 1024px) {
  .scatter-card {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .catalog-section { padding-top: 80px; }
  .project-row { padding: 40px 0; }
  .cta-row { padding: 40px 0 80px; }
  .section-header { margin-bottom: 20px; }
  
  .title { 
    font-size: 38px;
    white-space: nowrap;
  }
  
  .scatter-card {
    width: 100%;
    align-self: center !important; 
  }
  .card-image-wrapper { height: 300px; }
  .card-content { padding: 32px 24px; }
  
  .card-title { 
    margin-bottom: 24px; 
    font-size: 24px; 
  }
  
  .card-description {
    display: none; 
  }
  
  .btn-wrapper, .btn-cta {
    width: 100%;
  }
  
  .btn-cta {
    padding: 20px 0; 
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 30px; 
    white-space: nowrap; 
  }
  
  .btn-cta {
    font-size: 11px; 
    white-space: nowrap;
  }
}
</style>