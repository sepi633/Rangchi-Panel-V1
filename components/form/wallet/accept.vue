<template>
    <UModal v-model="isOpen" prevent-close>
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              تایید پرداخت
            </h3>
            <UIcon
              @click="isOpen = false"
              name="i-heroicons-x-mark-16-solid"
              class="w-8 h-8 text-gray-400"
            />
          </div>
        </template>
        <UCard class="space-y-4">
            <div class="flex gap-3"><strong>کاربر</strong>
        <span>{{formData?.user?.fullName}}</span></div>
          <div class="flex gap-3"><strong>بانک :</strong>
        <span>{{formData?.userBankAccount?.bankName}}</span></div>
          <div class="flex gap-3"><strong>شماره حساب</strong>
        <span>{{formData?.userBankAccount?.accountNumber}}</span></div>
          <div class="flex gap-3"><strong>شماره شبا :</strong>
        <span>{{formData?.userBankAccount?.shebaNumber}}</span></div>
          <div class="flex gap-3"><strong>شماره کارت</strong>
        <span>{{formData?.userBankAccount?.cartNumber}}</span></div>
        </UCard>
        <UForm  :state="formData" class="px-8 flex flex-wrap">
          <UFormGroup class="w-full p-1 lg:p-4" label="مورد تایید هست ؟" name="nameFa">
            <URadio label="هست " :value="true" v-model="formData.accept"/>
            <URadio label="نیست" :value="false" v-model="formData.accept"/>
          </UFormGroup>
          <UFormGroup class="w-full p-1 lg:p-4" label="توضیحات" name="nameFa">
            <UInput v-model="formData.name" />
          </UFormGroup>

        </UForm>
        <template #footer>
          <div class="flex items-center gap-4 justify-end ">
            <UButton class="px-8" @click="isOpen = false" color="rose">
              لغو
            </UButton>
            <UButton
              class="px-8"
              @click="submit"
              color="green"
              :loading="loading"
            >
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
  const emit = defineEmits(["reload"]);

  
  async function submit() {
    if (loading.value) return;
    else {
      loading.value = true;
      console.log(props.formData);
  
      try {
        let res = await $fetch("/api/wallet/pickup", {
          method:  "PUT",
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

  
  </script>
  