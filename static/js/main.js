/* ════════════════════════════════════════════
   AUDIO ENGINE (Web Audio API — no files needed)
════════════════════════════════════════════ */
let audioCtx = null;
function getAudio(){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function beep(freq=440, dur=0.06, vol=0.08, type='square'){
  try{
    const ctx=getAudio();
    const o=ctx.createOscillator();
    const g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur);
    o.start(ctx.currentTime); o.stop(ctx.currentTime+dur);
  }catch(e){}
}
function beepClick(){ beep(520,.05,.07,'square'); }
function beepNav(){   beep(660,.04,.06,'square'); setTimeout(()=>beep(880,.04,.05,'square'),60); }
function beepBack(){  beep(440,.04,.06,'square'); setTimeout(()=>beep(330,.05,.05,'square'),60); }
function beepStart(){ [440,550,660,880].forEach((f,i)=>setTimeout(()=>beep(f,.08,.09,'square'),i*80)); }
function beepKonami(){
  [523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.12,.1,'square'),i*100));
}

/* ════════════════════════════════════════════
   CURSOR
════════════════════════════════════════════ */
const cursorEl = document.getElementById('cursor');
document.addEventListener('mousemove', e=>{
  cursorEl.style.left = e.clientX+'px';
  cursorEl.style.top  = e.clientY+'px';
});
document.addEventListener('mousedown',()=>{ cursorEl.style.transform='translate(-1px,-1px) scale(1.4)'; });
document.addEventListener('mouseup',  ()=>{ cursorEl.style.transform='translate(-1px,-1px) scale(1)'; });

/* ════════════════════════════════════════════
   CRT TRANSITION
════════════════════════════════════════════ */
const panel = document.getElementById('crt-panel');
const crtLn = document.getElementById('crt-line');
let crtBusy = false;

function crtTransition(callback){
  if(crtBusy) return;
  crtBusy = true;

  /* instant reset — no transition */
  panel.style.transition = 'none';
  crtLn.style.transition = 'none';
  panel.style.opacity    = '1';
  panel.style.clipPath   = 'inset(50% 0 50% 0)';
  crtLn.style.opacity    = '0';
  void panel.offsetWidth;

  /* PHASE 1: squish to black (260ms) */
  panel.style.transition = 'clip-path 260ms cubic-bezier(.4,0,1,1)';
  panel.style.clipPath   = 'inset(0% 0 0% 0)';
  crtLn.style.transition = 'opacity 80ms ease';
  crtLn.style.opacity    = '1';
  setTimeout(()=>{ crtLn.style.transition='opacity 140ms ease'; crtLn.style.opacity='0'; }, 90);

  /* PHASE 2: swap content */
  setTimeout(()=>{
    callback();
    window.scrollTo(0,0);

    /* PHASE 3: power on — collapse upward (300ms) */
    panel.style.transition = 'none';
    panel.style.clipPath   = 'inset(0% 0 0% 0)';
    void panel.offsetWidth;

    panel.style.transition = 'clip-path 300ms cubic-bezier(0,.8,.2,1)';
    panel.style.clipPath   = 'inset(0% 0 100% 0)';

    setTimeout(()=>{
      panel.style.transition = 'none';
      panel.style.opacity    = '0';
      panel.style.clipPath   = 'inset(50% 0 50% 0)';
      crtBusy = false;
    }, 310);
  }, 280);
}

/* ════════════════════════════════════════════
   RETRO LOADER
════════════════════════════════════════════ */
const loaderEl  = document.getElementById('retro-loader');
const fillEl    = document.getElementById('rl-fill');
const pctEl     = document.getElementById('rl-pct');
const titleEl   = document.getElementById('rl-title');

const loaderLabels = ['LOADING...','BOOTING...','CONNECTING...','SYNCING...','MOUNTING...'];

function showLoader(pageName, done){
  const label = loaderLabels[Math.floor(Math.random()*loaderLabels.length)];
  titleEl.textContent = label;
  fillEl.style.width  = '0%';
  pctEl.textContent   = '0%';
  loaderEl.classList.add('show');

  let pct = 0;
  const steps = [12,8,15,10,20,15,8,12]; // uneven steps = retro feel
  let si = 0;

  function tick(){
    if(si >= steps.length){ pct=100; }
    else { pct = Math.min(100, pct + steps[si++]); }

    fillEl.style.width = pct+'%';
    pctEl.textContent  = pct+'%';
    beep(300 + pct*3, .03, .04, 'square');

    if(pct < 100){ setTimeout(tick, 40 + Math.random()*30); }
    else {
      setTimeout(()=>{
        loaderEl.classList.remove('show');
        done();
      }, 120);
    }
  }
  setTimeout(tick, 60);
}

/* ════════════════════════════════════════════
   TERMINAL TYPING (Skills page)
   skillData is injected globally from the Flask template
════════════════════════════════════════════ */

