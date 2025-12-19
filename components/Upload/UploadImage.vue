<template>
  <div class="upload flex flex-wrap-reverse w-full">
    <div class="lg:w-3/6 p-3 upload-info lg:min-w-[400px] mx-auto">
      <div class="flex gap-2 p-1">
        <h1>اپلود عکس</h1>
        <UploadChoose @accept="choose" />
      </div>
      <hr />
      <ul>
        <li>
          <span> {{ $t("File name") }} :</span>
          <span>{{ fileName }}</span>
        </li>
        <li>
          <span>{{ $t("Filetype") }}:</span>
          <span>{{ fileType }}</span>
        </li>
        <li>
          <span> {{ $t("Size") }}:</span>
          <span>{{ fileSize }}</span>
          <sub>(Kb)</sub>
        </li>
      </ul>
      <hr />
      <div class="flex">
        <div class="lg:w-full p-1">
          <div class="input-box flex w-1/3 flex-col p-1">
            <label for=""> {{ $t("label") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="label"
              id=""
            />
          </div>
          <!-- <div class="input-box flex w-1/3 flex-col p-1">
            <label for=""> {{ $t("label") }}2:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="coordinate"
              id=""
            />
          </div> -->
          <button
            :class="{ deActive: !selectStatus }"
            @click="confirmUpload"
            class="btn w-full rounded text-white p-2 bg-[#0d37b8] w-100 flex items-center justify-center"
          >
            <LoadingTinyLoading v-if="loader == true" />
            {{ $t("fileuploadL") }}
          </button>
        </div>
      </div>
    </div>
    <div class="lg:w-3/6 lg:min-w-[400px] upload-box mx-auto relative">
      <button
        class="flex items-center absolute left-1 top-1 bg-red-300 p-2 rounded border"
        @click="clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
          <path
            fill="currentColor"
            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
          />
        </svg>

        {{ $t("Delete") }}
      </button>
      <img
        class="check-image"
        v-if="selectStatus == true"
        :src="fileAddress"
        alt="فابل آپلود شده"
      />
      <label class="select-file" v-else :for="FileInputId">
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
        <span>{{ $t("Clicktoselectthefile") }}</span>
      </label>

      <input :id="FileInputId" @change="fileSelect" type="file" />
    </div>
  </div>
</template>
<script setup>
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const props = defineProps({
  FileInputId: {
    type: String,
    default: "file",
  },
});
const toast = useToast();
const selectStatus = ref(false);
const label = ref("");
const coordinate = ref("");
const fileName = ref("name");
const fileType = ref("type");
const fileAddress = ref("address");
const fileSize = ref("size");
const fileAddressList = ref([]);
const orgFile = ref();
const orgLocation = ref();
const picId = ref(null);
const loader = ref(false);
const picUrl = ref("");
const fileSelect = (event) => {
  const [file] = event.target.files;
  orgFile.value = event.target.files[0];
  orgLocation.value = event.target.value;
  fileAddress.value = URL.createObjectURL(file);
  fileName.value = file.name;
  fileType.value = file.type;
  fileSize.value = parseInt(file.size) / 1000;
  selectStatus.value = true;
};

const emit = defineEmits(["getPictureId"]);

function choose(_file) {
  emit("getPictureId", _file?.id, _file);
}

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
    if (insert.isSuccess) {
      picId.value = insert?.data?.id;
      picUrl.value = insert?.data?.url;
      emit("getPictureId", picId.value, insert?.data, label.value, coordinate.value);
      toast.add({
        description: "آپلود با موفقیت انجام شد لطفا اطلاعات را وارد نمایید!",
        color: "green",
      });
    } else {
      toast.add({
        description: " آپلود ناموفق بود !" + insert.messages[0]?.item1,
        color: "red",
      });
    }
  } catch (error) {
    toast.add({
      description: " آپلود ناموفق بود !" ,
      color: "red",
    });
  }
  loader.value = false;
};

const clear = () => {
  const input = document.querySelector(`#${props.FileInputId}`);
  console.log(input, props.FileInputId);

  input.value = "";
  selectStatus.value = false;
};
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
      height: 100%;
    }

    .total-images {
      width: 100%;
      height: 100px;
      background-color: #e3e3e3;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #3333;
      padding: 5px;
      display: flex;
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
      }
      img {
        width: 90px;
        height: 90px;
        background-color: #3333;
        margin: 0 5px;
        border-radius: 5px;
        border: 0;
      }
    }
  }
}
</style>
