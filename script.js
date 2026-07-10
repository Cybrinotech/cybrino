(function(){
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.textContent = open ? '×' : '☰';
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label','Open menu');
    }));
  }
  document.querySelectorAll('[data-dev-alert]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); showDevAlert(); }));
  document.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.openModal)));
  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.closeModal)));
  document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); }));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show')); });
  const clientForm = document.getElementById('clientApplyForm');
  if(clientForm){ clientForm.addEventListener('submit', handleClientFormSubmit); }
  initPasswordChecker(); initPasswordGenerator(); initQrGenerator(); initCalculator();
})();
function showDevAlert(){ alert('⚡ This project is currently under development. More updates will be added soon by CYBRINOTECH.'); }
function openModal(id){ const modal=document.getElementById(id); if(modal) modal.classList.add('show'); }
function closeModal(id){ const modal=document.getElementById(id); if(modal) modal.classList.remove('show'); }
function handleClientFormSubmit(e){
  e.preventDefault();
  const agreed = document.getElementById('agreeTerms');
  if(!agreed || !agreed.checked){ alert('Please accept Terms & Conditions and Privacy Policy before submitting.'); return; }
  const get = id => (document.getElementById(id)?.value || '').trim();
  const data = {clientName:get('clientName'),designation:get('designation'),businessName:get('businessName'),businessType:get('businessType'),email:get('email'),phone:get('phone'),whatsapp:get('whatsapp'),serviceType:get('serviceType'),businessAddress:get('businessAddress'),city:get('city'),district:get('district'),state:get('state'),pin:get('pin'),existingWebsite:get('existingWebsite'),deadline:get('deadline'),budget:get('budget'),contentReady:get('contentReady'),colorPreference:get('colorPreference'),pagesNeeded:get('pagesNeeded'),featuresNeeded:get('featuresNeeded'),projectDetails:get('projectDetails')};
  const message = `NEW CYBRINOTECH WEBSITE APPLY FORM\n\n`+
`========================\nCLIENT DETAILS\n========================\n`+
`Name: ${data.clientName}\nDesignation / Role: ${data.designation}\nBusiness / Institute Name: ${data.businessName}\nBusiness Type: ${data.businessType}\nEmail: ${data.email}\nPhone: ${data.phone}\nWhatsApp: ${data.whatsapp}\n\n`+
`========================\nBUSINESS ADDRESS\n========================\n`+
`Address: ${data.businessAddress}\nCity / Town: ${data.city}\nDistrict: ${data.district}\nState: ${data.state}\nPIN Code: ${data.pin}\n\n`+
`========================\nWEBSITE REQUIREMENTS\n========================\n`+
`Website Type: ${data.serviceType}\nPages Needed: ${data.pagesNeeded}\nFeatures Needed: ${data.featuresNeeded}\nExisting Website/Social Link: ${data.existingWebsite}\nExpected Delivery Time: ${data.deadline}\nBudget Range: ${data.budget}\nContent Ready: ${data.contentReady}\nColor / Design Preference: ${data.colorPreference}\n\nFull Project Details:\n${data.projectDetails}\n\n`+
`========================\nCONFIRMATION\n========================\nClient accepted CYBRINOTECH Terms & Conditions and Privacy Policy.`;
  window.open(`https://wa.me/917699920636?text=${encodeURIComponent(message)}`, '_blank');
}
function strengthScore(password){
  let score=0, tips=[];
  if(password.length>=8) score++; else tips.push('Use at least 8 characters.');
  if(/[a-z]/.test(password)) score++; else tips.push('Add lowercase letters.');
  if(/[A-Z]/.test(password)) score++; else tips.push('Add uppercase letters.');
  if(/\d/.test(password)) score++; else tips.push('Add numbers.');
  if(/[^A-Za-z0-9]/.test(password)) score++; else tips.push('Add symbols.');
  return {score,tips};
}
function updateStrengthUI(password, bar, text, tipsBox){
  const {score,tips}=strengthScore(password); const pct=[0,20,40,65,85,100][score];
  const labels=['Empty','Very Weak','Weak','Medium','Strong','Excellent'];
  const colors=['#334155','#ef4444','#f97316','#eab308','#22c55e','#00f59d'];
  if(bar){ bar.style.width=(password?pct:0)+'%'; bar.style.background=colors[password?score:0]; }
  if(text){ text.textContent=password?labels[score]:'Enter a password'; text.style.color=colors[password?score:0]; }
  if(tipsBox) tipsBox.textContent=password ? (tips[0] || 'Great password structure.') : 'Use uppercase, lowercase, number and symbols.';
}
function initPasswordChecker(){
  const input=document.getElementById('passwordCheckInput'); if(!input) return;
  const bar=document.getElementById('strengthBar'), text=document.getElementById('strengthText'), tips=document.getElementById('passwordTips');
  input.addEventListener('input',()=>updateStrengthUI(input.value,bar,text,tips));
  document.getElementById('togglePasswordCheck')?.addEventListener('click',()=>{input.type=input.type==='password'?'text':'password'});
  document.getElementById('copyCheckedPassword')?.addEventListener('click',()=>copyText(input.value,'Password copied.'));
}
function initPasswordGenerator(){
  const output=document.getElementById('generatedPassword'); if(!output) return;
  const length=document.getElementById('passwordLength'), lengthValue=document.getElementById('lengthValue');
  const make=()=>{
    const sets=[]; if(document.getElementById('uppercase')?.checked) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'); if(document.getElementById('lowercase')?.checked) sets.push('abcdefghijklmnopqrstuvwxyz'); if(document.getElementById('numbers')?.checked) sets.push('0123456789'); if(document.getElementById('symbols')?.checked) sets.push('!@#$%^&*()_+-=[]{};:,.?/');
    if(!sets.length){ alert('Select at least one character type.'); return; }
    const all=sets.join(''); let pass='';
    for(let i=0;i<Number(length.value);i++) pass+=all[Math.floor(Math.random()*all.length)];
    output.value=pass; updateStrengthUI(pass,document.getElementById('generatorStrengthBar'),document.getElementById('generatorStrengthText'));
  };
  length?.addEventListener('input',()=>{lengthValue.textContent=length.value;});
  document.getElementById('generatePasswordBtn')?.addEventListener('click',make);
  document.getElementById('copyGeneratedPassword')?.addEventListener('click',()=>copyText(output.value,'Password copied.'));
  make();
}
function copyText(text,msg){ if(!text){ alert('Nothing to copy.'); return; } navigator.clipboard?.writeText(text).then(()=>alert(msg || 'Copied.')).catch(()=>alert('Copy not supported on this browser.')); }
function initQrGenerator(){
  const btn=document.getElementById('generateQrBtn'); if(!btn) return;
  btn.addEventListener('click',()=>{
    const value=(document.getElementById('qrText')?.value||'').trim();
    if(!value){ alert('Please enter text or URL.'); return; }
    const url='https://api.qrserver.com/v1/create-qr-code/?size=240x240&data='+encodeURIComponent(value);
    const box=document.getElementById('qrcode'); box.innerHTML=`<img src="${url}" alt="Generated QR Code">`;
    const download=document.getElementById('downloadQr'); if(download) download.href=url;
  });
}
let expression='', calcHistory=[], voiceEnabled=true, currentLanguage='en-US';
function initCalculator(){
  if(!document.getElementById('calcApp')) return;
  const setText=(id,text)=>{const el=document.getElementById(id); if(el) el.textContent=text;};
  const updateDisplay=()=>{setText('expression',expression);};
  document.getElementById('calcButtons')?.addEventListener('click',e=>{
    const btn=e.target.closest('[data-value]'); if(!btn) return;
    const val=btn.dataset.value;
    if(val==='AC'){ expression=''; updateDisplay(); setText('result','0'); return; }
    if(val==='BACK'){ expression=expression.slice(0,-1); updateDisplay(); return; }
    if(val==='='){ calculateExpression(); return; }
    expression+=val; updateDisplay();
  });
  document.querySelectorAll('.calc-nav-btn').forEach(btn=>btn.addEventListener('click',()=>showCalcPage(btn.dataset.page)));
  document.getElementById('calcSettingsBtn')?.addEventListener('click',()=>document.getElementById('calcPopup')?.classList.toggle('show'));
  document.getElementById('calcPopup')?.addEventListener('click',e=>{const b=e.target.closest('[data-calc-action]'); if(!b) return; const action=b.dataset.calcAction; if(action==='theme') document.body.classList.toggle('light-calc'); if(action==='voice'){voiceEnabled=!voiceEnabled; aiSay(voiceEnabled?'Voice enabled':'Voice disabled');} if(action==='language'){currentLanguage=currentLanguage==='en-US'?'hi-IN':'en-US'; aiSay(currentLanguage==='hi-IN'?'Hindi language activated':'English language activated');} if(action==='history') toggleCalcHistory();});
  document.getElementById('closeHistory')?.addEventListener('click',toggleCalcHistory);
  document.getElementById('clearHistory')?.addEventListener('click',()=>{calcHistory=[]; updateCalcHistory();});
  document.getElementById('listenBtn')?.addEventListener('click',startListening);
  document.querySelectorAll('[data-convert]').forEach(btn=>btn.addEventListener('click',()=>runConverter(btn.dataset.convert)));
  function calculateExpression(){
    if(!expression.trim()) return;
    try{ const safe=sanitizeMath(expression); const result=Function('"use strict";return ('+safe+')')(); if(!Number.isFinite(result)) throw new Error('bad'); setText('result',formatNum(result)); calcHistory.unshift(expression+' = '+formatNum(result)); updateCalcHistory(); aiSay('Result is '+formatNum(result)); }
    catch{ setText('result','Error'); aiSay('Sorry, I could not calculate that.'); }
  }
}
function showCalcPage(page){document.querySelectorAll('.calc-page').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.calc-nav-btn').forEach(b=>b.classList.remove('active'));document.getElementById(page+'Page')?.classList.add('active');document.querySelector(`.calc-nav-btn[data-page="${page}"]`)?.classList.add('active');}
function sanitizeMath(exp){let s=String(exp).replace(/×/g,'*').replace(/÷/g,'/').replace(/%/g,'/100'); if(!/^[0-9+\-*/().\s]+$/.test(s)) throw new Error('unsafe'); return s;}
function formatNum(n){return Number(n.toFixed(10)).toString();}
function aiSay(text){const el=document.getElementById('aiResponse'); if(el) el.textContent=text; if(voiceEnabled && 'speechSynthesis' in window){const u=new SpeechSynthesisUtterance(text); u.lang=currentLanguage; speechSynthesis.cancel(); speechSynthesis.speak(u);}}
function toggleCalcHistory(){document.getElementById('historyPanel')?.classList.toggle('show');}
function updateCalcHistory(){const list=document.getElementById('historyList'); if(!list) return; list.innerHTML=calcHistory.length?calcHistory.map(i=>`<div class="history-item">${escapeHTML(i)}</div>`).join(''):'No history yet';}
function escapeHTML(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function startListening(){
  const Rec=window.SpeechRecognition||window.webkitSpeechRecognition; if(!Rec){alert('Speech Recognition not supported.'); return;}
  const rec=new Rec(); rec.lang=currentLanguage; rec.start(); aiSay('Your CYBRINO AI is listening.');
  rec.onresult=e=>{const t=e.results[0][0].transcript.toLowerCase(); const resp=document.getElementById('aiResponse'); if(resp) resp.textContent='You said: '+t; const cleaned=t.replace(/plus/g,'+').replace(/minus/g,'-').replace(/multiply|multiplied by|times|x/g,'*').replace(/divided by|divide/g,'/').replace(/percent/g,'%').replace(/calculate|what is/g,'').trim(); if(/[0-9]/.test(cleaned) && /[+\-*/%]/.test(cleaned)){expression=cleaned; document.getElementById('expression').textContent=expression; document.querySelector('[data-value="="]')?.click(); return;} if(t.includes('introduce')) aiSay('I am CYBRINO AI, a calculator and converter assistant created for CYBRINOTECH.'); else if(t.includes('creator')||t.includes('created')) aiSay('I was created by CYBRINOTECH as a learning and utility project.'); else if(t.includes('math test')) aiSay('Try asking: what is twelve plus eight, or eighteen multiplied by four.'); else if(t.includes('converter')) showCalcPage('converter'); else if(t.includes('history')) toggleCalcHistory(); else aiSay('I can help with calculations, converters, math tests, and basic introduction.');};
}
function runConverter(type){
  const val=id=>parseFloat(document.getElementById(id)?.value), get=id=>document.getElementById(id)?.value, put=(id,text)=>{const el=document.getElementById(id); if(el) el.textContent=text;};
  if(type==='length'){const v=val('lengthInput'); if(!Number.isFinite(v)) return put('lengthResult','Please enter a valid number.'); const m={mm:v/1000,cm:v/100,m:v,km:v*1000}[get('lengthFrom')]; const r={mm:m*1000,cm:m*100,m:m,km:m/1000}[get('lengthTo')]; put('lengthResult',formatNum(r)+' '+get('lengthTo')); aiSay(formatNum(r)+' '+get('lengthTo'));}
  if(type==='weight'){const v=val('weightInput'); if(!Number.isFinite(v)) return put('weightResult','Please enter a valid number.'); const kg=get('weightFrom')==='kg'?v:v/1000; const r=get('weightTo')==='kg'?kg:kg*1000; put('weightResult',formatNum(r)+' '+get('weightTo')); aiSay(formatNum(r)+' '+get('weightTo'));}
  if(type==='temp'){const v=val('tempInput'); if(!Number.isFinite(v)) return put('tempResult','Please enter a valid number.'); const c=get('tempFrom')==='c'?v:(v-32)*5/9; const r=get('tempTo')==='c'?c:(c*9/5)+32; put('tempResult',formatNum(r)+'°'); aiSay(formatNum(r));}
  if(type==='currency'){const v=val('currencyInput'); if(!Number.isFinite(v)) return put('currencyResult','Please enter a valid number.'); const inrRates={inr:1,usd:83,bdt:.71}; const inr=v*inrRates[get('currencyFrom')]; const r=inr/inrRates[get('currencyTo')]; put('currencyResult',formatNum(r)+' '+get('currencyTo').toUpperCase()); aiSay(formatNum(r)+' '+get('currencyTo').toUpperCase());}
}
