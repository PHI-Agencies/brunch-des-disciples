(function(){
var d=document,B=d.body;B.classList.add('js','lock');
var $=function(s){return d.querySelector(s)},$$=function(s){return [].slice.call(d.querySelectorAll(s))};
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function R(a,b){return a+Math.random()*(b-a)}
function tr(f){try{f()}catch(e){if(window.console)console.error(e)}}
var FC=['#f5d63d','#ffffff','#ff8fb3','#ff9f43','#c9a7ff','#ff6b6b'],BC=['#f5d63d','#ff9f43','#ffffff','#7fd3ff','#ffb3d1'];
function mix(a,b,f){return 'rgb('+(a[0]+(b[0]-a[0])*f|0)+','+(a[1]+(b[1]-a[1])*f|0)+','+(a[2]+(b[2]-a[2])*f|0)+')'}
function e3(x){x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)}
function fly(c,x,y,s,ph,col,a){var w=Math.abs(Math.cos(ph))*.9+.1;c.save();c.translate(x,y);c.rotate(a);c.fillStyle=col;[-1,1].forEach(function(k){c.beginPath();c.ellipse(k*s*.5*w,-s*.25,s*.5*w,s*.42,k*.5,0,7);c.fill();c.globalAlpha=.8;c.beginPath();c.ellipse(k*s*.38*w,s*.3,s*.34*w,s*.28,-k*.4,0,7);c.fill();c.globalAlpha=1});c.fillStyle='#2b1a0e';c.fillRect(-s*.05,-s*.55,s*.1,s*1.1);c.restore()}

/* ===== Plaine de gazon : sol, ciel, soleil et brins d'herbe en 3D (WebGL2) ===== */
function m4p(f,a,n,fa){var t=1/Math.tan(f/2),q=1/(n-fa);return [t/a,0,0,0,0,t,0,0,0,0,(fa+n)*q,-1,0,0,2*fa*n*q,0]}
function m4l(e,g){var z=[e[0]-g[0],e[1]-g[1],e[2]-g[2]],l=Math.hypot(z[0],z[1],z[2]);z=[z[0]/l,z[1]/l,z[2]/l];var x=[z[2],0,-z[0]];l=Math.hypot(x[0],x[2]);x=[x[0]/l,0,x[2]/l];var y=[z[1]*x[2],z[2]*x[0]-z[0]*x[2],-z[1]*x[0]];return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*e[0]+x[2]*e[2]),-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]),-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]),1]}
function m4m(a,b){var o=[],i,j,k,s;for(i=0;i<4;i++)for(j=0;j<4;j++){s=0;for(k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];o[i*4+j]=s}return o}
function nrm(v){var l=Math.hypot(v[0],v[1],v[2]);return [v[0]/l,v[1]/l,v[2]/l]}
var GV='#version 300 es\nprecision highp float;\nuniform mat4 uVP;uniform vec3 uE;uniform float uT,uG,uV,uL,uW;\nin vec3 aR;in vec4 aS;\n'+
'vec3 bp(float t,float s,out float zz){float h=aS.x;zz=mod(aR.y-uV*uT,uL);'+
'float g=clamp(uG*1.9-(zz/uL)*.9-fract(aR.z*13.7)*.35,0.,1.);g=g*g*(3.-2.*g);'+
'float ln=(fract(aR.z*7.13)-.35)*.55;vec2 d=vec2(cos(aS.z),sin(aS.z));'+
'float wv=sin(uT*1.5+aR.x*.8+zz*.45+aS.w)*.5+sin(uT*3.1+aR.x*1.9+zz*.8+aS.w*2.)*.2+sin(zz*.3-uT*1.1+aR.x*.12)*.55;'+
'float k=t*t*h*g;vec3 p=vec3(aR.x,0.,zz);p.xz+=d*ln*k;p.x+=wv*uW*k;p.z+=wv*uW*.3*k;'+
'p.y=h*g*(t-.28*ln*ln*t*t);p.xz+=vec2(-d.y,d.x)*s*aS.y*(1.-t*t*.9)*g;return p;}\n';
var VB='in vec2 aL;out float vT,vD,vS;out vec3 vN,vV;\nvoid main(){float zz;vec3 p=bp(aL.y,aL.x,zz);vec2 d=vec2(cos(aS.z),sin(aS.z));vN=normalize(vec3(d.x,.5+aL.y*.3,d.y));vT=aL.y;vD=zz;vS=aR.z;vV=uE-p;gl_Position=uVP*vec4(p,1.);}';
var FB='#version 300 es\nprecision highp float;\nin float vT,vD,vS;in vec3 vN,vV;uniform vec3 uSun,uFC;uniform float uF,uSI,uL;out vec4 o;\n'+
'void main(){float r=fract(vS*3.7),r2=fract(vS*5.3);'+
'vec3 c=mix(vec3(.03,.1,.02),vec3(.16,.4,.06),smoothstep(0.,.45,vT));'+
'c=mix(c,vec3(.6,.78,.16),smoothstep(.4,1.,vT)*(.45+.4*r));c*=.75+.5*r;'+
'c=mix(c,c*vec3(1.35,1.1,.5),step(.92,r2)*.45);'+
'vec3 n=normalize(vN),v=normalize(vV);float d=abs(dot(n,uSun))*.55+.45,rim=pow(1.-abs(dot(n,v)),2.5);'+
'c*=.35+d*.9;c+=vec3(1.,.85,.4)*pow(max(dot(v,-uSun),0.),2.)*smoothstep(.3,1.,vT)*uSI*(.15+rim*.7);'+
'float f=1.-exp(-pow(vD*uF,1.3)),al=1.-smoothstep(uL*.55,uL,vD);vec3 col=mix(c,uFC,f);o=vec4(col*al,al);}';
var VE='#version 300 es\nout vec2 vP;void main(){vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.);vP=p;gl_Position=vec4(p,0.,1.);}';
var FE='#version 300 es\nprecision highp float;\nuniform vec3 uE,uR,uU,uFw,uSun,uFC,uZ;uniform float uTH,uAs,uT,uV,uF,uSI;in vec2 vP;out vec4 o;\n'+
'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n'+
'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}\n'+
'void main(){vec3 r=normalize(uFw+uR*vP.x*uTH*uAs+uU*vP.y*uTH),c;'+
'if(r.y<-.0004){float t=-uE.y/r.y;vec2 P=uE.xz+r.xz*t;vec2 Q=vec2(P.x,P.y+uV*uT);'+
'vec3 b=mix(vec3(.21,.47,.08),vec3(.16,.38,.06),step(.5,fract(Q.y/2.5)));'+
'float n=vn(Q*.35)*.55+vn(Q*1.6)*.3;b*=.78+.5*n;'+
'float g=vn(Q*18.)*.6+vn(Q*55.)*.4;b*=1.+(g-.5)*.55*exp(-t*.1);'+
'c=mix(b,uFC,1.-exp(-pow(t*uF,1.3)));}'+
'else{float y=max(r.y,0.);vec3 s=mix(uFC,uZ,pow(y,.5));float sd=max(dot(r,uSun),0.);'+
's+=vec3(1.,.82,.5)*(pow(sd,8.)*.35+pow(sd,200.)*.8)*uSI+vec3(1.,.97,.85)*smoothstep(.99965,.9999,sd);'+
'vec2 q=r.xz/(y+.12)*.9+vec2(uT*.01,0.);float cl=vn(q*1.4)*.55+vn(q*3.2)*.3+vn(q*7.)*.15;'+
's=mix(s,vec3(1.,.97,.93),smoothstep(.55,.85,cl)*smoothstep(0.,.22,y)*.55);c=s;}'+
'o=vec4(c,1.);}';
function grass(cv,o){
 var gl=cv.getContext('webgl2',{antialias:true,alpha:false});if(!gl)return null;
 function sh(t,s){var h=gl.createShader(t);gl.shaderSource(h,s);gl.compileShader(h);if(!gl.getShaderParameter(h,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(h));return h}
 function pg(v,f){var p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p}
 var pb=pg(GV+VB,FB),pe=pg(VE,FE);
 function buf(d,t){var b=gl.createBuffer();t=t||gl.ARRAY_BUFFER;gl.bindBuffer(t,b);gl.bufferData(t,d,gl.STATIC_DRAW);return b}
 var a=new Float32Array(o.n*7),i,gb,mesh,idx,vpL,eL;
 for(i=0;i<o.n;i++)a.set([R(-o.W,o.W),R(0,o.L),Math.random(),R(o.h0,o.h1),R(.013,.026),R(0,6.283),R(0,6.283)],i*7);
 gb=buf(a);mesh=buf(new Float32Array([-1,0,1,0,-1,.4,1,.4,-1,.75,1,.75,0,1]));idx=buf(new Uint16Array([0,1,2,1,3,2,2,3,4,3,5,4,4,5,6]),gl.ELEMENT_ARRAY_BUFFER);
 function U(p,n,v){var l=gl.getUniformLocation(p,n);if(l===null)return;if(v.length===16)gl.uniformMatrix4fv(l,false,v);else if(v.length===3)gl.uniform3fv(l,v);else gl.uniform1f(l,v)}
 function A(p,n,b,sz,off,dv){var l=gl.getAttribLocation(p,n);if(l<0)return;gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,sz,gl.FLOAT,false,sz===2?0:28,off);gl.vertexAttribDivisor(l,dv)}
 return {
  draw:function(t,g,e,tg,fov,q){
   var as=cv.width/cv.height,vp=m4m(m4p(fov,as,.08,80),m4l(e,tg)),fw=nrm([tg[0]-e[0],tg[1]-e[1],tg[2]-e[2]]),rt=nrm([-fw[2],0,fw[0]]),up=[rt[1]*fw[2]-rt[2]*fw[1],rt[2]*fw[0]-rt[0]*fw[2],rt[0]*fw[1]-rt[1]*fw[0]];
   vpL=vp;eL=e;
   function com(p){U(p,'uVP',vp);U(p,'uE',e);U(p,'uT',t);U(p,'uG',g);U(p,'uV',q.v);U(p,'uL',o.L);U(p,'uW',q.w);U(p,'uSun',q.sun);U(p,'uFC',q.fc);U(p,'uF',q.f);U(p,'uSI',q.si)}
   gl.viewport(0,0,cv.width,cv.height);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
   gl.useProgram(pe);com(pe);U(pe,'uR',rt);U(pe,'uU',up);U(pe,'uFw',fw);U(pe,'uZ',q.zc);U(pe,'uTH',Math.tan(fov/2));U(pe,'uAs',as);gl.drawArrays(gl.TRIANGLES,0,3);
   gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
   gl.useProgram(pb);com(pb);A(pb,'aL',mesh,2,0,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,idx);
   A(pb,'aR',gb,3,0,1);A(pb,'aS',gb,4,12,1);gl.drawElementsInstanced(gl.TRIANGLES,15,gl.UNSIGNED_SHORT,0,o.n)},
  scr:function(d,W,H){var p=[eL[0]+d[0]*100,eL[1]+d[1]*100,eL[2]+d[2]*100,1],c=[0,1,2,3].map(function(r){return vpL[r]*p[0]+vpL[4+r]*p[1]+vpL[8+r]*p[2]+vpL[12+r]*p[3]});return c[3]>0?[(c[0]/c[3]+1)/2*W,(1-c[1]/c[3])/2*H]:null},
  kill:function(){var x=gl.getExtension('WEBGL_lose_context');if(x)x.loseContext()}}}
