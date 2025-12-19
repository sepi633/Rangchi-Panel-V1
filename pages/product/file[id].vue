<template>
  <div>
     <ProductProducttoolbox />
     <div class="file-all relative pt-3">
       
       <button
       class="absolute left-0 top-0 p-2 bg-white rounded border border-[#1f2937] flex items-center text-sm"
      @click="
        () => {
          inserFile = true;
          isHeader = true;
          isEdite = false;
          newPost.parentId = null;
          newPost.name = '';
          newPost.protected = false;
          newPost.label = '';
          newPost.fileId = null;
          }
      "
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13H13V19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H11V5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z"
          fill="black"
          />
      </svg>
      
      افزودن فایل
    </button>
    
    <div
      class="file-new bg-white p-3 mt-5 rounded border"
      v-if="inserFile == true"
    >
      <div class="file-header flex flex-wrap">
        <div class="lg:w-2/6 w-full flex-col p-1">
          <label for="">نام:</label>
          <input class="border w-full p-1" type="text" v-model="newPost.name" />
        </div>
        <div class="lg:w-2/6 w-1/2 flex-col p-1">
          <label for="">برچسب:</label>
          <input
          class="border w-full p-1"
            type="text"
            v-model="newPost.label"
          />
        </div>
        <div class="lg:w-1/6 w-1/2 flex-col p-1">
          <label for="">اولویت:</label>
          <input
            class="border w-full p-1"
            type="number"
            v-model="newPost.priority"
          />
        </div>
        <!-- <div class="lg:w-1/6  w-full flex-col p-1"  v-if="isHeader==false">
                <label for="">وضعیت:</label>

                <div class="flex  hidden">
                    <input type="checkbox" name="aa" id="no" @change="isHeader = !isHeader">
                <label class="cursor-pointer" for="no">سرفصل نیست</label>
                </div>

            </div> -->
      </div>
      
          <div class="flex w-full" v-if="newPost?.file" >

        <NuxtLink :to="getFileUrl(newPost.file)" class="flex w-full justify-center p-4 bg-blue-500 text-white">
          دانلود فایل
        </NuxtLink>    
        <div class="bg-red-500 w-max p-2" @click="newPost.fileId=null;newPost.file=null">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"/></svg>
        </div>
      </div>  
        <UploadFile v-else
        
        @getPictureId="
          (n,_file) => {
            newPost.fileId = n;
            newPost.file=_file
          }
        "
      />

      <br />
      <hr />
      <div class="flex justify-end">
        <!-- <div class="flex items-center me-auto" >
          <label
            for="toggle"
            class="toggle border h-[34px] pt-[1px] w-[70px] mx-2 bg-blue-700 mt-2 rounded-[18px] flex overflow-hidden"
          >
            <input
              type="checkbox"
              class="hidden lock"
              name=""
              v-model="newPost.protected"
              id="toggle"
            />
            <strong></strong>
            <span
              class="border bg-white block w-[30px] h-[30px] rounded-[50%] mx-[1px]"
            >
            </span>
          </label>
          <span>قفل شدن فایل</span>
        </div> -->

        <UButton
          v-if="isEdite"
          class="p-2 bg-blue-700 text-white rounded m-1"
          @click="submitInfoEdite"
        >
          ویرایش
        </UButton>
        <UButton
          v-else
          :loading="loading"
          class="p-2 bg-green-700 text-white rounded m-1 px-4"
          @click="submitInfo"
        >
          ثبت
        </UButton>
      </div>
    </div>
    <details
      class="file-box bg-white border p-3 my-3 rounded hover:border-[#1f2937]"
      v-for="item in pageData"
      :key="item?.id"
    >
      <summary class="strong">
        {{ item?.name }}
        <!-- {{ item?.id }} -->
      </summary>
      <ul class="children">
        <li>
          <video v-if="item?.file?.url?.includes('mp4')" :src="getFileUrl(item?.file)" class="max-w-[500px] mx-auto"/>
                <NuxtLink :to="getFileUrl(item.file)" v-else class="flex justify-center p-4 bg-blue-500 text-white">
        دانلود فایل
      </NuxtLink>    
      <!-- <div>
        فایل قفل : {{ item.protected?'هست':'نیست' }}
      </div> -->
        </li>

        <li class="flex">

          <span @click="newPost={...item};isEdite=true;inserFile=true" class="flex w-1/4 bg-orange-100 border ms-auto rounded mt-2 text-sm p-3 items-center cursor-pointer hover:border-orange-700 me-1 ">
            <svg data-v-b76ad084="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path data-v-b76ad084="" d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path></svg>
        ویرایش 
        </span>

        <span @click="deleteItem(item?.id)"
        class="flex w-1/4 bg-red-100 border ms-auto rounded mt-2 text-sm p-3 items-center cursor-pointer hover:border-red-700">
            <svg data-v-b76ad084="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path data-v-b76ad084="" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path data-v-b76ad084="" fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
            حذف 
        </span>
        </li>
      </ul>
    </details>
  </div>
