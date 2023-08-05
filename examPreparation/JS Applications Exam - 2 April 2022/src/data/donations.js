import { post, get } from "./api.js"

const endpoints={
    makeDonation:'/data/donation',
    donationById:(petId)=>`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
   donationByIdAndUser:(petId,userId)=>`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function donate(petId){
    return post(endpoints.makeDonation,{petId});
}
export async function getDonations(petId){
    return get(endpoints.donationById(petId));
}
export async function getOwnDonation(petId,userId){
    return get(endpoints.donationByIdAndUser(petId,userId));
}