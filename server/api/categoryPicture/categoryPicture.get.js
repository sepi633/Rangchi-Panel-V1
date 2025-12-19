export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()

    const query = getQuery(event);
    ;

    try {
        const data = await apiFetch(event,`/api/Admin/CategoryPicture`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'fa-IR'
            },
            query:query
        })

        return data;
    } catch (error) {
   ;

        return error
    }


})