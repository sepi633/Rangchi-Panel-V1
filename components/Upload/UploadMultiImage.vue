<template lang="">
  <div class="upload flex flex-wrap w-full">
    <div class="lg:w-3/6 p-3 upload-info">
      <h1>{{$t('fileuploadL')}}</h1>
      <hr />
      <ul>
        <li>
          <span>  {{$t('File name')}}  :</span>
          <span>{{fileName}}</span>
        </li>
        <li>
          <span>{{$t('Filetype')}} :</span>
          <span>{{fileType}}</span>
        </li>
        <li>
          <span> {{$t('Size')}} :</span>
          <span>{{fileSize}}</span>
          <sub>(Kb)</sub>
        </li>
      </ul>
      <hr />
      <div class="flex ">
        <!-- <div class="lg:w-3/6 p-1">
          <button :class="{'deActive' : !confirmtStatus}" @click="" 
          class="btn w-full rounded p-2 bg-[#136b57] text-white w-100">تایید و بارگذاری</button>
        </div> -->
        <div class="input-box flex w-1/3  flex-col p-1">
          <label for=""> {{ $t('label') }}:</label>
          <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="label" id="">
      </div>
        <div class="lg:w-full p-1">
          <button :class="{'deActive' : !selectStatus}" @click="confirmUpload" class="btn w-full rounded text-white p-2 bg-[#0d37b8] w-100 flex items-center justify-center">
            <LoadingTinyLoading v-if="loader == true" />
            {{$t('fileuploadL')}}</button>
        </div>
      </div>
    </div>
    <div class="lg:w-3/6 upload-box relative">
      <button class="flex absolute left-1 top-1 bg-red-300 p-2 rounded border" @click="clear">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z" fill="black"/>
</svg>

{{$t('Delete')}}</button>
      <img
        class="check-image"
        v-if="selectStatus == true"
        :src="fileAddress"
        alt="فابل آپلود شده"
      />
      <label class="select-file" v-else for="choose-file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-upload"
          viewBox="0 0 16 16"
        >
          <path
            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
          />
          <path
            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
          />
        </svg>
        <span> {{$t('Clicktoselectthefile')}}</span>
      </label>
      <input id="choose-file" @change="fileSelect" type="file" />
      
    </div>
    <div class="total-images" v-if="$route?.params?.id != 'new'">
      <div class="flex flex-wrap"  v-if="producList.length >0">
        <img v-for="item in producList" :src="showImageBaseUrl+item?.picture?.url" alt="" />

      </div>
        <NuxtLink  :to="`/product/otherImage${$route?.params?.id}`" class="bg-white m-1 rounded p-2 w-[80px] flex items-center justify-center">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <span> افزودن </span>
        </NuxtLink>
       
      </div> 

    
  </div>

</template>
<script setup>
const {public: { imageUploaderUrl ,showImageBaseUrl}} = useRuntimeConfig();

const props = defineProps(['producList'])

const selectStatus = ref(false);
const confirmtStatus = ref(false);
const fileName = ref("name");
const fileType = ref("type");
const fileAddress = ref("address");
const fileSize = ref("size");
const fileAddressList = ref([]);
const orgFile = ref();
const orgLocation = ref();
const picId = ref(null);
const loader = ref(false);
const label=ref('')
const fileSelect = (event) => {
;
const [file] = event.target.files;
orgFile.value = event.target.files[0];
orgLocation.value = event.target.value;
fileAddress.value = URL.createObjectURL(file);
fileName.value = file.name;
fileType.value = file.type;
fileSize.value = parseInt(file.size) / 1000;
selectStatus.value = true;
;
};

const emit = defineEmits([
'getPictureId'
])

const confirmUpload = async () => {
loader.value = true;
const formData = new FormData();
formData.append("PictureFile", orgFile.value, orgLocation.value);

try {
const insert = await $fetch(imageUploaderUrl, {
  method: "POST",
  body: formData,
  headers: {
    Accept: "*/*",
  },
});

loader.value=false
emit('getPictureId',picId.value,label.value);
picId.value = insert?.data?.id;
confirmtStatus.value = true;
} catch (error) {
;
}
};

const clear = ()=>{

const input = document.querySelector("#choose-file")
input.value = ""
selectStatus.value = false

}
</script>
<style lang="scss" scoped>
.upload {
.upload-info {
h1 {
  font-size: 20px;
}

.deActive {
  pointer-events: none;
  filter: grayscale(1);
  opacity: 0.5;
}
}

.upload-box {
input {
  display: none;
}

.check-image {
  width: 100%;
  height: 205px;
  object-fit: contain;
  background: #e3e3e3;
  border-radius: 5px;
  border: 1px solid #3333;
  padding: 5px;
}

.select-file {
  background: #e3e3e3;
  width: 100%;
  min-height: 205px;
  border-radius: 5px;
  border: 1px solid #3333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}


}
}
.total-images {
  width: 100%;
  min-height: 100px;
  background-color: #e3e3e3;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #3333;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row-reverse;
  overflow-y: hidden;
  overflow-x: hidden;

  label {
    background-color: #fff;
    height: 90px;
    border-radius: 5px;
    min-width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3333;
    flex-direction: column;
    cursor: pointer;
    margin: 5px;

  }
  img {
    width: 90px;
    height: 90px;
    background-color: #3333;
    margin: 5px;
    border-radius: 5px;
    border: 0;
  }
}
</style>
