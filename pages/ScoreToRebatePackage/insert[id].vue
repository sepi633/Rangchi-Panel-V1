<template>
  <div class="p-6 sm:p-10 space-y-6">
    <div class="parent-box">
      <div class="title">
        <strong>{{ $t("Addcontent") }}</strong>
      </div>

      <div class="acardeon category-box">
        <div class="title-box flex items-center justify-between" @click="acardeonHandler">
          <span>{{ $t("UploadImage") }}</span>
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
          <img
            class="h-[300px] w-full border p-1 mb-3 object-contain"
            v-if="newPackage.pictureId"
            :src="getPicUrl(newPackage.picture)"
          />
          <UploadImage
            v-else
            @getPictureId="
              (n, pic) => {
                newPackage.pictureId = n;
                newPackage.picture = pic;
              }
            "
          ></UploadImage>
          <button
            class="w-full flex justify-center bg-[#e3e3e3] p-2 rounded"
            @click="newPackage.pictureId = null"
            v-if="newPackage.pictureId"
          >
            <svg
              class="min-w-[25px] me-2"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 6.99747C3 6.20182 3.31607 5.43876 3.87868 4.87615C4.44129 4.31354 5.20435 3.99747 6 3.99747H18C18.7956 3.99747 19.5587 4.31354 20.1213 4.87615C20.6839 5.43876 21 6.20182 21 6.99747V18.9975C21 19.7931 20.6839 20.5562 20.1213 21.1188C19.5587 21.6814 18.7956 21.9975 18 21.9975H6C5.20435 21.9975 4.44129 21.6814 3.87868 21.1188C3.31607 20.5562 3 19.7931 3 18.9975V6.99747ZM19 6.99747V15.5835L15.707 12.2905C15.5195 12.103 15.2652 11.9977 15 11.9977C14.7348 11.9977 14.4805 12.103 14.293 12.2905L13 13.5835L9.207 9.79047C9.01947 9.603 8.76516 9.49768 8.5 9.49768C8.23484 9.49768 7.98053 9.603 7.793 9.79047L5 12.5835V6.99747C5 6.73225 5.10536 6.4779 5.29289 6.29036C5.48043 6.10282 5.73478 5.99747 6 5.99747H18C18.2652 5.99747 18.5196 6.10282 18.7071 6.29036C18.8946 6.4779 19 6.73225 19 6.99747ZM5 18.9975V15.4115L8.5 11.9115L12.293 15.7045C12.4805 15.8919 12.7348 15.9973 13 15.9973C13.2652 15.9973 13.5195 15.8919 13.707 15.7045L15 14.4115L19 18.4115V18.9975C19 19.2627 18.8946 19.517 18.7071 19.7046C18.5196 19.8921 18.2652 19.9975 18 19.9975H6C5.73478 19.9975 5.48043 19.8921 5.29289 19.7046C5.10536 19.517 5 19.2627 5 18.9975ZM14.5 10.9975C14.8978 10.9975 15.2794 10.8394 15.5607 10.5581C15.842 10.2768 16 9.89529 16 9.49747C16 9.09964 15.842 8.71811 15.5607 8.43681C15.2794 8.1555 14.8978 7.99747 14.5 7.99747C14.1022 7.99747 13.7206 8.1555 13.4393 8.43681C13.158 8.71811 13 9.09964 13 9.49747C13 9.89529 13.158 10.2768 13.4393 10.5581C13.7206 10.8394 14.1022 10.9975 14.5 10.9975Z"
                fill="black"
              />
            </svg>

            {{ $t("ImageEditing") }}
          </button>
        </div>
      </div>

      <div class="acardeon content-box">
        <div class="title-box flex items-center justify-between" @click="acardeonHandler">
          <span> {{ $t("Information") }} </span>
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
          <div class="flex flex-wrap">
            <div class="formField bg-white w-max md:w-1/2 border p-3">
              <label for="">عنوان :</label>
              <input class="border ms-1 p-1" v-model="newPackage.name" />
            </div>

            <div class="formField bg-white w-max md:w-1/2 border p-3">
              <label for=""> میزان امتیاز مصرفی:</label>
              <input class="border ms-1 p-1" v-model="newPackage.scoreCount" type="number" />
            </div>
            <div class="formField bg-white w-max md:w-1/2 border p-3">
              <label for=""> حداقل میزان خرید برای این کد تخفیف :</label>
              <input class="border ms-1 p-1" v-model="newPackage.minCartPrice" />
            </div>
            <div class="bg-white w-max md:w-1/2 border p-3">
              <input
                type="checkbox"
                name=""
                id="isPrice"
                v-model="newPackage.isPriceRebate"
              />
              <label class="ps-1" for="isPrice">تخفیف مبلغی</label>
            </div>
            <div class="formField bg-white w-max md:w-1/2 border p-3">
              <label for="">میزان تخفیف :</label>
              <input class="border ms-1 p-1" v-model="newPackage.priceValue" />
              <span v-if="newPackage?.isPriceRebate == true" class="ms-1"> تومان</span>
              <span v-else class="ms-1"> % </span>
            </div>
            <div class="formField bg-white w-max md:w-1/2 border p-3">
              <label for="">تعداد روز فعال:</label>
              <input type="number" class="border ms-1 p-1" v-model="newPackage.daysCount" />
            </div>
            
            <div class="bg-white w-max md:w-1/2 border p-3">
              <input
                type="checkbox"
                name=""
                id="active"
                @change="newPackage.active = !newPackage.active"
                :checked="newPackage?.active == true"
              />
              <label class="ps-1" for="active"> فعال</label>
            </div>
            <div class="formField bg-white w-max md:w-full border p-3">
              <label for="">خلاصه :</label>
              <input class="border ms-1 p-1 w-full" v-model="newPackage.summary" />
            </div>
          </div>
          <div class="input-box w-full shrink-0 flex flex-col p-1">
            <label for="">{{ $t("description") }}:</label>
            <RichEditor
            :rows="5"
            class="w-full border"
            v-model="newPackage.description"
            />
          </div>
          
          <div></div>
        </div>
      </div>

      <div class="submit-box flex flex-wrap justify-end w-full">
        <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white" @click="cancel">
          {{ $t("cancel") }}
        </button>
        <button
          :class="[
            'btn  w-2/12 my-3 px-3 py-1 text-white',
            isEdite ? 'bg-[#2563eb]' : 'bg-[#136b57]',
          ]"
          @click="submitInfo"
        >
          {{ isEdite ? $t("edite") : $t("confirm") }}
        </button>
      </div>
    </div>
    <!-- <p>
    نسبت طول به عرض 1 /1 
  </p> -->
  </div>
