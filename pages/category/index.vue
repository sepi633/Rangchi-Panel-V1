<template>
    <!-- <ListCategoryList></ListCategoryList> -->
   <TreeSelect :pageData="allCategory"></TreeSelect>
   
</template>

<script setup>
const allCategory = ref()
onMounted(()=>{
    pageLoader()
})
const pageLoader = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/category', {
            method: 'GET',
            headers,
            // query: {
            //     parentId: route.params.id
            // }
        })
        

        allCategory.value = data
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

</script>