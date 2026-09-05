<template>
  <section id="reviews" class="reviews-section">
    <div class="reviews-container">
      <!-- ==========================================================================
           SECTION HEADER
           ========================================================================== -->
      <div class="section-header">
        <span class="subtitle animate-on-scroll fade-up">Репутація</span>
        <h2 class="title animate-on-scroll fade-up delay-100">
          Що кажуть <br />
          наші клієнти
        </h2>
      </div>

      <!-- ==========================================================================
           REVIEWS GRID (STRICT PX FLEX LAYOUT)
           ========================================================================== -->
      <div class="reviews-grid">
        <article
          v-for="(review, index) in reviews"
          :key="index"
          class="review-card animate-on-scroll fade-up"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="stars">
            <svg
              v-for="i in 5"
              :key="`star-${index}-${i}`"
              class="star-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
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
          <a
            href="https://www.google.com/maps/place/%D0%9C%D0%B5%D0%B1%D0%BB%D0%B5%D0%B2%D0%B0+%D0%BC%D0%B0%D0%BD%D1%83%D1%84%D0%B0%D0%BA%D1%82%D1%83%D1%80%D0%B0+%22GEOMETRIYA%22/@50.4690227,30.5188269,17z/data=!4m8!3m7!1s0x40d4cfcd3115ee41:0xa8c04a6be81ed534!8m2!3d50.4690193!4d30.5214072!9m1!1b1!16s%2Fg%2F11ygxyjrcp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-google"
          >
            <svg
              class="google-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Читати всі відгуки на Google
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const reviews = ref([
  {
    name: "Анатолій Курочка",
    project: "Індивідуальне замовлення",
    text: "Дуже задоволений виготовленням меблів! Все зроблено якісно, акуратно та точно за розмірами. Гарний дизайн, міцні матеріали та швидке виконання. Рекомендую!",
  },
  {
    name: "Софія",
    project: "Клієнт мануфактури",
    text: "Гарне поєднання дизайну та функціональності. Видно, що робота виконана не на потік.",
  },
  {
    name: "Микита Косенчук",
    project: "Комплексне меблювання",
    text: "Меблева мануфактура, якій можна довіряти. Працюють чесно та відповідально.",
  },
]);

let observer = null;

onMounted(() => {
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
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ==========================================================================
   BASE SECTION STYLES
   ========================================================================== */
.reviews-section {
  width: 1920px;
  margin: 0px auto;
  padding: 0px 0px 120px 0px;
  background-color: #f8f8f8;
  color: #050505;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.reviews-container {
  width: 1400px;
  margin: 0px auto;
  padding: 0px 40px;
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
  line-height: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #a0a0a0;
}

.title {
  margin: 0px;
  font-size: 56px;
  font-weight: 500;
  line-height: 64px;
  letter-spacing: -1px;
  color: #795c46;
}

/* ==========================================================================
   REVIEWS GRID & CARDS
   ========================================================================== */
.reviews-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 1320px;
  margin-bottom: 64px;
}

.review-card {
  display: flex;
  flex-direction: column;
  width: 420px;
  padding: 48px 40px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 24px;
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.5s ease,
    box-shadow 0.5s ease;
  will-change: transform, border-color, box-shadow;
  transform: translateZ(0px);
}

.review-card:hover {
  border-color: rgba(197, 160, 89, 0.3);
  transform: translateY(-8px) translateZ(0px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04);
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
  margin: 0px 0px 40px 0px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
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
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: #050505;
}

.author-project {
  font-size: 14px;
  line-height: 20px;
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
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  text-decoration: none;
  color: #050505;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, background-color, box-shadow, border-color;
  transform: translateZ(0px);
}

.google-icon {
  width: 24px;
  height: 24px;
}

.btn-wrapper:hover .btn-google {
  background-color: #f0f0f0;
  border-color: #050505;
  transform: translateY(-4px) translateZ(0px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.05);
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
.delay-200 {
  transition-delay: 0.2s !important;
}

/* ==========================================================================
   STRICT ADAPTIVE DESIGN (ONLY PX)
   ========================================================================== */
@media (max-width: 1400px) {
  .reviews-section {
    width: 1400px;
  }
  .reviews-container {
    width: 1140px;
  }
  .reviews-grid {
    width: 1060px;
    gap: 32px;
  }
  .review-card {
    width: 332px;
    padding: 40px 32px;
  }
}

@media (max-width: 1200px) {
  .reviews-section {
    width: 1200px;
  }
  .reviews-container {
    width: 960px;
  }
  .reviews-grid {
    width: 880px;
    gap: 20px;
  }
  .review-card {
    width: 280px;
    padding: 32px 24px;
  }
  .review-text {
    font-size: 16px;
    line-height: 26px;
  }
}

@media (max-width: 992px) {
  .reviews-section {
    width: 992px;
  }
  .reviews-container {
    width: 720px;
  }
  .reviews-grid {
    width: 672px;
    gap: 32px;
  }
  .review-card {
    width: 320px;
    padding: 32px 24px;
  }
}

@media (max-width: 768px) {
  .reviews-section {
    width: 768px;
    padding: 0px 0px 80px 0px;
  }
  .reviews-container {
    width: 540px;
    padding: 0px 24px;
  }

  .title {
    font-size: 44px;
    line-height: 52px;
    white-space: nowrap;
  }

  .reviews-grid {
    width: 492px;
    gap: 24px;
  }

  .review-card {
    width: 492px;
    padding: 32px 24px;
    transition-delay: 0s !important;
  }

  .btn-wrapper,
  .btn-google {
    width: 492px;
  }
}

@media (max-width: 576px) {
  .reviews-section {
    width: 576px;
  }
  .reviews-container {
    width: 320px;
    padding: 0px 10px;
  }

  .title {
    font-size: 32px;
    line-height: 40px;
    white-space: nowrap;
  }

  .reviews-grid {
    width: 300px;
    gap: 24px;
  }

  .review-card {
    width: 300px;
    padding: 24px 20px;
  }

  .review-text {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 26px;
  }

  .btn-wrapper,
  .btn-google {
    width: 300px;
  }
  .btn-google {
    gap: 8px;
    padding: 16px 0px;
    font-size: 12px;
    white-space: nowrap;
  }

  .google-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
