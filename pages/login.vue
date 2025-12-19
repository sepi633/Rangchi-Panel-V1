<template>
  <div>
    <div class="lg:flex">
      <div class="lg:w-1/2 xl:max-w-screen-sm">
        <div
          class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12"
        >
          <div class="cursor-pointer flex items-center">
            <div
              class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
            >
              {{ $t("welcome") }}
            </div>
          </div>
        </div>
        <div
          class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
        >
          <h2
            class="text-start text-4xl text-indigo-900 font-display font-semibold lg:text-start xl:text-5xl xl:text-bold"
          >
            {{ $t("login") }} {{projectName}}  
          </h2>
          <div class="mt-12">
            <span v-if="getOtp == true">
              {{ $t("username") + ": " + loginData.mobile }}</span
            >
            <div v-if="getOtp == false">
              <div class="text-sm font-bold text-gray-700 tracking-wide">
                {{ $t("username") }}
              </div>
              <input
                id="userName"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                @keyup="clic2otp"
                type="text"
                :placeholder="$t('username')"
                v-model="loginData.mobile"
              />
            </div>

            <div v-if="getOtp == true && checkOtp == false" class="mt-8">
              <div class="flex justify-between items-center">
                <div class="text-sm font-bold text-gray-700 tracking-wide">
                  <!-- {{ $t('OTP') }} -->
                </div>
                <div>
                  <a
                    @click="getOtp = false"
                    class="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {{ $t("edite") }}
                  </a>
                </div>
              </div>
              <span>
              {{ $t('submitCode') }}:
              </span>

              <input
                @keyup="clic2pass"
                name="otp"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                :placeholder="$t('OTP')"
                v-model="loginData.code"
              />
              <span
                class="text-orange-600 text-sm cusor-pointer"
                v-if="withOtp == true && withPassword == false"
                @click="
                  (withOtp = false), (withPassword = true), (checkOtp = true)
                "
              >
                {{ $t('loginWithPassword') }}
              </span>
            </div>

            <div v-if="getOtp == true && checkOtp == true" class="mt-8">
              <div class="flex justify-between items-center">
                <div class="text-sm font-bold text-gray-700 tracking-wide">
                  {{ $t("password") }}
                </div>
                <div>
                  <!-- <a class="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                        {{ $t('forget') }} {{ $t('password') }}
                                    </a> -->
                </div>
              </div>
              <input
                @keyup="clic2okpass"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                :placeholder="$t('password')"
                v-model="loginData.password"
              />
              <span
                class="text-orange-600 text-sm cusor-pointer"
                v-if="withOtp == false && withPassword == true"
                @click="
                  (withOtp = true), (withPassword = false), (checkOtp = false)
                "
              >
                {{$t('oneTimeSubmit')}}
              </span>
            </div>
            <div>
              <button
                v-if="getOtp == false"
                :class="{ deactive: loginData.mobile.length == 0 }"
                class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 getOtp shadow-lg flex justify-center items-center mt-10"
                type="button"
                @click="checkRole"
              >
                <div v-if="loading == true" class="loading"></div>
                {{ $t("getAuthenticationMessage") }}
              </button>
              <button
                v-if="getOtp == true && checkOtp == false"
                class="bg-[#0d37b8] text-gray-100 p-4 w-full rounded-full tracking-wide getPass font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg flex justify-center items-center mt-10"
                type="button"
                @click="otpConfirm"
              >
                <div v-if="loading == true" class="loading"></div>
                {{ $t("confirm") }}
              </button>
              <button
                v-if="getOtp == true && checkOtp == true"
                class="bg-[#136b57] text-gray-100 p-4 w-full rounded-full tracking-wide okPass font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg flex justify-center items-center mt-10"
                type="button"
                @click="login"
              >
                <div v-if="loading == true" class="loading"></div>
                {{ $t("login") }}
              </button>
            </div>
            <!-- <div class="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ? <a class="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</a>
                        </div> -->
          </div>
        </div>
      </div>
      <div
        class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen"
      >
        <div
          class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
        >
          <svg
            class="w-5/6 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            id="f080dbb7-9b2b-439b-a118-60b91c514f72"
            data-name="Layer 1"
            viewBox="0 0 528.71721 699.76785"
          >
            <title>Login</title>
            <rect y="17.06342" width="444" height="657" fill="#535461" />
            <polygon
              points="323 691.063 0 674.063 0 17.063 323 0.063 323 691.063"
              fill="#7f9cf5"
            />
            <circle cx="296" cy="377.06342" r="4" fill="#535461" />
            <polygon
              points="296 377.66 298.773 382.463 301.545 387.265 296 387.265 290.455 387.265 293.227 382.463 296 377.66"
              fill="#535461"
            />
            <polygon
              points="337 691.063 317.217 691 318 0.063 337 0.063 337 691.063"
              fill="#7f9cf5"
            />
            <g opacity="0.1">
              <polygon
                points="337.217 691 317.217 691 318.217 0 337.217 0 337.217 691"
                fill="#fff"
              />
            </g>
            <circle cx="296" cy="348.06342" r="13" opacity="0.1" />
            <circle cx="296" cy="346.06342" r="13" fill="#535461" />
            <line
              x1="52.81943"
              y1="16.10799"
              x2="52.81943"
              y2="677.15616"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
              opacity="0.1"
            />
            <line
              x1="109.81943"
              y1="12.10799"
              x2="109.81943"
              y2="679.15616"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
              opacity="0.1"
            />
            <line
              x1="166.81943"
              y1="9.10799"
              x2="166.81943"
              y2="683"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
              opacity="0.1"
            />
            <line
              x1="223.81943"
              y1="6.10799"
              x2="223.81943"
              y2="687.15616"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
              opacity="0.1"
            />
            <line
              x1="280.81943"
              y1="3.10799"
              x2="280.81943"
              y2="688"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
              opacity="0.1"
            />
            <ellipse
              cx="463.21721"
              cy="95.32341"
              rx="39.5"
              ry="37"
              fill="#2f2e41"
            />
            <path
              d="M683.8586,425.93948l-10,14s-48,10-30,25,44-14,44-14l14-18Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#ffb8b8"
            />
            <path
              d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#7f9cf5"
            />
            <path
              d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z"
              transform="translate(-335.6414 -100.11607)"
              opacity="0.1"
            />
            <path
              d="M775.8586,215.93948s-1,39-13,41-8,15-8,15,39,23,65,0l5-12s-18-13-10-31Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#ffb8b8"
            />
            <path
              d="M708.8586,455.93948s-59,110-37,144,55,104,60,104,33-14,31-23-32-76-40-82-4-22-3-23,34-54,34-54-1,84,3,97-1,106,4,110,28,11,32,5,16-97,8-118l15-144Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#2f2e41"
            />
            <path
              d="M762.8586,722.93948l-25,46s-36,26-11,30,40-6,40-6l22-16v-46Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#2f2e41"
            />
            <path
              d="M728.8586,696.93948l13,31s5,13,0,16-19,21-10,23a29.29979,29.29979,0,0,0,5.49538.5463,55.56592,55.56592,0,0,0,40.39768-16.43936l8.10694-8.10694s-27.77007-63.94827-27.385-63.47414S728.8586,696.93948,728.8586,696.93948Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#2f2e41"
            />
            <circle cx="465.21721" cy="105.82341" r="34" fill="#ffb8b8" />
            <path
              d="M820.3586,253.43948l-10.5,10.5s-32,12-47,0c0,0,5.5-11.5,5.5-10.5s-43.5,7.5-47.5,25.5,3,49,3,49-28,132-17,135,114,28,113,9,8-97,8-97l35-67s-5-22-17-29S820.3586,253.43948,820.3586,253.43948Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#7f9cf5"
            />
            <path
              d="M775.8586,448.93948l-13,8s-50,34-24,40,41-24,41-24l10-12Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#ffb8b8"
            />
            <path
              d="M849.8586,301.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z"
              transform="translate(-335.6414 -100.11607)"
              opacity="0.1"
            />
            <path
              d="M853.8586,298.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#7f9cf5"
            />
            <path
              d="M786.797,157.64461s-11.5575-4.20273-27.31774,4.72807l8.40546,2.10136s-12.60819,1.05068-14.18421,17.8616h5.77875s-3.67739,14.70955,0,18.91228l2.364-4.4654,6.82943,13.65887,1.576-6.82944,3.15205,1.05069,2.10137-11.03217s5.25341,7.88012,9.45614,8.40546V195.2065s11.5575,13.13352,15.23489,12.60818l-5.25341-7.35477,7.35477,1.576-3.152-5.25341,18.91228,5.25341-4.20273-5.25341,13.13352,4.20273,6.3041,2.6267s8.9308-20.4883-3.67739-34.67251S798.61712,151.60318,786.797,157.64461Z"
              transform="translate(-335.6414 -100.11607)"
              fill="#2f2e41"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {public:{showImageBaseUrl,projectName}} = useRuntimeConfig()


