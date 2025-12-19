<template>
  <div>

    <UModal v-model="isOpen" prevent-close >
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
            فرم گزینه سوال
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>
      <div class="text-right md:flex gap-2 items-center">

          <div class="input-box flex flex-col p-1">
              <label for=""> عنوان:</label>
            <input
            class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="data.value"
              id=""
            />
        </div>

          <div class="input-box flex flex-col p-1">
              <label for=""> اولویت نمایش:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="data.priority"
              id=""
              />
            </div>
           </div>
      <template #footer>
        <div class="flex items-center gap-4 justify-end">
            <UButton class="px-8" @click="isOpen = false" color="rose">
                لغو
            </UButton>
            <UButton
            class="px-8"
            @click="submit"
            color="green"
            :loading="loading"
            >
           {{isNew ? 'ثبت':'ویرایش'}}
        </UButton>
        </div>
    </template>
</UCard>
<UCard>
         <UTable  v-model:sort="sort"  :sort-mode="'manual'"  :rows="filter?.list" :columns="columns">
            <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>   
          </UTable>
       <UPagination v-model="filter.pageIndex" :page-count="filter.pageSize" :total="filter.totalCount" :ui="{
            wrapper: 'flex items-center flex-row-reverse gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }" />
          <FormDelete :route="'/api/form/questionOption'" formTitle="سوال" @reload="reload" :selectedId="selected?.id"
          v-model="openDeleteModal" />
</UCard>
</UModal>

</div>
</template>
<script setup>
const isOpen = defineModel();
const props = defineProps(["questionId"]);
const toast = useToast();
const emit = defineEmits(["reload"]);
const openDeleteModal=ref(false)
const isNew=ref(true)

const data=ref({
  "questionFormId": 0,
  "value": "",
  "priority": 0
})
const loading=ref(false)
const submit = async (type) => {
  if(loading.value)return
  loading.value=true
    try {
      let formData=JSON.parse(JSON.stringify(data.value))
      delete formData.type
      formData.questionFormId=props.questionId
      const insert = await $fetch("/api/form/questionOption", {
        method:isNew.value? "POST" :"PUT",
        body: formData,
      });

      if (insert.isSuccess) {
        toast.add({description:"عملیات با موفقیت انجام شد",color:'green'});
        
        filter.value=await loadData()
      } else {
        toast.add({description:insert?.messages[0]?.item1,color:'red' });
      }
    } catch (error) {
        console.log(error)
    } 

  loading.value=false
};
const selected=ref({})

const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Q: "",
  questionFormId: props.questionId,
  sortBy:7
})

  const sort = ref({ column: 'id', direction: 'asc' }) 
const columns = [
  {
    key: 'id',
    label: 'شناسه',
    sortable: true
  },
  {
    key: 'value',
    label: 'عنوان'
  },
  {
    key: 'priority',
    label: 'اولویت نمایش',
    sortable:true
  },
  {
    key: 'actions',
  }]

const {sortBy,pageFrom,pageTo,loadData}=useTable('/api/form/questionOptions',sort,filter)
const rows = ref([])
const Actions = (row) => [
  [{
    label: 'ویرایش',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {data.value=row;isNew.value=false}
  }],
  [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }]
]


watch([() => filter.value.pageIndex,()=>sortBy.value,()=>props.questionId,()=>isOpen.value], async () => {
  if(isOpen.value){
    console.log('77777777777777777777,----'+props.questionId );
   filter.value.questionFormId=props.questionId 
   
    filter.value=await loadData()
  }
})

async function reload(){
  filter.value=await loadData()
}

</script>
