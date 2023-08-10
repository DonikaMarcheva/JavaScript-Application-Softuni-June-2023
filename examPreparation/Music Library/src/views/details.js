import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getById } from "../data/albums.js";
import { getAlbums, getUserAlbums, like } from "../data/likes.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album,onDelete,onLike) => 
html `
  <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${album.likes}</span></div>

            ${album.canEdit || album.canLike? html `<div id="action-buttons">
              ${album.canEdit? html` <a href="/catalog/${album._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`:nothing}
            ${album.canLike? html ` <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`:nothing}          
          </div>`:nothing}
          </div>
        </section>
        `
//======solution with Bonus======
export async function detailsPage(ctx) {
  const id=ctx.params.id;

  const requests=[getById(id), getAlbums(id)]
    
    const userData=getUserData();

  if(userData){
    requests.push(getUserAlbums(id,userData._id))
  }

  const [album,likes,hasLiked]= await Promise.all(requests);
  album.likes=likes;

  if(userData){
    //next conditions returns true or false
    album.canEdit=userData._id==album._ownerId;
    album.canLike=album.canEdit==false && hasLiked==0;
  } 
    
    ctx.render(detailsTemplate(album,onDelete,onLike))

    async function onDelete(){
      const choice= confirm('Are you sure you want to delete the album?');
      if (choice){
        await deleteAlbum(id);
        ctx.page.redirect('/catalog');
      }
    }

    async function onLike(){
      await like(id);
      ctx.page.redirect('/catalog/'+id)
    }
}

//===== THIS IS THE SOLUTION WITHOUT BONUS==========

// export async function detailsPage(ctx) {
//   const id=ctx.params.id;
//   const album=await getById(id);

//   const userData=getUserData();
//   if(userData && userData._id==album._ownerId){
//     album.canEdit=true;
//   }

//     ctx.render(detailsTemplate(album,onDelete))

//     async function onDelete(){
//       const choice= confirm('Are you sure you want to delete the offer?');
//       if (choice){
//         await deleteAlbum(id);
//         ctx.page.redirect('/catalog');
//       }
//     }
// }