export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig();
    const query = getQuery(event);;

    try {
        const data = await apiFetch(event,`/api/Admin/GalleryLanguage`, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'en-US'
            },
            query: getQuery(event)
        })

        return data;
    } catch (error) {


        return error
    }

})