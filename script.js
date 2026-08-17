document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }
  
  // Check for saved theme or use preferred scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  // Theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'btn btn-outline';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.title = 'Toggle theme';
  themeToggle.style.position = 'fixed';
  themeToggle.style.top = '2rem';
  themeToggle.style.right = '2rem';
  themeToggle.style.zIndex = '1001';
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
  document.body.appendChild(themeToggle);
  
  // Update icon based on current theme
  if (document.body.getAttribute('data-theme') === 'dark') {
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }
  
  // Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    
    // Add shadow on significant scroll
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('.profile-card');
  if (heroImage) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const maxTranslate = 20;
      const translateY = (scrollPosition * 0.2) % (maxTranslate * 2) - maxTranslate;
      heroImage.style.transform = `translateY(${translateY}px)`;
    });
  }
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const activeNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', activeNavLink);
  
  // Counter animation for stats (if needed)
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.textContent);
        let current = 0;
        const increment = countTo / 50;
        const duration = 2000;
        const stepTime = duration / (countTo / increment);
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(current);
          }
        }, stepTime);
        
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(el => {
    counterObserver.observe(el);
  });
  
  // Mobile menu toggle (if needed for smaller screens)
  const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Only add mobile menu on small screens
    if (window.innerWidth < 768) {
      const navContainer = document.querySelector('.nav-container');
      navContainer.appendChild(hamburger);
    }
    
    // Recalculate on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        navLinks.classList.remove('active');
      }
    });
  };
  
  createMobileMenu();
});