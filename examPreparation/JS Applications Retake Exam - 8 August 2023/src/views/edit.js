import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateMotorcycles } from "../data/motorcycles.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (motorcycle,onEdit) => html`
  <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form @submit=${onEdit} class="edit-form">
                <input
                  type="text"
                  name="model"
                  .value=${motorcycle.model}
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  .value=${motorcycle.imageUrl}
                  id="moto-image"
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                .value=${motorcycle.year}
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              .value=${motorcycle.mileage}
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              .value=${motorcycle.contact}
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                .value=${motorcycle.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`
export async function editPage(ctx) {
  
    const id=ctx.params.id;
    const motorcycle=await getById(id);
    ctx.render(editTemplate(motorcycle,createSubmitHandler(onEdit)));
    async function onEdit({
        model,
        imageUrl,
        year,
        mileage,
        contact,
        about    
    }){
        if([model, imageUrl, year, mileage, contact, about].some(field=>field=='')){
            return alert('All fields are required')
        }
        await updateMotorcycles(id,{
            model,
            imageUrl,
            year,
            mileage,
            contact,
            about
        })
        ctx.page.redirect('/catalog/'+id);
    }
}