/* 主播外觀：依角色設定組出 SVG（動漫、Q版、擬真、吉祥物、美式卡通）
   動畫會用到的 id：armL armR headB head eL eR gL gR kL kR mouth bl br
   頭髮、耳朵等以「標準臉」座標（中心 640,315，半徑 108×122）繪製，再依比例縮放 */
const GEO={
 anime:{cx:640,cy:315,rx:108,ry:122,ex:45,ey:318,es:1,ky:278,my:385,ms:1,pv:460,dy:-22,aL:[500,543],aR:[780,543],arm:105,aw:46,hand:24,bx:68,by:352,br:24},
 chibi:{cx:640,cy:350,rx:150,ry:136,ex:64,ey:392,es:1.45,ky:336,my:452,ms:.62,pv:520,dy:-40,aL:[566,526],aR:[714,526],arm:58,aw:34,hand:18,bx:96,by:438,br:28},
 real:{cx:640,cy:300,rx:94,ry:122,ex:38,ey:300,es:.95,ky:277,my:378,ms:.6,pv:470,dy:-55,aL:[474,530],aR:[806,530],arm:110,aw:52,hand:21,bx:54,by:340,br:26},
 toon:{cx:640,cy:318,rx:124,ry:118,ex:27,ey:300,es:1.05,ky:250,my:394,ms:.9,pv:460,dy:-35,aL:[492,535],aR:[788,535],arm:100,aw:40,hand:24,bx:78,by:350,br:22},
 mascot:{cx:640,cy:350,rx:140,ry:122,ex:54,ey:336,es:1,ky:304,my:412,ms:.5,pv:500,dy:-48,aL:[536,532],aR:[744,532],arm:68,aw:54,hand:28,bx:92,by:384,br:24}
};
let G=GEO.anime;
const SKD='rgba(150,80,60,.55)';
/* 把路徑 x 座標左右鏡射（路徑只用成對座標的指令） */
const mir=(d,m)=>m>0?d:d.replace(/(-?[\d.]+) (-?[\d.]+)/g,(_,x,y)=>`${-x} ${y}`);
const hp=(d,x='')=>`<path d="${d}" fill="var(--hair)"${x}/><path d="${d}" fill="url(#hairSh)"/>`;
function faceP(g,t,a,b,c){const{cx,cy,rx,ry}=g;
 return `M${cx-rx} ${cy-8} C${cx-rx} ${cy-ry*t} ${cx+rx} ${cy-ry*t} ${cx+rx} ${cy-8} C${cx+rx} ${cy+ry*a} ${cx+rx*b} ${cy+ry*c} ${cx} ${cy+ry} C${cx-rx*b} ${cy+ry*c} ${cx-rx} ${cy+ry*a} ${cx-rx} ${cy-8}Z`}
const FACE={anime:[1.32,.42,.42,.86],chibi:[1.3,.66,.6,1],real:[1.3,.4,.5,.9],toon:[1.3,.85,.72,1],mascot:[1.32,.6,.58,1]};
function normT(g){const sx=g.rx/108,sy=g.ry/122;return `matrix(${sx} 0 0 ${sy} ${g.cx-640*sx} ${g.cy-315*sy})`}
const DEFS=`<defs>
<linearGradient id="hairSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<linearGradient id="bodySh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
<linearGradient id="faceTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3a4a" stop-opacity=".25"/><stop offset=".4" stop-color="#8a3a4a" stop-opacity="0"/></linearGradient>
<radialGradient id="faceSh" cx=".5" cy=".42" r=".62"><stop offset=".55" stop-color="#7a3a28" stop-opacity="0"/><stop offset="1" stop-color="#7a3a28" stop-opacity=".38"/></radialGradient>
<linearGradient id="irT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity="0"/></linearGradient>
<radialGradient id="irR"><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>
<linearGradient id="lidSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1a30" stop-opacity=".4"/><stop offset=".45" stop-color="#3a1a30" stop-opacity="0"/></linearGradient>
<radialGradient id="sclR" cx=".5" cy=".55" r=".6"><stop offset=".55" stop-color="#8a5a50" stop-opacity="0"/><stop offset="1" stop-color="#8a5a50" stop-opacity=".45"/></radialGradient>
<radialGradient id="blG"><stop offset="0" stop-color="#ff6f86"/><stop offset="1" stop-color="#ff6f86" stop-opacity="0"/></radialGradient>
</defs>`;

