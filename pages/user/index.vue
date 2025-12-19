<template>
  <div class="p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>

          <div class="flex justify-between">
            <div class="flex gap-2">
              <p>کاربران</p>
            </div>
            <div class="flex justify-end gap-2">
              <!-- <UButton
              icon="i-heroicons-document-chart-bar"
              size="sm"
              color="gray"
              square
              variant="solid"
              to="/user/report"
              /> -->
              <UButton
              icon="i-heroicons-plus-small"
              size="sm"
              color="primary"
              square
              variant="solid"
              to="/user/insertnew"
              />
            </div>
          </div>
          <div class="flex gap-2 items-end">
            <!-- <UFormGroup class="flex-1" label="استان" >
              <BaseSelectMenu v-model="filter.stateId" :options="states" option-attribute="name" value-attribute="id">
              </BaseSelectMenu>
            </UFormGroup>
            <UFormGroup class="flex-1" label="شهر">
              <BaseSelectMenu v-model="filter.cityId" :options="cities" option-attribute="name" value-attribute="id" >
              </BaseSelectMenu>
            </UFormGroup>        -->
            <UFormGroup class="flex-1" label="جستجو">
            <UInput  v-model="filter.q" placeholder="جستجو ..."/>
            </UFormGroup>
          </div>
        </div>
      </template>

      <!-- @click="newForum" -->
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
        :route="'/api/user/user'"
        @reload="loadData"
        formTitle="کاربر"
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

    <div class="modal m-0" v-if="showUserStore">
      <div class="content p-3 rounded">
        <div class="modal-header py-2 border-b">
          <strong> ارتقا به فروشنده </strong>
          <div class="modal-body py-3">
            <div class="flex justify-between items-center">
              <p class="text-[15px] mb-2">
                فروشگاه های
                <span class="font-bold"> {{ currentSeller?.fullName }}</span>
              </p>
              <p
                @click="isAddStore = true"
                class="bg-sky-600 py-1 cursor-pointer text-white rounded px-2 flex items-center"
              >
                افزودن فروشگاه
              </p>
            </div>
            <div class="">
              <p
                v-for="(item, index) in userStores?.data"
                :key="index"
                class="flex py-2 justify-between"
              >
                {{ index + 1 }}.{{ item?.name }}

                <span
                  @click="removeStore(item?.id)"
                  class="flex cursor-pointer text-sm bg-gray-200 border border-gray-400 w-max p-1 rounded-full"
                >
                  حذف
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                    /></svg
                ></span>
              </p>
            </div>
            <div v-if="isAddStore">
              <div class="my-2 border-t pt-2">
                <div class="flex flex-row-reverse justify-between">
                  <p
                    @click="isAddStore = false"
                    class="text-sm text-red-700 mb-2 cursor-pointer"
                  >
                    نمی خواهم فروشگاهی اضافه کنم
                  </p>
                  <p class="text-sm mb-2">
                    نام فروشگاه مورد نظر را جستجو کنید:
                  </p>
                </div>
                <div class="border rounded p-1 flex">
                  <input
                    type="text"
                    placeholder="جستجوی فروشگاه"
                    class="w-full"
                    v-model="storeQ"
                    @keyup="
                      () => {
                        if (storeQ.length > 2) {
                          getStore();
                        } else {
                          storeResult = null;
                        }
                      }
                    "
                  />
                  <svg
                    v-if="storeLoading"
                    class="animate-spin m-1 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <ul class=" ">
                  <li
                    @click="
                      () => {
                        showAddstoreBox = true;
                        currentStore = item;
                        storeResult = null;
                        storeQ = '';
                        isAddStore = false;
                      }
                    "
                    v-for="item in storeResult?.list"
                    class="cursor-pointer bg-slate-200 rounded p-1 mt-1"
                    :key="item?.id"
                  >
                    {{ item?.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-if="showAddstoreBox"
              class="bg-sky-100 p-2 rounded mt-2 border border-sky-200"
            >
              <p>{{ currentStore?.name }} رو اضافه میکنی؟</p>
              <!-- <div>
                          <label for="isAxtStore">فعال </label><input v-model="isActiveUserStore" class=" ms-2" type="checkbox" name="" id="isAxtStore">
                         </div> -->
              <div class="flex justify-end mt-2">
                <button
                  class="btn bg-green-800 px-1 rounded text-white"
                  @click="
                    () => {
                      submitUserStore();
                      showAddstoreBox = false;
                    }
                  "
                >
                  بله
                </button>
                <button
                  class="btn bg-red-800 px-1 rounded ms-2 text-white"
                  @click="showAddstoreBox = false"
                >
                  خیر پشیمان شدم
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer flex justify-end items-center">
            <button
              class="btn cancel bg-red-500 m-2 text-white px-3 py-1 w-full lg:w-1/6 rounded"
              @click="
                () => {
                  showUserStore = false;
                  userStores = null;
                }
              "
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isNew = ref(true);
const selected = ref({});
const openFormModal = ref(false);
const openDeleteModal = ref(false);
const toast = useToast();
const showUserStore = ref(false);
const isActiveUserStore = ref(true);
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

const columns = [
  {
    key: "firstName",
    label: "نام",
  },
  {
    key: "lastName",
    label: "نام خانوادگی",
  },
  {
    key: "mobile",
    label: "موبایل",
  },
  // {
  // key: 'city.state.name',
  // label: 'استان'
  // }, 
  //   {
  // key: 'city.name',
  // label: 'شهر'
  // }, 
  {
    key: "roleName",
    label: "نقش",
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
  cityId:null,
  stateId:null
});
const {states,getCity}=useCity()
  const cities=ref([])
  watch(()=>filter.value.stateId,async()=>{
    cities.value=await getCity(filter.value.stateId)
  }) 
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
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo("/user/insert" + row.id),
    },
  ],
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteForum(row),
    },
  ],
  [
    {
      label: "لیست حساب های بانکی",
      icon: "i-heroicons-banknotes",
      click: () => navigateTo('/user/bankAccount-'+row.id),
    },
  ],
  [
    {
      label: "کیف پول",
      icon: "i-heroicons-wallet",
      click: () => navigateTo('/user/wallet-'+row.id),
    },
  ],
  [
    {
      label: "امتیازات",
      icon: "i-heroicons-sparkles",
      click: () => navigateTo('/user/score-'+row.id),
    },
  ],
  [
    {
      label: "افزودن فروشگاه",
      icon: "i-heroicons-building-storefront",
      click: () => {
    
          showUserStore.value = true;
          currentSeller.value = {...row};
          getStoreUser(row?.id);
      
      },
    },
  ],

];
// function select (row) {
//     selected.value=(row)
// }
function newForum() {
  openFormModal.value = true;
  isNew.value = true;
  selected.value = {};
}
function editForum(_item) {
  openFormModal.value = true;
  isNew.value = false;
  selected.value = { ..._item };
}

