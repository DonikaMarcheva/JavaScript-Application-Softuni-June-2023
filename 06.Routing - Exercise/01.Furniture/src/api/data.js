import * as api from './api.js';

const endpoints={
    login: 'users/login',
    register:'users/register',
    logout: 'users/logout',
    create:'data/catalog',
    getAllItem:'data/catalog',
    getItemById:'data/catalog/',
    myItem: 'data/catalog?where=_ownerId%3D%22'
}

export async function login(email,password){
    const res=await api.post(endpoints.login,{ email,password });
    sessionStorage.setItem('userData',JSON.stringify(res));
    return res;
}
export async function register(email,password){
    const res=await api.post(endpoints.register,{ email,password });
    sessionStorage.setItem('userData',JSON.stringify(res));
    return res;
}
export async function logout(){
    const res=await api.get(endpoints.logout);
    sessionStorage.removeItem('userData')
    return res;
}

export async function createItem(data){
    const res=await api.post(endpoints.create,data);
    return res;
}
export async function getAllItem(){
    const res=await api.get(endpoints.getAllItem);
    return res;
}
export async function getItemById(id){
    const res=await api.get(endpoints.getItemById +id);
    return res;
}
export async function updateById(id,data){
    const res=await api.put(endpoints.getItemById +id,data);
    return res;
}
export async function deleteItemById(id){
    const res=await api.del(endpoints.getItemById +id);
    return res;
}
export async function getMyItems(){
    //{userId}%22
    const userData=JSON.parse(sessionStorage.getItem('userData'));
    const userId=userData && userData._id;
    let id= `${userId}%22`

    const res=await api.get(endpoints.myItem+id);
    return res;

}