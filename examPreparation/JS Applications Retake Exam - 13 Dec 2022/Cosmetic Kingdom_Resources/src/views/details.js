import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { buyProduct, purchasesById, purchasesByIdAndUser } from "../data/buy.js";
import { deleteProduct, getAllProducts, getById } from "../data/products.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product,onDelete,onPurchase) => 
html `<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${product.imageUrl} alt="example1" />
  <p id="details-title">${product.name}</p>
  <p id="details-category">
    Category: <span id="categories">${product.category}</span>
  </p>
  <p id="details-price">
    Price: <span id="price-number">${product.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">${product.purchases}</span> times.</h4>
      <span>${product.description}</span
      >
    </div>
  </div>
  ${product.canEdit || product.canBuy? html `
  <div id="action-buttons">
    ${product.canEdit? html` <a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>`:nothing}
             `:nothing}
             ${product.canBuy? html`<a @click=${onPurchase}href="javascript:void(0)" id="buy-btn">Buy</a>`:nothing}
             </div>
          <!-- </div> -->
        </section>`
//===solution with BONUS====
export async function detailsPage(ctx) {
  const id=ctx.params.id;

  const requests=[getById(id), purchasesById(id)]
    
    const userData=getUserData();

  if(userData){
    requests.push(purchasesByIdAndUser(id,userData._id))
  }

  const [product,purchases,hasBought]= await Promise.all(requests);
  product.purchases=purchases;

  if(userData){
    //next conditions returns true or false
    product.canEdit=userData._id==product._ownerId;
    product.canBuy=product.canEdit==false && hasBought==0;
  } 
    
    ctx.render(detailsTemplate(product,onDelete,onPurchase))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the offer?');
      if (choice){
        await deleteOffer(id);
        ctx.page.redirect('/catalog');
      }
    }

    async function onPurchase(){
      debugger
      await buyProduct(id);
      ctx.page.redirect('/catalog/'+id)
    }
}
 // ===== THIS IS THE SOLUTION WITHOUT BONUS==========

// export async function detailsPage(ctx) {
//   const id=ctx.params.id;
//   const product=await getById(id);

//   const userData=getUserData();
//   if(userData && userData._id==product._ownerId){
//     product.canEdit=true;
//   }

//     ctx.render(detailsTemplate(product,onDelete))

//     async function onDelete(){
//       const choice= confirm('Are you sure you want to delete the offer?');
//       if (choice){
//         await deleteProduct(id);
//         ctx.page.redirect('/catalog');
//       }
//     }
// }