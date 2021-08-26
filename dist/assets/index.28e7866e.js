var e=Object.defineProperty,t=Object.defineProperties,l=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,i=(t,l,a)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[l]=a,o=(e,t)=>{for(var l in t||(t={}))r.call(t,l)&&i(e,l,t[l]);if(a)for(var l of a(t))n.call(t,l)&&i(e,l,t[l]);return e},c=(e,a)=>t(e,l(a));import{u as s,U as u,F as m,b as p,D as d,c as E,E as g,I as b,d as f,e as x,g as v,f as h,h as y,M as w,i as k,j as C,k as P,l as $,m as B,n as L,o as N,p as M,T as O,B as S,q as T,r as j,s as z,t as F,v as I,w as D,x as q,L as W,H as R,y as Y,C as H,z as Z,G as _,J as G,K,N as Q,O as U,Q as V,R as J,W as X,V as A,X as ee,Y as te,Z as le}from"./index.0f259b86.js";import{v as ae,b as re,e as ne,q as ie,n as oe,aN as ce,R as se,s as ue,p as me,aO as pe,aP as de,r as Ee,C as ge,w as be,a4 as fe,aQ as xe,aR as ve,ap as he,Z as ye,aS as we,aT as ke,aa as Ce,ab as Pe,aU as $e,ad as Be,ae as Le,a1 as Ne,am as Me,al as Oe,L as Se}from"./vendor.9f1e8ded.js";const Te=e=>{var t=e,{size:l=24,color:i="currentcolor"}=t,c=((e,t)=>{var l={};for(var i in e)r.call(e,i)&&t.indexOf(i)<0&&(l[i]=e[i]);if(null!=e&&a)for(var i of a(e))t.indexOf(i)<0&&n.call(e,i)&&(l[i]=e[i]);return l})(t,["size","color"]);return se.createElement("svg",o({xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:i,viewBox:"0 0 24 22",style:{color:i}},c),se.createElement("path",{d:"M11.0825 1.61573C11.4307 0.812853 12.5693 0.812852 12.9175 1.61573L15.0238 6.47316C15.1687 6.80732 15.4838 7.03626 15.8464 7.07081L21.117 7.57304C21.9882 7.65605 22.34 8.73892 21.684 9.31814L17.7152 12.8224C17.4422 13.0635 17.3218 13.4339 17.401 13.7894L18.5521 18.9573C18.7423 19.8115 17.8212 20.4807 17.0676 20.0358L12.5084 17.3441C12.1948 17.159 11.8052 17.159 11.4916 17.3441L6.93241 20.0358C6.17882 20.4807 5.25768 19.8115 5.44794 18.9573L6.59899 13.7894C6.67817 13.4339 6.55781 13.0635 6.28479 12.8224L2.31599 9.31814C1.66 8.73892 2.01184 7.65605 2.88301 7.57304L8.1536 7.07081C8.51618 7.03626 8.8313 6.80732 8.9762 6.47316L11.0825 1.61573Z",strokeWidth:"2"}))},je=ue.div`
  /* max-width: ${E.large}px; */
`,ze=()=>{const{t:e}=me();return se.createElement(je,null,se.createElement(g,{emptyText:e("comment.empty")}))},Fe=ue.div`
  padding: 24px;
  padding-top: 0;
  display: grid;
  grid-gap: 14px;
`,Ie=ue.button`
  cursor: pointer;
  outline: none;
  display: block;
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-color: ${e=>e.theme.colors.gray1};
  overflow: hidden;
  border: none;
  padding: 0;
  background-color: transparent;
  position: relative;
  text-align: inherit;
  transition: transform 0.1s;
`,De=ue(pe)`
  transition: 0.1s opacity ease;
`,qe=ue(de)`
  transition: 0.1s opacity ease;
`,We=ue.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.15s ease-in-out;
  padding: 17px 20px;
  border-radius: 5px;
  backdrop-filter: saturate(180%) blur(5px);
  color: ${e=>e.theme.widget.collection.addPicture.color};
  & ${De} {
    opacity: 0;
  }
  & ${qe} {
    opacity: 0;
  }
  &:hover {
    & ${De} {
      opacity: 1;
    }
  }
  background: ${e=>Ee(e.theme.widget.collection.addPicture.background,e.isPreview?.2:1)};
  ${e=>e.isCollected?ge`
          border: 2px solid ${e.theme.colors.green};
          background: linear-gradient(
            45deg,
            ${Ee(e.theme.widget.collection.addPicture.background,.2)},
            ${e.theme.colors.green}
          );
          & ${De} {
            opacity: 1;
          }
          &:hover {
            & ${qe} {
              opacity: 1;
            }
            & ${De} {
              opacity: 0;
            }
          }
        `:ge``}
