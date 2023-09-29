import * as api from './api.js';

const endpoints={
    login: 'users/login',
    register:'users/register',
    logout: 'users/logout',
}
export async function login(email,password){
    const res=await api.post(endpoints.login,{ email,password });
    sessionStorage.setItem('username',res.username);
    sessionStorage.setItem('authToken',res.accessToken)
    sessionStorage.setItem('userId',res._id)
    return res;
}
export async function register(email,username,password){
    const res=await api.post(endpoints.register,{ email,username,password });
    sessionStorage.setItem('username',res.username);
    sessionStorage.setItem('authToken',res.accessToken)
    sessionStorage.setItem('userId',res._id)
    return res;
}
export async function logout(){
    const res=await api.get(endpoints.logout);
    sessionStorage.removeItem('username',res.username);
    sessionStorage.removeItem('authToken',res.accessToken)
    sessionStorage.removeItem('userId',res._id)
    return res;
}

