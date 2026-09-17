const menu=document.querySelector('.menu');const nav=document.querySelector('.topbar nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

/* Logos intégrés localement dans la page pour éviter les images cassées des CDN */
const svgData=svg=>'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
const powerBiSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="7" y="28" width="11" height="27" rx="3" fill="#F2C811"/><rect x="22" y="18" width="11" height="37" rx="3" fill="#F2C811"/><rect x="37" y="9" width="11" height="46" rx="3" fill="#F2C811"/><rect x="52" y="3" width="7" height="52" rx="3" fill="#E5B900"/></svg>`;
const koboSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#2095F3"/><path d="M20 14h9v15l13-15h11L37 31l17 19H42L29 35v15h-9z" fill="white"/></svg>`;
const power=document.querySelector('img[alt="Logo Power BI"]');if(power)power.src=svgData(powerBiSvg);
const kobo=document.querySelector('img[alt="Logo KoboToolbox"]');if(kobo)kobo.src=svgData(koboSvg);

/* Sur mobile, les navigateurs Android affichent les PDF embarqués comme un bouton "Ouvrir".
   On les remplace donc par des vignettes cartographiques légères et stables. */
const mobileStyle=document.createElement('style');mobileStyle.textContent=`
.mobile-project-visual{position:absolute;inset:0;overflow:hidden;background:linear-gradient(135deg,#0a5378,#1785a5)}
.mobile-project-visual svg{width:100%;height:100%;display:block}
.mobile-project-visual.koutiala{background:linear-gradient(135deg,#496f56,#8aaa65)}
.mobile-project-visual.siguiri{background:linear-gradient(135deg,#56417d,#b07655)}
.mobile-project-visual.par{background:linear-gradient(135deg,#6b482d,#b57b42)}
@media(max-width:700px){.project-thumb{height:185px}.project-thumb iframe{display:none!important}.project-label{font-size:12px;bottom:13px}.project-type{font-size:10px}}
`;document.head.appendChild(mobileStyle);
function mapVisual(kind){
 const common=`<path d="M-10 128 C42 82 69 103 112 60 S188 28 252 72 S335 88 430 31" fill="none" stroke="white" stroke-opacity=".38" stroke-width="3"/><path d="M8 42 L74 19 128 48 184 20 247 49 304 25 390 56 370 126 303 109 245 139 176 112 112 142 54 106Z" fill="white" fill-opacity=".10" stroke="white" stroke-opacity=".24" stroke-width="2"/>`;
 if(kind==='koutiala')return `<div class="mobile-project-visual koutiala"><svg viewBox="0 0 400 180" preserveAspectRatio="none">${common}<path d="M45 142L105 62 164 126 218 58 285 132 354 69" fill="none" stroke="#fff" stroke-opacity=".72" stroke-width="4"/><circle cx="105" cy="62" r="6" fill="#fff"/><circle cx="218" cy="58" r="6" fill="#fff"/><circle cx="354" cy="69" r="6" fill="#fff"/></svg></div>`;
 if(kind==='siguiri')return `<div class="mobile-project-visual siguiri"><svg viewBox="0 0 400 180" preserveAspectRatio="none">${common}<path d="M58 53l44-22 38 30-15 46-51 8-31-31zM220 40l52-14 38 35-13 48-58 10-35-36z" fill="#e8c65a" fill-opacity=".42" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><circle cx="117" cy="126" r="6" fill="#fff"/><circle cx="327" cy="122" r="6" fill="#fff"/></svg></div>`;
 return `<div class="mobile-project-visual par"><svg viewBox="0 0 400 180" preserveAspectRatio="none">${common}<path d="M22 145 C91 119 118 67 181 82 S282 130 382 38" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="22" cy="145" r="8" fill="#fff"/><circle cx="382" cy="38" r="8" fill="#fff"/><path d="M160 34v92m-20-64h40m-34 22h28" stroke="#fff" stroke-opacity=".65" stroke-width="3"/></svg></div>`;
}
function fixMobileProjectPreviews(){if(!window.matchMedia('(max-width:700px)').matches)return;document.querySelectorAll('.project-thumb iframe').forEach(frame=>{const title=(frame.title||'').toLowerCase();let kind='par';if(title.includes('koutiala'))kind='koutiala';else if(title.includes('siguiri'))kind='siguiri';frame.insertAdjacentHTML('afterend',mapVisual(kind));frame.remove();});}
fixMobileProjectPreviews();