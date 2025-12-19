<template>
     
  <div>
        
        <div class="flex flex-col">
              <p class="text-[18px] mb-2">اطلاعات سفارش :</p>
              <div class=" bg-[#fff] p-2 rounded border flex flex-col  text-black p-2 rounded">
                <div class=" text-[17px]  " >  <span>نام:</span> <span>{{ orderItem?.user?.fullName }}</span> </div>
                <div class=" text-[17px] " >شماره سفارش :{{ orderItem?.id }}</div>
                <div v-if="orderItem?.userId != 1" class=" text-[17px] " >ایمیل:{{ orderItem?.user?.email }}</div>
                <div v-else class=" text-[17px] " >ایمیل:{{ orderItem?.address?.email }}</div>
                <div class=" text-[17px] " > موبایل :{{ orderItem?.user?.mobile }} </div>
                <div class=" text-[17px] "  > وضعیت سفارش : {{ orderItem?.productOrderState?.value }}</div>
                <div class=" text-[17px] " >
  وضعیت ارسال: {{ orderItem?.productOrderStatus?.value }}
                </div>
                <div class=" text-[17px] " >
  نوع ارسال : {{ orderItem?.deliveryType?.value }}
                </div>
                <div class=" text-[17px] " >
  نوع پرداخت : {{ orderItem?.paymentType?.value }}
                </div>
                <div v-if="orderItem.trackingCode != null" class=" text-[17px] " >
کد پیگیری: {{ orderItem?.trackingCode }}
                </div>
                <div v-if="orderItem.adminDescription != null" class=" text-[17px] " >
توضیحات ادمین : {{ orderItem?.adminDescription }}
                </div>
                <div v-if="orderItem.adminDescription != null" class=" text-[17px] " >
توضیحات مربوط به کاربر : {{ orderItem?.userDescription}}
                </div>
              </div>
                <hr class="my-2">
              <!-- <p class="mt-4"><strong>Product Order Change State:</strong></p>
              <ul>
                <li v-for="item in orderStateList"
                >
                  <input  @change="changeState(item?.id)" type="radio"  :id="item?.value" name="state">  <label :for="item?.value" class="me-2">{{ item?.value }}</label>
              
                </li>
              </ul>-->
            
              
              <div class="bg-white rounded p-2 border">
                <p class="mb-1" ><strong>تغیر وضعیت ارسال:</strong></p>
                <hr>
              <ul>
                <li class="mt-1" v-for="item in orderStatusList" :key="item?.id">
                 <input :checked="orderItem?.productOrderStatus?.id==item?.id"  @change="changeStatus(item?.id)" type="radio"
                   :id="item?.value"  name="status"> <label :for="item?.value"
                    class="me-2 text-sm">{{ item?.value }}</label>
              
                </li>
              </ul>
              </div>
              <div class="bg-white rounded p-2 border mt-2">
                <p class="mb-1" ><strong>تغیر وضعیت سفارش:</strong></p>
                <hr>
              <ul>
                <li class="mt-1" v-for="item in orderStateList" :key="item?.id">
                 <input :checked="orderItem?.productOrderStatus?.id==item?.id"  @change="changeState(item?.id)" type="radio"
                   :id="item?.value"  name="state"> <label :for="item?.value"
                    class="me-2 text-sm">{{ item?.value }}</label>
              
                </li>
              </ul>
              </div>
              <div class="bg-white rounded p-2 border mt-2">
                <p class="mb-1" ><strong>  افزودن کد پیگیری:</strong></p>
                <hr>
                <input type="text" @change="isChangeTracking = true"  v-model="orderItem.trackingCode" placeholder="..."  class="w-full border p-1 rounded mt-3 ">
              </div>
              <div class="bg-white rounded p-2 border mt-2">
                <p class="mb-1" ><strong>  افزودن توضیحات مربوط به کاربر:</strong></p>
                <hr>
                <input type="text" @change="isChangeuseDes = true"  v-model="orderItem.userDescription" placeholder="..."  class="w-full border p-1 rounded mt-3 ">
              </div>
              <div class="bg-white rounded p-2 border mt-2">
                <p class="mb-1" ><strong>  افزودن توضیحات مربوط به ادمین :</strong></p>
                <hr>
                <input type="text" @change="isChangeadminDes = true"  v-model="orderItem.adminDescription" placeholder="..."  class="w-full border p-1 rounded mt-3 ">
              </div>
              <div class="mt-3">
          <nuxt-link    class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white" to="/ProductOrder"> {{ $t('cancel') }}</nuxt-link>
       
        
       
       

        
        <button @click="confirmChange()"
          class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white"
      
        
        >
        {{ $t('confirm') }}
        </button>
              </div>
            
        </div>
  </div>
