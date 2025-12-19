<template>
      <div>
        <div class="select-user bg-white border p-3">
            <label for="">نام کد :</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">کد تخفیف  :</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">مبلغ تخفیف  :</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3" v-if="isPercent==false">
            <label for="">مبلغ تخفیف  :</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
           <span class="text-orange-600" @click="isPercent=true">استفاده از حالت درصدی</span>
        </div>
        <div class="select-user bg-white border p-3" v-else>
            <label for="">درصد تخفیف  :</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
            <span class="text-orange-600"  @click="isPercent=false">استفاده از حالت مبلغی</span>
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">تاریخ شروع:</label>
            <input class="p-2 mx-2 rounded" name="" v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">تاریخ پایان :</label>
            <input class="p-2 mx-2 rounded" type="date" 
             name="" v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for=""> تعداد دفعات قابل استفاده:</label>
            <input class="p-2 mx-2 rounded" name=""
            type="date"  v-model="userId" id="" />
           
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">انتخاب کاربر:</label>
            <select class="p-2 mx-2 rounded" name="" v-model="userId" id="">
                <option v-for="item in users?.list" :key="item?.id" :value="item?.id">
                    {{ item?.fullName }}
                </option>
            </select>
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">انتخاب محصول:</label>
            <select class="p-2 mx-2 rounded" name="" id="" v-model="productId" 
            @change="getDoctors(productId)">
                <option v-for="item in allProduct?.list" :value="item?.id" :key="item?.is">
                    {{ item?.name }}
                </option>
            </select>
        </div>
        <div class="select-user bg-white border p-3">
            <label for="">انتخاب دسته بندی:</label>
            <select class="p-2 mx-2 rounded" v-model="doctorId"
             @change="getDoctorSuggesteDate()" name="" id="">
                <option v-for="item in doctors" :value="item?.id"  :key="item?.id" >
                    {{ item?.fullName }}
                </option>
            </select>
        </div>
        <div class="select-user bg-white border p-3" v-if="showResualt">
             
              <div v-if="isTime">
                 <input @change="checkShowDatePicker()" type="radio" name="date"  value="suggestedDate" class="me-[10px]"  v-model="toggleReserve">
                 <label for=""> {{ doctorDays.fullDateTime }}</label>
                
              </div>
              <div v-else>
                    <p>متاسفانه زمان خالی یافت نشد</p>
              </div>

              <div>
                <input @change="checkShowDatePicker()" type="radio" name="date"  value="selectDate" 
                  v-model="toggleReserve" class="me-[10px]" >
                 <label for="">می خواهم تاریخ دیگری انتخاب کنم </label>
                 <div v-if="showDatePicker">
                    <date-picker 
                      type="date"
                      v-model="dateSelected"
                      locale="fa"
                      @change="getDoctorfreeTime()"
                    />
                    <div v-if="isTimeFree == 'yesTime'">
                        <input v-model="toggleReserve" type="radio" name="myselsectedTime">
                      <label for="">{{ doctorFreeDay.fullDateTime }}</label>
                    </div>
                    <div v-else-if="isTimeFree == 'noTime'">
                      <p>متاسفانه زمان خالی یافت نشد</p>
                    </div>
                 </div>
                
              </div>
        
        </div>
        <div class="select-user bg-white border p-3">
<button class="bg-green-700 hover:bg-green-800 p-2 text-white rounded w-[200px] block"
    @click="submite">ثبت</button>
   
        </div>
      </div>
        

</template>

<script setup>

const users = ref({})
const userId = ref()
const allProduct = ref()
const productId = ref()
const doctors = ref()
const doctorId = ref()
const doctorDays=ref()
const showResualt=ref(false)
const isTime=ref(false);
const showDatePicker=ref(false);
const toggleReserve=ref('suggestedDate');
const dateSelected =ref('');
const doctorFreeDay=ref();
const isTimeFree=ref('');
const toast = useToast();

const isPercent = ref(true)
onMounted(()=>{
    getUser();
    getProduct();
    // getDoctor();
})
const getUser = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/user/user', {
            method: 'GET',
            headers,
            query: {
                roleId: 1,
            }
        })


        users.value = data
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const getProduct = async () => {
  try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/product/products', {
      method: 'GET',
      headers,
    //   query: defaultData.value?
    })


    allProduct.value = data
   

  } catch (error) {

    ;
    // navigateTo("/login")
  }
  

}

const getDoctors = async (id) => {
  try {
    const response = await $fetch("/api/product/doctorsProducts", {
      method: "GET",
      query: {
        id: id
      },
    });

    if (response.isSuccess) {
      doctors.value = response.data;
    }
    ;
    ;
  } catch (error) {
    ;
  }
}
const checkShowDatePicker = ()=>{
  ;
  if(toggleReserve.value == 'suggestedDate'){
    showDatePicker.value =false
  }else if(toggleReserve.value == 'selectDate'){
    showDatePicker.value=true;
    doctorFreeDay.value={}
  }
}
const getDoctorDate = async (id,productId,doctorId,date) => {
;
    try {
      const response = await $fetch("/api/product/doctorDay", {
        method: "GET",
        query: {
          id: id,
          productId: productId,
          doctorId: doctorId,
          date:date
        },
      });
     
      showResualt.value=true;
      return response
   
    } catch (error) {
      ;
    }

  
};
const getDoctorSuggesteDate= async ()=>{
  const response =  await getDoctorDate(userId.value,productId.value,doctorId.value,'')
  ;
  if(response.isSuccess){
    isTime.value=true;
    doctorDays.value = response.data
  }else{
    isTime.value=false
  }

}

const getDoctorfreeTime= async ()=>{
  const response =  await getDoctorDate(userId.value,productId.value,doctorId.value,dateSelected.value)
  ;
    if(response.isSuccess){
      isTimeFree.value='yesTime';
      doctorFreeDay.value = response.data
    }else{
      isTimeFree.value='noTime'
    }
}

const cartBody = ref({
  cartUpdateType: 1,
  returnCart: true,
  userId: null,
  uniqueId: "",
  addressId: null,
  rebateCode: "",
  deliveryId: null,
  merchantId: null,
  cartItemId: null,
  doctorDay: null,
});
const loading=ref(false)

const submite = async () => {    
    if(loading.value)
    return
loading.value=true
  // cartBody.value.userId=userId.value;
  //   if(toggleReserve.value ='suggestedDate'){
  //     cartBody.value.doctorDay=doctorDays.value
  //   }else if(toggleReserve.value ='myselsectedTime'){
  //     cartBody.value.doctorDay=doctorFreeDay.value
  //   }
    try {
        const response = await $fetch("/api/rebate/rebate", {
          method: "POST",
          body: cartBody.value,
        });

        if (response.isSuccess) {
           toast.add({description:`${response.messages[0].item1}`,color:'green'});
        } else {
      toast.add({description:`${response.messages[0].item1}`,color:'red'});
        }
      } catch (error) {
        ;
      }
      loading.value=false

    
};
const setOrder = async () => {
  cartBody.value.userId=userId.value;
  cartBody.value.cartUpdateType=10;
  try {
        const response = await $fetch("/api/cart/cart", {
          method: "POST",
          body: cartBody.value,
        });

        if (response.isSuccess) {
          toast.add({description:`${response.messages[0].item1}`,color:'green'});
        } else {
         toast.add({description:`${response.messages[0].item1}`,color:'red'});
        }
          
        ;
        ;
      } catch (error) {
        ;
      }
      
    
};
</script>

<style lang="scss" scoped>
input{
  border: 1px solid #3333
}
</style>