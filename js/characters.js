/* 主播角色預設與套用 */
document.querySelectorAll('[fill="#ffe0cc"]').forEach(e=>e.classList.add('sk'));
document.querySelectorAll('[fill="#f7cdb4"]').forEach(e=>e.classList.add('sk2'));
const CH=[
 {n:'小夜（紫髮長髮）',hair:'#3b2a6b',out:'#e0527a',eye:'#4aa3ff',skin:'#ffe0cc',s2:'#f7cdb4',style:'L',pitch:1.1,rate:1},
 {n:'阿翔（黑髮・眼鏡・西裝）',hair:'#23232f',out:'#2f4a8a',eye:'#6b4a2a',skin:'#f6d3b8',s2:'#e8bf9f',style:'S',gl:1,tie:1,pitch:.8,rate:1},
 {n:'小橘（橘髮雙馬尾・貓耳）',hair:'#e8802a',out:'#f2c230',eye:'#2fb58a',skin:'#ffe3d3',s2:'#f9d0bd',style:'T',cat:1,pitch:1.25,rate:1.05},
 {n:'雪音（銀髮・紅瞳）',hair:'#cfd6ea',out:'#5aa7d6',eye:'#d9364f',skin:'#fff0ea',s2:'#f8ddd2',style:'L',pitch:1,rate:1},
 {n:'林博士（灰髮・眼鏡・白袍）',hair:'#6d7080',out:'#eceff6',collar:'#9aa6c4',tieC:'#2f8f5a',eye:'#3a6fa8',skin:'#f3d0b5',s2:'#e4bb9b',style:'S',gl:1,tie:1,pitch:.9,rate:.95},
 {n:'阿森（綠髮・耳機）',hair:'#2f9a68',out:'#2b2f55',eye:'#f2a22a',skin:'#e9c09f',s2:'#d9a985',style:'S',ph:1,pitch:.88,rate:1.05}
];
$('who').innerHTML=CH.map((c,i)=>`<option value="${i}">${c.n}</option>`).join('');
function applyChar(i){
 const c=CH[i],st=document.documentElement.style,sh=(id,on)=>$(id).style.display=on?'':'none';
 st.setProperty('--hair',c.hair);st.setProperty('--outfit',c.out);st.setProperty('--eye',c.eye);
 st.setProperty('--skin',c.skin);st.setProperty('--skin2',c.s2);
 st.setProperty('--collar',c.collar||'#fff');st.setProperty('--tie',c.tieC||'#e0334f');
 sh('hbL',c.style==='L');sh('hbS',c.style!=='L');sh('twin',c.style==='T');
 sh('cat',c.cat);sh('gl',c.gl);sh('ph',c.ph);sh('tie',c.tie);
 $('chair').value=c.hair;$('cout').value=c.out;$('ceye').value=c.eye;
 $('pitch').value=c.pitch;$('rate').value=c.rate;
 $('pv').textContent=c.pitch.toFixed(2);$('rv').textContent=c.rate.toFixed(2);
 $('who').value=i;
}
$('who').onchange=e=>applyChar(+e.target.value);
