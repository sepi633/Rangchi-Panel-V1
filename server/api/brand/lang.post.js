export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig();
    const query = getQuery(event);;
const body=await readBody(event)
    try {
        const data = await apiFetch(event,`/api/Admin/BrandLanguage`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'en-US'
            },
            query: getQuery(event),
            body:body
        })

        return data;
    } catch (error) {


        return error
    }

})