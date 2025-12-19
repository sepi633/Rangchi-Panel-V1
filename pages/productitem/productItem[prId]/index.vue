<template>
  <div class="space-y-4">
    <div class="border rounded-md p-4 flex gap-4">
      <strong> انتخاب فروشنده : </strong>
      <select class="bg-white border p-1" name="" id="" v-model="storeId">
        <option value="">انتخاب کنید</option>
        <option :value="item?.id" v-for="item in storeList" :key="item?.id">
          {{ item?.name }}
        </option>
      </select>
    </div>
    <div>
      <div class="flex flex-wrap gap-4 p-4" v-if="showAllEdit">
        <!-- <p > تعداد : {{ item?.quantity }}</p>
                            <p class="ms-2"> قیمت پایه : {{ item?.basePrice?.toLocaleString() }} تومان</p>  -->
        <div class="">
          <label class="me-1" for="">تعداد :</label>
          <input type="text" name="" id="" v-model="allEdit.quantity" class="border" />
        </div>
        <div class="mt-1">
          <label class="me-1" for="">قیمت پایه :</label>
          <input type="text" name="" id="" v-model="allEdit.basePrice" class="border" />
        </div>

        <div class="mt-1">
          <label class="me-1" :for="index"> فعال :</label>
          <input
            type="checkbox"
            name=""
            :id="index"
            v-model="allEdit.active"
            class="border"
          />
        </div>
        <div
          class="bg-black text-white w-fit px-2 py-1 rounded"
          @click="showAllEdit = false"
        >
          انصراف
        </div>
        <div class="bg-orange-500 w-fit px-2 py-1 rounded" @click="changeAllPrice(false)">
          تغییر قیمت
        </div>
        <div class="bg-green-500 w-fit px-2 py-1 rounded" @click="changeAllPrice(true)">
          تغییر قیمت و ثبت اطلاعات
        </div>
      </div>

      <div
        class="bg-orange-500 w-fit px-2 py-1 rounded"
        v-if="!showAllEdit && items.length>0"
        @click="showAllEdit = true"
      >
        تغییر قیمت یکجا
      </div>
    </div>
    <div class="border rounded-md p-4 gap-4">
      <div
        v-for="(item, index) in items"
        class="m-1 relative rounded-[5px] w-full border p-2 bg-white"
      >
        <div
          class="flex lg:flex-nowrap flex-wrap w-full items-center h-full justify-between"
        >
          <div class="lg:w-2/6 ms-1 space-y-4">
            <p>
              {{ productInfo?.name }}
              <span v-show="item?.varietyItemId"
                >({{
                  item?.varietyItem?.name?.split("*")[0] ||
                  item?.varietyItem?.varietyName?.split("*")[0]
                }}
                -
                {{
                  item?.varietyItem2?.name?.split("*")[0] ||
                  item?.varietyItem2?.varietyName?.split("*")[0]
                }}
                )</span
              >
            </p>
            <!--  <p >نام فروشنده : {{ currentStore?.name }}</p> -->
          </div>
          <div class="lg:w-2/6">
            <!-- <p > تعداد : {{ item?.quantity }}</p>
                            <p class="ms-2"> قیمت پایه : {{ item?.basePrice?.toLocaleString() }} تومان</p>  -->
            <div class="">
              <label class="me-1" for="">تعداد :</label>
              <input type="text" name="" id="" v-model="item.quantity" class="border" />
            </div>
            <div class="mt-1">
              <label class="me-1" for="">قیمت پایه :</label>
              <input type="text" name="" id="" v-model="item.basePrice" class="border" />
            </div>
            <!-- <div class="input-box flex flex-col p-1 w-full ">
                              <label for="">  تاریخ انقضا:</label>                            
                               <DatePickerInput v-model="item.expireDateValue"  />
                            </div>   -->
            <div class="mt-1">
              <label class="me-1" :for="index"> فعال :</label>
              <input
                type="checkbox"
                name=""
                :id="index"
                v-model="item.active"
                class="border"
              />
            </div>
          </div>
          <NuxtLink
            class="btn btn-sm icon-btn flex bg-grag-100 border text-sm rounded p-1"
            :to="
              '/discount/insertnew?typeId=44&productItemId=' +
              item?.id +
              '&storeId=' +
              item?.storeId
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#333"
                d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"
              />
              <path
                fill="#333"
                d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"
              />
              <circle cx="7.25" cy="4.25" r="1.25" fill="currentColor" />
            </svg>
            تخفیف
          </NuxtLink>
          <!-- <button  v-if="item?.quantity > 0 && item?.basePrice " @click="()=>{modal.openModal();currentIndex=index;currentQuantity=item?.quantity;currentBasePrice=item?.basePrice}" class="btn lg:w-1/6 bg-orange-500   text-white p-1 rounded  mt-2 " >  ویرایش</button>
                        <button v-else @click="()=>{modal.openModal();currentIndex=index;currentQuantity=item?.quantity;currentBasePrice=item?.basePrice}" class="btn bg-green-700 text-white p-1 rounded lg:w-1/6 mt-2" >  افزودن</button>
                        -->
        </div>
        <!-- <div @click="removeItem(item?.id)" class=" flex justify-center cursor-pointer mt-2 bg-rose-200 p-1.5 border border-rose-500 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="min-w-[25x] bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>  حذف
                 
                </div> -->
      </div>
    </div>
    <div class="flex justify-end p-4">
      <button
        class="rounded bg-green-600 text-center px-4 py-2 text-white"
        @click="submitInfo"
      >
        ثبت اطلاعات
      </button>
    </div>

    <div
      class="w-10/12 mx-auto lg:w-96 p-4 text-center bg-green-600 text-white font-semibold"
      v-if="isnew"
      @click="isnew = false"
    >
      افزودن
    </div>
    <div class="p-4" v-else>
      <div class="border p-4 flex rounded-md items-center gap-4 shadow">
        <span> {{ varietyList1[0]?.varietyName }}: </span>
        <select class="bg-white border p-1" name="" id="" v-model="selectedVar1" multiple>
          <option :value="item" v-for="item in varietyList1" :key="item?.id">
            {{ item?.name }}
          </option>
        </select>
        <span> {{ varietyList2[0]?.varietyName }}: </span>
        <select class="bg-white border p-1" name="" id="" v-model="selectedVar2" multiple>
          <option :value="item" v-for="item in varietyList2" :key="item?.id">
            {{ item?.name }}
          </option>
        </select>
        <div class="">
          <label class="me-1" for="">تعداد :</label>
          <input type="text" name="" id="" v-model="selectedQuantity" class="border" />
        </div>
        <div class="mt-1">
          <label class="me-1" for="">قیمت پایه :</label>
          <input type="text" name="" id="" v-model="selectedPrice" class="border" />
        </div>
        <button
          class="rounded bg-green-600 text-center px-4 py-2 text-white"
          @click="addItem"
        >
          ایجاد
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const showAllEdit = ref(false);
const allEdit = ref({ basePrice: 0, quantity: 0 });
const isnew = ref(false);
const storeId = ref();
const items = ref([]);
const storeList = ref([]);
const route = useRoute();
const selectedVar1 = ref();
const selectedVar2 = ref();
const toast = useToast();
const productInfo = ref({});
const varietyList1 = ref([]);
const varietyList2 = ref([]);
const selectedPrice = ref(0);
const selectedQuantity = ref(1);

