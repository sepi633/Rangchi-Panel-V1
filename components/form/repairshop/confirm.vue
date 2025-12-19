<template>
    <UModal v-model="isOpen" prevent-close>
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              تایید سرویسکار
            </h3>
            <UIcon
              @click="isOpen = false"
              name="i-heroicons-x-mark-16-solid"
              class="w-8 h-8 text-gray-400"
            />
          </div>
        </template>
  
        <UForm :validate="validate" :state="formData" class="px-8 flex flex-wrap">
    <UFormGroup class="w-full p-3" label="تایید مدیر" name="adminConfirm">
      <USelect placeholder="وضعیت .." :options="codes" option-attribute="name" value-attribute="id" v-model="formData.requestStateId"  />
    </UFormGroup>
        </UForm>
        <template #footer>
          <div class="flex items-center gap-4 justify-end">
            <UButton class="px-8" @click="isOpen = false" color="rose">
              لغو
            </UButton>
            <UButton class="px-8" @click="submit" color="green" :loading="loading">
              ثبت
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </template>
  <script setup>
  const isOpen = defineModel();
  const props = defineProps(["formData"]);
  const toast = useToast();
  const loading = ref(false);
  const emit = defineEmits(["reload"])
  const codes=ref([]) 
  const validate = (formData) => {
    const errors = [];
    return errors;
  };
  
  async function submit() {
    if (validate(props.formData).length > 0) return;
    if (loading.value) return;
    else {
      loading.value = true;
      console.log(props.formData);
      
      try {
        let res = await $fetch("/api/repairshop/changestate", {
          method: "PUT",
          body: props.formData,
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
        toast.add({
          description: "مشکلی پیش آمده است .",
          title: "خطا !",
          color: "red",
        });
      }
      loading.value = false;
    }
  }
  
  onMounted(async ()=>{
    codes.value=await useCode().getCode('RequestState')
  })
  </script>