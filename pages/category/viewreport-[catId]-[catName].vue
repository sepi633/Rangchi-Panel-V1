<template>
    <div class="p-8">
  <UCard>
    <div class="w-full">
      <h1 class="font-bold text-lg my-4">گزارش {{ route.params.catName }}</h1>
      <UTable class="w-full" :columns="cols" :rows="detailList"> </UTable>
    </div>
  </UCard>
</div>
</template>
<script setup>
const route = useRoute();
const detailList = ref([]);
const toast = useToast();
const cols = ref([
  {
    key: "name",
    label: "قسمت",
  },
  //     {
  //     key:'',
  //     label:''
  // },
  {
    key: "count",
    label: "تعداد بازدید",
  },
]);
async function getDetailList() {
  try {
    let res = await $fetch("/api/categoryDetail/categoryDetails", {
      method: "GET",
      query: {
        pageSize: 2000,
      },
    });
    let data = res.list || [];
    detailList.value = data;
    await getCounts();
  } catch (error) {}
}

async function getCounts() {
  try {
    const promises = detailList.value.map(async (item) => {
      let res = await $fetch("/api/categoryDetailValue/categoryDetailValues", {
        method: "GET",
        query: {
          pageSize: 1,
          categoryDetailId: item.id,
          categoryId: route.params.catId,
        },
      });
      item.count = res.list?.[0]?.visitCount || 0;
    });

    await Promise.all(promises);
  } catch (error) {
    toast.add({ title: "خطا در دریافت شمارش‌ها" });
  }
}

onMounted(() => {
  getDetailList();
});
</script>
