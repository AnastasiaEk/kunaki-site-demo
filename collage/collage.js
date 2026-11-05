(() => {
  const scene=document.querySelector('.collage-hero');
  const replay=document.querySelector('.collage-replay');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers=[...document.querySelectorAll('.collage-hands img, .collage-landscape')];
  let finishTimer;
  let ready=false;
  const settle=()=>{clearTimeout(finishTimer);scene.classList.remove('is-playing','will-animate');scene.dataset.animation='complete';};
  const play=()=>{
    if(!ready||motion.matches)return;
    clearTimeout(finishTimer);
    scene.classList.remove('is-playing','will-animate');
    void scene.offsetWidth;
    scene.classList.add('is-playing');
    scene.dataset.animation='playing';
    replay.disabled=true;
    finishTimer=setTimeout(()=>{settle();replay.disabled=false;},3800);
  };
  replay.addEventListener('click',play);
  motion.addEventListener('change',()=>{if(motion.matches)settle();replay.hidden=motion.matches;replay.disabled=!ready;});
  replay.hidden=motion.matches;
  if(!motion.matches)scene.classList.add('will-animate');
  Promise.allSettled(layers.map(img=>img.decode())).then(()=>{
    ready=layers.every(img=>img.complete&&img.naturalWidth>0);
    if(!ready){settle();replay.hidden=true;return;}
    replay.disabled=false;
    requestAnimationFrame(()=>requestAnimationFrame(play));
  });
  // Text and page actions stay available even when artwork cannot load.
  setTimeout(()=>{if(!ready)settle();},6000);
})();
