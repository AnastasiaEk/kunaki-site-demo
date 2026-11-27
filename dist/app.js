const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const dialog = $('#detail-dialog');
const dialogContent = $('#dialog-content');
let lastTrigger;
let toastTimer;
const mail = 'kunaki-ano@mail.ru';

function openDialog(content, trigger) {
  lastTrigger = trigger || document.activeElement;
  dialogContent.innerHTML = content;
  document.body.classList.add('modal-open');
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  $('.dialog-close').focus({preventScroll:true});
}
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus({preventScroll:true});
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close();});
function toast(message) {
  const el = $('.toast');
  clearTimeout(toastTimer); el.textContent = message; el.hidden = false;
  toastTimer = setTimeout(() => el.hidden = true, 4000);
}

const menuToggle = $('.menu-toggle');
function closeMenu() {menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');$('#mobile-menu').hidden = true;}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label',open?'Открыть меню':'Закрыть меню');
  $('#mobile-menu').hidden = open;
});
$$('#mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {if(event.key === 'Escape')closeMenu();});
document.addEventListener('click', event => {if(!$('.header').contains(event.target))closeMenu();});
window.matchMedia('(min-width:1101px)').addEventListener('change', event => {if(event.matches)closeMenu();});
function headerState() {$('.header').classList.toggle('scrolled', window.scrollY > 10);}
window.addEventListener('scroll',headerState,{passive:true}); headerState();

const directions = {
  social:{number:'01',title:'Социальные инициативы и волонтёрство',description:'Быть рядом — уже многое. Объединяем людей, готовых делиться временем, опытом и заботой.',items:['Добровольческая и гуманитарная деятельность','Социальная поддержка и помощь людям','Содействие социальной адаптации','Общественные и волонтёрские инициативы']},
  culture:{number:'02',title:'Культура и творчество',description:'Создаём пространство для творческого диалога. Помогаем талантам находить единомышленников, а идеям — свою аудиторию.',items:['Концерты и выставки','Музыкальные и литературные проекты','Поэзия, живопись и другие виды творчества','Культурно-просветительские мероприятия']},
  media:{number:'03',title:'Кино, музыка и медиа',description:'У каждой истории есть голос. Поддерживаем инициативы, которые позволяют услышать и увидеть друг друга.',items:['Художественные и документальные фильмы','Музыкальные и телевизионные проекты','Кинопоказы','Сценарные, издательские и творческие проекты']},
  family:{number:'04',title:'Семья, образование и просвещение',description:'Учиться, пробовать новое и проводить время вместе. Поддерживаем идеи, которые связывают поколения.',items:['Семейные мероприятия','Мастер-классы и лекции','Образовательные и просветительские программы','Мероприятия для детей и взрослых']},
  veterans:{number:'05',title:'Поддержка ветеранов боевых действий',description:'Помогаем находить новые возможности, восстанавливать социальные связи и реализовывать свои способности.',items:['Социальная адаптация','Поддержка культурной, творческой и профессиональной деятельности','Спортивные и просветительские инициативы','Содействие юридической помощи']},
  community:{number:'06',title:'Общественные и патриотические проекты',description:'Уважение к корням и открытость друг другу. Поддерживаем инициативы, сохраняющие культуру и историческую память.',items:['Межнациональное сотрудничество','Сохранение культурных традиций и исторической памяти','Военно-патриотические мероприятия','Общественные инициативы']}
};
function showDirection(key, trigger) {
  const d = directions[key]; if(!d)return;
  openDialog(`<div class="eyebrow">НАПРАВЛЕНИЕ ${d.number} / КУНАКИ</div><h2 id="dialog-title">${d.title}</h2><p>${d.description}</p><ul>${d.items.map(i=>`<li>${i}</li>`).join('')}</ul><p class="dialog-note">Направления основаны на уставе организации. Конкретные инициативы и возможности участия можно обсудить с командой.</p>`,trigger);
}
const projects = {
  pokrov:{type:'СОЦИАЛЬНАЯ ИНИЦИАТИВА · ПОКРОВ',title:'Помощь детскому дому в Покрове',body:'Одна из первых инициатив «Кунаки» — помощь в ремонте и отделке актового зала детского дома в городе Покрове.',body2:'Инициатива относится к социальным проектам организации.',note:'Свяжитесь с командой, чтобы узнать о текущем этапе проекта и возможностях участия.'},
  poetry:{type:'ПОЭЗИЯ И ТВОРЧЕСТВО · АВТОРСКИЙ ПРОЕКТ',title:'«От сердца к сердцу без брони»',body:'Поэтический и творческий проект, связанный с выступлениями перед детьми и взрослыми. Живое слово становится поводом встретиться и поговорить о важном.',body2:'Это самостоятельный авторский проект. Возможности участия и взаимодействия можно обсудить с командой.',note:'Узнать о выступлениях и обсудить сотрудничество можно, написав команде.'},
  future:{type:'ПЛАНИРУЕТСЯ · КУЛЬТУРА И МЕДИА',title:'Новые истории — впереди',body:'В перспективе «Кунаки» планируют представить творческие, музыкальные и кинематографические проекты.',body2:'Если у вас есть замысел, опыт или желание найти команду, расскажите о себе. Начать можно с короткого письма — вместе обсудим возможности сотрудничества.',note:'Этот блок посвящён планируемым направлениям. Даты и конкретные проекты пока не объявлены.'}
};
function showProject(key,trigger) {
  const p=projects[key];if(!p)return;
  openDialog(`<div class="eyebrow">${p.type}</div><h2 id="dialog-title">${p.title}</h2><p>${p.body}</p><p>${p.body2}</p><p class="dialog-note">${p.note}</p>`,trigger);
}
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  const filter=button.dataset.filter;
  $$('.project-card').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
  $('#filter-announcement').textContent=`Показано инициатив: ${$$('.project-card').filter(c=>!c.hidden).length}`;
}));

