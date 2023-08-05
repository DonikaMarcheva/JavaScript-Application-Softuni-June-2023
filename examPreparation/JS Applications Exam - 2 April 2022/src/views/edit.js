import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updatePetCard } from "../data/pets.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (pet,onEdit) => html`<section id="editPage">
<form @submit=${onEdit} class="editForm">
    <img src="./images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" .value="${pet.name}" id="name" type="text" value="Max">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" .value="${pet.breed}" id="breed" type="text" value="Shiba Inu">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" .value="${pet.age}" id="age" type="text" value="2 years">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" .value="${pet.weight}" id="weight" type="text" value="5kg">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" .value="${pet.image}" id="image" type="text" value="./image/dog.jpeg">
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`

export async function editPage(ctx) {
    const id=ctx.params.id;
    const pet=await getById(id);
    ctx.render(editTemplate(pet,createSubmitHandler(onEdit)));
    async function onEdit({
        name,
        breed,
        age,
        weight,
        image           
    }){
        if([name, breed, age, weight, image].some(field=>field=='')){
            return alert('All fields are required')
        }
        await updatePetCard(id,{
            name,
            breed,
            age,
            weight,
            image  
        })
        ctx.page.redirect('/catalog/'+id);
    }
}
