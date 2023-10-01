import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as api from '../api/auth.js'

let context=null;
export async function registerPage(ctx){
    debugger
    context=ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        const formData=new FormData(e.target)
        const {email, userName, password, repass}= Object.fromEntries(formData.entries());
    
        if(!email || !userName || !password || !repass){
            ctx.render(registerTemplate(onSubmit, 'All fields are required'));
        }
        if(password !==repass){
            ctx.render(registerTemplate(onSubmit, 'Password and repassword are not the same'));
        }
         await api.register(email,userName,password);
         context.updateNav();
         context.page.redirect('/');
    }
}

async function registerTemplate(handler,errorMessage){
    return html `<section id="register">
<article class="narrow">
    <header class="pad-med">
        <h1>Register</h1>
    </header>
    <form id="register-form" class="main-form pad-large">
        ${ errorMessage? html`<div class="error">Error message.</div>`:nothing}
        <label>E-mail: <input type="text" name="email"></label>
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="repass"></label>
        <input class="action cta" type="submit" value="Create Account">
    </form @submit=${handler}>
    <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
    </footer>
</article>
</section>`
}