`,Re=ue.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`,Ye=ue.p`
  font-size: 13px;
`,He=ue(b)`
  font-family: 'object-fit:cover';
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  height: 100%;
`,Ze=ue.div`
  position: relative;
  & svg:first-child {
    position: absolute;
  }
`,_e=be((({picture:e})=>{const{t:t}=me(),[l,a]=f("collection"),{isLogin:r,userInfo:n}=s(),[i,o]=re.exports.useState(new Map),[c,{loading:u,data:m}]=fe(x),{key:p,currentCollections:d}=e;re.exports.useEffect((()=>{l&&r&&(o(new Map(d.map((e=>[e.id,e])))),c({variables:{username:n.username}}))}),[l,r]),re.exports.useEffect((()=>{o(new Map(d.map((e=>[e.id,e]))))}),[d]);let E=[];return(null==m?void 0:m.userCollectionsByName)&&(E=m.userCollectionsByName.data.map((e=>{const l=i.has(e.id)?1:0,a=e.preview.slice();return se.createElement(Ie,{key:e.id},a[0]&&se.createElement(He,{src:v(a[0].key,"thumbSmall")}),se.createElement(We,{isCollected:l,isPreview:a[0]?1:0},se.createElement("div",null,se.createElement(Re,null,e.isPrivate&&se.createElement(h,{trigger:"hover",placement:"top",theme:"dark",openDelay:100,content:se.createElement("span",null,t("label.private"))},se.createElement(xe,{style:{marginRight:"6px",strokeWidth:"3px"},size:16})),se.createElement(y,{text:e.name})),se.createElement(Ye,null,se.createElement("span",null,t("label.img_count",{total:e.pictureCount.toString()})))),se.createElement(Ze,null,se.createElement(se.Fragment,null,se.createElement(De,null),se.createElement(qe,null)))))}))),console.log(u,null==m?void 0:m.userCollectionsByName),se.createElement(w,{autoMobile:!1,maxWidth:500,centered:!0,visible:l,onClose:()=>a()},se.createElement(w.Background,{background:v(p,"blur")}),se.createElement(w.Content,null,se.createElement(w.Title,null,"信息"),se.createElement(Fe,null,se.createElement(Ie,null,se.createElement(We,{isCollected:0,isPreview:0},se.createElement("div",null,se.createElement(Re,{style:{marginBottom:0}},se.createElement(ve,{style:{marginRight:"12px"}}),se.createElement("span",null,"添加"))))),E)))}));var Ge={exports:{}};
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */Ge.exports=function(e,t){if("string"==typeof e)return Xe(e);if("number"==typeof e)return Je(e,t);return null},Ge.exports.format=Je,Ge.exports.parse=Xe;var Ke=/\B(?=(\d{3})+(?!\d))/g,Qe=/(?:\.0*|(\.[^0]+)0+)$/,Ue={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},Ve=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function Je(e,t){if(!Number.isFinite(e))return null;var l=Math.abs(e),a=t&&t.thousandsSeparator||"",r=t&&t.unitSeparator||"",n=t&&void 0!==t.decimalPlaces?t.decimalPlaces:2,i=Boolean(t&&t.fixedDecimals),o=t&&t.unit||"";o&&Ue[o.toLowerCase()]||(o=l>=Ue.pb?"PB":l>=Ue.tb?"TB":l>=Ue.gb?"GB":l>=Ue.mb?"MB":l>=Ue.kb?"KB":"B");var c=(e/Ue[o.toLowerCase()]).toFixed(n);return i||(c=c.replace(Qe,"$1")),a&&(c=c.replace(Ke,a)),c+r+o}function Xe(e){if("number"==typeof e&&!isNaN(e))return e;if("string"!=typeof e)return null;var t,l=Ve.exec(e),a="b";return l?(t=parseFloat(l[1]),a=l[4].toLowerCase()):(t=parseInt(e,10),a="b"),Math.floor(Ue[a]*t)}var Ae=Ge.exports;const et=ue.div`
  padding: 24px;
  padding-top: 0;
`,tt=ue.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.secondary};
  margin-bottom: 4px;
