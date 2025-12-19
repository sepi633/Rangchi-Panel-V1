<template>
    <div class="flex flex-wrap">
        <div v-if="addStatus==true" class="tableContainer w-full">
        <div class="info-box mt-2 tablePro relative">
          <strong class="flex items-center content-start">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8 18.3692L23.801 18.3722C24.131 18.8021 24.289 20.2311 22.026 19.9771C21.0968 19.8863 20.1834 19.6745 19.309 19.3471C18.6256 19.0851 17.9719 18.7512 17.359 18.3512C16.4507 18.7167 15.4886 18.9308 14.511 18.9851C13.8134 19.9213 12.9065 20.6813 11.8628 21.2046C10.8191 21.7279 9.66754 21.9999 8.50001 21.999C7.71224 21.9997 6.9293 21.8762 6.18001 21.633C5.74001 21.888 5.24001 22.137 4.68801 22.346C3.56801 22.7699 2.63901 22.9289 1.97101 22.9759C1.47101 23.0129 1.11801 22.9869 0.944007 22.9669C0.562007 22.9229 0.220007 22.7049 0.0720068 22.339C0.00844977 22.1806 -0.0135218 22.0086 0.00818299 21.8394C0.0298878 21.6701 0.0945468 21.5092 0.196007 21.372C0.448007 21.027 0.680007 20.666 0.900007 20.3001C1.32801 19.5861 1.74801 18.8161 1.85401 17.9782C1.38506 17.083 1.10189 16.1023 1.02149 15.0949C0.941088 14.0875 1.06512 13.0743 1.38614 12.116C1.70715 11.1578 2.21853 10.2743 2.88956 9.51867C3.56058 8.76301 4.37742 8.15076 5.29101 7.71868C5.61087 6.51026 6.17897 5.38173 6.95912 4.405C7.73926 3.42828 8.71434 2.62478 9.8222 2.04571C10.9301 1.46664 12.1464 1.12471 13.3937 1.0417C14.6411 0.958688 15.892 1.13642 17.0669 1.56358C18.2417 1.99073 19.3147 2.65793 20.2174 3.52267C21.1201 4.3874 21.8327 5.4307 22.3099 6.58607C22.7871 7.74144 23.0183 8.98354 22.9889 10.2332C22.9595 11.4829 22.67 12.7127 22.139 13.8444C21.949 15.5683 22.816 17.0192 23.799 18.3692H23.8ZM7.00001 9.99956C7.00055 8.94481 7.23947 7.90382 7.69891 6.95438C8.15834 6.00493 8.82642 5.17159 9.65321 4.51662C10.48 3.86165 11.4441 3.40199 12.4736 3.17198C13.503 2.94198 14.5711 2.94758 15.598 3.18836C16.625 3.42915 17.5842 3.8989 18.4041 4.5625C19.224 5.2261 19.8833 6.06641 20.3327 7.02062C20.7822 7.97482 21.0102 9.01826 20.9997 10.073C20.9891 11.1277 20.7404 12.1664 20.272 13.1114C20.224 13.208 20.1919 13.3116 20.177 13.4184C19.958 14.9933 20.327 16.4293 21.082 17.8082C19.9899 17.5424 18.9604 17.0651 18.052 16.4033C17.9061 16.2974 17.7342 16.233 17.5547 16.2168C17.3751 16.2006 17.1945 16.2332 17.032 16.3113C15.9647 16.8241 14.7848 17.0579 13.6025 16.9907C12.4203 16.9234 11.2744 16.5574 10.2722 15.9268C9.26994 15.2962 8.44403 14.4217 7.87176 13.3851C7.29948 12.3485 6.99955 11.1836 7.00001 9.99956ZM5.00401 10.2536C5.06025 12.2429 5.77405 14.1575 7.03384 15.6982C8.29362 17.2389 10.0284 18.3188 11.967 18.7691C10.9877 19.5666 9.76292 20.0011 8.50001 19.9991C7.77001 19.9991 7.07701 19.8581 6.44301 19.6021C6.29459 19.5421 6.13393 19.5185 5.97453 19.5335C5.81513 19.5485 5.66165 19.6015 5.52701 19.6881C5.08801 19.9711 4.56701 20.2531 3.97901 20.4761C3.6313 20.6086 3.2756 20.7192 2.91401 20.807C3.24701 20.2001 3.58401 19.4771 3.73801 18.7971C3.81501 18.4602 3.85801 18.1332 3.87601 17.8262C3.88821 17.6287 3.84157 17.4321 3.74201 17.2612C3.25411 16.4227 2.99802 15.4695 3.00001 14.4993C3.00001 12.7894 3.78001 11.2625 5.00401 10.2536Z" fill="black"/>
            </svg>

                تیکت   جدید</strong>
 
          <hr>

          <div  class="ticket-box flex flex-wrap" >
            <div class="flex flex-col flex-wrap lg:w-1/3 w-full p-1">
                <label for=""> عنوان:</label>
                <input v-model="newTicket.name"
                 class="bg-white border-gray-300 rounded"  type="text" >
            </div>
            <div class="flex flex-col lg:w-1/3 w-full p-1">
                <label for=""> محصول: {{ selectedProduct?.name }}</label>
                <div class="relative">
            <input type="text" v-model="categoryItemData.Q" @keyup="()=>{if(categoryItemData.Q.length > 3){;categoryItem()}}"
            class="w-full border rounded p-1"
             placeholder="نام اشتراک مورد نظر راوارد کنید ">
            <svg data-v-e3d38578="" width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-0 top-3 min-w-[24px]" style="/*! fill: red; */"><path data-v-e3d38578="" fill-rule="evenodd" clip-rule="evenodd" d="M12 1.99999C10.6739 1.99999 9.40215 2.52677 8.46447 3.46446C7.52678 4.40214 7 5.67391 7 6.99999C7 8.32607 7.52678 9.59784 8.46447 10.5355C9.40215 11.4732 10.6739 12 12 12C13.3261 12 14.5979 11.4732 15.5355 10.5355C16.4732 9.59784 17 8.32607 17 6.99999C17 5.67391 16.4732 4.40214 15.5355 3.46446C14.5979 2.52677 13.3261 1.99999 12 1.99999ZM5 6.99999C5 5.89125 5.26338 4.79837 5.76843 3.81134C6.27349 2.82431 7.00578 1.97138 7.90501 1.32276C8.80423 0.674152 9.84467 0.24842 10.9406 0.080626C12.0366 -0.0871681 13.1568 0.00777569 14.2089 0.357639C15.2609 0.707502 16.2149 1.30228 16.9921 2.09298C17.7693 2.88369 18.3476 3.84771 18.6794 4.90567C19.0111 5.96362 19.0868 7.08524 18.9001 8.17816C18.7135 9.27108 18.27 10.304 17.606 11.192L22.707 16.292C22.8946 16.4795 23.0001 16.7339 23.0002 16.9991C23.0003 17.2644 22.895 17.5188 22.7075 17.7065C22.52 17.8941 22.2656 17.9996 22.0004 17.9997C21.7351 17.9998 21.4806 17.8945 21.293 17.707L16.193 12.607C15.1525 13.3853 13.9159 13.8587 12.6217 13.9741C11.3274 14.0895 10.0266 13.8424 8.86481 13.2604C7.70304 12.6784 6.72618 11.7846 6.0436 10.6789C5.36103 9.57321 4.99967 8.29938 5 6.99999Z" fill="black" style="fill: #9ca3af;"></path></svg>
            <ul v-if="categoryItemData.Q.length > 3" 
             class="absolute left-0 top-[35px] p-1 w-full rounded border border-gray-300 p-1 z-10
             bg-gray-300 h-[200px] overflow-scroll">
              <li v-for="item in categoryItemList"
              @click="selectedProduct=item,categoryItemData.Q=''" 
              class="p-1 bg-white my-1 border-b">  {{ item?.name }} </li>
            </ul>
          </div>
          
            </div>
            <div class="flex flex-col lg:w-1/3 w-full p-1">
                <label for=""> مشتری:</label>
                <select class="p-1 m-1 rounded" @change="(e)=>{newTicket.userId = e.target.value;;
                }" name="" id="">
                <option value="">لطفا انتخاب کنید</option>
                <option v-for="element in customer?.list" 
                :value="element?.id" 
                @click="newTicket.userId=element.id">{{element.fullName}}</option>
            </select>
            </div>
            <div class="flex flex-col lg:w-1/3 w-full p-1">
                <label for=""> وضعیت:</label>
                <select class="p-1 m-1 rounded" @change="(e)=>{newTicket.statusId = e.target.value;;
                }" name="" id="">
                <option value="">لطفا انتخاب کنید</option>
                <option v-for="element in ticketCode" 
                :value="element?.id" 
                @click="newTicket.statusId=element.id">{{element.name}}</option>
            </select>

            <label for=""> درجه اهمیت:</label>
                <select class="p-1 m-1 rounded" @change="(e)=>{newTicket.statusId = e.target.value;;
                }" name="" id="">
                <option value="">لطفا انتخاب کنید</option>
                <option v-for="element in importance" 
                :value="element?.id" 
                @click="newTicket.importanceId=element.id">{{element.name}}</option>
            </select>
            </div>
            <div class="flex flex-col lg:w-1/3 w-full p-1">
                <label class="select-file"  for="choose-file">
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
                        <span> برای انتخاب فایل کلیک کنید </span>
                    </label>
                <input class="bg-white border-gray-300 rounded hidden" id="choose-file" type="file"  @change="fileSelect">


                <button  @click="confirmUpload" class="h-[40px] mt-2 w-full rounded text-white p-2 bg-[#0d37b8] w-100 flex items-center justify-center">
                
                آپلود</button>
            </div>
            <div class="flex flex-col lg:w-1/3 w-full p-1">
                <label for=""> متن:</label>
                <input v-model="newTicket.body"
                 class="bg-white border-gray-300 rounded" type="text" >
            </div>
            
            <div class="flex flex-col lg:w-1/3 w-1/2 p-1">
                <label for=""></label>
                <button @click="addStatus=false" 
                class="w-full p-1 rounded bg-red-600 hover:bg-red-700 mt-auto text-white ">انصراف</button>
            </div>
            <div class="flex flex-col lg:w-1/3 w-1/2 p-1">
                <label for=""></label>
                <button @click="submitTicketInfo" 
                class="w-full p-1 rounded bg-green-600 hover:bg-green-700 mt-auto text-white ">ثبت</button>
            </div>
          </div>

          <div class=""></div>
          
        </div>
      </div>
     
      <div class="flex w-full flex-wrap">
        <div class="tableContainer w-full lg:w-1/3"  :class="{'w-full ':innerTicketItemList?.length ==0}">
        <div class="info-box mt-2 tablePro relative">
          <strong class="flex items-center content-start">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8 18.3692L23.801 18.3722C24.131 18.8021 24.289 20.2311 22.026 19.9771C21.0968 19.8863 20.1834 19.6745 19.309 19.3471C18.6256 19.0851 17.9719 18.7512 17.359 18.3512C16.4507 18.7167 15.4886 18.9308 14.511 18.9851C13.8134 19.9213 12.9065 20.6813 11.8628 21.2046C10.8191 21.7279 9.66754 21.9999 8.50001 21.999C7.71224 21.9997 6.9293 21.8762 6.18001 21.633C5.74001 21.888 5.24001 22.137 4.68801 22.346C3.56801 22.7699 2.63901 22.9289 1.97101 22.9759C1.47101 23.0129 1.11801 22.9869 0.944007 22.9669C0.562007 22.9229 0.220007 22.7049 0.0720068 22.339C0.00844977 22.1806 -0.0135218 22.0086 0.00818299 21.8394C0.0298878 21.6701 0.0945468 21.5092 0.196007 21.372C0.448007 21.027 0.680007 20.666 0.900007 20.3001C1.32801 19.5861 1.74801 18.8161 1.85401 17.9782C1.38506 17.083 1.10189 16.1023 1.02149 15.0949C0.941088 14.0875 1.06512 13.0743 1.38614 12.116C1.70715 11.1578 2.21853 10.2743 2.88956 9.51867C3.56058 8.76301 4.37742 8.15076 5.29101 7.71868C5.61087 6.51026 6.17897 5.38173 6.95912 4.405C7.73926 3.42828 8.71434 2.62478 9.8222 2.04571C10.9301 1.46664 12.1464 1.12471 13.3937 1.0417C14.6411 0.958688 15.892 1.13642 17.0669 1.56358C18.2417 1.99073 19.3147 2.65793 20.2174 3.52267C21.1201 4.3874 21.8327 5.4307 22.3099 6.58607C22.7871 7.74144 23.0183 8.98354 22.9889 10.2332C22.9595 11.4829 22.67 12.7127 22.139 13.8444C21.949 15.5683 22.816 17.0192 23.799 18.3692H23.8ZM7.00001 9.99956C7.00055 8.94481 7.23947 7.90382 7.69891 6.95438C8.15834 6.00493 8.82642 5.17159 9.65321 4.51662C10.48 3.86165 11.4441 3.40199 12.4736 3.17198C13.503 2.94198 14.5711 2.94758 15.598 3.18836C16.625 3.42915 17.5842 3.8989 18.4041 4.5625C19.224 5.2261 19.8833 6.06641 20.3327 7.02062C20.7822 7.97482 21.0102 9.01826 20.9997 10.073C20.9891 11.1277 20.7404 12.1664 20.272 13.1114C20.224 13.208 20.1919 13.3116 20.177 13.4184C19.958 14.9933 20.327 16.4293 21.082 17.8082C19.9899 17.5424 18.9604 17.0651 18.052 16.4033C17.9061 16.2974 17.7342 16.233 17.5547 16.2168C17.3751 16.2006 17.1945 16.2332 17.032 16.3113C15.9647 16.8241 14.7848 17.0579 13.6025 16.9907C12.4203 16.9234 11.2744 16.5574 10.2722 15.9268C9.26994 15.2962 8.44403 14.4217 7.87176 13.3851C7.29948 12.3485 6.99955 11.1836 7.00001 9.99956ZM5.00401 10.2536C5.06025 12.2429 5.77405 14.1575 7.03384 15.6982C8.29362 17.2389 10.0284 18.3188 11.967 18.7691C10.9877 19.5666 9.76292 20.0011 8.50001 19.9991C7.77001 19.9991 7.07701 19.8581 6.44301 19.6021C6.29459 19.5421 6.13393 19.5185 5.97453 19.5335C5.81513 19.5485 5.66165 19.6015 5.52701 19.6881C5.08801 19.9711 4.56701 20.2531 3.97901 20.4761C3.6313 20.6086 3.2756 20.7192 2.91401 20.807C3.24701 20.2001 3.58401 19.4771 3.73801 18.7971C3.81501 18.4602 3.85801 18.1332 3.87601 17.8262C3.88821 17.6287 3.84157 17.4321 3.74201 17.2612C3.25411 16.4227 2.99802 15.4695 3.00001 14.4993C3.00001 12.7894 3.78001 11.2625 5.00401 10.2536Z" fill="black"/>
            </svg>

                تیکت های ثبت شده من</strong>

                <!-- <button @click="addStatus = true" class="absolute top-1 text-sm p-2 bg-blue-100 left-1">+ افزودن تیکت</button> -->
          <hr>
          <div class="flex btn-box items-center flex-wrap">
                 
                 <button
                     @click="pageLoader()"
                 class="bg-gray-200 p-1 px-3 rounded hover:bg-blue-500 hover:text-white m-1"
                 :class="{'active':statusId==null}"> همه</button>
                 <button
                     @click="pageLoader(1)"
                 class="bg-gray-200 p-1 px-3 rounded hover:bg-blue-500 hover:text-white m-1"
                 :class="{'active':statusId==1}">پاسخ داده شده </button>
                 <button
                     @click="pageLoader(0)"
                 class="bg-gray-200 p-1 px-3 rounded hover:bg-blue-500 hover:text-white m-1"
                 :class="{'active':statusId==0}">درحال انتظار   </button>
                 <button
                     @click="pageLoader(2)"
                 class="bg-gray-200 p-1 px-3 rounded hover:bg-blue-500 hover:text-white m-1"
                 :class="{'active':statusId==2}">بسته شده   </button>
             </div>

          <div class="ticket-box">
            <p v-if="ticketList?.list?.length ==0" class="m-auto bg-orange-200
                    text-orange-800 text-center border border-orange-500 p-3 rounded"
                    > تیکتی ثبت نشده  </p>
               
            <TicketItem class="m2-2" @click="getTicketItemInfo(item.id)"
             v-for="item in ticketList?.list" :data="item" />

          </div>

          <div class=""></div>
          
        </div>
      </div>
      <div class="overflow-hidden w-full lg:w-2/3 p-2">
        <div class=" bg-white border rounded h-[550px] overflow-hidden relative">
            <!-- <span class="absolute top-2 right-[39%] rounded-[20px] block w-1/4 p-2 bg-black z-10"></span> -->

            <div class="flex justify-center items-center h-full ">
        <div class="bg-white rounded w-full h-full flex flex-col" id="items">
            <!-- <nav class="w-full h-[80px] bg-blue-700 p-3 rounded-tr rounded-tl flex justify-between items-center">
                <div class="flex text-white p-1 items-end ">
                    <img class="w-[50px] rounded-[50px] h-[50px] border p-1 bg-red-200" src="/img/support.png" alt="">
                <span class="block mb-3 ms-2 text-sm">پشتیبان سایت نامدار آکادمی</span>
                </div>
            
            </nav> -->
            <div class="chat overflow-auto h-[100%] bg-white px-1 py-1 ">

                <div class="bg-blue-200 text-center p-1">شماره تیکت:{{ ticketItemData?.ticketId }}</div>
                <!-- :class="{'lg:w-[0px]':innerTicketItemList?.length ==0}" -->
                <p v-if="innerTicketItemList?.length ==0" class="m-auto bg-blue-200
                    text-blue-800 text-center border border-blue-500 p-3 rounded">مکالمه ای صورت نگرفته</p>
                <div class="message my-2 flex" v-for="item in innerTicketItemList" :class="{'justify-start flex-row-reverse':authStore?.user.userId!=item?.userId}">
                    <img v-if="authStore?.user.userId !=item?.userId" class="w-[30px] rounded-[50px] h-[30px] border p-1 bg-blue-800" src="/img/logo.png" alt="">
                    <img v-else class="w-[30px] rounded-[50px] h-[30px] border p-1 bg-red-200" src="/img/support.png" alt="">
                    
                    <p class="m-1 text p-1 bg-yellow-100 border border-yellow-200 rounded ">
                        <span class="text-xs text-yellow-600">{{item?.user?.fullName}}</span>
                        <br>
                        {{item?.body}}
                        <br>
                        <a class="text-xs text-blue-700"
                        v-if="item?.file" :href="showImageBaseUrl + item?.file?.url" target="_blank" rel="noopener noreferrer">
                            مشاهده فایل
                        </a>
                    </p>
                </div>
            </div>
            <div class="flex justify-between items-center flex-wrap p-1 mt-auto bg-gray-300">
                <div class="relative w-full lg:w-5/6  ">
                    
                    <textarea  class="min-h-[103px] w-full"  placeholder="تایپ کنید ..."
                      id="typemsg" v-model="ticketItem.body"> </textarea>
                </div>
               <div class="w-full lg:w-1/6 ps-1 flex flex-wrap">
                <label class="w-[50px] cursor-pointer  mb-1 p-1 bg-yellow-400 hover:bg-yellow-500 w-full rounded py-3 flex justify-center text-white"  for="choose-file-2">
                <LoadingTinyLoading v-if="fileLoading==true" />
                       
                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
 <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
