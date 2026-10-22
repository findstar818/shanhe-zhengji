const routeData = [
  {date:'1934.11',place:'湘江',title:'血战湘江',question:'当退路被截断，什么支撑一支队伍继续向前？',body:'1934年11月27日至12月1日，中央红军苦战五昼夜渡过湘江。代价极其惨烈，也迫使队伍重新审视前进的方向。',spirit:'坚定信念',x:91,y:495,alt:'164M',source:'https://www.ynds.yn.gov.cn/html/zhongyanghongjunqiaodujinshajiang/2022/7/8/5b39519c-6ff1-4dc6-9b61-042094bb13d7.html'},
  {date:'1935.01',place:'遵义',title:'遵义会议',question:'真正的转折，往往始于重新判断方向。',body:'1935年1月15日至17日，遵义会议召开。中国共产党开始独立自主地解决中国革命的重大问题，长征由此迎来生死攸关的转折。',spirit:'实事求是',x:245,y:390,alt:'865M',source:'https://www.mem.gov.cn/xw/ztzl/2021/dsxxjy/xxfd/202103/t20210329_382216.shtml'},
  {date:'1935.01—03',place:'赤水河',title:'四渡赤水',question:'没有固定航线时，判断力就是最重要的地图。',body:'中央红军在赤水流域机动穿插，灵活变换作战方向，跳出重兵围堵，从被动转向主动。',spirit:'独立自主',x:353,y:303,alt:'430M',source:'https://www.mem.gov.cn/xw/ztzl/2021/dsxxjy/xxfd/202103/t20210329_382216.shtml'},
  {date:'1935.05',place:'泸定',title:'飞夺泸定桥',question:'当时间成为最窄的桥，勇气必须比脚步更快。',body:'1935年5月，中央红军强渡大渡河、飞夺泸定桥，以坚决行动突破险境，为继续北上打开通道。',spirit:'攻坚克难',x:518,y:285,alt:'1330M',source:'https://www.miit.gov.cn/ztzl/rdzt/dsxxjyzl/xxzl/art/2021/art_a43d76bc5e694806889c07fc36ec6adc.html'},
  {date:'1935.06—08',place:'雪山草地',title:'翻雪山 过草地',question:'极端环境会消耗体力，却无法定义信念的边界。',body:'翻越高寒雪山、穿过茫茫草地，队伍在缺粮、严寒与伤病中彼此扶持，把不可能走成了道路。',spirit:'团结互助',x:656,y:220,alt:'4114M',source:'https://www.miit.gov.cn/ztzl/rdzt/dsxxjyzl/xxzl/art/2021/art_a43d76bc5e694806889c07fc36ec6adc.html'},
  {date:'1936.10',place:'会宁',title:'大会师',question:'一条航迹的终点，是另一代人重新出发的起点。',body:'1936年10月，红军三大主力会师，标志着长征胜利结束。跨越万水千山的精神力量，由此进入新的历史进程。',spirit:'顾全大局',x:806,y:94,alt:'2020M',source:'https://www.miit.gov.cn/ztzl/rdzt/dsxxjyzl/xxzl/art/2021/art_a43d76bc5e694806889c07fc36ec6adc.html'}
];

const dimensions = [
  {name:'坚定信念',short:'信念',desc:'坚信正义事业必然胜利',value:96},
  {name:'攻坚克难',short:'勇毅',desc:'不怕任何艰难险阻',value:92},
  {name:'独立自主',short:'求实',desc:'坚持从实际出发',value:94},
  {name:'顾全大局',short:'团结',desc:'严守纪律、紧密团结',value:90},
  {name:'依靠群众',short:'同行',desc:'同人民患难与共',value:95}
];

