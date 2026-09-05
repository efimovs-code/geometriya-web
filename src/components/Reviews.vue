<template>
  <section id="reviews" class="reviews-section">
    <div class="reviews-container">
      
      <!-- ==========================================================================
           SECTION HEADER
           ========================================================================== -->
      <div class="section-header">
        <span class="subtitle animate-on-scroll fade-up">Репутація</span>
        <h2 class="title animate-on-scroll fade-up delay-100">
          Що кажуть <br/> наші клієнти
        </h2>
      </div>

      <!-- ==========================================================================
           REVIEWS GRID
           ========================================================================== -->
      <div class="reviews-grid">
        <article 
          v-for="(review, index) in reviews" 
          :key="index" 
          class="review-card animate-on-scroll fade-up"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="stars">
            <svg v-for="i in 5" :key="`star-${index}-${i}`" class="star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          
          <p class="review-text">«{{ review.text }}»</p>
          
          <div class="review-author">
            <span class="author-name">{{ review.name }}</span>
            <span class="author-project">{{ review.project }}</span>
          </div>
        </article>
      </div>

      <!-- ==========================================================================
           ACTION BUTTON (GOOGLE REVIEWS)
           ========================================================================== -->
      <div class="reviews-action">
        <div class="btn-wrapper animate-on-scroll fade-up delay-200">
          <a href="https://www.google.com/maps/place/..." target="_blank" rel="noopener noreferrer" class="btn-google">
            <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Читати всі відгуки на Google
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const reviews = ref([
  {
    name: "Анатолій Курочка",
    project: "Індивідуальне замовлення",
    text: "Дуже задоволений виготовленням меблів! Все зроблено якісно, акуратно та точно за розмірами. Гарний дизайн, міцні матеріали та швидке виконання. Рекомендую!"
  },
  {
    name: "Софія",
    project: "Клієнт мануфактури",
    text: "Гарне поєднання дизайну та функціональності. Видно, що робота виконана не на потік."
  },
  {
    name: "Микита Косенчук",
    project: "Комплексне меблювання",
    text: "Меблева мануфактура, якій можна довіряти. Працюють чесно та відповідально."
  }
]);

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
   BASE SECTION STYLES
   ========================================================================== */
.reviews-section {
  width: 100%;
  padding: 120px 0;
  background-color: #f8f8f8; 
  color: #050505; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.reviews-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ==========================================================================
   SECTION HEADER
   ========================================================================== */
.section-header {
  margin-bottom: 80px;
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
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -1.12px;
  color: #795c46; 
}

/* ==========================================================================
   REVIEWS GRID & CARDS
   ========================================================================== */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 64px;
}

.review-card {
  display: flex;
  flex-direction: column;
  padding: 48px 40px;
  background: #ffffff; 
  border: 1px solid rgba(0, 0, 0, 0.03); 
  border-radius: 24px;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease, box-shadow 0.5s ease;
  will-change: transform, border-color, box-shadow;
  transform: translateZ(0);
}

.review-card:hover {
  border-color: rgba(197, 160, 89, 0.3); 
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04); 
}

.stars {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
}

.star-icon {
  width: 20px;
  height: 20px;
  color: #c5a059;
}

.review-text {
  flex-grow: 1;
  margin: 0 0 40px 0;
  font-size: 17.6px;
  font-weight: 400; 
  line-height: 1.7;
  color: #4a4a4a; 
}

.review-author {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05); 
}

.author-name {
  font-size: 17.6px;
  font-weight: 500;
  color: #050505; 
}

.author-project {
  font-size: 13.6px;
  color: #888888; 
}

/* ==========================================================================
   CALL TO ACTION BUTTON (GOOGLE REVIEWS)
   ========================================================================== */
.reviews-action {
  display: flex;
  justify-content: center;
}

.btn-wrapper {
  display: inline-flex;
  margin-top: -4px;
  padding-top: 4px;
}

.btn-google {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  font-size: 15.2px;
  font-weight: 500;
  text-decoration: none;
  color: #050505; 
  background-color: #ffffff; 
  border: 1px solid rgba(0, 0, 0, 0.05); 
  border-radius: 100px; 
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow, border-color;
  transform: translateZ(0);
}

.google-icon {
  width: 24px;
  height: 24px;
}

.btn-wrapper:hover .btn-google {
  background-color: #f0f0f0; 
  border-color: #050505; 
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
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
.delay-200 { transition-delay: 0.2s !important; }

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 80px 0;
  }
  
  .reviews-container {
    padding: 0 24px;
  }
  
  .title {
    font-size: 38px;
    white-space: nowrap;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .review-card {
    padding: 32px 24px;
    transition-delay: 0s !important;
  }
  
  .btn-wrapper, .btn-google {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 30px;
    white-space: nowrap;
  }

  .review-card {
    padding: 24px 20px;
  }

  .review-text {
    margin-bottom: 24px;
    font-size: 16px; 
  }

  .btn-google {
    gap: 8px; 
    padding: 16px 0; 
    font-size: 11.5px;
    white-space: nowrap;
  }

  .google-icon {
    width: 20px;
    height: 20px;
  }
}
</style>