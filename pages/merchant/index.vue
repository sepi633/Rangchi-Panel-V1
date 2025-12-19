<template>

    <!-- <div class="lg:flex flex-wrap bg-white p-1">

        
        <div class="lg:w-3/12 w-full p-1 hidden">
            <span>
                تاریخ:

            </span>
            <date-picker v-model="dateRange" @change="setDate" type="date" range />
        </div>
        <div class="lg:w-4/12 w-full p-1 bg-white border ">
            <span for="exampleInputPassword1" class="form-label">موبایل :</span>
            <input type="text" class="form-control form-control border rounded w-full  p-1" v-model="defaultData.Mobile"
                id="name">
        </div>
        <div class="lg:w-4/12 w-full p-1 bg-white border">
            <span for="exampleInputPassword1" class="form-label">ایمیل :</span>
            <input type="text" class="form-control form-control border rounded w-full  p-1" v-model="defaultData.Email"
                id="name">
        </div>
        <div class="lg:w-2/12 w-full p-1 bg-white border hidden">
            <span>
                مدرس است؟

            </span>
            <div class="flex">
                <label class="m-1" for="lecturerTrue">
                    بله
                    <input type="radio" v-model="defaultData.IsLecturer" name="lecturer" value="true" id="lecturerTrue">
                </label>
                <label class="m-1" for="lecturerFalse">
                    خیر
                    <input type="radio" v-model="defaultData.IsLecturer" name="lecturer" value="false"
                        id="lecturerFalse">
                </label>
            </div>
        </div>
        <div class="lg:w-4/12 w-full p-1 bg-white border ">
            <span for="exampleInputPassword1" class="form-label">نام کاربر :</span>
            <input type="text" class="form-control form-control border rounded w-full  p-1" v-model="defaultData.Q"
                id="name">
        </div>
        <div class="lg:w-6/12 w-full p-1  bg-white border">
            <span>
                نقش:

            </span>
            <div class="flex flex-wrap">
                <div class="m-1 flex " v-for="item in roles?.list" :key="item?.id">
                    <input v-if="item.id != 2" class="mx-1" type="radio" name="role" v-model="defaultData.RoleId"
                        :value="item.id" :id="item?.name">
                    <label v-if="item.id != 2" class="cursor-pointer" :for="item?.name">{{ item?.name }}</label>
                </div>
            </div>
        </div>
        <div class="lg:w-6/12 w-full p-1 border bg-white">
            <span>
                طرح مشاوره:

            </span>
            <div class="flex">
                <label class=m-1 for="trdeTrue">
                    بله
                    <input v-model="defaultData.IsTradeUser" type="radio" name="trade" value="true" id="trdeTrue">
                </label>
                <label class="m-1" for="trdeFalse">
                    خیر
                    <input v-model="defaultData.IsTradeUser" type="radio" name="trade" value="false" id="trdeFalse">
                </label>
            </div>
        </div>
    </div>
    <div class="flex justify-end">

        <div class=" w-[150px] me-3 ">
            <button
                class="btn bg-[#136b57] text-white p-2 border border-[#136b57] rounded w-full flex items-center justify-center"
                @click="() => { defaultData.PageIndex = 1; pageLoader() }">
                <LoadingTinyLoading v-if="loader == true" />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-search mx-2" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </div>
        <div class=" w-[150px] ">
            <button
                class="btn bg-red-600 text-white p-2 border border-red-600 rounded w-full flex items-center justify-center"
                @click="() => { defaultData.RoleId = null; defaultData.DateFrom = null; defaultData.DateTo = null; defaultData.Mobile = null; defaultData.Email = null; defaultData.Q = null; defaultData.IsLecturer = null; defaultData.IsTradeUser = null; pageLoader() }">
                <LoadingTinyLoading v-if="loader == true" />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
        </div>
    </div> -->
    <hr>
    <div class="flex flex-wrap">
        <div class="lg:w-3/12 w-full p-1 " v-for="item in allDetails?.list" :key="item" :title="item">
            <div class="bg-white rounded p-2 border flex flex-col justify-center items-center min-h-[100px] item-box">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8 8.99511C8 7.93425 8.42143 6.91683 9.17157 6.16668C9.92172 5.41654 10.9391 4.99511 12 4.99511C13.0609 4.99511 14.0783 5.41654 14.8284 6.16668C15.5786 6.91683 16 7.93425 16 8.99511C16 10.056 15.5786 11.0734 14.8284 11.8235C14.0783 12.5737 13.0609 12.9951 12 12.9951C10.9391 12.9951 9.92172 12.5737 9.17157 11.8235C8.42143 11.0734 8 10.056 8 8.99511ZM15.824 13.6181C16.7755 12.831 17.461 11.7694 17.7868 10.5783C18.1127 9.38715 18.0631 8.12449 17.6448 6.96259C17.2265 5.8007 16.4599 4.79618 15.4495 4.0861C14.4392 3.37603 13.2344 2.995 11.9995 2.995C10.7646 2.995 9.55978 3.37603 8.54946 4.0861C7.53913 4.79618 6.77251 5.8007 6.35421 6.96259C5.9359 8.12449 5.8863 9.38715 6.21217 10.5783C6.53803 11.7694 7.22349 12.831 8.175 13.6181C4.986 14.7411 3 17.2421 3 19.9951C3 20.2603 3.10536 20.5147 3.29289 20.7022C3.48043 20.8898 3.73478 20.9951 4 20.9951C4.26522 20.9951 4.51957 20.8898 4.70711 20.7022C4.89464 20.5147 5 20.2603 5 19.9951C5 17.7251 7.355 14.9951 12 14.9951C16.645 14.9951 19 17.7251 19 19.9951C19 20.2603 19.1054 20.5147 19.2929 20.7022C19.4804 20.8898 19.7348 20.9951 20 20.9951C20.2652 20.9951 20.5196 20.8898 20.7071 20.7022C20.8946 20.5147 21 20.2603 21 19.9951C21 17.2421 19.016 14.7411 15.824 13.6181Z"
                        fill="black" />
                </svg>