const $ = (s,p=document)=>p.querySelector(s); const $$=(s,p=document)=>[...p.querySelectorAll(s)];
document.body.classList.add('booting');
let counted=false;
function runCounters(){if(counted)return;counted=true;$$('[data-count]').forEach(el=>{const end=Number(el.dataset.count),start=performance.now();function tick(now){const p=Math.min(1,(now-start)/900);el.textContent=String(Math.round(end*(1-Math.pow(1-p,3)))).padStart(2,'0');if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)})}
$('#enterSite').addEventListener('click',()=>{$('#boot').classList.add('is-gone');document.body.classList.remove('booting');sessionStorage.setItem('spark-entered','1');runCounters()});
if(sessionStorage.getItem('spark-entered')){setTimeout(()=>{$('#boot').classList.add('is-gone');document.body.classList.remove('booting');runCounters()},250)}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.16});$$('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>{$('#topbar').classList.toggle('scrolled',scrollY>40);const y=Math.min(scrollY*.055,36);$('.hero__media').style.transform=`scale(1.05) translateY(${y}px)`},{passive:true});

// Ambient particles: deliberately quiet, so the narrative stays legible.
const canvas=$('#atmosphere'),ctx=canvas.getContext('2d');let points=[];
function sizeCanvas(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);points=Array.from({length:Math.min(90,Math.floor(innerWidth/14))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,v:Math.random()*.18+.04,a:Math.random()*.45+.08}))}
function drawAtmosphere(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of points){p.y-=p.v;if(p.y<-2){p.y=innerHeight+2;p.x=Math.random()*innerWidth}ctx.fillStyle=`rgba(213,187,139,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(drawAtmosphere)}
addEventListener('resize',sizeCanvas);sizeCanvas();drawAtmosphere();

// Route data UI.
const mapNodes=$('#mapNodes'),timelineNodes=$('#timelineNodes');
routeData.forEach((d,i)=>{
  const ns='http://www.w3.org/2000/svg',g=document.createElementNS(ns,'g');g.setAttribute('class','map-node');g.setAttribute('transform',`translate(${d.x} ${d.y})`);g.dataset.index=i;g.innerHTML=`<circle r="13"/><circle r="4"/><text x="20" y="5">${String(i+1).padStart(2,'0')} ${d.place}</text>`;g.addEventListener('click',()=>setNode(i,true));mapNodes.append(g);
  const b=document.createElement('button');b.className='time-node';b.dataset.index=i;b.innerHTML=`<i></i><span>${d.date}</span>`;b.addEventListener('click',()=>setNode(i,true));timelineNodes.append(b);
});
let activeNode=0,routeTimer=null;
function setNode(i,manual=false){activeNode=(i+routeData.length)%routeData.length;const d=routeData[activeNode];$$('.map-node').forEach((n,j)=>n.classList.toggle('active',j===activeNode));$$('.time-node').forEach((n,j)=>n.classList.toggle('active',j===activeNode));$('#timelineProgress').style.width=`${activeNode/(routeData.length-1)*100}%`;$('#storyNum').textContent=String(activeNode+1).padStart(2,'0');$('#storyDate').textContent=d.date;$('#storyPlace').textContent=d.place;$('#storyTitle').textContent=d.title;$('#storyQuestion').textContent=d.question;$('#storyBody').textContent=d.body;$('#storySpirit').textContent=d.spirit;$('#storySource').href=d.source;$('#mapAltitude').textContent='ALT '+d.alt;$('#routePulse').setAttribute('cx',d.x);$('#routePulse').setAttribute('cy',d.y);$('#storyPanel').animate([{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:500,easing:'cubic-bezier(.2,.75,.25,1)'});if(manual&&routeTimer)stopRoute()}
function playRoute(){if(routeTimer){stopRoute();return}$('#playRoute').classList.add('is-playing');$('#playRoute').setAttribute('aria-pressed','true');$('#playRoute span').textContent='暂停讲述';routeTimer=setInterval(()=>{if(activeNode===routeData.length-1){stopRoute();return}setNode(activeNode+1)},3600)}
function stopRoute(){clearInterval(routeTimer);routeTimer=null;$('#playRoute').classList.remove('is-playing');$('#playRoute').setAttribute('aria-pressed','false');$('#playRoute span').textContent='自动讲述'}
$('#playRoute').addEventListener('click',playRoute);$('#prevNode').addEventListener('click',()=>setNode(activeNode-1,true));$('#nextNode').addEventListener('click',()=>setNode(activeNode+1,true));setNode(0);

// Scroll through the four-screen route section while retaining direct controls.
let scrollNode=-1;addEventListener('scroll',()=>{const sec=$('#route'),r=sec.getBoundingClientRect();if(r.top<=0&&r.bottom>=innerHeight){const p=Math.min(1,Math.max(0,-r.top/(sec.offsetHeight-innerHeight)));const i=Math.min(5,Math.floor(p*6));if(i!==scrollNode&&!routeTimer){scrollNode=i;setNode(i)}}},{passive:true});

// Spirit radar.
const radar=$('#spiritRadar'),rctx=radar.getContext('2d'),list=$('#dimensionList');let radarActive=0,radarPhase=0;
dimensions.forEach((d,i)=>{const el=document.createElement('div');el.className='dimension';el.innerHTML=`<span>0${i+1}</span><div><h3>${d.name}</h3><p>${d.desc}</p></div><b>${d.value}</b>`;el.addEventListener('mouseenter',()=>{radarActive=i;$('#radarValue').textContent=d.short;drawRadar()});el.addEventListener('click',()=>{radarActive=i;$('#radarValue').textContent=d.short;drawRadar()});list.append(el)});
function drawRadar(){const w=radar.width,h=radar.height,cx=w/2,cy=h/2,R=w*.36;rctx.clearRect(0,0,w,h);rctx.save();rctx.translate(cx,cy);for(let ring=1;ring<=5;ring++){rctx.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5,x=Math.cos(a)*R*ring/5,y=Math.sin(a)*R*ring/5;i?rctx.lineTo(x,y):rctx.moveTo(x,y)}rctx.closePath();rctx.strokeStyle=`rgba(231,226,216,${.045+ring*.018})`;rctx.stroke()}for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;rctx.beginPath();rctx.moveTo(0,0);rctx.lineTo(Math.cos(a)*R,Math.sin(a)*R);rctx.strokeStyle='rgba(231,226,216,.09)';rctx.stroke();rctx.fillStyle=i===radarActive?'#e7e2d8':'#777168';rctx.font=`${i===radarActive?'600':'400'} 18px "Noto Sans SC"`;rctx.textAlign=Math.cos(a)>.2?'left':Math.cos(a)<-.2?'right':'center';rctx.textBaseline=Math.sin(a)>.2?'top':Math.sin(a)<-.2?'bottom':'middle';rctx.fillText(dimensions[i].short,Math.cos(a)*(R+32),Math.sin(a)*(R+32))}rctx.beginPath();dimensions.forEach((d,i)=>{const boost=i===radarActive?1.05:.92,a=-Math.PI/2+i*Math.PI*2/5,rr=R*d.value/100*boost,x=Math.cos(a)*rr,y=Math.sin(a)*rr;i?rctx.lineTo(x,y):rctx.moveTo(x,y)});rctx.closePath();const grad=rctx.createRadialGradient(0,0,0,0,0,R);grad.addColorStop(0,'rgba(214,71,50,.42)');grad.addColorStop(1,'rgba(214,71,50,.08)');rctx.fillStyle=grad;rctx.fill();rctx.strokeStyle='#d64732';rctx.lineWidth=2;rctx.stroke();rctx.restore();$$('.dimension').forEach((el,i)=>el.classList.toggle('active',i===radarActive))}drawRadar();

// Relay card.
let chosen=0;const choiceGrid=$('#choiceGrid');dimensions.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='choice';b.innerHTML=`<span>0${i+1}</span><b>${d.short}</b>`;b.addEventListener('click',()=>{chosen=i;$$('.choice').forEach((x,j)=>x.classList.toggle('active',j===i));$('#cardSpirit').textContent=d.name});choiceGrid.append(b)});$('.choice').classList.add('active');
$('#missionInput').addEventListener('input',e=>$('#charCount').textContent=e.target.value.length);
$('#relayForm').addEventListener('submit',e=>{e.preventDefault();const mission=$('#missionInput').value.trim();if(!mission)return;$('#cardMission').textContent=mission;$('#cardSpirit').textContent=dimensions[chosen].name;const id=new Date().toISOString().slice(2,10).replaceAll('-','')+'-'+Math.floor(10+Math.random()*89);$('#cardId').textContent='CZ-'+id;$('#coordinateCard').classList.remove('is-generated');requestAnimationFrame(()=>$('#coordinateCard').classList.add('is-generated'));localStorage.setItem('spark-coordinate',JSON.stringify({mission,spirit:chosen,id}))});
try{const saved=JSON.parse(localStorage.getItem('spark-coordinate'));if(saved){$('#missionInput').value=saved.mission;$('#charCount').textContent=saved.mission.length;chosen=saved.spirit;$$('.choice').forEach((x,j)=>x.classList.toggle('active',j===chosen));$('#cardMission').textContent=saved.mission;$('#cardSpirit').textContent=dimensions[chosen].name;$('#cardId').textContent='CZ-'+saved.id}}catch{}

// Small magnetic response on precise pointers only.
if(matchMedia('(pointer:fine)').matches){$$('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')setNode(activeNode+1,true);if(e.key==='ArrowLeft')setNode(activeNode-1,true)});
