<template>
  <section class="parent-box">
    <div class="title">
      <strong>{{ $t("Addcontent") }}</strong>
    </div>
    <div class="acardeon category-box ">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span>{{ $t("SelectCategory") }}</span>
        <!-- {{ newPost.categoryId  }} -->
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
      <div class="body-box flex flex-wrap p-2 items-start ">
        <TreeMiniTree class="" v-model="newPost.categoryId" :data="categoris" />
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
      <div class="body-box flex flex-wrap p-2 items-start hidden">
        <img
          class="h-[300px] w-full border p-1 mb-3 object-contain"
          v-if="newPost.pictureId != null"
          :src="getPicUrl(newPost.picture ,'md')"
        />
        <UploadImage
          v-else
          @getPictureId="
            (n, pic) => {
              newPost.pictureId = n;
              newPost.picture = pic;
            }
          "
        ></UploadImage>
        <button
          class="w-full flex justify-center bg-[#e3e3e3] p-2 rounded"
          @click="newPost.pictureId = null"
          v-if="newPost.pictureId != null"
        >
          <svg
            class="min-w-[25px]"
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
        <!-- <div class="input-box flex flex-col lg:w-1/4 p-1">
                    <label for="">شناسه پدر:</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name="" readonly v-model="newPost.categoryId"
                        id="">
                </div> -->
        <div class="input-box flex flex-col lg:w-1/4 p-1">
          <label for="">لیتک آپارات :</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            v-model="newPost.subject"
            id=""
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for="">{{ $t("name") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            v-model="newPost.name"
            id=""
          />
        </div>

        <div class="input-box flex flex-col p-1">
          <label for="">
            اسلاگ
            :
          </label>

                     <Slug v-model:value="newPost.label" v-model:isAccept="acceptSlug" mode="post" :editId="route.params.id=='new'?null:route.params.id"/>

        </div>
        <!-- <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for="">
            دسته بندی
            :
          </label>
          <Combobox v-model="newPost.categoryId" :options="categoris"  />
        </div> -->
        <div class=" input-box  flex-col lg:w-full p-1">
          <label for="">{{ $t('addHashtag') }}:</label>
          <div class="flex h-[40px] gap-2">
                   <input class=" h-full border w-full " type="text"   v-model="hashtag" name="" id="">
                   <button class="w-max text-nowrap bg-rose-600 text-white px-1 rounded" @click="insertHashTag">{{ $t('addHashtag') }}</button>
          </div>
   
      <p class="my-3">{{ $t('hashtags') }}:</p>
       <div class="flex">
              
              <div class="bg-[#d9d9d9] relative mx-3 p-2 rounded-[5px] cursor-all-scroll" v-for="item in newPost.hashTagList">{{ item }} #
                      <span @click="removeHashtag(item)" class=" cursor-pointer absolute top-[-15px] left-[-15px] w-[30px] flex rounded justify-center items-center h-[30px] bg-[#f8a3a3]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="min-w-[20px] w-[20px] bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></span>
              </div>
       </div>
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
        <div class="input-box flex flex-col w-full p-1">
          <label for="">{{ $t("description") }}:</label>
          <ClientOnly>
            <RichEditor v-model="newPost.description" />
    
          </ClientOnly>
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
          <label for=""> {{ $t("SEOAlt") }}:<sub>(SEO Alt)</sub></label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="newPost.seoPictureAlt"
          />
        </div>
        <div class="input-box flex flex-col lg:w-2/6 p-1">
          <label for="">{{ $t("SEOURL") }}:<sub>(SEO URL)</sub></label>
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
        <div class="input-box flex flex-col lg:w-1/4 p-1">
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
        <div class="input-box flex flex-col lg:w-1/4 p-1">
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
          <RichEditor v-model="newPost.seoDescription" />
        </div>
      </div>
    </div>

    <!-- <div class="acardeon category-box">
      <div
        class="title-box flex items-center justify-between"
        @click="acardeonHandler"
      >
        <span> بارگذاری ویدیو  </span>
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
        <div v-if="newPost.postFilesList?.length>0" class="flex gap-4 relative justify-center">
          <video v-for="item in newPost.postFilesList" :src="getFileUrl(item)" muted controls alt="" />
          <UButton
          icon="i-heroicons-trash"
          size="xs"
          color="red"
          square
          variant="solid" 
          class="absolute top-0 left-0"
          @click="data.file=null;data.fileId=null"
          />
        </div> 
        <UploadVideo  @getPictureId="(_Id,_file)=>newPost.postFilesList.push(_file)" :FileInputId="'Video'" />

      </div>
    </div> -->
   
    <div class="submit-box flex flex-wrap justify-end w-full">
      <!-- <div class="flex items-center w-full p-1">
        <label for="isPremium">مقاله پولی:</label>
        <input
        class="border mx-2"
        v-model="newPost.isPremium"
        type="checkbox"
        id="isPremium"
      />
      </div> -->
      <div class="flex justify-start mr-auto lg:w-4/12 items-center pt-3">
        <input
          class="border mx-2"
          @change="newPost.active = !newPost?.active"
          type="checkbox"
          :checked="newPost.active"
          id="active"
        />
        <label for="active">{{ $t("IWantToDisplayOnTheSite") }}</label>
      </div>
      <button
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        @click="cancel"
      >
        {{ $t("cancel") }}
      </button>


      <button
        :class="['btn  w-2/12 my-3 px-3 py-1 text-white',isEdite ?'bg-[#2563eb]':'bg-[#136b57]']"
        @click="submitInfo"
      >
        {{isEdite ? $t("edite") :$t("confirm") }}
      </button>
    </div>


  </section>
</template>

<script setup>
const {getFileUrl,getPicUrl}=usePicture()
const {
  public: { showImageBaseUrl,postCategoryId },
} = useRuntimeConfig();
const acceptSlug=ref(false)

const newPost = ref({
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
  isPremium:false,
  pictureId: null,
  active: false,
  // "publishDate": "2023-08-04T23:05:25.609Z",
  adminConfirm: false,
  // "newPosttCount": 0,
  subject: "",
  subNews: "",
  categoryId:null,
  userId: 1,
  picture: {},
  categoryIds: [],
  hashTagList: [],
  label:''
});
const isEdite = ref(false);
const parentType = ref([]);
const parentTypeId = ref();
const categoryList = ref();
const categoris = ref();
const selectedCategory = ref();
const route = useRoute();
const store = useBlog();
const toast = useToast();
const allowToSubmit=ref(true)
const hashtag=ref('')
onMounted(() => {
  if (route.params.id != "new") {
    pageLoader();
    isEdite.value = true;
  }
  getCategoryItem(postCategoryId);
  getParentCategory();
});
const insertHashTag = ()=>{
   newPost.value.hashTagList.push(hashtag.value)
    hashtag.value = '';
}
const removeHashtag = (h)=>{
  const index =  newPost.value.hashTagList.indexOf(h);
        if (index > -1) { 
            newPost.value.hashTagList.splice(index, 1); 
        }
}

const pageLoader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/post/postItem", {
      method: "GET",
      headers,
      query: {
        postId: route.params.id,
      },
    });
 if(data?.data?.label?.length>0)
    acceptSlug.value=true
    newPost.value = data?.data;
    // newCategory.value.parentId = pageData?.value.parentId
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const acardeonHandler = (event) => {
  let show = false;
  const parent = event.target.closest(".acardeon ");
  parent.children[1].classList.forEach((item) => {
    ;
    if (item == "hidden") {
      show = true;
    }
  });
  if (show == true) {
    parent.children[1].classList.remove("hidden");
  } else {
    parent.children[1].classList.add("hidden");
  }
};
const getAudio = (item) => {
  if (item?.label == "audio") {
    return item;
  }
};