watch(storeId, () => {
  getData();
});
onMounted(async () => {
  await getStores();
  await getData();
  if (productInfo.value?.variety)
    varietyList1.value = await getVarietyItems(productInfo.value.variety?.id);
  if (productInfo.value?.variety2)
    varietyList2.value = await getVarietyItems(productInfo.value.variety2?.id);
    if(varietyList1?.value?.length==0 && items.value?.length==0){
    items.value=[{
              varietyItemId: null,
              varietyItem2Id: null,
              varietyItem: null,
              varietyItem2: null,
              basePrice: 0,
              active: true,
              quantity: 0,
              storeId: storeId.value,
            }]
  } 
});
async function getData() {
  try {
    let res = await $fetch("/api/productitem/productitems", {
      query: {
        productId: route.params.prId,
        OnlyExists: true,
        storeId: storeId.value,
      },
    });
    items.value = res?.data?.productItems;
    productInfo.value = res?.data?.product;
  } catch (error) {}
}

async function getStores() {
  try {
    const res = await $fetch("/api/store/store", {
      query: {
        PageIndex: 1,
        PageSize: 30,
      },
    });
    storeList.value = res?.list;
    storeId.value = res.list[0]?.id || null;
  } catch (error) {}
}

async function getVarietyItems(_varietyId) {
  try {
    let res = await $fetch("/api/varietyItem/varietyItems", {
      query: {
        varietyId: _varietyId,
        pageSize: 60000,
      },
    });
    return res?.list || [];
  } catch (error) {}
}

