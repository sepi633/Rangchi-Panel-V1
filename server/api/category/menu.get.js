export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()

 
    try {
        const data = await apiFetch(event,`/api/CategoryMenu/${getQuery(event).id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        return data;
    } catch (error) {
    

        return error
    }


})