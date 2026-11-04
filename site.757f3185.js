(function(){
  var d=document,de=d.documentElement;
  // Mobile drawer
  var burger=d.querySelector('.burger'),drawer=d.querySelector('.mob-drawer'),ov=d.querySelector('.mob-overlay');
  function setDrawer(open){
    if(!drawer)return;
    drawer.classList.toggle('open',open);ov.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    drawer.setAttribute('aria-hidden',open?'false':'true');
    de.style.overflow=open?'hidden':'';
    if(open){var c=drawer.querySelector('.mob-close');if(c)c.focus();}else{burger.focus();}
  }
  if(burger&&drawer){
    burger.addEventListener('click',function(){setDrawer(true)});
    ov.addEventListener('click',function(){setDrawer(false)});
    drawer.querySelector('.mob-close').addEventListener('click',function(){setDrawer(false)});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.classList.contains('open'))setDrawer(false)});
    window.matchMedia('(min-width:769px)').addEventListener('change',function(m){if(m.matches&&drawer.classList.contains('open'))setDrawer(false)});
  }
  // Desktop dropdown keyboard support
  d.querySelectorAll('.nav-links button.dd').forEach(function(b){
    b.addEventListener('click',function(){
      var m=b.nextElementSibling,open=m.style.display==='block';
      d.querySelectorAll('.dd-menu').forEach(function(x){x.style.display=''});
      b.setAttribute('aria-expanded',open?'false':'true');
      if(!open)m.style.display='block';
    });
  });
  d.addEventListener('click',function(e){
    if(!e.target.closest('.nav-links')){d.querySelectorAll('.dd-menu').forEach(function(x){x.style.display=''});}
  });
  // FAQ accordion (max-height toggle)
  d.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var a=q.nextElementSibling,open=q.getAttribute('aria-expanded')==='true';
      q.setAttribute('aria-expanded',open?'false':'true');
      a.style.maxHeight=open?'0px':a.scrollHeight+'px';
    });
  });
  window.addEventListener('resize',function(){
    d.querySelectorAll('.faq-q[aria-expanded=true]').forEach(function(q){q.nextElementSibling.style.maxHeight=q.nextElementSibling.scrollHeight+'px'});
  });
  // Tabs with ARIA roles and arrow keys
  d.querySelectorAll('[data-tabs]').forEach(function(root){
    var tabs=[].slice.call(root.querySelectorAll('[role=tab]')),panels=[].slice.call(root.querySelectorAll('[role=tabpanel]'));
    function sel(i,focus){
      tabs.forEach(function(t,k){
        var on=k===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;
        panels[k].hidden=!on;
      });
      if(focus)tabs[i].focus();
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){sel(i,false)});
      t.addEventListener('keydown',function(e){
        var n=null;
        if(e.key==='ArrowRight')n=(i+1)%tabs.length;
        else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;
        else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;
        if(n!==null){e.preventDefault();sel(n,true)}
      });
    });
    sel(0,false);
  });
})();