async function addItem() {
  // if(varietyList1?.value?.length>0 && selectedVar1.value?.length==0){
  //   toast.error('لطفا تنوع محصول اول را وارد نمایید')
  //   return
  // }
  // if(varietyList2?.value?.length>0 && selectedVar2.value?.length==0){
  //   toast.error('لطفا تنوع محصول دوم را وارد نمایید')
  //   return
  // }
  if (varietyList1?.value?.length > 0) {
    selectedVar1.value?.forEach((var1) => {
      if (varietyList2?.value?.length > 0) {
        selectedVar2.value?.forEach((var2) => {
          console.log(var1?.id, "---------", var2.id);
          let checkExist = items.value?.findIndex(
            (item) => item.varietyItemId == var1?.id && item.varietyItem2Id == var2?.id
          );
          if (checkExist < 0) {
            items.value.push({
              varietyItemId: var1?.id,
              varietyItem2Id: var2?.id,
              varietyItem: var1,
              varietyItem2: var2,
              basePrice: selectedPrice.value,
              active: true,
              quantity: selectedQuantity.value,
              storeId: storeId.value,
            });
          }
        });
      } else {
        let checkExist = items.value?.findIndex(
          (item) => item.varietyItemId == var1?.id && item.varietyItem2Id == null
        );
        if (checkExist < 0) {
          items.value.push({
            varietyItemId: var1?.id,
            varietyItem2Id: null,
            varietyItem: var1,
            varietyItem2: null,
            basePrice: selectedPrice.value,
            active: true,
            quantity: selectedQuantity.value,
            storeId: storeId.value,
          });
        }
      }
    });
  } else {
    items.value =[ {
      varietyItemId: null,
      varietyItem2Id: null,
      varietyItem: null,
      varietyItem2: null,
      basePrice: selectedPrice.value,
      active: true,
      quantity: selectedQuantity.value,
      storeId: storeId.value,
    }]
  }
  selectedVar1.value = null;
  selectedVar2.value = null;
  selectedPrice.value = 0;
  selectedQuantity.value = 1;
  isnew.value = true;
}

const submitInfo = async () => {
  try {
    const res = await $fetch("/api/productitem/productitem", {
      method: "POST",
      body: {
        productId: productInfo.value?.id,
        productItems: items.value,
        storeId: storeId.value,
      },
      query: {
        StoreId: storeId.value,
      },
    });

    if (res.isSuccess) {
      getData();
      toast.add({description:"با موفقیت انجام شد.",color:'green'});
    } else {
      toast.add({description:"ناموفق بود.",color:'red'});
    }
  } catch (error) {}
};

function changeAllPrice(submit = false) {
  items.value?.forEach((item) => {
    item.basePrice = allEdit.value.basePrice;
    item.active = allEdit.value.active;
    item.quantity = allEdit.value.quantity;
  });

  console.log(submit);
  if (submit) {
    submitInfo();
  }
}
</script>
