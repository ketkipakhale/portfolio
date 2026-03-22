/* ============================================================
   KETAKI PAKHALE — PORTFOLIO JAVASCRIPT
   Features: Navbar, Typewriter, Scroll Animations,
             Skill Bars, Project Filter, Contact Form,
             Scroll-to-Top Button
   ============================================================ */

/* -------------------- DOM READY -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initScrollAnimations();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initScrollTopBtn();
  initActiveNavLinks();
});

/* -------------------- NAVBAR -------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on nav link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* -------------------- ACTIVE NAV LINK ON SCROLL -------------------- */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* -------------------- TYPEWRITER EFFECT -------------------- */
function initTypewriter() {
  const phrases = [
    'Electronics & Telecom Engineer',
    'Java Developer',
    'Full-Stack Developer',
    'DSA Enthusiast',
    'Problem Solver'
  ];

  const el = document.getElementById('typedText');
  if (!el) return;

  let pIndex = 0, cIndex = 0, deleting = false;

  function type() {
    const word = phrases[pIndex];

    if (!deleting) {
      el.textContent = word.substring(0, cIndex + 1);
      cIndex++;
      if (cIndex === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      el.textContent = word.substring(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }

  type();
}

/* -------------------- SCROLL ANIMATIONS -------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* -------------------- SKILL BARS -------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* -------------------- PROJECT FILTER -------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger fade animation
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------- CONTACT FORM -------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFormMsg('Please fill in all required fields.', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showFormMsg('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate successful send
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      showFormMsg('✅ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1500);
  });

  function showFormMsg(text, type) {
    formMsg.textContent = text;
    formMsg.className = 'form-msg ' + type;
    setTimeout(() => { formMsg.textContent = ''; formMsg.className = 'form-msg'; }, 5000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* -------------------- SCROLL TO TOP BUTTON -------------------- */
function initScrollTopBtn() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------- SMOOTH SCROLL FOR ANCHOR LINKS -------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
