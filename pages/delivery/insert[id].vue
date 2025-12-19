<template>
    <div class="p-6 sm:p-10 space-y-6">

            <div class="parent-box">
                <div class="title">
                    <strong> {{ $t('addFeature') }}</strong>
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
                            <div class="input-box flex w-1/3 flex-col p-1">
                            <label for=""> {{ $t('featurename') }}:</label>
                            <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newFeature.name" id="">
                        </div>
                        <div class="input-box flex w-1/3  flex-col p-1">
                            <label for=""> {{ $t('label') }}:</label>
                            <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newFeature.label" id="">
                        </div>
                       
                        <div class="input-box flex flex-col p-1 w-1/3 ">
                            <label for=""> {{ $t('priority') }}:</label>
                            <input class="border w-full h-[40px] mt-2" type="number" name="" v-model="newFeature.priority" id="">
                        </div>
                        <div class="input-box flex flex-col p-1 w-1/3 ">
                            <label for=""> {{ $t('type') }}:</label>
                            <select class="bg-white border p-1" name="" id="" v-model="newFeature.typeId">
                                <option value="" >انتخاب کنید</option>
                                <option :value="item?.id" v-for="item in types" :key="item?.id">{{item?.name}} </option>
                            </select>
                        </div>
                       
                        <div class="input-box flex flex-col lg:w-2/6 p-1">
                            <label for=""> {{ $t('Condition') }} :</label>
                            <div class="flex justify-start items-center pt-3">
                                <input class="border  mx-2" type="radio" v-model="newFeature.active" :value="true" name="active" id="r4"
                                   >

                                <label for="r4">{{ $t('active') }}</label>
                                <input class="border   mx-2" type="radio" v-model="newFeature.active" :value="false" name="active" id="r3">
                                <label for="r3">{{  $t('notActive') }}</label>
                            </div>

                        </div>
                        <div class="input-box flex flex-col lg:w-2/6 p-1">
                            <label for=""> {{ $t('hide') }} :</label>
                            <div class="flex justify-start items-center pt-3">
                                <input class="border   mx-2" type="radio" v-model="newFeature.hide" :value="true" name="hide" id="r5"
                                  >
                                <label for="r5">{{ $t('active') }}</label>
                                <input class="border  mx-2" type="radio" v-model="newFeature.hide" :value="fase" name="hide" id="r6"
                                    >

                                <label for="r6">{{  $t('notActive') }}</label>
                            </div>

                        </div>
                        <div class="input-box flex flex-col lg:w-2/6 p-1">
                            <label for=""> {{ $t('inSearch') }} :</label>
                            <div class="flex justify-start items-center pt-3">
                                <input class="border   mx-2" type="radio" v-model="newFeature.inSearch" :value="true" name="inSearch" id="r7"
                                    >
                                <label for="r7">{{ $t('active') }}</label>
                                <input class="border  mx-2" type="radio" v-model="newFeature.inSearch" :value="false" name="inSearch" id="r8"
                                   >

                                <label for="r8">{{  $t('notActive') }}</label>
                            </div>

                        </div>
                        
                        <div class="input-box flex items-baseline gap-3 lg:w-2/6 p-1">
                            <label for="">جداسازی در قسمت خصیصه اختصاصی:</label>
                                <input  type="checkbox" v-model="isExclusive">
                        </div>
                        
                        </div>
                       

                    </div>
                </div>
             
                <div class="submit-box flex flex-wrap justify-end w-full">
     
                    <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white " @click="cancel">{{ $t('cancel') }}</button>

                    <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white " @click="submitInfo()">{{ route.params.id=='new'? $t('confirm') : $t('edite') }}</button>
                </div>
            </div>  
    </div>
   
</template>

<script setup>
const toast=useToast()

const newFeature = ref({
  "id": 0,
  "name": "",
  "label": "",
  "priority": 0,
  "hide": true,
  "inSearch": false,
  "typeId": 0,
  "active": true,
  "isGroup":false
})
const isExclusive=ref(false)
const route = useRoute();
const types = ref();
onMounted(async() => {

    if(route.params.id!='new'){
        pageLoader(route.params.id)
    }
    getDeliveryType()
})



const acardeonHandler = (event) => {
    const parent = event.target.closest(".acardeon ");
    parent.children[1].classList.remove("hidden");
}


const pageLoader = async (id) => {

try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/feature/feature', {
        method: 'GET',
        headers,
        query: {
            featureId: id
        }
    })


    ;
    ;
    newFeature.value = data.data
} catch (error) {

    ;
    // navigateTo("/login")
}

}

const getDeliveryType= async()=>{

try {
  const headers = useRequestHeaders(["cookie"]);

  const data = await $fetch("/api/code/code", {
    method: "GET",
    headers,
    query: {
      CodeGroupLabel: "Feature_Type",
    },
  });

  ;
  ;
  types.value =data.list
} catch (error) {
  ;
  // navigateTo("/login")
}

}

const submitInfo = async (type) => {
    console.log(isExclusive.value);
    
    if(isExclusive.value){
        newFeature.value.label="exclusive"
        console.log(newFeature.value.typeId);
        
        if(newFeature.value.typeId==27){
            toast.add({description:'برای اضافه شدن به خصیصه اختصاصی نوع فیلد نمیتواند متن بلند باشد',color:'red'})
            return
        }
    }
    if(newFeature.value.name?.trim()?.length==0){
        toast.add({description:'نام فیلد نمیتواند خالی باشد',color:'red'})    
        return
    }
    ;
        try {
        const res = await $fetch('/api/feature/feature', {
            method:route.params.id=='new' ?"POST":"PUT",
            body: newFeature.value,
        })
        if(res.isSuccess){
            toast.add({description:'عملیات با موفقیت انجام شد',color:'green'})

            navigateTo("/Feature")
        }else{
            toast.add({description:res.messages[0]?.item1 || 'error',color:'red'})

        }
    } catch (error) {
        toast.add({description:'مشکلی پیش آمده دوباره امتحان کنید .',color:'red'})
    }
    
  
}

const cancel = () =>{
    navigateTo("/Feature")
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