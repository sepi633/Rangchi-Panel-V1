<template>
  <UModal v-model="isOpen" prevent-close fullscreen>
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            لیست رزروهای نمایندگی
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>
      <UCard>
        <div class="items-center gap-2">
          <UForm :state="formData" class="px-8 flex flex-wrap gap-2">
            <UFormGroup class="w-max" label="کاربر" name="name">
              <UserSearch v-model="formData.userId" />
            </UFormGroup>
            <UFormGroup class="w-1/2" label="خودرو" name="name">
              <USelect
                v-model="formData.userCategoryId"
                :options="categoryList"
                option-attribute="category.name"
                value-attribute="id"
                type="number"
              />
            </UFormGroup>
            <UFormGroup class="w-1/2" label="نوبت" name="agencyWorkHourId">
              <USelect
                v-model="formData.agencyWorkHourId"
                :options="times"
                option-attribute="name"
                value-attribute="id"
                type="number"
              />
            </UFormGroup>
            <UFormGroup class="w-1/2" label="خدمت" name="agencyAssistanceId">
              <USelect
                v-model="formData.agencyAssistanceId"
                :options="assistances"
                option-attribute="assistanceName"
                value-attribute="id"
                type="number"
              />
            </UFormGroup>

            <UFormGroup class="w-max" label="پیش پرداخت" name="name">
              <UInput v-model="formData.prePayPrice" />
            </UFormGroup>
            <UFormGroup class="w-max" label="مبلغ نهایی" name="name">
              <UInput v-model="formData.finalPrice" />
            </UFormGroup>

            <UFormGroup class="w-max" label="رزرو" name="name">
              <UCheckbox v-model="formData.isReserved" />
            </UFormGroup>
            <UFormGroup class="w-max" label="جزییات رزرو" name="name">
              <UInput v-model="formData.detail" />
            </UFormGroup>
            <UFormGroup class="w-max" label="کنسل" name="name">
              <UCheckbox v-model="formData.isCanceled" />
            </UFormGroup>
            <UFormGroup class="w-max" label="جزییات کنسلی" name="name">
              <UInput v-model="formData.cancelDetail" />
            </UFormGroup>
            <UFormGroup class="w-max" label="اولویت" name="name">
              <UInput type="number" v-model="formData.priority" />
            </UFormGroup>
                                <UFormGroup class="w-max" label="وضعیت" name="name">
                        <USelect :options="statuses" value-attribute="id" option-attribute="name" v-model="formData.statusId"> 
          
                        </USelect>         
                               </UFormGroup>
          </UForm>
          <UFormGroup class="">
            <UButton @click="submit">افزودن</UButton>
          </UFormGroup>
        </div>
      </UCard>

      <UCard class="mt-4">
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
          <template #isReserved-data="{ row }">
            <UIcon
              :class="[row.isReserved ? 'text-green-400' : 'text-red-400', 'w-8 h-8']"
              size="lg"
              :name="
                row.isReserved
                  ? 'i-heroicons-check-16-solid'
                  : 'i-heroicons-x-mark-16-solid'
              "
            />
          </template>
          <template #isCanceled-data="{ row }">
            <UIcon
              :class="[row.isCanceled ? 'text-green-400' : 'text-red-400', 'w-8 h-8']"
              size="lg"
              :name="
                row.isCanceled
                  ? 'i-heroicons-check-16-solid'
                  : 'i-heroicons-x-mark-16-solid'
              "
            />
          </template>
          <template #serviceDay-data="{ row }">
            <div>
              {{
                row.agencyWorkHour?.agencyWorkDay?.serviceDay
                  ? moment(row?.agencyWorkHour?.agencyWorkDay?.serviceDay)
                      .locale("fa")
                      .format("YYYY/MM/DD")
                  : ""
              }}
            </div>
          </template>
        </UTable>
        <FormDelete
          route="/api/AgencyWorkHour/hour"
          formTitle="روز"
          @reload="loadData"
          :selectedId="selected.id"
          v-model="openDeleteModal"
        />
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
      </UCard>
    </UCard>
    {{ agencyId }}
  </UModal>
</template>

<script setup>
import moment from "jalali-moment";
const {
  public: { carCategoryId },
} = useRuntimeConfig();
const statuses=ref( [
    {
      "label": "AgencyReserveStatus_Waiting",
      "value": "در انتظار",
      "name": "در انتظار",
      "id": 64
    },
    {
      "label": "AgencyReserveStatus_Progress",
      "value": "در حال انجام",
      "name": "در حال انجام",
      "id": 65
    },
    {
      "label": "AgencyReserveStatus_Finish",
      "value": "انجام شده",
      "name": "انجام شده",
      "id": 66
    }
  ])
