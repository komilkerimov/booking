const img = {
  hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80',
  samarkand: 'https://images.unsplash.com/photo-1599488059455-1447df40e7f7?auto=format&fit=crop&w=1200&q=80',
  bukhara: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80',
  tashkent: 'https://images.unsplash.com/photo-1626014303757-6366ef55c4ab?auto=format&fit=crop&w=1200&q=80',
  hotel1: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  hotel2: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  hotel3: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
  contact: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80'
};

const hotels = [
  { id:'registan-palace', name:'Registan Palace Hotel', city:'Самарканд', rating:'5★', price:145, image:img.hotel1, text:'Исторический центр, завтраки, трансфер и вид на старый город.' },
  { id:'bukhara-royal', name:'Bukhara Royal Boutique', city:'Бухара', rating:'4★', price:92, image:img.hotel2, text:'Бутик-отель рядом с Ляби-Хауз, восточные интерьеры и дворик.' },
  { id:'tashkent-grand', name:'Tashkent Grand Residence', city:'Ташкент', rating:'5★', price:128, image:img.hotel3, text:'Деловой район, SPA, конференц-залы и быстрый доступ к аэропорту.' }
];
const destinations = [
  { id:'samarkand', name:'Самарканд', image:img.samarkand, text:'Регистан, гур-эмир, гастрономические туры и премиальные отели.' },
  { id:'bukhara', name:'Бухара', image:img.bukhara, text:'Медресе, караван-сараи, ремесленные маршруты и бутик-гостиницы.' },
  { id:'tashkent', name:'Ташкент', image:img.tashkent, text:'Современная столица, бизнес-поездки, шопинг и семейный отдых.' }
];

