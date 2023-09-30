import { render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

const root=document.querySelector('main');

export function renderMiddleware(ctx,next){
    ctx.render=(content)=>render(content,root);
    ctx.updateNav=updateNav;
    next();
}

export function updateNav(){
    const userDivs=document.querySelectorAll('nav>a.user');
    const guestDivs=document.querySelectorAll('nav>a.guest');
    const userData=sessionStorage.getItem('userId');
    if(userData !=null){
        userDivs.forEach(div => {
            div.style.display='inline-block';
        });
        guestDivs.forEach(div=>{
            div.style.display='none';
        })
    }else{
        userDivs.forEach(div => {
            div.style.display='none';
        });
        guestDivs.forEach(div=>{
            div.style.display='inline-block';
        })
    }
}