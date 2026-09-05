<template>
  <section id="portfolio" class="catalog-section">
    <!-- ==========================================================================
         HEADER
         ========================================================================== -->
    <div class="catalog-container">
      <div class="section-header">
        <span class="subtitle animate-on-scroll fade-up"
          >Мануфактура меблів GEOMETRIYA</span
        >
        <h2 class="title animate-on-scroll fade-up delay-100">
          Рішення будь-якої <br />
          складності
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
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Кухні за індивідуальними розмірами</h3>
              <p class="card-description">
                Безкоштовне проектування та підбір конфігурації. Ми враховуємо
                важливе саме для Вас і додаємо своє бачення як рекомендації з
                точки зору досвіду та практичності.
              </p>
              <span class="card-meta"
                >РЕАЛІЗАЦІЯ: 30 РОБОЧИХ ДНІВ • МОНТАЖ: 1-2 ДНІ</span
              >
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
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Гардеробні та системи зберігання</h3>
              <p class="card-description">
                Розрахунок вартості в декількох варіаціях. Ми не пропонуємо лише
                супер-преміум — ми завжди знаходимо альтернативи, щоб зробити
                практично, на довгі роки та заощадити ваш бюджет.
              </p>
              <span class="card-meta"
                >ЗАМІР, ДОСТАВКА ТА МОНТАЖ — АБСОЛЮТНО БЕЗКОШТОВНО</span
              >
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
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">
                Комплексні меблеві рішення, ЖК Паркові Озера
              </h3>
              <p class="card-description">
                Точне фабричне виробництво. Проект вирушає в роботу лише після
                технічного виміру. Попередня зборка виробів на фабриці зводить
                до мінімуму будь-які ризики та брак.
              </p>
              <span class="card-meta"
                >НАМ ПОДОБАЮТЬСЯ ЯКІСНІ МЕБЛІ, І МИ ВМІЄМО ЇХ ВИГОТОВЛЯТИ</span
              >
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
import { ref, onMounted, onUnmounted } from "vue";
import ContactModal from "./ContactModal.vue";

// State management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

// Image assets (Kitchens)
import imgKitchen1 from "../assets/kitchen-1.jpg";
import imgKitchen2 from "../assets/kitchen-2.jpg";
import imgKitchen3 from "../assets/kitchen-3.jpg";

// Image assets (Wardrobes)
import imgWardrobe1 from "../assets/гардероб-1.jpg";
import imgWardrobe2 from "../assets/гардероб-2.jpg";

// Image assets (Furniture)
import imgFurniture1 from "../assets/мебель-1.jpg";
import imgFurniture2 from "../assets/мебель-2.jpg";
import imgFurniture3 from "../assets/мебель-3.jpg";
import imgFurniture4 from "../assets/мебель-4.jpg";

const kitchenImages = [imgKitchen1, imgKitchen2, imgKitchen3];
const wardrobeImages = [imgWardrobe1, imgWardrobe2];
const furnitureImages = [
  imgFurniture1,
  imgFurniture2,
  imgFurniture3,
  imgFurniture4,
];

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
    currentKitchenIndex.value =
      (currentKitchenIndex.value + 1) % kitchenImages.length;
  }, 4000);

  wardrobeInterval = setInterval(() => {
    currentWardrobeIndex.value =
      (currentWardrobeIndex.value + 1) % wardrobeImages.length;
  }, 4500);

  furnitureInterval = setInterval(() => {
    currentFurnitureIndex.value =
      (currentFurnitureIndex.value + 1) % furnitureImages.length;
  }, 5000);

  // Initialize Intersection Observer for scroll animations
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
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
  width: 1920px;
  margin: 0px auto;
  padding-top: 140px;
  background-color: #ffffff;
  color: #050505;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ==========================================================================
   FULL-WIDTH BACKGROUND BLOCKS
   ========================================================================== */
.project-row {
  width: 1920px;
  padding: 60px 0px;
}

.bg-white {
  background-color: #ffffff;
}
.bg-gray {
  background-color: #f8f8f8;
}

.cta-row {
  padding: 80px 0px 140px 0px;
}

.catalog-container {
  width: 1400px;
  margin: 0px auto;
  padding: 0px 40px;
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
  line-height: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #a0a0a0;
}

.title {
  margin: 0px;
  font-size: 56px;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: -1px;
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
  width: 1000px;
  background-color: rgba(250, 250, 250, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 32px;
  overflow: hidden;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, box-shadow, opacity;
  transform: translateZ(0px);
}

.scatter-card:hover {
  border-color: rgba(121, 92, 70, 0.3);
  transform: translateY(-8px);
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.06);
}

.align-left {
  align-self: flex-start;
}
.align-right {
  align-self: flex-end;
}

/* ==========================================================================
   CARD VISUALS (SLIDER)
   ========================================================================== */
.card-image-wrapper {
  position: relative;
  width: 1000px;
  height: 520px;
  background-color: #f4f4f4;
  overflow: hidden;
  perspective: 1000px; /* Required for PX-based 3D scale hover effect */
}

