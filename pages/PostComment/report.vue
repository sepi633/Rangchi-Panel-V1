<template>
  <div class="p-8">

    <UCard>
      <template #header>
        <div class="flex flex-wrap gap-4">
          <UFormGroup class="w-full" label="دسته بندی" name="name">
            <USelectMenu
            v-model="catId"
            :options="cats"
             :loading="loadingcat"
    searchable
    placeholder="جستجوی دسته بندی..."
    option-attribute="name"
    trailing
    value-attribute="id"
          />
        </UFormGroup>
          <UFormGroup class="flex-1" label="مقاله" name="name">
            <USelectMenu
            v-model="postId"
             :loading="loading"
    :searchable="search"
    placeholder="جستجوی مقاله..."
    option-attribute="name"
        value-attribute="id"

    trailing

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
const {public:{postCategoryId}}=useRuntimeConfig()
const posts = ref([]);
const fromDate = ref();
const toDate = ref();
const postId = ref();
const catId=ref()
const unreadCount = ref(0);
const successCount = ref(0);
const rejectCount = ref(0);
watch([() => fromDate.value, () => toDate.value, () => postId.value,()=>catId.value], async () => {
  await loadData1();
  await loadData2();
  await loadData3();
});

const loading = ref(false)
const loadingcat = ref(false)
const cats=ref([])



async function loadData1() {
  try {
    let res = await $fetch("/api/postComment/comments", {
      method: "GET",
      query: {
        fromCreateDate: fromDate.value,
        toCreateDate: toDate.value,
        postId: postId.value,
         CategoryId:catId.value,
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
    let res = await $fetch("/api/postComment/comments", {
      method: "GET",
      query: {
        fromUpdateDate: fromDate.value,
        toUpdateDate: toDate.value,
        postId: postId.value,
        CategoryId:catId.value,
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
    let res = await $fetch("/api/postComment/comments", {
      method: "GET",
      query: {
        fromUpdateDate: fromDate.value,
        toUpdateDate: toDate.value,
        postId: postId.value,
         CategoryId:catId.value,
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

async function getposts() {
  try {
    let res = await $fetch("/api/post/posts", {
      method: "GET",
      query: {
        pageIndex: 1,
        pageSize: 6000,
        Guild:false
      },
    });
    posts.value = res?.list?.map(item=>{return{id:item.id,name:item.name}});
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
async function getCategory() {
  try {
    let res = await $fetch("/api/category/menu", {
      method: "GET",
      query: {
        id:postCategoryId
      },
    });
    let list=flattenWithParentNames(res?.data?.children || [])
    console.log(list);
    
    cats.value=list
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

async function search(q ) {

  loading.value = true

  const posts= await $fetch('/api/post/posts', { params: { q ,categoryId:catId.value} })
let minipost=posts?.list?.map(item=>{return {id:item.id,name:item.name} })
  loading.value = false
  
  return minipost
}


watch(catId,()=>{
  search()
})

onMounted(() => {
  getposts();
  getCategory()
});




function flattenWithParentNames(nodes, parentName = '') {
  let result = [];

  for (const node of nodes) {
    const fullName = parentName ? `${parentName} - ${node.name}` : node.name;

    result.push({
      id: node.id,
      name: fullName,
    });

    if (node.children && node.children.length > 0) {
      result = result.concat(flattenWithParentNames(node.children, fullName));
    }
  }

  return result;
}

</script>
