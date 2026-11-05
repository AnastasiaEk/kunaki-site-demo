const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const dialog = $('#detail-dialog');
const dialogContent = $('#dialog-content');
let lastTrigger;
let toastTimer;
const mail = 'stroiti-gk@mail.ru';
const escapeHTML = value => String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));

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
  openDialog(`<div class="eyebrow">НАПРАВЛЕНИЕ ${d.number} / КУНАКИ</div><h2 id="dialog-title">${d.title}</h2><p>${d.description}</p><ul>${d.items.map(i=>`<li>${i}</li>`).join('')}</ul><p class="dialog-note">Направления основаны на уставе организации. Конкретные инициативы и возможности участия можно обсудить с командой.</p><button class="button" data-join="volunteer">Хочу присоединиться <span aria-hidden="true">↗</span></button>`,trigger);
}
const projects = {
  pokrov:{type:'СОЦИАЛЬНАЯ ИНИЦИАТИВА · ПОКРОВ',title:'Пространство для детства',body:'Одна из первых инициатив «Кунаки» — помощь в ремонте и отделке актового зала детского дома в городе Покрове.',body2:'Общее пространство важно для встреч, праздников и творчества. Объединяя людей и их профессиональные навыки, можно сделать его уютнее и удобнее.',note:'Свяжитесь с командой, чтобы узнать о текущем этапе проекта и возможностях участия.',cta:'Обсудить участие'},
  poetry:{type:'ПОЭЗИЯ И ТВОРЧЕСТВО · АВТОРСКИЙ ПРОЕКТ',title:'«От сердца к сердцу без брони»',body:'Поэтический и творческий проект, связанный с выступлениями перед детьми и взрослыми. Живое слово становится поводом встретиться и поговорить о важном.',body2:'Это самостоятельный авторский проект. Команда «Кунаки» расскажет о его программе и возможностях взаимодействия.',note:'Узнать о выступлениях и обсудить сотрудничество можно, написав команде.',cta:'Узнать о проекте'},
  future:{type:'ПЛАНИРУЕТСЯ · КУЛЬТУРА И МЕДИА',title:'Новые истории — впереди',body:'В перспективе «Кунаки» планируют представить творческие, музыкальные и кинематографические проекты.',body2:'Если у вас есть замысел, опыт или желание найти команду, расскажите о себе. Начать можно с короткого письма — вместе обсудим возможности сотрудничества.',note:'Этот блок посвящён планируемым направлениям. Даты и конкретные проекты пока не объявлены.',cta:'Предложить идею'}
};
function showProject(key,trigger) {
  const p=projects[key];if(!p)return;
  openDialog(`<div class="eyebrow">${p.type}</div><h2 id="dialog-title">${p.title}</h2><p>${p.body}</p><p>${p.body2}</p><p class="dialog-note">${p.note}</p><button class="button" data-join="${key==='future'?'idea':'volunteer'}">${p.cta} <span aria-hidden="true">↗</span></button>`,trigger);
}
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  const filter=button.dataset.filter;
  $$('.project-card').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
  $('#filter-announcement').textContent=`Показано инициатив: ${$$('.project-card').filter(c=>!c.hidden).length}`;
}));

