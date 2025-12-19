<template>
    <UModal v-model="isOpen" prevent-close>
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              لیست خودرو ها
            </h3>
            <UIcon
              @click="isOpen = false"
              name="i-heroicons-x-mark-16-solid"
              class="w-8 h-8 text-gray-400"
            />
          </div>
        </template>
  
      <ul>
        <li v-for="item in categoryList" class="p-2 border-b ">
          {{ item.name }}
        </li>
      </ul>
        <template #footer>
          <div class="flex items-center gap-4 justify-end">
            <UButton class="px-8" @click="isOpen = false" color="rose">
              بستن
            </UButton>
            <!-- <UButton
              class="px-8"
              @click="submit"
              color="green"
              :loading="loading"
            >
              ثبت
            </UButton> -->
          </div>
        </template>
      </UCard>
    </UModal>
  </template>
  <script setup>
  const isOpen = defineModel();
  const props = defineProps(["UserId"]);
  const toast = useToast();
  const loading = ref(false);
  const categoryList=ref([])

 watch(props.UserId,()=>{
  getUserCategory
 })

  async function getUserCategory(){
    try {
      let res=await $fetch('/api/usercategory/usercategorys',{
        query:{
          UserId:props.UserId
        }
      })
      categoryList.value=res.list
    } catch (error) {
      
    }
  }
  </script>
  