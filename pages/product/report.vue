
<template>
      <div class="p-8">

          <UCard>
              <template #header>
                  <div class="flex gap-4">
                      <UFormGroup class="w-full " label="خودرو " name="name">
                          <CategorySelect :parentId="carCategoryId" v-model="categoryId" />
                        </UFormGroup>
                    </div>
                </template>
                
                <div>
                    <div class="flex gap-4">
                        <div class="font-bold text-lg" >
                            تعداد محصول            </div> : 
                            <div>
                                {{ data?.totalCount }}
            </div>
            <!-- <div class="font-bold text-lg" >
                بیشترین بازدید          </div> : 
            <div>
                {{  }}
            </div> -->
        </div>
    </div>
</UCard>
</div>
</template>
<script setup>
const { public: { carCategoryId } } = useRuntimeConfig()
const categoryId=ref()
const data=ref()

watch(categoryId,()=>{
    loadData1()
})
async function loadData1() {
try {
    let res=await $fetch('/api/product/products',{
        query:{
            CategoryCarIds:[categoryId.value]
        }
    })
    data.value=res
} catch (error) {
    
}
}




</script>