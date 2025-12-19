<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            تایید انتشار
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
    <UCheckbox v-model="formData.adminConfirm"  />
  </UFormGroup>
  <UFormGroup class="w-full p-3" label="تاریخ تایید" name="publishDate">
    {{ formData.publishDate }}
    <date-picker locale="fa" v-model="formData.publishDate"></date-picker>
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
const cityLoading=ref(false)
const emit = defineEmits(["reload"]);
const users=ref([])
const forums=ref([])
const cities=ref([])
const validate = (formData) => {
  const errors = [];
  if (!formData.publishDate)
    errors.push({
      path: "publishDate",
      message: "وارد کردن  تاریخ انتشار الزامی است",
    });
  return errors;
};

async function submit() {
  if (validate(props.formData).length > 0) return;
  if (loading.value) return;
  else {
    loading.value = true;
    
    try {
      let data=JSON.parse(JSON.stringify(props.formData))
      delete data.file
      delete data.discussionForum
      delete data.user
      delete data.city 
      delete data.state
      let res = await $fetch("/api/DiscussionTopic/DiscussionTopic", {
        method: "PUT",
        body: data,
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