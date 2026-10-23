const canvas=document.getElementById('entryScene');

if(canvas){
  const ctx=canvas.getContext('2d',{alpha:true});
  const ridges=[];
  const dust=[];
  let width=0,height=0,dpr=1,start=performance.now(),departure=0;

  const noise=(x,seed)=>Math.sin(x*.013+seed*4.17)*.48+Math.sin(x*.027+seed*7.31)*.27+Math.cos(x*.061-seed*2.44)*.13;

  function buildScene(){
    dpr=Math.min(window.devicePixelRatio||1,1.6);
    width=Math.max(1,window.innerWidth);height=Math.max(1,window.innerHeight);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ridges.length=0;
    for(let layer=0;layer<9;layer++){
      const points=[],step=Math.max(18,Math.round(width/55));
      for(let x=-step;x<=width+step;x+=step){
        const perspective=layer/8,base=height*(.32+perspective*.085),amp=height*(.035+perspective*.075);
        points.push([x,base+noise(x,layer+1)*amp]);
      }
      ridges.push(points);
    }
    dust.length=0;
    for(let i=0;i<95;i++)dust.push({x:Math.random()*width,y:Math.random()*height,s:.4+Math.random()*1.4,v:.15+Math.random()*.45,a:.12+Math.random()*.42});
  }

  function drawRidge(points,layer,t,flight){
    const perspective=layer/8,drift=Math.sin(t*.09+layer)*10*perspective-flight*42*perspective,lift=flight*height*.055*perspective;
    ctx.beginPath();ctx.moveTo(-40,height+30);
    points.forEach(([x,y])=>ctx.lineTo(x+drift,y-lift));
    ctx.lineTo(width+40,height+30);ctx.closePath();
    const shade=Math.round(18+perspective*23),grad=ctx.createLinearGradient(0,height*.3,0,height);
    grad.addColorStop(0,`rgba(${shade+14},${shade+7},${shade},${.2+perspective*.42})`);
    grad.addColorStop(1,`rgba(${shade-8},${shade-11},${shade-14},${.58+perspective*.38})`);
    ctx.fillStyle=grad;ctx.fill();
    ctx.strokeStyle=`rgba(183,143,91,${.04+perspective*.08})`;ctx.lineWidth=.65+perspective*.7;ctx.stroke();
  }

  function routePoint(p,flight){
    return [width*(.48+p*.47)-flight*width*.035,height*(.77-p*.31)+Math.sin(p*16)*height*.025-flight*height*.06];
  }

  function drawRoute(t,flight){
    const points=Array.from({length:42},(_,i)=>routePoint(i/41,flight));
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));
    ctx.strokeStyle='rgba(86,10,7,.74)';ctx.lineWidth=7;ctx.stroke();
    ctx.setLineDash([13,9]);ctx.lineDashOffset=-t*20;
    ctx.strokeStyle='rgba(215,48,33,.88)';ctx.lineWidth=2.2;ctx.shadowColor='#d52d20';ctx.shadowBlur=14;ctx.stroke();
    ctx.setLineDash([]);
    for(let i=0;i<6;i++){
      const q=(t*.055+i/6)%1,[x,y]=routePoint(q,flight),glow=6+Math.sin(t*4+i)*2,g=ctx.createRadialGradient(x,y,0,x,y,glow*3);
      g.addColorStop(0,'rgba(255,225,165,.98)');g.addColorStop(.18,'rgba(238,65,40,.95)');g.addColorStop(1,'rgba(210,34,25,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,glow*3,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }

  function frame(now){
    const t=(now-start)/1000,target=canvas.dataset.departing?1:0;
    departure+=(target-departure)*.045;
    ctx.clearRect(0,0,width,height);
    const haze=ctx.createLinearGradient(0,0,0,height);
    haze.addColorStop(0,'rgba(12,9,7,.08)');haze.addColorStop(.58,'rgba(56,40,27,.08)');haze.addColorStop(1,'rgba(4,3,2,.44)');ctx.fillStyle=haze;ctx.fillRect(0,0,width,height);
    ridges.forEach((r,i)=>drawRidge(r,i,t,departure));drawRoute(t,departure);
    dust.forEach(p=>{p.y-=p.v;if(p.y<-4){p.y=height+4;p.x=Math.random()*width}ctx.fillStyle=`rgba(220,177,111,${p.a})`;ctx.fillRect(p.x+Math.sin(t+p.y)*4,p.y,p.s,p.s)});
    requestAnimationFrame(frame);
  }

  window.startEntryFlight=()=>{canvas.dataset.departing='1';document.getElementById('entry')?.classList.add('depart')};
  window.addEventListener('resize',buildScene,{passive:true});
  buildScene();canvas.classList.add('ready');requestAnimationFrame(frame);
}
