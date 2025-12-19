<template>
    <div class="p-6 sm:p-10 space-y-6">

            <div class="parent-box">
                <div class="title">
                    <strong> {{ $t('additem') }}</strong>
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
                            <label for=""> {{ $t('name') }}:</label>
                            <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newFeature.name" id="">
                        </div>
                      
                       
                        <div class="input-box flex flex-col p-1 w-1/3 ">
                            <label for=""> {{ $t('priority') }}:</label>
                            <input class="border w-full h-[40px] mt-2" type="number" name="" v-model="newFeature.priority" id="">
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


const {public:{showImageBaseUrl}} = useRuntimeConfig()
const toast=useToast()
const route = useRoute();
const newFeature = ref({
  "id": 0,
  "name": "",
  "featureId": route.query.id,
  "priority": 0
})
const isEdite = ref(false)
const parentType = ref([])
const parentTypeId = ref()
const categoryList = ref()
const categoris = ref()
const selectedCategory = ref()
const allowToSubmit=ref(true)

const types = ref();
onMounted(async() => {

    if(route.params.id!='new'){
        pageLoader(route.params.id)
        isEdite.value = true
    }
    
})



const acardeonHandler = (event) => {
    const parent = event.target.closest(".acardeon ");
    parent.children[1].classList.remove("hidden");
}


const pageLoader = async (id) => {

try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/featureItem/featureItem', {
        method: 'GET',
        headers,
        query: {
            featureId: id
        }
    })

    newFeature.value = data.data
} catch (error) {

    ;
    // navigateTo("/login")
}

}


const submitInfo = async (type) => {
    if(!allowToSubmit.value) return  ;
    allowToSubmit.value = false
    try {
    if(type=='insert'){
        const insert = await $fetch('/api/featureItem/featureItem', {
            method: "POST",
            body: newFeature.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        // pageLoader()
        ;
        navigateTo("/Feature")

    }
    if(type=='edite'){
        const insert = await $fetch('/api/featureItem/featureItem', {
            method: "PUT",
            body: newFeature.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        navigateTo(`/featuresitem?id=${route.query.id}`)
        
    }
} catch (error) {
    toast.add({description:'مشکلی پیش امده است دوباره تلاش کنید.',color:'red'})
}
    allowToSubmit.value=true
}

const cancel = () =>{
    navigateTo(`/featuresitem?id=${route.query.id}`)
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