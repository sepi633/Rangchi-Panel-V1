<template>
  <div class="p-8">

    <UCard>
      <template #header>
        <div class="flex gap-4">
            <UFormGroup class="flex-1 flex gap-1" label=" نوع فرم">
           <select class="border h-[40px] mx-2" v-model="contactUsGroupId">
                <option :value="null">همه</option>
                <option v-for="item in groupList?.data" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
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
      
    </div>
  </UCard>
</div>
</template>
<script setup>

const contactUsGroupId = ref();
const fromDate = ref();
const toDate = ref();
const groupList=ref()
const unreadCount = ref(0);
const successCount = ref(0);
watch([() => fromDate.value, () => toDate.value, () => contactUsGroupId.value], async () => {
  await loadData1();
  await loadData2();
});

async function loadData1() {
  try {
    let res = await $fetch("/api/contactus/contactus", {
      method: "GET",
      query: {
        fromCreateDate: fromDate.value,
        toCreateDate: toDate.value,
        contactUsGroupId: contactUsGroupId.value,
        status:false,
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
    let res = await $fetch("/api/contactus/contactus", {
      method: "GET",
      query: {
        fromUpdateDate: fromDate.value,
        toUpdateDate: toDate.value,
        contactUsGroupId: contactUsGroupId.value,
        status: true,
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

async function getGroupList() {
  try {
    const data = await $fetch("/api/contactusGroup/contactusGroups", {
      method: "GET",
    });

    groupList.value = data;
  } catch (error) {
    // navigateTo("/login")
  }
}

onMounted(async () => {
  await getGroupList();
});
</script>
