<template lang="">
  <div class="table-box">
       <div class="table-title flex justify-between">
           <div class="lg:w-6/12">
               <!-- <h1 class="h3 " v-if="props.data?.title">{{props.data?.title}}</h1> -->
               <h1 class="h3 " >لیست
                ({{props?.data?.totalCount}})
               </h1>
           </div>
           <div class="lg:w-2/12">
               
               <NuxtLink :to="props.add" class="btn add-item">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
 <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
افزودن آیتم
           </NuxtLink>
           </div>
       </div>
       <hr>
       
       <div class="table-header flex">
           <div class="lg:w-1/12">
               <strong>ردیف</strong>
           </div>
           <div class="lg:w-2/12">
               <strong>عنوان</strong>
           </div>
           <div class="lg:w-1/12">
               <strong> شناسه</strong>
           </div>
           <div class="lg:w-1/12">
               <strong>دسته بندی</strong>
           </div>
           <div class="lg:w-1/12">
               <strong>وضعیت</strong>
           </div>
           <div class="lg:w-2/12">
               <strong>تاریخ</strong>
           </div>
           <div class="lg:w-2/12">
               <strong>نویسنده</strong>
           </div>
           <div class="lg:w-1/12">
               <strong>عملیات</strong>
           </div>

       </div>
       <div class="table-content ">
           <div v-for="(item,index) in props?.data?.list" class="flex flex-wrap" :title="item?.summary">
               <div class="lg:w-1/12 w-1/6 text-center">
                   <span>{{(props?.data.pageSize*( props?.data?.pageIndex - 1 )) + index + 1}}</span>
               </div>
               <div class="lg:w-2/12  w-5/6
               ">
                   <span class="mobile-key">نام:</span>
                   <span>{{item?.name}} (
                    <!-- نویسنده:{{item?.user?.fullName}}) -->
                  </span>
               </div>
               <div class="lg:w-1/12 w-1/2">
                   <span class="mobile-key">شناسه :</span>

                   <span> {{item?.id}}</span>
               </div>
               <div class="lg:w-1/12 w-1/2">
                   <span class="mobile-key">دسته بندی:</span>

                   <span> {{item?.categoryId}}</span>
               </div>
               <div class="lg:w-1/12 w-full">
                   <span class="mobile-key">وضعیت:</span>

                   <span class="text-green-700" v-if="item?.adminConfirm==true">  مورد تایید  <br>({{item?.admin?.fullName}})</span>
                   <span class="text-red-700"  v-else> تایید نشده</span>
               </div>
               <!-- <div class="lg:w-2/12 w-1/2">

                   <span class="text-gray-500">بارگزاری:
                   <br></span>
                   <span>{{ moment(item?.createDate).locale('fa').format('YYYY/MM/DD | HH:MM')}}</span>
                    
                    <br>
                   <strong>انتشار:</strong>
                   
                   <br>
                   <span>{{ moment(item?.publishDate).locale('fa').format('YYYY/MM/DD | HH:MM')}}</span>
               </div> -->
               <div class="lg:w-2/12 flex w-1/2 flex-wrap">
                  <!-- <span class="rounded border m-1 bg-white p-1 text-xs" v-for="tag in item?.hashtags">
                  {{tag?.name}}</span> -->
                  {{item?.user?.fullName}}
                  <br>
                  (بازدید: {{item?.visitCount}})
               </div>
               <div class="lg:w-2/12 flex flex-wrap w-full relative "  >

                   <button class="btn btn-sm  icon-btn rounded" title="ویرایش" @click="getItem(item?.id)">
                    
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
 <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
                   </button>
                   <button class="btn btn-sm  icon-btn rounded" @click="deleteItem(item?.id),$emit('callData', modalData);">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
 <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                   </button>
                   <button class="btn btn-sm  icon-btn " @click="modalHandler(item?.id,item?.name)">
                      <svg data-v-b76ad084="" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" style="
  width: 20px;
  height: 20px;
