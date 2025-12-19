<template>
    <div class="p-6 sm:p-10 space-y-6">

            <div class="parent-box">
                <div class="title">
                    <strong> افرودن تخفیف </strong>
                </div>
               
                <div class="acardeon content-box" v-if="! route.query.storeId">
                    <div class="title-box flex items-center justify-between" @click="acardeonHandler">
                        <span> فروشنده </span>
                        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
                                fill="black" />
                        </svg>

                    </div>
                    <div class="body-box flex flex-wrap p-2 items-start hidden">

                            <ul>
                                <li v-for="item in allStore?.list" class="mb-2">
                                   
                                    <input type="radio" name="store" :value="item?.id" v-model="newData.storeId" :id="item?.name"> 
                                    <label class="ms-2
                                    
                                    
                                    " :for="item?.name">{{ item?.name  }}</label>
                                </li>
                            </ul>

                    </div>
                </div>
                <div class="acardeon content-box">
                    <div class="title-box flex items-center justify-between" @click="acardeonHandler">
                        <span> {{ $t('Information') }} </span>
                        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
                                fill="black" />
                        </svg>

                    </div>
                    <div class="body-box flex flex-wrap p-2 items-start hidden">
                        <div class="w-full flex flex-wrap">
                           
                        <div class="input-box flex w-1/3  flex-col p-1">
                            <label for=""> درصد:</label>
                            <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newData.percent" id="">
                        </div>
                        
                       
                       
                        
                     
                        
                        
                        <div class="input-box flex flex-col lg:w-2/6 p-1">
                            <label for="">  گروه تخفیف:</label>
                            <select v-model="newData.discountGroupId" name="" id=""  class="p-2 bg-white border max-w-[400px] w-full">
                                <option 
                                class="w-full"
                               :value="item.id" v-for="item in discountGroup?.list" :key="item?.id">
                                    {{ item?.name }}
                                </option>
                                </select>
                        </div>
                        <div class="input-box flex flex-col lg:w-2/6 p-1">
                            <label class="mb-2" for="">   پایان تخفیف:</label>
                            <date-picker class="min-h-[48px]" :min-date="dateNow" type="date" v-model="newData.endDate"  placeholder="تاریخ رو انتخاب کنید.." />
                        </div>
                        {{dataID}}
                        <div class="input-box flex flex-col w-full p-1" v-if="isShow && type?.label != 'DiscountType_Category'">
                            <label for=""> {{ myType?.name }} :</label>
                            <select  name="" id=""  class="p-2 bg-white border  w-full">
                                <option   class="w-full" @click="()=>{
                                    dataID = item?.id;
                                    
                                }" :value="item" v-for="item in allData?.list" :key="item?.id">
                                    {{ item?.name }}
                                </option>
                                </select>
                        </div>
                  
                        </div>
                       

                    </div>
                </div>
             
                <div class="submit-box flex flex-wrap justify-end w-full">
     
                    <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white " @click="cancel">{{ $t('cancel') }}</button>

                    <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white " v-if="isEdite==false" @click="submitInfo('insert')">{{ $t('confirm') }}</button>
                    <button class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white " v-if="isEdite==true" @click="submitInfo('edite')">{{ $t('edite') }}</button>
                </div>
            </div>  
    </div>
   
</template>

<script setup>
const  toast = useToast()
const route = useRoute();
const newData = ref({
  "id": 0,
  "typeId": route.query.typeId ,
  "discountGroupId": null,
  "endDate": null,
  "storeId": route.query.storeId,
  "percent": null,
  "synced": true,
  "categoryId": route.query.catId || null,
  "brandId": route.query.brandId || null,
  "productId": route.query.productId || null,
  "productItemId": route.query.productItemId || null,
  "active": true
})
const dateNow=ref();
const date = new Date();
const yyyy = date.getFullYear();

const isEdite = ref(false)
const dataID=ref()
const parentType = ref([])
const parentTypeId = ref()
const categoryList = ref()



const allStore= ref();
const allData = ref()
const isShow = ref(false)
const discountGroup=ref()
let mm = date.getMonth() + 1; // Months start at 0!
let dd = date.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
dateNow.value = yyyy + '/' + mm + '/' + dd;


const getDiscountGroup = async () => {
    // ;
    try {
        // const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/DiscountGroup/DiscountGroup', {
            method: 'GET',
            
            query: {
    CategoryId: null,
    CategoryLabel: "",
    Q: null,
    PageIndex: 1,
    pageSize:100,
    SortBy: 0,
    Available: true
}
        })


        discountGroup.value = data
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

onMounted(async() => {

    if(route.params.id!='new'){
      await  pageLoader(route.params.id)
        isEdite.value = true
    }
  await  getDiscountType()
 await  getStore()
 await getDiscountGroup()
})
const getStore = async () => {
    
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/store/store', {
            method: 'GET',
            headers,
            query: {
                
                PageSize: 50
                
            }
        })


        allStore.value = data
        

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const getDiscountType = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/code/code", {
      method: "GET",
      headers,
      query: {
        CodeGroupLabel: "Discount_Type",
      },
    })

    
   
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const acardeonHandler = (event) => {
    const parent = event.target.closest(".acardeon ");
    parent.children[1].classList.remove("hidden");
}


const pageLoader = async (id) => {

try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/variety/varietyItem', {
        method: 'GET',
        headers,
        query: {
            varietyId: id
        }
    })


    ;
    ;
    newData.value = data.data
} catch (error) {

    ;
    // navigateTo("/login")
}

}



const submitInfo = async (type) => {
    ;

    if(type=='insert'){
      

        try {
       
        const insert = await $fetch('/api/Discount/Discount', {
            method: "POST",
            body: newData.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        // pageLoader()
        if(insert.isSuccess){
             
             toast.add({description:"با موفقیت ثبت شد.",color:'green'});
             
        // navigateTo("/discount") 
        }else{
            insert.messages.forEach(element => {
        toast.add({description:element.item1,color:'red'});
                
            });
        }
        
      


    } catch (error) {
        
    }
    
    }
    if(type=='edite'){
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch('/api/Discount/Discount', {
            method: "PUT",
            body: newData.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        if(insert.isSuccess){
             
             toast.add({description:"با موفقیت ویرایش شد.",color:'green'});
        // navigateTo("/variety") 
        }else{
            insert.messages.forEach(element => {
        toast.add({description:element.item1,color:'red'});
                
            });
        }
        


    } catch (error) {
        ;
    }
   
    }
    
}

const cancel = () =>{
    navigateTo("/Discount")
}

</script>

<style lang="scss" scoped>
.acardeon {
    border: 1px solid #3333;
    background-color: #fff;
    padding: 15px 20px;
    margin-top: 10px;
    border-radius: 5px;
    transition: 0.2s;

    svg {
        width: 12px;
    }


    &:hover {
        box-shadow: 0 2px 0px #1f2937;
    }

    .title-box {
        cursor: pointer;
    }

    .body-box {
        min-height: 100px;
        border-top: 1px solid #3333;
        margin-top: 20px;
    }
}
</style>