import {html,render} from '../node_modules/lit-html/lit-html.js';
const url='http://localhost:3030/jsonstore/advanced/dropdown';
const root=document.getElementById('menu');
const form=document.querySelector('form');
form.addEventListener('submit',addItem);

onLoadContent();
async function onLoadContent(){
const response= await fetch(url);
const data=await response.json();
const towns=Object.values(data).map(x=>createOptionTemplate(x));
render(towns,root);
}

function createOptionTemplate(town){
    return html `
    <option value = "${town._id}">${town.text}</option>;
    `
}

async function addItem(e) {
e.preventDefault();
const value=document.getElementById('itemText').value;
if(value){
const response= await fetch(url,{
    method:"Post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({text:value})
});
}
form.reset();
onLoadContent();
}
