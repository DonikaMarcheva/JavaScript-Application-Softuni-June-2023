import { get, post, put, del } from "./api.js";

const endpoints={
    catalog: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    byId:'/data/pets/',
    donate:'/data/donation'
}

export async function getAllPets(){
    return get(endpoints.catalog);
}

export async function getById(id){
    return get(endpoints.byId+id);
}

export async function createPetCard(data){
    return post(endpoints.catalog,data);
}

export async function updatePetCard(id, data){
    return put(endpoints.byId+id, data);
}

export async function deletePetCard(id){
    return del(endpoints.byId+id);
}


