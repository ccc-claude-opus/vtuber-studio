/* 投影片：顯示、TeX、模式（1 大主播 / 2 右下角 / 3 無主播）與範例 */
let slides=[],slideT=0,slideSm=0,smode=2;
const SM={1:{sc:.8,cx:1000},2:{sc:.45,cx:1120},3:{sc:1,cx:640,hide:1}};
function setSmode(v){smode=SM[v]?+v:2;$('smode').value=smode;const w=$('wrap');w.classList.remove('m1','m2','m3');w.classList.add('m'+smode)}
function typeset(n=0){const M=window.MathJax;if(M&&M.typesetPromise)M.typesetPromise([$('slide')]).catch(()=>{});else if(n<10)setTimeout(()=>typeset(n+1),600)}
function showSlide(it){
 const on=it.slide>=0;slideT=on?1:0;$('slide').classList.toggle('on',on);$('wrap').classList.toggle('sl',on);
 if(!on)return;const s=slides[it.slide];
 if($('sT').dataset.i!==String(it.slide)){
  $('sT').dataset.i=it.slide;$('sT').textContent=s.title;$('sL').textContent='';
  s.bul.forEach(b=>{const li=document.createElement('li');li.textContent=b;if(/^\$\$/.test(b))li.className='m';$('sL').appendChild(li)});
  $('sN').textContent=(it.slide+1)+' / '+slides.length;typeset();
  const sl=$('slide');sl.classList.remove('pop');void sl.offsetWidth;sl.classList.add('pop');
 }
 const all=!$('prog').checked||it.sIdx>=s.n-1;
 const show=all?s.bul.length:Math.min(s.bul.length,it.sIdx+1);
 [...$('sL').children].forEach((li,i)=>li.classList.toggle('v',i<show));
}
const SLIDE_SAMPLE=String.raw`## 歡迎來到本週簡報
- 主題：讓講稿說得更生動
- 主講：你的虛擬主播
[揮手]大家好，歡迎來到這一次的簡報！
今天我會用三張投影片，帶大家看重點。
## 第一，節奏很重要
- 速度要有快有慢
- 停頓讓重點浮現
- 句尾別每次都一樣
說話最怕的就是一路平鋪直敘。[停頓0.5]
所以我們會在重點前放慢，[慢]讓聽的人跟上。
最後記得，句尾的停頓也要有長有短！
## 第二，表情與動作
- 驚嘆號代表興奮
- 問號代表疑惑
- 重點時點頭
你有沒有發現，我的表情一直在變化呢？
[驚訝]原來只要加上這些小細節，就生動很多！
## 第三，加上數學式
- 勾股定理：$a^2+b^2=c^2$
$$\int_0^1 x^2\,dx=\frac13$$
- 二次公式
$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
你看，數學式也可以直接放在投影片上。
勾股定理說的是，兩股的平方和，等於斜邊的平方。
## 謝謝大家
- 歡迎提出問題
- 下次再見
[開心]以上就是今天的內容，謝謝大家收看，我們下次再見！`;
$('demo').onclick=()=>{$('txt').value=SLIDE_SAMPLE;$('load').click();};
$('file').onchange=async e=>{
 const f=e.target.files[0];if(!f)return;const buf=await f.arrayBuffer();let s;
 try{s=new TextDecoder('utf-8',{fatal:true}).decode(buf)}catch(_){s=new TextDecoder('big5').decode(buf)}
 $('txt').value=s;$('load').click();
};
