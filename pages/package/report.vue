<template>
      <div class="p-8">

          
          <UCard>
              <!-- <template #header>
                  <div class="flex gap-4">
                      <UFormGroup class="w-full " label="خودرو " name="name">
                          <CategorySelect :parentId="carCategoryId" v-model="categoryId" />
                        </UFormGroup>
                    </div>
                </template> -->
                
                <div>
                    <div class="flex gap-4">
                        <div class="font-bold text-lg" >
                            تعداد کاربران دارنده پکیج فعال
                        </div> : 
                        <div>
                            {{ count }}
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="font-bold text-lg" >
                            تعداد کاربرانی که شارژ حساب انها به پایان رسیده است 
                        </div> : 
                        <div>
                            {{ count2 }}
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
        </template>
    <script setup>
   
    const count=ref(0)
    const count2=ref(0)
    
  onMounted(()=>{
    loadData()
    loadData2()
  })
    async function loadData() {
    try {
        let res=await $fetch('/api/userpackage/userpackages',{
            query:{
                IsExpired:false
            }
        })
        count.value=res.totalCount
    } catch (error) {
        
    }
    }
    async function loadData2() {
    try {
        let res=await $fetch('/api/userpackage/userpackages',{
            query:{
                IsExpired:true
            }
        })
        count2.value=res.totalCount
    } catch (error) {
        
    }
    }
    </script>