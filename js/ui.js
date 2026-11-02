/* ---------- 介面 ---------- */
$('title').oninput=e=>$('ttl').textContent=e.target.value;
$('rate').oninput=e=>$('rv').textContent=(+e.target.value).toFixed(2);
$('pitch').oninput=e=>$('pv').textContent=(+e.target.value).toFixed(2);
$('subon').onchange=e=>$('sub').classList.toggle('off',!e.target.checked);
$('clr').onchange=e=>document.body.classList.toggle('clear',e.target.checked);
$('chair').oninput=e=>document.documentElement.style.setProperty('--hair',e.target.value);
$('cout').oninput=e=>document.documentElement.style.setProperty('--outfit',e.target.value);
$('ceye').oninput=e=>document.documentElement.style.setProperty('--eye',e.target.value);
const hidePanel=()=>$('app').classList.toggle('nopanel');
$('hide').onclick=hidePanel;
addEventListener('keydown',e=>{
 if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 if(e.key==='h'||e.key==='H')hidePanel();
 if(e.key===' '){e.preventDefault();playing?togglePause():$('play').click()}
});
