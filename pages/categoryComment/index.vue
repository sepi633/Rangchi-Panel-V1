<template>
  <section class="p-6 sm:p-10 space-y-6">
    <div class="title relative py-2"></div>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1>مدیریت کامنت دسته بندی</h1>
          <div class="flex justify-end">
            <UButton
              icon="i-heroicons-document-chart-bar"
              size="sm"
              color="gray"
              square
              variant="solid"
              to="/categoryComment/report"
            />
          </div>
        </div>
      </template>

      <UTable  v-model:sort="sort"
        :sort-mode="'manual'" :rows="filter?.list" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="Actions(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
        <template #text-data="{ row }">
          <div class="max-w-96 text-wrap">
            {{ row.text }}
          </div>
        </template>
        <template #statusId-data="{ row }">
          <div>
            <span class="text-[#2cbff4]" v-if="row.statusId == 1"
              >بررسی نشده</span
            >
            <span class="text-[green]" v-else-if="row.statusId == 2"
              >تایید شده</span
            >
            <span class="text-[#961212]" v-else-if="row.statusId == 3"
              >رد شده</span
            >
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
        <template #pin-data="{ row }">
          <UIcon
            :class="[row.pin ? 'text-green-400' : 'text-red-400', 'w-8 h-8']"
            size="lg"
            :name="
              row.pin
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
  </section>
</template>

<script setup>
import moment from "jalali-moment";
const toast = useToast();
const sort = ref({ column: "likeCount", direction: "asc" });
const columns = [
  {
    key: "categoryName",
    label: "نام دسته بندی",
  },
  {
    key: "createDate",
    label: "تاریخ",
  },
  // {
  //   key: "rate",
  //   label: "امتیاز",
  // },
 {
    key: "likeCount",
    label: "لایک",
    sortable: true,
  },
  {
    key: "disLikeCount",
    label: " دیسلایک"
  },
  {
    key: "title",
    label: " عنوان",
  },
  {
    key: "text",
    label: " کامنت",
  },
  {
    key: "user.fullName",
    label: " کاربر",
  },
  {
    key: "statusId",
    label: "وضعیت",
  },
  {
    key: "pin",
    label: "پین شده",
  },

  {
    key: "actions",
  },
];

const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
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
      click: () => navigateTo(`/categoryComment/${row.id}`),
    },
  ],
];
const sortBy = computed(() => {
  if (sort.value.column == "likeCount" && sort.value.direction == "desc") {
    return 4;
  } else if (
    sort.value.column == "likeCount" &&
    sort.value.direction == "asc"
  ) {
    return 5;
  }
});
watch([() => filter.value.pageIndex, () => sortBy.value], async () => {
  await loadData();
});

async function loadData() {
  try {
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    config.sortBy = sortBy.value;
    console.log(config);
    let res = await $fetch("/api/categoryComment/comments", {
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
}

onMounted(() => {
  loadData();
});
</script>
