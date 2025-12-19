<template>
  <div>

    <UModal v-model="isOpen" prevent-close >
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
            فرم سوال
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>
      <div class="text-right">

          <div class="input-box flex flex-col p-1">
              <label for=""> نام:</label>
            <input
            class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="data.name"
              id=""
            />
        </div>

          <div class="input-box flex flex-col p-1">
              <label for=""> اولویت نمایش:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="data.priority"
              id=""
              />
            </div>
            <div class="input-box flex flex-col p-1">
                <label for=""> {{ $t("type") }}:</label>
            <select
            class="bg-white border p-1"
              name=""
              id=""
              v-model="data.typeId"
            >
            <option value="">انتخاب کنید</option>
              <option :value="item?.id" v-for="item in types" :key="item?.id">
                  {{ item?.name }}
              </option>
            </select>
          </div>
          <div class="flex my-3 gap-x-2">
            <label for="data.required">آیا این سوال اجباری باشد؟</label>
            <input
            v-model="data.required"
              type="checkbox"
              name=""
              id="data.required"
            />
          </div>
        </div>
 
      <template #footer>
        <div class="flex items-center gap-4 justify-end">
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

</div>
</template>
<script setup>
const isOpen = defineModel();
const props = defineProps(["formId",'isNew','data']);
const toast = useToast();
const emit = defineEmits(["reload"]);
const types=ref([])

const loading=ref(false)
const submit = async (type) => {
  if(loading.value)return
  loading.value=true
    try {
      let formData=JSON.parse(JSON.stringify(props.data))
      delete formData.type
      const insert = await $fetch("/api/form/formQuestion", {
        method:props.isNew? "POST" :"PUT",
        body: formData,
      });

      if (insert.isSuccess) {
        toast.add({description:"عملیات با موفقیت انجام شد",color:'green'});
        emit('reload')
        isOpen.value=false
      } else {
        toast.add({description:insert?.messages[0]?.item1,color:'red' });
      }
    } catch (error) {
        console.log(error)
    } 

  loading.value=false
};


const getFormstype = async () => {
  try {
    const data = await $fetch("/api/code/code", {
      method: "GET",
      query: {
        CodeGroupLabel: "FormQuestionType",
      },
    });

    types.value = data.list;
  } catch (error) {
  }
};
onMounted(()=>{
  getFormstype()

})
</script>
