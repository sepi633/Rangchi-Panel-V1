export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()


    try {
        const data = await apiFetch(event,`/api/Admin/Rebate/${getQuery(event).id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
            },
            // query:{
            //     parentId:getQuery(event).parentId
            // }
        })

        return data;
    } catch (error) {

        ;

        return error
    }


})