const joinTypes = {
  idea:{eyebrow:'ДАВАЙТЕ СОЗДАВАТЬ ВМЕСТЕ',title:'У хороших идей<br>должна быть команда.',description:'Расскажите, что хотите сделать и какой поддержки не хватает. Обсудим, как можем быть полезны друг другу.',subject:'Хочу предложить идею — Кунаки',label:'Ваша идея',placeholder:'Что вы хотите создать? Кому это поможет?'},
  volunteer:{eyebrow:'ВАШЕ УЧАСТИЕ ИМЕЕТ ЗНАЧЕНИЕ',title:'Найдём дело<br>по вашим силам.',description:'Расскажите о себе, своих навыках и о том, чем хотели бы помогать. Команда обсудит с вами возможности участия.',subject:'Хочу присоединиться — Кунаки',label:'Немного о вас',placeholder:'Что вам интересно? Чем вы готовы помочь?'},
  partner:{eyebrow:'ПАРТНЁРСТВО НА ОБЩИХ ЦЕННОСТЯХ',title:'Объединим<br>наши возможности.',description:'Совместные инициативы, профессиональный опыт, материалы или информационная поддержка — обсудим подходящий формат сотрудничества.',subject:'Предложение о партнёрстве — Кунаки',label:'О сотрудничестве',placeholder:'Расскажите об организации и предложении'}
};
function showJoin(type,trigger) {
  closeMenu();
  if(type==='support'){
    openDialog(`<div class="eyebrow">ПОМОЧЬ МОЖНО ПО-РАЗНОМУ</div><h2 id="dialog-title">Ваша поддержка<br>становится делом.</h2><p>Можно поделиться временем и навыками, помочь материалами, предложить сотрудничество или обсудить финансовую поддержку конкретной инициативы.</p><div class="document-links"><button class="text-button" data-join="volunteer">Помочь делом ↗</button><button class="text-button" data-join="partner">Стать партнёром ↗</button></div><p class="dialog-note">Приём пожертвований на сайте пока не подключён. Для обсуждения финансовой поддержки и получения банковских реквизитов свяжитесь с командой.</p><div class="dialog-contact"><a href="mailto:${mail}?subject=${encodeURIComponent('Хочу поддержать Кунаки')}">${mail} ↗</a><a href="tel:+79826543388">+7 (982) 654-33-88</a></div><button class="copy-button" data-copy="email">Скопировать электронную почту</button>`,trigger);return;
  }
  const j=joinTypes[type]||joinTypes.idea;
  openDialog(`<div class="eyebrow">${j.eyebrow}</div><h2 id="dialog-title">${j.title}</h2><p>${j.description}</p><form class="join-form" data-subject="${j.subject}"><label>Как к вам обращаться<input name="name" autocomplete="name" required maxlength="100" placeholder="Ваше имя"></label><label>Как с вами связаться<input name="contact" autocomplete="email" required maxlength="160" placeholder="Телефон или электронная почта"></label><label>${j.label}<textarea name="message" required maxlength="5000" placeholder="${j.placeholder}"></textarea></label><button class="button" type="submit">Открыть письмо <span aria-hidden="true">↗</span></button><p class="form-note">Откроется ваше почтовое приложение с готовым письмом на <a href="mailto:${mail}">${mail}</a>. Проверьте его и отправьте самостоятельно. Сайт не сохраняет данные формы.</p></form><div class="email-fallback" hidden></div>`,trigger);
}