"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M11 5.99747C10.7348 5.99747 10.4804 6.10282 10.2929 6.29036C10.1054 6.4779 10 6.73225 10 6.99747V8.99747H14V6.99747C14 6.73225 13.8946 6.4779 13.7071 6.29036C13.5196 6.10282 13.2652 5.99747 13 5.99747H11ZM15.83 5.99747C15.623 5.41239 15.2397 4.90589 14.7329 4.54771C14.226 4.18953 13.6206 3.99729 13 3.99747H11C10.3794 3.99729 9.77397 4.18953 9.26715 4.54771C8.76032 4.90589 8.37701 5.41239 8.17 5.99747H6C5.20435 5.99747 4.44129 6.31354 3.87868 6.87615C3.31607 7.43876 3 8.20182 3 8.99747V18.9975C3 19.7931 3.31607 20.5562 3.87868 21.1188C4.44129 21.6814 5.20435 21.9975 6 21.9975H18C18.7956 21.9975 19.5587 21.6814 20.1213 21.1188C20.6839 20.5562 21 19.7931 21 18.9975V8.99747C21 8.20182 20.6839 7.43876 20.1213 6.87615C19.5587 6.31354 18.7956 5.99747 18 5.99747H15.83ZM16 7.99747V9.99747C16 10.2627 15.8946 10.517 15.7071 10.7046C15.5196 10.8921 15.2652 10.9975 15 10.9975H9C8.73478 10.9975 8.48043 10.8921 8.29289 10.7046C8.10536 10.517 8 10.2627 8 9.99747V7.99747H6C5.73478 7.99747 5.48043 8.10282 5.29289 8.29036C5.10536 8.4779 5 8.73225 5 8.99747V18.9975C5 19.2627 5.10536 19.517 5.29289 19.7046C5.48043 19.8921 5.73478 19.9975 6 19.9975H18C18.2652 19.9975 18.5196 19.8921 18.7071 19.7046C18.8946 19.517 19 19.2627 19 18.9975V8.99747C19 8.73225 18.8946 8.4779 18.7071 8.29036C18.5196 8.10282 18.2652 7.99747 18 7.99747H16Z" fill="black"></path></svg>
                   </button>


                   <NuxtLink :to="`/content/preveiw${item?.id}`" class="btn btn-sm  icon-btn " >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.99414C2 4.19849 2.31607 3.43543 2.87868 2.87282C3.44129 2.31021 4.20435 1.99414 5 1.99414H19C19.7956 1.99414 20.5587 2.31021 21.1213 2.87282C21.6839 3.43543 22 4.19849 22 4.99414V18.9941C22 19.7898 21.6839 20.5529 21.1213 21.1155C20.5587 21.6781 19.7956 21.9941 19 21.9941H5C4.20435 21.9941 3.44129 21.6781 2.87868 21.1155C2.31607 20.5529 2 19.7898 2 18.9941V4.99414ZM5 3.99414C4.73478 3.99414 4.48043 4.0995 4.29289 4.28703C4.10536 4.47457 4 4.72892 4 4.99414V9.99414H20V4.99414C20 4.72892 19.8946 4.47457 19.7071 4.28703C19.5196 4.0995 19.2652 3.99414 19 3.99414H5ZM4 11.9941V18.9941C4 19.2594 4.10536 19.5137 4.29289 19.7012C4.48043 19.8888 4.73478 19.9941 5 19.9941H19C19.2652 19.9941 19.5196 19.8888 19.7071 19.7012C19.8946 19.5137 20 19.2594 20 18.9941V11.9941H4ZM14 12.9941C14.2652 12.9942 14.5195 13.0996 14.707 13.2871L18.707 17.2871C18.8892 17.4757 18.99 17.7283 18.9877 17.9905C18.9854 18.2527 18.8802 18.5036 18.6948 18.689C18.5094 18.8744 18.2586 18.9795 17.9964 18.9818C17.7342 18.9841 17.4816 18.8833 17.293 18.7011L14 15.4081L11.707 17.7011L10.707 18.7011C10.5184 18.8833 10.2658 18.9841 10.0036 18.9818C9.7414 18.9795 9.49059 18.8744 9.30518 18.689C9.11977 18.5036 9.0146 18.2527 9.01233 17.9905C9.01005 17.7283 9.11084 17.4757 9.293 17.2871L9.586 16.9941L9 16.4081L6.707 18.7011C6.5184 18.8833 6.2658 18.9841 6.0036 18.9818C5.7414 18.9795 5.49059 18.8744 5.30518 18.689C5.11977 18.5036 5.0146 18.2527 5.01233 17.9905C5.01005 17.7283 5.11084 17.4757 5.293 17.2871L8.293 14.2871C8.48053 14.0997 8.73484 13.9944 9 13.9944C9.26516 13.9944 9.51947 14.0997 9.707 14.2871L11 15.5801L13.293 13.2871C13.4805 13.0996 13.7348 12.9942 14 12.9941ZM11 6.99414C11 6.72892 11.1054 6.47457 11.2929 6.28703C11.4804 6.0995 11.7348 5.99414 12 5.99414H17C17.2652 5.99414 17.5196 6.0995 17.7071 6.28703C17.8946 6.47457 18 6.72892 18 6.99414C18 7.25936 17.8946 7.51371 17.7071 7.70125C17.5196 7.88878 17.2652 7.99414 17 7.99414H12C11.7348 7.99414 11.4804 7.88878 11.2929 7.70125C11.1054 7.51371 11 7.25936 11 6.99414ZM7 8.74414C7.46413 8.74414 7.90925 8.55977 8.23744 8.23158C8.56563 7.90339 8.75 7.45827 8.75 6.99414C8.75 6.53001 8.56563 6.08489 8.23744 5.7567C7.90925 5.42852 7.46413 5.24414 7 5.24414C6.53587 5.24414 6.09075 5.42852 5.76256 5.7567C5.43437 6.08489 5.25 6.53001 5.25 6.99414C5.25 7.45827 5.43437 7.90339 5.76256 8.23158C6.09075 8.55977 6.53587 8.74414 7 8.74414Z" fill="black"/>
