/* ---------- 播放控制 ---------- */
let items=[],idx=0,token=0,playing=false;
function setItems(){items=parse($('txt').value);idx=0;
 $('list').innerHTML=items.map((it,i)=>`<div data-i="${i}">${i+1}. ${it.text}</div>`).join('');}
$('list').onclick=e=>{const d=e.target.closest('[data-i]');if(d)run(+d.dataset.i)};
async function run(start){
 if(!items.length)setItems();
 const my=++token;if(synth)synth.cancel();paused=false;playing=true;speaking=false;
 for(idx=start;idx<items.length;idx++){
  if(my!==token)return;
  const it=items[idx];
  document.querySelectorAll('#list .on').forEach(n=>n.classList.remove('on'));
  const n=$('list').children[idx];if(n){n.classList.add('on');n.scrollIntoView({block:'nearest'})}
  $('sub').textContent=it.text;showSlide(it);
  tgt=EM[it.emo]||EM.normal;
  if(it.wave||(idx===0&&it.emo==='happy'))wave=2.4;
  if(it.emph)nodAmp=1;
  if(it.pre){await sleep(it.pre*1000);if(my!==token)return}
  while(paused&&my===token)await sleep(100);
  if(my!==token)return;
  const vol=+$('vol').value,br=+$('rate').value,bp=+$('pitch').value;
  if($('fill').checked&&idx>0&&it.emo!=='serious'&&it.emo!=='sad'&&Math.random()<.2){
   await say(FILL[Math.floor(Math.random()*FILL.length)],{rate:br*1.05,pitch:bp,vol});
   if(my!==token)return;await sleep(rnd(120,260));
  }
  const e=tgt;
  await say(it.text,{rate:Math.max(.5,Math.min(2,br*e.rate*it.rate*rnd(.96,1.05))),
    pitch:Math.max(.1,Math.min(2,bp*e.pitch*rnd(.97,1.04)*(it.end==='？'||it.end==='?'?1.05:1))),vol});
  if(my!==token)return;
  const base={'。':rnd(300,550),'！':rnd(300,450),'!':rnd(300,450),'？':rnd(500,800),'?':rnd(500,800),'…':rnd(700,1000)}[it.end]||rnd(250,450);
  await sleep(base+(it.para?rnd(350,600):0));
 }
 if(my===token){playing=false;tgt=EM.normal;slideT=0;$('slide').classList.remove('on');$('wrap').classList.remove('sl');$('sub').textContent='（講稿結束）';}
}
$('play').onclick=()=>{if(paused){paused=false;if(synth)synth.resume();return}if(!playing)run(idx<items.length?idx:0);};
$('pause').onclick=()=>togglePause();
function togglePause(){if(!playing)return;paused=!paused;if(synth){paused?synth.pause():synth.resume()}if(paused)speaking=false;}
$('prev').onclick=()=>run(Math.max(0,idx-1));
$('next').onclick=()=>run(Math.min(items.length-1,idx+1));
$('restart').onclick=()=>run(0);
$('load').onclick=()=>{token++;if(synth)synth.cancel();playing=false;slideT=0;$('slide').classList.remove('on');$('wrap').classList.remove('sl');$('sT').dataset.i='';setItems();$('sub').textContent='講稿已套用，按「播放」開始';};
