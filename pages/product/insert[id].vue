<template>
  <section class="parent-box">
    <div class="title">
      <strong>{{ $t("Addcontent") }}</strong>
    </div>
    <div class="acardeon category-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span>جستجوی سریع دسته بندی</span>
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
      <div class="body-box flex-wrap w-full p-2 items-start hidden">
        <ProductCategory
        class="w-full"
          :isMulti="false"
          :categoris="categoris"
          v-model="newPost.categoryId"
        />
      </div>
    </div>
    <div class="acardeon category-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span>دسته بندی ثانویه محصولات</span>

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
        <!-- {{ categoris }} -->

        <ProductCategory
        class="w-full"
          :isMulti="true"
          :categoris="categoris"
          v-model="newPost.categoryIds"
          label="category"
        />
      </div>
    </div>

    <div class="acardeon category-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
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
      <div class="body-box flex-wrap p-2 items-start hidden">
        <!-- {{ newPost?.picture?.url }} -->
        <div class="productindexpicture w-full" v-if="newPost.pictureId">
          <img
            class="w-full max-h-[400px] object-contain border rounded mb-2"
            :src="picture.getPicUrl(newPost.picture)"
          />
          <button
            class="bg-gray-200 w-full p-1 rounded"
            @click="newPost.pictureId=null"
          >
            ویرایش تصویر
          </button>
        </div>
        <UploadImage
          v-else
          :isEdite="isEdite"
          @getPictureId="
          (n, pic) => {
            newPost.pictureId = n;
            newPost.picture = pic;
          }
          "
        ></UploadImage>
      </div>
    </div>

    <div class="acardeon content-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
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
        <div class="flex flex-wrap lg:w-2/3">
          <!-- <div class="input-box flex flex-col lg:w-1/6 p-1">
            <label for="">شناسه پدر:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              readonly
              v-model="newPost.categoryId"
              id=""
            />
          </div> -->
          <div class="input-box flex flex-col  p-1">
            <label for="">اسلاگ :</label>
            <Slug v-model:value="newPost.label" v-model:isAccept="acceptSlug" mode="product" :editId="route.params.id=='new'?null:route.params.id"/>
          </div>
          <div class="input-box flex flex-col lg:w-5/6 p-1">
            <label for="">{{ $t("title") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.name"
              id=""
            />
          </div>
          <div class="input-box flex flex-col lg:w-5/6 p-1">
            <label for=""> نوع محصول:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.secondName"
              id=""
            />
          </div>
          <!-- <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">{{ $t("Price") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.price"
              id=""
            />
          </div> -->
          <!-- <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">{{ $t("quantity") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="number"
              name=""
              v-model="newPost.quantity"
              id=""
            />
          </div> -->
          <!-- <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">{{ $t("code") }}:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.codeValue"
              id=""
            />
          </div> -->
          <!-- <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">حداکثر خرید هر کاربر:</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="number"
              name=""
              v-model="newPost.sellLimitCount"
              id=""
            />
          </div> -->
          <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for=""> کدفنی محصول :</label>
            <input
              class="border w-full h-[40px] mt-2"
              type="text"
              name=""
              v-model="newPost.codeValue"
              id=""
            />
          </div>

          <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">{{ $t("ProductStatus") }}:</label>

            <select
              name=""
              id=""
              v-model="newPost.statusId"
              class="p-2 bg-white border"
            >
              <option
                :value="item?.id"
                v-for="item in productStatus"
                :key="item?.id"
              >
                {{ item?.name }}
              </option>
            </select>
          </div>
  
          <!-- <div  class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">تنوع محصول:</label>

            <select
              name=""
                :class="[route.params.id != 'new' ?' pointer-events-none opacity-[.6] cursor-not-allowed':'']"
              id=""
              v-model="newPost.varietyId"
              class="p-2 bg-white border"
            >
              <option :value="null">انتخاب نشده</option>
              <option
                :value="item?.id"
                v-for="item in varityList?.list"
                :key="item?.id"
              >
                {{ item?.name }}
              </option>
            </select>
          </div> -->
          <div class="input-box flex flex-col lg:w-3/6 p-1">
            <label for="">{{ $t("brand") }}:</label>
            <Combobox
              :options="brandList?.list"
              v-model="newPost.brandId"
              placeholder="انتخاب برند"
            />
          </div>

          <div class="input-box flex flex-col lg:w-full p-1">
            <label for="">{{ $t("summary") }}:</label>
            <textarea
              class="border w-full h-100 mt-2"
              type="text"
              name=""
              v-model="newPost.summary"
              id=""
            ></textarea>
          </div>
        </div>

        <div class="input-box flex flex-col 
        w-full  p-1">
          <label for="">{{ $t("description") }}:</label>

           <RichEditor  class="w-full"  v-model="newPost.description"/>
        </div>
      </div>
    </div>

    <div class="acardeon image-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span> {{ $t("seoInformation") }}</span>
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
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for=""> {{ $t("SEOH1") }}:<sub>(SEO H1)</sub></label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoH1"
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for=""> {{ $t("SEOAlt") }} :<sub>(SEO Alt)</sub></label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoPictureAlt"
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for=""> {{ $t("SEOURL") }} :<sub>(SEO URL)</sub></label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoUrlText"
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for=""> {{ $t("SEOTitle") }} :<sub>(SEO Title)</sub></label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoTitle"
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for="">
            {{ $t("SEOCanonical") }} :<sub>(SEO Canonical)</sub></label
          >
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoCanonical"
          />
        </div>
        <div class="input-box flex flex-col lg:w-1/6 p-1">
          <label for=""> {{ $t("NoIndex") }} :<sub>(SEO NoIndex)</sub></label>
          <div class="flex justify-start items-center pt-3">
            <input
              class="border mx-2"
              type="radio"
              name="nofollow"
              id="r3"
              @change="newPost.seoNoIndex = true"
            />
            <label for="r3">{{ $t("yes") }}</label>
            <input
              class="border mx-2"
              type="radio"
              name="nofollow"
              id="r4"
              @change="newPost.seoNoIndex = false"
            />

            <label for="r4">{{ $t("no") }}</label>
          </div>
        </div>
        <div class="input-box flex flex-col lg:w-1/6 p-1">
          <label for=""> {{ $t("NoFollow") }} :<sub>(SEO NoFollow)</sub></label>
          <div class="flex justify-start items-center pt-3">
            <input
              class="border mx-2"
              type="radio"
              name="nofollow"
              id="r3"
              @change="newPost.seoNoFollow = true"
            />
            <label for="r3">{{ $t("yes") }}</label>
            <input
              class="border mx-2"
              type="radio"
              name="nofollow"
              id="r4"
              @change="newPost.seoNoFollow = false"
            />

            <label for="r4">{{ $t("no") }}</label>
          </div>
        </div>
        <div class="input-box flex flex-col lg:w-full p-1">
          <label for="">{{ $t("summary") }}:</label>
          <textarea
            class="border w-full h-100 mt-2"
            type="text"
            v-model="newPost.seoMinDescription"
            name=""
            id=""
          ></textarea>
        </div>
        <div class="input-box flex flex-col w-full p-1">
          <label for="">{{ $t("description") }}:</label>
           <RichEditor  v-model="newPost.seoDescription" />
        </div>
      </div>
    </div>

    <div class="submit-box flex flex-wrap justify-end w-full">
      <div class="flex justify-start mr-auto lg:w-4/12 items-center pt-3">
        <input
          class="border mx-2"
          type="checkbox"
          @change="newPost.active = !newPost.active"
          :checked="newPost.active"
          id="active"
        />
        <label for="active">{{ $t("IWantToDisplayOnTheSite") }}</label>
      </div>
      <button
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        @click="goBack"
      >
        {{ $t("cancel") }}
      </button>

      <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white"
        v-if="isEdite == false"
        @click="submitInfo('insert')"
      >
        {{ $t("confirm") }}
      </button>
      <button
        class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white"
        v-if="isEdite == true"
        @click="submitInfo('edite')"
      >
        {{ $t("edite") }}
      </button>
    </div>

  </section>
</template>

<script setup>
import TextEditor from "~/components/global/TextEditor.vue";

const {
  public: { showImageBaseUrl, productcategoryId },
} = useRuntimeConfig();
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const picture=usePicture()
const allowToSubmit = ref(true);
const imageSelect = ref(false);
const imageSrc = ref();
const orgFile = ref();
const orgLocation = ref();
const fileType = ref();
const fileSize = ref();
const isFile = ref(false);
const acceptSlug=ref(false)
const newPost = ref({
  id: 0,
  name: "",
  summary: "",
  description: "",
  seoH1: "",
  seoMinDescription: "",
  seoDescription: "",
  seoTitle: "",
  seoPictureAlt: "",
  seoUrlText: "",
  seoNoIndex: true,
  seoNoFollow: true,
  seoCanonical: "",
  categoryId: null,
  brandId: null,
  pictureId: null,
  statusId: 0,
  typeId: 9,
  codeValue: "",
  quantity: 0,
  price: 0,
  varietyId: null,
  sellLimitCount: null,
  label: "",
  typeId:9,
  categoryIds: [],
  categoryCarIds:[],
  secondName: "",
  classId:null,
  active: true,
  picture:null,
  codeValue:'',
  productPictures: null,
});
const isEdite = ref(false);
const toast = useToast();
const indexImage = ref(false);
const categoryList = ref();
const categoris = ref();
const productStatus = ref();
const brandList = ref();
const imageList = ref();
const varityList = ref();
const brand = ref({});
// const selectedBrand = ref("");
// const selectedCategory = ref();
const route = useRoute();

const searchBrand = ref("");
onMounted(async () => {
  if (route.params.id != "new") {
    pageLoader();
    
    isEdite.value = true;
  }
  await getCategoryItem();
  getProductStatus();
  getBrands();
  getVarity();
});
const getBrands = async () => {
  try {
    const data = await $fetch("/api/brand/brands", {
      method: "GET",
      query: {
        pageIndex: 1,
        pageSize: 40000,
        Q: "",
      },
    });
    brandList.value = data;

  } catch (error) {
  }
};

const getVarity = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/variety/variety", {
      method: "GET",
      headers,
      query: { pageIndex: 1, pageSize: 40 },
    });

    varityList.value = data;
  } catch (error) {
    // navigateTo("/login")
  }
};


