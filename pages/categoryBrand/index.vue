<template>
    <div >
            
            <div class=" flex justify-between items-center">
              <p> دسته بندی های مرتبط با برند <strong  class=" text-[17px]">{{ route?.query?.name }}</strong></p>  
            <nuxt-link :to="`/categoryBrand/insert${route?.query?.id}?name=${route.query.name}`" class=" bg-orange-500 p-1 rounded text-[#fff]">افزودن و ویرایش دسته بندی های برند</nuxt-link>  
            </div>
            <div class="flex  flex-wrap mt-3">
                <div class="lg:1/4 md:1/2 p-1 " v-for="item in categoryBrand?.list?.categoryDto" :key="item?.id">
                       
                        <div class="w-full  p-5 bg-white border">
                          {{ item?.name }}   
                        </div>
                </div>
            </div>
           
    
    </div>
</template>

<script setup>

const route = useRoute()
const categoryBrand = useCategoryBrand()

onMounted(async () => {
 await  categoryBrand.getcategoryBrand(route.query.id)

})
</script>