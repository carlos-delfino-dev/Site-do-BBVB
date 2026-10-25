(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const main = document.querySelector('main.app-mode');
  const screens = Array.from(main.querySelectorAll(':scope > section'));
  const navLinks = Array.from(document.querySelectorAll('[data-screen]'));
  const count = document.getElementById('screenCount');
  const prev = document.getElementById('prevScreen');
  const next = document.getElementById('nextScreen');
  const labels = ['Início', 'O reality', 'Participantes', 'Temporadas', 'Inscrições', 'Administração'];
  let current = Math.max(0, screens.findIndex(s => s.id === location.hash.slice(1)));

  function showScreen(id, updateHash = true) {
    const index = screens.findIndex(s => s.id === id);
    if (index < 0) return;
    current = index;
    screens.forEach((screen, i) => {
      const active = i === current;
      screen.classList.toggle('active-screen', active);
      screen.setAttribute('aria-hidden', String(!active));
    });
    navLinks.forEach(link => {
      const active = link.dataset.screen === id;
      link.classList.toggle('active-nav', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    count.textContent = `Tela ${current + 1} de ${screens.length} · ${labels[current] || screens[current].id}`;
    prev.disabled = current === 0;
    next.disabled = current === screens.length - 1;
    if (updateHash && location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => link.addEventListener('click', event => {
    const id = link.dataset.screen;
    if (!id) return;
    event.preventDefault();
    showScreen(id);
  }));
  prev.addEventListener('click', () => { if (current > 0) showScreen(screens[current - 1].id); });
  next.addEventListener('click', () => { if (current < screens.length - 1) showScreen(screens[current + 1].id); });
  window.addEventListener('hashchange', () => showScreen(location.hash.slice(1), false));

  showScreen(screens[current]?.id || 'inicio', false);
})();

function showAdminInfo() {
  const box = document.getElementById('adminResult');
  box.textContent = 'Painel demonstrativo aberto. Para editar conteúdo e publicar alterações para todos os visitantes, conecte este site a um backend com autenticação e banco de dados.';
  box.classList.add('show');
}
