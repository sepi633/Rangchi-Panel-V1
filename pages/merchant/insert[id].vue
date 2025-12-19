<template>
  <div class=" space-y-6">
    <div class="parent-box">
      
      <!-- General Info -->
      <div class="acardeon content-box">
        <div class="title-box flex items-center justify-between" @click="acardeonHandler">
          <span> اطلاعات عمومی </span>
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
              fill="black" />
          </svg>
        </div>
        <div class="body-box flex flex-wrap p-2 items-start hidden">
          <div class="w-full lg:w-1/2">
            <div class="input-box flex flex-col p-1">
              <label for=""> شناسه بانک:</label>
              <input class="border w-full h-[40px] mt-2 p-1"
               type="text" name="" v-model="newUser.bankId" id="" />
            </div>
            <div class="input-box flex flex-col p-1">
              <label for=""> نام کاربری :</label>
              <input class="border w-full h-[40px] mt-2
                p-1" type="text" name="" v-model="newUser.username" id="" />
            </div>
            <div class="input-box flex flex-col p-1">
              <label for=""> پسوورد:</label>
              <input class="border w-full h-[40px] mt-2 p-1" 
              type="text" name="" v-model="newUser.password" id="" />
            </div>
            <div class="input-box flex flex-col p-1">
              <label for=""> کلید مخفی:</label>
              <input class="border w-full h-[40px] mt-2 p-1" 
              type="text" name="" v-model="newUser.privateKey" id="" />
            </div>
            <div class="input-box flex flex-col p-1">
              <label for="">کلید ترمینال : </label>
              <input class="border w-full h-[40px] mt-2 p-1" 
              type="text" name="" v-model="newUser.terminalKey" id="" />
            </div>
            <div class="input-box flex flex-col p-1">
              <label for="">شماره درگاه  : </label>
              <input class="border w-full h-[40px] mt-2 p-1" type="text" 
              name="" v-model="newUser.merchantNo" id="" />
            </div>
            <div class="input-box flex flex-col lg:w-3/6 p-1  ">
              <label for=""> وضعیت :</label>
              <div class="flex justify-start flex-col pt-3">
                
                <label for="r3">
                  <input class="border mx-2" type="radio" 
                  :checked="newUser.active == false" name="nofollow" id="r3"
                  @change="newUser.active = false" />
                  غیر فعال</label>
              

                <label for="r4">
                  <input class="border mx-2" type="radio" 
                  :checked="newUser.active == true" name="nofollow" id="r4"
                  @change="newUser.active = true" />
                  فعال</label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Advance Info -->

      

      <div class="submit-box flex flex-wrap justify-end w-full">
        <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white" @click="cancel">
          انصراف
        </button>

        <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white" v-if="isEdite == false"
          @click="submitInfo('insert')">
          ثبت
        </button>
        <button class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white" v-if="isEdite == true"
          @click="submitInfo('edite')">
          ویرایش
        </button>
      </div>
    </div>
  </div>
</template>

import userProductPost from '~/server/api/userProduct/userProduct.post';

<script setup>
const {
  public: { showImageBaseUrl },
} = useRuntimeConfig();

const newUser = ref({
  mobile: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  twoFactorEnabled: true,
  locked: false,
  position: null,
  isTradeUser: false,
  isLecturer: false,
  roleId: null,
  parentId:	null
});
const isEdite = ref(false);
const parentType = ref([]);
const parentTypeId = ref();
const categoryList = ref();
const categoris = ref();
const selectedCategory = ref();
const route = useRoute();
const roles = ref();
const user = ref();
const parentName = ref();
onMounted(async () => {
  if (route.params.id != "new") {
    pageLoader(route.params.id);
    isEdite.value = true;
  } else {
  }
  getRole();
});

const acardeonHandler = (event) => {
  const parent = event.target.closest(".acardeon ");
  parent.children[1].classList.remove("hidden");
};

const pageLoader = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/merchant/merchantItem", {
      method: "GET",
      headers,
      query: {
        userId: id,
      },
    });

    console.log("data from detail");
    console.log(data);
    newUser.value = data.data;
  } catch (error) {
    console.log(error);
    // navigateTo("/login")
  }
};

const getRole = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/role/role", {
      method: "GET",
      headers,
    });

    console.log("data from detail");
    console.log(data);
    roles.value = data;
  } catch (error) {
    console.log(error);
    // navigateTo("/login")
  }
};

const getParent = async (q) => {

  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/user/user", {
      method: "GET",
      headers,
      query:{
        Q:q
      }
    });

    console.log("data from detail");
    console.log(data);
    user.value = data;
    
  } catch (error) {
    console.log(error);
    // navigateTo("/login")
  }
};

const submitInfo = async (type) => {
  if (type == "insert") {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/merchant/merchant", {
        method: "POST",
        body: newUser.value,
        headers: {
          Accept: "application/json",
        },
      });

      // pageLoader()
      if (insert.isSuccess) {
        navigateTo("/merchant");
      }
      console.log(insert);
    } catch (error) {
      console.log("ERROR:" + error);
    } finally {
      // addStatus.value=false;
    }
  }
  if (type == "edite") {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/merchant/merchant", {
        method: "PUT",
        body: newUser.value,
        headers: {
          Accept: "application/json",
        },
      });
      if (insert.isSuccess) {
        navigateTo("/merchant");
      }
      //   navigateTo("/user");

      console.log(insert);
    } catch (error) {
      console.log("ERROR:" + error);
    } finally {
      addStatus.value = false;
    }
  }
};

const cancel = () => {
  navigateTo("/merchant");
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

.input-box .flex label{
  cursor:pointer;
  border: 1px solid #3333;
  border-radius: 5px;
  background: #e3e3e3;
  margin-top:5px;
  height:40px;
  display: flex;
  align-items: center
}
</style>
