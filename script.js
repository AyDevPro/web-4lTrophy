// AOS init
AOS.init({ once:true, duration:700, easing:'ease-out-cubic' });

// Marquer le lien actif dans la navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
