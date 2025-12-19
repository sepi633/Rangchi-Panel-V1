<template>
  <div>
    <div class="bg-green-100 p-3 rounded border border-green-700">
      <p class="text-sm">
        توجه داشته باشید !<br />
        با ویرایش تنوع محصول تمامی آیتم های محصول مربوط به تنوع محصول قبلی
        <strong>حذف</strong> میشود .
      </p>
    </div>
    <div class="acardeon content-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span> {{ $t("Information") }} </span>
        <svg
          width="17"
          height="11"
          viewBox="0 0 17 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="body-box flex flex-wrap p-2 items-start hidden">
        <div class="flex flex-wrap lg:w-2/3">
          <!-- <div class="input-box flex flex-col lg:w-1/6 p-1">
            <label for="">شناسه پدر:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              readonly
              v-model="newPost.categoryId"
              id=""
            />
          </div> -->
          <!-- <div class="input-box flex flex-col lg:w-1/6 p-1">
            <label for=""> موضوع :</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.subject"
              id=""
            />
          </div> -->
          <div class="input-box flex flex-col lg:w-5/6 p-1">
            <label for="">{{ $t("title") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.name"
              id=""
              :class="[
                route.params.id != 'new'
                  ? ' pointer-events-none opacity-[.6] cursor-not-allowed'
                  : '',
              ]"
            />
          </div>

          <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">تنوع محصول:</label>

            <select
              name=""
              id=""
              v-model="newPost.varietyId"
              class="p-2 bg-white border"
            >
              <option :value="null">انتخاب نشده</option>
              <option
                :value="item?.id"
                v-for="item in varityList?.list"
                :key="item?.id"
              >
                {{ item?.name }}
              </option>
            </select>
          </div>
          <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">تنوع محصول:2</label>

            <select
              name=""
              :class="[
                newPost.varietyId == null
                  ? ' pointer-events-none opacity-[.6] cursor-not-allowed'
                  : '',
              ]"
              id=""
              v-model="newPost.variety2Id"
              class="p-2 bg-white border"
            >
              <option :value="null">انتخاب نشده</option>
              <option
                :value="item?.id"
                v-for="item in varityList?.list"
                :key="item?.id"
              >
                {{ item?.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class=" flex justify-end">
      <button
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        @click="goBack"
      >
        {{ $t("cancel") }}
      </button>

      <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white"
        @click="submitInfo"
      >
        {{ $t("confirm") }}
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const varityList = ref();

const newPost = ref({
  id: 0,
  name: "",
  summary: "",
  description: "",
  seoH1: "",
  seoMinDescription: "",
  seoDescription: "",
  seoTitle: "",
  seoPictureAlt: "",
  seoUrlText: "",
  seoNoIndex: true,
  seoNoFollow: true,
  seoCanonical: "",
  categoryId: null,
  brandId: null,
  pictureId: null,
  statusId: 0,
  typeId: 9,
  codeValue: "",
  quantity: 0,
  price: 0,
  varietyId: null,
  sellLimitCount: null,
  productLabel: "",
  categoryIds: [],
  secondName: "",
  active: true,
  productPictures: null,
});
const toast = useToast();
onMounted(async () => {
  await pageLoader();
  await getVarity();
});
const pageLoader = async () => {
  console.log("[[[i ]]]");
  try {
    const data = await $fetch("/api/product/productItem", {
      method: "GET",
      query: {
        postId: route.params.id,
      },
    });
    console.log("[[[ ]]]", data);
    if (data.isSuccess) {
      newPost.value = data?.data;
    }
  } catch (error) {}
};
const getVarity = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/variety/variety", {
      method: "GET",

      query: { pageIndex: 1, pageSize: 40 },
    });

    varityList.value = data;
  } catch (error) {
    // navigateTo("/login")
  }
};
const acardeonHandler = (event) => {
  let isOpen = true;
  const parent = event.target.closest(".acardeon ");
  const classList = parent.children[1].classList;
  for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    if (element == "hidden") {
      isOpen = false;
    } else {
      isOpen = true;
    }
  }
  if (isOpen == false) {
    parent.children[1].classList.remove("hidden");
  } else {
    parent.children[1].classList.add("hidden");
  }
};
const submitInfo = async () => {
  
  try {
    let res = {};

    res = await $fetch("/api/product/ProductChangeVariety", {
      method: "put",
      body: newPost.value,
    });

    if (res.isSuccess) {
      toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
      goBack();
    } else {
      res.messages.forEach((element) => {
        toast.add({description:element.item1,color:'red'});
      });
    }
  } catch (error) {
    toast.add({description:"مشکلی پیش امده است دوباره تلاش کنید.",color:'red'});
  }

};
const goBack = () => {
  useRouter().go(-1);
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

input:focus {
  box-shadow: unset !important;
  border: 1px solid #d9d9d9;
  outline: unset;
}
</style>
