<template>
  <section class="parent-box p-6">
    <div class="title">
      <strong>افروزدن محتوا</strong>
    </div>
    <div class="body-box flex flex-wrap p-2 items-start bg-white rounded border mt-3">
      <div class="my-2">عکس </div>
      <div class="w-full" v-if="newPost.pictureId">
        <img
          class="h-[300px] w-full border p-1 mb-3 object-contain"
          :src="getPicUrl(newPost.picture)"
        />
        <button
          class="w-full flex justify-center bg-[#e3e3e3] p-2 rounded"
          @click="newPost.pictureId = null"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6.99747C3 6.20182 3.31607 5.43876 3.87868 4.87615C4.44129 4.31354 5.20435 3.99747 6 3.99747H18C18.7956 3.99747 19.5587 4.31354 20.1213 4.87615C20.6839 5.43876 21 6.20182 21 6.99747V18.9975C21 19.7931 20.6839 20.5562 20.1213 21.1188C19.5587 21.6814 18.7956 21.9975 18 21.9975H6C5.20435 21.9975 4.44129 21.6814 3.87868 21.1188C3.31607 20.5562 3 19.7931 3 18.9975V6.99747ZM19 6.99747V15.5835L15.707 12.2905C15.5195 12.103 15.2652 11.9977 15 11.9977C14.7348 11.9977 14.4805 12.103 14.293 12.2905L13 13.5835L9.207 9.79047C9.01947 9.603 8.76516 9.49768 8.5 9.49768C8.23484 9.49768 7.98053 9.603 7.793 9.79047L5 12.5835V6.99747C5 6.73225 5.10536 6.4779 5.29289 6.29036C5.48043 6.10282 5.73478 5.99747 6 5.99747H18C18.2652 5.99747 18.5196 6.10282 18.7071 6.29036C18.8946 6.4779 19 6.73225 19 6.99747ZM5 18.9975V15.4115L8.5 11.9115L12.293 15.7045C12.4805 15.8919 12.7348 15.9973 13 15.9973C13.2652 15.9973 13.5195 15.8919 13.707 15.7045L15 14.4115L19 18.4115V18.9975C19 19.2627 18.8946 19.517 18.7071 19.7046C18.5196 19.8921 18.2652 19.9975 18 19.9975H6C5.73478 19.9975 5.48043 19.8921 5.29289 19.7046C5.10536 19.517 5 19.2627 5 18.9975ZM14.5 10.9975C14.8978 10.9975 15.2794 10.8394 15.5607 10.5581C15.842 10.2768 16 9.89529 16 9.49747C16 9.09964 15.842 8.71811 15.5607 8.43681C15.2794 8.1555 14.8978 7.99747 14.5 7.99747C14.1022 7.99747 13.7206 8.1555 13.4393 8.43681C13.158 8.71811 13 9.09964 13 9.49747C13 9.89529 13.158 10.2768 13.4393 10.5581C13.7206 10.8394 14.1022 10.9975 14.5 10.9975Z"
              fill="black"
            />
          </svg>

          ویرایش تصویر
        </button>
      </div>
      <UploadImage
        FileInputId="id1"
        v-else
        @getPictureId="
          (n, picture) => {
            newPost.pictureId = n;
            newPost.picture = picture;
          }
        "
      />
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
        <label for="">ادرس بازگشت:</label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          v-model="newPost.paymentUrl"
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
  "pictureId": null,
  "label": "",
  "paymentUrl": "",
  "verficationUrl": "",
  "verfication2Url": "",
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
    const data = await $fetch("/api/bank/bank", {
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
    const res = await $fetch("/api/bank/bank", {
      method: isEdite.value ? "PUT" : "POST",
      body:data,
    });
    if (res?.isSuccess) {
      toast.add({ description: "عملیات با موفقیت انجام شد .", color: "green" });
      setTimeout(() => {
        cancel();
      }, 1000);
      navigateTo("/bank");
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
  navigateTo("/bank");
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
