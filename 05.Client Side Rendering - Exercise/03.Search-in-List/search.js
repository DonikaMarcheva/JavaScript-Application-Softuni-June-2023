import {html,nothing,render} from '../node_modules/lit-html/lit-html.js'
import {towns} from './towns.js';

const root=document.getElementById('towns');
const resultRoot=document.getElementById('result');
document.querySelector('button').addEventListener('click',search);


updade();

function updade(text){
   const ul=searchTemplate(towns,text);
   render(ul,root);
}

function searchTemplate(towns,match){
   const ul= html `
   <ul> 
      ${towns.map(town=> createLiTemplate(town,match))}
   </ul>
   `
   return ul;
   }

   function createLiTemplate(town,match){
      const li= html `<li class=  "${(match && town.includes(match))? "active":""}">
         ${town}
         </li>`;
         if(li.className==="active"){
         }
         return li;
   }

function search() {
const textNode=document.getElementById('searchText');
const text=textNode.value;
updade(text);
updadeCount();
textNode.value="";
}

function updadeCount(){
   const count=document.querySelectorAll('.active').length;
   const countElement= html `<p>${count} matches found</p>`;
   render(countElement,resultRoot);
}
