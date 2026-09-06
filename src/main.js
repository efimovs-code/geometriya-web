import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// ==========================================================================
// ОТЛОЖЕННАЯ ЗАГРУЗКА GOOGLE ANALYTICS (PERFORMANCE OPTIMIZATION)
// ==========================================================================
// We wait 3.5 seconds after the application is rendered for Google Scripts to run.
// did not block the browser's main thread.
setTimeout(() => {
  const GA_ID = 'G-XXXXXXXXXX'; //

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag; 
  
  gtag('js', new Date());
  gtag('config', GA_ID, {
    page_path: window.location.pathname,
  });
}, 3500);