</svg>   
                      </NuxtLink >
                   
               </div>
               <div class="w-full bg-orange-100 border border-orange-200 rounded p-1 px-3 text-orange-800" v-if="item?.children[0]">

                <span>خبر     {{item?.children[0]?.name}}   تغیرکرد.</span>
                <div class="lg:w-2/12 flex flex-wrap w-full"  v-if="item?.children[0]">

<button class="btn btn-sm  icon-btn rounded" title="ویرایش" @click="getItem(item?.children[0]?.id)">

  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
</button>
<button class="btn btn-sm  icon-btn rounded" @click="deleteItem(item?.children[0]?.id)">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</button>
<button class="btn btn-sm  icon-btn " @click="modalHandler(item?.children[0]?.id,item?.children[0]?.name)">
 <svg data-v-b76ad084="" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" style="
width: 20px;
height: 20px;
"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M11 5.99747C10.7348 5.99747 10.4804 6.10282 10.2929 6.29036C10.1054 6.4779 10 6.73225 10 6.99747V8.99747H14V6.99747C14 6.73225 13.8946 6.4779 13.7071 6.29036C13.5196 6.10282 13.2652 5.99747 13 5.99747H11ZM15.83 5.99747C15.623 5.41239 15.2397 4.90589 14.7329 4.54771C14.226 4.18953 13.6206 3.99729 13 3.99747H11C10.3794 3.99729 9.77397 4.18953 9.26715 4.54771C8.76032 4.90589 8.37701 5.41239 8.17 5.99747H6C5.20435 5.99747 4.44129 6.31354 3.87868 6.87615C3.31607 7.43876 3 8.20182 3 8.99747V18.9975C3 19.7931 3.31607 20.5562 3.87868 21.1188C4.44129 21.6814 5.20435 21.9975 6 21.9975H18C18.7956 21.9975 19.5587 21.6814 20.1213 21.1188C20.6839 20.5562 21 19.7931 21 18.9975V8.99747C21 8.20182 20.6839 7.43876 20.1213 6.87615C19.5587 6.31354 18.7956 5.99747 18 5.99747H15.83ZM16 7.99747V9.99747C16 10.2627 15.8946 10.517 15.7071 10.7046C15.5196 10.8921 15.2652 10.9975 15 10.9975H9C8.73478 10.9975 8.48043 10.8921 8.29289 10.7046C8.10536 10.517 8 10.2627 8 9.99747V7.99747H6C5.73478 7.99747 5.48043 8.10282 5.29289 8.29036C5.10536 8.4779 5 8.73225 5 8.99747V18.9975C5 19.2627 5.10536 19.517 5.29289 19.7046C5.48043 19.8921 5.73478 19.9975 6 19.9975H18C18.2652 19.9975 18.5196 19.8921 18.7071 19.7046C18.8946 19.517 19 19.2627 19 18.9975V8.99747C19 8.73225 18.8946 8.4779 18.7071 8.29036C18.5196 8.10282 18.2652 7.99747 18 7.99747H16Z" fill="black"></path></svg>
</button>


