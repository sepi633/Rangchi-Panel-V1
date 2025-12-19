<template>
  <div class="p-4">
    <div
      class="w-full flex flex-wrap p-2 shadow-md rounded-md border border-gray-400"
    >
</div>
    <div
      v-for="(item, index) in productItemsfullList"
      class="lg:w-1/3 md:w-1/2 border gap-1 p-1 rounded"
    >
      <div class="flex">
        <p>{{ item?.varity?.name }} :</p>
        <p>{{ item?.varityItem?.name }}</p>
      </div>
      <p>قیمت پایه:{{ parseInt(item?.basePrice).toLocaleString() }}</p>
      <p>تعداد:{{ item?.quantity }}</p>
      <button
        class="flex justify-center bg-red-700 text-[#fff] w-full rounded"
        @click="removeProductItem(index)"
      >
        حذف
      </button>
    </div>
  </div>
</template>
<script setup>
const productItemsfullList=ref([])
</script>
