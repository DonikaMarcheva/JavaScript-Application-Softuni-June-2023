import { get, post } from "./api.js";

const endpoints={
    likes:'/data/likes',
    byAlbumId:(albumId)=>`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    byalbumIdAndUserId:(albumId,userId)=>`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function like(albumId){
   return post(endpoints.likes,{ albumId })
}

export async function getAlbums(albumId){
    return get(endpoints.byAlbumId(albumId))
}

export async function getUserAlbums(albumId,userId){
    return get(endpoints.byalbumIdAndUserId(albumId,userId));
}