<NuxtLink :to="`/content/preveiw${item?.children[0]?.id}`" class="btn btn-sm  icon-btn " >
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.99414C2 4.19849 2.31607 3.43543 2.87868 2.87282C3.44129 2.31021 4.20435 1.99414 5 1.99414H19C19.7956 1.99414 20.5587 2.31021 21.1213 2.87282C21.6839 3.43543 22 4.19849 22 4.99414V18.9941C22 19.7898 21.6839 20.5529 21.1213 21.1155C20.5587 21.6781 19.7956 21.9941 19 21.9941H5C4.20435 21.9941 3.44129 21.6781 2.87868 21.1155C2.31607 20.5529 2 19.7898 2 18.9941V4.99414ZM5 3.99414C4.73478 3.99414 4.48043 4.0995 4.29289 4.28703C4.10536 4.47457 4 4.72892 4 4.99414V9.99414H20V4.99414C20 4.72892 19.8946 4.47457 19.7071 4.28703C19.5196 4.0995 19.2652 3.99414 19 3.99414H5ZM4 11.9941V18.9941C4 19.2594 4.10536 19.5137 4.29289 19.7012C4.48043 19.8888 4.73478 19.9941 5 19.9941H19C19.2652 19.9941 19.5196 19.8888 19.7071 19.7012C19.8946 19.5137 20 19.2594 20 18.9941V11.9941H4ZM14 12.9941C14.2652 12.9942 14.5195 13.0996 14.707 13.2871L18.707 17.2871C18.8892 17.4757 18.99 17.7283 18.9877 17.9905C18.9854 18.2527 18.8802 18.5036 18.6948 18.689C18.5094 18.8744 18.2586 18.9795 17.9964 18.9818C17.7342 18.9841 17.4816 18.8833 17.293 18.7011L14 15.4081L11.707 17.7011L10.707 18.7011C10.5184 18.8833 10.2658 18.9841 10.0036 18.9818C9.7414 18.9795 9.49059 18.8744 9.30518 18.689C9.11977 18.5036 9.0146 18.2527 9.01233 17.9905C9.01005 17.7283 9.11084 17.4757 9.293 17.2871L9.586 16.9941L9 16.4081L6.707 18.7011C6.5184 18.8833 6.2658 18.9841 6.0036 18.9818C5.7414 18.9795 5.49059 18.8744 5.30518 18.689C5.11977 18.5036 5.0146 18.2527 5.01233 17.9905C5.01005 17.7283 5.11084 17.4757 5.293 17.2871L8.293 14.2871C8.48053 14.0997 8.73484 13.9944 9 13.9944C9.26516 13.9944 9.51947 14.0997 9.707 14.2871L11 15.5801L13.293 13.2871C13.4805 13.0996 13.7348 12.9942 14 12.9941ZM11 6.99414C11 6.72892 11.1054 6.47457 11.2929 6.28703C11.4804 6.0995 11.7348 5.99414 12 5.99414H17C17.2652 5.99414 17.5196 6.0995 17.7071 6.28703C17.8946 6.47457 18 6.72892 18 6.99414C18 7.25936 17.8946 7.51371 17.7071 7.70125C17.5196 7.88878 17.2652 7.99414 17 7.99414H12C11.7348 7.99414 11.4804 7.88878 11.2929 7.70125C11.1054 7.51371 11 7.25936 11 6.99414ZM7 8.74414C7.46413 8.74414 7.90925 8.55977 8.23744 8.23158C8.56563 7.90339 8.75 7.45827 8.75 6.99414C8.75 6.53001 8.56563 6.08489 8.23744 5.7567C7.90925 5.42852 7.46413 5.24414 7 5.24414C6.53587 5.24414 6.09075 5.42852 5.76256 5.7567C5.43437 6.08489 5.25 6.53001 5.25 6.99414C5.25 7.45827 5.43437 7.90339 5.76256 8.23158C6.09075 8.55977 6.53587 8.74414 7 8.74414Z" fill="black"/>
</svg>   
 </NuxtLink >