const legalText='АНО «ЦПКСИ «КУНАКИ»\nАвтономная некоммерческая организация «Центр Поддержки Культурных и Социальных Инициатив «КУНАКИ»\nИНН: 3700039908\nКПП: 370001001\nОГРН: 1263700003973\nДата регистрации: 24.08.2026\nЮридический адрес: 153003, Ивановская область, г. Иваново, ул. Зверева, д. 8\nДиректор: Овсянников Алексей Валерьевич\nЭлектронная почта: kunaki-ano@mail.ru\nТелефоны: +7 (982) 654-33-88; +7 (903) 632-69-81\nБанковские реквизиты предоставляются по запросу.';
const specialDialogs={
  manifesto:()=>`<div class="eyebrow">МАНИФЕСТ КУНАКИ</div><h2 id="dialog-title">Всё начинается<br>с человека.</h2><p>С его идеи, характера, таланта, поступка и желания что-то изменить.</p><p>Каждый человек обладает собственной силой. Но когда встречаются люди, объединённые общими ценностями и стремлением создавать что-то значимое, эта сила становится больше.</p><p>Мы верим в людей, в силу команды и в возможности, которые рождаются благодаря единству.</p><p>Мы объединяем людей, поддерживаем инициативы и помогаем идеям становиться реальностью.</p><p><strong>Потому что за каждым большим делом всегда стоят люди.</strong></p>`,
  documents:()=>`<div class="eyebrow">ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ</div><h2 id="dialog-title">Документы<br>и реквизиты</h2><p>Автономная некоммерческая организация «Центр Поддержки Культурных и Социальных Инициатив «КУНАКИ»</p><dl class="legal-list"><dt>Кратко</dt><dd>АНО «ЦПКСИ «КУНАКИ»</dd><dt>ИНН / КПП</dt><dd>3700039908 / 370001001</dd><dt>ОГРН</dt><dd>1263700003973</dd><dt>Регистрация</dt><dd>24 августа 2026 года</dd><dt>Адрес</dt><dd>153003, Ивановская область,<br>г. Иваново, ул. Зверева, д. 8</dd><dt>Директор</dt><dd>Овсянников Алексей Валерьевич</dd></dl><button class="copy-button" data-copy="legal">Скопировать реквизиты</button><p class="dialog-note">Официальные документы и банковские реквизиты предоставляются по запросу: <strong>${mail}</strong>.</p>`,
  credits:()=>`<div class="eyebrow">ВИЗУАЛЬНЫЕ МАТЕРИАЛЫ</div><h2 id="dialog-title">Об изображениях</h2><p>Сцены с людьми созданы с помощью ИИ специально для оформления сайта в российском контексте. Это иллюстрации, а не фотографии участников АНО «Кунаки», её команды или реальных проектов.</p><p>Фотографии рук за творческой работой используются как иллюстрации направлений. Они не являются фотоотчётами организации.</p><div class="credit-list"><p>Источники фотографий и сведения об иллюстрациях — в <a href="assets/photo-sources.json" target="_blank" rel="noopener noreferrer">списке визуальных материалов</a>.</p><p>Фирменный знак и логотип — из предоставленного логобука «Кунаки». Шрифт Manrope распространяется по <a href="assets/fonts/OFL.txt" target="_blank" rel="noopener noreferrer">лицензии SIL Open Font License</a>.</p></div>`
};
async function copyValue() {
  const value=legalText;
  try {
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
    else {const input=document.createElement('textarea');input.value=value;input.style.cssText='position:fixed;opacity:0';(dialog.open?dialog:document.body).append(input);input.select();const success=document.execCommand('copy');input.remove();if(!success)throw Error('copy');}
    toast('Реквизиты скопированы');
  }catch{toast('Не удалось скопировать. Выделите нужный текст вручную.');}
}
document.addEventListener('click',event=>{
  const target=event.target.closest('button');if(!target)return;
  if(target.dataset.direction)showDirection(target.dataset.direction,target);
  else if(target.dataset.project)showProject(target.dataset.project,target);
  else if(target.dataset.dialog&&specialDialogs[target.dataset.dialog])openDialog(specialDialogs[target.dataset.dialog](),target);
  else if(target.dataset.copy)copyValue();
});
// Indicate the currently visible section in both navigation menus.
const sectionNavLinks = $$('.desktop-nav a[href^="#"], #mobile-menu a[href^="#"]');
const pageSections = $$('main section[id]');
let sectionNavFrame = false;
function updateSectionNav(){
  let current = '';
  const threshold = $('.header').offsetHeight + 90;
  pageSections.forEach(section=>{if(section.getBoundingClientRect().top <= threshold)current = section.id;});
  sectionNavLinks.forEach(link=>{if(link.hash === '#' + current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  sectionNavFrame = false;
}
window.addEventListener('scroll',()=>{if(!sectionNavFrame){sectionNavFrame=true;requestAnimationFrame(updateSectionNav);}},{passive:true});
updateSectionNav();
