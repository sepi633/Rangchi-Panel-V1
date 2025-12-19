<template>
    <UModal v-model="isOpen" prevent-close fullscreen>
        <UCard class="shadow-md bg-grayPrimary-50  bg-opacity-60 ">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        لیست خدمات نمایندگی
                    </h3>
                    <UIcon @click="isOpen = false" name="i-heroicons-x-mark-16-solid" class="w-8 h-8 text-gray-400" />
                </div>
            </template>
            <UCard>
                <div class="flex items-center  gap-2">
                    <UForm :state="formData" class="px-8 w-2/3 flex gap-2">
                        <UFormGroup class="w-1/2 " label="خدمت " name="assistanceId">
                            <USelectMenu v-model="formData.assistanceId" :options="assistance" option-attribute="name"
                                value-attribute="id">

                            </USelectMenu>
                        </UFormGroup>
                        <UFormGroup class="w-1/2 " label="پیش پرداخت " name="name">
                            <UInput v-model="formData.prePay" />
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
                            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                        </UDropdown>
                    </template>
                    <template #active-data="{ row }">
                        <UIcon :class="[row.active ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
                            :name="row.active ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />

                    </template>

                </UTable>
                <FormDelete :route="'/api/AgencyAssistance/AgencyAssistance'" formTitle="خودرو" @reload="loadData"
                    :selectedId="selected.id" v-model="openDeleteModal" />
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
            </UCard>
        </UCard>
    </UModal>

</template>

<script setup>
const isOpen = defineModel();
const props = defineProps(['agencyId'])
const { public: { carCategoryId } } = useRuntimeConfig()
const assistance = ref([])
const filter = ref({
    totalCount: 0,
    pageIndex: 1,
    pageSize: 15,
})
const formData = ref({
    "agencyId": 0,
    "assistanceId": 0,
    "prePay": 0
})

const isNew = ref(true)
const selected = ref({})
const openDeleteModal = ref(false)
const toast = useToast()
const loading = ref(false)

const columns = [
    {
        key: 'agencyName',
        label: 'نمایندگی'
    },
    {
        key: 'assistanceName',
        label: 'خدمت '
    },
    {
        key: 'prePay',
        label: 'پیش پرداخت '
    },

    {
        key: 'actions',
    }]


const validate = (formData) => {
    formData.prePay = formData.prePay.replace(/[^0-9]/g, '')

    const errors = [];
    if (!formData.assistanceId)
        errors.push({
            path: "assistanceId",
            message: "وارد کردن خدمت الزامی است",
        });

    return errors;
};

const pageFrom = computed(() => {
    return (filter.value.pageIndex - 1) * filter.value.pageSize + 1
})
const pageTo = computed(() => {
    return filter.value.pageIndex * filter.value.pageSize + 1
})
const Actions = (row) => [
    [{
        label: 'ویرایش',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => { isNew.value = false; formData.value = { ...row } }
    }],
    [{
        label: 'حذف',
        icon: 'i-heroicons-trash-20-solid',
        click: () => { selected.value = row; openDeleteModal.value = true }
    }],

]


watch([() => filter.value.pageIndex , () => props.agencyId], async () => {
    await loadData()
})

async function loadData() {
    try {
        let config = JSON.parse(JSON.stringify(filter.value))
        delete config.list
        config.agencyId = props.agencyId
        console.log(config);
        let res = await $fetch('/api/AgencyAssistance/AgencyAssistances', {
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


async function submit() {
    if (loading.value) return;
    else {
        loading.value = true;
        formData.value.agencyId = props.agencyId
        try {
            let res = await $fetch("/api/AgencyAssistance/AgencyAssistance", {
                method: isNew.value?"POST":"PUT",
                body: formData.value,
            });
            if (res.isSuccess) {
                toast.add({
                    description: " عملیات با موفقیت انجام شد .",
                    color: "green",
                });
                await loadData()
                formData.value = {
                    "agencyId": 0,
                    "assistanceId": 0,
                    "prePay": 0
                }
                isNew.value=true
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

async function loadAssistance() {
    try {

        let res = await $fetch('/api/Assistance/Assistances', {
            method: 'GET',
            query: {
                pageSize: 500
            }
        })
        assistance.value = res?.list
    } catch (error) {
        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}
onMounted(() => {
    loadAssistance()
})

</script>