const pageLoader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/product/productItem", {
      method: "GET",
      headers,
      query: {
        postId: route.params.id,
      },
    });

    if (data.isSuccess) {
      newPost.value = data?.data;
      if(data?.data?.label?.length>0)
    acceptSlug.value=true
      if (data?.data?.datasheetId) {
        isFile.value = true;
      }
      if (newPost?.value?.picture) {
        indexImage.value = true;
      }
    }

    // newCategory.value.parentId = pageData?.value.parentId
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



const getCategoryItem = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/catItem", {
      method: "GET",
      headers,

      query: {
        id:productcategoryId,
      },
    });

    categoris.value = data.data;
  } catch (error) {
    // navigateTo("/login")
  }
};

const submitInfo = async (type) => {
  if(!acceptSlug.value){
    toast.add({description:'وارد کردن و تایید اسلاگ الزامی میباشد',color:'red'})
    return
  }

  if (newPost.value.sellLimitCount == "") newPost.value.sellLimitCount = null;
  if (!allowToSubmit.value) return;
  let data=JSON.parse(JSON.stringify(newPost.value))
  delete data.picture
  delete data.file
  delete data.category
  delete data.brand
  delete data.productPictures
  allowToSubmit.value = false;
  try {
    let res = {};
    if (type == "insert") {
      res = await $fetch("/api/product/product", {
        method: "POST",
        body: data,
      });
    }
    if (type == "edite") {
      res = await $fetch("/api/product/product", {
        method: "PUT",
        body: data,
      });
    }
    if (res.isSuccess) {
      toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
      goBack();
    } else {
      res.messages.forEach((element) => {
        toast.add({description:element.item1,color:'red'});
      });
    }
  } catch (error) {
    toast.add({description:"مشکلی پیش امده است دوباره تلاش کنید.",color:'red'});
  }
  allowToSubmit.value = true;
};

const goBack = () => {
  useRouter().go(-1);
};


const loader = ref(false);

const clear = () => {
  const input = document.querySelector("#chooseproduct-file");
  input.value = "";
  imageSelect.value = false;
  imageSrc.value = null;
};



const getProductStatus = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/code/code", {
      method: "GET",
      headers,
      query: {
        CodeGroupLabel: "ProductStatus",
      },
    });

    productStatus.value = data.list;
  } catch (error) {
    // navigateTo("/login")
  }
};


const list = ref([]);
const categoryItemIds = ref([]);

const remove = (index) => {
  list.value.splice(index, 1);
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
