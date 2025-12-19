<template>
  <div class="p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div class="">
          <div class="flex justify-between">

            <p class="mb-3 font-semibold">مدیریت فرم تماس با ما</p>
            <UButton
            icon="i-heroicons-document-chart-bar"
            size="sm"
            color="gray"
            square
            variant="solid"
            to="/contactreport"
            />
          </div>
            <div class="flex gap-2">
            <div class="flex gap-2 flex-wrap items-center">
              فیلتر :
              <select class="border h-[40px] mx-2" v-model="filter.contactUsGroupId">
                <option :value="null">همه</option>
                <option v-for="item in groupList?.list" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <UFormGroup class="" label="وضعیت">
              <USelect v-model="filter.status" :options="[{name:'همه',value:null},{name:'غیرفعال',value:false},{name:'فعال',value:true}]" option-attribute="name" value-attribute="value">
              </USelect>
            </UFormGroup>
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
        <template #body-data="{ row }">
          <div class="whitespace-normal max-w-lg">
            {{ row.body }}
          </div>
        </template>
        <template #status-data="{ row }">
          <UIcon :class="[row.status ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.status?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

        </template>
        <template #file-data="{ row }">
            <NuxtLink :to="getFileUrl(row.file)" target="_blank" v-if="row.file">
              فايل
            </NuxtLink>
            <div v-else>
              ندارد
            </div>
        </template>
      </UTable>
      <FormContactSetActive @reload="loadData"  :selected="selected" v-model="openFormModal"/>
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
const {getFileUrl}=usePicture()
const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  contactUsGroupId: null,
  status:null
});
const groupList = ref({});
const { states, getCity } = useCity();
const loadCity = ref(false);
const cities = ref([]);
watch(
  () => filter.value.stateId,
  async () => {
    loadCity.value = true;
    cities.value = await getCity(filter.value.stateId);
    loadCity.value = false;
  }
);
const isNew = ref(true);
const selected = ref({});
const openFormModal = ref(false);
const openDeleteModal = ref(false);
const toast = useToast();

const columns = [
  {
  key: 'contactUsGroup.name',
  label: 'فرم'
  },
  {
    key: "fullName",
    label: "نام و نام خانوادگی",
  },
  {
    key: "mobile",
    label: "همراه",
  },
  {
    key: "email",
    label: "ایمیل",
  },
  {
    key: "title",
    label: "عنوان ",
  },
  {
    key: "body",
    label: "متن",
  },
  {
    key: "file",
    label: "فايل",
  },
  {
  key: 'status',
  label: 'وضعیت'
  },

  {
    key: "actions",
  },
];
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
      label: "تایید / عدم تایید",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => editForum(row),
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

watch([() => filter.value.pageIndex ,()=> filter.value.contactUsGroupId,()=>filter.value.status ], async () => {
  await loadData();
});

async function loadData() {
  try {
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    console.log(config);
    let res = await $fetch("/api/contactus/contactus", {
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
  await loadData();
  await getGroupList();
});
</script>