`,lt=ue.div`
  font-size: 14px;
`,at=ue.div`
  display: grid;
  height: auto;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 24px;
`,rt=re.exports.memo((({picture:e})=>{const{t:t}=me(),[l,a]=f("exif"),{make:r,model:n,exif:i,width:o,height:c,size:s,key:u}=e,{focalLength:m,aperture:p,exposureTime:d,ISO:E}=i;return se.createElement(w,{autoMobile:!1,maxWidth:500,centered:!0,visible:l,onClose:()=>a()},se.createElement(w.Background,{background:v(u,"blur")}),se.createElement(w.Content,null,se.createElement(w.Title,null,"信息"),se.createElement(et,null,se.createElement(at,null,se.createElement("div",null,se.createElement(tt,null,t("picture.info.make")),se.createElement(lt,null,ne.exports.isNull(r)?"--":r)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.model")),se.createElement(lt,null,ne.exports.isNull(n)?"--":n)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.focalLength")),se.createElement(lt,null,ne.exports.isNull(m)?"--":`${m}mm`)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.aperture")),se.createElement(lt,null,ne.exports.isNull(p)?"--":`f/${p}`)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.exposureTime")),se.createElement(lt,null,ne.exports.isNull(d)?"--":`${d}s`)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.ISO")),se.createElement(lt,null,ne.exports.isNull(E)?"--":E)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.dimensions")),se.createElement(lt,null,`${o} x ${c}`)),se.createElement("div",null,se.createElement(tt,null,t("picture.info.size")),se.createElement(lt,null,Ae(s)))))))})),nt=be((({user:e,createTime:t})=>{const{t:l}=me(),{userInfo:a}=s(),[r,n]=function(){const{userInfo:e}=s(),{query:t,mutate:l}=ae(),[a,r]=re.exports.useState(!1);return[re.exports.useCallback(ne.exports.throttle((async n=>{if(!e)return void ie.error("请登录！");if(a)return;let i=m;n.isFollowing>0&&(i=p),r(!0);try{await l({mutation:i,variables:{input:{userId:n.id}}}),await t({query:u,variables:{username:n.username},fetchPolicy:"network-only"}),r(!1)}catch(o){ie.error(o.message),r(!1)}})),[e]),a]}();return se.createElement(k,null,se.createElement(C,null,se.createElement(P,null,se.createElement($,{src:e.avatar,size:44}),se.createElement(B,null,se.createElement(L,{style:{marginBottom:"4px"},to:`/@${e.username}`},se.createElement(N,null,se.createElement(y,{text:e.fullName}))),se.createElement(M,null,se.createElement(h,{openDelay:100,trigger:"hover",placement:"top",theme:"dark",content:se.createElement("span",null,he(t).format("YYYY-MM-DD HH:mm:ss"))},se.createElement(O,null,he(t).fromNow())))),a&&se.createElement("div",{css:"\n                margin-left: 12px;\n                display: flex;\n                align-items: center;\n              "},se.createElement(S,{loading:n,onClick:()=>r(e)},e.isFollowing?l("label.followed"):l("label.follow"))))))})),it=({picture:e})=>{const t=e.width/e.height,l=100*(1-(e.width-e.height)/e.width)||100;return se.createElement(T,null,se.createElement(j,null,se.createElement(z,{num:t},se.createElement(F,{height:l,background:e.color},se.createElement(I,null,se.createElement(b,{src:v(e.key,"large"),blurhash:e.blurhash,lazyload:!1}))))))},ot=be((({picture:e})=>{const{colors:t}=ye(),{t:l}=me(),{isLogin:a}=s(),[,,r]=f("collection"),[,,n]=f("exif"),[,,i]=f("setting"),{userInfo:u}=s(),[m,p]=D(1.05,.92),d=re.exports.useMemo((()=>u&&u.id.toString()===e.user.id.toString()||!1),[e.user.id,u]),E=re.exports.useMemo((()=>!!(e&&e.currentCollections.length>0)),[]);return se.createElement(q,null,se.createElement("div",null,se.createElement(W,c(o({},p()),{style:{transform:m.transform}}),se.createElement(R,{size:20,islike:e.isLike?1:0}),se.createElement("p",null,e.likedCount))),se.createElement("div",{css:"\n          display: grid;\n          gap: 8px;\n          grid-auto-flow: column;\n        "},se.createElement(Y,{onClick:()=>{if(!a)return ie.error(l("error.login"));r()},popover:l("picture.label.collection")},se.createElement(Te,{style:{stroke:E?t.green:t.secondary,fill:E?t.green:"transparent"}})),se.createElement(Y,{onClick:()=>n(),popover:l("picture.label.detail")},se.createElement(we,null)),d&&se.createElement(Y,{onClick:()=>i(),popover:l("picture.label.setting")},se.createElement(ke,null))))}));ue.div`
  padding: 24px;
