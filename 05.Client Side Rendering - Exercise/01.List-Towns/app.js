import {html,render} from '../node_modules/lit-html/lit-html.js'

const form=document.querySelector('form');
form.addEventListener('submit',onSubmit);
const root=document.getElementById('root'); 
function onSubmit(e){
e.preventDefault();
const formData = new FormData(form);
const towns= formData.get('towns');
const townsArr=towns.split(', ');
renderTowns(townsArr);
form.reset();
} 

function renderTowns(data){
    const result=createTownsList(data);
    render(result,root);
}

function createTownsList(data){
  const ul = html `
  <ul>
    ${data.map(el => html `<li>${el}</li>`)}
  </ul>
  `
  return ul;
}