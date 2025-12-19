<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ isNew ? "اضافه کردن تاپیک جدید" : "ویرایش تاپیک" }}
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>

      <UForm :validate="validate" :state="formData" class="px-8 flex flex-wrap">
        <UFormGroup class="w-full p-3" label="ایجاد کننده" name="label">
          <USelectMenu
            v-model="formData.userId"
            searchable
            searchable-placeholder="جستجو ..."
            class="w-full"
            placeholder="انتخاب کنید"
            option-attribute="fullName"
            value-attribute="id"
            :options="users"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="تالار" name="label">
          <USelectMenu
            v-model="formData.discussionForumId"
            searchable
            searchable-placeholder="جستجو ..."
            class="w-full"
            placeholder="انتخاب کنید"
            option-attribute="name"
            value-attribute="id"
            :options="forums"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="دسته بندی" name="label">
          <USelectMenu
            v-model="formData.discussionForumChildId"
            searchable
            :loading="childLoading"
            searchable-placeholder="جستجو ..."
            class="w-full"
            placeholder="انتخاب کنید"
            option-attribute="name"
            value-attribute="id"
            :options="childs"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="استان" name="label">
          <USelectMenu
            v-model="formData.stateId"
            searchable
            searchable-placeholder="جستجو ..."
            class="w-full"
            placeholder="انتخاب کنید"
            option-attribute="name"
            value-attribute="id"
            :options="states"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="شهر" name="label">
          <USelectMenu
            v-model="formData.cityId"
            :loading="cityLoading"
            searchable
            searchable-placeholder="جستجو ..."
            class="w-full"
            placeholder="انتخاب کنید"
            option-attribute="name"
            value-attribute="id"
            :options="cities"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="عنوان" name="name">
          <UInput v-model="formData.name" />
        </UFormGroup>
        <UFormGroup class="w-full p-3" label="متن" name="content">
          <UTextarea :rows="6" v-model="formData.content" />
        </UFormGroup>
        <UFormGroup label="فایل" name="file">
          <div v-if="formData.file" class="flex gap-4 relative justify-center">
            <a
              :href="getFileUrl(formData.file)"
              class="w-full p-4 bg-gray-600 text-white text-right rounded-lg"
              >{{ formData?.file?.url }}</a
            >
            <UButton
              icon="i-heroicons-trash"
              size="xs"
              color="red"
              square
              variant="solid"
              class="absolute top-0 left-0"
              @click="
                formData.file = null;
                formData.fileId = null;
              "
            />
          </div>
          <UploadFile v-else @getPictureId="setFile" :FileInputId="'file'" />
        </UFormGroup>
        <UFormGroup label="تصویر" name="picture">
          <div v-if="formData.picture" class="flex gap-4 relative justify-center">
            <img :src="getPicUrl(formData.picture, 'sm')" alt="" />
            <UButton
              icon="i-heroicons-trash"
              size="xs"
              color="red"
              square
              variant="solid"
              class="absolute top-0 left-0"
              @click="
                formData.picture = null;
                formData.pictureId = null;
              "
            />
          </div>
          <UploadImage v-else @getPictureId="setPicture" :FileInputId="'Picture'" />
        </UFormGroup>

        <div class="flex">
          <UFormGroup class="w-full p-3" label="فعال" name="active">
            <UCheckbox v-model="formData.active" />
          </UFormGroup>
          <UFormGroup class="w-full p-3" label="بسته" name="closed">
            <UCheckbox v-model="formData.closed" />
          </UFormGroup>
        </div>
      </UForm>
      <template #footer>
        <div class="flex items-center gap-4 justify-end">
          <UButton class="px-8" @click="isOpen = false" color="rose"> لغو </UButton>
          <UButton class="px-8" @click="submit" color="green" :loading="loading">
            ثبت
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>
const { getFileUrl, getPicUrl } = usePicture();
const isOpen = defineModel();
const props = defineProps(["formData", "isNew"]);
const toast = useToast();
const loading = ref(false);
const cityLoading = ref(false);
const childLoading = ref(false);
const emit = defineEmits(["reload"]);
const users = ref([]);
const forums = ref([]);
const cities = ref([]);
const childs = ref([]);
const validate = (formData) => {
  const errors = [];
  if (!formData.name)
    errors.push({
      path: "name",
      message: "وارد کردن نام تاپیک الزامی است",
    });
  return errors;
};
onMounted(() => {
  getUsers();
  getForums();
});

function setFile(_Id, _file) {
  props.formData.fileId = _Id;
  props.formData.file = _file;
}
function setPicture(_picId, _pic, _label) {
  props.formData.pictureId = _picId;
  props.formData.picture = _pic;
}
async function submit() {
  if (validate(props.formData).length > 0) return;
  if (loading.value) return;
  else {
    loading.value = true;
    console.log(props.formData);

    try {
      let data = JSON.parse(JSON.stringify(props.formData));
      delete data.file;
      delete data.discussionForum;
      delete data.user;
      delete data.city;
      delete data.state;
      let res = await $fetch("/api/DiscussionTopic/DiscussionTopic", {
        method: props.isNew ? "POST" : "PUT",
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

const getUsers = async () => {
  try {
    const res = await $fetch("/api/user/user", {
      method: "GET",
    });
    users.value = res.list || [];
  } catch (error) {
    toast.add({ description: "مشکلی در دریافت نام کاربران پیش آمده است." });
  }
};
const getForums = async () => {
  try {
    const res = await $fetch("/api/DiscussionForum/DiscussionForums", {
      method: "GET",
    });
    forums.value = res.list || [];
  } catch (error) {
    toast.add({ description: "مشکلی در دریافت نام کاربران پیش آمده است." });
  }
};

watch(
  () => props.formData.stateId,
  () => {
    console.log("11111111111111111111111111");

    getCity();
  },
  { deep: true }
);
watch(
  () => props.formData.discussionForumId,
  () => {
    console.log("11111111111111111111111111");

    getChilds();
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
        StateId: props.formData.stateId,
        pageSize: 6000,
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

async function getChilds() {
  if (childLoading.value) return;
  try {
    childLoading.value = true;
    let res = await $fetch("/api/DiscussionForumChild/DiscussionForumChilds", {
      method: "get",
      query: {
        DiscussionForumId: props.formData.discussionForumId,
      },
    });
    childs.value = [
      // {
      //   name: "انتخاب نشده",
      //   id: null,
      // },
      ...res?.list,
    ];
  } catch (error) {}
  childLoading.value = false;
}

const states = ref([
  {
    name: "انتخاب نشده",
    id: null,
  },

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