`;const ct=ue.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 18px;
`,st=({picture:e})=>{const t=ae(),{colors:l}=ye(),[a,r]=re.exports.useState(!1),{key:n,id:i}=e,[s,u]=f("setting"),{t:m}=me(),[p,E]=function(e="/"){let t=oe();const[l,{loading:a}]=ce(d);return[re.exports.useCallback((async a=>{try{await l({variables:{id:a}}),ie.success("删除成功"),t(e,{replace:!0})}catch(r){ie.error(r.message)}}),[e,l,t]),a]}(),[g,b]=ce(U),x=re.exports.useCallback((async e=>{const{data:l}=await g({variables:{id:i,data:e}});t.writeFragment({id:`Picture:${i}`,fragment:$e`
          fragment PictureBaseFragment on Picture {
            title
            bio
            isPrivate
          }
        `,data:o({},ne.exports.omit(l.updatePicture,"tags"))}),t.writeFragment({id:`Picture:${i}`,fragment:$e`
          fragment PictureDetailFragment on Picture {
            tags
          }
        `,data:{tags:l.updatePicture.tags}}),ie.success(m("picture.edit.success"))}),[t,i,m,g]),h=re.exports.useCallback((()=>p(i)),[p,i]);return se.createElement(w,{maxWidth:560,centered:!0,visible:s,onClose:()=>u()},se.createElement(w.Background,{background:v(n,"blur")}),se.createElement(w.Content,null,se.createElement(w.Title,null,m("picture.edit.title")),se.createElement(H,null,se.createElement(Be,{initialValues:c(o({},ne.exports.pick(e,["title","bio","isPrivate"])),{tags:e.tags.map((e=>e.name))}),onSubmit:x,validationSchema:Ce().shape({title:Pe().required("请输入标题")})},se.createElement(Le,null,se.createElement(Z,{required:!0,name:"title",label:m("label.picture_title")}),se.createElement(_,{name:"bio",label:m("label.picture_bio")}),se.createElement(G,{name:"tags"}),se.createElement(K,{name:"isPrivate",label:m("label.private"),bio:m("picture.label.privateBio")}),se.createElement("div",{style:{height:"12px"}}),se.createElement(ct,null,se.createElement("div",null,se.createElement(Q,{onClick:()=>r(!0)},se.createElement(Ne,{color:l.error}))),se.createElement("div",null,se.createElement(S,{htmlType:"submit"},m("picture.edit.confirm"))))))),se.createElement(w.Confirm,{visible:a,onClose:()=>r(!1),onConfirm:h,confirmText:m("picture.label.delete"),confirmButtonProps:{danger:!0,icon:se.createElement(Ne,{size:16}),loading:E},title:m("picture.label.deleteTitle")})))},ut=be((()=>{const{id:e}=Me(),{loading:t,data:l}=Oe(V,{variables:{id:Number(e)},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"});if(t&&!l||!l)return se.createElement(J,null);const{picture:a}=l,{user:r}=a;return se.createElement(X,null,se.createElement(nt,{user:r,createTime:a.createTime}),se.createElement(it,{picture:a}),se.createElement(H,null,se.createElement(ot,{picture:a}),se.createElement(A,null,se.createElement(y,{text:a.title})),a.bio&&se.createElement(ee,null,se.createElement(y,{text:a.bio})),a.tags.length>0&&se.createElement(te,null,a.tags.map((e=>se.createElement(Se,{to:`/tag/${e.name}`,key:e.id},se.createElement(le,{key:e.id},e.name))))),se.createElement(ze,null)),se.createElement(rt,{picture:a}),se.createElement(st,{picture:a}),se.createElement(_e,{picture:a}))}));export{ut as default};
