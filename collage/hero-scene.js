(() => {
  const scene=document.querySelector('.collage-hero');
  const copy=document.querySelector('.collage-hero-copy');
  const actions=document.querySelector('.collage-hero-actions');
  const riders=document.querySelector('.collage-riders');
  const meadow=document.querySelector('.collage-meadow');
  const hands=document.querySelector('.collage-hands');
  const replay=document.querySelector('.collage-replay');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers=[...document.querySelectorAll('.collage-hands img, .collage-landscape, .collage-meadow, .collage-riders img')];
  let finishTimer;
  let layoutFrame;
  let ready=false;
  let autoPlayAllowed=true;
  function layoutScene(){
    layoutFrame=undefined;
    const heroTop=scene.getBoundingClientRect().top;
    const actionBottom=actions.getBoundingClientRect().bottom-heroTop;
    const handHeight=hands.getBoundingClientRect().width/2;
    const safeContact=actionBottom+26+handHeight*.21;
    const minimum=Math.ceil(safeContact+92)+'px';
    if(scene.style.minHeight!==minimum)scene.style.minHeight=minimum;
    const contact=Math.max(safeContact,scene.clientHeight*.85);
    hands.style.top=Math.round(contact-handHeight*.55)+'px';
    const ground=riders.getBoundingClientRect().bottom-scene.getBoundingClientRect().top-2;
    const meadowHeight=meadow.getBoundingClientRect().width/2;
    meadow.style.top=Math.round(ground-meadowHeight*Number(meadow.dataset.crest))+'px';
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