function glow(c,s,W,H,a){if(!s)return;c.globalCompositeOperation='lighter';var q=c.createRadialGradient(s[0],s[1],0,s[0],s[1],H*.7);q.addColorStop(0,'rgba(255,240,180,'+a+')');q.addColorStop(1,'rgba(255,230,150,0)');c.fillStyle=q;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over'}

/* ===== 1. Intro : on glisse au-dessus de la plaine, le soleil se lève en face ===== */
function intro(){
 var iv=$('#intro'),cg=$('#ig'),cf=$('#ib'),g2=cf.getContext('2d'),G=null,W,H,st=null,DUR=7.6,done=0,sm=innerWidth<700,k=sm?.85:Math.min(devicePixelRatio||1,1.25);
 function fin(){if(done)return;done=1;iv.classList.add('out');B.classList.add('go');B.classList.remove('lock');setTimeout(function(){if(G)G.kill();iv.remove()},1500)}
 $('#skip').onclick=fin;
 d.addEventListener('keydown',function(e){if(e.key==='Escape')fin()});
 if(RM){fin();return}
 try{G=grass(cg,{n:sm?18000:42000,W:12,L:16,h0:.22,h1:.5})}catch(e){if(window.console)console.error(e)}
 if(!G){fin();return}
 function size(){W=innerWidth;H=innerHeight;[cg,cf].forEach(function(e){e.width=W*k|0;e.height=H*k|0});g2.setTransform(k,0,0,k,0,0)}
 size();addEventListener('resize',size);
 var Q={v:1.8,w:.35,sun:[0,.1,1],fc:[1,.6,.3],zc:[.1,.2,.3],f:.022,si:1};
 function draw(ts){
  if(done)return;if(st===null)st=ts;
  var t=(ts-st)/1000,e=e3(t/5.6),p=-.12+.3*e,el=.02+.21*e,eye=[0,1,0],tg=[0,1+Math.sin(p)*5,Math.cos(p)*5],s;
  Q.sun=nrm([0,Math.sin(el),Math.cos(el)]);Q.fc=[1,(150+82*e)/255,(70+90*e)/255];Q.zc=[(10+60*e)/255,(40+100*e)/255,(60+140*e)/255];
  G.draw(t,1,eye,tg,.96,Q);
  g2.clearRect(0,0,W,H);glow(g2,G.scr(Q.sun,W,H),W,H,.15+.35*e);
  s=g2.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.95);s.addColorStop(0,'rgba(0,0,0,0)');s.addColorStop(1,'rgba(0,20,10,.5)');g2.fillStyle=s;g2.fillRect(0,0,W,H);
  if(t>DUR)fin();else requestAnimationFrame(draw)}
 requestAnimationFrame(draw)}

