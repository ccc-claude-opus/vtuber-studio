/* 主播角色預設與套用（外觀由 avatars.js 組出） */
const CH=[
 {n:'小夜（動漫・紫色長髮）',geo:'anime',eye:'anime',brow:'anime',hs:['longB','bangs','sides','shine'],out:'idol',hair:'#3b2a6b',out_:'#e0527a',eyeC:'#4aa3ff',skin:'#ffe0cc',tieC:'#e0334f',pitch:1.1,rate:1},
 {n:'阿翔（動漫・眼鏡西裝）',geo:'anime',eye:'boy',brow:'boy',bc:'#23232f',lc:'#1c1c26',hs:['boyB','boyF','shine'],acc:['gl'],out:'suit',hair:'#23232f',out_:'#2f4a8a',eyeC:'#6b4a2a',skin:'#f6d3b8',pitch:.8,rate:1},
 {n:'阿森（動漫・耳機帽T）',geo:'anime',eye:'boy',brow:'boy',bc:'#1f5a40',lc:'#1f2a28',hs:['boyB','spiky'],acc:['ph'],out:'hoodie',hair:'#2f9a68',out_:'#2b2f55',eyeC:'#f2a22a',skin:'#e9c09f',pitch:.88,rate:1.05},
 {n:'小橘（Q版・貓耳雙馬尾）',geo:'chibi',eye:'chibi',brow:'chibi',bc:'#8a4a1a',lc:'#5a2a10',hs:['twin','chibiB','chibiF','shine'],acc:['cat'],out:'sailor',hair:'#e8802a',out_:'#f2c230',eyeC:'#2fb58a',skin:'#ffe3d3',tieC:'#e0527a',pitch:1.25,rate:1.05},
 {n:'雪音（Q版・銀髮丸子頭）',geo:'chibi',eye:'chibi',brow:'chibi',bc:'#8a90b0',lc:'#4a4a6a',hs:['buns','bobB','chibiF','shine'],acc:['ribbon'],out:'sailor',hair:'#dfe4f2',out_:'#5aa7d6',eyeC:'#d9364f',skin:'#fff0ea',tieC:'#3b6fd6',pitch:1.15,rate:1},
 {n:'團子（Q版・小熊吉祥物）',geo:'mascot',eye:'dot',brow:'dot',bc:'#4a2e1e',out:'scarf',hair:'#b07a4a',out_:'#e0334f',eyeC:'#1d1a24',skin:'#fff3e0',pitch:1.3,rate:1},
 {n:'艾莉（擬真・新聞主播）',geo:'real',eye:'realF',brow:'real',bc:'#3b2418',lc:'#1e120c',hs:['rwB','rwL','rwF'],acc:['earring'],out:'blazer',hair:'#5a3524',out_:'#b8323f',eyeC:'#6b4a2e',skin:'#f1c8ae',collar:'#f4ece4',mouth:['#6a2028','#c04a58',8],pitch:1.05,rate:1},
 {n:'陳先生（擬真・西裝男主播）',geo:'real',eye:'real',brow:'realM',bc:'#1e1a1a',lc:'#1a1210',hs:['rmB','rmF'],out:'suit',hair:'#1f1c1c',out_:'#1f2d4f',eyeC:'#3b2a20',skin:'#e6b896',collar:'#f4f5f8',tieC:'#a8283a',pitch:.8,rate:1},
 {n:'林博士（擬真・白袍教授）',geo:'real',eye:'real',brow:'realM',bc:'#9a9ca6',lc:'#3a2a24',hs:['roB'],acc:['beard','glr','wrinkle'],out:'coat',hair:'#b9bcc6',out_:'#f1f3f8',eyeC:'#3a6fa8',skin:'#eec4a6',collar:'#cfe0f2',tieC:'#2f6f5a',pitch:.85,rate:.95},
 {n:'Max（美式卡通）',geo:'toon',eye:'toon',brow:'toon',bc:'#222',hs:['toonF'],out:'tee',hair:'#f2c230',out_:'#2fa0e0',eyeC:'#3a8a4a',skin:'#ffd2b0',pitch:1,rate:1.08}
];
$('who').innerHTML=CH.map((c,i)=>`<option value="${i}">${c.n}</option>`).join('');
function applyChar(i){
 const c=CH[i],st=document.documentElement.style;
 st.setProperty('--hair',c.hair);st.setProperty('--outfit',c.out_);st.setProperty('--eye',c.eyeC);st.setProperty('--skin',c.skin);
 st.setProperty('--collar',c.collar||'#fff');st.setProperty('--tie',c.tieC||'#e0334f');
 $('char').innerHTML=buildAvatar(c);
 $('chair').value=c.hair;$('cout').value=c.out_;$('ceye').value=c.eyeC;
 $('pitch').value=c.pitch;$('rate').value=c.rate;
 $('pv').textContent=c.pitch.toFixed(2);$('rv').textContent=c.rate.toFixed(2);
 $('who').value=i;
}
$('who').onchange=e=>applyChar(+e.target.value);
