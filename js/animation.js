/* ---------- 動畫 ---------- */
let t=0,last=performance.now(),nextBlink=2,blink=0,gaze={x:0,y:0,tx:0,ty:0},nextGaze=1;
let wave=0,nodAmp=0,mouthO=0,sway=rnd(0,9);
const A=(id,k,v)=>$(id).setAttribute(k,v);
const bars=document.querySelectorAll('.bar');
function frame(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
 const k=Math.min(1,dt*5);
 for(const key in tgt)if(typeof tgt[key]==='number')cur[key]+=(tgt[key]-cur[key])*k;
 cur.open+=((tgt.open||0)-cur.open)*k;
 /* 眨眼 */
 nextBlink-=dt;if(nextBlink<=0){blink=.16;nextBlink=rnd(2,5.5)}
 const bl=blink>0?Math.sin(Math.PI*(1-blink/.16)):0;if(blink>0)blink-=dt;
 /* 視線 */
 nextGaze-=dt;if(nextGaze<=0){nextGaze=rnd(1.2,3.5);const c=Math.random()<(speaking?.7:.4);gaze.tx=c?(slideT&&Math.random()<.5?-.9:0):rnd(-1,1);gaze.ty=c?0:rnd(-.6,.6)}
 gaze.x+=(gaze.tx-gaze.x)*dt*8;gaze.y+=(gaze.ty-gaze.y)*dt*8;
 /* 嘴巴 */
 pulse=Math.max(0,pulse-dt*3);
 let target=0;
 if(speaking){target=.2+.55*Math.abs(Math.sin(t*10+Math.sin(t*2.7)*2.5))*(.75+.25*pulse+.2*Math.sin(t*3.3));}
 mouthO+=(target-mouthO)*Math.min(1,dt*18);
 const o=Math.min(1,mouthO+cur.open*(speaking?.4:1));
 const s=cur.smile;const w=28+Math.max(s,0)*8-o*5;
 const cy=-s*9;const botMid=3+o*28+Math.max(s,0)*3;
 const ct=2*0-cy,cb=2*botMid-cy;
 A('mouth','d',`M${-w} ${cy} Q0 ${ct} ${w} ${cy} Q0 ${cb} ${-w} ${cy}Z`);
 /* 肢體 */
 nodAmp=Math.max(0,nodAmp-dt*1.8);if(speaking&&Math.random()<dt*.35)nodAmp=Math.max(nodAmp,.5);
 const nod=Math.sin(t*14)*7*nodAmp;
 const breath=Math.sin(t*1.8)*4;
 const swayA=Math.sin(t*.7+sway)*2.2+Math.sin(t*1.3)*1;
 const hx=Math.sin(t*.9)*5+gaze.x*4,hy=nod+breath*.6+cur.lean*8;
 A('head','transform',`translate(${hx} ${hy}) rotate(${cur.tilt+swayA+(speaking?Math.sin(t*3)*1.6:0)} 640 460)`);
 slideSm+=(slideT-slideSm)*Math.min(1,dt*3);
 const M=SM[smode]||SM[2],sc=1+(M.sc-1)*slideSm;
 A('char','transform',`translate(${(M.cx-M.sc*640)*slideSm} ${610*(1-sc)+breath}) scale(${sc})`);
 $('char').style.opacity=1-(M.hide?slideSm:0);
 /* 眼睛 */
 const eo=Math.max(.05,cur.eye*(1-bl*.95));
 const ey=318,gx=gaze.x*5,gy=gaze.y*4;
 A('eL','transform',`translate(595 ${ey}) scale(1 ${eo})`);A('eR','transform',`translate(685 ${ey}) scale(1 ${eo})`);
 for(const c of['L','R']){A('i'+c,'cx',gx);A('i'+c,'cy',gy);A('p'+c,'cx',gx);A('p'+c,'cy',gy);A('h'+c,'cx',gx-5);A('h'+c,'cy',gy-6)}
 A('kL','transform',`translate(595 ${278+cur.yL}) rotate(${cur.bL})`);
 A('kR','transform',`translate(685 ${278+cur.yR}) rotate(${-cur.bR})`);
 A('bl','opacity',cur.blush);A('br','opacity',cur.blush);
 /* 手臂 */
 wave=Math.max(0,wave-dt);
 const lift=speaking?Math.max(0,Math.sin(t*1.1))*18:0;
 const aR=wave>0?-148+Math.sin(t*9)*16:15+Math.sin(t*1.2)*2;
 A('armL','transform',`translate(500 565) rotate(${-15-lift*(nodAmp>0?1.8:1)+Math.sin(t*1.2+1)*2})`);
 A('armR','transform',`translate(780 565) rotate(${aR})`);
 /* 背景小動畫 */
 bars.forEach((b,i)=>{const h=14+Math.abs(Math.sin(t*2+i*.9))*(speaking?70:30);b.setAttribute('height',h);b.setAttribute('y',260-h)});
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