/* ===== 2. En-tête : on est arrêté et on voit la plaine de gazon à perte de vue ===== */
function hero(){
 var cv=$('#hg'),fx=$('#fx'),c=fx.getContext('2d'),G=null,W,H,on=false,st=null,mx=0,my=0,sx=0,sy=0,sm=innerWidth<700,po=[],i;
 try{G=grass(cv,{n:sm?20000:45000,W:12,L:16,h0:.22,h1:.5})}catch(e){if(window.console)console.error(e)}
 if(!G)cv.parentNode.classList.add('nogl');
 for(i=0;i<34;i++)po.push({x:R(0,1),y:R(0,1),v:R(.01,.03),p:R(0,6.3),r:R(1,2.4)});
 var Q={v:.12,w:.35,sun:nrm([-.25,.2,.9]),fc:[.82,.89,.68],zc:[.22,.46,.78],f:.02,si:1};
 function size(){var k=Math.min(devicePixelRatio||1,sm?1.25:1.5),r=cv.parentNode.getBoundingClientRect();W=r.width;H=r.height;[cv,fx].forEach(function(e){e.width=W*k|0;e.height=H*k|0});c.setTransform(k,0,0,k,0,0)}
 function frame(ts){var t=ts/1000;if(!st&&B.classList.contains('go'))st=t;var g=RM?1:(st?e3((t-st)/3.4):0),s,q;sx+=(mx-sx)*.04;sy+=(my-sy)*.04;
  var p=-.09+sy*.02,e=[sx*.25,1.5,0],tg=[e[0]+sx*.2,e[1]+Math.sin(p)*3,Math.cos(p)*3];
  if(G)G.draw(t,g,e,tg,.86,Q);
  c.clearRect(0,0,W,H);s=G?G.scr(Q.sun,W,H):null;glow(c,s,W,H,.5);
  c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,246,190,.6)';
  po.forEach(function(p){var y=(((p.y-t*p.v)%1)+1)%1*H;c.beginPath();c.arc(p.x*W+Math.sin(t+p.p)*14,y,p.r,0,7);c.fill()});
  c.globalCompositeOperation='source-over';
  q=c.createLinearGradient(0,0,W*.7,0);q.addColorStop(0,'rgba(4,28,10,.62)');q.addColorStop(1,'rgba(4,28,10,0)');c.fillStyle=q;c.fillRect(0,0,W,H);
  if(on)requestAnimationFrame(frame)}
 size();addEventListener('resize',function(){size();frame(performance.now())});
 addEventListener('pointermove',function(e){mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1});
 if(RM){frame(3000);return}
 new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v&&!on){on=true;requestAnimationFrame(frame)}else if(!v)on=false}).observe(cv)}

