import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const token = `Bearer ${getCookie(event,'key')}`;
    try {
        const data = await apiFetch(event,`/api/Admin/RepairShopComment` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `${token}`
            },
                     query:getQuery(event)
        })
        
        return data;
    } catch (error) {
        return error
    }
})