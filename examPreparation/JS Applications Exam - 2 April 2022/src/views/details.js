import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { donate, getDonations, getOwnDonation } from "../data/donations.js";
import { deletePetCard, getById } from "../data/pets.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet,donations, hasUser,isOwner,canDonate,onDelete,onDonate) => 
html `<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${donations*100}$</h4>
        </div>
       ${petControls(pet, hasUser,isOwner,canDonate,onDelete,onDonate)}
    </div>
</div>
</section>`

 function petControls(pet, hasUser,isOwner,canDonate,onDelete,onDonate){
  if(hasUser==false){
    return nothing;
  }
  if(canDonate){
    return html`<div class="actionBtn">
    <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
    </div>`;
  }
  if(isOwner){
    return html`<div class="actionBtn">
    <a href="/catalog/${pet._id}/edit" class="edit">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
  </div>`
  }
  }
  

// THIS IS THE SOLUTION WITH BONUS

export async function detailsPage(ctx) {
  const id=ctx.params.id;
  const userData=getUserData();
  const ownerId=userData._id;

  const requests=[
    getById(id),
    getDonations(id)
  ]
  
  let hasUser=false;
  if(userData){
    hasUser=true;
    requests.push(getOwnDonation(id, ownerId));
  }
  const [pet, donations,hasDonation]=await Promise.all(requests);

  const isOwner=userData && ownerId==pet._ownerId;
  const canDonate=!isOwner && hasDonation===0;
  
    ctx.render(detailsTemplate(pet,donations, hasUser,isOwner,canDonate,onDelete,onDonate))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the offer?');
      if (choice){
        await deletePetCard(id);
        ctx.page.redirect('/catalog');
      }
    }
    async function onDonate(){
      await donate(id);
      ctx.page.redirect('/catalog/'+id)
    }
}
// ===== THIS IS THE SOLUTION WITHOUT BONUS==========

// const detailsTemplate = (pet, onDelete) => html `<section id="detailsPage">
// <div class="details">
//     <div class="animalPic">
//         <img src=${pet.image}>
//     </div>
//     <div>
//         <div class="animalInfo">
//             <h1>Name: ${pet.name}</h1>
//             <h3>Breed: ${pet.breed}</h3>
//             <h4>Age: ${pet.age}</h4>
//             <h4>Weight: ${pet.weight}</h4>
//             <h4 class="donation">Donation: 0$</h4>
//         </div>
//         <!-- if there is no registered user, do not display div-->
//         ${pet.canEdit? html`<div class="actionBtn">
//             <!-- Only for registered user and creator of the pets-->
//             <a href="/catalog/${pet._id}/edit" class="edit">Edit</a>
//             <a @click=${onDelete}href="javascript:void(0)" class="remove">Delete</a>
//             <!--(Bonus Part) Only for no creator and user-->
//             <!-- <a href="#" class="donate">Donate</a> -->
//         </div>`:nothing}
        
//     </div>
// </div>
// </section>`

// export async function detailsPage(ctx) {
//     const id=ctx.params.id;
//     const pet=await getById(id);
  
//     const userData=getUserData();
//     if(userData && userData._id==pet._ownerId){
//       pet.canEdit=true;
//     }
  
//       ctx.render(detailsTemplate(pet,onDelete))
  
//       async function onDelete(){
//         const choice= confirm('Are you sure you want to delete the offer?');
//         if (choice){
//           await deletePetCard(id);
//           ctx.page.redirect('/catalog');
//         }
//       }
//   }