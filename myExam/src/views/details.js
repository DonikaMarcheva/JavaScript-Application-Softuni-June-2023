import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteFact, getById } from "../data/facts.js";
import { getFacts, getUserFacts, like } from "../data/likes.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fact,onDelete,onLike) => 
html `
     <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${fact.imageUrl} alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${fact.description}</p>
                   <p id ="more-info">${fact.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${fact.likes}</span></h3>

            ${fact.canEdit || fact.canLike? html ` <div id="action-buttons">
              ${fact.canEdit? html` <a href="/catalog/${fact._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`:nothing}
            ${fact.canLike? html `<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`:nothing}          
          </div>`:nothing}
          </div>
        </section>
        `

export async function detailsPage(ctx) {
  const id=ctx.params.id;

  const requests=[getById(id), getFacts(id)]
    
    const userData=getUserData();

  if(userData){
    requests.push(getUserFacts(id,userData._id))
  }

  const [fact,likes,hasLiked]= await Promise.all(requests);
  fact.likes=likes;

  if(userData){
    //next conditions returns true or false
    fact.canEdit=userData._id==fact._ownerId;
    fact.canLike=fact.canEdit==false && hasLiked==0;
  } 
    
    ctx.render(detailsTemplate(fact,onDelete,onLike))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the fact?');
      if (choice){
        await deleteFact(id);
        ctx.page.redirect('/catalog');
      }
    }

    async function onLike(){
      await like(id);
      ctx.page.redirect('/catalog/'+id)
    }
}

