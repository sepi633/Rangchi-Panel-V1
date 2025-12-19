<template>
  <div class="flex flex-wrap">
    <div class="inputgroup w-full lg:w-1/2">
      <label for="">عنوان</label>
      <input type="text" v-model="brandDataLang.seoFieldLangDto.name" />
    </div>
    <div class="inputgroup w-full lg:w-1/2">
      <label for="">عنوان سئو </label>
      <input type="text" v-model="brandDataLang.seoFieldLangDto.seoTitle" />
    </div>

    <div class="inputgroup w-full lg:w-1/2">
      <label for="">هدینگ اول </label>
      <input type="text" v-model="brandDataLang.seoFieldLangDto.seoH1" />
    </div>
    <div class="inputgroup w-full lg:w-1/2">
      <label for="">عنوان تصویر</label>
      <input
        type="text"
        v-model="brandDataLang.seoFieldLangDto.seoPictureAlt"
      />
    </div>
    <div class="inputgroup w-full lg:w-1/2">
      <label for=""> خلاصه</label>
      <textarea
        v-model="brandDataLang.seoFieldLangDto.summary"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <div class="inputgroup w-full lg:w-1/2">
      <label for=""> توضیحات خلاصه سئو(seoMinDescription)</label>
      <textarea
        v-model="brandDataLang.seoFieldLangDto.seoMinDescription"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <div class="inputgroup">
      <label for=""> توضیحات</label>
      <RichEditor v-model="brandDataLang.seoFieldLangDto.description" />
    </div>
    <div class="inputgroup">
      <label for="">توضیحات سئو </label>
      <RichEditor v-model="brandDataLang.seoFieldLangDto.seoDescription" />
    </div>

    <div class="btn-box flex justify-end p-2">
      <button
        class="bg-green-700 hover:bg-green-800 p-2 px-4 w-[100px] text-white"
        @click="submitInfo"
      >
        ثبت
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const brandData = ref({});
const toast=useToast()
const brandDataLang = ref({
  brandId: route?.params?.id,
  seoFieldLangDto: {
    languageId: 3,
    seoH1: "",
    seoMinDescription: "",
    seoDescription: "",
    seoTitle: "",
    seoPictureAlt: "",
    summary: "",
    description: "",
    name: "",
    id: 0,
  },
});

onMounted(() => {
  getbrandItem(route?.params?.id);
});

const getbrandItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/brand/lang", {
      method: "GET",
      headers,
      query: {
        brandId: id,
      },
    });
    if (data?.list) {
        
      brandDataLang.value.seoFieldLangDto = (data?.list.find((item) => item.languageId == 3) || 
       {
          languageId: 3,
          seoH1: "",
          seoMinDescription: "",
          seoDescription: "",
          seoTitle: "",
          seoPictureAlt: "",
          summary: "",
          description: "",
          name: "",
          id: 0,
        
      })
    }
    console.log("data");
    console.log(data);
  } catch (error) {
    console.log(error);
    // navigateTo("/login")
  }
};
const loading=ref(false)

const submitInfo = async () => {
  // console.log(newbrand.value);
      if(loading.value)
    return
  loading.value=true
  try {
    const headers = useRequestHeaders(["cookie"]);
    const insert = await $fetch("/api/brand/lang", {
      method: "POST",
      body: brandDataLang.value,
      headers: {
        Accept: "application/json",
      },
    });
    
    if (insert?.isSuccess == true) {
      navigateTo("/brand");
    } else {
      insert?.messages.forEach((element) => {
        toast.add({description:element?.item1,color:'red'});
      });
    }
  } catch (error) {
    console.log("ERROR:" + error);
  } finally {
  }
  loading.value=false
};
</script>

<style scoped lang="scss">
.inputgroup {
  padding: 10px;
  display: flex;
  flex-direction: column;
  input {
    padding: 5px;
    margin-top: 5px;
  }
}
</style>
