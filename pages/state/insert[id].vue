<template>
  <section class="parent-box p-6">
    <div class="title">
      <strong>افروزدن محتوا</strong>
    </div>
    <div class="body-box flex flex-wrap p-2 items-start bg-white rounded border mt-3">

      <div class="input-box flex flex-col lg:w-1/2 p-1">
        <label for=""> <span class="text-red-500">*</span> نام :</label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          v-model="newPost.name"
          id=""
        />
      </div>


    </div>

    <div class="submit-box flex flex-wrap justify-end w-full">
   
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
    const data = await $fetch("/api/state/state", {
      method: "GET",
      query: {
        id: route.params.id,
      },
    });

    newPost.value = data?.data;
  } catch (error) {}
};
const loading=ref(false)

const submitInfo = async (type) => {
        if(loading.value)
    return
loading.value=true
  try {
      let data=JSON.parse(JSON.stringify(newPost.value))
    delete data.picture
    const res = await $fetch("/api/state/state", {
      method: isEdite.value ? "PUT" : "POST",
      body:data,
    });
    if (res?.isSuccess) {
      toast.add({ description: "عملیات با موفقیت انجام شد .", color: "green" });
      setTimeout(() => {
        cancel();
      }, 1000);
      navigateTo("/state");
    } else {
      res?.messages.forEach((element) => {
        toast.add({ description: element?.item1, color: "red" });
      });
    }
  } catch (error) {
    toast.add({ description: "مشکلی پیش امده دوباره تلاش کنید", color: "red" });
  }
  loading.value=false

};

const cancel = () => {
  navigateTo("/state");
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
