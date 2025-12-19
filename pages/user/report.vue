<template>
      <div class="p-8">

          <UCard>
              <template #header>
                  <div class="flex gap-4">
                      <UFormGroup class="flex-1 " label="خودرو " name="name">
                          <CategorySelect :parentId="carCategoryId" v-model="categoryId" />
                        </UFormGroup>
                        <UFormGroup class="flex-1" label="استان" >
                            <BaseSelectMenu v-model="stateId" :options="states" option-attribute="name" value-attribute="id">
                            </BaseSelectMenu>
                        </UFormGroup>
              <UFormGroup class="flex-1" label="شهر">
                  <BaseSelectMenu v-model="cityId" :options="cities" option-attribute="name" value-attribute="id" >
                </BaseSelectMenu>
              </UFormGroup>
            </div>
        </template>
        
        <div>
        <div class="flex gap-4">
            <div class="font-bold text-lg" >
                تعداد کاربران دارنده خودرو
            </div> : 
            <div>
                {{ count }}
            </div>
        </div>
    </div>
</UCard>
</div>
</template>
<script setup>
const { public: { carCategoryId } } = useRuntimeConfig()
const categoryId=ref()
const count=ref(0)
const stateId=ref()
const cityId=ref()
const {states,getCity}=useCity()
  const cities=ref([])
  watch(()=>stateId.value,async()=>{
      cities.value=await getCity(stateId.value)
    }) 
    
    
watch([categoryId,cityId,stateId],()=>{
    loadData()
})
async function loadData() {
try {
    let res=await $fetch('/api/usercategory/usercategorys',{
        query:{
            categoryId:categoryId.value,
            cityId:cityId.value,
            stateId:stateId.value
        }
    })
    count.value=res.totalCount
} catch (error) {
    
}
}
</script>