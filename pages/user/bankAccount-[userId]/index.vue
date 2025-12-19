<template>
  <div class="p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>

          <div class="flex justify-between">
            <div class="flex gap-2">
              <p>حساب های بانکی کاربر</p>
            </div>
            <UButton
              icon="i-heroicons-plus-small"
              size="sm"
              color="primary"
              square
              variant="solid"
              :to="`/user/bankAccount-${route.params.userId}/insertnew`"
              />
          </div>
        </div>
      </template>

      <!-- @click="newForum" -->
      <UTable :rows="filter?.list" :columns="columns" v-model:expand="expand">
        <template #actions-data="{ row }">
          <UDropdown :items="Actions(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
        
             <template #expand="{ row }">
      <div class="space-y-4">
        <div class="flex gap-2"><strong>شماره حساب</strong><span>{{row.accountNumber}}</span></div>
        <div class="flex gap-2"><strong>شماره کارت</strong><span>{{row.cartNumber}}</span></div>
        <div class="flex gap-2"><strong>شماره شبا</strong><span>{{row.shebaNumber}}</span></div>
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


      <FormUserCategory :userId="selected?.id" v-model="showCatUser" />
      <FormDelete
        :route="'/api/UserBankAccount/UserBankAccount'"
        @reload="loadData"
        formTitle="حساب بانکی"
        :selectedId="selected.id"
        v-model="openDeleteModal"
      />
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

  </div>
</template>

<script setup>
const isNew = ref(true);
const selected = ref({});
const openFormModal = ref(false);
const openDeleteModal = ref(false);
const toast = useToast();
const expand = ref({
  openedRows: [],
  row: {}
})
const storeQ = ref("");
  const userStores = ref();
  const storeResult = ref();
const showAddstoreBox = ref(false);
const currentSeller = ref();
const currentStore = ref();
const storeLoading = ref();
const showCatUser=ref(false)
const roles = ref([]);
const isAddStore = ref(false);
const route=useRoute()
const columns = [
  {
    key: "bankName",
    label: "نام بانک",
  },
  {
    key: "actions",
  },
];
const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  q:'',
  userId:route.params.userId,});

const loading=ref(false)
const pageFrom = computed(() => {
  return (filter.value.pageIndex - 1) * filter.value.pageSize + 1;
});
const pageTo = computed(() => {
  return filter.value.pageIndex * filter.value.pageSize + 1;
});
const rows = ref([]);
const Actions = (row) => [
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteForum(row),
    },
  ],

];

function newForum() {
  openFormModal.value = true;
  isNew.value = true;
  selected.value = {};
}

function deleteForum(_item) {
  openDeleteModal.value = true;
  selected.value = _item;
}

watch([() => filter.value.pageIndex,()=>filter.value.q], async () => {
  await loadData();
});

async function loadData() {
  if(loading.value)
  return
  try {
    loading.value=true
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    config.userId=route.params.userId
    console.log(config);
    let res = await $fetch("/api/UserBankAccount/UserBankAccounts", {
      method: "GET",
      query: config,
    });
    filter.value = res;
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({
        description: error?.response?._data?.message,
        title: "خطا !",
        color: "red",
      });
    else
      toast.add({
        description: "مشکلی پیش آمده است .",
        title: "خطا !",
        color: "red",
      });
  }
  loading.value=false
}

onMounted(() => {
  loadData();
});

</script>
<style>
.modal{
  background-color: #0000006b;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  margin: 0 !important;
  .content{
      background-color: #fff;;
      max-width: 500px;
      width: 100% !important;
      width: max-content;
     
  }
}
</style>
