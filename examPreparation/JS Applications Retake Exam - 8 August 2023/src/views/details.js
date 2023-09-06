import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteMotorcycles, getById } from "../data/motorcycles.js";
import { getUserData } from "../util.js";

const detailsTemplate = (motorcycle,onDelete) => html `
  <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${motorcycle.imageUrl} alt="example1" />
            <p id="details-title">${motorcycle.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${motorcycle.year}</p>
                <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
                <p class="contact">Contact Number: ${motorcycle.contact}</p>
                   <p id = "motorcycle-description">${motorcycle.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${motorcycle.canEdit?html`    
            <a href="/catalog/${motorcycle._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`:nothing}            
          </div>
            </div>
        </div>
      </section>
`
export async function detailsPage(ctx) {
  const id=ctx.params.id;
  const motorcycle=await getById(id);

  const userData=getUserData();
  if(userData && userData._id==motorcycle._ownerId){
    motorcycle.canEdit=true;
  }

    ctx.render(detailsTemplate(motorcycle,onDelete))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the motorcycle?');
      if (choice){
        await deleteMotorcycles(id);
        ctx.page.redirect('/catalog');
      }
    }
}