</svg>
 فایل
                   </label>
               <input class=" hidden" id="choose-file-2" type="file"  @change="fileSelect2">

                <button @click="submitTicketItemInfo"
                class="rounded text-white w-full p-1 py-3 bg-green-600 text-center items-center 
                flex justify-center hover:bg-green-700 hover:text-white"> 

                <LoadingTinyLoading v-if="messageLoader==true" />

                    ارسال پیام
                </button>
               </div>
               
                <!-- <div class="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center"> <button class="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white" onclick="sendbtn();"><i class="mdi mdi-send "></i></button> </div> -->
            </div>
            <!-- <span class="bg-white w-1/2 m-auto rounded h-[5px] absolute right-[25%] bottom-1"></span> -->
        </div>
    </div>
        </div>
      </div>
      </div>
      
    </div>

</template>

<script setup>
import moment from 'jalali-moment';

const {public:{showImageBaseUrl , fileUploaderUrl}} = useRuntimeConfig()
const ticketList = ref()
const ticketItemList = ref()
const innerTicketItemList=ref([])
const slectedTicket = ref()
const ticketCode = ( [{
      "label": "TicketStatus_Waiting",
      "value": "در انتظار پاسخ",
      "name": "در انتظار پاسخ",
      "id": 29
    },
    {
      "label": "TicketStatus_Answered",
      "value": "پاسخ داده شده",
      "name": "پاسخ داده شده",
      "id": 30
    },
    {
      "label": "TicketStatus_Close",
      "value": "بسته شده",
      "name": "بسته شده",
      "id": 31
    }
  ])
  const statusId = ref(null)