<!-- {{item}} -->
                <strong>{{ item?.bank?.name }} <sub>({{ item?.bank?.label }})</sub></strong>
                <!-- <hr class="w-full">
                <span class="text-gray-500">{{ item?.mobile }}</span>
                <span class="text-gray-500">{{ item?.email }}</span>
                <span class="text-gray-500">{{ item?.position }}</span>


                <br> -->
                <!--{{ item.label }} -->
                <!-- <button
                    class="flex text-white justify-center rounded items-center bg-orange-500 w-full p-1 text-center mb-1"
                    @click="() => { navigateTo('/wallet?userId=' + item?.id) }">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-calculator-fill" viewBox="0 0 16 16">
                        <path
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5m0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z" />
                    </svg>
                    <span class="text-[14px]">موجودی کیف پول</span>
                </button>
                <NuxtLink
                    class="flex text-white justify-center rounded items-center bg-orange-700 w-full p-1 text-center mb-1"
                    :to="`/userProduct?userId=${item?.id}`">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-plus-circle me-1" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    افزودن دوره
                </NuxtLink>
                <p @click="()=>{isShow=true;defaultData2.UserId=item?.id;Exam=null;getExam()}"
                    class="flex text-white justify-center rounded items-center bg-pink-700 w-full p-1 text-center mb-1"
                   >
                  
                آزمون ها
            </p> -->
                <div class="bg-[#1f2937] w-full rounded flex p-1 justify-around">
                    <!-- <button @click="getItem(item.id)"> -->
                    <NuxtLink class="flex text-white" :to="`/merchant/insert${item?.id}`">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            data-v-e838505d="">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.121 2.707C20.5584 2.14459 19.7955 1.82864 19 1.82864C18.2045 1.82864 17.4416 2.14459 16.879 2.707L15.199 4.387L7.293 12.293C7.16494 12.421 7.07404 12.5814 7.03 12.757L6.03 16.757C5.98803 16.9246 5.99018 17.1002 6.03626 17.2667C6.08234 17.4332 6.17077 17.5849 6.29293 17.7071C6.41509 17.8292 6.56681 17.9177 6.73331 17.9637C6.89982 18.0098 7.07542 18.012 7.243 17.97L11.243 16.97C11.4186 16.926 11.579 16.8351 11.707 16.707L19.556 8.859L21.293 7.121C21.8554 6.55842 22.1714 5.7955 22.1714 5C22.1714 4.20451 21.8554 3.44159 21.293 2.879L21.121 2.707ZM18.293 4.121C18.4805 3.93353 18.7348 3.82822 19 3.82822C19.2652 3.82822 19.5195 3.93353 19.707 4.121L19.879 4.293C20.0665 4.48053 20.1718 4.73484 20.1718 5C20.1718 5.26517 20.0665 5.51948 19.879 5.707L18.862 6.724L17.307 5.107L18.293 4.121ZM15.893 6.521L17.448 8.138L10.488 15.097L8.374 15.626L8.903 13.511L15.893 6.521ZM4 8C4 7.73479 4.10536 7.48043 4.29289 7.2929C4.48043 7.10536 4.73478 7 5 7H10C10.2652 7 10.5196 6.89465 10.7071 6.70711C10.8946 6.51957 11 6.26522 11 6C11 5.73479 10.8946 5.48043 10.7071 5.2929C10.5196 5.10536 10.2652 5 10 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V14C19 13.7348 18.8946 13.4804 18.7071 13.2929C18.5196 13.1054 18.2652 13 18 13C17.7348 13 17.4804 13.1054 17.2929 13.2929C17.1054 13.4804 17 13.7348 17 14V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8Z"
                                fill="black" data-v-e838505d="" style="fill: #fff;"></path>
                        </svg>
                        ویرایش
                    </NuxtLink>

                    <!-- <button @click="deleteItem(item.id)"> -->
                    <!-- <button class="flex text-white " @click="deleteItem(item?.id)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            data-v-e838505d="" style="fill: #fff;">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z"
                                fill="black" data-v-e838505d="" style="fill: #fff;"></path>
                        </svg>
                        حذف
                    </button> -->

                </div>

            </div>
        </div>
        <!-- <div class="lg:w-3/12 w-full p-1 ">
            <NuxtLink class="bg-white rounded p-2 border flex justify-center items-center min-h-[100px] cursor-pointer"
                to="/user/insertnew">
                <svg data-v-e838505d="" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path data-v-e838505d="" fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13H13V19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H11V5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z"
                        fill="black" style="fill: #1f2937;"></path>
                </svg>

                <span>

                    افزودن آیتم جدید
                </span>

            </NuxtLink>
        </div> -->
        <Paging class="w-full" :pageCount="Math.ceil(allDetails?.totalCount /  allDetails?.pageSize)"
            :pageIndex="allDetails?.pageIndex" @getPageNummber="(n) => { defaultData.PageIndex = n; pageLoader(); }">
        </Paging>
        <Modal v-if="isShow" @hideModal="isShow = false">
      <template #header>
          <p v-if="Exam?.list.length > 0"> آزمون های {{ Exam?.list[0]?.user?.fullName	 }}:</p>
          <p v-else>آزمون های شرکت کرده:</p>
      </template>
      <template #body>
          <div class="p-2" v-if="Exam?.list.length > 0">
            <div class=" flex  bg-slate-200 p-2 rounded border-slate-300 border">
                        <p class="w-[200px] flex justify-center">نام</p>
                        <p class="w-[100px] flex justify-center">
                            نتیجه آزمون
                        </p>
                        <p class="w-[100px] flex justify-center">
                             صحیح
                        </p>
                        <p class="w-[100px] flex justify-center">
                              غلط
                        </p>
                    </div>
                <div class=" max-h-[400px] overflow-scroll">
                    
                    <div v-for="(item , index) in Exam?.list">
                            <div class=" my-1 flex   p-2 rounded border" :class="[index % 2 == 0 && ' bg-slate-100']">
                                <p class="w-[200px] flex justify-center">{{item?.product?.name}}</p>
                                    <p class="w-[100px] flex justify-center">
                                     <span class=" text-green-800 text-sm" v-if="item?.passed">پاس شده</span>
                                     <span class=" text-red-800 text-sm" v-else>رد شده</span>
                                    </p>
                                    <p class="w-[100px] flex justify-center">
                                        {{item?.correctCount}}
                                    </p>
                                    <p class="w-[100px] flex justify-center">
                                        {{item?.inCorrectCount}}
                                    </p>
                            </div>
                    </div>
                </div>
                <Paging class="w-full" :pageCount="Math.ceil(Exam?.totalCount /  Exam?.pageSize)"
            :pageIndex="Exam?.pageIndex" @getPageNummber="(n) => { defaultData2.PageIndex = n; getExam(); }">
        </Paging>
          </div>
          <div class="p-2" v-else>
                <p class=" text-center">
                    آزمونی داده نشده است !
                </p>
          </div>
      </template>
    </Modal>
    </div>
