/* ---------- 情緒參數 ---------- */
const EM={
 normal:{smile:.3,bL:0,bR:0,yL:0,yR:0,eye:1,tilt:0,lean:0,blush:.1,rate:1,pitch:1},
 happy:{smile:1,bL:-6,bR:6,yL:-5,yR:-5,eye:.85,tilt:3,lean:.6,blush:.5,rate:1.08,pitch:1.1},
 surprised:{smile:-.1,bL:-8,bR:8,yL:-14,yR:-14,eye:1.2,tilt:0,lean:.3,blush:.15,rate:1.05,pitch:1.15,open:.5},
 curious:{smile:.1,bL:6,bR:10,yL:0,yR:-12,eye:1,tilt:-8,lean:0,blush:.1,rate:.97,pitch:1.08},
 sad:{smile:-.7,bL:-12,bR:12,yL:2,yR:2,eye:.8,tilt:5,lean:-.4,blush:0,rate:.88,pitch:.92},
 serious:{smile:-.05,bL:10,bR:-10,yL:2,yR:2,eye:.92,tilt:0,lean:.4,blush:0,rate:.95,pitch:.95}
};
const cur={...EM.normal,open:0};let tgt=EM.normal;
