import{j as t,L as _,a as n,r as u}from"./index-ff441d7f.js";const m="_linkButton_tfh0u_1",k="_clikclik_tfh0u_5",g="_klavaogr_tfh0u_5",h="_documentation_tfh0u_5",e={linkButton:m,clikclik:k,klavaogr:g,documentation:h},o=({children:r,link:l,styleSheet:c})=>{const d=()=>{if(c==="documentation")return e.documentation;if(c==="klavaogr")return e.klavaogr;if(c==="clikclik")return e.clikclik};return t(_,{to:l,className:e.linkButton,children:t("button",{className:d(),children:r})})},p="_documentationSection_m3obe_1",f="_description_icon_m3obe_8",i={documentationSection:p,description_icon:f},v="/assets/keyboard-ad890f14.svg",S="/assets/c-square-ca419075.svg",y="/assets/window-efa14eca.svg";function N(){return n("div",{className:i.documentationSection,children:[t("img",{src:y,alt:"",className:i.description_icon}),n(o,{link:"/klavaogr",styleSheet:"klavaogr",children:[t("img",{src:v,alt:"keykey"}),t("p",{children:"Klavaogr"})]}),n(o,{link:"/clikclik",styleSheet:"clikclik",children:[t("img",{src:S,alt:"clikclik"}),t("p",{children:"ClikClik"})]})]})}const P="_documentationSection_1slhe_1",w="_description_icon_1slhe_8",s={documentationSection:P,description_icon:w},b="/assets/file-earmark-text-989f1386.svg";function x(){return n("div",{className:s.documentationSection,children:[t("img",{src:b,alt:"docImg",className:s.description_icon}),t(o,{link:"/documentationRU",styleSheet:"documentation",children:"Русский"}),t(o,{link:"/documentationENG",styleSheet:"documentation",children:"English"})]})}const B="_startPage__wrapper_qh47f_1",I="_startPage_qh47f_1",a={startPage__wrapper:B,startPage:I},q=()=>(u.useEffect(()=>{document.title="Klavaogr",document.querySelector("html").style.backgroundColor="#dddddd"},[]),t("div",{className:a.startPage,children:n("div",{className:a.startPage__wrapper,children:[t(x,{}),t(N,{})]})}));export{q as default};