</div>
               </div>
           </div>

       </div>
       <div class="modal-cover flex justify-center items-center " v-if="modalInfo.showModal==true">
                      <div class="modal bg-white h-auto min-w-[40%] max-h-[80%] min-h-[300px] p-2 rounded">
                          <div class="modal-header p-4 relative">
                              <strong>به به ببین کی اینجاست!</strong>
                              <button class="absolute left-2 top-2 p-2 " @click="modalInfo.showModal=false">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29303 5.29301C5.48056 5.10553 5.73487 5.00022 6.00003 5.00022C6.26519 5.00022 6.5195 5.10553 6.70703 5.29301L12 10.586L17.293 5.29301C17.3853 5.19749 17.4956 5.12131 17.6176 5.0689C17.7396 5.01649 17.8709 4.98891 18.0036 4.98775C18.1364 4.9866 18.2681 5.0119 18.391 5.06218C18.5139 5.11246 18.6255 5.18672 18.7194 5.28061C18.8133 5.3745 18.8876 5.48615 18.9379 5.60905C18.9881 5.73195 19.0134 5.86363 19.0123 5.99641C19.0111 6.12919 18.9835 6.26041 18.9311 6.38241C18.8787 6.50441 18.8025 6.61476 18.707 6.707L13.414 12L18.707 17.293C18.8892 17.4816 18.99 17.7342 18.9877 17.9964C18.9854 18.2586 18.8803 18.5094 18.6948 18.6948C18.5094 18.8802 18.2586 18.9854 17.9964 18.9877C17.7342 18.99 17.4816 18.8892 17.293 18.707L12 13.414L6.70703 18.707C6.51843 18.8892 6.26583 18.99 6.00363 18.9877C5.74143 18.9854 5.49062 18.8802 5.30521 18.6948C5.1198 18.5094 5.01463 18.2586 5.01236 17.9964C5.01008 17.7342 5.11087 17.4816 5.29303 17.293L10.586 12L5.29303 6.707C5.10556 6.51948 5.00024 6.26517 5.00024 6C5.00024 5.73484 5.10556 5.48053 5.29303 5.29301Z" fill="black"/>
</svg>

                              </button>
                          </div>
                          <hr>
                          <div class="modal-body p-3 border">
                              <p>ادمین عزیز!

                                  <br>
                                  <br>
                                  
                                  <span class="bg-[#e7e7e7] px-2 py-1 ">{{modalInfo.name}}</span>
                                  نشون بدیم تو سایت ؟ تاییده؟

                              </p>
                              <div class="flex mt-4">
                                  <label class="border bg-[#e7e7e7] me-3 p-2 px-3 lg:w-1/2 cursor-pointer" for="no" @click="modalData.adminConfirm = false">
                                      <input id="no" type="radio" name="confirm">
                                     خیر مورد تایید نیست
                                  </label>
                                  <label class="border bg-[#e7e7e7] p-2 px-3 lg:w-1/2 cursor-pointer" for="yes"  @click="modalData.adminConfirm = true">
                                      <input id="yes" type="radio" name="confirm">
                                       مورد تایید است
                                  </label>
                              </div>
                              <hr class="my-3">
                              <p class="mt-3">تو چه تاریخی نمایشش بدیم ؟
