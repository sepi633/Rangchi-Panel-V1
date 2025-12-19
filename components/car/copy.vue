<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white"    >
                     کپی {{ title }}
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="isOpen = false"
                  />
                </div>
              </template>
              <UFormGroup class="w-full " label="از خودرو " name="name">
                 <CategorySelect :parentId="carCategoryId" v-model="sourceCategoryId" />
              </UFormGroup>
              <template #footer>
                <div class="flex justify-end gap-4">
                    <UButton color="red" class="px-6" @click="isOpen=false">
                        خیر
                    </UButton>
                    <UButton :loading color="green" class="px-6" @click="submit">
                        بله
                    </UButton>
                </div>
              </template>
            </UCard>

    </UModal>
</template>
<script setup>
const { public: { carCategoryId } } = useRuntimeConfig()
const props=defineProps(['title',"categoryDetailId"])
const emit=defineEmits(['reload'])
const isOpen=defineModel()
const toast=useToast()
const route=useRoute()
const router = useRouter()
const sourceCategoryId=ref()
const loading=ref(false)
async function submit() {    
    if(loading.value)
    return
loading.value=true
    try {

        let res=await $fetch('/api/categoryDetailValue/categoryDetailValuecopy',{
            method:'post',
            body:{
            "sourceCategoryId":sourceCategoryId.value,
  "destinationCategoryId":route.params.catId,
  "categoryDetailId": props.categoryDetailId
            }
        })
        if(res.isSuccess){

            toast.add({description:' عملیات با موفقیت انجام شد .'})
            isOpen.value=false

            window.location.reload()
        }else{
            res.messages.forEach((el)=>{
          toast.add({description:el.item1,color:'red'})
        })
        }
    } catch (error) {
        console.log(error);
        
        toast.add({description:'مشکلی پیش آمده است دوباره امتحان کنید .',color:'red'})

    }
    loading.value=false
}

</script>