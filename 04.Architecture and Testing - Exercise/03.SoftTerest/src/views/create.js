import { createIdea } from "../api/data.js";

const section= document.getElementById('createView');
const form=section.querySelector('form');
form.addEventListener('submit',onSubmit);

let ctx=null;
export function showCreate(context){
    ctx=context;
context.showSection(section)
}
async function onSubmit(e){
    e.preventDefault();
    const formData=new FormData(form);
    const title=formData.get('title');
    const description=formData.get('description');
    const imageURL=formData.get('imageURL');
    if(title.length<6 || description.length<10 || imageURL.length<5){
        alert('Title must be at least 6 characters, description must be at least 6 characters and imageURL must be at least 5 characters');
    }

    await createIdea({title,description, img: imageURL});
    form.reset();
    ctx.goTo('/catalog');
}