const getvideo = (item) => {
  if (item?.label == "video") {
    return item;
  }
};

const getParentCategory = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/category", {
      method: "GET",
      headers,
    });

    // allCategory.value = data;
    data.list.forEach((element) => {
      if (element.parentId == null) {
        // ;
        parentType.value.push(element);
      }
    });
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const getCategoryByParentId = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/category", {
      method: "GET",
      headers,
      query: {
        parentId: id,
      },
    });

    categoryList.value = data;
    // newPost.value.parentId = pageData?.value.parentId
    ;
    ;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const getCategoryItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/catItem", {
      method: "GET",
      headers,
      query: {
        id: id,
      },
    });
    categoris.value = data?.data?.children;
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const submitInfo = async (type) => {
    if(!acceptSlug.value){
    toast.add({description:'وارد کردن و تایید اسلاگ الزامی میباشد',color:'red'})
    return
  }
  let data=JSON.parse(JSON.stringify(newPost.value))
  delete data.files
  delete data.picture
  delete data.categoryIds
  // newPost.value.CategoryId = store.categoryId
if(allowToSubmit.value){
  allowToSubmit.value=false
    try {
      const res = await $fetch("/api/post/post", {
        method: isEdite.value ?"PUT":"POST",
        body: data
      });

      // pageLoader()
      if (res.isSuccess) {
        toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
        navigateTo("/post");
      }else{
        res.messages.forEach((el)=>{
          toast.add({description:el.item1,color:'red'})
        })
      }
    } catch (error) {
      toast.add({description:"مشکلی پیش امده دوباره تلاش کنید .",color:'red'});
    }
    finally {
    allowToSubmit.value=true
  }
  } 
  };

const cancel = () => {
  navigateTo("/post");
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
</style>
