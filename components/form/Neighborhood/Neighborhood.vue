<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ isNew ? "اضافه کردن محله جدید" : "ویرایش محله" }}
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>

      <UForm :validate="validate" :state="formData" class="px-8 flex flex-wrap">
        <UFormGroup class="w-full p-1 lg:p-4" label="استان">
          <USelect
            placeholder="انتخاب استان "
            v-model="stateId"
            :options="states"
            option-attribute="name"
            value-attribute="id"
            />
          </UFormGroup>
          <UFormGroup class="w-full p-1 lg:p-4" name="city" label="شهر">
            <USelect
            placeholder="انتخاب شهرستان"
            option-attribute="name"
            value-attribute="id"
            v-model="formData.cityId"
            :loading="cityLoading"
            :options="cities"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="نام محله" name="name">
          <UInput v-model="formData.name" />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="شماره ناحیه" name="regionNumber">
          <UInput v-model="formData.regionNumber" />
        </UFormGroup>
     
      </UForm>
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
</template>
<script setup>
const isOpen = defineModel();
const props = defineProps(["formData", "isNew"]);
const toast = useToast();
const loading = ref(false);
const emit = defineEmits(["reload"]);
const stateId=ref('')
const cities=ref([])
const cityLoading=ref(false)
const validate = (formData) => {
  const errors = [];
  if (!formData.name)
    errors.push({
      path: "name",
      message: "وارد کردن نام محله الزامی است",
    });
  if (!formData.cityId)
    errors.push({
      path: "cityId",
      message: "وارد کردن شهر الزامی است",
    });
  return errors;
};

async function submit() {
  if (validate(props.formData).length > 0) return;
  if (loading.value) return;
  else {
    loading.value = true;
    console.log(props.formData);

    try {
      let res = await $fetch("/api/Neighborhood/Neighborhood", {
        method: props.isNew ? "POST" : "PUT",
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


watch(
 stateId,
  () => {
    getCity();
  },
  { deep: true }
);

async function getCity() {
  if (cityLoading.value) return;
  try {
    cityLoading.value = true;
    let res = await $fetch("/api/city/cities", {
      method: "get",
      query: {
        StateId: stateId.value,
        pageSize:600
      },
    });
    cities.value = [
      {
        name: "انتخاب نشده",
        id: null,
      },
      ...res?.list,
    ];
  } catch (error) {}
  cityLoading.value = false;
}


const states = ref([
  {
    name: "آذربايجان شرقي",
    id: 1,
  },
  {
    name: "آذربايجان غربي",
    id: 2,
  },
  {
    name: "اردبيل",
    id: 3,
  },
  {
    name: "اصفهان",
    id: 4,
  },
  {
    name: "البرز",
    id: 5,
  },
  {
    name: "ايلام",
    id: 6,
  },
  {
    name: "بوشهر",
    id: 7,
  },
  {
    name: "تهران",
    id: 8,
  },
  {
    name: "چهارمحال و بختياري",
    id: 9,
  },
  {
    name: "خراسان جنوبي",
    id: 10,
  },
  {
    name: "خراسان رضوي",
    id: 11,
  },
  {
    name: "خراسان شمالي",
    id: 12,
  },
  {
    name: "خوزستان",
    id: 13,
  },
  {
    name: "زنجان",
    id: 14,
  },
  {
    name: "سمنان",
    id: 15,
  },
  {
    name: "سيستان و بلوچستان",
    id: 16,
  },
  {
    name: "فارس",
    id: 17,
  },
  {
    name: "قزوين",
    id: 18,
  },
  {
    name: "قم",
    id: 19,
  },
  {
    name: "كردستان",
    id: 20,
  },
  {
    name: "كرمان",
    id: 21,
  },
  {
    name: "كرمانشاه",
    id: 22,
  },
  {
    name: "كهگيلويه و بويراحمد",
    id: 23,
  },
  {
    name: "گلستان",
    id: 24,
  },
  {
    name: "گيلان",
    id: 25,
  },
  {
    name: "لرستان",
    id: 26,
  },
  {
    name: "مازندران",
    id: 27,
  },
  {
    name: "مركزي",
    id: 28,
  },
  {
    name: "هرمزگان",
    id: 29,
  },
  {
    name: "همدان",
    id: 30,
  },
  {
    name: "يزد",
    id: 31,
  },
]);
</script>
