<template>
   <div class="hidden" id="printArea">
    <div class="print">
      <div class="header">
        <!-- <img src="/img/logo/logo1.png" /> -->
        <div class="bar"></div>
      </div>
      <br />
      <main>
        <div class="title green center">صورتحساب فروش کالا</div>
        <div class="card flex">
          <div class="title space flex between">فروشنده</div>
          <div class="flex between w">
            <div>
              <div class="p">فروشنده : {{projectName}}</div>
              <div class="p">
                آدرس : {{ basedetail?.addressValue }}
              </div>
            </div>
            <div>
              <!-- <div class="p">پروانه تاسیس : 144/3971/1/282014</div> -->
              <div class="p">
                تلفن : {{ basedetail?.postalCode }}
              </div>
            </div>
          </div>
        </div>
        <div class="card flex">
          <div class="title space flex between">خریدار</div>
          <div class="flex between w">
            <div>
              <div class="p">خریدار :{{ order?.user?.fullName }}</div>
            </div>
            <div>
              <div class="p">تلفن : {{ order?.user?.mobile }}</div>
            </div>
          </div>
        </div>
        <div class="card flex">
          <div class="title space flex between">تحویل گیرنده</div>
          <div class="flex between w">
            <div>
              <div class="p">تحویل گیرنده :{{ order?.address?.firstName + order?.address?.lastName}}</div>
              <div class="p">
                آدرس :{{order?.address?.city?.state?.name +'-'+ order?.address?.city?.name }} -{{ order?.address?.addressValue }} ({{ order?.address?.name }})
              </div>
            </div>
            <div>
              <div class="p">تلفن : {{ order?.address?.mobile }}</div>
              <div class="p">کد پستی : {{ order?.address?.postalCode }}</div>
            </div>
          </div>
        </div>
        
        <div class="card flex">
          <div class="flex between w">
            <ClientOnly>
              <div class="p">سفارش شماره :{{ order?.id }}</div>
  
              <div class="p" >تاریخ فاکتور : {{order.createDate && moment(order?.createDate, "YYYY-MM-DD HH:mm:ss")
                .locale("fa")
                .format("YYYY/MM/DD") }}</div>
              </ClientOnly>
          </div>
        </div>
  
        <div class="card">
          <div v-for="store in storeInfo">
            <div class="title center " >
          <div class="p"> 
    
            سفارشات فروشگاه : {{ store.store?.name }}
          </div>
         
            </div>
  
            <table>
              <thead>
                <th>ردیف </th>
                <th>نام محصول</th>
                <th>ویژگی</th>
                <th>قیمت </th>
                <th>تخفیف </th>
                <th>تعداد </th>
                <th>جمع</th>
              </thead>
              <tbody>
                <tr v-for="(item,index) in store.productOrderItems"
                :key="item?.id">
                  <td>{{index+1}}</td>
                  <td>{{ item.productItem?.product?.name }}</td>
                  <td>{{  item.productItem?.varietyItem?.varietyName }} :{{ item.productItem?.varietyItem?.name }} </td>
                  <td><strong class="lg:hidden">قیمت:</strong>
                    
                    <span>
                      {{ item?.basePrice?.toLocaleString() }} 
                        <!-- 0 -->
                      تومان</span></td>
                  <td>{{ item?.discountPrice?.toLocaleString() }} </td>
                  <td>{{ item?.count }} </td>
                  <td>{{ (item?.count * item.price).toLocaleString()}}</td>
                </tr>
  
                <tr>
                  <td colspan="5"></td>
                  <td>
                    قیمت 
                  </td>
                  <td>
                    {{ order?.basePrice?.toLocaleString() +' تومان'}}
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td>
                    هزینه ارسال
                  </td>
                  <td>
                  {{ order?.deliveryPrice ? (order?.deliveryPrice?.toLocaleString() + ' تومان' ) : 0 }}
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td>
                    تخفیف کالا
                  </td>
                  <td>
                    {{ order?.discountPrice?(order?.discountPrice?.toLocaleString() + ' تومان'): 0 }}
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td>
                    کد تخفیف
                  </td>
                  <td>
                    {{ order?.rebatePrice? (order?.rebatePrice?.toLocaleString()  + ' تومان'): 0 }}
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td>
                     ارزش افزوره
                  </td>
                  <td>
                    {{ order?.taxPrice? (order?.taxPrice?.toLocaleString()  + ' تومان'): 0 }}
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td>
                    جمع کل
                  </td>
                  <td>
                    {{ order?.paymentPrice?.toLocaleString() + ' تومان'}}
                  </td>
                </tr>
                
              </tbody>
            </table>
        
          </div>
        </div>
  
     
      </main>
      <br />
      <!-- <div class="footer">♦ دارو دیجیتال داروخانه شخصی شماست ♦</div> -->
    </div>
   </div>
  </template>
  <script setup>
  import moment from 'jalali-moment';
  const {public:{projectName}}=useRuntimeConfig()
  const props=defineProps(["order",'time']);
  const storeInfo=ref([])
  const basedetail=ref({})
  onMounted(async()=>{
    await getBaseDetail()
  })
  function print(){
    var mywindow = window.open('', 'PRINT', '')
  
  mywindow.document.write(
    `<html><head>
      <title>${document.title} '</title><style >
  
   @media print {
        @page {
        size: portrait;
        }
      table {page-break-inside: avoid;}
    }
  
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 100;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-thin.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-thin.woff2') format('woff2');		
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 300;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-Light.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakh-Light.woff2') format('woff2');	
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: normal;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-Regular.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-Regular.woff2') format('woff2');		 
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 600;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-SemiBold.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-SemiBold.woff2') format('woff2');		 
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: bold;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-Bold.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-Bold.woff2') format('woff2'); 
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 800;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-ExtraBold.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-ExtraBold.woff2') format('woff2');		 
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 900;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-Black.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-Black.woff2') format('woff2');		 
  }
  
  @font-face {
      font-family: YekanBakh;
      font-style: normal;
      font-weight: 950;
      src: url('/fonts/YekanBakh_Pro/woff/YekanBakhFaNum-ExtraBlack.woff') format('woff'),   
      url('/fonts/YekanBakh_Pro/woff2/YekanBakhFaNum-ExtraBlack.woff2') format('woff2');		 
  }
  
  body{
      direction: rtl;
      background-color: #f9f9f9;
  }
  
  * {
      font-family: 'YekanBakh' !important;
  }
  
  .header {
   background-color: #f9f9f9;
  position:fixed;
  top:0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .w {
    width: 100%;
  }
    main{
    width:100%
    }
  .title {
    font-size: large;
    font-weight: 600;
  }
  .center {
    text-align: center;
  }
  .green {
    color: #39706d;
  }
  .between {
    justify-content: space-between;
    align-items: center;
  }
  .header img {
    height: 100%;
    width: auto;
  }
  .header .bar {
    height: 5px;
    width: 100%;
    background-color: #39706d;
  }
  main > * {
    margin: 10px 0;
  }
  .p {
    padding: 10px;
  }
  .print {
    min-height: 100vh;
    padding: 20px;
  }
  .flex {
    display: flex;
  }
  .card {
    padding: 10px 20px;
    border-radius: 16px;
    border: 1px solid #aaa;
  }
  .card .space {
    border-left: 1px solid #aaa;
    padding-left: 20px;
    min-width: 80px;
  }
  .footer {
   background-color: #f9f9f9;
    margin-top: auto;
    border-top: 6px solid #39706d;
    padding: 10px 0;
    text-align: center;
    font-weight: 600;
    color: #39706d;
    position:fixed;
    bottom:0;
    width:100%;
  }
  
  
  
  
  table {
    border: 1px solid #aaa;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 1rem;
    width: 100%;
  }
  td {
    border-top:  1px solid #aaa;
    border-left: 1px solid #ccc;
  }
  thead th{
    
    border-left: 1px solid #ccc;
  }
  thead th:last-child {
    border-left: unset
  
  }
  td,th{
    text-align: center;
    padding: 5px;
  }
   tr td:last-child {
  border-left: unset
  }
     </style>`
  )
  mywindow.document.write('</head><body >')
  mywindow.document.write(document.getElementById('printArea').innerHTML)
  mywindow.document.write('</body></html>')
  
  
  mywindow.focus() // necessary fo
  }
  watch(()=>props.time,async()=>{
    if(props?.order?.id){
       getOrderStoreInfo(props.order.id).then(()=>{
         nextTick(()=>{
           print()
         })

       })
    }
  },{deep:true})
  const getBaseDetail = async () => {
  ;
  try {
    const data = await $fetch("/api/details/baseDetails", {
      method: "GET",
    });

    if (data.list.length > 0) {
      basedetail.value = data?.list[0];
    }
  } catch (error) {

  }
};
const getOrderStoreInfo = async (_ProductOrderId) => {
  try {
    const response = await $fetch("/api/orders/productOrderStoreInfo", {
      method: "GET",
      query: {
        ProductOrderId: _ProductOrderId
      },
    });

    storeInfo.value = response.list;
  } catch (error) {
    ;
  }
};
  </script>
  <style scoped>
  
  .header {
    background-color: white;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .w {
    width: 100%;
  }
  .title {
    font-size: large;
    font-weight: 600;
  }
  .center {
    text-align: center;
  }
  .green {
    color: #39706d;
  }
  .between {
    justify-content: space-between;
    align-items: center;
  }
  .header img {
    height: 100%;
    width: auto;
  }
  .header .bar {
    height: 5px;
    width: 100%;
    background-color: #39706d;
  }
  main > * {
    margin: 10px 0;
  }
  .p {
    padding: 10px;
  }
  .print {
    min-height: 100vh;
    height: 100vh;
    padding: 10px;
    width: 100%;
  }
  .flex {
    display: flex;
  }
  .card {
    padding: 10px 20px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid #aaa;
  }
  .card .space {
    border-left: 1px solid #aaa;
    padding-left: 20px;
    min-width: 80px;
  }
  .footer {
    margin-top: auto;
    border-top: 6px solid #39706d;
    padding: 10px 0;
    background-color: white;
    text-align: center;
    font-weight: 600;
    color: #39706d;
  }
  
  
  
  
  table {
    border: 1px solid #aaa;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 1rem;
    width: 100%;
  }
  td {
    border-top:  1px solid #aaa;
    border-left: 1px solid #ccc;
  }
  thead th{
    
    border-left: 1px solid #ccc;
  }
  thead th:last-child {
    border-left: unset
  
  }
  td,th{
    text-align: center;
    padding: 5px;
  }
   tr td:last-child {
  border-left: unset
  }
  
  </style>
  