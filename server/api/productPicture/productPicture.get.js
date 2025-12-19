export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()

    const query = getQuery(event);
    ;

    try {
        const data = await apiFetch(event,`/api/Admin/ProductPicture?ProductId=${query.ProductId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'fa-IR'
            }
        })

        return data;
    } catch (error) {
   ;

        return error
    }


})