const newTicket = ref({
    
    "name": "",
    "body": " ",
    "fileId": null,
    "productId": null,
    "statusId": 0,
  "importanceId": 0,
  "userId": 0,
//   "adminId": 0,
  })

  const importance = ref([
    {
      "label": "TicketImportance_Normal",
      "value": "متوسط",
      "name": "متوسط",
      "id": 32
    },
    {
      "label": "TicketImportance_Important",
      "value": "مهم",
      "name": "مهم",
      "id": 33
    },
    {
      "label": "TicketImportance_VeryImportant",
      "value": "خیلی مهم",
      "name": "خیلی مهم",
      "id": 34
    }
  ])
const ticketItem=ref(
    {
  "id": 0,
  "body": " ",
  "createDate": "2024-01-21T13:51:15.280Z",
  "fileId": null,
  "ticketId": null,
  "userId": null
}
)
const fileName = ref("name");
const fileType = ref("type");
const fileAddress = ref("address");
const fileSize = ref("size");
const orgFile = ref();
const orgLocation = ref();
const fileId=ref(null);
const fileId2=ref(null);
const orgFile2=ref()
const ticketItemData = ref()
const fileLoading = ref(false)


const fileSelect2 =async(event) => {
  ;
  orgFile2.value = event.target.files[0];


  const formData2 = new FormData();
        formData2.append("file", orgFile2.value);
        
        try {

  fileLoading.value=true;

            const response = await $fetch(fileUploaderUrl, {
            method: "POST",
            body: formData2,
            headers: {
                Accept: "*/*",
            },
            });

            // loader.value=false
            // emit('getPictureId',picId)
            // pageLoader()
            ;
            if(response.isSuccess){
                fileId2.value =response.data.id;
  fileLoading.value=false;

            }}
            catch(err){
                ;
            }
  
};
const fileSelect = (event) => {
  ;
  const [file] = event.target.files;
  orgFile.value = event.target.files[0];
  orgLocation.value = event.target.value;
  fileAddress.value = URL.createObjectURL(file);
  fileName.value = file.name;
  fileType.value = file.type;
  fileSize.value = parseInt(file.size) / 1000;
  

};

