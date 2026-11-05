(() => {
  const scene=document.querySelector('.collage-hero');
  const copy=document.querySelector('.collage-hero-copy');
  const actions=document.querySelector('.collage-hero-actions');
  const riders=document.querySelector('.collage-riders');
  const meadow=document.querySelector('.collage-meadow');
  const sun=document.querySelector('.collage-sun');
  const description=document.querySelector('.collage-hero-description');
  const mountains=document.querySelector('.collage-mountains');
  const petersburg=document.querySelector('.collage-petersburg');
  const sea=document.querySelector('.collage-sea');
  const architecture=document.querySelector('.collage-architecture');
  const mobileMountains=[...document.querySelectorAll('.collage-mobile-mountain')];
  const hands=document.querySelector('.collage-hands');
  const replay=document.querySelector('.collage-replay');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers=[...document.querySelectorAll('.collage-scene img, .collage-riders img')];
  let finishTimer;
  let layoutFrame;
  let ready=false;
  let autoPlayAllowed=true;
  function layoutScene(){
    layoutFrame=undefined;
    const heroTop=scene.getBoundingClientRect().top;
    const actionBottom=actions.getBoundingClientRect().bottom-heroTop;
    const mobile=window.matchMedia('(max-width: 720px)').matches;
    const handHeight=hands.getBoundingClientRect().height;
    // Keep the source's natural 2:1 proportions and fit its complete printed cutout.
    const handTop=actionBottom+36-handHeight*.33;
    const minimum=Math.ceil(handTop+handHeight*.82+28)+'px';
    if(scene.style.minHeight!==minimum)scene.style.minHeight=minimum;
    hands.style.top=Math.round(handTop)+'px';
    const ground=riders.getBoundingClientRect().bottom-heroTop-1;
    const crest=Number(meadow.dataset.crest);
    const meadowWidth=Math.max(scene.clientWidth*(mobile?3.1:1.06),2*(scene.clientHeight-ground+16)/(1-crest));
    const meadowHeight=meadowWidth/2;
    meadow.style.width=Math.round(meadowWidth)+'px';
    meadow.style.height=Math.round(meadowHeight)+'px';
    meadow.style.top=Math.round(ground-meadowHeight*crest)+'px';
    mountains.style.top=Math.round(ground-mountains.getBoundingClientRect().height*Number(mountains.dataset.crest))+'px';
    petersburg.style.top=Math.round(ground-petersburg.getBoundingClientRect().height*.8)+'px';
    sea.style.top=Math.round(ground-sea.getBoundingClientRect().height*(mobile ? .68 : .73))+'px';
    architecture.style.top=Math.round(ground-(mobile?75:38))+'px';
    mobileMountains.forEach(layer=>{layer.style.top=Math.round(ground-125)+'px';});
    // Natural emblem geometry; only the ray layer is translucent.
    const descriptionBox=description.getBoundingClientRect();
    const sunTop=descriptionBox.top-heroTop+descriptionBox.height/2-sun.offsetHeight*.55898;
    sun.style.top=Math.round(sunTop)+'px';
  }
  function scheduleLayout(){if(layoutFrame===undefined)layoutFrame=requestAnimationFrame(layoutScene);}
  const observer=new ResizeObserver(scheduleLayout);
  observer.observe(scene);observer.observe(copy);
  window.addEventListener('resize',scheduleLayout,{passive:true});
  document.fonts.ready.then(scheduleLayout);
  layoutScene();
  const settle=()=>{clearTimeout(finishTimer);scene.classList.remove('is-playing','will-animate');scene.dataset.animation='complete';};
  function play(){
    if(!ready||motion.matches)return;
    clearTimeout(finishTimer);layoutScene();
    scene.classList.remove('is-playing','will-animate');
    void scene.offsetWidth;
    scene.classList.add('is-playing');scene.dataset.animation='playing';replay.disabled=true;
    finishTimer=setTimeout(()=>{settle();replay.disabled=false;},4400);
  }
  replay.addEventListener('click',play);
  motion.addEventListener('change',()=>{if(motion.matches)settle();replay.hidden=motion.matches;replay.disabled=!ready;});
  replay.hidden=motion.matches;
  if(!motion.matches)scene.classList.add('will-animate');else scene.dataset.animation='complete';
  Promise.allSettled(layers.map(img=>img.decode())).then(()=>{
    ready=layers.every(img=>img.complete&&img.naturalWidth>0);
    layoutScene();
    if(!ready){settle();replay.hidden=true;return;}
    replay.disabled=false;
    if(motion.matches||!autoPlayAllowed)settle();else requestAnimationFrame(()=>requestAnimationFrame(play));
  });
  // A failed artwork request never blocks text, navigation or page actions.
  setTimeout(()=>{if(!ready){autoPlayAllowed=false;settle();}},6000);
})();
