<template>
    <UModal v-model="isOpen" prevent-close>
        <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ formTitle }}
              </h3>
              <UIcon
                @click="isOpen = false"
                name="i-heroicons-x-mark-16-solid"
                class="w-8 h-8 text-gray-400"
              />
            </div>
          </template>
          
         <UFormGroup label="فعال / غیرفعال">
          <UCheckbox v-model="selected.active" />
         </UFormGroup> 
         <UFormGroup label="تایید ادمین" v-if="showAdminConfirm">
          <UCheckbox v-model="selected.adminConfirm" />
         </UFormGroup> 
         
          
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
const loading=ref(false)
const toast=useToast()
const props=defineProps(['route','selected','formTitle','showAdminConfirm'])
const emit=defineEmits(['reload'])
async function submit() {
    if(loading.value)
    return

    loading.value = true;
    console.log(props.formData);
    
    try {
      let res = await $fetch(props.route, {
        method:"PUT",
       body:props.selected
      });
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