/* ---------- 眼睛 ---------- */
const EYE={
 anime:{sh:'M-21 2 C-22 -28 20 -31 23 -3 C23 26 -20 28 -21 2Z',ir:16,pu:7,lash:'M-24 -4 C-21 -31 19 -34 28 -9',lw:5.5,flick:'M23 -15 L32 -21 M26 -8 L33 -10',low:'M-9 26 Q2 29 12 25'},
 boy:{sh:'M-22 3 C-20 -22 18 -25 23 -1 C21 22 -18 23 -22 3Z',ir:14,pu:6,lash:'M-24 0 C-20 -25 18 -28 26 -4',lw:4.5},
 chibi:{sh:'M-22 4 C-23 -30 22 -32 23 2 C23 31 -22 31 -22 4Z',ir:19,pu:8,lash:'M-25 -2 C-23 -33 22 -36 28 -6',lw:6,flick:'M23 -16 L31 -22 M26 -9 L33 -12',spark:1},
 real:{sh:'M-25 2 Q-12 -15 6 -15 Q20 -12 27 -1 Q14 11 -2 11 Q-16 10 -25 2Z',ir:11,pu:4.6,lash:'M-26 2 Q-12 -16 6 -16 Q20 -13 28 -2',lw:3,crease:'M-23 -6 Q-8 -24 10 -22 Q22 -19 27 -9',low:'M-21 5 Q-4 14 22 3',real:1},
 realF:{sh:'M-25 2 Q-12 -15 6 -15 Q20 -12 27 -1 Q14 11 -2 11 Q-16 10 -25 2Z',ir:11,pu:4.6,lash:'M-26 2 Q-12 -17 6 -17 Q20 -14 29 -3',lw:4,flick:'M27 -4 L33 -9',crease:'M-23 -7 Q-8 -25 10 -23 Q22 -20 27 -10',low:'M-21 5 Q-4 14 22 3',real:1},
 toon:{sh:'M-22 2 C-22 -38 22 -38 22 2 C22 34 -22 34 -22 2Z',ir:10,pu:6,toon:1},
 dot:{sh:'M-12 0 C-12 -17 12 -17 12 0 C12 17 -12 17 -12 0Z',dot:1}
};
function irisSVG(E){
 const r=E.ir;
 if(E.real){let f='';for(let i=0;i<14;i++){const a=i*Math.PI/7,c=Math.cos(a),s=Math.sin(a);f+=`M${(c*5.5).toFixed(1)} ${(s*5.5).toFixed(1)} L${(c*10).toFixed(1)} ${(s*10).toFixed(1)} `}
  return `<circle r="${r}" fill="var(--eye)"/><path d="${f}" stroke="rgba(255,255,255,.2)" stroke-width=".8"/><circle r="${r}" fill="url(#irR)"/><circle r="${E.pu}" fill="#0c0a0a"/><circle cx="-3.6" cy="-3.8" r="2.3" fill="#fff" opacity=".9"/><circle cx="3.5" cy="3" r="1" fill="#fff" opacity=".6"/>`}
 if(E.toon)return `<circle r="${r}" fill="var(--eye)"/><circle r="${E.pu}" fill="#111"/><circle cx="-3" cy="-4" r="3" fill="#fff"/>`;
 return `<circle r="${r}" fill="var(--eye)"/><circle r="${r}" fill="url(#irT)"/><ellipse cy="${r*.45}" rx="${r*.6}" ry="${r*.35}" fill="#fff" opacity=".3"/><circle r="${E.pu}" fill="#12142e"/><circle r="${r}" fill="none" stroke="rgba(10,10,40,.45)" stroke-width="2"/><circle cx="${-r*.32}" cy="${-r*.38}" r="${r*.32}" fill="#fff"/><circle cx="${r*.38}" cy="${r*.42}" r="${r*.14}" fill="#fff" opacity=".9"/>`
  +(E.spark?`<path d="M${r*.45} ${-r*.75} l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#fff"/>`:'');
}
function eyeSVG(c,s,m){
 const E=EYE[c.eye],lc=c.lc||'#2a2147',sh=mir(E.sh,m);
 if(E.dot)return `<g id="e${s}"><g transform="scale(${G.es})"><path d="${sh}" fill="#1d1a24"/><g id="g${s}"><circle cx="-4" cy="-6" r="4" fill="#fff"/><circle cx="4" cy="5" r="1.8" fill="#fff" opacity=".8"/></g></g></g>`;
 const ln=(d,w,x='')=>d?`<path d="${mir(d,m)}" fill="none" stroke="${lc}" stroke-width="${w}" stroke-linecap="round"${x}/>`:'';
 return `<g id="e${s}"><g transform="scale(${G.es})"><clipPath id="ec${s}"><path d="${sh}"/></clipPath>`
  +`<path d="${sh}" fill="${E.real?'#f4eeea':'#fff'}"/><g clip-path="url(#ec${s})"><g id="g${s}">${irisSVG(E)}</g>`
  +`<path d="${sh}" fill="url(#${E.real?'sclR':'lidSh'})"/>${E.real?`<path d="${sh}" fill="url(#lidSh)"/>`:''}</g>`
  +(E.toon?`<path d="${sh}" fill="none" stroke="#222" stroke-width="4"/>`:'')
  +ln(E.crease,2,' opacity=".45"')+ln(E.lash,E.lw)+ln(E.flick,E.real?2.5:3)+ln(E.low,1.5,' opacity=".45"')
  +`</g></g>`;
}
/* ---------- 眉毛 ---------- */
const BROW={
 anime:{d:'M-22 2 Q0 -8 22 0',w:5},
 boy:{d:'M-24 3 Q-2 -7 24 -2',w:7},
 chibi:{d:'M-14 1 Q0 -6 14 1',w:5},
 real:{f:'M-26 5 Q-14 -5 4 -6 Q18 -6 27 0 Q16 -1 4 -1 Q-12 0 -25 9Z'},
 realM:{f:'M-28 7 Q-14 -7 4 -8 Q18 -8 29 0 Q16 1 4 1 Q-12 2 -27 12Z'},
 toon:{d:'M-20 2 Q0 -10 20 0',w:9},
 dot:{d:'M-10 0 Q0 -5 10 0',w:4}
};
function browSVG(c,s,m){const B=BROW[c.brow],bc=c.bc||'#3a2a55';
 return `<g id="k${s}">`+(B.f?`<path d="${mir(B.f,m)}" fill="${bc}"/>`:`<path d="${mir(B.d,m)}" fill="none" stroke="${bc}" stroke-width="${B.w}" stroke-linecap="round"/>`)+'</g>'}

