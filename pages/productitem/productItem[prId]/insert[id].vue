<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div class="parent-box">
   
    
    
    
    <div class="acardeon content-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span>  انتخاب فروشنده </span>
        <svg
          width="17"
          height="11"
          viewBox="0 0 17 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="body-box flex flex-wrap p-2 items-start hidden">
        <ul>
          <li v-for="item in storeList?.list">
               
                <input v-model="newProductItem.storeId" :value="item?.id" type="radio" :checked="item?.id == newProductItem.storeId " :id="item?.name" name="store"> 
                <label class="ms-2" :for="item?.name">{{ item?.name }}</label>
          </li>
        </ul>
        
      </div>
    </div>
   
    <div class="acardeon content-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span>  {{ $t('Information') }} </span>
        <svg
          width="17"
          height="11"
          viewBox="0 0 17 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="body-box block flex-wrap p-2 items-start hidden">
       
        <button @click="modal.openModal" class=" bg-green-700 mb-2 text-white rounded px-1.5 py-1 flex ms-auto">افزودن تنوع محصول</button>
        <!-- {{peoductItemsfullList}} -->
<div class="flex flex-wrap">
  <div v-for="(item,index) in peoductItemsfullList" class=" lg:w-1/3 md:w-1/2 border gap-1 p-1 rounded" >
          
        
          <div class=" flex">
              <p>{{ item?.varity?.name }} :</p>
            <p>{{item?.varityItem?.name}}</p>
          </div>
          <p> قیمت پایه:{{ parseInt(item?.basePrice).toLocaleString() }}</p>
          <p>  تعداد:{{ item?.quantity }}</p>
          <button class="flex justify-center bg-red-700 text-[#fff] w-full rounded" @click="removeProductItem(index)" >حذف</button>
        </div>
        </div>
       
      
      </div>
    </div>
    

    <div class="submit-box flex flex-wrap justify-end w-full">
      <!-- <div class="flex justify-start mr-auto lg:w-4/12 items-center pt-3">
        <input class="border mx-2" type="checkbox" @change="newProductItem.active= !newProductItem.active" :checked="newProductItem.active" id="active" />
        <label for="active" 
          >{{ $t('IWantToDisplayOnTheSite') }}</label
        >
      </div>  -->
      <button
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        @click="cancel"
      >
      
        {{ $t('cancle') }}
      </button>

      <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white"
        v-if="isEdite == false"
        @click="submitInfo('insert')"
      >
      
        {{ $t('confirm') }}
      </button>
      <button
        class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white"
        v-if="isEdite == true"
        @click="submitInfo('edite')"
      >
        {{ $t('confirm') }}
      </button>
    </div>
  </div>
 
  <Modal ref="modalItem">
      <template v-slot:header>
           انتخاب مقدار تنوع محصول
      </template>
      <template v-slot:body>
           <div>
                <p class=" font-bold mb-2">مقادیر تنوع محصولات:</p>
                <ul>
                  <!-- {{currentVarity}} -->
                  
                    <li v-for="item in currentVarity?.varietyItems" > 
                        <input @change="()=>{modalItem.closeModal();modal.openModal();currentVarityItem=item}" :value="item?.id" v-model="newModel.varietyItemId"  class="me-2" type="radio" name="varityitem" :id="item?.name">
                        <label :for="item?.name">{{ item?.name }}</label>

                    </li>

                </ul>
                
           </div>
      </template>
  </Modal>
  </div>
  
</template>

<script setup>
const  toast = useToast()
const {
  public: { showImageBaseUrl },
} = useRuntimeConfig();
const {public: { imageUploaderUrl }} = useRuntimeConfig();
const modal =ref(null)
const modalItem =ref(null)
const imageSelect = ref(false);
const imageSrc = ref();
const orgFile = ref()
const orgLocation = ref()
const currentVarity=ref()
const fileType = ref()
const fileSize = ref()
const Url=ref('')
const route = useRoute();
const currentVarityItem=ref(null);
const isEdite = ref(false);
const productStatus = ref();
const storeList=ref();
const newProductItem = ref(
  {
  "storeId": storeList.value?.list[0]?.id,
  "productId": route.params.prId.split('-')[0],
  "productItems": [ ]
}
);
const newModel=ref( {
      
      "basePrice": null,
      "varietyItemId": null,
      "quantity": null
     
    })

   