const confirmUpload = async () => {
    
                ;
        ;
        ;

        const formData = new FormData();
        formData.append("file", orgFile.value);
    
        try {
            const insert = await $fetch(fileUploaderUrl, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "*/*",
            },
            });

            // loader.value=false
            // emit('getPictureId',picId)
            // pageLoader()
            ;
            if(insert.isSuccess){
                fileId.value =insert.data.id;
            }
            // picId.value = insert?.data?.id;
            // confirmtStatus.value = true;
        } catch (error) {
            ;
        }
    
//   loader.value = true;
  
};

const defaultData=ref()
const authStore = useAuth();

    onMounted(()=>{
        pageLoader()
        getCustomer()
    })

    const getCustomer  = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/user/user', {
            method: 'GET',
            headers,
            query: {
                RoleId: 1
            }
        })


        customer.value = data
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const customer = ref()

    

        const pageLoader = async (status)=>{
            if(status>=0){
                statusId.value=status
                ;
            }else{
                statusId.value=null

            }
            try {
                const response = await $fetch('/api/ticket/ticket', {
                    method: 'GET',
                    query:{
                        Status:status
                    }
                
                })

                ticketList.value = response
            } catch (error) {
                ;
                // navigateTo("/authorize/login")
            }
        }

const getTicketItem = async (num)=>{
            slectedTicket.value = num
            try {
                const response = await $fetch('/api/ticketItem/ticket', {
                    method: 'GET',
                    query:{
                        TicketId:num,
                        PageSize:50
                    }
                })

                ticketItemList.value = response
            } catch (error) {
                ;
                // navigateTo("/authorize/login")
            }
        }

        const categoryItemData = ref({
    "Q": ""
})
const selectedProduct = ref()
const categoryItemList = ref()
const addStatus = ref(false)
const categoryItem = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/product/products', {
            method: 'GET',
            headers,
            query: categoryItemData.value
        })



        categoryItemList.value = data?.list
        // newCategory.value.parentId = pageData?.value.parentId
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}



