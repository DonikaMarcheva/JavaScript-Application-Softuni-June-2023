import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteFruit, getById } from "../data/fruits.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit,onDelete) => html `
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${fruit.imageUrl} alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${fruit.canEdit?html`    
            <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`:nothing}            
          </div>
            </div>
        </div>
      </section>
`
// ===== THIS IS THE SOLUTION WITHOUT BONUS==========

export async function detailsPage(ctx) {
  const id=ctx.params.id;
  const fruit=await getById(id);

  const userData=getUserData();
  if(userData && userData._id==fruit._ownerId){
    fruit.canEdit=true;
  }

    ctx.render(detailsTemplate(fruit,onDelete))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the offer?');
      if (choice){
        await deleteFruit(id);
        ctx.page.redirect('/catalog');
      }
    }
}