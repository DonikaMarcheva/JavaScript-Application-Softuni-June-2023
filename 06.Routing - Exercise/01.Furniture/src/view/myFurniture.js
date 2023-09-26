import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyItems } from "../api/data.js";

export async function myFurnitureView(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const id = userData._id;
    const items = await getMyItems(id);
    
    ctx.render(myItemsTemp(items))
}
function myItemsTemp(data) {
    return html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
        ${Object.values(data).map(item=>createItemTemplate(item))}
        </div>`
}
function createItemTemplate(itemDetails){
    return html`
    <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${itemDetails.img}" />
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>${itemDetails.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${itemDetails._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
                    </div>
                </div>
            </div>`
}