const submitTicketInfo = async () => {
   newTicket.value.fileId = fileId.value;
    try {
          const headers = useRequestHeaders(['cookie'])
          const insert = await $fetch(('/api/ticket/ticket'), {
              method: "POST",
              body: newTicket.value,
              headers: {
                  'Accept': 'application/json'
              }
          })
  
          ;
          if(insert.isSuccess){
            pageLoader()
            addStatus.value=false
          }
  
      } catch (error) {
          ;
      }
      
  }


const getTicketItemInfo = async (num)=>{
            slectedTicket.value = num
            innerTicketItemList.value=[]
            try {
                const response = await $fetch('/api/ticketItem/ticket', {
                    method: 'GET',
                    query:{
                        TicketId:num,
                        PageSize:50
                    }
                })

                // ticketItemList.value = response
                ;
                ticketItemData.value=response
                response.list.forEach(item => {
                innerTicketItemList.value.push(item)
                    
                });

            } catch (error) {
                ;
                // navigateTo("/authorize/login")
            }
        }

        const messageLoader = ref(false)
  const submitTicketItemInfo = async () => {

    ;
    // newTicket.value.productId = selectedProduct.value.id
    //  newTicket.value.productId = selectedProduct.value.id
  messageLoader.value = true
    ticketItem.value.userId =authStore.user.userId;
    ticketItem.value.ticketId = slectedTicket.value
    ticketItem.value.fileId = fileId2.value
    ;
    try {
          const headers = useRequestHeaders(['cookie'])
          const insert = await $fetch(('/api/ticketItem/ticket'), {
              method: "POST",
              body: ticketItem.value,
              headers: {
                  'Accept': 'application/json'
              }
          })
  
          ;
        //   pageLoader()
        if(insert.isSuccess){
            messageLoader.value = false
          await  getTicketItemInfo(slectedTicket.value)
           ticketItem.value =  {
                "id": 0,
                "body": " ",
                "createDate": "2024-01-21T13:51:15.280Z",
                "fileId": null,
                "ticketId": null,
                "userId": null
                }}
  
      } catch (error) {
          ;
      }
      
  }
  

