<template>
  <div>
    <UButton @click="isOpen = true"> انتخاب از فایل های قبل </UButton>
    <UModal v-model="isOpen" fullscreen>
      <UCard class="!h-full max-h-screen overflow-auto">
                <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              انتخاب عکس
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="flex flex-wrap gap-2 ">
          <img :class="['w-32 h-32 object-contain hover:border-2 border-secoundPrimary-500 ',item.id==selected?.id?'border-2 border-basePrimary-500':'']" @click="selected=item" v-for="item in data?.list" :key="item.id" :src="getPicUrl(item,'md')" />
        </div>
        <div class="flex justify-center p-4">

          <UPagination   v-model="pageIndex" :page-count="20" :total="data?.totalCount">
            
          </UPagination>
        </div>
        <template #footer>
          <div class="flex justify-end gap-4">
            <UButton color="red" @click="isOpen = false">انصراف</UButton>
            <UButton color="green" :disabled="!selected" @click="accept">تایید</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
<script setup>
const selected=ref()
const emit = defineEmits(["accept"]);
const {getPicUrl}=usePicture()
const isOpen = ref(false);
const pageIndex=ref(1)
const {data,error}=await useFetch('/api/upload/pictureList',{
query:{
    pageIndex:pageIndex ,
    pageSize:60
},
watch:[pageIndex]
})


function accept(){
  emit('accept',selected.value)
  isOpen.value=false
}
</script>