const times = ref([]);
const isOpen = defineModel();
const props = defineProps(["agencyWorkDayId", "agencyId"]);
const assistances = ref([]);
const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  sortBy: 7,
});
const formData = ref({
  userId: 0,
  userCategoryId: 0,
  agencyWorkHourId: 0,
  agencyId: 0,
  agencyAssistanceId: 0,
  isReserved: true,
  isCanceled: false,
  cancelDetail: "",
  detail: "",
  prePayPrice: 0,
  finalPrice: 0,
  stateId: 0,
  statusId: 64,
  priority: 0,
});
const isNew = ref(true);
const selected = ref({});
const openDeleteModal = ref(false);
const toast = useToast();
const loading = ref(false);
const categoryList = ref([]);
const loadCategory = ref(false);
const columns = [
  {
    key: "agency.name",
    label: "نمایندگی",
  },
  {
    key: "serviceDay",
    label: "تاریخ",
  },
  {
    key: "agencyWorkHour.fromHour",
    label: "از ساعت",
  },
  {
    key: "agencyWorkHour.toHour",
    label: "تا ساعت",
  },
  {
    key: "agencyAssistance.assistanceName",
    label: "خدمت",
  },
  {
    key: "user.fullName",
    label: "کاربر",
  },
  {
    key: "userCategory.category.name",
    label: "خودرو",
  },
  {
    key: "isReserved",
    label: "رزرو شده ",
  },
  {
    key: "isCanceled",
    label: "کنسل شده",
  },
  {
    key: "status.name",
    label: " وضعیت",
  },
  {
    key: "priority",
    label: "اولویت",
  },
  {
    key: "actions",
  },
];

const validate = (formData) => {
  const errors = [];
  if (!formData.agencyAssistanceId)
    errors.push({
      path: "agencyAssistanceId",
      message: "وارد کردن خدمت الزامی است",
    });

  return errors;
};

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
      click: () => {
        isNew.value = false;
        formData.value = { ...row };
      },
    },
  ],
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        selected.value = row;
        openDeleteModal.value = true;
      },
    },
  ],
];

watch([() => filter.value.pageIndex, () => props.agencyWorkDayId], async () => {
  await loadData();
});

async function loadData() {
  try {
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    config.agencyWorkDayId = props.agencyWorkDayId;
    console.log(config);
    let res = await $fetch("/api/agencyreserve/agencyreserves", {
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

async function submit() {
  if (loading.value) return;
  else {
    loading.value = true;
    formData.value.agencyWorkDayId = props.agencyWorkDayId;
    formData.value.agencyId = props.agencyId;
    try {
      let res = await $fetch("/api/agencyreserve/agencyreserve", {
        method: isNew.value ? "POST" : "PUT",
        body: formData.value,
      });
      if (res.isSuccess) {
        toast.add({
          description: " عملیات با موفقیت انجام شد .",
          color: "green",
        });
        await loadData();
        formData.value = {
          agencyWorkDayId: 0,
          serviceCount: 0,
          fromHour: 0,
          toHour: 0,
          active: true,
          stateId: 64,
        };
        isNew.value = true;
      } else {
        res.messages.forEach((el) => {
          toast.add({ description: el.item1, color: "red" });
        });
      }
    } catch (error) {
      toast.add({
        description: "مشکلی پیش آمده است .",
        title: "خطا !",
        color: "red",
      });
    }
    loading.value = false;
  }
}

watch(
  () => formData.value.userId,
  async () => {
    loadCategory.value = true;
    await getUserCategory();
    loadCategory.value = false;
  }
);

async function getUserCategory() {
  try {
    let res = await $fetch("/api/usercategory/usercategorys", {
      query: {
        UserId: formData.value.userId,
      },
    });
    categoryList.value = res.list;
  } catch (error) {}
}

watch(
  () => props.agencyWorkDayId,
  () => {
    gettimes();
  }
);

async function gettimes() {
  try {
    let res = await $fetch("/api/AgencyWorkHour/hours", {
      method: "GET",
      query: {
        agencyWorkDayId: props.agencyWorkDayId,
        pageSize: 50,
      },
    });
    res.list?.forEach((item) => {
      item.name = `از ساعت ${item.fromHour} تا ساعت ${item.toHour}`;
    });
    times.value = res.list;
  } catch (error) {
    console.log(error);
  }
}

async function getassistance() {
  try {
    let res = await $fetch("/api/AgencyAssistance/AgencyAssistances", {
      method: "GET",
      query: {
        pageSize: 500,
        AgencyId: props.agencyId,
      },
    });
    console.log("444444444444440", res);

    assistances.value = res?.list;
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  await getassistance();
});
</script>