</div>
</template>

<script setup>
import { UButton } from '#components';

const isHeader = ref(true);
const isLock = ref(false);
const loading=ref(false)
const route = useRoute();
const pageData = ref(null);
const inserFile = ref(false);
const {getFileUrl}=usePicture()
const newPost = ref({
  name: "",
  productId: null,
  fileId: null,
  label: " ",
  protected: false,
  parentId: null,
  priority: 0,
});

const isEdite = ref(false);
onMounted(() => {
  newPost.value.productId = route.params.id;
  pageLoader();
});

const pageLoader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/product/productFile", {
      method: "GET",
      headers,
      query: {
        ProductId: route.params.id,
      },
    });

    // newPost.value = data?.data;
    // newCategory.value.parentId = pageData?.value.parentId
    console.log(data);
    pageData.value = data?.list;
  } catch (error) {
    console.log(error);
    // navigateTo("/login")
  }
};

const submitInfo = async () => {
  if(loading.value)return
  loading.value=true
  try {
    const data=JSON.parse(JSON.stringify(newPost?.value))
    delete data?.file
    const insert = await $fetch("/api/product/productFile", {
      method: "POST",
      body: data,

    });

    pageLoader();
    console.log(insert);
    // navigateTo("/content");
  } catch (error) {
    console.log("ERROR:" + error);
  } finally {
    // addStatus.value=false;
    let parent=newPost.value?.parentId
    newPost.value = {
      name: "",
      productId: route.params.id,
      fileId: null,
      label: " ",
      protected: true,
      parentId: parent,
      priority: 0,
      file:null
    };
  }
  loading.value=false
};
const submitInfoEdite = async () => {
  try {
    const insert = await $fetch("/api/product/productFile", {
      method: "PUT",
      body: newPost.value,
    });

    pageLoader();
  } catch (error) {
    console.log("ERROR:" + error);
  } finally {
    newPost.value = {
      name: "",
      productId: route.params.id,
      fileId: null,
      label: " ",
      protected: true,
      parentId: null,
      priority: 0,
    };
  }
};
const getItem = async (item) => {
  try {
    // const headers = useRequestHeaders(["cookie"]);

    // const data = await $fetch("/api/product/productFileItem", {
    //   method: "GET",
    //   headers,
    //   query: {
    //     id: id,
    //   },
    // });

    inserFile.value = true;
    isHeader.value = false;
    isEdite.value = true;
    newPost.value = item;
    console.log(data);
  } catch (error) {
    console.log("error");
    console.log(error);
    // navigateTo("/login")
  }
};
const deleteItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/product/productFile", {
      method: "DELETE",
      headers,
      query: {
        id: id,
      },
    });

    console.log(data);
    pageLoader();
  } catch (error) {
    console.log("error");
    console.log(error);
    // navigateTo("/login")
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;
  cursor: pointer;
  span {
    margin-right: 1px;

    transition: 0.15s;

    position: relative;
  }

  strong {
    &::after {
      content: " ";
      width: 80px;
      height: 40px;
      background: #e3e3e3;
      position: absolute;
      right: 0;
      top: 0;
    }

    &::before {
      content: " ";
      width: 80px;
      height: 40px;
      background: #04dd21;
      position: absolute;
      right: 0;
      top: 0;
      display: none;
    }
  }
}
.lock:checked + strong + span {
  margin-right: 37px;
  transition: 1s;
}

.lock:checked + strong {
  &::after {
    display: none;
  }
  &::before {
    display: block;
  }
}
</style>
