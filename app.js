'use strict';
const products = window.PRODUCTS || [];
const state = {world:'all',category:'all',search:'',sort:'curated'};
let language='de';
try { language=new URLSearchParams(location.search).get('lang') || localStorage.getItem('giggle-home-language') || 'de'; } catch (_) {}
if(!['de','en'].includes(language))language='de';
const translations={
 de:{labels:{books:'Malbuch',clothing:'Clothing',posters:'Poster',calendar:'Kalender'},categories:{all:'Alles',books:'Malbücher',clothing:'T-Shirts / Clothing',posters:'Poster',calendar:'Kalender'},allWorlds:'Alle Welten',view:'Bei {shop} ansehen',spread:'Shirts bei Spreadshop',newTab:'neuer Tab',one:'Produkt',many:'Produkte'},
 en:{labels:{books:'Coloring book',clothing:'Clothing',posters:'Poster',calendar:'Calendar'},categories:{all:'All',books:'Coloring books',clothing:'T-Shirts / Clothing',posters:'Posters',calendar:'Calendar'},allWorlds:'All worlds',view:'View on {shop}',spread:'Shirts on Spreadshop',newTab:'new tab',one:'product',many:'products'}
};
function t(){return translations[language];}
function localizedProduct(p){return {...p,title:language==='en'?(p.titleEn||p.title):p.title,description:language==='en'?(p.descriptionEn||p.description):p.description,format:language==='en'?({'Kunstdruck':'Art print','A4-Wandkalender':'A4 wall calendar','Digitaler Download':'Digital download'}[p.format]||p.format):p.format};}
function viewLabel(shop){return t().view.replace('{shop}',shop);}
const grid = document.querySelector('#grid');
function text(tag, value, cls){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;return el;}
function shopLink(url, label, title, secondary=false){
 const a=text('a',label,'product-link'+(secondary?' secondary-shop-link':''));
 a.href=url;a.target='_blank';a.rel='noopener noreferrer';
 a.setAttribute('aria-label',title+' – '+label+' ('+t().newTab+')');
 a.append(text('span','↗'));return a;
}
function card(original){
 const p=localizedProduct(original);
 const article=document.createElement('article');article.className='product '+p.category;
 const a=document.createElement('a');a.className='product-main';a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',p.title+' – '+viewLabel(p.shop)+' ('+t().newTab+')');
 const picture=document.createElement('div');picture.className='product-image';
 const img=document.createElement('img');img.src=p.image;img.alt=p.title;img.loading='lazy';img.width=340;img.height=374;
 img.addEventListener('error',()=>{img.hidden=true;picture.append(text('span',p.title,'image-fallback'));},{once:true});
 picture.append(img,text('span',p.world==='punk'?'Punk for Kids':'Kids','badge '+(p.world==='punk'?'rebel':'')));
 const meta=document.createElement('div');meta.className='product-meta';meta.append(text('span',t().labels[p.category]),text('span',p.format));
 const details=document.createElement('div');details.className='product-details';
 details.append(meta,text('h3',p.title),text('p',p.description));a.append(picture,details);
 const actions=document.createElement('div');actions.className='product-actions';
 actions.append(shopLink(p.url,viewLabel(p.shop),p.title));
 if(p.spreadshopUrl)actions.append(shopLink(p.spreadshopUrl,t().spread,p.title,true));
 article.append(a,actions);return article;
}
function render(){
 const base=products.filter(p=>(state.world==='all'||p.world===state.world)&&[p.title,p.description,p.titleEn||'',p.descriptionEn||'',localizedProduct(p).format,p.shop].join(' ').toLocaleLowerCase(language).includes(state.search));
 let filtered=base.filter(p=>state.category==='all'||p.category===state.category);
 if(state.sort!=='curated')filtered.sort((a,b)=>localizedProduct(a).title.localeCompare(localizedProduct(b).title,language)*(state.sort==='za'?-1:1));
 if(state.sort==='curated'&&state.category==='all'){
  const featured=['B0HQXTZCYX','4578612735','B0HM32BWGN','4603169815','4597600781','B0HPM6Y2FQ','4587312441','4604552667'];
  filtered.sort((a,b)=>(featured.includes(a.id)?featured.indexOf(a.id):999)-(featured.includes(b.id)?featured.indexOf(b.id):999));
 }
 grid.replaceChildren(...filtered.map(card));document.querySelector('#count').textContent=filtered.length+' '+(filtered.length===1?t().one:t().many);document.querySelector('#empty').hidden=filtered.length!==0;
 document.querySelectorAll('[data-world]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.world===state.world)));
 document.querySelectorAll('[data-category]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.category===state.category));b.querySelector('span').textContent=base.filter(p=>b.dataset.category==='all'||p.category===b.dataset.category).length;});
}
document.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>{state.world=b.dataset.world;render();}));
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.category;render();}));
document.querySelectorAll('[data-world-link]').forEach(a=>a.addEventListener('click',()=>{state.world=a.dataset.worldLink;state.category='all';state.search='';document.querySelector('#search').value='';render();}));
document.querySelector('#search').addEventListener('input',e=>{state.search=e.target.value.trim().toLocaleLowerCase(language);render();});
document.querySelector('#sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
document.querySelector('#reset').addEventListener('click',()=>{Object.assign(state,{world:'all',category:'all',search:'',sort:'curated'});document.querySelector('#search').value='';document.querySelector('#sort').value='curated';render();});

function applyLanguage(){
 const en=language==='en';document.documentElement.lang=language;
 const set=(selector,de,english)=>{document.querySelector(selector).innerHTML=en?english:de;};
 const attr=(selector,name,de,english)=>document.querySelector(selector).setAttribute(name,en?english:de);
 set('.skip','Zum Produktkatalog','Skip to products');
 set('.shop-nav:not(.amazon-nav)','Zum Etsy-Shop ↗','Visit Etsy shop ↗');
 set('.amazon-nav','Zu Amazon ↗','Visit Amazon ↗');
 set('.hero-copy > .eyebrow','EIN KLEINES ZUHAUSE FÜR GROSSE FREUDE','A LITTLE HOME FOR BIG SMILES');
 const underline='<svg viewBox="0 0 440 20" aria-hidden="true"><path d="M4 13Q180 -4 430 9M20 18Q180 5 390 15"/></svg>';
 set('.hero h1','Kleine Köpfe.<br>Große <span>Fantasie.</span>'+underline,'Little minds.<br>Big <span>imagination.</span>'+underline);
 set('.intro','Ein bisschen wild. Ein bisschen wundervoll.<br>Malbücher, Shirts und Poster für Kinder,<br>die ihre Welt selbst bunt machen.','A little wild. A little wonderful.<br>Coloring books, shirts and posters for kids<br>who make their world their own.');
 set('.hero-copy > .button','Produkte entdecken <span>↘</span>','Explore products <span>↘</span>');
 set('.hero-note','Von Stefan Marx · Für kleine Freigeister','By Stefan Marx · For little free spirits');
 set('.world.punk .eyebrow','FÜR KLEINE REBELLEN','FOR LITTLE REBELS');
 set('.world.punk p','Laut, liebenswert und herrlich eigensinnig.','Loud, lovable and wonderfully independent.');
 set('.world.kids .eyebrow','FÜR GROSSE TRÄUMER','FOR BIG DREAMERS');
 set('.world.kids p','Kleine Freunde. Bunte Welten. Neue Abenteuer.','Little friends. Colorful worlds. New adventures.');
 set('.catalog-heading .eyebrow','UNSERE PRODUKTE','OUR PRODUCTS');
 set('.catalog-heading h2','Malbücher, Shirts, Poster <i>&amp; Kalender.</i>','Coloring books, shirts, posters <i>&amp; calendars.</i>');
 attr('#search','placeholder','Produkte suchen …','Search products …');
 attr('#search','aria-label','Produkte durchsuchen','Search products');
 document.querySelector('.sort-label').firstChild.textContent=en?'Sort by ':'Sortieren ';
 set('#sort option[value="curated"]','Unsere Auswahl','Our selection');
 set('#sort option[value="az"]','Name A–Z','Name A–Z');set('#sort option[value="za"]','Name Z–A','Name Z–A');
 document.querySelector('[data-world="all"]').textContent=t().allWorlds;
 document.querySelectorAll('[data-category]').forEach(b=>{b.firstChild.textContent=t().categories[b.dataset.category]+' ';});
 set('#empty h3','Noch kein Treffer.','No matches yet.');
 set('#empty p','Probiere einen anderen Suchbegriff oder eine andere Kategorie.','Try a different search term or category.');
 set('#reset','Alle Produkte zeigen','Show all products');
 set('.endnote-copy .eyebrow','EINE IDEE. VIELE BUNTE WELTEN.','ONE IDEA. MANY COLORFUL WORLDS.');
 set('.endnote-copy h2','Für mehr „Das bin ich!“<br>im Kinderzimmer.','A little more “That’s me!”<br>in their world.');
 set('.endnote-copy p:not(.eyebrow)','Ob mit Stiften in der Hand, dem Lieblingsshirt am Körper<br>oder einem kleinen Abenteuer an der Wand.','With pencils in hand, a favorite shirt to wear<br>or a little adventure on the wall.');
 set('.endnote-actions a:nth-child(1)','Giggle Home auf Etsy ↗','Giggle Home on Etsy ↗');
 set('.endnote-actions a:nth-child(2)','Malbücher bei Amazon ↗','Coloring books on Amazon ↗');
 set('.endnote-actions a:nth-child(3)','Shirts bei Spreadshop ↗','Shirts on Spreadshop ↗');
 set('footer p','Malbücher, Kleidung, Poster &amp; Kalender.','Coloring books, clothing, posters &amp; calendars.');
 set('.take-home .eyebrow','FÜR UNTERWEGS','TAKE IT WITH YOU');
 set('#take-home-title','Giggle Home mitnehmen','Take Giggle Home along');
 set('.take-home-description','Scannen, speichern oder weitergeben – unsere bunten Welten passen auch in die Hosentasche.','Scan, save or share – our colorful worlds fit in your pocket, too.');
 set('.qr-downloads a:nth-child(1)','QR-Code herunterladen ↧','Download QR code ↧');
 set('.qr-downloads a:nth-child(2)','Druckversion (SVG) ↧','Print version (SVG) ↧');
 attr('.qr-image-link','aria-label','Giggle Home über den QR-Link öffnen','Open Giggle Home using the QR link');
 attr('.qr-image-link img','alt','QR-Code zur Giggle-Home-Webseite','QR code linking to the Giggle Home website');

 set('.demo-note','Designvorschau · Auswahl echter Produkte, Stand 10.11.2026 · Einkauf und aktuelle Preise direkt bei Amazon, Etsy oder Spreadshop. Vor Veröffentlichung: vollständigen Katalog und rechtliche Angaben ergänzen.','Design preview · Selected real products, updated November 10, 2026 · Shop and check current prices on Amazon, Etsy or Spreadshop. Complete the catalog and legal information before publication.');
 attr('nav','aria-label','Hauptnavigation','Main navigation');attr('.language-switch','aria-label','Sprache wählen','Choose language');
 attr('.worlds','aria-label','Unsere Welten','Our worlds');attr('.world-filters','aria-label','Produktwelt','Product world');attr('.category-filters','aria-label','Produkttyp','Product category');
 attr('#sort','aria-label','Produkte sortieren','Sort products');attr('.endnote-actions','aria-label','Unsere Shops','Our shops');
 attr('.hero-art','aria-label','Eine Auswahl unserer Malbücher und Shirts','A selection of our coloring books and shirts');
 attr('.ticker','aria-label','Bunte Ideen für kleine Freigeister','Colorful ideas for little free spirits');
 document.querySelectorAll('.brand,.footer-brand').forEach(a=>a.setAttribute('aria-label',en?'Giggle Home – Home':'Giggle Home – Startseite'));
 attr('.brand-logo','alt','Giggle Home mit lachendem Haus','Giggle Home with smiling house');
 attr('.hero-book img','alt','Giggle Dumplings Regenbogen Ausmalbuch','Giggle Dumplings Rainbow coloring book, German edition');
 attr('.hero-shirt img','alt','Punky Dumplings Kinder-T-Shirt','Punky Dumplings kids T-shirt');
 attr('.punk-symbol','alt','Giggle Punk – lachendes Gesicht mit Irokesen','Giggle Punk – smiling face with a mohawk');
 attr('.home-symbol','alt','Giggle Home – lachendes Haus','Giggle Home – smiling house');
 attr('.endnote-art','alt','Das lachende Giggle-Home-Haus mit zwei Dumplings beim Malen, einem Kinder-Shirt und einem gerahmten Fantasieposter','The smiling Giggle Home house with two dumplings, a coloring book, a kids T-shirt and a framed fantasy poster');
 document.title=en?'Giggle Home — Little minds. Big imagination.':'Giggle Home — Kleine Köpfe. Große Fantasie.';
 attr('meta[name="description"]','content','Entdecke die bunte Welt von Giggle Home: Malbücher, Shirts, Poster und Kalender für kleine Freigeister.','Explore the colorful world of Giggle Home: coloring books, shirts, posters and calendars for little free spirits.');
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
 render();
}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{
 language=b.dataset.lang;
 try{localStorage.setItem('giggle-home-language',language);}catch(_){}
 try{const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);}catch(_){}
 applyLanguage();
}));

applyLanguage();

// A one-off, non-interactive hello for every visitor. Respect reduced motion.
function greetVisitor(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 try{if(sessionStorage.getItem('giggle-house-hello'))return;sessionStorage.setItem('giggle-house-hello','shown');}catch(_){}
 const mascot=document.querySelector('.qr-mascot');
 mascot.addEventListener('animationend',event=>{if(event.target===mascot)mascot.hidden=true;});
 mascot.hidden=false;
}
greetVisitor();
