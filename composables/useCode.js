export default function(){
    const getCode = async (_codeGroupLabel) => {
        try {    
            const data = await $fetch('/api/code/code', {
                method: 'GET',
                query: {
                    CodeGroupLabel:_codeGroupLabel
                }
            })
    
    
            return data?.list
    
        } catch (error) {
            return []
        }
    
    }

    return {
getCode
    }
}