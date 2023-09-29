import * as api from './api.js';
import * as auth from './auth.js';

// export const login= auth.login;
// export const register=auth.register;
// export const logout=auth.logout;
const userId=sessionStorage.getItem('userId');

const endpoints={
    getTeams:'data/teams',
    getAllMembers:'data/members?where=status%3D%22member%22',
    getMyTeams:`data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    getTeamById: 'data/teams/',
    createTeam: 'data/teams', 
    memberRequest:'data/members',
    getRequestByTeamId: `data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
}

export async function getTeams(){
const teams=await api.get(endpoints.getTeams);
const members=await getAllMembers(teams.map(t=>t._id));
teams.forEach(t => {t.membersConts=members.filter(m=>m.teamId==t._id).length});
return teams;
}

export async function getAllMembers(){
    const res=await api.get(endpoints.getAllMembers);
return res;
}
//->same as above but usin encodeURIComponent<-

// export async function getAllMembers(teamIds){
// const query=encodeURIComponent(`teamId IN ("${teamIds.join('", "')}") AND status="member"`);
// return await api.get(`data/members?where=${query}`);
// }

export async function getMyTeams(){
    const teamsMembership= await api.get(endpoints.getMyTeams);
    const teams=teamsMembership.map(r=>r.team);
    const members=await getAllMembers(teams.map(t=>t._id));
    teams.forEach(t => {t.membersConts=members.filter(m=>m.teamId==t._id).length});
return teams;
}

export async function getTeamById(id){
    const res= await api.get(endpoints.getTeamById + id);
    return res;
}

export async function createTeam(name, logoUrl, description){
    const res = await api.post(endpoints.createTeam,{name, logoUrl, description});
    const request=await requestToJoin(res._id);
    await approveMemership(request);
    return res;
}

export async function requestToJoin(teamId){
const body={teamId};
return await api.post(endpoints.memberRequest, body)
}

export async function approveMemership(request){
    const id=request._id;
    const body = {
        teamId:request.teamId,
        status:'member'
}
return await api.post(endpoints.memberRequest+request._id, body)
}

export async function cancelMembership(requestId){
return await api.del(endpoints.memberRequest+requestId)
}

export async function editTeam(id, name,logoUrl,description){
    const res= await api.put(endpoints.teamInfo + id);
    return res;
}
export async function deleteTeam(id){
    const res= await api.del(endpoints.teamInfo + id);
    return res;
}

export async function getRequestByTeamId(teamId){
    const res= api.get(endpoints.getRequestByTeamId);
    return res;
}

export async function requestMember(teamId){
    const res= await api.post(endpoints.memberRequest,{teamId});
    return res;
}
