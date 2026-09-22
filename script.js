(() => {
  const modal = document.getElementById('survey-modal');
  const form = document.getElementById('survey-form');
  const steps = [...document.querySelectorAll('.form-step')];
  const prev = document.getElementById('prev-button');
  const next = document.getElementById('next-button');
  const submit = document.getElementById('submit-button');
  const status = document.getElementById('form-status');
  const success = document.getElementById('success-screen');
  const overlay = document.getElementById('sending-overlay');
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');
  const progressPercent = document.getElementById('progress-percent');
  let current = 0;

  const labels = ['Iniciativa','Criatividade','Planejamento','Comunicação','Liderança','Resiliência','Oportunidades','Decisão e riscos'];
  const names = ['q_iniciativa','q_criatividade','q_planejamento','q_comunicacao','q_lideranca','q_resiliencia','q_oportunidades','q_riscos'];

  function openModal(){ modal?.classList.add('open'); modal?.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; showStep(0); }
  function closeModal(){ modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  document.querySelectorAll('[data-start]').forEach(b=>b.addEventListener('click',openModal));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('open'))closeModal();});

  function clearErrors(step){ step.querySelectorAll('.field-error').forEach(e=>e.textContent=''); status.textContent=''; }
  function validateStep(step){
    clearErrors(step);
    let ok=true;
    const required = [...step.querySelectorAll('input[required],select[required],textarea[required]')];
    const groups = new Set();
    required.forEach(el=>{
      if(el.type==='radio'){groups.add(el.name);return;}
      if(!el.checkValidity()) ok=false;
    });
    groups.forEach(name=>{
      if(!step.querySelector(`input[name="${name}"]:checked`)){ok=false;const err=step.querySelector(`[data-error-for="${name}"]`);if(err)err.textContent='Selecione uma opção.';}
    });
    if(!ok){
      required.find(el=>!el.checkValidity())?.reportValidity();
      if(!step.querySelector('.field-error:not(:empty)')) status.textContent='Preencha os campos obrigatórios para continuar.';
    }
    return ok;
  }
  function showStep(i){
    current=Math.max(0,Math.min(i,steps.length-1));
    steps.forEach((s,n)=>s.classList.toggle('active',n===current));
    const pct=Math.round(((current+1)/steps.length)*100);
    if(progressBar)progressBar.style.width=pct+'%';
    if(progressLabel)progressLabel.textContent=`Etapa ${current+1} de ${steps.length}`;
    if(progressPercent)progressPercent.textContent=pct+'%';
    if(prev)prev.disabled=current===0;
    const last=current===steps.length-1;
    if(next){next.hidden=last;next.style.display=last?'none':'';}
    if(submit){submit.hidden=!last;submit.style.display=last?'inline-flex':'none';}
    document.querySelector('.survey-panel')?.scrollTo({top:0,behavior:'smooth'});
  }
  next?.addEventListener('click',()=>{if(validateStep(steps[current]))showStep(current+1);});
  prev?.addEventListener('click',()=>showStep(current-1));

  document.querySelectorAll('[data-counter-for]').forEach(c=>{
    const id=c.dataset.counterFor, el=document.getElementById(id); if(!el)return;
    const update=()=>c.textContent=`${el.value.length}/${el.maxLength}`; el.addEventListener('input',update);update();
  });

  function scoreValues(){return names.map(n=>Number(form.querySelector(`input[name="${n}"]:checked`)?.value||0));}
  function radarSvg(values){
    const w=620,h=420,cx=310,cy=205,r=145,N=values.length;
    const point=(radius,i,val=0)=>{const a=-Math.PI/2+(i*2*Math.PI/N);const rr=radius*val;return [cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]};
    const pts=v=>v.map((x,i)=>point(r,i,x/5).join(',')).join(' ');
    let grid='';
    for(let level=1;level<=5;level++){const p=Array.from({length:N},(_,i)=>point(r*level/5,i).join(',')).join(' ');grid+=`<polygon points="${p}" fill="none" stroke="#cbd8e5" stroke-width="1"/>`;}
    for(let i=0;i<N;i++){const [x,y]=point(r,i,1);const [tx,ty]=point(r+28,i,1);grid+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#dce5ef"/><text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="700" fill="#40516a">${labels[i]}</text>`;}
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Gráfico de teia das competências empreendedoras" style="width:100%;height:100%;font-family:Inter,Arial,sans-serif">${grid}<polygon points="${pts(values)}" fill="rgba(21,101,192,.18)" stroke="#1565c0" stroke-width="3"/>${values.map((v,i)=>{const [x,y]=point(r,i,v/5);return `<circle cx="${x}" cy="${y}" r="5" fill="#f59e0b" stroke="#fff" stroke-width="2"/>`;}).join('')}<circle cx="${cx}" cy="${cy}" r="3" fill="#1565c0"/></svg>`;
  }
  function renderResult(){
    const values=scoreValues(); const avg=values.reduce((a,b)=>a+b,0)/values.length; const pct=Math.round(avg/5*100);
    const canvas=document.getElementById('strength-radar');
    if(canvas){canvas.outerHTML=`<div id="strength-radar" aria-label="Gráfico de teia das competências empreendedoras">${radarSvg(values)}</div>`;}
    const list=document.getElementById('strength-list');
    if(list){list.innerHTML=labels.map((l,i)=>`<div class="strength-item"><strong>${l}</strong><span>${values[i]}/5</span></div>`).join('');}
    const score=document.getElementById('profile-score'), bar=document.getElementById('score-bar'), title=document.getElementById('profile-title'), desc=document.getElementById('profile-description');
    if(score)score.textContent=pct+'%'; if(bar)bar.style.width=pct+'%';
    if(avg>=4){title.textContent='Perfil com competências bem desenvolvidas';desc.textContent='Suas respostas indicam níveis elevados nas competências avaliadas.';}
    else if(avg>=3){title.textContent='Perfil em desenvolvimento';desc.textContent='Suas respostas mostram competências presentes, com espaço para desenvolvimento.';}
    else{title.textContent='Perfil em construção';desc.textContent='O resultado indica competências que podem ser trabalhadas e fortalecidas ao longo da sua formação.';}
  }
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateStep(steps[current]))return;
    overlay.hidden=false;
    const bar=document.getElementById('sending-progress-bar');let p=0;
    const timer=setInterval(()=>{p=Math.min(100,p+8);if(bar)bar.style.width=p+'%';if(p>=100){clearInterval(timer);overlay.hidden=true;form.hidden=true;document.querySelector('.progress-wrap').hidden=true;success.hidden=false;renderResult();}},45);
  });

  document.querySelectorAll('.menu-button').forEach(btn=>btn.addEventListener('click',()=>{
    const nav=document.querySelector('.nav'); if(!nav)return; const open=nav.style.display==='flex'; nav.style.display=open?'':'flex'; btn.setAttribute('aria-expanded',String(!open));
  }));
  showStep(0);
})();
