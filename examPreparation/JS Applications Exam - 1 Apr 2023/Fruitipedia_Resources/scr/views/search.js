import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchFruits } from "../data/fruits.js";
import { createSubmitHandler } from "../util.js";

const searchTemplate = (fruits,onSearch) => 
html `
 <section id="search">
<div class="form">
  <h2>Search</h2>
  <form @submit=${onSearch} class="search-form">
    <input type="text" name="search" id="search-input"/>
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
${fruits!==undefined ? html `<div class="search-result">
${fruits.length==0? html `<p class="no-result">No result.</p>`: fruits.map(fruitCard)}
</div>`:nothing}
   </section>`

  const fruitCard=(fruit)=>html`<div class="fruit">
  <img src=${fruit.imageUrl} alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="">More Info</a>
</div>
  </div>`

export async function searchPage(ctx) {

    let fruits;
      ctx.render(searchTemplate(fruits,createSubmitHandler(onSearch)))
     async function onSearch({search}){
        
        if([search].some(field=>field=='')){
            return alert('All fields are required')
        }
        fruits=await searchFruits(search);
        ctx.render(searchTemplate(fruits,createSubmitHandler(onSearch)))
     }

  }