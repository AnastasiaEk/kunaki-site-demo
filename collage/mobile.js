(() => {
  const compact = window.matchMedia('(max-width: 1100px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const principles = [...document.querySelectorAll('.principle')];
  const directionLinks = [...document.querySelectorAll('a[href="#directions"]')];

  function adaptPage() {
    principles.forEach((item, index) => {
      item.open = !compact.matches || index === 0;
      item.querySelector('summary').tabIndex = compact.matches ? 0 : -1;
    });
    directionLinks.forEach(link => {
      link.setAttribute('href', compact.matches ? '#directions-overview' : '#directions');
    });
    if (typeof updateSectionNav === 'function') updateSectionNav();
  }
  principles.forEach(item => item.addEventListener('toggle', () => {
    if (compact.matches && item.open) {
      principles.forEach(other => { if (other !== item) other.open = false; });
    }
  }));
  compact.addEventListener('change', adaptPage);
  adaptPage();

  function createRail(selector, id, hint, label) {
    const track = document.querySelector(selector);
    if (!track) return;
    track.id = id;
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', label);
    const controls = document.createElement('div');
    controls.className = 'compact-rail-controls';
    controls.innerHTML = '<span class="compact-rail-hint">' + hint + '</span>' +
      '<div class="compact-rail-navigation"><button type="button" data-step="-1" aria-label="Предыдущая карточка" aria-controls="' + id + '"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button>' +
      '<span class="compact-rail-count" aria-live="polite" aria-atomic="true"></span>' +
      '<button type="button" data-step="1" aria-label="Следующая карточка" aria-controls="' + id + '"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div>';
    track.after(controls);
    const previous = controls.querySelector('[data-step="-1"]');
    const next = controls.querySelector('[data-step="1"]');
    const counter = controls.querySelector('.compact-rail-count');
    let frame;

    const items = () => [...track.children].filter(item => !item.hidden && item.getClientRects().length);
    function update() {
      frame = undefined;
      const cards = items();
      const viewport = track.getBoundingClientRect();
      const visible = cards.map((card, index) => ({ box: card.getBoundingClientRect(), index }))
        .filter(item => Math.min(viewport.right, item.box.right) - Math.max(viewport.left, item.box.left) > item.box.width * .5);
      const start = visible.length ? visible[0].index + 1 : (cards.length ? 1 : 0);
      const end = visible.length ? visible[visible.length - 1].index + 1 : start;
      const value = (start === end ? String(start) : start + '–' + end) + ' / ' + cards.length;
      if (counter.textContent !== value) counter.textContent = value;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      track.tabIndex = compact.matches ? 0 : -1;
    }
    function schedule() {
      if (frame === undefined) frame = requestAnimationFrame(update);
    }
    function move(direction) {
      const first = items()[0];
      if (!first) return;
      const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
      track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', event => {
      if (event.target !== track || !compact.matches) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    track.addEventListener('scroll', schedule, { passive: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(track);
    new MutationObserver(() => {
      track.scrollTo({ left: 0, behavior: 'auto' });
      schedule();
    }).observe(track, { attributes: true, attributeFilter: ['hidden'], subtree: true });
    compact.addEventListener('change', () => {
      track.scrollTo({ left: 0, behavior: 'auto' });
      schedule();
    });
    update();
  }
  createRail('.collage-quick-grid', 'activity-rail', 'Листайте направления', 'Направления деятельности');
  createRail('.projects-grid', 'project-rail', 'Листайте проекты', 'Проекты и инициативы');
})();