function deleteForum(_item) {
  openDeleteModal.value = true;
  selected.value = _item;
}

watch([() => filter.value.pageIndex,()=>filter.value.q,()=>filter.value.cityId,()=>filter.value.stateId], async () => {
  await loadData();
});

async function loadData() {
  if(loading.value)
  return
  try {
    loading.value=true
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    console.log(config);
    let res = await $fetch("/api/user/user", {
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

const getStoreUser = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/storeUser/storeuser", {
      method: "GET",
      headers,
      query: {
        UserId: id,
      },
    });

    userStores.value = data;
  } catch (error) {
    // navigateTo("/login")
  }
};
const submitUserStore = async () => {
  try {
    const data = await $fetch("/api/storeUser/storeuser", {
      method: "post",

      body: {
        storeId: currentStore.value?.id,
        userId: currentSeller.value?.id,
        active: true,
      },
    });

    //  userStores.value = data
    if (data?.isSuccess) {
      toast.add({description:"با موفقیت ثبت شد.",color:'green'});
      getStoreUser(currentSeller.value?.id);
    }
  } catch (error) {
    console.log(error);
    
    // navigateTo("/login")
  }
};
const removeStore = async (id) => {
  try {
    const data = await $fetch("/api/storeUser/storeuser", {
      method: "DELETE",

      body: {
        storeId: id,
        userId: currentSeller.value?.id,
        active: false,
      },
    });

    //  userStores.value = data
    if (data?.isSuccess) {
      toast.add({description:"با موفقیت حذف شد.",color:'green'});
      getStoreUser(currentSeller.value?.id);
    } else {
      data.messages.forEach((el) => {
        toast.add({description:el.item1,color:'red' });
      });
    }
  } catch (error) {
    // navigateTo("/login")
  }
};
const getStore = async () => {
    try {
      storeLoading.value = true;
      const headers = useRequestHeaders(["cookie"]);
  
      const data = await $fetch("/api/store/store", {
        method: "GET",
        headers,
        query: {
          Q: storeQ.value,
        },
      });
  
      storeResult.value = data;
      storeLoading.value = false;
    } catch (error) {
      // navigateTo("/login")
    }
  };
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
