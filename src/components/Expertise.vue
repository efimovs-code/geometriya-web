<template>
  <section id="expertise" class="expertise-presentation">
    
    <!-- ==========================================================================
         HEADER SECTION
         ========================================================================== -->
    <div class="expertise-intro bg-gray">
      <div class="intro-container">
        <span class="subtitle animate-on-scroll fade-up">Наші послуги</span>
        <h2 class="title animate-on-scroll fade-up delay-100">
          Експертиза, що<br/>формує простір
        </h2>
      </div>
    </div>

    <!-- ==========================================================================
         SLIDE 01: KITCHENS
         ========================================================================== -->
    <article class="expertise-slide bg-gray">
      <div class="slide-content">
        <div class="content-inner">
          <span class="slide-number" aria-hidden="true">01</span>
          <h2 class="slide-title animate-on-scroll fade-up delay-100">
            Кухні <br/> преміум-класу
          </h2>
          <p class="slide-description animate-on-scroll fade-up delay-200">
            Монолітна естетика та інженерна точність. Прихована фурнітура, фасади з натурального шпону та безшовні кам'яні стільниці, що витримують перевірку часом.
          </p>
          <button class="slide-action animate-on-scroll fade-up delay-300" @click="openModal">
            <span class="action-text">Детальніше</span>
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="slide-visual">
        <div class="image-wrapper slider-wrapper animate-on-scroll scale-up delay-200">
          <img 
            v-for="(img, index) in kitchenImages" 
            :key="`kitchen-${index}`"
            :src="img" 
            alt="Кухні преміум-класу" 
            class="slide-image slider-image" 
            :class="{ 'is-active': currentKitchenIndex === index }"
          />
        </div>
      </div>
    </article>

    <!-- ==========================================================================
         SLIDE 02: WARDROBES
         ========================================================================== -->
    <article class="expertise-slide reverse bg-white">
      <div class="slide-content">
        <div class="content-inner">
          <span class="slide-number" aria-hidden="true">02</span>
          <h2 class="slide-title animate-on-scroll fade-up delay-100">
            Гардеробні <br/> системи
          </h2>
          <p class="slide-description animate-on-scroll fade-up delay-200">
            Архітектура зберігання елітного рівня. Тоноване скло, алюмінієві профілі, преміальні механізми та інтегроване smart-освітлення для ідеального порядку.
          </p>
          <button class="slide-action animate-on-scroll fade-up delay-300" @click="openModal">
            <span class="action-text">Детальніше</span>
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="slide-visual">
        <div class="image-wrapper slider-wrapper animate-on-scroll scale-up delay-200">
          <img 
            v-for="(img, index) in garderobImages" 
            :key="`garderob-${index}`"
            :src="img" 
            alt="Гардеробні системи" 
            class="slide-image slider-image" 
            :class="{ 'is-active': currentGarderobIndex === index }"
          />
        </div>
      </div>
    </article>

    <!-- ==========================================================================
         SLIDE 03: EXCLUSIVE INTERIORS
         ========================================================================== -->
    <article class="expertise-slide bg-gray">
      <div class="slide-content">    
        <div class="content-inner">
          <span class="slide-number" aria-hidden="true">03</span>
          <h2 class="slide-title animate-on-scroll fade-up delay-100">
            Ексклюзивні <br/> інтер'єри
          </h2>
          <p class="slide-description animate-on-scroll fade-up delay-200">
            Стінові панелі, приховані двері та дизайнерські предмети меблів складної геометрії, що об'єднують весь простір будинку в єдину стилістичну концепцію.
          </p>
          <button class="slide-action animate-on-scroll fade-up delay-300" @click="openModal">
            <span class="action-text">Детальніше</span>
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="slide-visual">
        <div class="image-wrapper animate-on-scroll scale-up delay-200">
          <img src="../assets/interior-tv-wall.jpg" alt="Ексклюзивні інтер'єри" class="slide-image" />
        </div>
      </div>
    </article>

    <!-- ==========================================================================
         FINAL CTA BLOCK
         ========================================================================== -->
    <div class="expertise-cta bg-gray">
      <div class="cta-container">
        <h2 class="cta-title animate-on-scroll fade-up">
          Ваш ідеальний простір <br/> починається тут
        </h2>
        <div class="btn-wrapper animate-on-scroll fade-up delay-100">
          <button class="btn-cta" @click="openModal">
            <span>Замовити меблі</span>
          </button>
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

import imgKitchenMain from '../assets/kitchen-main.jpg';
import imgKitchenDrawers from '../assets/kitchen-drawers.jpg';
import imgKitchenUpper from '../assets/kitchen-upper-cabinets.jpg';

import imgGarderob1 from '../assets/interior-wood-slats.jpg';
import imgGarderob2 from '../assets/garderob.jpg';
import imgGarderob3 from '../assets/garderob-2.jpg';
import imgGarderob4 from '../assets/garderob-3.jpg';

const kitchenImages = [imgKitchenMain, imgKitchenDrawers, imgKitchenUpper];
const garderobImages = [imgGarderob1, imgGarderob2, imgGarderob3, imgGarderob4];

const isModalOpen = ref(false);
const currentKitchenIndex = ref(0);
const currentGarderobIndex = ref(0);

let kitchenInterval = null;
let garderobInterval = null;
let observer = null; 

const openModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  kitchenInterval = setInterval(() => {
    currentKitchenIndex.value = (currentKitchenIndex.value + 1) % kitchenImages.length;
  }, 4000);

  garderobInterval = setInterval(() => {
    currentGarderobIndex.value = (currentGarderobIndex.value + 1) % garderobImages.length;
  }, 4500);

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
  if (kitchenInterval) clearInterval(kitchenInterval);
  if (garderobInterval) clearInterval(garderobInterval);
  if (observer) observer.disconnect(); 
});
</script>

<style scoped>
/* ==========================================================================
   BASE LAYOUT & TYPOGRAPHY
   ========================================================================== */
.expertise-presentation {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg-gray {
  background-color: #f6f6f6;
}

.bg-white {
  background-color: #ffffff;
}

/* ==========================================================================
   SECTION INTRO
   ========================================================================== */
.expertise-intro {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0 60px;
  text-align: center;
}

.intro-container {
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
}

.subtitle {
  display: block;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #a0a0a0;
}

.title {
  margin: 0;
  font-size: 56px; 
  font-weight: 600;
  color: #795c46;
  line-height: 1.15; 
  letter-spacing: -1px; 
}

/* ==========================================================================
   SLIDE LAYOUT
   ========================================================================== */
.expertise-slide {
  position: relative;
  display: flex;
  align-items: center; 
  width: 100%;
  height: 720px;
  padding: 40px 0; 
  overflow: hidden;
}

.expertise-slide.reverse {
  flex-direction: row-reverse;
}

/* ==========================================================================
   CONTENT AREA (35%)
   ========================================================================== */
.slide-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
}

.content-inner {
  position: relative;
  z-index: 10;
  max-width: 600px;
  padding: 0 40px;
}

.slide-number {
  position: absolute;
  top: -80px;
  left: 0;
  font-size: 192px;
  font-weight: 700;
  color: #000000;
  opacity: 0.03;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.slide-title {
  position: relative;
  margin: 0 0 32px 0;
  font-size: 64px;
  font-weight: 600;
  color: #795c46;
  line-height: 1.1;
  letter-spacing: -1px;
}

.slide-description {
  position: relative;
  margin: 0 0 48px 0;
  font-size: 20px;
  color: #4a4a4a;
  line-height: 1.7;
}

.slide-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  color: #c5a059;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.action-text {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.action-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.slide-action:hover .action-icon {
  transform: translateX(8px);
}

.slide-action:hover .action-text {
  color: #050505;
}

/* ==========================================================================
   VISUAL AREA (65%)
   ========================================================================== */
.slide-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: 100%; 
  padding: 0 20px; 
}

.image-wrapper {
  position: relative;
  display: inline-flex; 
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 24px; 
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08); 
  transform: translateZ(0);
}

.slider-wrapper {
  display: grid; 
}

.slide-image {
  display: block;
  width: auto; 
  height: auto; 
  max-width: 100%;
  max-height: 640px; 
  object-fit: contain; 
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slider-image {
  grid-area: 1 / 1; 
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.slider-image.is-active {
  opacity: 1;
  z-index: 2;
}

.expertise-slide:hover .slide-image {
  transform: scale(1.03); 
}

/* ==========================================================================
   FINAL CTA SECTION
   ========================================================================== */
.expertise-cta {
  position: relative;
  z-index: 20; 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0; 
  padding: 100px 0 140px; 
  text-align: center;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 0 40px;
}

.cta-title {
  margin: 0 0 48px 0;
  font-size: 40px;
  font-weight: 500;
  color: #050505;
  letter-spacing: -1px;
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
  padding: 18px 48px; 
  font-size: 13px; 
  font-weight: 700; 
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff; 
  background-color: #050505; 
  border: none;
  border-radius: 100px; 
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.fade-up { transform: translateY(40px); }

.animate-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 1024px) {
  .expertise-intro {
    padding: 30px 0 40px;
  }
  .title {
    font-size: 51px; 
  }
  .slide-title {
    font-size: 48px;
  }
  .slide-description {
    font-size: 18px;
  }
  .slide-visual {
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .expertise-slide, .expertise-slide.reverse {
    flex-direction: column;
    height: auto;
    padding: 40px 0;
  }

  .slide-content, .slide-visual {
    width: 100%;
  }

  .slide-content {
    padding: 80px 24px;
  }

  .content-inner {
    max-width: 100%;
    padding: 0;
  }

  .slide-visual {
    height: 540px; 
    padding: 0 24px;
  }
  
  .slide-image {
    max-height: 540px; 
  }

  .slide-number {
    top: -40px;
    font-size: 128px;
  }
  
  .expertise-cta {
    padding: 80px 0 100px; 
  }
}

@media (max-width: 768px) {
  .expertise-intro {
    padding: 20px 0 20px; 
  }
  .intro-container {
    padding: 0 24px;
  }
  .title {
    font-size: 45px; 
  }
  .cta-title {
    margin-bottom: 32px;
    font-size: 32px;
  }
  
  .btn-wrapper, .btn-cta {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .slide-content {
    padding: 60px 24px;
  }

  .title {
    font-size: 30px; 
    white-space: nowrap; 
  }

  .slide-title {
    font-size: 40px;
  }
  .slide-description {
    font-size: 16px;
  }
  .slide-visual {
    height: 420px; 
    padding: 0 16px;
  }
  
  .slide-image {
    max-height: 420px; 
  }

  .image-wrapper {
    border-radius: 16px; 
  }
  .expertise-cta {
    padding: 60px 24px 80px; 
  }
  .cta-title {
    font-size: 26px; 
    white-space: nowrap; 
  }
  .btn-cta {
    white-space: nowrap;
  }
}
</style>