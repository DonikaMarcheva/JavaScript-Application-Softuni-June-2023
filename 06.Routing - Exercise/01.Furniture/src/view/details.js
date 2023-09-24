import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteItemById, getItemById } from "../api/data.js";

let context=null;
export async function detailsView(ctx){
    context=ctx;
    const id=ctx.params.id;
    const itemDetails= await getItemById(id);
    const userData=JSON.parse(sessionStorage.getItem('userData'));
    const isOwner=userData && userData._id===itemDetails._ownerId;

    ctx.render(detailsTemplate(itemDetails, isOwner));
}
async function deleteItem(e){
    // e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
    await deleteItemById(context.params.id);
    context.page.redirect('/');
    }
}
function detailsTemplate(item, isOwner){
    return html `
     <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=../.${item.img}/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isOwner? 
                    html `<div>
                    <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                    <a href=”#” @click=${deleteItem} class="btn btn-red">Delete</a>
                </div>`
                : nothing}                
            </div>
        </div>`
}

