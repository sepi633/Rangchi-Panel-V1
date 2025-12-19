<template>
    <ul class="paging flex m-auto justify-center mt-5 flex-wrap" v-if="pageCount">
      <li class="border hover:border-[#1f2937] cursor-pointer rounded bg-white m-1 py-1 px-3 text-xs"
          @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">قبلی</li>
      <li v-for="(item,index) in pagination" :key="index" class="border hover:border-[#1f2937] cursor-pointer rounded bg-white m-1 py-1 px-3 text-xs"
          :class="{ active: item === currentPage }"
          @click="go(item)"
          >{{ item }}</li>
     
      <li class="border hover:border-[#1f2937] cursor-pointer rounded bg-white m-1 py-1 px-3 text-xs"
          @click="goToPage(currentPage + 1)" :disabled="currentPage === pageCount">بعدی</li>
    </ul>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  
  const props = defineProps({
    pageIndex: Number,
    pageCount: Number
  });
  function go(_item){
    if(_item !='...'){
        goToPage(_item)

        }    }
  const emit = defineEmits(['getPageNummber']);
  
  const currentPage = ref(props.pageIndex || 1);
  
  watch(() => props.pageIndex, (newIndex) => {
    currentPage.value = newIndex;
  });
  
  const goToPage = (page) => {
    console.log(page)
    if (page >= 1 && page <= props.pageCount) {
      currentPage.value = page;
      emit('getPageNummber', page);
    }
  };
  
  const pagination = computed(() => {
    let pages = [];
    const total = props.pageCount;
    const current = currentPage.value;
  
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
        if (current < 4) {
            pages=[1, 2, 3,4, '...'];
        }
        else if(current>total-3){
            pages=[1,'...',total-3,total-2,total-1 ,total]
        }
        else{
            pages=[1,'...',current-1,current,current+1,'...',total]
        }
       
    }
  
    return pages;
  });
  </script>
  
  <style lang="scss" scoped>
  .active {
    background: rgb(31, 41, 51);
    border: 0;
    color: #fff;
  }
  </style>
  