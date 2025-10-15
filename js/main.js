/**
 * BPCA Website - Main JavaScript
 * Brickell Place Condominium Association
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  
  const GALLERY_IMAGES = [
    { src: 'images/gallery/DJI_0282.jpg', alt: 'Aerial view of Brickell Place waterfront and marina' },
    { src: 'images/gallery/DJI_0283.jpg', alt: 'Brickell Place towers and marina from above' },
    { src: 'images/gallery/DJI_0284.jpg', alt: 'Waterfront view of Brickell Place' },
    { src: 'images/gallery/DJI_0285.jpg', alt: 'Brickell Place community overview' },
    { src: 'images/gallery/DJI_0286.jpg', alt: 'Marina and boat slips at Brickell Place' },
    { src: 'images/gallery/DJI_0369.jpg', alt: 'Aerial perspective of both towers' },
    { src: 'images/gallery/DJI_0370.jpg', alt: 'Brickell Place waterfront amenities' },
    { src: 'images/gallery/DJI_0371.jpg', alt: 'Community facilities and grounds' },
    { src: 'images/gallery/DJI_0372.jpg', alt: 'Brickell Place and Miami skyline' },
    { src: 'images/gallery/DJI_0787.jpg', alt: 'Panoramic view of Brickell Place' },
    { src: 'images/gallery/DJI_0789.jpg', alt: 'Waterfront living at Brickell Place' },
    { src: 'images/gallery/DJI_0790.jpg', alt: 'Brickell Place marina and facilities' }
  ];

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  /**
   * Debounce function to limit function calls
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Check if element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed header
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  
  function initHeaderScroll() {
    const header = document.getElementById('header');
    
    function updateHeader() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', debounce(updateHeader, 10));
    updateHeader(); // Initial check
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  
  function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    function updateBackToTop() {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    window.addEventListener('scroll', debounce(updateBackToTop, 100));
    updateBackToTop(); // Initial check
  }

  // ============================================
  // GALLERY
  // ============================================
  
  function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!galleryGrid) return;
    
    // Create gallery items
    GALLERY_IMAGES.forEach((image, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', index);
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.loading = 'lazy';
      
      item.appendChild(img);
      item.addEventListener('click', () => openLightbox(index));
      
      galleryGrid.appendChild(item);
    });
  }

  // ============================================
  // LIGHTBOX
  // ============================================
  
  let currentLightboxIndex = 0;
  
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeButton = lightbox.querySelector('.lightbox-close');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    
    if (!lightbox) return;
    
    // Close lightbox
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Navigation
    prevButton.addEventListener('click', () => navigateLightbox(-1));
    nextButton.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
  
  function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    
    currentLightboxIndex = index;
    lightboxImage.src = GALLERY_IMAGES[index].src;
    lightboxImage.alt = GALLERY_IMAGES[index].alt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    // Wrap around
    if (currentLightboxIndex < 0) {
      currentLightboxIndex = GALLERY_IMAGES.length - 1;
    } else if (currentLightboxIndex >= GALLERY_IMAGES.length) {
      currentLightboxIndex = 0;
    }
    
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = GALLERY_IMAGES[currentLightboxIndex].src;
    lightboxImage.alt = GALLERY_IMAGES[currentLightboxIndex].alt;
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  
  function initLazyLoading() {
    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });
      
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .stat-card, .building-card');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
      });
    }
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  
  function initMobileMenu() {
    // Check if we need mobile menu (screen width < 768px)
    if (window.innerWidth >= 768) return;
    
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.site-nav');
    
    // Create mobile menu toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle menu');
    toggleButton.innerHTML = '☰';
    
    header.appendChild(toggleButton);
    
    // Toggle menu
    toggleButton.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggleButton.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggleButton.innerHTML = '☰';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggleButton.contains(e.target)) {
        nav.classList.remove('active');
        toggleButton.innerHTML = '☰';
      }
    });
  }

  // ============================================
  // FORM VALIDATION (if forms are added later)
  // ============================================
  
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  }

  // ============================================
  // EXTERNAL LINKS
  // ============================================
  
  function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
      // Ensure security attributes
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  
  function logPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            console.log('DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart), 'ms');
          }
        }, 0);
      });
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Initialize all features
    initSmoothScroll();
    initHeaderScroll();
    initBackToTop();
    initGallery();
    initLightbox();
    initLazyLoading();
    initScrollAnimations();
    initMobileMenu();
    initFormValidation();
    initExternalLinks();
    
    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      logPerformance();
    }
    
    console.log('Brickell Place website initialized successfully');
  }

  // Start initialization
  init();

})();
