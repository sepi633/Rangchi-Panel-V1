<template>
  <div class="space-y-4">
    <div class="w-full border border-gray-200 rounded-lg p-4 spa shadow-md">
      <h4>لطفا دسته بندی مورد نظر خود را انتخاب کنید .</h4>
      <ProductCategory :categoris="categoris" v-model="categoryId" />
      <div
        @click="getBaseExcel"
        class="w-1/2 border border-blue-500 text-bold bg-blue-400 hover:shadow-lg p-2 rounded-md my-3 mx-auto flex justify-center cursor-pointer"
      >
        <span v-if="allowToReqGet"> دریافت اکسل محصولات </span>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(90 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(135 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(180 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(225 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(270 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(315 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
        </svg>
      </div>
    </div>

    <div
      v-if="choseCategory"
      class="w-full border border-gray-200 rounded-lg p-4 space-y-4 shadow-md"
    >
      <h4>راهنمای کد برند جهت وارد کردن در اکسل</h4>
      <GlobalCombobox
        :options="brandList?.list"
        v-model="brandId"
        placeholder="انتخاب برند"
      />
      <div>
        کد برند :
        {{ brandId }}
      </div>
    </div>
    <!-- <div v-if="choseCategory"
      class="w-full border border-gray-200 rounded-lg p-4 space-y-4 shadow-md"
    >
      <UploadStaticUploadImage />
    </div> -->
    <div
      class="w-full border border-gray-200 rounded-lg p-4 space-y-4 shadow-md"
    >
      <h4>تغییرات را درون اکسل دریافتی اعمال کرده و فایل نهایی را آپلود کنید .</h4>
      <div class="text-sm">
        <div class="font-bold">نکات قابل توجه :</div>
        <p>
         . تنها قیمت و  موجودی درون اکسل قابل تغییر است
        </p>
      </div>
      <label
        for="uploadExcel"
        class="w-1/2 border border-green-500 text-bold bg-green-400 hover:shadow-lg p-2 rounded-md my-3 mx-auto flex justify-center cursor-pointer"
      >
        <span v-if="allowToReq"> آپلود </span>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(90 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(135 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(180 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(225 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(270 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(315 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
        </svg>
      </label>
      <input type="file" id="uploadExcel" @change="uploadFile" class="hidden" />
    

    </div>
  </div>
</template>
<script setup>
const {
  public: {  baseUrl,productcategoryId },
} = useRuntimeConfig();
const choseCategory = ref(false);
const categoris = ref([]);
const categoryId = ref("");
const toast = useToast();
const brandId = ref();
const brandList = ref();
const allowToReq = ref(true);
const allowToReqGet = ref(true);
onMounted(() => {
  getCategoryItem();
});

const getCategoryItem = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/catItem", {
      method: "GET",
      headers,

      query: {
        id: productcategoryId,
      },
    });
    categoris.value = data.data;
  } catch (error) {
    // navigateTo("/login")
  }
};

async function getBaseExcel() {
  if (!allowToReqGet.value) return;
  allowToReqGet.value = true;
  try {
    if ((categoryId.value + "").length > 0) {
      let res = await $fetch(
        `/api/productExcel/productExcel`,
        {method:'get',
          query:{
            CategoryId:categoryId.value
          }
        }
      );
      toast.add({description:    "عملیات با موفقیت انجام شد لطفا منتظر دانلود اکسل بمانید .",color:'green'}
      );
      const url = URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      link.click();
    } else {
      console.log("333333333333333");

      toast.add({description:"لطفا دسته بندی مورد نظر را انتخاب کنید .",color:'red'});
    }
  } catch (error) {
    toast.add({description:"مشکلی پیش آمده است .",color:'red'});
  }
  allowToReqGet.value = true;
}

async function uploadFile(event) {
  if (!allowToReq.value) return;
  allowToReq.value = false;
  let file = event.target.files[0];
  let cookie = useCookie("key");
  let formData = new FormData();
  formData.append("exel", file);
  try {
    let res = await $fetch(`${baseUrl}/api/Admin/ProductsExel`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "AUTHORIZATION":`Bearer ${cookie.value}`
            },
      body: formData,
    });
    if (res.isSuccess) {
      toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
    } else {
      console.log(res.data);

      res.data?.forEach((item) => {
        toast.add({description:item,color:'red'});
      });
      res.messages?.forEach((item) => {
        toast.add({description:item.item1,color:'red'});
      });
    }
  } catch (error) {
    console.log(error);

    toast.add({description:"مشکلی پیش آمده است .",color:'red'});
  }
  event.target.files=null
  allowToReq.value = true;
}
</script>
