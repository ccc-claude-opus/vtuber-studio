/* ---------- 解析講稿 ---------- */
const EMO={'開心':'happy','高興':'happy','驚訝':'surprised','疑惑':'curious','難過':'sad','認真':'serious','平常':'normal','正常':'normal'};
function auto(t){
 if(/抱歉|可惜|遺憾|難過|不幸|失望/.test(t))return'sad';
 if(/竟然|沒想到|居然|哇|天啊|驚人/.test(t))return'surprised';
 if(/注意|重要|必須|務必|警告|小心/.test(t))return'serious';
 if(/[？?]\s*$/.test(t)||/嗎[，,]?/.test(t)&&/[？?]/.test(t))return'curious';
 if(/[！!]/.test(t)||/歡迎|謝謝|太棒|恭喜|開心|好消息/.test(t))return'happy';
 return'normal';
}
function parse(src){
 const out=[];let pend={emo:null,pre:0,rate:1,wave:false,emph:false};slides=[];let cs=-1;
 src.replace(/\r/g,'').split(/\n+/).forEach(line=>{
  line=line.trim();if(!line)return;
  let m=line.match(/^#{1,3}\s*(.+)$/);
  if(m){slides.push({title:m[1],bul:[],n:0});cs=slides.length-1;return}
  m=line.match(/^[-*•]\s+(.+)$/);
  if(m){if(cs<0){slides.push({title:'',bul:[],n:0});cs=0}slides[cs].bul.push(m[1]);return}
  if(/^\$\$.+\$\$$/.test(line)){if(cs<0){slides.push({title:'',bul:[],n:0});cs=0}slides[cs].bul.push(line);return}
  line=line.replace(/\$[^$]+\$/g,'').trim();if(!line)return;
  (line.match(/[^。！？!?；;…]+[。！？!?；;…]*/g)||[]).forEach(ch=>{
   ch.replace(/\[([^\]]+)\]/g,(m,tg)=>{
    if(EMO[tg])pend.emo=EMO[tg];
    else if(tg.startsWith('停頓'))pend.pre+=parseFloat(tg.slice(2))||1;
    else if(tg==='慢')pend.rate=.8;else if(tg==='快')pend.rate=1.2;
    else if(tg==='強調')pend.emph=true;else if(tg==='揮手')pend.wave=true;
    return'';});
   const text=ch.replace(/\[[^\]]*\]/g,'').trim();
   if(!/[\p{L}\p{N}]/u.test(text))return;
   const end=text.slice(-1);
   out.push({text,emo:pend.emo||auto(text),pre:pend.pre,rate:pend.rate*(/…/.test(end)?.88:1),
     slide:cs,sIdx:cs>=0?slides[cs].n++:0,emph:pend.emph||/[！!]/.test(text),wave:pend.wave||/大家好|歡迎|哈囉|再見|拜拜/.test(text),end,para:false});
   pend={emo:null,pre:0,rate:1,wave:false,emph:false};
  });
  if(out.length)out[out.length-1].para=true;
 });
 return out;
}
