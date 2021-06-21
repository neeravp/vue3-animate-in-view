import{defineComponent as e,ref as o,onMounted as t}from"@vue/runtime-core";import{ref as n,computed as s,watch as i,onBeforeUnmount as l,openBlock as r,createBlock as c,renderSlot as a}from"vue";var u={observeElement:function(e,o,t){console.log(e);const n=(e=>function(o){o.forEach((o=>{e(o)}))})(o);new IntersectionObserver(n,t).observe(e)}};let v;var d={detectScrollDirection:function(e){let o=window.pageYOffset,t=!1;v=()=>{const n=window.pageYOffset||document.documentElement.scrollTop;t||(window.requestAnimationFrame((()=>{e(o,n),o=n<=0?0:n,t=!1})),t=!0)},window.addEventListener("scroll",v)},removeEventListener:function(){window.removeEventListener("scroll",v)}};const p=n(!1),f=n("down");let m,w,g;const L=s((()=>{let e="";return"string"==typeof m&&(e=m),"object"==typeof m&&(e="down"===f.value?m.down:m.up),e}));const E=(e,o)=>{f.value=o<e?"up":"down",e=o<=0?0:o},b=e=>{e.isIntersecting?(g.classList.add(L.value),p.value=!0):p.value=!1};var y={apply:function(e,o,t){console.log(e,o,t),m=o,w=t,g=e,u.observeElement(g,b),d.detectScrollDirection(E),i([p,f],((e,o)=>{const[t,n]=e;w||"string"!=typeof m?t?"object"==typeof m&&""!==m.up&&""!==m.down&&(console.log("isBiDirectional"),m=m,"up"===n&&(g.classList.remove(m.down),g.classList.add(L.value)),"down"===n&&(g.classList.remove(m.up),g.classList.add(L.value))):(console.log("Not in view"),g.classList.remove(L.value)):console.log("No Repeat & isDirectionAgnostic: false")}))},cleanup:function(){d.removeEventListener()}},D=e({name:"AnimateInView",props:{threshold:{type:Number,default:10},animation:{type:[String,Object],default:"fadeInSlide"},repeat:{type:Boolean,default:!1}},setup(e){const n=o();return t((()=>{console.log(n.value),y.apply(n.value,e.animation,e.repeat)})),l((()=>y.cleanup())),{target:n}}});const I={class:"transition-all duration-1000",ref:"target"};D.render=function(e,o,t,n,s,i){return r(),c("div",I,[a(e.$slots,"default")],512)},D.__file="src/components/AnimateInView.vue";var O={observeElement:function(e,o,t){console.log(e);const n=(e=>function(o){o.forEach((o=>{e(o)}))})(o);new IntersectionObserver(n,t).observe(e)}};let A;var S={detectScrollDirection:function(e){let o=window.pageYOffset,t=!1;A=()=>{const n=window.pageYOffset||document.documentElement.scrollTop;t||(window.requestAnimationFrame((()=>{e(o,n),o=n<=0?0:n,t=!1})),t=!0)},window.addEventListener("scroll",A)},removeEventListener:function(){window.removeEventListener("scroll",A)}};const j=n(!1),N=n("down");let h,Y,B;const q=s((()=>{let e="";return"string"==typeof h&&(e=h),"object"==typeof h&&(e="down"===N.value?h.down:h.up),e}));const F=(e,o)=>{N.value=o<e?"up":"down",e=o<=0?0:o},R=e=>{e.isIntersecting?(B.classList.add(q.value),j.value=!0):j.value=!1};var T={apply:function(e,o,t){console.log(e,o,t),h=o,Y=t,B=e,O.observeElement(B,R),S.detectScrollDirection(F),i([j,N],((e,o)=>{const[t,n]=e;Y||"string"!=typeof h?t?"object"==typeof h&&""!==h.up&&""!==h.down&&(console.log("isBiDirectional"),h=h,"up"===n&&(B.classList.remove(h.down),B.classList.add(q.value)),"down"===n&&(B.classList.remove(h.up),B.classList.add(q.value))):(console.log("Not in view"),B.classList.remove(q.value)):console.log("No Repeat & isDirectionAgnostic: false")}))},cleanup:function(){S.removeEventListener()}};const V={mounted(e,o){const t=o.value,n=o.modifiers.repeat||!1;T.apply(e,t,n)},beforeUnmount(){T.cleanup()}};var _={install:(e,o)=>{e.directive("animate-inview",V),e.component("animate-in-view",D)}};export default _;
