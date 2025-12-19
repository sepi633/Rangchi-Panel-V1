<template>
    <div class=" p-6 sm:p-10 space-y-6">
        <UCard>
            <template #header>
                <div class="flex justify-between">
                    <p>
                        مدیریت تخفیفات</p>
                    <div class="flex justify-end">

                    </div>
                </div>
            </template>

            <UTable :rows="filter?.list" :columns="columns">
                <template #actions-data="{ row }">
                    <UDropdown :items="Actions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
                <template #discount-data="{ row }">
                    <div>
                        {{ row?.percent }}% ({{ row?.discountGroup?.name }})
                    </div>
                </template>
                <template #endDate-data="{ row }">
                    <div>
                        {{ moment(row?.endDate).locale('fa').format('YYYY/MM/DD')}}
                    </div>
                </template>
                <template #productItemId-data="{ row }">
                    <div v-if="row?.productItem">
                       {{ row.productItem.productName }} ( {{ row?.productItem?.varietyItem?.varietyName}} : {{ row?.productItem?.varietyItem?.name }})
                    </div>
                    <div v-else></div>
                </template>


            </UTable>
            <FormDelete :route="'/api/Discount/Discount'" formTitle="تخفیف" @reload="loadData" :selectedId="selected.id" :storeId="selected.storeId"
                v-model="openDeleteModal" />
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

                    <UPagination v-model="filter.pageIndex" :page-count="filter.pageSize" :total="filter.totalCount"
                        :ui="{
                            wrapper: 'flex items-center flex-row-reverse gap-1',
                            rounded: '!rounded-full min-w-[32px] justify-center',
                            default: {
                                activeButton: {
                                    variant: 'outline'
                                }
                            }
                        }" />
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup>
import moment from 'jalali-moment'
const selected = ref({})
const openDeleteModal = ref(false)
const toast = useToast()

const columns = [
    {
        key: 'id',
        label: 'شناسه'
    },

    {
        key: 'store.name',
        label: 'فروشگاه'
    },
    {
        key: 'discount',
        label: 'تخفیف'
    },
    {
        key: 'endDate',
        label: 'تاریخ پایان'
    },
    {
        key: 'product.name',
        label: 'محصول'
    },
    {
        key: 'productItemId',
        label: 'تنوع محصول'
    },
    {
        key: 'brand.name',
        label: 'برند'
    },
    {
        key: 'category.name',
        label: 'دسته بندی'
    },

    {
        key: 'actions',
    }]
const filter = ref({
    totalCount: 0,
    pageIndex: 1,
    pageSize: 15,
})
const pageFrom = computed(() => {
    return (filter.value.pageIndex - 1) * filter.value.pageSize + 1
})
const pageTo = computed(() => {
    return filter.value.pageIndex * filter.value.pageSize + 1
})
const rows = ref([])
const Actions = (row) => [

    [{
        label: 'حذف',
        icon: 'i-heroicons-trash-20-solid',
        click: () => { selected.value = row; openDeleteModal.value = true }
    }],

]



watch([() => filter.value.pageIndex], async () => {
    await loadData()
})

async function loadData() {
    try {
        let config = JSON.parse(JSON.stringify(filter.value))
        delete config.list
        console.log(config);
        let res = await $fetch('/api/Discount/Discount', {
            method: 'GET',
            query: config
        })
        filter.value = res
    } catch (error) {
        console.log(error);

        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}

onMounted(() => {
    loadData()
})


</script>
