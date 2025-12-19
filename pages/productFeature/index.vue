<template>
  <div class="p-6 sm:p-10">
    <div v-if="productFeaturesList?.length > 0">
      <div
        class="flex flex-wrap justify-between"
        v-for="item in productFeaturesList"
      >
        <div class="w-[49%] bg-[#fff] p-1 border mt-2 rounded">
          {{ item?.name }}
        </div>
        <div class="w-[49%] bg-[#fff] p-1 border mt-2 rounded">
          <span class="px-2" v-for="value in item?.productFeatureValues">
           
            <template v-if="item?.label == 'exp-date-pr'">
                <span>
                  {{ moment(value?.name,"YYYYMMDD").locale('fa').fromNow(true)}}
                </span>
            </template>

            <template v-else >
                <span>{{ value?.name || value?.featureItem?.name }}</span>
            </template>
            
          </span>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-[18px]">
      برای این محصول ویژگی وجود ندارد.
    </div>
    <div class="h-[1px] w-full bg-rose-500 my-4"></div>
    <div class="">


      <div
        class="acardeon bg-white my-2 rounded border image-box p-2"
        v-for="feature in allData"
        :key="item?.id"
      >
        <div
          class="title-box flex items-center justify-between"
          @click="acardeonHandler"
        >
          <span> {{ feature?.name }}</span>
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
              d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.51FeatureType_Item1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="body-box flex flex-wrap p-2 items-center">
          <div class="w-full my-1">
            <label
              v-if="feature?.typeId == FeatureType_Item"
              class="block mx-2"
              :for="featureItem?.id"
              v-for="featureItem in feature?.featureItems"
            >
              <input
                :id="featureItem?.id"
                v-model="feature.value"
                type="checkbox"
                :value="featureItem?.id"
                name=""
                id=""
              />
              {{ featureItem?.name }}
            </label>

            <input
              v-model="feature.value"
              v-if="feature?.typeId == FeatureType_SmallText"
              type="text"
              class="border block w-full"
            />
            <RichEditor
              v-model="feature.value"
              v-if="feature?.typeId == FeatureType_LargeText"
            />
          </div>
        </div>
      </div>

      <Paging
        class="w-full"
        :pageCount="Math.ceil(allData?.totalCount /  allData?.pageSize)"
        :pageIndex="allData?.pageIndex"
        @getPageNummber="
          (n) => {
            defaultData.PageIndex = n;
            pageLoader();
          }
        "
      ></Paging>
    </div>
    <button
      @click="submitInfo()"
      class="btn bg-[#136b57] mt-5 text-white p-2 border border-[#136b57] rounded w-full flex items-center justify-center"
    >
      {{ $t("confirm") }}
    </button>
  </div>
</template>

<script setup>
import moment from 'jalali-moment'
const toast=useToast()
const FeatureType_Item=39
const FeatureType_LargeText=27
const FeatureType_SmallText=26
const allData = ref([]);
const route = useRoute();
const defaultData = ref({
  CategoryId: route.query.catId,
  CategoryLabel: "",
  Q: null,
  PageIndex: 1,
  SortBy: 0,
  Available: true,
});
const productFeaturesList = ref([]);

const acardeonHandler = (event) => {
  let isOpen = true;
  const parent = event.target.closest(".acardeon ");
  const classList = parent.children[1].classList;
  for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    ;
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
onMounted(async () => {
  await pageLoader();
  await getProductFeature();
});
const getProductFeature = async () => {
  try {
    const response = await $fetch("/api/productFeature/productFeature", {
      method: "GET",
      query: {
        id: route.query.prId,
      },
    });
    productFeaturesList.value = response.list || [];
    allData.value.forEach((item) => {
      let index = productFeaturesList.value.findIndex((el) => el.id == item.id);
      if (index == -1) {
        if (item.typeId ==FeatureType_Item) {
          item.value = [];
        } else {
          item.value = "";
        }
      } else {
        if (item.typeId ==FeatureType_Item) {
             item.value = productFeaturesList.value[
            index
          ].productFeatureValues.map((item) => item.featureItem.id);
        } else {
          item.value =
            productFeaturesList.value[index].productFeatureValues[0].name;
        }
      }


     
    }); console.log(allData.value,'[[[[')
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const pageLoader = async () => {
  try {
    const response = await $fetch("/api/categoryFeature/categoryFeature", {
      method: "GET",
      query: {
        catId: route.query.catId,
      },
    });

    let data = response.data.map((item) => item.features).flat();

    allData.value = data;
    console.log(allData,'[[[[[[[[[ pageloader')
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const submitInfo = async () => {
  let data = [];
  allData.value.forEach((item) => {
    if (item.value) {
      if (item.typeId == FeatureType_Item) {      
           item.value.forEach((el) => {
          data.push({
            name: null,
            productId: route.query.prId,
            featureItemId: el,
            featureId: item.id,
          });
        });
      } else {
        data.push({
          name: item.value,
          productId: route.query.prId,
          featureItemId: null,
          featureId: item.id,
        });
      }
    }
  });

  try {
    const headers = useRequestHeaders(["cookie"]);
    const insert = await $fetch("/api/productFeature/productFeature", {
      method: "PUT",
      body: {
        productId: route.query.prId,
        productFeatures: data,
      },
      headers: {
        Accept: "application/json",
      },
    });

    ;
    if (insert.isSuccess) {
      toast.add({description:'عملیات با موفقیت انجام شد .',color:'green'})
      getProductFeature();
    }
  } catch (error) {
    toast.add({description:'عملیات با موفقیت انجام شد .',color:'red'})
  }
};
</script>

<style>
.childs li:last-child span {
  display: none;
}
</style>