/* ===== 3. Titre, compte à rebours, colonnes de photos ===== */
tr(function(){var k=0;$$('#t>span').forEach(function(s){var t=s.textContent;s.textContent='';for(var c of t){var e=d.createElement('span');e.className='l';e.style.setProperty('--i',k++);e.textContent=c;s.appendChild(e)}})});
tr(function(){var T=Date.UTC(2026,11,11,8,0,0);function tick(){var s=Math.floor((T-Date.now())/1000),c=$('#cd');if(s<=0){c.textContent='C’est aujourd’hui !';return}c.textContent='J-'+Math.floor(s/86400)+' · '+Math.floor(s%86400/3600)+' h '+Math.floor(s%3600/60)+' min'}tick();setInterval(tick,30000)});
tr(function(){$$('.vc').forEach(function(c){c.innerHTML+=c.innerHTML});function sp(){$$('.vc').forEach(function(c){c.style.animationDuration=(c.scrollHeight/2/26)+'s'})}addEventListener('load',sp);addEventListener('resize',sp);sp()});

/* ===== 4. Menu plein écran ===== */
tr(function(){var mb=$('#mb'),mn=$('#menu');
 function mo(o){mn.classList.toggle('on',o);B.classList.toggle('mo',o);mb.setAttribute('aria-expanded',o);mn.setAttribute('aria-hidden',!o);mb.querySelector('span').textContent=o?'Fermer':'Menu'}
 mb.onclick=function(){mo(!mn.classList.contains('on'))};
 $$('#menu a').forEach(function(a){a.onclick=function(){mo(false)}});
 d.addEventListener('keydown',function(e){if(e.key==='Escape')mo(false)});
 var sp=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)$$('#menu a').forEach(function(a){a.classList.toggle('cur',a.getAttribute('href')==='#'+x.target.id)})})},{threshold:.4});
 ['apropos','christ','talk','billets','stands','galerie','contact'].forEach(function(id){var e=d.getElementById(id);if(e)sp.observe(e)})});