const peoductItemsfullList = ref([])
const addToproductItems = ()=>{
  let isAdd=true
  // modal.value.closeModal()
    if(newModel.value.quantity != null && newModel.value.varietyItemId != null && newModel.value.basePrice != null){
      ;
    
      if(newProductItem.value.productItems.length > 0){
      
        
        newProductItem.value.productItems.forEach((el)=>{
          ;
          
          ;
          
          if(el?.varietyItemId ==  newModel.value.varietyItemId ){
            isAdd=false
          }
                  }) 

                  if(isAdd){
                    newProductItem.value.productItems.push({
          "id": 0,
      "basePrice": newModel.value.basePrice,
      "varietyItemId": newModel.value.varietyItemId,
      "quantity": newModel.value.quantity,
      "active": true, 
      "productId": newProductItem.value.productId,    
      "storeId": newProductItem.value.storeId
        });
      peoductItemsfullList.value.push({
        "quantity": newModel.value.quantity,
        "basePrice": newModel.value.basePrice,
       "varity":currentVarity.value,
       "varityItem":currentVarityItem.value
      })
      toast.add({description:"با موفقیت اضاقه  شد.",color:'green'});
      newModel.value.basePrice=null;
      newModel.value.quantity=null;
      newModel.value.varietyItemId=null;
      modal.value.closeModal();
                  }else{
                    toast.add({description:" مقدار انتخاب شده تنوع محصول تکراری است!  ",color:'red'});
                  }
                  isAdd = true
      }else{
        newProductItem.value.productItems.push({
          "id": 0,
      "basePrice": newModel.value.basePrice,
      "varietyItemId": newModel.value.varietyItemId,
      "quantity": newModel.value.quantity,
      "active": true, 
      "productId": newProductItem.value.productId,    
      "storeId": newProductItem.value.storeId
        });
      peoductItemsfullList.value.push({
        "quantity": newModel.value.quantity,
        "basePrice": newModel.value.basePrice,
       "varity":currentVarity.value,
       "varityItem":currentVarityItem.value
      })
      toast.add({description:"با موفقیت اضاقه  شد.",color:'red'});
      newModel.value.basePrice=null;
      newModel.value.quantity=null;
      newModel.value.varietyItemId=null;
      modal.value.closeModal();
      }
    ;
    
    }else{
      toast.add({description :"پر کردن تمامی فیلد ها الزامی می باشد!",color:'red'});

     

      
    }
    
}
const removeProductItem = (index)=>{
  peoductItemsfullList.value.splice(index,1);
  newProductItem.value.productItems.splice(index,1)
  toast.add({description:"با موفقیت حذف  شد.",color:'green'});
    }
const allVariety = ref();
onMounted(() => {
  if (route.params.id != "new") {
    pageLoader();
   
    isEdite.value = true;
  }
  getStores();
  getAllvariety();
});
const getAllvariety = async () => {
   
    try {
    

        const data = await $fetch('/api/variety/variety', {
            method: 'GET',
         
            query:{
         PageSize:50
    
            }
        })

        allVariety.value = data
      
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const pageLoader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/productitem/productitem", {
      method: "GET",
      headers,
      query: {
        id: route.params.id,
      },
    });

    newProductItem.value = data?.data;
  //  Url.value = data?.data
  
    
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};
const getStores = async () => {

    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/store/store', {
            method: 'GET',
            headers,
            query: {
               
                PageIndex:1,
                PageSize: 30,
                
            }
        })


        storeList.value = data
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const acardeonHandler = (event) => {
  let isOpen=true;
  const parent = event.target.closest(".acardeon ");
  const classList = parent.children[1].classList;
 for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    ;
    if(element == 'hidden'){
      isOpen=false
    }else{
      isOpen=true
    }
 }
 if(isOpen == false){
    parent.children[1].classList.remove("hidden");
 }else{
  parent.children[1].classList.add("hidden");
 }

};





const submitInfo = async (type) => {
  ;
  
  if (type == "insert") {
    try {
  
      const insert = await $fetch("/api/productitem/productitem", {
        method: "POST",
        body: newProductItem.value,
        query:{
          StoreId:newProductItem.value.storeId
        },
        headers: {
          Accept: "application/json",
      
        },
      });

      // pageLoader()
      ;
      navigateTo(`/productitem/productItem${route.params.prId}`);
    } catch (error) {
      ;
    } finally {
      // addStatus.value=false;
    }
  }
  if (type == "edite") {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/productitem/productitem", {
        method: "PUT",
        body: newProductItem.value,
        headers: {
          Accept: "application/json",
        },
      });

      navigateTo(`/productitem/productItem${route.params.prId}`);
      ;
    } catch (error) {
      ;
    } finally {
      addStatus.value = false;
    }
  }
};

const cancel = () => {
  navigateTo(`/productitem/productItem${route.params.prId}`);
};

const chooseFile = (event) => {
  ;
  const [file] = event.target.files;
  orgFile.value = event.target.files[0];
  orgLocation.value = event.target.value;
  // imageSrc.value = URL.createObjectURL(file);

  fileType.value = file.type;
  fileSize.value = parseInt(file.size) / 1000;
  imageSelect.value = true;
  ;
  ;
  confirmUpload()
};

const loader = ref(false)
const confirmUpload = async () => {
  loader.value = true;
  ;
  ;
  ;

  const formData = new FormData();
  formData.append("PictureFile", orgFile.value, orgLocation.value);
  // ;
  try {
    const insert = await $fetch(imageUploaderUrl, {
      method: "POST",
      body: formData,
    })

    // emit('getPictureId',picId)
    // pageLoader()
    ;
    ;
    newProductItem.value.pictureId = insert?.data?.id;
    // confirmtStatus.value = true;
    imageSrc.value = `https://namavar-file.bhpsolution.com/${insert?.data?.url}` 
    loader.value=false

  } catch (error) {
    ;
  }
};

const clear = ()=>{

  const input = document.querySelector("#chooseproduct-file")
  input.value = ""
  imageSelect.value = false
  imageSrc.value = null

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

input:focus{
  box-shadow: unset !important;
  border: unset;
  outline: unset;
}
</style>