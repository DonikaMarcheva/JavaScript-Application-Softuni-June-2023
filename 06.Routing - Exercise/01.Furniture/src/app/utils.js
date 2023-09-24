import { render } from "../../node_modules/lit-html/lit-html.js";

const root=document.querySelector('.container');

export function renderMiddleware(ctx,next){
    ctx.render=(content)=>render(content,root);
    ctx.updateNav=updateNav;
    next();
}

export function updateNav(){
    const userDiv=document.getElementById('user');
    const guestDiv=document.getElementById('guest');
    const userData=JSON.parse(sessionStorage.getItem('userData'));
    if(userData){
        userDiv.style.display='inline-block';
        guestDiv.style.display='none';
    }else{
        userDiv.style.display='none';
        guestDiv.style.display='inline-block';
    }
}