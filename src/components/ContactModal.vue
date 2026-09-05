<template>
  <Transition name="modal-fade">
    <!-- Добавлен атрибут data-lenis-prevent для предотвращения скролла документа при касании модалки -->
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal" data-lenis-prevent>
      
      <div class="modal-container">
        <!-- Close Button -->
        <button class="btn-close" @click="closeModal" aria-label="Закрити">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke-width="1.5" stroke-linecap="square"/>
          </svg>
        </button>

        <div class="modal-header">
          <span class="subtitle">Контакти</span>
          <h2 class="title">Обговорити проєкт</h2>
          <p class="description">
            Оберіть зручний для вас спосіб зв'язку.
            <span class="desktop-only-text">
              <br/>Ми відповімо на всі запитання та домовимося про&nbsp;зустріч.
            </span>
          </p>
        </div>

        <div class="contact-links">
          
          <!-- PHONE -->
          <a href="tel:+380956284131" class="contact-card">
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-label">Зателефонувати</span>
              <span class="contact-value">+380 (95) 628-41-31</span>
            </div>
          </a>

          <!-- VIBER -->
          <a href="viber://chat?number=%2B380956284131" class="contact-card">
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-label">Написати у Viber</span>
              <span class="contact-value">Швидка відповідь</span>
            </div>
          </a>

          <!-- EMAIL (Smart Button) -->
          <button @click="handleEmailClick" class="contact-card btn-reset">
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="1.5" stroke-linecap="square"/>
                <path d="M22 6l-10 7L2 6" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-label" :class="{ 'text-success': isEmailCopied }">
                {{ isEmailCopied ? 'Email скопійовано!' : 'Відправити Email' }}
              </span>
              <span class="contact-value email-value">geometriya.info@gmail.com</span>
            </div>
          </button>

        </div>
      </div>
      
    </div>
  </Transition>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const isEmailCopied = ref(false);

const handleEmailClick = async () => {
  const email = 'geometriya.info@gmail.com';
  const subject = 'Обговорення проєкту';
  const body = 'Добрий день! Мене цікавить співпраця...';
  
  try {
    await navigator.clipboard.writeText(email);
    isEmailCopied.value = true;
    
    setTimeout(() => {
      isEmailCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Помилка копіювання: ', err);
  }

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

watch(() => props.isOpen, (newVal) => {
  const header = document.querySelector('.header-section');
  
  if (newVal) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden'; // Это правило также заморозит Lenis на фоне
    
    if (header) {
      header.style.paddingRight = `${scrollbarWidth}px`;
    }
  } else {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    
    if (header) {
      header.style.paddingRight = '';
    }
  }
});

onUnmounted(() => {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  const header = document.querySelector('.header-section');
  if (header) {
    header.style.paddingRight = '';
  }
});
</script>

<style scoped>
/* ==========================================================================
   OVERLAY BACKDROP
   ========================================================================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%; 
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  box-sizing: border-box; 
}

/* ==========================================================================
   MODAL CONTAINER
   ========================================================================== */
.modal-container {
  position: relative;
  width: 100%;
  max-width: 580px;
  padding: 48px;
  background: #0a0a0a; 
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ==========================================================================
   CLOSE BUTTON (X)
   ========================================================================== */
.btn-close {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0a0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #ffffff;
  color: #050505;
}

.btn-close svg {
  width: 20px;
  height: 20px;
}

/* ==========================================================================
   MODAL TYPOGRAPHY & HEADER
   ========================================================================== */
.modal-header {
  margin-bottom: 40px;
  text-align: center;
}

.subtitle {
  display: block;
  margin-bottom: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #c5a059;
}

.title {
  margin: 0 0 16px 0;
  font-size: 2.2rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #888888;
}

/* ==========================================================================
   CONTACT LIST & CARDS
   ========================================================================== */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-card {
  position: relative; 
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, border-color;
  transform: translateZ(0); /* Аппаратное ускорение */
}

.btn-reset {
  appearance: none;
  outline: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.contact-card::after {
  content: "";
  position: absolute;
  top: -15px;
  right: -15px;
  bottom: -15px;
  left: -15px;
  z-index: 0;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: #c5a059;
  transform: translateY(-4px);
}

/* ==========================================================================
   ICONS & TEXT
   ========================================================================== */
.icon-wrapper {
  position: relative; 
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; 
  width: 48px;
  height: 48px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transition: all 0.4s ease;
}

.contact-card:hover .icon-wrapper {
  color: #050505;
  background: #c5a059;
}

.icon-wrapper svg {
  width: 20px;
  height: 20px;
}

.contact-info {
  position: relative; 
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  overflow: hidden; 
}

.contact-label {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a0a0a0;
  white-space: nowrap;
  transition: color 0.4s ease;
}

.contact-card:hover .contact-label {
  color: #c5a059;
}

.contact-label.text-success {
  color: #4ade80; 
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #ffffff;
}

.email-value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==========================================================================
   VUE TRANSITION ANIMATIONS
   ========================================================================== */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .modal-container {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.modal-fade-leave-to .modal-container {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* ==========================================================================
   MOBILE RESPONSIVENESS
   ========================================================================== */
@media (max-width: 480px) {
  .modal-container {
    padding: 40px 24px 32px; 
  }
  
  .btn-close {
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
  }

  .title {
    font-size: clamp(24px, 6.5vw, 32px);
    white-space: nowrap; 
  }

  .desktop-only-text {
    display: none;
  }

  .description {
    padding: 0 10px; 
    font-size: 0.95rem;
  }

  .contact-card {
    gap: 12px; 
    padding: 16px 12px;
  }

  .contact-label {
    font-size: clamp(10px, 3.5vw, 12px);
    letter-spacing: 0.05em;
  }

  .contact-value {
    font-size: clamp(13px, 4vw, 16px);
  }
  
  .icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .icon-wrapper svg {
    width: 16px;
    height: 16px;
  }
}
</style>