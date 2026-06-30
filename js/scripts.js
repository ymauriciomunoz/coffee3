/**
 * El Vagón del Café - Client-side Logic (SPA, Navigation, Forms) 
 * Integrado con estilos Tailwind y elementos de V2.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize SPA routing based on URL Hash
    initRouter();
    
    // 2. Initialize Mobile Hamburger Menu
    initMobileMenu();
  
    // 3. Handle URL hash changes
    window.addEventListener('hashchange', handleRouting);

    // 4. Navbar Styling on Scroll (Sticky Effect)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md', 'bg-brand-bg/95');
                navbar.classList.remove('py-2', 'bg-brand-bg/90');
            } else {
                navbar.classList.remove('shadow-md', 'bg-brand-bg/95');
                navbar.classList.add('py-2', 'bg-brand-bg/90');
            }
        });
    }

    // 5. Música de Fondo (Desde V2)
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            } else {
                bgMusic.play().catch(error => console.log("Error audio:", error));
                musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        bgMusic.volume = 0.2;
    }
});
  
/* ==========================================================================
    SPA ROUTER (Hash-Based) - Estricto como V1
========================================================================== */

function initRouter() {
    if (!window.location.hash) {
        window.location.hash = '#inicio';
    } else {
        handleRouting();
    }
}
  
function handleRouting() {
    const hash = window.location.hash || '#inicio';
    const targetId = hash.substring(1); 
    
    const targetSection = document.getElementById(targetId);
    if (!targetSection) {
        window.location.hash = '#inicio';
        return;
    }
    
    // Switch active section
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    targetSection.classList.add('active-section');
    
    // Switch active tab in desktop nav
    const desktopTabs = document.querySelectorAll('.nav-tab');
    desktopTabs.forEach(tab => {
        if (tab.getAttribute('data-target') === targetId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Switch active tab in mobile nav overlay
    const mobileTabs = document.querySelectorAll('.mobile-nav-tab');
    mobileTabs.forEach(tab => {
        if (tab.getAttribute('data-target') === targetId) {
            tab.classList.add('active', 'text-brand-gold');
        } else {
            tab.classList.remove('active', 'text-brand-gold');
        }
    });

    // Scroll to top smoothly on section change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
}
  
function switchTab(targetId) {
    window.location.hash = `#${targetId}`;
}
  
/* ==========================================================================
    MOBILE NAV DRAWER
========================================================================== */
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggleBtn = document.getElementById('mobile-btn');

function initMobileMenu() {
    if (mobileMenuToggleBtn && mobileMenu) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const mobileTabLinks = document.querySelectorAll('.mobile-nav-tab');
    mobileTabLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}
  
function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}
  
/* ==========================================================================
    BREWING METHODS DETAILS TOGGLE
========================================================================== */

function toggleMethodDetails(contentId, btn) {
    const content = document.getElementById(contentId);
    if (!content) return;
  
    const isOpen = content.classList.contains('open');
    const icon = btn.querySelector('i');
    const btnTextSpan = btn.querySelector('span');
    
    if (isOpen) {
        content.classList.remove('open');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        btnTextSpan.innerText = " Ver Pasos de Preparación";
        
        btn.classList.remove('bg-brand-green', 'text-white', 'hover:bg-brand-green/90');
        btn.classList.add('bg-white', 'text-brand-dark', 'border', 'border-brand-border', 'hover:border-brand-green');
    } else {
        content.classList.add('open');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        btnTextSpan.innerText = " Ocultar Pasos de Preparación";

        btn.classList.remove('bg-white', 'text-brand-dark', 'border', 'border-brand-border', 'hover:border-brand-green');
        btn.classList.add('bg-brand-green', 'text-white', 'hover:bg-brand-green/90');
    }
}
  
/* ==========================================================================
    CONTACT FORM HANDLER
========================================================================== */

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');
    
    statusMsg.className = 'form-status-msg';
    statusMsg.style.display = 'none';
    
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();
    
    if (!name || !email || !message) {
      showFormStatus('Por favor, completa todos los campos requeridos (*).', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showFormStatus('Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }
  
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando...`;
  
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      showFormStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo muy pronto.', 'success');
      form.reset();
    }, 1500);
}
  
function showFormStatus(msg, type) {
    const statusMsg = document.getElementById('form-status');
    if (!statusMsg) return;

    statusMsg.textContent = msg;
    statusMsg.classList.add(type);
    statusMsg.style.display = 'block';
}
  
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