</template>

<script setup>
const isShow= ref(false)
const allDetails = ref()
const roles = ref()
const loading=ref(false)
const dateRange = ref();
const defaultData = ref({
    RoleId: null,
    IsTradeUser: "",
    Q: null,
    SortBy: 0,
    Available: true,
    DateFrom: null,
    DateTo: null,
    Mobile: null,
    Email: null,
    IsLecturer: null,
    PageIndex: 1,
    PageSize: 20
})
const defaultData2 = ref({
    UserId:null,
    PageIndex: 1,
    pageSize:15
    
})
const loader = ref(false);
const Exam=ref()
onMounted(() => {
    pageLoader()
    getRoles()
})
const getExam = async ()=>{
    try {
        loading.value = true;
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/exam/UserQuestionAnswer', {
            method: 'GET',
            headers,
            query: defaultData2.value

        })


        Exam.value = data
        console.log("data frombanner ");
        console.log(data);
        loading.value = false;
    } catch (error) {

        console.log(error);
        // navigateTo("/login")
        loading.value = false;
    }
}
const pageLoader = async () => {
    console.log(defaultData.value);
    try {
        loader.value = true;
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/merchant/merchant', {
            method: 'GET',
            headers,
            query: defaultData.value

        })


        allDetails.value = data
        console.log("data frombanner ");
        console.log(data);
        loader.value = false;
    } catch (error) {

        console.log(error);
        // navigateTo("/login")
        loader.value = false;
    }

}
const getRoles = async () => {
    console.log(defaultData.value);
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/role/role', {
            method: 'GET',
            headers,

        })


        roles.value = data

        console.log("data role ");

    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}
const setDate = () => {
    console.log(dateRange);
    defaultData.value.DateFrom = dateRange.value[0];
    defaultData.value.DateTo = dateRange.value[1];
};
const deleteItem = async (itemId) => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/user/user', {
            method: 'DELETE',
            headers,
            query: {
                id: itemId
            }
        })


        console.log(data);
        pageLoader()

    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}
</script>