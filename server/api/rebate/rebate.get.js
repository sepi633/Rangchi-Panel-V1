export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()

 
    try {
        const data = await apiFetch(event,`/api/Admin/rebate`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
            },
            query: getQuery(event)
        })

        return data;
    } catch (error) {

        ;
        ;

        return error
    }


})