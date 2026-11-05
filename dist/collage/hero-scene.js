(() => {
  const scene=document.querySelector('.collage-hero');
  const copy=document.querySelector('.collage-hero-copy');
  const actions=document.querySelector('.collage-hero-actions');
  const riders=document.querySelector('.collage-riders');
  const meadow=document.querySelector('.collage-meadow');
  const sun=document.querySelector('.collage-sun');
  const description=document.querySelector('.collage-hero-description');
  const hands=document.querySelector('.collage-hands');
  const replay=document.querySelector('.collage-replay');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers=[...document.querySelectorAll('.collage-hands img, .collage-landscape, .collage-meadow, .collage-riders img, .collage-sun')];
  let finishTimer;
  let layoutFrame;
  let ready=false;
  let autoPlayAllowed=true;
  function layoutScene(){
    layoutFrame=undefined;
    const heroTop=scene.getBoundingClientRect().top;
    const actionBottom=actions.getBoundingClientRect().bottom-heroTop;
    const handHeight=hands.getBoundingClientRect().width/2;
    // Source alpha occupies y=.215–.815; central fingers begin at y=.33.
    // Fit the whole printed cutout, with air after the buttons and below its ink.
    const handTop=actionBottom+38-handHeight*.33;
    const minimum=Math.ceil(handTop+handHeight*.82+30)+'px';
    if(scene.style.minHeight!==minimum)scene.style.minHeight=minimum;
    hands.style.top=Math.round(handTop)+'px';
    const ground=riders.getBoundingClientRect().bottom-scene.getBoundingClientRect().top-2;
    document.querySelectorAll('.collage-regional-low').forEach(layer=>{layer.style.top=Math.round(ground-80)+'px';});
    const meadowHeight=meadow.getBoundingClientRect().width/2;
    meadow.style.height=Math.round(meadowHeight)+'px';
    meadow.style.top=Math.round(ground-meadowHeight*Number(meadow.dataset.crest))+'px';
    // The original emblem's disk centre is 55.898% down its 336×281 viewBox.
    const descriptionBox=description.getBoundingClientRect();
    const diskCentre=descriptionBox.top-heroTop+descriptionBox.height/2;
    sun.style.top=Math.round(diskCentre-sun.offsetWidth*281/336*.55898)+'px';
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
