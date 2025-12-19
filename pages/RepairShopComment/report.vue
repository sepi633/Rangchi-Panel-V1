<template>
  <div class="p-8">

    <UCard>
      <template #header>
        <div class="flex gap-4">
          <UFormGroup class="flex-1" label="سرویسکار" name="name">
       <USelectMenu
            v-model="repairShopId"
             :loading="loading"
    :searchable="search"
    placeholder="جستجوی سرویسکار..."
    option-attribute="name",
    value-attribute="id"
    

          />
        </UFormGroup>
        <UFormGroup class="flex-1 flex gap-1" label="از تاریخ">
          <div class="flex">
            <date-picker locale="fa" type="dateTime" v-model="fromDate"></date-picker>
            <UIcon
            @click="fromDate = null"
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            />
          </div>
        </UFormGroup>
        <UFormGroup class="flex-1 flex gap-1" label="تا تاریخ">
          <div class="flex">
            <date-picker locale="fa" type="dateTime" v-model="toDate"></date-picker>
            <UIcon
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            @click="toDate = null"
            />
          </div>
        </UFormGroup>
      </div>
    </template>
    
    <div>
      <div class="flex gap-4">
        <div class="font-bold text-lg">تعداد پیام های خوانده نشده</div>
        :
        <div>
          {{ unreadCount }}
        </div>
      </div>
      <div class="flex gap-4">
        <div class="font-bold text-lg">تعداد پیام های خوانده تایید شده</div>
        :
        <div>
          {{ successCount }}
        </div>
      </div>
      <div class="flex gap-4">
        <div class="font-bold text-lg">تعداد پیام های خوانده رد شده</div>
        :
        <div>
          {{ rejectCount }}
        </div>
      </div>
    </div>
  </UCard>
</div>
</template>
<script setup>

const repairShops = ref([]);
const fromDate = ref();
const toDate = ref();
const repairShopId = ref();
const unreadCount = ref(0);
const successCount = ref(0);
const rejectCount = ref(0);
watch([() => fromDate.value, () => toDate.value, () => repairShopId.value], async () => {
  await loadData1();
  await loadData2();
  await loadData3();
});

async function loadData1() {
  try {
    let res = await $fetch("/api/RepairShopComment/comments", {
      method: "GET",
      query: {
        fromCreateDate: fromDate.value,
        toCreateDate: toDate.value,
        RepairShopId: repairShopId.value,
        status: 0,
      },
    });
    unreadCount.value = res?.totalCount;
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({
        description: error?.response?._data?.message,
        title: "خطا !",
        color: "red",
      });
    else toast.add({ description: "مشکلی پیش آمده است .", title: "خطا !", color: "red" });
  }
}
async function loadData2() {
  try {
    let res = await $fetch("/api/RepairShopComment/comments", {
      method: "GET",
      query: {
        fromUpdateDate: fromDate.value,
        toUpdateDate: toDate.value,
        RepairShopId: repairShopId.value,
        status: 1,
      },
    });
    successCount.value = res?.totalCount;
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({
        description: error?.response?._data?.message,
        title: "خطا !",
        color: "red",
      });
    else toast.add({ description: "مشکلی پیش آمده است .", title: "خطا !", color: "red" });
  }
}
async function loadData3() {
  try {
    let res = await $fetch("/api/RepairShopComment/comments", {
      method: "GET",
      query: {
        fromUpdateDate: fromDate.value,
        toUpdateDate: toDate.value,
        RepairShopId: repairShopId.value,
        status: 2,
      },
    });
    rejectCount.value = res?.totalCount;
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({
        description: error?.response?._data?.message,
        title: "خطا !",
        color: "red",
      });
    else toast.add({ description: "مشکلی پیش آمده است .", title: "خطا !", color: "red" });
  }
}
const loading=ref(false)
async function search(q) {
  try {
    
    loading.value=true
    let res = await $fetch("/api/repairshop/repairshops", {
      method: "GET",
      query: {
        pageIndex: 1,
        pageSize: 6000,
        Guild:false,
        q:q
      },
    });
    loading.value=false
    let list=res.list?.map(item=>{return {id:item.id, name:item.name+'('+(item.city?.name?(item.city?.name+'-'):'')+(item.city?.state?.name||'')+')'}}) || []
    console.log(res);
    
    return list
  } catch (error) {
    console.log(error);
    
  }
 
}

</script>