/* ===== 5. Révélation des photos, progression, points de vente, stands, galerie ===== */
tr(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.25});$$('.rv').forEach(function(e){io.observe(e)});
 addEventListener('scroll',function(){$('#bar').style.width=(scrollY/(d.body.scrollHeight-innerHeight)*100)+'%'},{passive:true})});
tr(function(){var P=[['Bobo 2010, Colma','64 94 24 56'],['Secteur 24, Belleville','74 39 70 04'],['Secteur 32, Dogona','57 44 36 45'],['Sarfalao, secteur 5','56 83 09 52'],['Yéguéré, secteur 22','74 29 73 46'],['Kôkô, Bindougousso','60 69 29 28'],['Ouézzin ville, Accart-ville','56 67 22 66']],ul=$('#pts');
 function nz(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
 P.forEach(function(p){var li=d.createElement('li');li.dataset.k=nz(p[0]);li.innerHTML='<a href="tel:+226'+p[1].replace(/ /g,'')+'"><span>'+p[0]+'</span><b>'+p[1]+'</b></a>';ul.appendChild(li)});
 $('#q').oninput=function(){var v=nz(this.value).trim(),n=0;ul.querySelectorAll('li').forEach(function(li){var ok=li.dataset.k.indexOf(v)>-1;li.style.display=ok?'':'none';if(ok)n++});$('#none').style.display=n?'none':'block'}});
tr(function(){for(var i=1;i<=6;i++)(function(n){var b=d.createElement('button');b.innerHTML='<b>'+n+'</b>Réserver ce stand';b.onclick=function(){open('https://wa.me/22664857962?text='+encodeURIComponent('Bonjour, je souhaite réserver le stand n°'+n+' au Brunch des Disciples (11 décembre 2026).'),'_blank')};$('#st').appendChild(b)})(i)});
tr(function(){var L=$('#lb'),GB=$$('.gal button'),gi=0;
 function show(i){gi=(i+GB.length)%GB.length;L.querySelector('img').src=GB[gi].querySelector('img').src;L.classList.add('on')}
 GB.forEach(function(b,i){b.onclick=function(){show(i)}});
 L.onclick=function(e){if(e.target.dataset.n)show(gi+ +e.target.dataset.n);else L.classList.remove('on')};
 d.addEventListener('keydown',function(e){if(!L.classList.contains('on'))return;if(e.key==='Escape')L.classList.remove('on');if(e.key==='ArrowRight')show(gi+1);if(e.key==='ArrowLeft')show(gi-1)})});
tr(function(){$$('.card').forEach(function(c){c.onmousemove=function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+x*10+'deg) rotateX('+-y*10+'deg)'};c.onmouseleave=function(){c.style.transform=''}})});

