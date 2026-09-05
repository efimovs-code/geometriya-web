<template>
  <footer id="footer" class="footer-section">
    <div class="footer-container">
      
      <!-- ==========================================================================
           CALL TO ACTION (CTA)
           ========================================================================== -->
      <div class="footer-cta-wrapper">
        <h2 class="footer-title animate-on-scroll fade-up">
          Ваш ідеальний простір <br/> починається з розмови.
        </h2>
        
        <p class="footer-description animate-on-scroll fade-up delay-100">
          Зв'яжіться з нами напряму — ми обговоримо ваші ідеї.
        </p>

        <!-- Premium Button -->
        <div class="btn-wrapper animate-on-scroll fade-up delay-200">
          <button class="btn-cta" @click="openModal">
            <span>Замовити меблі</span>
          </button>
        </div>
        
        <!-- ==========================================================================
             CONTACT LINKS (INLINE)
             ========================================================================== -->
        <div class="footer-contacts-inline animate-on-scroll fade-up delay-300">
          <a href="tel:+380956284131" class="minimal-link">+380 (95) 628-41-31</a>
          <a href="viber://chat?number=%2B380956284131" class="minimal-link">Viber</a>
          
          <a href="https://www.facebook.com/GEOMETRIYA.KIEV/" target="_blank" rel="noopener noreferrer" class="minimal-link">Facebook</a>
          
          <!-- SMART EMAIL BUTTON -->
          <button 
            @click="handleEmailClick" 
            class="minimal-link btn-reset" 
            :class="{ 'text-success': isEmailCopied }"
          >
            {{ isEmailCopied ? 'Email скопійовано!' : 'geometriya.info@gmail.com' }}
          </button>
        </div>
      </div>

    </div>

    <!-- ==========================================================================
         BOTTOM PANEL & COPYRIGHT
         ========================================================================== -->
    <div class="footer-bottom">
      <span class="copyright">© 2026 GEOMETRIYA. Всі права захищено.</span>
      
      <!-- Reusable Efimovs Agency Badge Component -->
      <EfimovsBadge />
    </div>

    <!-- Modal Teleportation handled within ContactModal -->
    <ContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import EfimovsBadge from './EfimovsBadge.vue'; 
import ContactModal from './ContactModal.vue'; 

const isModalOpen = ref(false);
const isEmailCopied = ref(false); 

const openModal = () => {
  isModalOpen.value = true;
};

/**
 * Handle Email Click Logic
 */
const handleEmailClick = async () => {
  const email = 'geometriya.info@gmail.com';
  const subject = 'Обговорення проєкту (GEOMETRIYA)';
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
.footer-section {
  position: relative;
  width: 100%;
  padding: 160px 0 40px;
  background-color: #f8f8f8;
  color: #050505;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.footer-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
}

/* ==========================================================================
   CALL TO ACTION (CTA)
   ========================================================================== */
.footer-cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.footer-title {
  margin: 0 0 32px 0;
  font-size: 64px;
  font-weight: 500;
  line-height: 1.05;
  color: #050505;
  letter-spacing: -1.92px;
}

.footer-description {
  max-width: 600px;
  margin: 0 0 40px 0; 
  font-size: 18.4px;
  line-height: 1.6;
  color: #666666;
}

/* --- BUTTON STYLES --- */
.btn-wrapper {
  display: inline-flex;
  margin: -4px 0 64px 0; 
  padding-top: 4px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 56px;
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
  will-change: transform, background-color, box-shadow;
  transform: translateZ(0);
}

.btn-wrapper:hover .btn-cta {
  background-color: #c5a059;
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(197, 160, 89, 0.2);
}

/* ==========================================================================
   CONTACT LINKS
   ========================================================================== */
.footer-contacts-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 56px;
}

.btn-reset {
  padding: 0;
  font-family: inherit;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
}

.minimal-link {
  position: relative;
  font-size: 24px;
  font-weight: 500;
  color: #050505;
  text-decoration: none;
  letter-spacing: -0.24px;
  transition: color 0.4s ease;
}

.minimal-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #c5a059;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
}

.minimal-link:hover {
  color: #c5a059;
}

.minimal-link:hover::after {
  width: 100%;
}

.minimal-link.text-success {
  color: #4ade80; 
}

.minimal-link.text-success::after {
  width: 100%; 
  background-color: #4ade80;
}

/* ==========================================================================
   BOTTOM PANEL
   ========================================================================== */
.footer-bottom {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  margin: 160px auto 0;
  padding: 0 40px;
  box-sizing: border-box;
}

.copyright {
  font-size: 13.6px;
  color: #888888;
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
.delay-200 { transition-delay: 0.2s !important; }
.delay-300 { transition-delay: 0.3s !important; } 

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 992px) {
  .footer-title {
    font-size: 51.2px;
  }
  
  .footer-contacts-inline {
    flex-direction: column;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 100px 0 32px;
  }
  
  .footer-container {
    padding: 0 24px;
  }

  .footer-title {
    margin-bottom: 24px;
    font-size: 38.4px;
  }

  .footer-description {
    margin-bottom: 32px;
    font-size: 16.8px;
  }

  .btn-wrapper {
    width: 100%;
    margin-bottom: 48px;
  }

  .btn-cta {
    width: 100%;
    padding: 20px 0; 
  }

  .minimal-link {
    font-size: 20px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 32px;
    margin-top: 100px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: 80px 0 32px;
  }

  .footer-title {
    font-size: 28px; /* Fixed pixel value instead of clamp */
    white-space: nowrap; 
  }

  .footer-description {
    padding: 0 10px;
    margin-bottom: 32px;
    font-size: 15px;
  }

  .btn-wrapper {
    margin-bottom: 40px;
  }

  .btn-cta {
    font-size: 11.5px;
    white-space: nowrap;
  }

  .footer-contacts-inline {
    gap: 24px; 
  }

  .minimal-link {
    font-size: 18px; /* Fixed pixel value instead of clamp */
  }

  .footer-bottom {
    margin-top: 80px; 
    gap: 24px;
  }
}
</style>