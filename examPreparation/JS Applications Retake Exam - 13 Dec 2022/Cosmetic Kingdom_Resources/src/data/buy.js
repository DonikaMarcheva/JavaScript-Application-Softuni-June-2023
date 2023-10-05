import { post, get } from "./api.js"

const endpoints={
    buyProduct:'/data/bought',
    purchasesById:(productId)=>`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
   purchasesByIdAndUser:(productId,userId)=>`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function buyProduct(productId){
    return post(endpoints.makeDonation,{productId});
}
export async function purchasesById(productId){
    return get(endpoints.purchasesById(productId));
}
export async function purchasesByIdAndUser(productId,userId){
    return get(endpoints.purchasesByIdAndUser(productId,userId));
}