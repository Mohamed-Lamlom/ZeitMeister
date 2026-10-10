/*
 * ZeitMeister — German Time Trainer
 * Main application logic
 *
 * Main sections in this file:
 * 1. UI translations
 * 2. DOM references and application state
 * 3. Clock rendering and difficulty
 * 4. German time-expression logic
 * 5. Practice controls and answer checking
 * 6. Reverse mode
 * 7. Settings panel and accessibility
 * 8. Settings summary and mode switching
 * 9. Language application and startup
 */

// ============================================================
// 1. UI TRANSLATIONS
// ============================================================
const I18N={
ar:{title:"ZeitMeister — الساعة بالألماني",h1:"كام الساعة بالألماني؟",tip:"اضغط على الساعة عشان توقفها على وقت، وبعدها اضغط على المربع عشان تشوف الإجابة",tipMobileStart:"اضغط على الساعة",tipMobileThen:"ثم",tipMobileA11y:"اضغط على الساعة، ثم اضغط على مربع الإجابة",cover:"اضغط هنا لإظهار الإجابة",chipStreak:"🔥 السلسلة",chipTen:"🔟 جولات",chipBest:"🏆 أفضل سلسلة",inRow:"ورا بعض",newq:"سؤال جديد",chk:"تحقق من إجابتي",live:"▶ شغّل الساعة تاني",settings:"الإعدادات",close:"إغلاق",clockA11y:"الساعة — اضغط لإيقافها وتوليد سؤال",revealA11y:"إظهار أو إخفاء الإجابة",clockOption:"اختيار الساعة {n}",inputA11y:"اكتب إجابتك بالألماني",infLabel:"Inoffiziell",offLabel:"Offiziell",lblLang:"اللغة",lblStyle:"الصيغة",lblMode:"طريقة التدريب",lblClockLevel:"مستوى الساعة",revNormal:"🟢 عادي",revMedium:"🟡 متوسط",revHard:"🔴 صعب",revImpossible:"💀 المستحيل",lblTimes:"الأوقات",modeRead:"شوف الإجابة",modeType:"اكتب الإجابة",modeRev:"بالعكس",stepHour:"ساعة عشوائية",step5:"كل 5 دقايق",step1:"كل دقيقة",step15:"ربع / نصف",stepShort15:"ربع / نصف",round:"جولة من 10 أسئلة",roundShort:"جولة 10",rst:"تصفير الإحصائيات",rstConfirm:"اضغط تاني للتأكيد",progress:"التقدّم",progressTitle:"إجمالي التقدّم",progressType:"وضع الكتابة",progressReverse:"وضع بالعكس",progressAttempted:"الأسئلة المجاب عنها",progressCorrect:"الإجابات الصحيحة",progressAccuracy:"نسبة الإجابات الصحيحة",score:"النتيجة: {ok}/{n}",roundDone:"خلصت الجولة: {ok}/10",mistakes:" — الأخطاء: ",clickFirst:"اضغط على الساعة الأول عشان تقف على وقت",ok:"✔ صح!",okAlt:"✔ صح! (صيغة تانية مقبولة)",bad:"✘ مش مظبوط — الإجابة الصح ظاهرة فوق",revBad:"✘ غلط — الساعة الصح معلّمة بالأخضر"},
en:{title:"ZeitMeister — German Time Trainer",h1:"What time is it?",tip:"Click the clock to stop it, then reveal the answer",tipMobileStart:"Tap the clock",tipMobileThen:"then",tipMobileA11y:"Tap the clock, then tap the answer box",cover:"Tap to reveal the answer",chipStreak:"🔥 Streak",chipTen:"🔟 Rounds",chipBest:"🏆 Best streak",inRow:"in a row",newq:"New question",chk:"Check answer",live:"▶ Resume the clock",settings:"Settings",close:"Close",clockA11y:"Clock — press to stop it and generate a question",revealA11y:"Show or hide the answer",clockOption:"Clock {n}",inputA11y:"Type your answer in German",infLabel:"Inoffiziell",offLabel:"Offiziell",lblLang:"Language",lblStyle:"Style",lblMode:"Practice mode",lblClockLevel:"Clock difficulty",revNormal:"🟢 Normal",revMedium:"🟡 Medium",revHard:"🔴 Hard",revImpossible:"💀 Impossible",lblTimes:"Time difficulty",modeRead:"Read",modeType:"Type",modeRev:"Reverse",stepHour:"Random hour",step5:"Every 5 min",step1:"Every minute",step15:"Quarter / half",stepShort15:"Quarter / half",round:"10-question round",roundShort:"10-question round",rst:"Reset stats",rstConfirm:"Tap again to confirm",progress:"Progress",progressTitle:"Practice progress",progressType:"Type mode",progressReverse:"Reverse mode",progressAttempted:"Questions answered",progressCorrect:"Correct answers",progressAccuracy:"Accuracy",score:"Score: {ok}/{n}",roundDone:"Round complete: {ok}/10",mistakes:" — Mistakes: ",clickFirst:"Click the clock first to stop it at a time",ok:"✔ Correct!",okAlt:"✔ Correct! (another accepted form)",bad:"✘ Not quite — the correct answer is shown above",revBad:"✘ Incorrect — the correct clock is highlighted in green"},
de:{title:"ZeitMeister — Uhrzeit-Trainer",h1:"Wie spät ist es?",tip:"Klicke auf die Uhr, um sie anzuhalten, und decke dann die Antwort auf",tipMobileStart:"Tippe auf die Uhr",tipMobileThen:"dann",tipMobileA11y:"Tippe auf die Uhr und dann auf das Antwortfeld",cover:"Klicken, um die Antwort aufzudecken",chipStreak:"🔥 Serie",chipTen:"🔟 Runden",chipBest:"🏆 Beste Serie",inRow:"in Folge",newq:"Neue Frage",chk:"Antwort prüfen",live:"▶ Uhr weiterlaufen lassen",settings:"Einstellungen",close:"Schließen",clockA11y:"Uhr — anklicken, um sie anzuhalten und eine Frage zu erzeugen",revealA11y:"Antwort ein- oder ausblenden",clockOption:"Uhr {n}",inputA11y:"Uhrzeit auf Deutsch eingeben",infLabel:"Inoffiziell",offLabel:"Offiziell",lblLang:"Sprache",lblStyle:"Sprachform",lblMode:"Übungsmodus",lblClockLevel:"Schwierigkeitsgrad der Uhr",revNormal:"🟢 Normal",revMedium:"🟡 Mittel",revHard:"🔴 Schwer",revImpossible:"💀 Unmöglich",lblTimes:"Schwierigkeitsgrad",modeRead:"Ansehen",modeType:"Eingeben",modeRev:"Umgekehrt",stepHour:"Zufällige Stunde",step5:"Alle 5 Min.",step1:"Jede Min.",step15:"Viertel / halb",stepShort15:"Viertel / halb",round:"10er-Runde",roundShort:"10er-Runde",rst:"Statistik zurücksetzen",rstConfirm:"Zum Bestätigen erneut klicken",progress:"Fortschritt",progressTitle:"Übungsfortschritt",progressType:"Eingabemodus",progressReverse:"Umgekehrter Modus",progressAttempted:"Beantwortete Fragen",progressCorrect:"Richtige Antworten",progressAccuracy:"Trefferquote",score:"Ergebnis: {ok}/{n}",roundDone:"Runde abgeschlossen: {ok}/10",mistakes:" — Fehler: ",clickFirst:"Klicke zuerst auf die Uhr, um sie anzuhalten",ok:"✔ Richtig!",okAlt:"✔ Richtig! (andere gültige Form)",bad:"✘ Noch nicht — die richtige Antwort steht oben",revBad:"✘ Falsch — die richtige Uhr ist grün markiert"}
};
const storageGet=(k,fallback)=>{try{const v=localStorage.getItem(k);return v===null?fallback:v;}catch(_){return fallback;}};
const storageSet=(k,v)=>{try{localStorage.setItem(k,v);}catch(_) {}};
const storageRemove=k=>{try{localStorage.removeItem(k);}catch(_) {}};
const safeNonNegativeInt=(v,fallback=0)=>{const n=Number(v);return Number.isFinite(n)&&n>=0?Math.floor(n):fallback;};
let lang="ar";
const sv=storageGet("gc_lang","");if(sv&&I18N[sv])lang=sv;
const t=(k,v)=>{
  const primary=I18N[lang]&&I18N[lang][k];
  const fallback=I18N.en&&I18N.en[k];
  let x=primary!=null?primary:(fallback!=null?fallback:k);
  if(v)for(const q in v)x=x.split("{"+q+"}").join(v[q]);
  return x;
};
// ============================================================
// 2. DOM REFERENCES & APPLICATION STATE
// ============================================================
const NS="http://www.w3.org/2000/svg";
const ticks=document.getElementById("ticks"),nums=document.getElementById("nums");
for(let i=0;i<60;i++){
  const a=i*6*Math.PI/180,big=i%5===0,r1=big?80:86,r2=90;
  const l=document.createElementNS(NS,"line");
  l.setAttribute("x1",100+r1*Math.sin(a));l.setAttribute("y1",100-r1*Math.cos(a));
  l.setAttribute("x2",100+r2*Math.sin(a));l.setAttribute("y2",100-r2*Math.cos(a));
  l.setAttribute("stroke","var(--fg)");l.setAttribute("stroke-width",big?2.5:1);
  ticks.appendChild(l);
}
for(let n=1;n<=12;n++){
  const a=n*30*Math.PI/180,t=document.createElementNS(NS,"text");
  t.setAttribute("x",100+66*Math.sin(a));t.setAttribute("y",100-66*Math.cos(a)+5);
  t.textContent=n;nums.appendChild(t);
}
const H=document.getElementById("h"),M=document.getElementById("m"),S=document.getElementById("s");
const answer=document.getElementById("answer"),de=document.getElementById("de");
let live=true,raf=null,animRaf=null,step=5,style='inf',curH=null,curM=null,mode='read',revStyle='numbered-step';
const savedStyle=storageGet('gc_style','inf');
style=savedStyle==='off'?'off':'inf';
const savedStep=+(storageGet('gc_step','5'));
step=[1,5,15,60].includes(savedStep)?savedStep:5;
const savedMode=storageGet('gc_mode','read');
mode=['read','type','rev'].includes(savedMode)?savedMode:'read';
const savedRevStyle=storageGet('gc_revstyle','numbered-step');
revStyle=['numbered-step','blank-step','blank-free','blank-impossible'].includes(savedRevStyle)?savedRevStyle:'numbered-step';
const inp=document.getElementById('inp'),res=document.getElementById('res');
const clearTry=()=>{inp.value='';res.textContent='';};
let graded=false,roundDone=false,score={n:0,ok:0,wrong:[]},correctKey=0;
const $=id=>document.getElementById(id);
const extras=$('extras'),ex=$('ex'),rev=$('rev'),opts=$('opts'),revres=$('revres'),scoreEl=$('score'),roundEl=$('round'),typebox=$('typebox');
let streak=0,best=0,completedRounds=0;
streak=safeNonNegativeInt(storageGet("gc_streak",0),0);
best=safeNonNegativeInt(storageGet("gc_best",0),0);
completedRounds=safeNonNegativeInt(storageGet("gc_completed_rounds",0),0);
const progressStorageKeys={
  type:{attempted:"gc_progress_type_attempted",correct:"gc_progress_type_correct"},
  rev:{attempted:"gc_progress_rev_attempted",correct:"gc_progress_rev_correct"}
};
const practiceProgress={
  type:{attempted:safeNonNegativeInt(storageGet(progressStorageKeys.type.attempted,0),0),correct:0},
  rev:{attempted:safeNonNegativeInt(storageGet(progressStorageKeys.rev.attempted,0),0),correct:0}
};
practiceProgress.type.correct=Math.min(practiceProgress.type.attempted,safeNonNegativeInt(storageGet(progressStorageKeys.type.correct,0),0));
practiceProgress.rev.correct=Math.min(practiceProgress.rev.attempted,safeNonNegativeInt(storageGet(progressStorageKeys.rev.correct,0),0));
const cCur=$("c-cur"),cTen=$("c-ten"),cBest=$("c-best");
const setChip=(c,v,sm)=>{c.querySelector("b").textContent=v;c.querySelector("small").textContent=sm;};
function renderProgress(){
  for(const modeKey of ["type","rev"]){
    const label=modeKey==="type"?"Type":"Reverse";
    const stats=practiceProgress[modeKey];
    const percent=stats.attempted?Math.round(stats.correct/stats.attempted*100):0;
    $("progress"+label+"Attempted").textContent=String(stats.attempted);
    $("progress"+label+"Correct").textContent=String(stats.correct);
    $("progress"+label+"Accuracy").textContent=percent+"%";
  }
}
function recordPracticeProgress(ok){
  if(mode!=="type"&&mode!=="rev")return;
  const stats=practiceProgress[mode],keys=progressStorageKeys[mode];
  stats.attempted++;
  if(ok)stats.correct++;
  storageSet(keys.attempted,String(stats.attempted));
  storageSet(keys.correct,String(stats.correct));
  renderProgress();
}
function resetPracticeProgress(){
  for(const modeKey of ["type","rev"]){
    practiceProgress[modeKey].attempted=0;
    practiceProgress[modeKey].correct=0;
    storageRemove(progressStorageKeys[modeKey].attempted);
    storageRemove(progressStorageKeys[modeKey].correct);
  }
  renderProgress();
}
function renderStreak(pop){
  setChip(cCur,streak,t("inRow"));
  setChip(cTen,completedRounds,(roundEl&&roundEl.checked?score.n:0)+"/10");
  setChip(cBest,best,t("inRow"));
  if(pop){cTen.classList.remove("pop");void cTen.offsetWidth;cTen.classList.add("pop");}
}
function bump(ok){
  if(ok){streak++;storageSet("gc_streak",String(streak));if(streak>best){best=streak;storageSet("gc_best",best);}}
  else {streak=0;storageSet("gc_streak","0");}
  renderStreak(ok&&streak%10===0);
}
let rstT=null;
$("rst").addEventListener("click",()=>{
  const b=$("rst");
  if(rstT){clearTimeout(rstT);rstT=null;streak=0;best=0;completedRounds=0;score={n:0,ok:0,wrong:[]};roundDone=false;scoreEl.textContent="";res.textContent="";revres.textContent="";storageRemove("gc_streak");storageRemove("gc_best");storageRemove("gc_completed_rounds");storageRemove("gc_nonum");resetPracticeProgress();renderStreak();b.textContent=t("rst");return;}
  b.textContent=t("rstConfirm");rstT=setTimeout(()=>{rstT=null;b.textContent=t("rst");},3000);
});
roundEl.checked=storageGet("gc_round","0")==="1";
// ============================================================
// 3. CLOCK RENDERING & DIFFICULTY
// ============================================================
function applyClockLevel(){
  const numbered=revStyle==="numbered-step";
  const showTicks=revStyle!=="blank-impossible";
  nums.style.display=numbered?"":"none";
  ticks.style.display=showTicks?"":"none";
  // Medium shows all minute marks. Hard shows only the 12 hour markers.
  [...ticks.children].forEach((el,i)=>{
    if(revStyle==="blank-free"){
      if(i%5!==0){
        el.style.display="none";
        return;
      }
      el.style.display="";
      el.setAttribute("stroke-width","2.5");
      const a=i*6*Math.PI/180;
      el.setAttribute("x1",100+80*Math.sin(a));
      el.setAttribute("y1",100-80*Math.cos(a));
    }else{
      el.style.display="";
      if(i%5===0){
        el.setAttribute("stroke-width","2.5");
        const a=i*6*Math.PI/180;
        el.setAttribute("x1",100+80*Math.sin(a));
        el.setAttribute("y1",100-80*Math.cos(a));
      }else{
        el.setAttribute("stroke-width","1");
        const a=i*6*Math.PI/180;
        el.setAttribute("x1",100+86*Math.sin(a));
        el.setAttribute("y1",100-86*Math.cos(a));
      }
    }
  });
  // The impossible level removes every visual aid except the two useful hands.
  S.style.display=revStyle==="blank-impossible"?"none":"";
}
applyClockLevel();
renderStreak();
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const isIOSStandalone=!!window.navigator.standalone||(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches);
if(isIOS)document.documentElement.classList.add("ios");
if(isIOSStandalone)document.documentElement.classList.add("ios-standalone");
// Clock hand geometry and animation
const rot=(el,d)=>el.setAttribute("transform",`rotate(${d} 100 100)`);
function setHands(h,m,s){rot(H,(h%12)*30+m*0.5);rot(M,m*6+s*0.1);rot(S,s*6);}
// ============================================================
// 4. GERMAN TIME EXPRESSIONS
// ============================================================
const hn=["zwölf","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf"];
const nw=["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn","zwanzig"];
const mins=n=>n===1?"eine Minute":nw[n];
function germanTime(h,m){
  const cur=hn[h%12],nxt=hn[(h+1)%12];
  if(m===0)return `Es ist ${h%12===1?"ein":cur} Uhr`;
  if(m===15)return `Es ist Viertel nach ${cur}`;
  if(m===30)return `Es ist halb ${nxt}`;
  if(m===45)return `Es ist Viertel vor ${nxt}`;
  if(m<=2)return `Es ist kurz nach ${cur}`;
  if(m===28||m===29)return `Es ist kurz vor halb ${nxt}`;
  if(m===31||m===32)return `Es ist kurz nach halb ${nxt}`;
  if(m>=58)return `Es ist kurz vor ${nxt}`;
  if(m<=20)return `Es ist ${mins(m)} nach ${cur}`;
  if(m<30)return `Es ist ${mins(30-m)} vor halb ${nxt}`;
  if(m<40)return `Es ist ${mins(m-30)} nach halb ${nxt}`;
  return `Es ist ${mins(60-m)} vor ${nxt}`;
}
const ones=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"];
const tens={2:"zwanzig",3:"dreißig",4:"vierzig",5:"fünfzig"};
function num(n,hour){
  if(n===1)return hour?"ein":"eins";
  if(n<20)return ones[n];
  const u=n%10,t=tens[Math.floor(n/10)];
  return u===0?t:(u===1?"ein":ones[u])+"und"+t;
}
// In Offiziell mode, read the analog dial as a 24-hour afternoon/evening time:
// 1 -> 13, 2 -> 14, ... 11 -> 23. The 12 position remains 12 (never 24:xx).
function officialHour(h){
  const faceHour=((h%12)+12)%12;
  return faceHour===0?12:faceHour+12;
}
function randomTargetHour(){
  // Official practice focuses on 13:00–23:59; informal practice keeps its
  // existing full-day range and spoken 12-hour expressions.
  return style==="off"?13+Math.floor(Math.random()*11):Math.floor(Math.random()*24);
}
function officialWordsTime(h,m){
  const h24=officialHour(h);
  return `Es ist ${num(h24,true)} Uhr`+(m?` ${num(m)}`:"");
}
// Offiziell answers are spelled out in German; the separate 🕒 line provides
// the numeric 24-hour reference for the same clock position.
function officialTime(h,m){return officialWordsTime(h,m);}
function fmt(h,m){return style==="off"?officialWordsTime(h,m):germanTime(h,m);}
function tick(){
  raf=null;
  if(!live||document.hidden)return;
  const d=new Date();
  setHands(d.getHours(),d.getMinutes(),d.getSeconds()+d.getMilliseconds()/1000);
  raf=requestAnimationFrame(tick);
}
function reduceMotion(){return !!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);}
function stopAt(h,m,keep){
  live=false;cancelAnimationFrame(raf);raf=null;cancelAnimationFrame(animRaf);animRaf=null;
  curH=h;curM=m;de.textContent=fmt(h,m);
  if(!keep){answer.classList.remove("open");clearTry();graded=false;syncExtras();}
  const from={h:parseFloat((H.getAttribute("transform")||"rotate(0)").match(/-?[\d.]+/)[0]),
              m:parseFloat((M.getAttribute("transform")||"rotate(0)").match(/-?[\d.]+/)[0]),
              s:parseFloat((S.getAttribute("transform")||"rotate(0)").match(/-?[\d.]+/)[0])};
  const to={h:(h%12)*30+m*0.5,m:m*6,s:0};
  const near=(a,b)=>{const d=((b-a+540)%360)-180;return a+d;};
  const tgt={h:near(from.h,to.h),m:near(from.m,to.m),s:near(from.s,to.s)};
  if(reduceMotion()){rot(H,to.h);rot(M,to.m);rot(S,to.s);return;}
  const t0=performance.now(),dur=900;
  const animate=t=>{
    if(live){animRaf=null;return;}
    const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);
    rot(H,from.h+(tgt.h-from.h)*e);rot(M,from.m+(tgt.m-from.m)*e);rot(S,from.s+(tgt.s-from.s)*e);
    if(k<1)animRaf=requestAnimationFrame(animate);else animRaf=null;
  };
  animRaf=requestAnimationFrame(animate);
}
// ============================================================
// 5. PRACTICE CONTROLS & ANSWER CHECKING
// ============================================================
document.getElementById("clock").addEventListener("click",()=>{
  if(mode==="rev"){newRev();return;}
  stopAt(randomTargetHour(),Math.floor(Math.random()*(60/step))*step);
});
const activateKey=(fn)=>e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
const pauseAnimations=()=>{
  cancelAnimationFrame(raf);raf=null;
  cancelAnimationFrame(animRaf);animRaf=null;
};
document.addEventListener("visibilitychange",()=>{
  if(document.hidden){pauseAnimations();return;}
  if(live&&raf===null)tick();
  else if(!live&&curH!==null&&animRaf===null)setHands(curH,curM,0);
});
document.getElementById("clock").addEventListener("keydown",activateKey(()=>document.getElementById("clock").click()));
answer.addEventListener("click",()=>{if(mode!=="read")return;if(!live){answer.classList.toggle("open");syncExtras();}});
answer.addEventListener("keydown",activateKey(()=>answer.click()));
document.getElementById("live").addEventListener("click",()=>{
  if(mode==="rev"){newRev();return;}
  if(live)return;live=true;cancelAnimationFrame(animRaf);animRaf=null;answer.classList.remove("open");de.textContent="–";curH=null;clearTry();graded=false;syncExtras();tick();
});
document.getElementById("seg").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  step=+b.dataset.step;
  storageSet("gc_step",String(step));
  document.querySelectorAll("#seg button").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
});
document.getElementById("seg2").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  style=b.dataset.style;
  storageSet("gc_style",style);
  document.querySelectorAll("#seg2 button").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
  if(curH!==null&&(!live||mode==="rev")){de.textContent=fmt(curH,curM);syncExtras();}
});
// Accept standard German spelling, ASCII digraphs (ae/oe/ue), and plain vowels.
// Cap combinations so an unusually long input cannot create exponential work.
function normVariants(t){
  const source=String(t).toLowerCase().replace(/ß/g,"ss");
  let variants=[""];
  for(const ch of source){
    const choices=ch==="ä"?["ae","a"]:ch==="ö"?["oe","o"]:ch==="ü"?["ue","u"]:[ch];
    const next=[];
    for(const prefix of variants){
      for(const choice of choices){
        next.push(prefix+choice);
        if(next.length>=256)break;
      }
      if(next.length>=256)break;
    }
    variants=next;
  }
  return [...new Set(variants.map(v=>v.replace(/[^a-z\s]/g," ").replace(/\s+/g," ").trim().replace(/^es ist /,"")))].filter(Boolean);
}
const dig=(h,m)=>String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");
const bare=t=>t.replace(/^Es ist /,"");
function alts(h,m){
  const c=hn[h%12],n=hn[(h+1)%12];
  return ({15:[`viertel ${n}`],20:[`zehn vor halb ${n}`],25:[`fünfundzwanzig nach ${c}`],35:[`fünfundzwanzig vor ${n}`],40:[`zehn nach halb ${n}`],45:[`dreiviertel ${n}`]})[m]||[];
}
function accepted(h,m){
  // Numeric formal answers are validated by digitalMatch(). Do not normalize
  // the numeric display as words: removing its digits would reduce it to “Uhr”
  // and accidentally allow that incomplete answer to pass.
  const l=style==="off"?[officialWordsTime(h,m)]:[fmt(h,m),...alts(h,m)];
  if(m===0){
    if(style==="inf"){l.push(hn[h%12]);if(h%12===1)l.push("ein");}
    else {const h24=officialHour(h);l.push(num(h24,true),num(h24));}
  }
  return [...new Set(l.flatMap(normVariants))];
}
function normT(t){
  t=t.replace(/(\d)\.(?!\d)/g,"$1")
     .replace(/(\d{1,2})\s*:\s*30(?:\s*uhr)?/gi,(a,x)=>" halb "+hn[(+x+1)%12]+" ")
     .replace(/(halb \S+)\s+uhr\b/gi,"$1")
     .replace(/\bMinuten?\b/gi," ")
     .replace(/(\d{1,2})\s*[:.]\s*(\d{2})/g,(a,x,y)=>" "+num(+x,true)+" uhr "+(+y?num(+y):"")+" ")
     .replace(/(\d{1,2})\s*uhr/gi,(a,x)=>" "+num(+x,true)+" uhr ")
     .replace(/\d{1,2}/g,x=>" "+num(+x)+" ");
  return normVariants(t);
}
function fillExtras(){
  if(curH===null)return;
  // The selected style is shown in the main answer box; show only its alternative and the digital time.
  const alternative=style==="off"
    ? `${t("infLabel")}: <b dir="ltr">${germanTime(curH,curM)}</b>`
    : `${t("offLabel")}: <b dir="ltr">${officialTime(curH,curM)}</b>`;
  ex.innerHTML=`${alternative}<br>🕒 ${dig(officialHour(curH),curM)}`;
}
function syncAnswerVisibility(){
  // In Type mode, keep the target answer hidden until the learner submits an attempt.
  // Reverse mode uses the clock choices and must not expose the text answer card.
  answer.hidden=mode!=="read"&&!(mode==="type"&&graded&&curH!==null);
}
function syncExtras(){
  syncAnswerVisibility();
  const opened=curH!==null&&answer.classList.contains("open");
  const show=opened&&(
    (mode==="read"&&!live)||
    (mode==="type"&&graded&&!live)||
    (mode==="rev"&&graded)
  );
  extras.hidden=!show;if(show)fillExtras();
}
function grade(ok){
  recordPracticeProgress(ok);
  if(roundDone){score={n:0,ok:0,wrong:[]};roundDone=false;}
  score.n++;if(ok)score.ok++;else score.wrong.push(bare(fmt(curH,curM))+" ("+dig(officialHour(curH),curM)+")");
  let tx=t("score",{ok:score.ok,n:score.n});
  if(roundEl.checked&&score.n>=10){
    roundDone=true;
    completedRounds++;
    storageSet("gc_completed_rounds",String(completedRounds));
    tx=t("roundDone",{ok:score.ok})+(score.wrong.length?t("mistakes")+score.wrong.join(", "):" 🎉");
  }
  scoreEl.textContent=tx;bump(ok);
}
function digitalMatch(x){
  const b=x.match(/^\s*(\d{1,2})\s*\.?\s*$/);
  if(b){
    const hh=+b[1];
    if(hh<0||hh>23||curM!==0)return false;
    return style==="off"?hh===officialHour(curH):hh%12===curH%12;
  }
  const m=x.match(/^\s*(?:es ist\s+)?(\d{1,2})\s*(?:[:.]\s*(\d{2})\s*(?:uhr)?|uhr(?:\s*(\d{1,2}))?)\s*\.?\s*$/i);
  if(!m)return false;
  const hh=+m[1],mm=+(m[2]||m[3]||0);
  if(hh<0||hh>23||mm<0||mm>59)return false;
  return mm===curM&&(style==="off"?hh===officialHour(curH):hh%12===curH%12);
}
function check(texts){
  if(live||curH===null){res.style.color="var(--muted)";res.textContent=t("clickFirst");return;}
  texts=texts||[inp.value];
  if(!texts.join("").trim())return;
  const nt=texts.map(normT),acc=accepted(curH,curM),dm=texts.some(digitalMatch);
  const canonical=style==="off"?officialWordsTime(curH,curM):fmt(curH,curM);
  const canonicalForms=normVariants(canonical);
  const ok=dm||nt.some(forms=>forms.some(form=>acc.includes(form)));
  const main=dm||nt.some(forms=>forms.some(form=>canonicalForms.includes(form)));
  answer.classList.add("open");
  if(!graded){graded=true;grade(ok);}
  res.style.color=ok?"#2e9e5b":"#e5484d";
  res.textContent=ok?t(main?"ok":"okAlt"):t("bad");
  syncExtras();
}
// ============================================================
// 6. REVERSE MODE
// Clock choices are intentionally close in time so the learner
// must read both the hour and minute hands.
// ============================================================
function mini(h,m,revStyle="numbered-step"){
  const showNumbers=revStyle==="numbered-step";
  const showMinuteTicks=revStyle!=="blank-impossible";
  let ticks="";
  if(showMinuteTicks){
    const count=revStyle==="blank-free"?12:60;
    for(let j=0;j<count;j++){
      const i=revStyle==="blank-free"?j*5:j;
      const a=i*6*Math.PI/180;
      const big=i%5===0;
      const r1=big?40:43,r2=46;
      const w=big?1.8:1;
      ticks+=`<line x1="${50+r1*Math.sin(a)}" y1="${50-r1*Math.cos(a)}" x2="${50+r2*Math.sin(a)}" y2="${50-r2*Math.cos(a)}" stroke="var(--fg)" stroke-width="${w}" stroke-linecap="round"/>`;
    }
  }
  let n="";
  if(showNumbers){
    for(let i=1;i<=12;i++){
      const a=i*Math.PI/6;
      n+=`<text x="${50+34*Math.sin(a)}" y="${53-34*Math.cos(a)}" fill="var(--fg)" font-size="9" font-weight="700" text-anchor="middle">${i}</text>`;
    }
  }
  const L=(a,r,w)=>`<line x1="50" y1="50" x2="${50+r*Math.sin(a)}" y2="${50-r*Math.cos(a)}" stroke="var(--fg)" stroke-width="${w}" stroke-linecap="round"/>`;
  const hourAngle=((h%12)*30+m*.5)*Math.PI/180;
  const minuteAngle=m*6*Math.PI/180;
  const face=`<circle cx="50" cy="50" r="47" fill="var(--card)" stroke="var(--fg)" stroke-width="3"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${face}${ticks}${n}${L(hourAngle,25,5)}${L(minuteAngle,37,3)}<circle cx="50" cy="50" r="3.5" fill="var(--accent)"/></svg>`;
}
function updateReverseChoiceLabels(){
  const label=t({
    "numbered-step":"revNormal",
    "blank-step":"revMedium",
    "blank-free":"revHard",
    "blank-impossible":"revImpossible"
  }[revStyle]);
  document.querySelectorAll("#opts .opt-label").forEach(e=>{e.textContent=label;});
}
function newRev(){
  live=true;cancelAnimationFrame(raf);tick();
  // Time Difficulty controls the target minute grid in every practice mode.
  // Clock Difficulty changes only the visual aids, never the generated time.
  const minuteStep=step;
  curH=randomTargetHour();
  curM=Math.floor(Math.random()*(60/minuteStep))*minuteStep;
  graded=false;clearTry();revres.textContent="";
  const key=o=>o.h*60+o.m;
  const list=[{h:curH,m:curM}],seen=new Set([key(list[0])]);
  const add=o=>{if(list.length<3&&!seen.has(key(o))){seen.add(key(o));list.push(o);}};

  // Keep all three choices adjacent on the selected time-difficulty grid.
  // Whole hours use neighboring hours; quarter/half and five-minute modes use
  // the neighboring interval; every-minute mode uses +/- five minutes.
  const offset=minuteStep===60?60:minuteStep===15?15:5;
  if(style==="off"){
    // Do not wrap official choices from 23:xx back to 13:xx: those times are
    // far apart in the 24-hour system even though the analog dial is circular.
    const target=curH*60+curM,minTime=13*60,maxTime=24*60-1;
    for(let distance=offset;list.length<3;distance+=offset){
      for(const total of [target-distance,target+distance]){
        if(total>=minTime&&total<=maxTime){add({h:Math.floor(total/60),m:total%60});}
        if(list.length===3)break;
      }
    }
  }else{
    for(const off of [-offset,offset]){
      const total=(curH*60+curM+off+1440)%1440;
      add({h:Math.floor(total/60),m:total%60});
    }
  }

  // For the supported settings, the two adjacent distractors always make
  // three unique choices, including across midnight.
  correctKey=key(list[0]);
  for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}
  const labels={
    "numbered-step":t("revNormal"),
    "blank-step":t("revMedium"),
    "blank-free":t("revHard"),
    "blank-impossible":t("revImpossible")
  };
  opts.innerHTML=list.map((o,i)=>`<div class="opt" data-k="${key(o)}" role="button" tabindex="0" aria-label="${t("clockOption",{n:i+1})}">${mini(o.h,o.m,revStyle)}<div class="opt-label">${labels[revStyle]}</div></div>`).join("");
  updateReverseChoiceLabels();
  answer.classList.add("open");de.textContent=fmt(curH,curM);syncExtras();
}
opts.addEventListener("click",e=>{
  const d=e.target.closest(".opt");if(!d||graded)return;
  graded=true;const ok=+d.dataset.k===correctKey;
  [...opts.children].forEach(x=>{if(+x.dataset.k===correctKey)x.classList.add("good");});
  if(!ok)d.classList.add("bad");
  grade(ok);revres.style.color=ok?"#2e9e5b":"#e5484d";
  revres.textContent=ok?t("ok"):t("revBad");
  stopAt(curH,curM,true);syncExtras();
});
opts.addEventListener("keydown",e=>{const d=e.target.closest(".opt");if(!d||graded)return;if(e.key==="Enter"||e.key===" "){e.preventDefault();d.click();}});
$("nextq").addEventListener("click",newRev);
// ============================================================
// 7. SETTINGS PANEL & ACCESSIBILITY
// ============================================================
const sheet=$("sheet"),panel=sheet.querySelector(".panel"),gear=$("gear"),closeBtn=$("close"),liveBtn=$("live");
const progressBtn=$("progressBtn"),progressPopup=$("progressPopup"),progressClose=$("progressClose");
let modalReturnFocus=null;
const focusables=()=>[...panel.querySelectorAll('button:not([disabled]),input:not([disabled]),[href],[tabindex]:not([tabindex="-1"])')].filter(x=>!x.hidden&&x.offsetParent!==null);
function setProgressPopup(open){
  progressPopup.hidden=!open;
  progressBtn.setAttribute("aria-expanded",String(open));
  if(open)renderProgress();
}
function openSettings(){modalReturnFocus=document.activeElement;sheet.hidden=false;document.body.classList.add("modal-open");setTimeout(()=>closeBtn.focus(),0);}
function closeSettings(){setProgressPopup(false);sheet.hidden=true;document.body.classList.remove("modal-open");if(modalReturnFocus&&(modalReturnFocus.isConnected||document.documentElement.contains(modalReturnFocus)))modalReturnFocus.focus();modalReturnFocus=null;}
gear.addEventListener("click",openSettings);
closeBtn.addEventListener("click",closeSettings);
progressBtn.addEventListener("click",()=>setProgressPopup(progressPopup.hidden));
progressClose.addEventListener("click",()=>{setProgressPopup(false);progressBtn.focus();});
sheet.addEventListener("click",e=>{if(e.target===sheet)closeSettings();});
document.addEventListener("keydown",e=>{
  if(sheet.hidden)return;
  if(e.key==="Escape"){
    e.preventDefault();
    if(!progressPopup.hidden){setProgressPopup(false);progressBtn.focus();return;}
    closeSettings();return;
  }
  if(e.key!=="Tab")return;
  const fs=focusables();if(!fs.length)return;
  const first=fs[0],last=fs[fs.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
// ============================================================
// 8. SETTINGS SUMMARY & MODE SWITCHING
// ============================================================
function updateSummary(){
  const m={read:t("modeRead"),type:t("modeType"),rev:t("modeRev")}[mode],st={60:t("stepHour"),5:t("step5"),1:t("step1"),15:t("stepShort15")}[step];
  const rs={
    "numbered-step":t("revNormal"),
    "blank-step":t("revMedium"),
    "blank-free":t("revHard"),
    "blank-impossible":t("revImpossible")
  }[revStyle];
  $("sum").textContent=[style==="inf"?t("infLabel"):t("offLabel"),m,st,rs].concat(roundEl.checked?[t("roundShort")]:[]).join(" • ");
}
sheet.addEventListener("click",updateSummary);sheet.addEventListener("change",updateSummary);updateSummary();
document.getElementById("chk").addEventListener("click",()=>check());
inp.addEventListener("keydown",e=>{if(e.key==="Enter")check();});
document.getElementById("revSeg").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  revStyle=b.dataset.revstyle;storageSet("gc_revstyle",revStyle);
  applyClockLevel();
  document.querySelectorAll("#revSeg button").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
  updateSummary();
  if(mode==="rev")newRev();
});
document.getElementById("seg3").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  const clickedMode=b.dataset.mode;
  if(clickedMode===mode)return;
  mode=clickedMode;
  storageSet("gc_mode",mode);
  document.querySelectorAll("#seg3 button").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
  typebox.hidden=mode!=="type";rev.hidden=mode!=="rev";liveBtn.hidden=mode==="rev";
  answer.hidden=mode!=="read";
  const rp2=$("revPrefs");
  rp2.hidden=false;
  clearTry();
  // Changing practice mode invalidates the current question so a revealed
  // answer from Read & Reveal cannot be carried into Type and scored.
  live=true;
  cancelAnimationFrame(raf);raf=null;
  cancelAnimationFrame(animRaf);animRaf=null;
  answer.classList.remove("open");
  de.textContent="–";
  curH=null;curM=null;graded=false;
  res.textContent="";
  syncExtras();
  if(mode==="rev")newRev();
  else tick();
});
roundEl.addEventListener("change",()=>{score={n:0,ok:0,wrong:[]};roundDone=false;scoreEl.textContent="";storageSet("gc_round",roundEl.checked?"1":"0");renderStreak();updateSummary();});
// ============================================================
// 9. LANGUAGE APPLICATION & STARTUP
// ============================================================
function applyLang(){
  const d=document.documentElement;d.lang=lang;d.dir=lang==="ar"?"rtl":"ltr";document.title=t("title");
  document.querySelectorAll("[data-i18n]").forEach(e=>{
    // The Reverse-difficulty buttons use separate emoji/text spans so the
    // emoji cannot wrap onto a line above the label.
    if(e.closest("#revSeg"))return;
    e.textContent=t(e.dataset.i18n);
  });
  document.querySelectorAll("#revSeg button[data-i18n]").forEach(button=>{
    const raw=t(button.dataset.i18n);
    const match=raw.match(/^(🟢|🟡|🔴|💀)\s*(.*)$/);
    button.replaceChildren();
    if(match){
      const emoji=document.createElement("span");
      emoji.className="rev-emoji";emoji.setAttribute("aria-hidden","true");emoji.textContent=match[1];
      button.appendChild(emoji);
      const label=document.createElement("span");
      label.className="rev-label";label.textContent=match[2];
      button.appendChild(label);
    }else button.textContent=raw;
    button.style.direction=lang==="ar"?"rtl":"ltr";
  });
  document.querySelectorAll("[data-i18n-title]").forEach(e=>{e.title=t(e.dataset.i18nTitle);});
  document.querySelectorAll("[data-i18n-aria]").forEach(e=>{e.setAttribute("aria-label",t(e.dataset.i18nAria));});
  document.querySelectorAll(".opt").forEach((e,i)=>e.setAttribute("aria-label",t("clockOption",{n:i+1})));
  updateReverseChoiceLabels();
  document.querySelectorAll("#segL button").forEach(x=>{const on=x.dataset.lang===lang;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
  document.querySelectorAll("#revSeg button").forEach(x=>{const on=x.dataset.revstyle===revStyle;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
  $("revPrefs").hidden=false;
  applyClockLevel();
  if(rstT){clearTimeout(rstT);rstT=null;}
  renderStreak();renderProgress();updateSummary();res.textContent="";revres.textContent="";syncExtras();
}
$("segL").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  lang=b.dataset.lang;storageSet("gc_lang",lang);
  applyLang();
});
applyLang();
document.querySelectorAll("#seg2 button").forEach(x=>{const on=x.dataset.style===style;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
document.querySelectorAll("#seg button").forEach(x=>{const on=+x.dataset.step===step;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
document.querySelectorAll("#seg3 button").forEach(x=>{const on=x.dataset.mode===mode;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
document.querySelectorAll("#revSeg button").forEach(x=>{const on=x.dataset.revstyle===revStyle;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on));});
typebox.hidden=mode!=="type";rev.hidden=mode!=="rev";liveBtn.hidden=mode==="rev";answer.hidden=mode!=="read";$("revPrefs").hidden=false;applyClockLevel();updateSummary();
if(mode==="rev")newRev();
else tick();
window.addEventListener("pagehide",pauseAnimations);
window.addEventListener("pageshow",()=>{
  if(document.hidden)return;
  if(live&&raf===null)tick();
  else if(!live&&curH!==null&&animRaf===null)setHands(curH,curM,0);
});