const {
  public: { responseCode },
} = useRuntimeConfig();

const toast = useToast();
const { locale } = useI18n();
const authStore = useAuth();
const loading = ref(false);
const getOtp = ref(false);
const checkOtp = ref(false);
const loginData = ref({
  mobile: "",
  password: "",
  code: "",
});
const withOtp = ref(false);
const withPassword = ref(false);
const showmobileAlert = ref(false);
definePageMeta({
  layout: false,
});

onMounted(() => {
  document.querySelector("#userName").focus();
});
const otpRequest = async (num) => {
  loading.value = true;
  try {
    const user = await $fetch("/api/auth/otp", {
      method: "POST",
      body: {
        mobile: loginData.value.mobile,
      }
    });
    loading.value = false;
    loginData.value.code = user.data.code;
    if (user.isSuccess) {
      toast.add({description:"کد احراز برای شما کاربر عزیز ارسال شد.",color:'green'});
      getOtp.value = true;

      loginData.value.code = user.data.code;
      // if(num == user.signUp){
      //     navigateTo("/authorize/register")
      // }
      if (num == responseCode.oneFactor) {
        withOtp.value = true;
      } else if (num == responseCode.twoFactor) {
        withOtp.value = true;
        withPassword.value = true;
      } else if (num == responseCode.locked) {
      } else if (num == responseCode.verifyCodeCountError) {
      }
    } else {
      user.messages.forEach((element) => {
        toast.add({description:element.item1,color:'red'});
      });
    }
    // authUser.value = user;
    // toast.success(" ورود شما موفقیت آمیز بود");
    // navigateTo("/profile/info")
  } catch (error) {
    toast.add({description:"مشکلی پیش امده است دوباره تلاش کنید.",color:'red'});
  }
};
const otpConfirm = async () => {
  loading.value = true;
  try {
    const response = await $fetch("/api/auth/otpCheck", {
      method: "POST",
      body: {
        mobile: loginData.value.mobile,
        code: loginData.value.code,
      }
    })
    loading.value = false;
    checkOtp.value = true;
    if (response.isSuccess) {
      login();
    } else {
      response.messages.forEach((element) => {
        toast.add({description:element.item1,color:'red'});
      });
    }
  } catch (error) {
    toast.add({description:"مشکلی پیش امده است دوباره تلاش کنید.",color:'red'});
  }
};

