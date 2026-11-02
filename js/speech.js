/* ---------- 語音 ---------- */
const synth=window.speechSynthesis;let voices=[];
function loadVoices(){
 if(!synth)return;
 let all=synth.getVoices();let zh=all.filter(v=>/^zh/i.test(v.lang));
 zh.sort((a,b)=>(/TW/i.test(b.lang)-/TW/i.test(a.lang))||(/Online|Natural|Google/i.test(b.name)-/Online|Natural|Google/i.test(a.name)));
 voices=zh.length?zh:all;
 $('voice').innerHTML=voices.map((v,i)=>`<option value="${i}">${v.name}（${v.lang}）</option>`).join('')||'<option>無可用語音（以靜音模式演出）</option>';
}
if(synth){loadVoices();synth.onvoiceschanged=loadVoices;}
let speaking=false,pulse=0,paused=false;
function say(text,o){
 return new Promise(res=>{
  if(!synth||!voices.length){speaking=true;setTimeout(()=>{speaking=false;res()},text.length*240/o.rate);return;}
  const u=new SpeechSynthesisUtterance(text);const v=voices[+$('voice').value];
  if(v){u.voice=v;u.lang=v.lang}else u.lang='zh-TW';
  u.rate=o.rate;u.pitch=o.pitch;u.volume=o.vol;
  let done=false,to;
  const fin=()=>{if(done)return;done=true;speaking=false;clearTimeout(to);res()};
  u.onstart=()=>speaking=true;u.onboundary=()=>pulse=1;u.onend=fin;u.onerror=fin;
  to=setTimeout(function chk(){if(paused){to=setTimeout(chk,1000);return}fin()},text.length*700/o.rate+4000);
  speaking=true;synth.speak(u);
 });
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const rnd=(a,b)=>a+Math.random()*(b-a);
const FILL=['嗯，','那麼，','欸，','好，','來，'];