</template>

<script setup>
const  toast = useToast()

const route = useRoute()
const orderItem = ref({});
const orderStatusList = ref([]);
const state=ref(null);

const status=ref(null);
const isChangeTracking = ref(false)
const isChangeuseDes = ref(false)
const isChangeadminDes = ref(false)
const orderStateList = ref([]);
const statusObject =ref({
  "id": route.params.key,

  "productOrderStatusId": 0,
  "productOrderStateId": 0,
  
})
const desObject = ref({
  "id": route.params.key,

"userDescription": null,
"adminDescription": null,
})
const trackingObject = ref({
  "id": route.params.key,
  "trackingCode":""
})
;
onMounted(()=>{
  getOrder();
  GETProductOrderStatus();
  GETProductOrderState();
})
const getOrder = async () => {
  // loader.value = true
    try {
        const headers = useRequestHeaders(['cookie'])

        const response = await $fetch('/api/orders/order', {
            method: 'GET',
            headers,
            query: {
              id:route.params.key
            }
        })


        orderItem.value = response.data
  // loader.value = false
;
    } catch (error) {

        ;
        // navigateTo("/login")
    }


}
const GETProductOrderState = async()=>{

try {
  const headers = useRequestHeaders(["cookie"]);

  const data = await $fetch("/api/code/code", {
    method: "GET",
    headers,
    query: {
      CodeGroupLabel: "Order_State",
    },
  });

  ;
  ;
  orderStateList.value =data.list
} catch (error) {
  ;
  // navigateTo("/login")
}

}
const changeState =(id)=>{
  state.value = id
}
const cancelState = async(itemId)=>{
  try {

const data = await $fetch("/api/orders/orderstateCancel", {
  method: "put",
 
  body:{
    id:itemId
  }
});

;
;
if(data.isSuccess){
 
  getOrder()
}
// orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}
}
const changeStatus =(id)=>{
  status.value = id
}
const confirmChange = async ()=>{
  if(state.value != null ){
    try {
      statusObject.value.productOrderStateId = state.value;
      const headers = useRequestHeaders(["cookie"]);

const data = await $fetch("/api/orders/state", {
  method: "put",
  headers,
  body:statusObject.value
});

;
;
if(data.isSuccess){
 toast.add({description:'با موفقیت انجام شد',color:'green'})
}
// orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}
  }
  if(status.value != null ){
    try {
      statusObject.value.productOrderStatusId = status.value;
const headers = useRequestHeaders(["cookie"]);

const data = await $fetch("/api/orders/status", {
  method: "put",
  headers,
  body:statusObject.value
});

;
;
if(data.isSuccess){
  toast.add({description:'با موفقیت انجام شد',color:'green'})
}
// orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}
  } 
  if(isChangeTracking.value){
    trackingObject.value.trackingCode = orderItem.value.trackingCode
    try {
 


const data = await $fetch("/api/orders/tracking", {
  method: "put",
 
  body:trackingObject.value
});

;
;
if(data.isSuccess){
  toast.add({description:'با موفقیت انجام شد',color:'green'})
}
// orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}
  }
  if(isChangeadminDes.value || isChangeuseDes.value){
    desObject.value.userDescription = orderItem.value.userDescription
    desObject.value.adminDescription =  orderItem.value.adminDescription
    try {
 


const data = await $fetch("/api/orders/description", {
  method: "put",
 
  body:desObject.value
});

;
;
if(data.isSuccess){
  toast.add({description:'با موفقیت انجام شد',color:'green'})
}
// orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}
  }
  getOrder();
}
const GETProductOrderStatus = async()=>{

try {
const headers = useRequestHeaders(["cookie"]);

const data = await $fetch("/api/code/code", {
  method: "GET",
  headers,
  query: {
    CodeGroupLabel: "Order_Status",
  },
});

;
;
orderStatusList.value =data.list
} catch (error) {
;
// navigateTo("/login")
}

}
</script>