</p>
                              <date-picker type="datetime" v-model="modalData.publishDate"  />

                          </div>
                          <div class="moda-footer flex mt-3">
                              <button class="border w-1/2 me-2 p-2 bg-[#713632] text-center text-white rounded" @click="modalInfo.showModal=false">انصراف </button>
                              
                              <button class="border w-1/2 p-2  bg-[#2563eb] text-center text-white rounded" @click="()=>{$emit('getConfirmData', modalData);modalInfo.showModal=false }">تایید </button>

                          </div>
                      </div>
      </div>
   </div>
</template>
<script setup>
import moment from "jalali-moment";
const props = defineProps({
  add: String,
  data: Object,
});
const modalInfo = ref({
  showModal: false,
  id: 0,
  name: "انتخاب نشده",
});
const modalData = ref({
  publishDate: "",
  id: null,
  adminConfirm: false,
});
const getItem = (id) => {
  navigateTo(`/content/insert${id}`);
};

onUpdated(() => {
  ;
  ;
});
const deleteItem = async (id) => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/post/post", {
      method: "DELETE",
      headers,
      query: {
        id: id,
      },
    });

    ;
  } catch (error) {
    ;
    ;
    // navigateTo("/login")
  }
};

const modalHandler = (id, name) => {
  modalInfo.value.showModal = true;
  modalData.value.id = id;
  modalInfo.value.name = name;
};

// const acceptModal = () =>{
// }
</script>
<style lang="scss" scoped>
.table-box {
  .table-title {
    padding-bottom: 15px;

    & > div {
      padding: 0 5px;
    }

    .btn {
      border: 1px solid #033057;
      border-radius: 5px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #033057;
    }
  }

  .table-function {
    & > div {
      padding: 0 5px;
    }

    .form-select {
      border: 1px solid #3333;
      border-radius: 5px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #fff;
    }

    .form-control {
      border: 1px solid #3333;
      border-radius: 5px;
      padding: 5px 10px;
      height: 40px;
      width: 100%;
      background: #fff;
    }

    .btn {
      background: #007d54;
      border-radius: 5px;
      padding: 5px 10px;
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
    }
  }

  .table-header {
    background-color: #033057;
    border-radius: 5px 5px 0 0;
    padding: 10px 5px;
    color: #fff;

    @media (max-width: 991px) {
      & {
        display: none;
      }
    }
  }

  .table-content {
    border: 1px solid #3333;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    padding: 5px;
    font-size: 90%;

    .icon-btn {
      border-left: 1px solid #3333;
      padding: 0 10px;
    }

    & > div {
      border-radius: 5px;
      align-items: center;
      padding: 10px 0;
      transition: 0.2s;
      border: 2px solid transparent;

      &:hover {
        border-color: #054232 !important;
      }

      @media (min-width: 991px) {
        .mobile-key {
          display: none;
        }
      }

      @media (max-width: 991px) {
        & {
          // background: linear-gradient(#d9d9d9 42px, white 41px);
          background-repeat: no-repeat;
          border: 1px solid #3333;
          margin-bottom: 5px;
          padding: 5px;

          & > div {
            margin-bottom: 5px;
          }

          button {
            background: #2563eb;
            padding: 10px !important;
            width: 100%;
            border-radius: 4px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;

            svg {
              path {
                fill: #fff;
              }
            }

            &:nth-child(2) {
              background: #713632;
            }
          }
        }
      }
    }

    & > div:nth-child(2n) {
      background-color: #f2f2f2;
    }
  }
}

.modal-cover {
  position: fixed;
  background: #00000077;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