const checkRole = async () => {
  // toast.success(" ورود شما موفقیت آمیز بود");
  // errors.value = []
  if (validateMobile(loginData.value.mobile)) {
    try {
      loading.value = true;
      const response = await $fetch("/api/auth/userRole", {
        method: "post",
        body: {
          mobile: loginData.value.mobile,
        },
      });
      if (response.isSuccess == true) {
        // userData.value = response
        authStore.username = loginData.value.mobile;
        checkUser();

        // formData.value.code = response.data.code
      } else {
        response.messages.forEach(element => {
        toast.add({description:element.item1,color:'red'});  
            })}
      loading.value = false;
    } catch (err) {
      loading.value = false;
    }
  } else {
    toast.add({description:"خظایی پیش آمده! نام کاربری را مجدد بررسی کنید",color:'red'});
  }
};
const checkUser = async () => {
  // errors.value = []
  if (validatemobile(loginData.value.mobile)) {
    try {
      loading.value = true;
      const response = await $fetch("/api/auth/userDetail", {
        method: "POST",
        body: {
          mobile: loginData.value.mobile,
        },
      });
      if (response.isSuccess) {
        // userData.value = response
        authStore.username = loginData.value.mobile;
        if(response.code==1){
          toast.add({description:"برای ورود باید در توسط مدیر ثبت نام شوید.",color:'red'});
          return 
        }
        otpRequest(response.code);
        // formData.value.code = response.data.code
      } else {
        response.messages.forEach(element => {
        toast.add({description:element.item1,color:'red'});
                
            });
    }
      loading.value = false;
    } catch (err) {
        toast.add({description:'مشکلی پیش امده است دوباره تلاش کنید.',color:'red'})
      loading.value = false;
    }
  }
};

const validatemobile = (mobile) => {

  if (/^(\+98|0)?9\d{9}$/.test(mobile)) {
    showmobileAlert.value = false;
    return true;
  } else {
    showmobileAlert.value = true;
    return false;
  }
};

const validateMobile = (mobile) => {
  if (mobile.length > 7) {
    if (/^(\+98|0)?9\d{9}$/.test(mobile)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const login = async (event) => {
  loading.value = true;
  const body = {
    mobile: null,
    code: null,
    password: null,
    isAdmin:true
  };
  body.mobile = loginData.value.mobile;
  if (withOtp.value == true) {
    body.code = loginData.value.code;
    body.password = loginData.value.password;
  } else if (withOtp.value == true && withPassword.value == true) {
    body.code = loginData.value.code;
    body.password = loginData.value.password;
  } else if (withOtp.value == false && withPassword.value == true) {
    // alert("444")
    body.mobile = loginData.value.mobile;
    body.password = loginData.value.password;
  }
  try {
    const headers = useRequestHeaders(["cookie"]);
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
      },
    });

    // document.cookie = `key=Bearer ${user.data.token}`;

    loading.value = false;
    setTimeout(() => {
      
      navigateTo("/");
    }, 3000);
  } catch (error) {
    toast.add({description:'مشکلی پیش امده است دوباره تلاش کنید.',color:'red'})
  }
};
const clic2otp = (e) => {
  if (e.keyCode === 13) {
    document.querySelector(".getOtp").click();
  }
};
const clic2pass = (e) => {
  if (e.keyCode === 13) {
    document.querySelector(".getPass").click();
  }
};
const clic2okpass = (e) => {
  if (e.keyCode === 13) {
    document.querySelector(".okPass").click();
  }
};
</script>

<style lang="scss" scoped>
.language {
  position: absolute;
  width: 100px;
  left: 10px;
  top: 10px;
}

.loading {
  border: 5px solid #3333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border-top: 5px solid #fff;
  animation: spiner 1s infinite;
  // transition: 0.5s;
  margin: 0 10px;
}

.deactive {
  // pointer-events: none;
  cursor: not-allowed;
}

@keyframes spiner {
  0% {
    transform: scale(1) rotate(0deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