.slider-wrapper {
  display: block;
}

.card-image {
  position: absolute;
  top: 0px;
  left: 0px;
  display: block;
  width: 1000px;
  height: 520px;
  object-fit: cover !important;
  object-position: center center !important;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateZ(0px);
}

.slider-image {
  opacity: 0;
  transition:
    opacity 1.5s ease-in-out,
    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.slider-image.is-active {
  opacity: 1;
  z-index: 2;
}

.scatter-card:hover .card-image {
  transform: translateZ(30px); /* Strict PX alternative to scale(1.03) */
}

/* ==========================================================================
   CARD CONTENT
   ========================================================================== */
.card-content {
  padding: 48px;
}

.card-title {
  margin: 0px 0px 16px 0px;
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
  color: #050505;
}

.card-description {
  width: 800px;
  margin: 0px 0px 32px 0px;
  font-size: 18px;
  line-height: 30px;
  color: #4a4a4a;
}

.card-meta {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #795c46;
}

/* ==========================================================================
   CALL TO ACTION (CTA)
   ========================================================================== */
.catalog-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1320px;
  text-align: center;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0px auto;
  padding: 0px 40px;
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
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  background-color: #050505;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow;
  transform: translateZ(0px);
}

.btn-wrapper:hover .btn-cta {
  background-color: #c5a059;
  transform: translateY(-4px);
  box-shadow: 0px 15px 30px rgba(197, 160, 89, 0.2);
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
.animate-on-scroll {
  opacity: 0;
  transition:
    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.fade-up {
  transform: translateY(40px);
}

.animate-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0px);
}

.delay-100 {
  transition-delay: 0.1s !important;
}

/* ==========================================================================
   STRICT ADAPTIVE DESIGN (ONLY PX)
   ========================================================================== */
@media (max-width: 1400px) {
  .catalog-section,
  .project-row {
    width: 1400px;
  }
  .catalog-container {
    width: 1140px;
  }
  .catalog-cta {
    width: 1060px;
  }

  .scatter-card {
    width: 850px;
  }
  .card-image-wrapper,
  .card-image {
    width: 850px;
    height: 450px;
  }
  .card-description {
    width: 700px;
  }
}

@media (max-width: 1200px) {
  .catalog-section,
  .project-row {
    width: 1200px;
  }
  .catalog-container {
    width: 960px;
  }
  .catalog-cta {
    width: 880px;
  }

  .scatter-card {
    width: 750px;
  }
  .card-image-wrapper,
  .card-image {
    width: 750px;
    height: 400px;
  }
  .card-description {
    width: 600px;
  }
}

@media (max-width: 992px) {
  .catalog-section,
  .project-row {
    width: 992px;
  }
  .catalog-container {
    width: 720px;
    padding: 0px 24px;
  }
  .catalog-cta {
    width: 672px;
  }

  /* Disable scatter effect on smaller screens for better readability */
  .scatter-card {
    width: 672px;
    align-self: center !important;
  }
  .card-image-wrapper,
  .card-image {
    width: 672px;
    height: 350px;
  }
  .card-description {
    width: 550px;
  }
}

@media (max-width: 768px) {
  .catalog-section,
  .project-row {
    width: 768px;
  }
  .catalog-container {
    width: 540px;
    padding: 0px 24px;
  }
  .catalog-cta {
    width: 492px;
  }

  .catalog-section {
    padding-top: 80px;
  }
  .project-row {
    padding: 40px 0px;
  }
  .cta-row {
    padding: 40px 0px 80px 0px;
  }
  .section-header {
    margin-bottom: 20px;
  }

  .title {
    font-size: 44px;
    line-height: 52px;
    white-space: nowrap;
  }

  .scatter-card {
    width: 492px;
  }
  .card-image-wrapper,
  .card-image {
    width: 492px;
    height: 300px;
  }
  .card-content {
    padding: 32px 24px;
  }

  .card-title {
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 32px;
  }

  /* Hide heavy description text to save vertical space on mobile */
  .card-description {
    display: none;
  }

  .btn-wrapper,
  .btn-cta {
    width: 444px;
  }
  .btn-cta {
    padding: 20px 0px;
  }
}

@media (max-width: 576px) {
  .catalog-section,
  .project-row {
    width: 576px;
  }
  .catalog-container {
    width: 320px;
    padding: 0px 10px;
  }
  .catalog-cta {
    width: 300px;
  }
  .cta-container {
    width: 300px;
    padding: 0px 10px;
  }

  .title {
    font-size: 32px;
    line-height: 40px;
  }

  .scatter-card {
    width: 300px;
  }
  .card-image-wrapper,
  .card-image {
    width: 300px;
    height: 240px;
  }

  .btn-wrapper,
  .btn-cta {
    width: 280px;
  }
  .btn-cta {
    font-size: 11px;
    padding: 20px 0px;
    white-space: nowrap;
  }
}
</style>
