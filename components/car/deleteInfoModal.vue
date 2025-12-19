<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white"    >
                     حذف
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
              آیا از حذف این آیتم اطمینان دارید ؟
              <template #footer>
                <div class="flex justify-end gap-4">
                    <UButton color="red" class="px-6" @click="isOpen=false">
                        خیر
                    </UButton>
                    <UButton color="green" class="px-6" @click="deleteItem">
                        بله
                    </UButton>
                </div>
              </template>
            </UCard>

    </UModal>
</template>
<script setup>
const props=defineProps(['data'])
const emit=defineEmits(['reload'])
const isOpen=defineModel()
const toast=useToast()
async function deleteItem() {
    console.log('111111111111111111111111');
    
    try {
        let res=await $fetch('/api/categoryDetailValue/categoryDetailValue',{
            method:'delete',
            query:{
                id:props.data.id
            }
        })
        if(res.isSuccess){

            toast.add({description:'حذف ایتم با موفقیت انجام شد .'})
            isOpen.value=false
            emit('reload')
        }else{
            res.messages.forEach((el)=>{
          toast.add({description:el.item1,color:'red'})
        })
        }
    } catch (error) {
        console.log(error);
        
        toast.add({description:'مشکلی پیش آمده است دوباره امتحان کنید .',color:'red'})

    }
}

</script>