export default defineEventHandler(async (event) => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const data = await apiFetch(event,`/api/Admin/AnswerForm`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
        Authorization: `Bearer ${getCookie(event,'key')}`,
        "Accept-Language": "en-US",
      },
      query: getQuery(event),
    });

    return data;
  } catch (error) {
    // if(error.statusCode == 401){
    //     setCookie(event, 'token', '',{
    //         httpOnly: true,
    //         secure: true,
    //         maxAge: new Date(0),
    //         path: '/'
    //     })
    // }
    return error;
  }
});