const app = document.querySelector('#app');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => { header.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', header.classList.contains('open')); });
document.body.addEventListener('click', e => { if(e.target.closest('a')) header.classList.remove('open'); });

function hero(title, subtitle, image = img.hero) {
  return `<section class="page-hero" style="background-image:url('${image}')"><div class="hero-content"><div class="eyebrow">MDK Travel</div><h1>${title}</h1><p class="lead">${subtitle}</p></div></section>`;
}
function tripFields() {
  return `<div class="field"><label>Направление</label><select name="city"><option>Самарканд</option><option>Бухара</option><option>Ташкент</option></select></div>
    <div class="field"><label>Заезд</label><input type="date" name="checkin"></div>
    <div class="field"><label>Выезд</label><input type="date" name="checkout"></div>
    <div class="field"><label>Гости</label><select name="guests"><option>1 гость</option><option selected>2 гостя</option><option>3 гостя</option><option>4 гостя</option></select></div>`;
}
function searchPanel() {
  return `<form class="search-panel" id="searchForm">${tripFields()}<button class="btn" type="submit">Найти</button></form>`;
}
function hotelCards(list = hotels) { return `<div class="grid">${list.map(h=>`<article class="card"><div class="card-img" style="background-image:url('${h.image}')"></div><div class="card-body"><div class="meta">${h.city} · ${h.rating}</div><h3>${h.name}</h3><p>${h.text}</p><p><span class="price">$${h.price}</span> / ночь</p><a class="btn btn-outline" href="#booking?hotel=${h.id}">Забронировать</a></div></article>`).join('')}</div>`; }
function destinationCards() { return `<div class="grid">${destinations.map(d=>`<article class="card"><div class="card-img" style="background-image:url('${d.image}')"></div><div class="card-body"><div class="meta">Направление</div><h3>${d.name}</h3><p>${d.text}</p><a class="btn btn-outline" href="#hotels?city=${encodeURIComponent(d.name)}">Смотреть отели</a></div></article>`).join('')}</div>`; }
function section(title, sub, body) { return `<section class="section"><div class="section-head"><div><div class="eyebrow">${sub}</div><h2>${title}</h2></div></div>${body}</section>`; }

const pages = {
  home(){return `<section class="hero" style="background-image:url('${img.hero}')"><div class="hero-content"><div class="eyebrow">Luxury hotel booking</div><h1>Путешествуйте по‑королевски</h1><p class="lead">MDK Travel подбирает отели, маршруты и сервис уровня concierge — от семейного отдыха до деловых поездок.</p><a class="btn" href="#hotels">Выбрать отель</a></div></section>${searchPanel()}${section('Популярные направления','Откройте Узбекистан',destinationCards())}${section('Рекомендуемые отели','Проверенный комфорт',hotelCards())}`},
  destinations(){return hero('Направления','Города, маршруты и впечатления, которые легко превратить в готовое путешествие.',img.samarkand)+section('Куда поехать','Выбор гостей',destinationCards())},
  hotels(){return hero('Отели','Премиальная подборка размещения с фильтрацией по городам и быстрым бронированием.',img.hotel1)+searchPanel()+section('Доступные отели','Каталог',hotelCards())},
  about(){return hero('О нас','MDK Travel объединяет локальную экспертизу, стильный сервис и прозрачное бронирование.',img.bukhara)+section('Почему выбирают нас','Сервис',`<div class="steps"><div class="card card-body"><h3>Персональный подбор</h3><p>Подбираем отели под бюджет, даты, формат поездки и предпочтения гостей.</p></div><div class="card card-body"><h3>Проверенные партнёры</h3><p>Работаем с объектами размещения, трансферами и гидами с подтверждённым качеством.</p></div><div class="card card-body"><h3>Поддержка 24/7</h3><p>Сопровождаем бронирование до выезда и помогаем с изменениями в маршруте.</p></div></div>`)},
  contacts(){return hero('Контакты','Напишите нам — подготовим подборку отелей и маршрут под ваши даты.',img.contact)+section('Связаться с MDK Travel','Контакты',`<div class="split"><div class="glass"><h3>Офис в Ташкенте</h3><p>+998 71 200 00 00<br>info@mdktravel.uz<br>Ежедневно: 09:00–21:00</p><p class="notice">Для срочных бронирований используйте телефон или форму заявки.</p></div><form class="glass form-grid" id="contactForm"><div class="field"><label>Имя</label><input required placeholder="Ваше имя"></div><div class="field"><label>Телефон</label><input required placeholder="+998"></div><div class="field full"><label>Сообщение</label><textarea rows="5" placeholder="Куда хотите поехать?"></textarea></div><button class="btn full">Отправить</button></form></div>`)},
  booking(){return hero('Бронирование','Заполните три шага — детали поездки, данные гостя и подтверждение.',img.hotel2)+section('Оформление заявки','3 шага',`<div class="steps"><div class="card card-body step active"><h3>1. Поездка</h3><p>Выберите город, даты и гостей.</p></div><div class="card card-body step"><h3>2. Гость</h3><p>Укажите контактные данные.</p></div><div class="card card-body step"><h3>3. Подтверждение</h3><p>Получите номер заявки.</p></div></div><br><form class="glass form-grid" id="bookingForm">${tripFields()}<div class="field"><label>Имя</label><input required placeholder="Имя и фамилия"></div><div class="field"><label>Телефон</label><input required placeholder="+998"></div><button class="btn full">Подтвердить бронирование</button></form>`)},
  login(){return hero('Вход','Вернитесь к сохранённым поездкам и заявкам.',img.tashkent)+authForm('Войти','Нет аккаунта?','#register')},
  register(){return hero('Регистрация','Создайте аккаунт, чтобы быстрее оформлять новые поездки.',img.tashkent)+authForm('Создать аккаунт','Уже есть аккаунт?','#login',true)},
  account(){return hero('Личный кабинет','Ваши будущие поездки, бонусы и история заявок.',img.hotel3)+section('Мои поездки','Кабинет',`<div class="tabs"><button class="tab active">Активные</button><button class="tab">История</button><button class="tab">Профиль</button></div><div class="grid"><div class="card card-body"><div class="meta">Заявка #MDK-2408</div><h3>Самарканд · 12–15 июня</h3><p>Registan Palace Hotel, 2 гостя, завтраки включены.</p><p class="notice">Ожидает подтверждения менеджера</p></div><div class="card card-body"><div class="meta">Бонусы</div><h3>1 250 MDK Points</h3><p>Используйте бонусы для апгрейда номера или трансфера.</p></div><div class="card card-body"><div class="meta">Профиль</div><h3>Komil Kerimov</h3><p>Телефон и email можно изменить через менеджера MDK Travel.</p></div></div>`)}
};
function authForm(title, linkText, link, register=false){return section(title,'Аккаунт',`<form class="glass form-grid" id="authForm">${register?'<div class="field full"><label>Имя</label><input required placeholder="Ваше имя"></div>':''}<div class="field full"><label>Email</label><input type="email" required placeholder="mail@example.com"></div><div class="field full"><label>Пароль</label><input type="password" required placeholder="••••••••"></div><button class="btn full">${title}</button><a class="link full" href="${link}">${linkText}</a></form>`)}
function render(){const page=(location.hash.replace('#','').split('?')[0]||'home');app.innerHTML=(pages[page]||pages.home)();document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${page}`));attachForms();scrollTo(0,0)}
function attachForms(){document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(form.id==='searchForm'){location.hash='hotels'}else{form.insertAdjacentHTML('afterend','<p class="notice">Заявка принята. В статической версии данные не отправляются на сервер.</p>');form.reset();}}));}
addEventListener('hashchange',render);render();
