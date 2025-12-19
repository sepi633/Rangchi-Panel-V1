<template>
    <section class="p-6 sm:p-10 space-y-6">
      <div class="title relative py-2"></div>
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <h1>مدیریت  ویژگی ها</h1>
            <div class="flex justify-end">
              <UButton
                  icon="i-heroicons-plus-small"
                  size="sm"
                  color="primary"
                  square
                  variant="solid"
                 to="/Feature/insertnew"
                />
            </div>
          </div>
        </template>
  
        <UTable :rows="filter?.list" :columns="columns">
          <template #actions-data="{ row }">
            <UDropdown :items="Actions(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
          <template #featureItems-data="{ row }">
            <div class="flex flex-wrap gap-2 max-w-8/12">
                <div class="max-w-96 text-wrap" v-for="(feature,index) in row?.featureItems">
                  {{index>0 ? '  -  ' :''}}  {{feature.name}}
                </div>
            </div>
          </template>
         
          <template #active-data="{ row }">
            <UIcon
              :class="[row.active ? 'text-green-400' : 'text-red-400', 'w-8 h-8']"
              size="lg"
              :name="
                row.active
                  ? 'i-heroicons-check-16-solid'
                  : 'i-heroicons-x-mark-16-solid'
              "
            />
          </template>
        </UTable>
        <template #footer>
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <span class="text-sm leading-5">
                ردیف
                <span class="mx-2 font-bold">{{ pageFrom }}</span>
                تا
                <span class="mx-2 font-bold">{{ pageTo }}</span>
                از
                <span class="mx-2 font-bold">{{ filter.totalCount }}</span>
                مورد
              </span>
            </div>
  
            <UPagination
              v-model="filter.pageIndex"
              :page-count="filter.pageSize"
              :total="filter.totalCount"
              :ui="{
                wrapper: 'flex items-center flex-row-reverse gap-1',
                rounded: '!rounded-full min-w-[32px] justify-center',
                default: {
                  activeButton: {
                    variant: 'outline',
                  },
                },
              }"
            />
          </div>
        </template>
      </UCard>
      <ModalDelete v-if="openDeleteModal" @closeModal="()=>{openDeleteModal=false}" @haneler="deleteItem" />

    </section>
  </template>
  
  <script setup>
  import moment from "jalali-moment";
  const openDeleteModal =ref(false)
  const selected = ref({})
const toast=useToast()
  const columns = [
    {
      key: "name",
      label: "نام",
    },
   
    {
      key: "featureItems",
      label: "آیتم های ویژگی",
    },
   
  
    {
      key: "actions",
    },
  ];
  
  const filter = ref({
    totalCount: 0,
    pageIndex: 1,
    pageSize: 15,
    // IsHide:false
  });
  const pageFrom = computed(() => {
    return (filter.value.pageIndex - 1) * filter.value.pageSize + 1;
  });
  const pageTo = computed(() => {
    return filter.value.pageIndex * filter.value.pageSize + 1;
  });
  const Actions = (row) => [
    [
      {
        label: "ویرایش",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => navigateTo(`/Feature/insert${row?.id}`),
      },
    ],
    [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
    [
      {
        label: "اضافه کردن آیتم",
        icon: "i-heroicons-list-bullet-20-solid",
        click: () => navigateTo(`/featuresitem?id=${row?.id}&isGroup=false`),
      },
    ],
   
  ];
  

  watch([()=>filter.value.pageIndex],async ()=>{
    await loadData()
  })
  
  async function loadData(){
      try {
        let config=JSON.parse(JSON.stringify(filter.value))
        delete config.list
        console.log(config);
        let res =await $fetch('/api/feature/features',{
            method:'GET',
            query:config
          })
          filter.value=res
      } catch (error) {
          console.log(error);
          
        if(error?.response?._data?.message)
              toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
            else
            toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
          }
  }
  
const deleteItem = async () => {
  try {

    const res = await $fetch('/api/feature/feature', {
      method: 'DELETE',
      query:{
        id: selected.value?.id
      }
    })
    if(res.isSuccess){
        toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
        showDeleteModal.value=false
        pageLoader()
    }else{
        res.messages.forEach((el)=>{
          toast.add({description:el.item1,color:'red'})
        })
    }  

  } catch (error) {
console.log(error)
    toast.add({description:"مشکلی پیش امده دوباره تلاش کنید .",color:'red'});

  
  }

}
  onMounted(()=>{
      loadData()
  })
  </script>
