import { get, post, put, del } from "./api.js";

const endpoints={
    catalog: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
    byId:'/data/motorcycles/',
    bySearch:(query)=>`/data/motorcycles?where=model%20LIKE%20%22${query}%22`
}
export async function getAllMotorcycles(){
    return get(endpoints.catalog);
}

export async function getById(id){
    return get(endpoints.byId+id);
}

export async function createMotorcycles(data){
    return post(endpoints.create,data);
}

export async function updateMotorcycles(id, data){
    return put(endpoints.byId+id, data);
}

export async function deleteMotorcycles(id){
    return del(endpoints.byId+id);
}

export async function searchMotorcycles(query){
    return get(endpoints.bySearch(query));
}