function runTerminal(){
  const out = document.getElementById('term-output');
  out.innerHTML = '';
  let delay = 0;

  skillData.forEach(item=>{
    // command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.style.opacity = '0';
    cmdLine.innerHTML = `<span class="prompt">$ </span><span class="cmd"></span>`;
    out.appendChild(cmdLine);

    setTimeout(()=>{
      cmdLine.style.opacity = '1';
      typeText(cmdLine.querySelector('.cmd'), item.cmd, 38, ()=>{
        // output lines
        item.out.forEach((o,oi)=>{
          setTimeout(()=>{
            const outLine = document.createElement('div');
            outLine.className = 'term-line';
            outLine.innerHTML = `<span class="out">${o}</span>`;
            outLine.style.opacity='0';
            out.appendChild(outLine);
            void outLine.offsetWidth;
            outLine.style.transition='opacity .1s';
            outLine.style.opacity='1';
            beep(200+oi*30,.02,.03,'sine');
          }, oi*60);
        });
        // blank line after
        setTimeout(()=>{
          const blank = document.createElement('div');
          blank.className = 'term-line';
          blank.innerHTML = '&nbsp;';
          out.appendChild(blank);
        }, item.out.length*60+30);
      });
    }, delay);

    delay += item.cmd.length*38 + item.out.length*60 + 200;
  });

  // cursor at end
  setTimeout(()=>{
    const cur = document.createElement('div');
    cur.className = 'term-line';
    cur.innerHTML = `<span class="prompt">$ </span><span class="term-cursor-inline"></span>`;
    out.appendChild(cur);
  }, delay);
}

function typeText(el, text, speed, cb){
  let i=0;
  function next(){
    if(i<text.length){
      el.textContent += text[i++];
      beep(400+Math.random()*200,.015,.025,'square');
      setTimeout(next, speed + Math.random()*20);
    } else { if(cb) cb(); }
  }
  next();
}

/* ════════════════════════════════════════════
   GLITCH on logo
════════════════════════════════════════════ */
function triggerGlitch(el){
  el.classList.remove('glitch');
  void el.offsetWidth;
  el.classList.add('glitch');
  setTimeout(()=>el.classList.remove('glitch'),400);
}
// random glitch every 4-8s
function scheduleGlitch(){
  const delay = 4000 + Math.random()*4000;
  setTimeout(()=>{
    const logo = document.getElementById('siteLogo');
    if(logo) triggerGlitch(logo);
    scheduleGlitch();
  }, delay);
}

/* ════════════════════════════════════════════
   KONAMI CODE
════════════════════════════════════════════ */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e=>{
  if(e.key === KONAMI[konamiIdx]){ konamiIdx++; }
  else { konamiIdx = 0; }
  if(konamiIdx === KONAMI.length){
    konamiIdx = 0;
    openEasterEgg();
  }
});

// Mobile swipe sequence for Konami (↑↑↓↓←→←→)
let swipeSeq = [];
const swipeKonami = ['up','up','down','down','left','right','left','right'];
let touchStartX=0, touchStartY=0;
document.addEventListener('touchstart', e=>{ touchStartX=e.touches[0].clientX; touchStartY=e.touches[0].clientY; },{passive:true});
document.addEventListener('touchend', e=>{
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(dx)<20 && Math.abs(dy)<20) return;
  let dir;
  if(Math.abs(dx)>Math.abs(dy)) dir = dx>0?'right':'left';
  else dir = dy>0?'down':'up';
  swipeSeq.push(dir);
  if(swipeSeq.length > swipeKonami.length) swipeSeq.shift();
  if(JSON.stringify(swipeSeq)===JSON.stringify(swipeKonami)){
    swipeSeq=[];
    openEasterEgg();
  }
},{passive:true});

function buildMatrix(){
  const m = document.getElementById('ee-matrix');
  m.innerHTML='';
  const chars='01アイウエオカキクケコサシスセソタチツ';
  const cols = Math.floor(window.innerWidth/16);
  for(let i=0;i<cols;i++){
    const col=document.createElement('div');
    col.className='ee-col';
    col.style.left=(i*16)+'px';
    col.style.animationDuration=(2+Math.random()*3)+'s';
    col.style.animationDelay=(-Math.random()*3)+'s';
    let txt='';
    for(let j=0;j<30;j++) txt+=chars[Math.floor(Math.random()*chars.length)]+'<br>';
    col.innerHTML=txt;
    m.appendChild(col);
  }
}
function openEasterEgg(){
  beepKonami();
  buildMatrix();
  document.getElementById('easter-egg').classList.add('show');
}
document.getElementById('easter-egg').addEventListener('click',()=>{
  beepClick();
  document.getElementById('easter-egg').classList.remove('show');
});

/* ════════════════════════════════════════════
   PAGE ROUTING
════════════════════════════════════════════ */
function showPage(name){
  const isBack = (name==='home');
  if(isBack) beepBack(); else beepNav();

  showLoader(name, ()=>{
    crtTransition(()=>{
      // hide all
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      document.getElementById('page-home').style.display='none';

      if(name==='home'){
        document.getElementById('page-home').style.display='block';
        scheduleGlitch();
      } else {
        const pg = document.getElementById('page-'+name);
        if(pg){ pg.classList.add('active'); }
        if(name==='skills') setTimeout(runTerminal, 400);
      }
    });
  });
}

/* ════════════════════════════════════════════
   INTRO → SITE
════════════════════════════════════════════ */
let started=false;
function startSite(){
  if(started) return;
  started=true;
  beepStart();
  triggerGlitch(document.getElementById('introLogo'));

  setTimeout(()=>{
    showLoader('BOOTING KAMIOPS', ()=>{
      crtTransition(()=>{
        document.getElementById('intro').style.display='none';
        document.getElementById('site').classList.add('visible');
        document.getElementById('page-home').style.display='block';
        setTimeout(scheduleGlitch, 2000);
      });
    });
  }, 300);
}

document.getElementById('pressStart').addEventListener('click', startSite);
document.getElementById('intro').addEventListener('click',      startSite);

/* initial state */
document.getElementById('page-home').style.display='none';