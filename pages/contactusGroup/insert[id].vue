<template>
  <section class="parent-box p-6">
    <div class="title">
      <strong>افروزدن محتوا</strong>
    </div>
    <div class="body-box flex flex-wrap p-2 items-start bg-white rounded border mt-3">

      <div class="input-box flex flex-col lg:w-1/2 p-1">
        <label for=""> <span class="text-red-500">*</span> عنوان :</label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          v-model="newPost.name"
          id=""
        />
      </div>
      <div class="input-box flex flex-col lg:w-1/2 p-1">
        <label for=""> <span class="text-red-500">*</span> برچسب :</label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          v-model="newPost.label"
          id=""
        />
      </div>
      <div class="input-box flex flex-col lg:w-1/2 p-1">
        <label for="">  اولویت نمایش :</label>
        <input
          class="border w-full h-[40px] mt-2"
          type="number"
          name=""
          v-model="newPost.priority"
          id=""
        />
      </div>


    </div>

    <div class="submit-box flex flex-wrap justify-end w-full">
        <div class="flex justify-start mr-auto lg:w-4/12 items-center pt-3">
          <input class="border mx-2" type="checkbox" 
            v-model="newPost.active" id="active" />
          <label for="active">{{ $t('IWantToDisplayOnTheSite') }}</label>
        </div>
      <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white" @click="cancel">
        انصراف
      </button>

      <button
        :class="[
          'btn  w-2/12 my-3 px-3 py-1 text-white',
          isEdite ? 'bg-[#2563eb]' : 'bg-[#136b57]',
        ]"
        @click="submitInfo"
      >
        {{ isEdite ? $t("edite") : $t("confirm") }}
      </button>
    </div>
  </section>
</template>

<script setup>
const { getPicUrl } = usePicture();
const toast = useToast();
const newPost = ref({
  "name": "",
  "label": "",
  "priority": 0,
  "active": true
});
const isEdite = ref(false);

const categoris = ref();
const route = useRoute();
onMounted(() => {

  if (route.params.id != "new") {
    pageLoader();
    isEdite.value = true;
  }
});

const pageLoader = async () => {
  try {
    const data = await $fetch("/api/contactusGroup/contactusGroup", {
      method: "GET",
      query: {
        id: route.params.id,
      },
    });

    newPost.value = data?.data;
  } catch (error) {}
};

const submitInfo = async (type) => {
  try {
      let data=JSON.parse(JSON.stringify(newPost.value))
    delete data.picture
    const res = await $fetch("/api/contactusGroup/contactusGroup", {
      method: isEdite.value ? "PUT" : "POST",
      body:data,
    });
    if (res?.isSuccess) {
      toast.add({ description: "عملیات با موفقیت انجام شد .", color: "green" });
      setTimeout(() => {
        cancel();
      }, 1000);
      navigateTo("/contactusGroup");
    } else {
      res?.messages.forEach((element) => {
        toast.add({ description: element?.item1, color: "red" });
      });
    }
  } catch (error) {
    toast.add({ description: "مشکلی پیش امده دوباره تلاش کنید", color: "red" });
  }
};

const cancel = () => {
  navigateTo("/contactusGroup");
};
</script>

<style lang="scss" scoped>
.acardeon {
  border: 1px solid #3333;
  background-color: #fff;
  padding: 15px 20px;
  margin-top: 10px;
  border-radius: 5px;
  transition: 0.2s;

  svg {
    width: 12px;
  }

  &:hover {
    box-shadow: 0 2px 0px #1f2937;
  }

  .title-box {
    cursor: pointer;
  }

  .body-box {
    min-height: 100px;
    border-top: 1px solid #3333;
    margin-top: 20px;
  }
}
</style>
