<template>
    <UModal v-model="isOpen" prevent-close>
        <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
               حذف {{ formTitle }}
              </h3>
              <UIcon
                @click="isOpen = false"
                name="i-heroicons-x-mark-16-solid"
                class="w-8 h-8 text-gray-400"
              />
            </div>
          </template>
    
         
        <p>
            ایا مایل به حذف ایتم هستید ؟
        </p>
          <template #footer>
            <div class="flex items-center gap-4 justify-end">
              <UButton class="px-8" @click="isOpen = false" color="rose">
                لغو
              </UButton>
              <UButton class="px-8" @click="submit"  color="green" :loading="loading">
                ثبت
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>    
</template>
<script setup>
const isOpen=defineModel()
const route=useRoute()
const loading=ref(false)
const toast=useToast()
const props=defineProps(['route','selectedId','formTitle',"storeId"])
const emit=defineEmits(['reload'])
async function submit() {
    if(loading.value)
    return
    loading.value = true;
    console.log(props.formData);
    
    try {
      let res
      if(props.route=='/api/Discount/Discount'){
         res = await $fetch("/api/Discount/Discount", {
      method: "DELETE",
      body: {
        id: props.selectedId,
        storeId: props.storeId,
      },
    });

      }else{

     res = await $fetch(props.route, {
        method:"DELETE",
        query:{
            id:props.selectedId
        }
      });
    }
      if (res.isSuccess) {
        toast.add({
          description: " عملیات با موفقیت انجام شد .",
          color: "green",
        });
        isOpen.value = false;
        emit("reload");
      } else {
        res.messages.forEach((el) => {
          toast.add({ description: el.item1, color: "red" });
        });
      }
    } catch (error) {
      console.log(error);
      
      toast.add({
        description: "مشکلی پیش آمده است .",
        title: "خطا !",
        color: "red",
      });
    }
    loading.value = false;
}
</script>