/* ---------- 頭髮（標準臉座標） ---------- */
const HAIR={
 longB:{b:hp('M500 300 Q494 146 640 144 Q786 146 780 300 L796 470 Q806 545 790 585 Q768 602 750 565 L742 480 L538 480 L530 565 Q512 602 490 585 Q474 545 484 470Z')+'<path d="M520 330 Q512 420 500 560 M760 330 Q768 420 780 560" stroke="rgba(0,0,0,.18)" stroke-width="3" fill="none"/>'},
 bangs:{f:hp('M520 316 Q500 150 640 140 Q780 150 760 316 Q756 280 744 258 L742 290 Q728 248 708 228 L708 268 Q688 236 664 222 L662 262 Q646 232 626 222 L616 266 Q598 236 578 228 L572 276 Q556 256 540 262 L540 296 Q530 300 520 316Z')},
 sides:{f:hp('M520 296 Q508 370 520 440 Q530 462 542 440 Q534 372 550 300Z')+hp('M760 296 Q772 370 760 440 Q750 462 738 440 Q746 372 730 300Z')},
 shine:{f:'<path d="M566 196 Q640 168 714 196" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="7" stroke-linecap="round" stroke-dasharray="16 9"/>'},
 boyB:{b:hp('M512 310 Q500 146 640 142 Q780 146 768 310 L764 360 Q752 330 750 300 L530 300 Q528 330 516 360Z')},
 boyF:{f:hp('M516 312 Q500 146 640 138 Q782 146 764 312 Q760 268 748 240 L744 276 Q726 236 700 222 Q690 252 668 262 Q672 236 652 224 Q620 250 586 254 Q600 240 604 226 Q574 244 548 290 Q546 262 554 240 Q532 270 516 312Z')},
 spiky:{f:hp('M512 300 Q488 220 530 170 L520 128 L568 152 L590 104 L622 142 L658 98 L676 142 L720 112 L722 160 L770 150 L752 196 Q790 240 768 300 Q760 262 742 246 L736 280 Q720 246 698 236 L692 270 Q672 240 650 232 L640 266 Q624 238 602 236 L590 272 Q574 244 552 250 L546 286 Q532 280 512 300Z')},
 twin:{b:hp('M522 250 Q420 300 432 500 Q452 560 494 480 Q490 360 540 305Z')+hp('M758 250 Q860 300 848 500 Q828 560 786 480 Q790 360 740 305Z')+'<circle cx="530" cy="262" r="13" fill="var(--tie)"/><circle cx="750" cy="262" r="13" fill="var(--tie)"/>'},
 chibiB:{b:hp('M506 300 Q498 148 640 146 Q782 148 774 300 L778 380 Q760 400 740 380 L540 380 Q520 400 502 380Z')},
 bobB:{b:hp('M504 300 Q496 148 640 146 Q784 148 776 300 L786 430 Q780 462 750 454 L742 410 L538 410 L530 454 Q500 462 494 430Z')},
 buns:{b:'<circle cx="546" cy="172" r="44" fill="var(--hair)"/><circle cx="734" cy="172" r="44" fill="var(--hair)"/><circle cx="546" cy="172" r="44" fill="url(#hairSh)"/><circle cx="734" cy="172" r="44" fill="url(#hairSh)"/><path d="M520 160 Q546 140 572 160 M708 160 Q734 140 760 160" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>'},
 chibiF:{f:hp('M518 316 Q500 150 640 140 Q780 150 762 316 Q752 266 728 244 Q722 268 706 280 Q704 248 682 230 Q672 262 650 270 Q650 240 632 228 Q616 262 592 270 Q596 246 584 232 Q562 252 556 280 Q546 262 548 244 Q526 266 518 316Z')},
 rwB:{b:hp('M516 300 Q500 150 640 146 Q780 150 764 300 Q772 360 792 410 Q818 470 798 520 Q826 566 806 620 L474 620 Q454 566 482 520 Q462 470 488 410 Q508 360 516 300Z')},
 rwF:{f:hp('M524 340 Q508 166 630 152 Q770 156 756 330 Q752 270 730 236 Q700 206 660 210 Q630 214 612 206 Q600 222 590 240 Q560 262 546 300 Q536 320 524 340Z')
   +'<path d="M616 206 Q572 236 538 320 M624 208 Q684 204 726 242 Q748 272 752 318 M634 212 Q690 222 728 272" stroke="rgba(0,0,0,.2)" stroke-width="2" fill="none"/><path d="M596 186 Q560 206 540 258 M664 170 Q724 178 744 228" stroke="rgba(255,255,255,.22)" stroke-width="4" stroke-linecap="round" fill="none"/>'},
 rwL:{f:hp('M542 236 Q504 350 512 430 Q520 500 498 560 Q488 600 506 626 Q532 590 546 520 Q556 450 546 370 Q544 300 552 236Z')+hp('M738 236 Q776 350 768 430 Q760 500 782 560 Q792 600 774 626 Q748 590 734 520 Q724 450 734 370 Q736 300 728 236Z')
   +'<path d="M534 300 Q518 380 526 450 Q532 520 512 600 M746 300 Q762 380 754 450 Q748 520 768 600" stroke="rgba(0,0,0,.2)" stroke-width="2" fill="none"/>'},
 rmB:{b:hp('M528 300 Q514 160 640 152 Q766 160 752 300 L750 336 Q744 306 738 296 L542 296 Q536 306 530 336Z')},
 rmF:{f:hp('M526 300 Q508 140 652 142 Q780 150 756 300 Q752 252 736 226 Q704 206 664 216 Q624 226 596 216 Q566 214 548 240 Q534 262 526 300Z')
   +'<path d="M598 214 Q592 182 612 154 M640 210 Q680 186 730 196 M660 158 Q710 160 740 200" stroke="rgba(0,0,0,.25)" stroke-width="2" fill="none"/><path d="M620 160 Q680 150 720 170" stroke="rgba(255,255,255,.2)" stroke-width="4" stroke-linecap="round" fill="none"/>'},
 roB:{f:hp('M530 334 Q520 250 566 212 Q560 260 556 300 L548 356Z')+hp('M750 334 Q760 250 714 212 Q720 260 724 300 L732 356Z')+hp('M566 214 Q640 172 714 214 Q680 196 640 198 Q600 196 566 214Z')},
 toonF:{f:hp('M528 270 Q514 150 640 144 Q766 150 752 270 Q742 236 700 226 Q640 216 580 226 Q538 236 528 270Z')+hp('M570 214 Q556 160 604 186 Q606 124 646 172 Q672 120 690 184 Q732 160 714 220 Q680 200 640 202 Q600 200 570 214Z')}
};
/* ---------- 配件（標準臉座標，畫在前髮之後；cat 例外，畫在前髮之前） ---------- */
const ACC={
 cat:'<path d="M530 205 L520 106 L604 160Z" fill="var(--hair)"/><path d="M750 205 L760 106 L676 160Z" fill="var(--hair)"/><path d="M538 182 L533 132 L576 162Z" fill="#ff9fb5"/><path d="M742 182 L747 132 L704 162Z" fill="#ff9fb5"/>',
 ribbon:'<g transform="translate(722 168) rotate(18)"><path d="M0 0 L-38 -22 Q-46 0 -38 22Z M0 0 L38 -22 Q46 0 38 22Z" fill="var(--tie)"/><path d="M0 0 L-30 -14 M0 0 L30 -14" stroke="rgba(0,0,0,.2)" stroke-width="2"/><circle r="9" fill="var(--tie)"/></g>',
 ph:'<path d="M525 290 Q520 140 640 140 Q760 140 755 290" fill="none" stroke="#2b2f55" stroke-width="12" stroke-linecap="round"/><rect x="506" y="282" width="32" height="66" rx="13" fill="#2b2f55"/><rect x="742" y="282" width="32" height="66" rx="13" fill="#2b2f55"/><rect x="512" y="296" width="8" height="38" rx="4" fill="#5cf2c2"/><rect x="760" y="296" width="8" height="38" rx="4" fill="#5cf2c2"/>',
 beard:'<path d="M598 376 Q620 360 640 368 Q660 360 682 376 Q678 388 660 384 Q648 380 640 384 Q632 380 620 384 Q602 388 598 376Z" fill="var(--hair)"/><path d="M604 414 Q616 444 640 450 Q664 444 676 414 Q660 428 640 430 Q620 428 604 414Z" fill="var(--hair)"/>'
};
/* 依幾何算位置的配件 */
function accAbs(c){const{cx,ey,ex,rx,cy}=G;let s='';
 const A=c.acc||[];
 if(A.includes('gl'))s+=`<g fill="rgba(200,230,255,.15)" stroke="#2a2147" stroke-width="5" stroke-linecap="round"><circle cx="${cx-ex}" cy="${ey}" r="31"/><circle cx="${cx+ex}" cy="${ey}" r="31"/><path d="M${cx-ex+31} ${ey-2} Q${cx} ${ey-12} ${cx+ex-31} ${ey-2}" fill="none"/><path d="M${cx-ex-31} ${ey-4} L${cx-rx+2} ${ey-12} M${cx+ex+31} ${ey-4} L${cx+rx-2} ${ey-12}" fill="none"/></g>`;
 if(A.includes('glr'))s+=`<g fill="rgba(200,220,240,.12)" stroke="#4a4038" stroke-width="3.5"><rect x="${cx-ex-32}" y="${ey-20}" width="62" height="38" rx="14"/><rect x="${cx+ex-30}" y="${ey-20}" width="62" height="38" rx="14"/><path d="M${cx-ex+30} ${ey-6} Q${cx} ${ey-14} ${cx+ex-30} ${ey-6} M${cx-ex-32} ${ey-6} L${cx-rx+1} ${ey-10} M${cx+ex+32} ${ey-6} L${cx+rx-1} ${ey-10}" fill="none"/></g>`;
 if(A.includes('earring'))for(const m of[-1,1])s+=`<circle cx="${cx+m*(rx-1)}" cy="${cy+30}" r="4" fill="#e8c46a"/><path d="M${cx+m*(rx-1)} ${cy+34} L${cx+m*(rx-1)} ${cy+46}" stroke="#e8c46a" stroke-width="2"/><circle cx="${cx+m*(rx-1)}" cy="${cy+50}" r="5" fill="#f4e0a0" stroke="#c9a040"/>`;
 return s;
}

