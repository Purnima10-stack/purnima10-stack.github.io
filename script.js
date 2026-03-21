// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5,8,16,0.97)';
  } else {
    nav.style.background = 'rgba(5,8,16,0.85)';
  }
});

// Fade-in on scroll — robust version
const animatedEls = document.querySelectorAll(
  '.timeline-card, .project-card, .highlight-card, .cert-item, .contact-card, .skill-group, .about-text, .about-highlights'
);

// Set initial hidden state
animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Show element helper
function showEl(el) {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
}

// IntersectionObserver with generous settings
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      showEl(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

animatedEls.forEach(el => observer.observe(el));

// Hard fallback — if anything is still hidden after 1.5s, force show it
setTimeout(() => {
  animatedEls.forEach(el => showEl(el));
}, 1500);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#e8edf5' : '';
  });
});
