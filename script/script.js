
function enviarFormulario(event){
  if(event && event.preventDefault) event.preventDefault();
  alert('Obrigado! Mensagem recebida (demo).');
  try {
    if(event && event.target) event.target.reset();
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  const headerSection = document.querySelector('header section');
  const navMenu = document.querySelector('.nav-menu');
  let menuToggle = null;

  if(headerSection && navMenu){
    menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    headerSection.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
      navMenu?.classList.remove('active');
      menuToggle?.classList.remove('active');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const style = getComputedStyle(document.documentElement);
        const headerOffset = style.getPropertyValue('--header-height') || '72px';
        const headerPx = parseInt(headerOffset.replace('px', '')) || 72;

        const top = target.getBoundingClientRect().top + window.pageYOffset - headerPx - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = navMenu ? Array.from(navMenu.querySelectorAll('a')) : [];

  function atualizarMenuAtivo(){
    let currentId = '';
    const offsetTrigger = window.innerHeight * 0.35;

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if(rect.top <= offsetTrigger && rect.bottom >= offsetTrigger){
        currentId = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if(href === `#${currentId}`) link.classList.add('active');
    });
  }

  if (sections.length) {
    window.addEventListener('scroll', atualizarMenuAtivo);
    window.addEventListener('resize', atualizarMenuAtivo);
    atualizarMenuAtivo();
  }

  
  document.querySelectorAll('form').forEach(form => {
    if (!form.hasAttribute('data-has-handler')) {
      form.addEventListener('submit', enviarFormulario);
      form.setAttribute('data-has-handler', '1');
    }
  });
});