const legalText='АНО «ЦПКСИ «КУНАКИ»\nАвтономная некоммерческая организация «Центр Поддержки Культурных и Социальных Инициатив «КУНАКИ»\nИНН: 3700039908\nКПП: 370001001\nОГРН: 1263700003973\nДата регистрации: 24.08.2026\nЮридический адрес: 153003, Ивановская область, г. Иваново, ул. Зверева, д. 8\nДиректор: Овсянников Алексей Валерьевич\nЭлектронная почта: stroiti-gk@mail.ru\nТелефоны: +7 (982) 654-33-88; +7 (903) 632-69-81\nБанковские реквизиты предоставляются по запросу.';
const specialDialogs={
  manifesto:()=>`<div class="eyebrow">МАНИФЕСТ КУНАКИ</div><h2 id="dialog-title">Всё начинается<br>с человека.</h2><p>С его идеи, характера, таланта, поступка и желания что-то изменить.</p><p>Каждый человек обладает собственной силой, но именно взаимодействие людей позволяет этой силе превращаться в нечто большее.</p><p>Мы верим, что настоящие возможности рождаются там, где встречаются единомышленники, объединённые общими ценностями и стремлением создавать что-то значимое.</p><p>Мы объединяем людей, поддерживаем инициативы и помогаем идеям становиться реальностью.</p><p><strong>Потому что за каждым большим делом всегда стоят люди.</strong></p><button class="button" data-join="volunteer">Стать частью команды <span aria-hidden="true">↗</span></button>`,
  documents:()=>`<div class="eyebrow">ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ</div><h2 id="dialog-title">Документы<br>и реквизиты</h2><p>Автономная некоммерческая организация «Центр Поддержки Культурных и Социальных Инициатив «КУНАКИ»</p><dl class="legal-list"><dt>Кратко</dt><dd>АНО «ЦПКСИ «КУНАКИ»</dd><dt>ИНН / КПП</dt><dd>3700039908 / 370001001</dd><dt>ОГРН</dt><dd>1263700003973</dd><dt>Регистрация</dt><dd>24 августа 2026 года</dd><dt>Адрес</dt><dd>153003, Ивановская область,<br>г. Иваново, ул. Зверева, д. 8</dd><dt>Директор</dt><dd>Овсянников Алексей Валерьевич</dd></dl><div class="document-links"><a href="mailto:stroiti-gk@mail.ru?subject=%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D1%83%D1%81%D1%82%D0%B0%D0%B2%D0%B0%20%D0%9A%D1%83%D0%BD%D0%B0%D0%BA%D0%B8">Запросить устав ↗</a><a href="mailto:stroiti-gk@mail.ru?subject=%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B8%20%D0%9A%D1%83%D0%BD%D0%B0%D0%BA%D0%B8">Запросить карточку организации ↗</a></div><button class="copy-button" data-copy="legal">Скопировать реквизиты</button><p class="dialog-note">Официальные документы и банковские реквизиты предоставляются по запросу: <a href="mailto:${mail}">${mail}</a>.</p>`,
  credits:()=>`<div class="eyebrow">ОБ ИЗОБРАЖЕНИЯХ</div><h2 id="dialog-title">Истории в коллаже</h2><p>Панорамы регионов и чёрно-белые руки — художественные иллюстрации, созданные с помощью ИИ для этой вариации сайта. Это не фотоотчёты о проектах и не сведения о географии работы АНО.</p><p>Изображения людей в остальных разделах также иллюстративные. Они не являются портретами команды.</p><div class="credit-list"><p><a href="assets/collage-sources.json" target="_blank" rel="noopener noreferrer">Происхождение коллажей</a> · <a href="../assets/photo-sources.json" target="_blank" rel="noopener noreferrer">Другие изображения</a></p><p>Знак солнца и леттеринг извлечены из оригинального логобука. Обратный белый леттеринг соответствует утверждённой версии на зелёном.</p><p>Шрифт Manrope: <a href="../assets/fonts/OFL.txt" target="_blank" rel="noopener noreferrer">лицензия SIL Open Font License</a>.</p></div>`
};
async function copyValue(key) {
  const value=key==='legal'?legalText:mail;
  try {
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);
    else {const input=document.createElement('textarea');input.value=value;input.style.cssText='position:fixed;opacity:0';(dialog.open?dialog:document.body).append(input);input.select();const success=document.execCommand('copy');input.remove();if(!success)throw Error('copy');}
    toast(key==='legal'?'Реквизиты скопированы':'Электронная почта скопирована');
  }catch{toast('Не удалось скопировать. Выделите нужный текст вручную.');}
}
document.addEventListener('click',event=>{
  const target=event.target.closest('button');if(!target)return;
  if(target.dataset.direction)showDirection(target.dataset.direction,target);
  else if(target.dataset.project)showProject(target.dataset.project,target);
  else if(target.dataset.join)showJoin(target.dataset.join,dialog.open?lastTrigger:target);
  else if(target.dataset.dialog&&specialDialogs[target.dataset.dialog])openDialog(specialDialogs[target.dataset.dialog](),target);
  else if(target.dataset.copy)copyValue(target.dataset.copy);
});
document.addEventListener('submit',event=>{
  const form=event.target.closest('.join-form');if(!form)return;
  event.preventDefault();
  const values=new FormData(form);
  const body=`Здравствуйте, команда «Кунаки»!\n\nМеня зовут ${values.get('name').trim()}.\nСвязаться со мной: ${values.get('contact').trim()}\n\n${values.get('message').trim()}\n`;
  const url=`mailto:${mail}?subject=${encodeURIComponent(form.dataset.subject)}&body=${encodeURIComponent(body)}`;
  const fallback=$('.email-fallback',dialog);
  fallback.innerHTML=`<strong>Письмо подготовлено</strong><p>Если почтовое приложение не открылось, скопируйте текст и отправьте его на ${mail}.</p><button class="copy-button" type="button" id="copy-message">Скопировать текст письма</button><p><a href="${escapeHTML(url)}">Попробовать открыть письмо ещё раз ↗</a></p>`;
  fallback.hidden=false;
  $('#copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(body);toast('Текст письма скопирован');}catch{const text=document.createElement('textarea');text.value=body;text.setAttribute('aria-label','Текст письма для копирования');text.style.cssText='width:100%;min-height:160px;font:inherit';fallback.append(text);text.focus();text.select();}});
  window.location.href=url;
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