/* ---------- 臉 ---------- */
function earsSVG(c){const{cx,cy,rx}=G;
 if(c.geo==='mascot')return '';
 if(c.geo==='real')return [-1,1].map(m=>`<g transform="translate(${cx+m*(rx-4)} ${cy+6}) scale(${m} 1)"><path d="M0 -24 Q16 -28 18 -6 Q20 16 4 26 Q-2 20 -2 0Z" fill="var(--skin)"/><path d="M4 -16 Q12 -16 12 -4 Q12 8 4 14" stroke="${SKD}" stroke-width="2" fill="none" opacity=".6"/></g>`).join('');
 const r=c.geo==='toon'?24:c.geo==='chibi'?18:16;
 return `<circle cx="${cx-rx-1}" cy="${cy+7}" r="${r}" fill="var(--skin)"/><circle cx="${cx+rx+1}" cy="${cy+7}" r="${r}" fill="var(--skin)"/>`;
}
function noseSVG(c){const{cx,ey,my}=G;
 switch(c.geo){
  case 'anime':return `<path d="M${cx-4} ${ey+27} Q${cx} ${ey+34} ${cx+4} ${ey+27}" fill="none" stroke="${SKD}" stroke-width="3" stroke-linecap="round"/>`;
  case 'chibi':return `<ellipse cx="${cx}" cy="${ey+38}" rx="3" ry="2" fill="${SKD}"/>`;
  case 'toon':return `<ellipse cx="${cx}" cy="${ey+50}" rx="18" ry="14" fill="var(--skin)" stroke="${SKD}" stroke-width="3"/><ellipse cx="${cx-5}" cy="${ey+45}" rx="5" ry="3.5" fill="#fff" opacity=".35"/>`;
  case 'mascot':return `<path d="M${cx-14} ${my-30} Q${cx} ${my-36} ${cx+14} ${my-30} Q${cx+4} ${my-16} ${cx} ${my-16} Q${cx-4} ${my-16} ${cx-14} ${my-30}Z" fill="#2a1a14"/><ellipse cx="${cx-4}" cy="${my-30}" rx="4" ry="2" fill="#fff" opacity=".5"/>`;
  case 'real':return `<path d="M${cx-6} ${ey+4} Q${cx-10} ${ey+28} ${cx-15} ${ey+42}" stroke="rgba(140,75,55,.28)" stroke-width="5" fill="none" stroke-linecap="round"/>`
   +`<ellipse cx="${cx+2}" cy="${ey+44}" rx="5" ry="8" fill="#fff" opacity=".16"/><ellipse cx="${cx}" cy="${ey+60}" rx="13" ry="4" fill="rgba(120,60,45,.2)"/>`
   +`<path d="M${cx-17} ${ey+47} Q${cx-13} ${ey+58} ${cx-5} ${ey+55} Q${cx} ${ey+59} ${cx+5} ${ey+55} Q${cx+13} ${ey+58} ${cx+17} ${ey+47}" stroke="rgba(120,60,45,.55)" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
   +`<path d="M${cx-5} ${ey+63} L${cx-4} ${my-7} M${cx+5} ${ey+63} L${cx+4} ${my-7}" stroke="rgba(130,65,50,.15)" stroke-width="3"/><ellipse cx="${cx}" cy="${my+22}" rx="16" ry="5" fill="rgba(120,60,45,.16)"/>`;
 }
 return '';
}
function realShade(c){const{cx,cy,rx,ry,ex,ey,my}=G;let s='';
 s+=`<ellipse cx="${cx-ex}" cy="${ey-6}" rx="31" ry="17" fill="rgba(120,60,50,.12)"/><ellipse cx="${cx+ex}" cy="${ey-6}" rx="31" ry="17" fill="rgba(120,60,50,.12)"/>`;
 s+=`<path d="M${cx-rx+10} ${cy+20} Q${cx-rx+22} ${cy+72} ${cx-34} ${cy+ry-18}" stroke="rgba(140,70,50,.12)" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M${cx+rx-10} ${cy+20} Q${cx+rx-22} ${cy+72} ${cx+34} ${cy+ry-18}" stroke="rgba(140,70,50,.12)" stroke-width="12" fill="none" stroke-linecap="round"/>`;
 if((c.acc||[]).includes('wrinkle'))
  s+=`<path d="M${cx-28} ${ey+46} Q${cx-40} ${my} ${cx-32} ${my+22} M${cx+28} ${ey+46} Q${cx+40} ${my} ${cx+32} ${my+22} M${cx-40} ${cy-74} Q${cx} ${cy-84} ${cx+40} ${cy-74} M${cx-30} ${cy-62} Q${cx} ${cy-70} ${cx+30} ${cy-62} M${cx-ex-18} ${ey+14} Q${cx-ex} ${ey+22} ${cx-ex+16} ${ey+14} M${cx+ex-16} ${ey+14} Q${cx+ex} ${ey+22} ${cx+ex+18} ${ey+14}" stroke="rgba(120,60,45,.3)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 return s;
}
const MOUTH={anime:['#8a2a3c','#5a1626',3],chibi:['#8a2a3c','#5a1626',4],real:['#6a2630','#b3685f',7],toon:['#5a1626','#222',4],mascot:['#5a1626','#3a2420',5]};
function mascotHead(){const{cx,cy}=G;
 return [-1,1].map(m=>`<circle cx="${cx+m*96}" cy="${cy-98}" r="44" fill="var(--hair)"/><circle cx="${cx+m*96}" cy="${cy-98}" r="24" fill="#f7c2b0"/>`).join('');
}

/* ---------- 身體 ---------- */
const bow=(x,y,k)=>`<g transform="translate(${x} ${y}) scale(${k})" fill="var(--tie)"><path d="M0 0 L-44 -20 Q-52 0 -44 22Z M0 0 L44 -20 Q52 0 44 22Z"/><path d="M-6 6 L-18 48 L-4 40Z M6 6 L18 48 L4 40Z"/><circle r="9"/></g>`;
const torso=d=>`<path d="${d}" fill="var(--outfit)"/><path d="${d}" fill="url(#bodySh)"/>`;
const neck=d=>`<path d="${d}" fill="var(--skin)"/>`;
const BODY={
 anime(c){let s=torso('M455 720 L480 545 Q640 490 800 545 L825 720Z')+neck('M612 400 L612 515 Q640 532 668 515 L668 400Z')+'<path d="M612 438 Q640 478 668 438 L668 400 L612 400Z" fill="rgba(120,50,40,.2)"/>';
  if(c.out==='idol')s+='<path d="M548 528 Q640 498 732 528 L712 590 Q640 622 568 590Z" fill="var(--collar)"/><path d="M560 542 Q640 514 720 542" fill="none" stroke="var(--tie)" stroke-width="5"/><path d="M612 510 L640 556 L668 510Z" fill="var(--skin)"/>'+bow(640,574,1);
  if(c.out==='suit')s+='<path d="M590 506 L640 600 L690 506 Q640 524 590 506Z" fill="var(--collar)"/><path d="M632 528 L648 528 L651 544 L629 544Z" fill="var(--tie)"/><path d="M630 544 L650 544 L656 604 L640 622 L624 604Z" fill="var(--tie)"/><path d="M590 506 L626 600 L604 614 M690 506 L654 600 L676 614" stroke="rgba(0,0,0,.3)" stroke-width="3" fill="none"/><circle cx="640" cy="660" r="5" fill="rgba(0,0,0,.3)"/>';
  if(c.out==='hoodie')s+='<path d="M548 532 Q640 482 732 532 Q712 574 640 576 Q568 574 548 532Z" fill="var(--outfit)" stroke="rgba(0,0,0,.25)" stroke-width="2"/><path d="M574 532 Q640 500 706 532 Q690 556 640 558 Q590 556 574 532Z" fill="rgba(0,0,0,.28)"/><path d="M620 560 L614 622 M660 560 L666 622" stroke="#eee" stroke-width="4" stroke-linecap="round"/>';
  return s},
 chibi(c){return torso('M548 720 L560 560 Q640 520 720 560 L732 720Z')+neck('M624 470 L624 540 Q640 548 656 540 L656 470Z')
  +'<path d="M584 548 Q640 528 696 548 L684 588 Q640 606 596 588Z" fill="var(--collar)"/><path d="M592 558 Q640 540 688 558" fill="none" stroke="var(--tie)" stroke-width="4"/><path d="M624 540 L640 566 L656 540Z" fill="var(--skin)"/>'+bow(640,578,.62)},
 real(c){let s=torso('M405 720 L418 600 Q430 548 520 530 Q580 518 600 512 L680 512 Q700 518 760 530 Q850 548 862 600 L875 720Z')
  +neck('M598 380 L594 522 Q640 546 686 522 L682 380Z')+'<path d="M598 430 Q640 500 682 430 L682 400 L598 400Z" fill="rgba(110,50,35,.28)"/><path d="M612 448 Q622 492 634 520 M668 448 Q658 492 646 520" stroke="rgba(120,60,45,.15)" stroke-width="3" fill="none"/>';
  const lap='<path d="M594 516 L558 562 L600 592 L574 612 L640 664 M686 516 L722 562 L680 592 L706 612 L640 664" stroke="rgba(0,0,0,.3)" stroke-width="3" fill="none" stroke-linejoin="round"/>';
  if(c.out==='blazer')s+='<path d="M588 518 L640 650 L692 518 L682 514 L640 604 L598 514Z" fill="var(--collar)"/>'+lap+'<path d="M606 522 Q640 566 674 522" stroke="#e8c46a" stroke-width="2" fill="none"/><circle cx="640" cy="560" r="5" fill="#f4e0a0" stroke="#c9a040"/>';
  if(c.out==='suit'||c.out==='coat'){s+='<path d="M596 514 L640 630 L684 514Z" fill="var(--collar)"/><path d="M596 512 L616 560 L638 534Z M684 512 L664 560 L642 534Z" fill="var(--collar)" stroke="rgba(0,0,0,.25)" stroke-width="2"/><path d="M629 532 L651 532 L655 554 L625 554Z" fill="var(--tie)"/><path d="M626 554 L654 554 L662 650 L640 676 L618 650Z" fill="var(--tie)"/><path d="M630 580 L658 600 M626 620 L660 640" stroke="rgba(255,255,255,.15)" stroke-width="5"/>'+lap;
   s+=c.out==='coat'?'<rect x="732" y="620" width="56" height="8" rx="3" fill="rgba(0,0,0,.15)"/><rect x="742" y="590" width="6" height="34" rx="3" fill="#2f6fd6"/><rect x="754" y="594" width="6" height="30" rx="3" fill="#d6402f"/>':'<path d="M732 612 L770 606 L772 618 L734 624Z" fill="#fff" opacity=".9"/>'}
  return s},
 toon(c){return torso('M478 720 L494 560 Q640 518 786 560 L802 720Z')+neck('M608 410 L608 530 Q640 545 672 530 L672 410Z')+'<path d="M608 456 Q640 500 672 456 L672 420 L608 420Z" fill="rgba(120,50,40,.2)"/><path d="M596 532 Q640 560 684 532" stroke="rgba(0,0,0,.3)" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M640 590 l9 18 20 3 -14 14 3 20 -18 -9 -18 9 3 -20 -14 -14 20 -3Z" fill="#fff" opacity=".85"/>'},
 mascot(c){return '<ellipse cx="640" cy="620" rx="130" ry="112" fill="var(--hair)"/><ellipse cx="640" cy="620" rx="130" ry="112" fill="url(#bodySh)"/><ellipse cx="640" cy="636" rx="80" ry="72" fill="var(--skin)"/>'
  +'<path d="M540 506 Q640 552 740 506 L746 536 Q640 584 534 536Z" fill="var(--outfit)"/><path d="M690 540 L720 610 L696 616 L672 548Z" fill="var(--outfit)"/><path d="M540 520 Q640 562 740 520" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/>'}
};

/* ---------- 組合 ---------- */
function buildAvatar(c){
 G=GEO[c.geo];const{cx,cy,rx,ry,bx,by,br}=G,T=normT(G);
 const parts=k=>(c.hs||[]).map(h=>HAIR[h][k]||'').join('');
 const fp=faceP(G,...FACE[c.geo]);
 const hand=c.geo==='mascot'?'var(--hair)':'var(--skin)';
 const arm=s=>`<g id="arm${s}"><line x1="0" y1="0" x2="0" y2="${G.arm}" stroke="var(--outfit)" stroke-width="${G.aw}" stroke-linecap="round"/><circle cx="0" cy="${G.arm+G.aw*.28}" r="${G.hand}" fill="${hand}"/></g>`;
 const [mf,ms,mw]=c.mouth||MOUTH[c.geo];
 const acc=(c.acc||[]).filter(a=>ACC[a]&&a!=='cat').map(a=>ACC[a]).join('');
 let h=DEFS+arm('L')+arm('R');
 h+=`<g id="headB"><g transform="${T}">${parts('b')}</g></g>`;
 h+=`<g transform="translate(0 ${G.dy})">${BODY[c.geo](c)}</g>`;
 h+=`<g id="head">${c.geo==='mascot'?mascotHead():''}${earsSVG(c)}<path d="${fp}" fill="${c.geo==='mascot'?'var(--hair)':'var(--skin)'}"/>`;
 if(c.geo==='real')h+=`<path d="${fp}" fill="url(#faceSh)"/>`+realShade(c);
 if(c.geo==='mascot')h+=`<ellipse cx="${cx}" cy="${G.my-16}" rx="60" ry="44" fill="var(--skin)"/>`;
 else h+=`<path d="${fp}" fill="url(#faceTop)"/>`;
 h+=`<ellipse id="bl" cx="${cx-bx}" cy="${by}" rx="${br}" ry="${br*.6}" fill="url(#blG)" opacity=".1"/><ellipse id="br" cx="${cx+bx}" cy="${by}" rx="${br}" ry="${br*.6}" fill="url(#blG)" opacity=".1"/>`;
 h+=eyeSVG(c,'L',-1)+eyeSVG(c,'R',1)+browSVG(c,'L',-1)+browSVG(c,'R',1)+noseSVG(c);
 h+=`<path id="mouth" d="" fill="${mf}" stroke="${ms}" stroke-width="${mw}" stroke-linejoin="round" transform="translate(${cx} ${G.my}) scale(${G.ms})"/>`;
 h+=`<g transform="${T}">${(c.acc||[]).includes('cat')?ACC.cat:''}${parts('f')}${acc}</g>${accAbs(c)}</g>`;
 return h;
}
