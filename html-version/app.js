const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    header.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', header.classList.contains('open'));
  });
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.dataset.search === 'true') {
      window.location.href = 'hotels.html';
      return;
    }
    const existing = form.parentElement?.querySelector('.js-form-notice');
    if (existing) existing.remove();
    form.insertAdjacentHTML('afterend', '<p class="notice js-form-notice">Заявка принята. В статической версии данные не отправляются на сервер.</p>');
    form.reset();
  });
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});