</template>

<script setup>
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const { getPicUrl } = usePicture();

const imageSelect = ref(false);
const imageSrc = ref();
const orgFile = ref();
const orgLocation = ref();
const fileType = ref();
const fileSize = ref();
const Url = ref("");
const newPackage = ref({
  name: "",
  summary: "",
  description: "",
  scoreCount: 0,
  priceValue: 0,
  minCartPrice: 0,
  daysCount: 0,
  isPriceRebate: true,
  priority: 0,
  pictureId: null,
  active: true,
});
const isEdite = ref(false);
const route = useRoute();
const toast = useToast();
const router = useRouter();
onMounted(() => {
  if (route.params.id != "new") {
    pageLoader();

    isEdite.value = true;
  }
});

const pageLoader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/ScoreToRebatePackage/ScoreToRebatePackage", {
      method: "GET",
      headers,
      query: {
        id: route.params.id,
      },
    });

    newPackage.value = data?.data;
    //  Url.value = data?.data
  } catch (error) {
    // navigateTo("/login")
  }
};

const acardeonHandler = (event) => {
  let isOpen = true;
  const parent = event.target.closest(".acardeon ");
  const classList = parent.children[1].classList;
  for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    if (element == "hidden") {
      isOpen = false;
    } else {
      isOpen = true;
    }
  }
  if (isOpen == false) {
    parent.children[1].classList.remove("hidden");
  } else {
    parent.children[1].classList.add("hidden");
  }
};
const loading=ref(false)

const submitInfo = async () => {
        if(loading.value)
    return
loading.value=true
  let data = JSON.parse(JSON.stringify(newPackage.value));
  delete data.picture;

  try {
    const res = await $fetch("/api/ScoreToRebatePackage/ScoreToRebatePackage", {
      method: isEdite.value ? "PUT" : "POST",
      body: data,
    });
    if (res?.isSuccess) {
      toast.add({ description: "عملیات با موفقیت انجام شد .", color: "green" });
      cancel();
    } else {
      res?.messages.forEach((element) => {
        toast.add({ description: element?.item1, color: "red" });
      });
    }
  } catch (error) {
    toast.add({ description: "مشکلی پیش امده دوباره تلاش کنید", color: "red" });
  }
  loading.value=false

};

const cancel = () => {
  router.go(-1);
};

const chooseFile = (event) => {
  const [file] = event.target.files;
  orgFile.value = event.target.files[0];
  orgLocation.value = event.target.value;
  // imageSrc.value = URL.createObjectURL(file);

  fileType.value = file.type;
  fileSize.value = parseInt(file.size) / 1000;
  imageSelect.value = true;
  confirmUpload();
};

const loader = ref(false);
const confirmUpload = async () => {
  loader.value = true;
  const formData = new FormData();
  formData.append("PictureFile", orgFile.value, orgLocation.value);
  // ;
  try {
    const insert = await $fetch(imageUploaderUrl, {
      method: "POST",
      body: formData,
    });

    // emit('getPictureId',picId)
    // pageLoader()
    newPackage.value.pictureId = insert?.data?.id;
    // confirmtStatus.value = true;
    imageSrc.value = `https://namavar-file.bhpsolution.com/${insert?.data?.url}`;
    loader.value = false;
  } catch (error) {}
};

const clear = () => {
  const input = document.querySelector("#chooseproduct-file");
  input.value = "";
  imageSelect.value = false;
  imageSrc.value = null;
};
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

input:focus {
  box-shadow: unset !important;
  border: unset;
  outline: unset;
}
</style>
