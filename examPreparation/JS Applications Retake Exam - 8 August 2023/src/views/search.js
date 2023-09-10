import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchMotorcycles } from "../data/motorcycles.js";
import { createSubmitHandler } from "../util.js";

const searchTemplate = (motorcycles,onSearch) => 
html `
 <section id="search">

<div class="form">
  <h4>Search</h4>
  <form @submit=${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
${motorcycles!==undefined ? html `<div class="search-result">
${motorcycles.length==0? html `<h2 class="no-avaliable">No result.</h2>`: motorcycles.map(motorcycleCard)}
</div>`:nothing}
   </section>`

  const motorcycleCard=(motorcycle)=>html`<div class="motorcycle">
  <img src=${motorcycle.imageUrl} alt="example1" />
  <h3 class="model">${motorcycle.model}</h3>
    <a class="details-btn" href="/catalog/${motorcycle._id}">More Info</a>
</div>`

export async function searchPage(ctx) {
    let motorcycles;
      ctx.render(searchTemplate(motorcycles,createSubmitHandler(onSearch)))
     async function onSearch({search}){
        debugger
        if([search].some(field=>field=='')){
            return alert('All fields are required')
        }
        motorcycles=await searchMotorcycles(search);
        ctx.render(searchTemplate(motorcycles,createSubmitHandler(onSearch)))
     }

  }