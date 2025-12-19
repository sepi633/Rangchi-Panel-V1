export default defineEventHandler(async(event) => {
    const { public: { baseUrl } } = useRuntimeConfig()
    const body = await readBody(event);

    try {
        const data = await apiFetch(event,`/api/Admin/Rebate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
            },
            body: body
        })

        return data;
    } catch (error) {

        ;
        ;

        return error
    }


})