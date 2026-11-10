'use strict';
const products = window.PRODUCTS || [];
const state = {world:'all',category:'all',search:'',sort:'curated'};
const labels = {books:'Malbuch',clothing:'Clothing',posters:'Poster',calendar:'Kalender'};
const grid = document.querySelector('#grid');
function text(tag, value, cls){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;return el;}
function shopLink(url, label, title, secondary=false){
 const a=text('a',label,'product-link'+(secondary?' secondary-shop-link':''));
 a.href=url;a.target='_blank';a.rel='noopener noreferrer';
 a.setAttribute('aria-label',title+' – '+label+' (neuer Tab)');
 a.append(text('span','↗'));return a;
}
function card(p){
 const article=document.createElement('article');article.className='product '+p.category;
 const a=document.createElement('a');a.className='product-main';a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',p.title+' bei '+p.shop+' ansehen (neuer Tab)');
 const picture=document.createElement('div');picture.className='product-image';
 const img=document.createElement('img');img.src=p.image;img.alt=p.title;img.loading='lazy';img.width=340;img.height=374;
 img.addEventListener('error',()=>{img.hidden=true;picture.append(text('span',p.title,'image-fallback'));},{once:true});
 picture.append(img,text('span',p.world==='punk'?'Punk for Kids':'Kids','badge '+(p.world==='punk'?'rebel':'')));
 const meta=document.createElement('div');meta.className='product-meta';meta.append(text('span',labels[p.category]),text('span',p.format));
 const details=document.createElement('div');details.className='product-details';
 details.append(meta,text('h3',p.title),text('p',p.description));a.append(picture,details);
 const actions=document.createElement('div');actions.className='product-actions';
 actions.append(shopLink(p.url,'Bei '+p.shop+' ansehen',p.title));
 if(p.spreadshopUrl)actions.append(shopLink(p.spreadshopUrl,'Shirts bei Spreadshop',p.title,true));
 article.append(a,actions);return article;
}
function render(){
 const base=products.filter(p=>(state.world==='all'||p.world===state.world)&&[p.title,p.description,p.format,p.shop].join(' ').toLocaleLowerCase('de').includes(state.search));
 let filtered=base.filter(p=>state.category==='all'||p.category===state.category);
 if(state.sort!=='curated')filtered.sort((a,b)=>a.title.localeCompare(b.title,'de')*(state.sort==='za'?-1:1));
 if(state.sort==='curated'&&state.category==='all'){
  const featured=['B0HQXTZCYX','4578612735','B0HM32BWGN','4603169815','4597600781','B0HPM6Y2FQ','4587312441','4604552667'];
  filtered.sort((a,b)=>(featured.includes(a.id)?featured.indexOf(a.id):999)-(featured.includes(b.id)?featured.indexOf(b.id):999));
 }
 grid.replaceChildren(...filtered.map(card));document.querySelector('#count').textContent=filtered.length+(filtered.length===1?' Produkt':' Produkte');document.querySelector('#empty').hidden=filtered.length!==0;
 document.querySelectorAll('[data-world]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.world===state.world)));
 document.querySelectorAll('[data-category]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.category===state.category));b.querySelector('span').textContent=base.filter(p=>b.dataset.category==='all'||p.category===b.dataset.category).length;});
}
document.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>{state.world=b.dataset.world;render();}));
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.category;render();}));
document.querySelectorAll('[data-world-link]').forEach(a=>a.addEventListener('click',()=>{state.world=a.dataset.worldLink;state.category='all';state.search='';document.querySelector('#search').value='';render();}));
document.querySelector('#search').addEventListener('input',e=>{state.search=e.target.value.trim().toLocaleLowerCase('de');render();});
document.querySelector('#sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
document.querySelector('#reset').addEventListener('click',()=>{Object.assign(state,{world:'all',category:'all',search:'',sort:'curated'});document.querySelector('#search').value='';document.querySelector('#sort').value='curated';render();});render();
