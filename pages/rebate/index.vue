<template>
  <!-- {{ ordersData }} -->
    <div>
      <div class="order-list flex items-center">
        <strong>لیست کد های تخفیف ({{ ordersData?.totalCount }}  تا)</strong>

        <NuxtLink to="/rebate/insert-new" class="bg-white p-2 rounded border ms-auto px-3">افرودن کد جدید</NuxtLink>
    </div>
    <div class="filter-box flex flex-wrap items-center">
      <div class="w-1/4 p-1">
        <input class="p-2 h-[40px] border rounded w-full" type="text" 
          v-model="defaultData.Q" placeholder="متن مورد نظر را وارد کنید">
      </div>
      <div class="w-1/6 p-1">
        <button class="p-2 h-[40px] text-sm bg-green-800 text-white flex items-center justify-center  w-full rounded hover:bg-green-900  "
            @click="getOrder()">

          <LoadingTinyLoading v-if="loader==true" />

            <svg data-v-e1e6274e="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style=""><path data-v-e1e6274e="" fill-rule="evenodd" clip-rule="evenodd" d="M3 6.99414C3 6.72892 3.10536 6.47457 3.29289 6.28703C3.48043 6.0995 3.73478 5.99414 4 5.99414H20C20.2652 5.99414 20.5196 6.0995 20.7071 6.28703C20.8946 6.47457 21 6.72892 21 6.99414C21 7.25936 20.8946 7.51371 20.7071 7.70125C20.5196 7.88878 20.2652 7.99414 20 7.99414H4C3.73478 7.99414 3.48043 7.88878 3.29289 7.70125C3.10536 7.51371 3 7.25936 3 6.99414ZM6 11.9941C6 11.7289 6.10536 11.4746 6.29289 11.287C6.48043 11.0995 6.73478 10.9941 7 10.9941H17C17.2652 10.9941 17.5196 11.0995 17.7071 11.287C17.8946 11.4746 18 11.7289 18 11.9941C18 12.2594 17.8946 12.5137 17.7071 12.7012C17.5196 12.8888 17.2652 12.9941 17 12.9941H7C6.73478 12.9941 6.48043 12.8888 6.29289 12.7012C6.10536 12.5137 6 12.2594 6 11.9941ZM9 16.9941C9 16.7289 9.10536 16.4746 9.29289 16.287C9.48043 16.0995 9.73478 15.9941 10 15.9941H14C14.2652 15.9941 14.5196 16.0995 14.7071 16.287C14.8946 16.4746 15 16.7289 15 16.9941C15 17.2594 14.8946 17.5137 14.7071 17.7012C14.5196 17.8888 14.2652 17.9941 14 17.9941H10C9.73478 17.9941 9.48043 17.8888 9.29289 17.7012C9.10536 17.5137 9 17.2594 9 16.9941Z" fill="black" style="fill: white;"></path></svg>

            فیلتر کردن</button>
      </div>
    </div>
  <table class="rounded overflow-hidden border-0">
  <thead class="text-white">
    <tr class="">
      <th scope="col">ردیف</th>
      <th scope="col">عنوان</th>
      <th scope="col">تاریخ شروع</th>
      <th scope="col">تاریخ پایان</th>
      <th scope="col">کد تخفیف </th>
      <th scope="col">میزان تخفیف</th>
      <th scope="col">تعداد استفاده </th>
      <th scope="col">عملیات</th> 

    </tr>
  </thead>
  <tbody>
    <tr class="text-sm" v-for="(item,index) in ordersData?.list">
      <td data-label="شماره سفارش">{{ (ordersData?.pageSize*( ordersData?.pageIndex - 1 )) + index+1 }}</td>
<td data-label="عنوان">{{ item?.name }}</td>
      <td data-label="تاریخ شروع">
        {{ moment(item?.startDatetime , 'YYYY-M-D HH:mm:ss')
    .locale('fa')
    .format('  YYYY/MM/DD') }}</td>
    <td data-label="تاریخ پایان ">
        {{ moment(item?.endDatetime , 'YYYY-M-D HH:mm:ss')
    .locale('fa')
    .format('  YYYY/MM/DD') }}</td>
    <td data-label="کد تخفیف">{{ item?.codeValue }}</td>
      
      <td data-label="میزان تخفیف" >
        {{ item?.priceValue }}
        <sub v-if="item?.isPriceRebate">تومان</sub>
        <sub v-else>%</sub></td>
      <td data-label="تعداد استفاده">{{ item?.useCount }} <sub>({{ item?.usedCount }}) استفاده شده</sub></td>
      
      <td data-label="عملیات" title="برای انجام کلیک کنید" class="flex flex-col">
        <button @click="deleteRebate(item?.id)">حذف</button>
        <nuxt-link :to="`/rebate/insert-${item?.id}`">مشاهده</nuxt-link>
      </td>

    </tr>
    
  </tbody>
</table> 
<!-- <GlobalPaging :pageIndex="ordersData?.pageIndex" :pageCount="pageCount" /> -->
<Paging :pageCount="Math.ceil(ordersData?.totalCount /  ordersData?.pageSize)" :pageIndex="ordersData?.pageIndex"
    @getPageNummber="(n) => { defaultData.PageIndex = n; pageLoader(); }"></Paging>
    </div>

</template>

<script setup>
 import moment from 'jalali-moment'

    
const ordersData = ref();
const loader = ref(false)
const defaultData = ref({
  Publish: null,
  Hashtags: "",
  CategoryIds: null,
  PageSize: 10,
})
onMounted(() => {
  pageLoader()
})

const pageLoader = async () => {
  loader.value = true
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/rebate/rebate', {
            method: 'GET',
            headers,

            query: defaultData.value
        })


        ordersData.value = data
  loader.value = false

    } catch (error) {

        ;
        // navigateTo("/login")
    }


}

const deleteRebate = async(id)=>{

  try {
const headers = useRequestHeaders(['cookie'])

const data = await $fetch('/api/rebate/rebate', {
  method: 'DELETE',
  headers,
  query:{
    id:id
  }
})


;
pageLoader()

} catch (error) {

;
;
// navigateTo("/login")
}

}
</script>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table tr {
  border: 1px solid #ddd;
  padding: .35em;
  background-color: #fff;
}


table tr:nth-child(2n){
    background-color: rgb(236, 236, 236) !important;
  }

table thead tr{
    background-color: #1f2937 !important;
}

th{
  background-color: unset;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}














/* general styling */
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.25;
}</style>