</script>

<style lang="scss" scoped>
.select-file{
    background: #e3e3e3;
  width: 100%;
  min-height: 205px;
  border-radius: 5px;
  border: 1px solid rgba(51, 51, 51, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.tbl_header{
    position: sticky;
    top: 10px;
    z-index: 1000   
}
.orderBox{
    display: none;
}
.active{
    display: flex;
}

.product-img img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.btn-box {
    .btn {
        background-color: #e3e3e3;
        margin: 10px;
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;

        &.active {
            background: linear-gradient(180deg, #0267FF 0%, #003686 100%);
            color: #fff
        }
    }
}

.info-box {
    // border: 1px solid #3333;
    // background-color: #fff;
    // border-radius: 10px;
    padding: 10px 0;
    line-height: 33px;
    width: 100% !important;

    &>div:nth-child(2n){
        .info-line,.orderBox{
            background-color: rgb(221, 221, 221) !important;
        }
        }

    .info-item {
        span {
            &:first-child {
                color: #848484;
                margin-left: 10px;
            }
        }
    }

    .info-line {
        min-height: 50px;
        border: 1px solid #3333;
        transition: 0.2s;

        

        &:hover {
            border-color: #cba12c;
            box-shadow: 0 0 5px -2px #3333;
        }

        & > div {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 5px;

            img {
                width: 80px;
                height: 80px;
                border: 1px solid #3333;
            }

            span {
                font-size: 13px;

            }
        }
    }
}

.infoBoxContainer {
    overflow: auto;
}
@media only screen and (max-width: 600px) {
    .btn-box .btn {
        margin: 4px;
        
    }
}
@media only screen and (max-width: 1200px) {
    .profileContainer{
        overflow: auto;
    }   
}

.storeName{
    background: #cba12c;
    padding: 0 15px;
    height: 30px;
    border-radius: 5px;
}
@media only screen and (max-width: 991px) {
    .profileContainer{
        height: 350px;
    }
    .info-box .info-line > div  {
        padding: 0;
    }
}

.active{
    background-color: #2563eb;
    color: white;
}


</style>