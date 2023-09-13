import * as api from './api.js'

const endPoints={
    'getAllIdeas':'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea':'data/ideas',
    "ideaById": "data/ideas/"

}
export async function getAllIdeas(){
   return api.get(endPoints.getAllIdeas);
}

export async function createIdea(data){
    return api.post(endPoints.createIdea, data);
}

export async function getIdeaById(id){
    return api.get(endPoints.ideaById + id);
}

export async function deleteById(id) {
    return api.delete(endPoints.ideaById + id)
}