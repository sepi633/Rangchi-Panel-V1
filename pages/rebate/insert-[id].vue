<template>
  <div class="tabs">
    <div class="head">
      <button
        @click="isGeneral = true"
        :class="[isGeneral ? 'bg-rose-300' : '']"
        class="general-btn bg-gray-200 p-2 rounded m-2"
      >
        عمومی
      </button>

      <button
        @click="isGeneral = false"
        :class="[isGeneral == false ? 'bg-rose-300' : '']"
        class="custome-btn bg-gray-200 p-2 rounded m-2"
      >
        تخصصی
      </button>
    </div>
    <div class="body">
      <div v-if="isGeneral" class="general">
        <div class="formField bg-white border p-3">
          <label for="">عنوان :</label>
          <input class="border ms-1 p-1" v-model="pageData.name" />
        </div>
        <div class="formField bg-white border p-3">
          <label for="">کدتخفیف :</label>
          <input class="border ms-1 p-1" v-model="pageData.codeValue" />
        </div>
        <div class="formField bg-white border p-3">
          <label for=""> حداقل میزان خرید برای این کد تخفیف :</label>
          <input class="border ms-1 p-1" v-model="pageData.minCartPrice" />
        </div>
        <div class="bg-white border p-3">
          <input
            type="checkbox"
            name=""
            id="isPrice"
            @change="pageData.isPriceRebate = !pageData.isPriceRebate"
            :checked="pageData?.isPriceRebate == true"
          />
          <label class="ps-1" for="isPrice">تخفیف مبلغی</label>
        </div>
        <div class="formField bg-white border p-3">
          <label for="">میزان تخفیف :</label>
          <input class="border ms-1 p-1" v-model="pageData.priceValue" />
          <span v-if="pageData?.isPriceRebate == true" class="ms-1"> تومان</span>
          <span v-else class="ms-1"> % </span>
        </div>
        <!-- <div class="formField  bg-white border p-3">
                <label for="">عنوان :</label>
                <input  class="border ms-1 p-1" v-model="pageData.name" >
          </div> -->
        <div class="bg-white border p-3">
          <input
            type="checkbox"
            name=""
            id="active"
            @change="pageData.active = !pageData.active"
            :checked="pageData?.active == true"
          />
          <label class="ps-1" for="active"> فعال</label>
        </div>
        <div class="formField bg-white border p-3">
          <label for="">تاریخ:</label>
          <date-picker v-model="dateRange" @change="setDate" type="date" range />
        </div>
        <div class="formField bg-white border p-3">
          <label for="">دفعات مجاز :</label>
          <input class="border ms-1 p-1" v-model="pageData.useCount" />
        </div>
        <!-- <button @click="()=>{}">yes</button> -->

        <div class="formField bg-white border p-3 mt-[5px]">
          <button
            @click="
              () => {
                navigateTo('/rebate');
              }
            "
            class="bg-gray-700 hover:bg-gray-800 me-1 p-2 text-white rounded w-[200px] block"
          >
            انصراف
          </button>
          <button
            class="bg-green-700 hover:bg-green-800 p-2 text-white rounded w-[200px] block"
            v-if="$route.params.id == 'new'"
            @click="submite"
          >
            افزودن
          </button>
          <NuxtLink
            to="/rebate"
            class="bg-blue-700 hover:bg-blue-800 p-2 text-white rounded w-[200px] block"
            v-else
          >
            ویرایش</NuxtLink
          >
        </div>
      </div>

      <div v-else class="custome bg-white p-2">
        <div class="formField bg-white border p-3">
          <label for="">عنوان :</label>
          <input class="border ms-1 p-1" v-model="CustompageData.name" />
        </div>
        <div class="formField bg-white border p-3">
          <label for="">کدتخفیف :</label>
          <input class="border ms-1 p-1" v-model="CustompageData.codeValue" />
        </div>
        <div class="formField bg-white border p-3">
          <label for=""> حداقل میزان خرید برای این کد تخفیف :</label>
          <input class="border ms-1 p-1" v-model="CustompageData.minCartPrice" />
        </div>
        <div class="bg-white border p-3">
          <input
            type="checkbox"
            name=""
            id="isPrice"
            @change="CustompageData.isPriceRebate = !CustompageData.isPriceRebate"
            :checked="CustompageData?.isPriceRebate == true"
          />
          <label class="ps-1" for="isPrice">تخفیف مبلغی</label>
        </div>
        <div class="formField bg-white border p-3">
          <label for="">میزان تخفیف :</label>
          <input class="border ms-1 p-1" v-model="CustompageData.priceValue" />
          <span v-if="CustompageData?.isPriceRebate == true" class="ms-1"> تومان</span>
          <span v-else class="ms-1"> % </span>
        </div>
        <!-- <div class="formField  bg-white border p-3">
                <label for="">عنوان :</label>
                <input  class="border ms-1 p-1" v-model="pageData.name" >
          </div> -->
        <div class="bg-white border p-3">
          <input
            type="checkbox"
            name=""
            id="active"
            @change="CustompageData.active = !CustompageData.active"
            :checked="CustompageData?.active == true"
          />
          <label class="ps-1" for="active"> فعال</label>
        </div>
        <div class="formField bg-white border p-3">
          <label for="">تاریخ:</label>
          <date-picker
            v-model="dateRangecustom"
            @change="setDatecustom"
            type="date"
            range
          />
        </div>
        <div class="formField bg-white border p-3">
          <label for="">دفعات مجاز :</label>
          <input class="border ms-1 p-1" v-model="CustompageData.useCount" />
        </div>
        <!-- <button @click="()=>{}">yes</button> -->
        <div class="flex">
          <div class="w-1/3 p-1">
            <div class="relative">
              <label class="flex" for="">
                <LoadingTinyLoading
                  v-if="loading.user == true"
                  class="bg-blue-700 ml-2"
                />
                انتخاب کاربر
              </label>
              <input
                class="border mt-1 p-1 w-full"
                type="text"
                name=""
                id=""
                @keyup="
                  () => {
                    if (usersQ.length > 3) {
                      getUser(usersQ);
                    }
                  }
                "
                v-model="usersQ"
              />
              <div
                v-if="users?.list?.length > 0"
                class="input-resualt w-full p-1 bg-gray-100 overflow-y-scroll"
              >
                <span
                  class="flex border-b p-2"
                  v-for="(item, index) in users?.list"
                  :key="item?.id"
                  @click="
                    () => {
                      CustompageData.userId = item?.id;
                      users = null;
                      usersQ = item?.fullName;
                    }
                  "
                >
                  <!-- {{index+1}}.getUser(usersQ)} -->
                  {{ item?.fullName }}</span
                >
              </div>
            </div>
          </div>
          <div class="w-1/3 p-1 hidden">
            <div class="relative">
              <label class="flex" for="">
                <LoadingTinyLoading
                  v-if="loading.category == true"
                  class="bg-blue-700 ml-2"
                />

                انتخاب دسته بندی</label
              >
              <input
                class="border mt-1 p-1 w-full"
                v-model="catQuery"
                @keyup="
                  () => {
                    if (catQuery.length > 3) {
                      getCategory(catQuery);
                    }
                  }
                "
                type="text"
                name=""
                id=""
              />
              <div
                v-if="categoryData?.list?.length > 0"
                class="input-resualt w-full p-1 bg-gray-100 overflow-y-scroll"
              >
                <span
                  @click="
                    () => {
                      CustompageData.categoryItemId = item?.id;
                      categoryData = null;
                      catQuery = item.name;
                    }
                  "
                  class="flex border-b p-2"
                  v-for="item in categoryData?.list"
                  :key="item?.id"
                >
                  {{ item?.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="w-1/3 p-1">
            <div class="relative">
              <label class="flex" for="">
                <!-- <LoadingTinyLoading v-if="loading.user == true" class="bg-blue-700 ml-2" /> -->

                انتخاب محصول</label
              >
              <input
                class="border mt-1 p-1 w-full"
                type="text"
                v-model="productQ"
                @keyup="getProduct(productQ)"
                name=""
                id=""
              />
              <div
                v-if="allProduct?.list.length > 0"
                class="input-resualt w-full p-1 bg-gray-100 overflow-y-scroll h-[300px]"
              >
                <span
                  class="flex border-b p-2"
                  v-for="item in allProduct?.list"
                  :key="item?.id"
                  @click="
                    () => {
                      CustompageData.productId = item?.id;
                      allProduct = null;
                      productQ = item?.name;
                    }
                  "
                >
                  {{ item?.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="formField bg-white border p-3 mt-[5px]">
          <button
              v-if="$route.params.id == 'new'"
            @click="
              () => {
                navigateTo('/rebate');
              }
            "
            class="bg-gray-700 hover:bg-gray-800 me-1 p-2 text-white rounded w-[200px] block"
          >
            انصراف
          </button>
          <button
            class="bg-green-700 hover:bg-green-800 p-2 text-white rounded w-[200px] block"
            v-if="$route.params.id == 'new'"
            @click="submite"
          >
            افزودن
          </button>
          <NuxtLink
            to="/rebate"
            class="bg-blue-700 hover:bg-blue-800 p-2 text-white text-center rounded w-[200px] block"
            v-else
          >
            بازگشت</NuxtLink
          >
        </div>
      </div>
      <div class="custome"></div>
    </div>
  </div>
</template>

<script setup>
const isGeneral = ref(true);
const route = useRoute();
const dateRange = ref();
const dateRangecustom = ref();
const usersQ = ref();
const users = ref({});
const userId = ref();
const allProduct = ref();
const productId = ref();
const productQ = ref();
const showResualt = ref(false);
const isTime = ref(false);
const showDatePicker = ref(false);
const toggleReserve = ref("suggestedDate");
const dateSelected = ref("");
const isTimeFree = ref("");
const toast = useToast();
const catQuery = ref("");

const categoryData = ref();
const loading = ref({
  user: false,
  category: false,
  product: false,
});
const pageData = ref({
  // "id": 0,
  name: "",
  codeValue: "",
  priceValue: 0,
  startDatetime: "",
  endDatetime: "",
  isPriceRebate: true,
  active: true,
  useCount: 1,
  minCartPrice:null
  // "productId": 0,
  // "categoryItemId": 0,
  // "userId": 0
});
const CustompageData = ref({
  // "id": 0,
  name: "",
  codeValue: "",
  priceValue: 0,
  startDatetime: "",
  endDatetime: "",
  isPriceRebate: true,
  active: true,
  useCount: 1,
  productId: null,
  categoryItemId: null,
  userId: null,
  minCartPrice:null
});

onMounted(() => {
  // getUser();
  // getProduct();

  if (route.params.id != "new") {
    pageLoader(route.params.id);
  }
});
const getUser = async (name) => {
  try {
    loading.value.user = true;
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/user/user", {
      method: "GET",
      headers,
      query: {
        roleId: 1,
        q: name,
      },
    });

    users.value = data;
    ;
    ;

    loading.value.user = false;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getUserItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/user/userItem", {
      method: "GET",
      headers,
      query: {
        userId: id,
      },
    });

    usersQ.value = data.data.firstName + " " + data.data.lastName;
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const getCategory = async (cQ) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/categoryItem/category", {
      method: "GET",
      headers,
      query: {
        Q: cQ,
      },
    });

    ;
    ;
    categoryData.value = data;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getCategoryItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/categoryItem/categoryItem", {
      method: "GET",
      headers,
      query: {
        catId: id,
      },
    });

    // usersQ.value = data.data.firstName + " " + data.data.lastName
    catQuery.value = data.data.name;
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getProduct = async (name) => {
  try {
    const data = await $fetch("/api/product/products", {
      method: "GET",

      query: {
        Q: name,
      },
    });
    ;
    allProduct.value = data;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getProductItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/product/productItem", {
      method: "GET",
      headers,
      query: {
        postId: id,
      },
    });

    // usersQ.value = data.data.firstName + " " + data.data.lastName
    productQ.value = data.data.name;
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const pageLoader = async (id) => {
  try {
    const response = await $fetch("/api/rebate/rebateItem", {
      method: "GET",
      query: {
        id: id,
      },
    });

    if (response.isSuccess) {
      if (
        response?.data?.categoryItemId != null ||
        response?.data?.userId != null ||
        response?.data?.productId != null
      ) {
        CustompageData.value = response?.data;
        dateRangecustom.value = [
          CustompageData.value.startDatetime,
          CustompageData.value.endDatetime,
        ];
        isGeneral.value = false;
        if (response?.data?.userId) {
          getUserItem(response?.data?.userId);
        }
        if (response?.data?.categoryItemId) {
          getCategoryItem(response?.data?.categoryItemId);
        }
        if (response?.data?.productId) {
          getProductItem(response?.data?.productId);
        }
      } else {
        pageData.value = response?.data;
        dateRange.value = [pageData.value.startDatetime, pageData.value.endDatetime];
        isGeneral.value = true;
      }
    }
    // ;
    // ;
  } catch (error) {
    ;
  }
};
const setDate = () => {
  ;
  pageData.value.startDatetime = dateRange.value[0];
  pageData.value.endDatetime = dateRange.value[1];
};
const setDatecustom = () => {
  ;
  CustompageData.value.startDatetime = dateRangecustom.value[0];
  CustompageData.value.endDatetime = dateRangecustom.value[1];
};
const submite = async () => {
  if (route.params.id == "new") {
    if (isGeneral.value == true) {
      ;
      try {
        const headers = useRequestHeaders(["cookie"]);
        const insert = await $fetch("/api/rebate/rebate", {
          method: "POST",
          body: pageData.value,
          headers: {
            Accept: "application/json",
          },
        });

        // pageLoader()
        ;
        if (insert.isSuccess == true) {
          navigateTo("/rebate");
        } else {
          toast.add({description:`${insert.messages[0].item1}`,color:'red'});
        }
      } catch (error) {
        ;
      }
    } else {
      ;
      try {
        const headers = useRequestHeaders(["cookie"]);
        const insert = await $fetch("/api/rebate/rebate", {
          method: "POST",
          body: CustompageData.value,
          headers: {
            Accept: "application/json",
          },
        });

        // pageLoader()
        ;
        if (insert.isSuccess == true) {
          navigateTo("/rebate");
        } else {
       toast.add({description:`${insert.messages[0].item1}`,color:'red'});
        }
      } catch (error) {
        ;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.formField {
  display: flex;

  label {
    width: 300px;
    display: block;
  }
}

.active {
  background: rgb(2, 75, 170);
  color: white;
}
</style>
