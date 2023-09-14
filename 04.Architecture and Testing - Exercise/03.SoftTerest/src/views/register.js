import { register } from "../api/user.js";

const section= document.getElementById('registerView');
const form=section.querySelector('form');
form.addEventListener('submit',onSubmit);

let ctx=null;
export function showRegister(context){
    ctx=context;
context.showSection(section)
}

async function onSubmit(e){
    e.preventDefault();
    const formData=new FormData(form);
    const email=formData.get('email');
    const password=formData.get('password');
    const repeatPassword=formData.get('repeatPassword');
    if(password !==repeatPassword){
        alert('Passwords don"t match');
    }

    await register(email,password);
    ctx.updateNavigate();
    ctx.goTo('/catalog');
}
