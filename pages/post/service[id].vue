<template>
  <div class="p-6 sm:p-10 space-y-6">
    <strong>انتخاب محصول مرتبط به بلاگ </strong
    ><span class="bg-white p-2 rounded border px-3">{{ defaultData?.id }}</span>
    <div class="selected flex flex-wrap">
      <div
        class="bg-white m-3 relative rounded border h-[45px] min-w-[90px] px-3 flex justify-center items-center"
        v-for="(item, index) in list"
        :key="item"
      >
        <button
          class="btn absolute left-[-15px] top-[-15px] bg-red-100 w-[30px] h-[30px] flex justify-center items-center border rounded border-red-400"
          @click="remove(index)"
        >
          <svg
            data-v-b76ad084=""
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              data-v-b76ad084=""
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            ></path>
            <path
              data-v-b76ad084=""
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            ></path>
          </svg>
        </button>
        {{ item.name }}
      </div>
    </div>
    <div class="submit-box flex flex-wrap justify-end w-full">
      <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white rounded"
        @click="submitInfo()"
      >
        ثبت
      </button>
    </div>
    <hr />
    <br />
    <strong>همه محصولات ها </strong>
    <div class="filter flex flex-wrap">
      <div class="w-full flex">
        <input class="p-2 rounded border w-full" v-model="Q" type="text" name="" id="" />
        <button
          class="bg-green-700 text-white p-2 px-4 rounded border hover:shadow"
          @click="getProduct(Q)"
        >
          جستجو
        </button>
      </div>
    </div>

    <div class="serivices bg-white rounded border overflow-hidden">
      <div
        class="service-item border-b p-3 flex item-center"
        v-for="item in allProduct?.list"
        :key="item?.id"
      >
        <input class="me-3 hidden" type="checkbox" name="" :id="item?.id" />
        <label
          class="block mx-1 cursor-pointer"
          @click="add2list(item)"
          :for="item?.id"
          >{{ item?.name }}</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const allProduct = ref();
const list = ref([]);
const Q = ref("");
const defaultData = ref({});
onMounted(() => {
  defaultData.value.id = route.params.id;
  getPostProduct();
  getProduct();
});

const add2list = (item) => {
  if (list.value.length > 0) {
    let isAdd = true;
    list.value.forEach((element, index) => {
      if (element.id == item.id) {
        isAdd = false;
        list.value.splice(index, 1);
      }
    });

    if (isAdd == true) {
      list.value.push({ id: item.id, name: item.name });
    }
  } else list.value.push({ id: item.id, name: item.name });
};

const remove = (index) => {
  list.value.splice(index, 1);
};

const getPostProduct = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/post/postProduct", {
      method: "GET",
      headers,
      query: { id: route.params.id },
    });

    defaultData.value = data.data;
    list.value = data?.data?.products;
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getProduct = async (name) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/product/products", {
      method: "GET",
      headers,
      query: {
        Q: name,
      },
    });

    allProduct.value = data;
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const submitInfo = async () => {
  defaultData.value.products = list.value;

  try {
    const headers = useRequestHeaders(["cookie"]);
    const insert = await $fetch("/api/post/postProduct", {
      method: "POST",
      body: defaultData.value,
      headers: {
        Accept: "application/json",
      },
    });

    // pageLoader()
    ;
    navigateTo("/post");
  } catch (error) {
    ;
  }
};
</script>