/* ===== Affiche « J’y serai » : cadrage libre de la photo (glisser, zoomer) et choix de la forme ===== */
tr(function(){
 var pm=$('#pm'),cv=$('#pcv'),c=cv.getContext('2d'),nm=$('#pn'),sl=$('#pz'),ph=null,op=null,logo=new Image(),dph=new Image(),W=1080,H=1350,GD='#f2b13c',CR='#fff7e6',kind='portrait',st={k:0,fx:.5,fy:.42},
 F={portrait:{x:360,y:392,w:360,h:420,r:30},arch:{x:360,y:384,w:360,h:436},circle:{x:357,y:418,w:366,h:366}},
 B1='%px Bungee,Impact,sans-serif',P1="italic 500 %px 'Playfair Display',Georgia,serif",O1='700 %px Outfit,Arial,sans-serif',O2='600 %px Outfit,Arial,sans-serif';
 function fnt(f,z){return f.replace('%',z)}
 function fit(t,f,mx,z){c.font=fnt(f,z);while(c.measureText(t).width>mx&&z>14){z-=1;c.font=fnt(f,z)}return z}
 function tx(t,x,y,f,col,z,mx,al){z=mx?fit(t,f,mx,z):z;c.font=fnt(f,z);c.fillStyle=col;c.textAlign=al||'center';c.fillText(t,x,y);return z}
 function sp(t,y,f,col,z,gap){c.font=fnt(f,z);var ws=[],w=-gap,i,x;for(i=0;i<t.length;i++){ws[i]=c.measureText(t[i]).width;w+=ws[i]+gap}x=W/2-w/2;c.fillStyle=col;c.textAlign='left';for(i=0;i<t.length;i++){c.fillText(t[i],x,y);x+=ws[i]+gap}c.textAlign='center';return w}
 function rr(x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
 function fp(e){var f=F[kind],x=f.x-e,y=f.y-e,w=f.w+2*e,h=f.h+2*e,r;if(kind==='arch'){r=w/2;c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+r);c.arc(x+r,y+r,r,Math.PI,0);c.lineTo(x+w,y+h);c.closePath()}else rr(x,y,w,h,kind==='circle'?w/2:f.r+e)}
 function band(y,up){c.save();c.translate(0,y);if(up){c.translate(0,55);c.scale(1,-1)}c.fillStyle='#4a0b1a';c.fillRect(0,0,W,55);c.strokeStyle=GD;c.lineWidth=18;c.lineJoin='round';c.beginPath();for(var x=-32;x<W+64;x+=64){c.lineTo(x,12);c.lineTo(x+32,46)}c.stroke();c.fillStyle=GD;for(x=0;x<W+64;x+=64){c.beginPath();c.arc(x+32,16,5,0,7);c.fill()}c.restore()}
 function meander(flip){c.save();c.translate(flip?W-46:46,468);if(flip)c.scale(-1,1);var p=new Path2D('M0 4H181V68H28V136H181V204H28V224');c.lineJoin='miter';c.lineWidth=9;c.strokeStyle=GD;c.stroke(p);c.lineWidth=3;c.strokeStyle='#6b1423';c.stroke(p);c.restore()}
 function diamond(x,y){c.fillStyle=GD;c.beginPath();c.moveTo(x,y-11);c.lineTo(x+11,y);c.lineTo(x,y+11);c.lineTo(x-11,y);c.fill()}
 /* cadrage de la photo : fx,fy = point de la photo placé au centre du cadre, k = échelle */
 function cur(){return ph||dph}
 function lim(){var f=F[kind],im=cur(),iw=im.naturalWidth||1,ih=im.naturalHeight||1,cov=Math.max(f.w/iw,f.h/ih),con=Math.min(f.w/iw,f.h/ih);return {cov:cov,min:con*.9,max:cov*3.5,iw:iw,ih:ih,f:f}}
 function clampF(){var l=lim(),hx=l.f.w/2/(l.iw*st.k),hy=l.f.h/2/(l.ih*st.k);st.fx=hx>=.5?.5:Math.min(1-hx,Math.max(hx,st.fx));st.fy=hy>=.5?.5:Math.min(1-hy,Math.max(hy,st.fy))}
 function sync(){var l=lim();sl.value=100*Math.log(st.k/l.min)/Math.log(l.max/l.min)}
 function setK(k){var l=lim();st.k=Math.min(l.max,Math.max(l.min,k));clampF();sync()}
 function reframe(){var im=cur();if(!im.naturalWidth)return;var l=lim();st.k=l.cov;st.fx=.5;st.fy=.42;clampF();sync()}
 function draw(){
  var g,i,cx=540,cy=601,v=nm.value.trim(),im=cur(),f=F[kind],z,nw;
  if(im.naturalWidth&&!st.k)reframe();
  g=c.createRadialGradient(cx,cy,100,cx,cy,950);g.addColorStop(0,'#7c1a2c');g.addColorStop(.6,'#4e0c1c');g.addColorStop(1,'#26050f');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='rgba(255,196,110,.055)';for(i=0;i<36;i+=2){c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,1500,i*Math.PI/18,(i+1)*Math.PI/18);c.closePath();c.fill()}
  band(0);band(H-55,true);c.fillStyle='#fff';c.fillRect(0,55,W,3);c.fillRect(0,H-58,W,3);
  rr(427,85,226,112,26);c.fillStyle='#000';c.fill();c.lineWidth=3;c.strokeStyle=GD;c.stroke();
  if(logo.complete&&logo.naturalWidth){var lw=244,lh=lw*logo.naturalHeight/logo.naturalWidth;c.save();rr(430,88,220,106,23);c.clip();c.drawImage(logo,540-lw/2,141-lh/2,lw,lh);c.restore()}
  z=sp('2ÈME ÉDITION',243,O1,CR,28,9);c.fillStyle=GD;c.fillRect(540-z/2-120,238,95,3);c.fillRect(540+z/2+25,238,95,3);
  z=fit('BRUNCH DES DISCIPLES',B1,800,92);tx('BRUNCH DES DISCIPLES',545,318,B1,'rgba(30,4,12,.9)',z);tx('BRUNCH DES DISCIPLES',540,313,B1,GD,z);
  sp('CULTURAL DEFENDER',354,O1,CR,31,9);
  c.save();c.setLineDash([9,9]);c.strokeStyle='rgba(242,177,60,.85)';c.lineWidth=3;fp(36);c.stroke();c.restore();
  g=c.createLinearGradient(f.x-20,f.y-20,f.x+f.w+20,f.y+f.h+20);g.addColorStop(0,'#ffd36b');g.addColorStop(1,'#d3921f');c.fillStyle=g;fp(19);c.fill();
  c.fillStyle='#fff8e6';fp(4);c.fill();
  fp(0);c.fillStyle='#fff3d6';c.fill();
  if(im.naturalWidth&&st.k){c.save();fp(0);c.clip();var w=im.naturalWidth*st.k,h=im.naturalHeight*st.k;c.drawImage(im,f.x+f.w/2-st.fx*w,f.y+f.h/2-st.fy*h,w,h);c.restore()}
  meander(0);meander(1);
  z=fit('J’Y SERAI',B1,830,170);c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=24;tx('J’Y SERAI',547,890,B1,'#e0a02a',z);c.restore();tx('J’Y SERAI',540,883,B1,'#fdf3dd',z);
  if(v){z=fit(v,P1,640,64);c.font=fnt(P1,z);nw=c.measureText(v).width;tx(v,540,980,P1,CR,z);diamond(540-nw/2-42,962);diamond(540+nw/2+42,962)}
  c.save();c.translate(0,-4);rr(56,1030,365,140,10);c.fillStyle='#2a0610';c.fill();c.lineWidth=3;c.strokeStyle=GD;c.stroke();
  c.strokeStyle=GD;c.lineWidth=3;c.beginPath();c.moveTo(92,1100);c.bezierCurveTo(72,1080,78,1060,92,1060);c.bezierCurveTo(106,1060,112,1080,92,1100);c.stroke();c.beginPath();c.arc(92,1075,5,0,7);c.stroke();
  tx('PARC BABA TRAORÉ',124,1086,B1,GD,28,282,'left');tx('Bobo-Dioulasso',124,1136,O2,'#fff',30,282,'left');
  rr(435,1030,281,140,10);c.fillStyle='#111';c.fill();
  c.strokeStyle='#fff';c.lineWidth=3;rr(462,1054,34,32,5);c.stroke();c.beginPath();c.moveTo(462,1065);c.lineTo(496,1065);c.moveTo(472,1048);c.lineTo(472,1058);c.moveTo(486,1048);c.lineTo(486,1058);c.stroke();
  tx('11 DÉC 2026',508,1082,B1,'#fff',29,196,'left');tx('8h – 17h',462,1136,O1,GD,34,240,'left');
  rr(729,1030,295,140,10);c.fillStyle=GD;c.fill();
  tx('Restauration incluse !!!',753,1082,O1,'#2a0610',24,250,'left');tx('Prévente : 2 000 F',753,1132,O2,'#2a0610',31,250,'left');c.restore();
  sp('Infos & billets · +226 64 85 79 62',1226,O2,CR,29,3);
  tx('✝ À la gloire de Jésus-Christ',540,1268,P1,'rgba(255,247,230,.88)',26,600)}
 function ready(){return d.fonts?Promise.all([d.fonts.load('52px Bungee'),d.fonts.load("italic 500 40px 'Playfair Display'"),d.fonts.load('700 40px Outfit'),d.fonts.load('600 40px Outfit')]).catch(function(){}):Promise.resolve()}
 logo.onload=draw;logo.src=(window.PI&&PI.logo)||$('nav img').src;
 var di=d.querySelector('img[alt="Groupe en tenues faso dan fani"]');dph.onload=function(){if(!ph){reframe()}draw()};if(window.PI)dph.src=PI.group;else if(di)dph.src=di.src;
 draw();
 nm.oninput=draw;
 $('#pp').onchange=function(){var fl=this.files[0];if(!fl){ph=null;$('#pfr').hidden=true;cv.classList.remove('edit');reframe();draw();return}var im=new Image();im.onload=function(){ph=im;reframe();$('#pfr').hidden=false;cv.classList.add('edit');draw()};im.src=URL.createObjectURL(fl)};
 $$('.pc').forEach(function(b){b.onclick=function(){kind=b.dataset.f;$$('.pc').forEach(function(x){x.classList.toggle('on',x===b)});reframe();draw()}});
 sl.oninput=function(){var l=lim();setK(l.min*Math.pow(l.max/l.min,sl.value/100));draw()};
 $('#pall').onclick=function(){var l=lim();setK(l.min/.9*.98);st.fx=st.fy=.5;clampF();sync();draw()};
 $('#prs').onclick=function(){reframe();draw()};
 /* glisser pour déplacer, pincer ou molette pour zoomer */
 var pts={},d0=0,k0=0,dr=null;
 function dist(){var a=Object.keys(pts).map(function(i){return pts[i]});return Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])}
 cv.addEventListener('pointerdown',function(e){if(!ph)return;cv.setPointerCapture(e.pointerId);pts[e.pointerId]=[e.clientX,e.clientY];if(Object.keys(pts).length===2){d0=dist();k0=st.k}else dr={x:e.clientX,y:e.clientY,fx:st.fx,fy:st.fy}});
 cv.addEventListener('pointermove',function(e){if(!pts[e.pointerId])return;pts[e.pointerId]=[e.clientX,e.clientY];
  if(Object.keys(pts).length===2){setK(k0*dist()/d0)}
  else if(dr){var s=W/cv.getBoundingClientRect().width,l=lim();st.fx=dr.fx-(e.clientX-dr.x)*s/(l.iw*st.k);st.fy=dr.fy-(e.clientY-dr.y)*s/(l.ih*st.k);clampF()}
  draw()});
 function up(e){delete pts[e.pointerId];dr=null}
 cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 cv.addEventListener('wheel',function(e){if(!ph)return;e.preventDefault();setK(st.k*(e.deltaY<0?1.08:.93));draw()},{passive:false});
 function msg(t){$('#pmsg').textContent=t}
 function blob(cb){try{cv.toBlob(cb,'image/png')}catch(e){msg('Impossible de créer l’image ici. Ouvrez le site depuis son adresse en ligne.')}}
 function open_(o){op=o||null;pm.classList.add('on');pm.setAttribute('aria-hidden','false');B.classList.add('pl');ready().then(draw);setTimeout(function(){nm.focus()},80)}
 function close_(){pm.classList.remove('on');pm.setAttribute('aria-hidden','true');B.classList.remove('pl');if(op)op.focus()}
 $$('[data-open=poster]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open_(b)})});
 $('.px').onclick=close_;pm.onclick=function(e){if(e.target===pm)close_()};
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&pm.classList.contains('on'))close_()});
 function slug(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
 function save(b,name){
  var p=(window.claude&&window.claude.use)?window.claude.use('downloads'):Promise.resolve(null);
  return Promise.resolve(p).catch(function(){return null}).then(function(dl){
   if(dl)return dl.save({filename:name,data:b}).then(function(){msg('Affiche enregistrée.')},function(e){if(!e||e.code!=='declined')msg('Enregistrement impossible ici. Ouvrez le site dans votre navigateur.')});
   var a=d.createElement('a');a.href=URL.createObjectURL(b);a.download=name;d.body.appendChild(a);a.click();a.remove();msg('Affiche téléchargée.')})}
 $('#pd').onclick=function(){draw();blob(function(b){if(b)save(b,'affiche-j-y-serai'+(slug(nm.value)?'-'+slug(nm.value):'')+'.png')})};
 $('#ps').onclick=function(){draw();blob(function(b){if(!b)return;var f=new File([b],'affiche-j-y-serai.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:'J’y serai !',text:'J’y serai au Brunch des Disciples, le 11 décembre 2026 au Parc Baba Traoré.'}).catch(function(){});
  else msg('Le partage direct n’est pas disponible ici : téléchargez l’affiche puis partagez-la.')})};
 $('#fab').onclick=function(){open_($('#fab'))}});

tr(hero);
try{intro()}catch(e){B.classList.add('go');B.classList.remove('lock');var iv=$('#intro');if(iv)iv.remove();if(window.console)console.error(e)}
})();
