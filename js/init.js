/* 初始化（網址參數 who / smode / clean） */
const q=new URLSearchParams(location.search);
{const w=+q.get('who');applyChar(w>0&&w<CH.length?w:0)}
$('smode').onchange=e=>setSmode(e.target.value);
setSmode(q.get('smode')||2);
if(q.get('clean')==='1'){$('app').classList.add('nopanel');document.body.classList.add('clear')}
setItems();
(function(){let s='';for(let i=0;i<10;i++)s+=`<rect class="bar" x="${915+i*24}" y="230" width="14" height="30" rx="3"/>`;$('bars').innerHTML=s})();
