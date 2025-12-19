<template lang="">
    <div class="table-box">
         <div class="table-title flex justify-between">
             <!-- <div class="lg:w-6/12">
                 <h1 class="h3 " v-if="props.data?.title">{{props.data?.title}}</h1>
                 <h1 class="h3 " >لیست</h1>
             </div> -->
             <div class="lg:w-2/12">
                 
                 <NuxtLink :to="props.add" class="btn add-item">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
 </svg>
 {{$t('addNewItem')}} 
             </NuxtLink>
             </div>
         </div>

         <hr>
                  
         <div class="table-header flex">
             <div class="lg:w-1/12 text-center">
                 <strong>{{$t('Row')}}</strong>
             </div>
             <div class="lg:w-2/12">
                 <strong>{{$t('title')}}</strong>
             </div>
             <div class="lg:w-1/12">
                 <strong> {{$t('id')}}</strong>
             </div>
             <div class="lg:w-1/12" v-if='isPost || isProduct'>
                 <strong> {{$t('Category')}}</strong>
             </div>
             <div class="lg:w-1/12">
                 <strong>{{$t('Condition')}}</strong>
             </div>
             <div class="lg:w-2/12 text-center" v-if="isProduct == true">
                 <strong>وضعیت محصول</strong>
             </div>
             <div class="lg:w-2/12 text-center" v-if='isPost'>
                 <strong>{{$t('date')}}</strong>
             </div>
             <!-- <div class="lg:w-2/12">
                 <strong>تگ</strong>
             </div> -->
             <div class="lg:w-1/12 text-center">
                 <strong>{{$t('theOperation')}}</strong>
             </div>
 
         </div>
         <div class="table-content ">
             <div v-for="(item,index) in props?.data?.list" class="flex flex-wrap" :key="item.id" :title="item?.summary">
                 <div class="lg:w-1/12 w-1/6 text-center">
                     <span>{{(props?.data.pageSize*( props?.data?.pageIndex - 1 )) + index + 1}}</span>
                 </div>
                 <div class="lg:w-2/12  w-5/6
                 ">
                     <span class="mobile-key">{{$t('Row')}}:</span>
                     <span>{{item?.name}}</span>
                 </div>
                 <div class="lg:w-1/12 w-1/2">
                     <span class="mobile-key">{{$t('id')}} :</span>
 
                     <span> {{item?.id}}</span>
                 </div>
                 <div class="lg:w-1/12 w-1/2" v-if='isPost || isProduct'>
                     <span class="mobile-key">{{$t('Category')}}</span>
 
                     <span> {{item?.categoryId}}</span>
                 </div>
                 <div class="lg:w-1/12 w-full" v-if="isPost == false">
                     <span class="mobile-key">{{$t('Condition')}}:</span>
 
                     <span class="text-green-700" v-if="item.active==true">
                   {{$t('Showing')}} </span>
                     <span class="text-red-700"  v-else> {{$t('Notdisplayable')}}</span>
                 </div>
                 <div class="lg:w-1/12 w-full" v-else>
                     <span class="mobile-key">{{$t('Condition')}}:</span>
 
                     <span class="text-green-700" v-if="item.adminConfirm==true">{{$t('approvedByTheManager')}}</span>
                     <span class="text-red-700"  v-else>{{$t('notConfirmed')}}</span>
                 </div>
                 <div class="lg:w-2/12 w-1/2 text-center" v-if="isProduct == true">
 
                     <span class="text-gray-500">
              
                      {{item?.status?.name}} </span>
                 </div>
                 <div class="lg:w-2/12 w-1/2 text-center" v-if='isPost'>
 
 <span class="text-gray-500">{{$t('loading')}}:</span>
 <br>
                       <span>{{ moment(item?.createDate).locale('fa').format('YYYY/MM/DD | HH:MM')}}</span>
                       <br>
 <strong>{{$t('release')}}:</strong>
 <br>
                      <span>{{ moment(item?.publishDate).locale('fa').format('YYYY/MM/DD | HH:MM')}}</span>
</div>
                 <!-- <div class="lg:w-2/12 flex w-1/2">
                    <span class="rounded border m-1 bg-white p-1 text-xs" v-for="tag in item?.hashtags">
                    {{tag?.name}}</span>
                 </div> -->
                 <div class="lg:w-3/12 flex flex-wrap w-full">
 
                     <button class="btn btn-sm  icon-btn rounded" title="ویرایش" @click="getItem(item?.id)">
 
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
   <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
 </svg>
 ویرایش
                     </button>
                     <button class="btn btn-sm  icon-btn rounded" title="حذف" @click="()=>{showDeleteModal = true ;elId=item?.id}">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
   <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
 </svg>
 حذف
                     </button>
                     <button class="btn btn-sm 
                      icon-btn " title="تایید بلاگ" 
                       v-if="isPost" @click="modalHandler(item?.id,item?.name)">
                        <svg data-v-b76ad084="" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" style="
    width: 20px;
    height: 20px;
"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M11 5.99747C10.7348 5.99747 10.4804 6.10282 10.2929 6.29036C10.1054 6.4779 10 6.73225 10 6.99747V8.99747H14V6.99747C14 6.73225 13.8946 6.4779 13.7071 6.29036C13.5196 6.10282 13.2652 5.99747 13 5.99747H11ZM15.83 5.99747C15.623 5.41239 15.2397 4.90589 14.7329 4.54771C14.226 4.18953 13.6206 3.99729 13 3.99747H11C10.3794 3.99729 9.77397 4.18953 9.26715 4.54771C8.76032 4.90589 8.37701 5.41239 8.17 5.99747H6C5.20435 5.99747 4.44129 6.31354 3.87868 6.87615C3.31607 7.43876 3 8.20182 3 8.99747V18.9975C3 19.7931 3.31607 20.5562 3.87868 21.1188C4.44129 21.6814 5.20435 21.9975 6 21.9975H18C18.7956 21.9975 19.5587 21.6814 20.1213 21.1188C20.6839 20.5562 21 19.7931 21 18.9975V8.99747C21 8.20182 20.6839 7.43876 20.1213 6.87615C19.5587 6.31354 18.7956 5.99747 18 5.99747H15.83ZM16 7.99747V9.99747C16 10.2627 15.8946 10.517 15.7071 10.7046C15.5196 10.8921 15.2652 10.9975 15 10.9975H9C8.73478 10.9975 8.48043 10.8921 8.29289 10.7046C8.10536 10.517 8 10.2627 8 9.99747V7.99747H6C5.73478 7.99747 5.48043 8.10282 5.29289 8.29036C5.10536 8.4779 5 8.73225 5 8.99747V18.9975C5 19.2627 5.10536 19.517 5.29289 19.7046C5.48043 19.8921 5.73478 19.9975 6 19.9975H18C18.2652 19.9975 18.5196 19.8921 18.7071 19.7046C18.8946 19.517 19 19.2627 19 18.9975V8.99747C19 8.73225 18.8946 8.4779 18.7071 8.29036C18.5196 8.10282 18.2652 7.99747 18 7.99747H16Z" fill="black"></path></svg>
                     
                     تاییدیه
                    </button>

                     <!-- <button class="btn btn-sm  icon-btn " title="افزودن محصول کاربردی" v-if="isProduct==true" @click="file(item?.id)">
                            <svg data-v-b76ad084="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 15px;height: 15px;"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 4.20435 1.31607 3.44129 1.87868 2.87868C2.44129 2.31607 3.20435 2 4 2H8.558C9.18777 1.99978 9.80164 2.19775 10.3126 2.56587C10.8236 2.93398 11.2058 3.45357 11.405 4.051L11.72 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V9.01C22.2749 9.03731 22.5412 9.12128 22.782 9.25661C23.0228 9.39194 23.233 9.57569 23.3993 9.79629C23.5656 10.0169 23.6844 10.2695 23.7482 10.5383C23.812 10.8071 23.8194 11.0862 23.77 11.358L22.133 20.358C22.0492 20.8188 21.8062 21.2356 21.4466 21.5357C21.0869 21.8357 20.6334 22.0001 20.165 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V5ZM20 9V7H11.72C11.3002 6.99989 10.8912 6.86771 10.5507 6.62219C10.2102 6.37667 9.95564 6.03025 9.823 5.632L9.507 4.684C9.44065 4.48479 9.31328 4.31153 9.14295 4.18876C8.97262 4.06599 8.76796 3.99995 8.558 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V12.27L3.354 10.588C3.44853 10.139 3.69459 9.7361 4.0509 9.44697C4.40722 9.15784 4.85213 9.00002 5.311 9H20ZM3.366 20C3.41899 19.9086 3.45713 19.8094 3.479 19.706L5.31 11H21.801L20.164 20H3.366Z" fill="black"></path></svg>
                        محصولات مرتبط
                          </button> -->
                          <!-- <nuxt-link :to="'/product/complementaryProducts'+item.id" v-if="isProduct==true" >
                            <button class="btn btn-sm  icon-btn " title="افزودن محصول کاربردی" >
                              <svg data-v-b76ad084="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 15px;height: 15px;"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 4.20435 1.31607 3.44129 1.87868 2.87868C2.44129 2.31607 3.20435 2 4 2H8.558C9.18777 1.99978 9.80164 2.19775 10.3126 2.56587C10.8236 2.93398 11.2058 3.45357 11.405 4.051L11.72 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V9.01C22.2749 9.03731 22.5412 9.12128 22.782 9.25661C23.0228 9.39194 23.233 9.57569 23.3993 9.79629C23.5656 10.0169 23.6844 10.2695 23.7482 10.5383C23.812 10.8071 23.8194 11.0862 23.77 11.358L22.133 20.358C22.0492 20.8188 21.8062 21.2356 21.4466 21.5357C21.0869 21.8357 20.6334 22.0001 20.165 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V5ZM20 9V7H11.72C11.3002 6.99989 10.8912 6.86771 10.5507 6.62219C10.2102 6.37667 9.95564 6.03025 9.823 5.632L9.507 4.684C9.44065 4.48479 9.31328 4.31153 9.14295 4.18876C8.97262 4.06599 8.76796 3.99995 8.558 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V12.27L3.354 10.588C3.44853 10.139 3.69459 9.7361 4.0509 9.44697C4.40722 9.15784 4.85213 9.00002 5.311 9H20ZM3.366 20C3.41899 19.9086 3.45713 19.8094 3.479 19.706L5.31 11H21.801L20.164 20H3.366Z" fill="black"></path></svg>
                        محصولات تکمیل کننده
                      </button>
                    </nuxt-link> -->
                    <!-- <NuxtLink :to="'/productitem/productItem'+item?.id+'?isAll='+false" title="" v-if="isProduct==true" class="btn btn-sm icon-btn">
                      <svg data-v-b76ad084="" data-v-51213749="" width="25" height="24" viewBox="0 0 25 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;"><path data-v-b76ad084=""
                        data-v-51213749="" fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.19967 2.56592C7.92367 3.05189 7.67367 3.65386 7.43567 4.36583C5.59767 9.34258 2.75467 16.6232 1.38167 20.119C0.75867 21.706 2.27667 23.2949 3.89167 22.7459C7.40767 21.547 14.6817 19.0861 19.6547 17.5182L19.6697 17.5142C20.3837 17.2762 20.9857 17.0322 21.4697 16.7642C21.9467 16.4972 22.3747 16.1692 22.6627 15.7343C23.3187 14.7403 22.9547 13.6994 22.5207 12.8944C19.7907 7.83466 16.3777 4.27783 12.1167 1.56997C11.7097 1.31198 11.2537 1.09199 10.7617 1.02299C10.2329 0.943644 9.69357 1.06492 9.24967 1.36298C8.81267 1.65196 8.47667 2.08094 8.19967 2.56592ZM15.1107 9.09159C13.5307 7.40468 11.8087 5.97875 9.57467 4.33183C9.70167 4.01484 9.82267 3.75886 9.93867 3.55487C10.1307 3.21688 10.2767 3.08089 10.3527 3.03089C10.3987 3.0009 10.4227 2.9949 10.4827 3.0029C10.5777 3.01689 10.7557 3.07489 11.0437 3.25788C15.0137 5.77976 18.1907 9.08059 20.7607 13.8444C21.1187 14.5073 21.0027 14.6223 20.9937 14.6313V14.6323C20.9517 14.6953 20.8287 14.8303 20.4957 15.0163C20.3057 15.1223 20.0687 15.2323 19.7757 15.3493C18.1167 12.7124 16.6967 10.7835 15.1107 9.09159ZM13.6507 10.4585C15.0407 11.9405 16.3177 13.6444 17.8217 16.0022C12.9207 17.5712 6.48167 19.7501 3.24567 20.852H3.24367V20.85C4.50667 17.6342 7.02267 11.1925 8.85467 6.28873C10.8077 7.74966 12.2937 9.0096 13.6517 10.4585H13.6507ZM10.0197 12.9994C10.5501 12.9994 11.0588 12.7887 11.4339 12.4136C11.809 12.0386 12.0197 11.5299 12.0197 10.9995C12.0197 10.4691 11.809 9.96041 11.4339 9.58535C11.0588 9.2103 10.5501 8.9996 10.0197 8.9996C9.48924 8.9996 8.98053 9.2103 8.60546 9.58535C8.23038 9.96041 8.01967 10.4691 8.01967 10.9995C8.01967 11.5299 8.23038 12.0386 8.60546 12.4136C8.98053 12.7887 9.48924 12.9994 10.0197 12.9994ZM10.0197 15.9992C10.0197 16.5297 9.80896 17.0383 9.43388 17.4134C9.05881 17.7884 8.5501 17.9991 8.01967 17.9991C7.48924 17.9991 6.98053 17.7884 6.60546 17.4134C6.23038 17.0383 6.01967 16.5297 6.01967 15.9992C6.01967 15.4688 6.23038 14.9602 6.60546 14.5851C6.98053 14.2101 7.48924 13.9993 8.01967 13.9993C8.5501 13.9993 9.05881 14.2101 9.43388 14.5851C9.80896 14.9602 10.0197 15.4688 10.0197 15.9992ZM13.0197 16.9992C13.5501 16.9992 14.0588 16.7885 14.4339 16.4134C14.809 16.0384 15.0197 15.5297 15.0197 14.9993C15.0197 14.4689 14.809 13.9602 14.4339 13.5852C14.0588 13.2101 13.5501 12.9994 13.0197 12.9994C12.4892 12.9994 11.9805 13.2101 11.6055 13.5852C11.2304 13.9602 11.0197 14.4689 11.0197 14.9993C11.0197 15.5297 11.2304 16.0384 11.6055 16.4134C11.9805 16.7885 12.4892 16.9992 13.0197 16.9992Z" fill="black"></path></svg>
                    
                  آیتم های محصول تکی
                      </NuxtLink> -->
                      <NuxtLink :to="'/productitem/productItem'+item?.id+'?isAll='+true" title="" v-if="isProduct==true" class="btn btn-sm icon-btn">
                      <svg data-v-b76ad084="" data-v-51213749="" width="25" height="24" viewBox="0 0 25 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;"><path data-v-b76ad084=""
                        data-v-51213749="" fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.19967 2.56592C7.92367 3.05189 7.67367 3.65386 7.43567 4.36583C5.59767 9.34258 2.75467 16.6232 1.38167 20.119C0.75867 21.706 2.27667 23.2949 3.89167 22.7459C7.40767 21.547 14.6817 19.0861 19.6547 17.5182L19.6697 17.5142C20.3837 17.2762 20.9857 17.0322 21.4697 16.7642C21.9467 16.4972 22.3747 16.1692 22.6627 15.7343C23.3187 14.7403 22.9547 13.6994 22.5207 12.8944C19.7907 7.83466 16.3777 4.27783 12.1167 1.56997C11.7097 1.31198 11.2537 1.09199 10.7617 1.02299C10.2329 0.943644 9.69357 1.06492 9.24967 1.36298C8.81267 1.65196 8.47667 2.08094 8.19967 2.56592ZM15.1107 9.09159C13.5307 7.40468 11.8087 5.97875 9.57467 4.33183C9.70167 4.01484 9.82267 3.75886 9.93867 3.55487C10.1307 3.21688 10.2767 3.08089 10.3527 3.03089C10.3987 3.0009 10.4227 2.9949 10.4827 3.0029C10.5777 3.01689 10.7557 3.07489 11.0437 3.25788C15.0137 5.77976 18.1907 9.08059 20.7607 13.8444C21.1187 14.5073 21.0027 14.6223 20.9937 14.6313V14.6323C20.9517 14.6953 20.8287 14.8303 20.4957 15.0163C20.3057 15.1223 20.0687 15.2323 19.7757 15.3493C18.1167 12.7124 16.6967 10.7835 15.1107 9.09159ZM13.6507 10.4585C15.0407 11.9405 16.3177 13.6444 17.8217 16.0022C12.9207 17.5712 6.48167 19.7501 3.24567 20.852H3.24367V20.85C4.50667 17.6342 7.02267 11.1925 8.85467 6.28873C10.8077 7.74966 12.2937 9.0096 13.6517 10.4585H13.6507ZM10.0197 12.9994C10.5501 12.9994 11.0588 12.7887 11.4339 12.4136C11.809 12.0386 12.0197 11.5299 12.0197 10.9995C12.0197 10.4691 11.809 9.96041 11.4339 9.58535C11.0588 9.2103 10.5501 8.9996 10.0197 8.9996C9.48924 8.9996 8.98053 9.2103 8.60546 9.58535C8.23038 9.96041 8.01967 10.4691 8.01967 10.9995C8.01967 11.5299 8.23038 12.0386 8.60546 12.4136C8.98053 12.7887 9.48924 12.9994 10.0197 12.9994ZM10.0197 15.9992C10.0197 16.5297 9.80896 17.0383 9.43388 17.4134C9.05881 17.7884 8.5501 17.9991 8.01967 17.9991C7.48924 17.9991 6.98053 17.7884 6.60546 17.4134C6.23038 17.0383 6.01967 16.5297 6.01967 15.9992C6.01967 15.4688 6.23038 14.9602 6.60546 14.5851C6.98053 14.2101 7.48924 13.9993 8.01967 13.9993C8.5501 13.9993 9.05881 14.2101 9.43388 14.5851C9.80896 14.9602 10.0197 15.4688 10.0197 15.9992ZM13.0197 16.9992C13.5501 16.9992 14.0588 16.7885 14.4339 16.4134C14.809 16.0384 15.0197 15.5297 15.0197 14.9993C15.0197 14.4689 14.809 13.9602 14.4339 13.5852C14.0588 13.2101 13.5501 12.9994 13.0197 12.9994C12.4892 12.9994 11.9805 13.2101 11.6055 13.5852C11.2304 13.9602 11.0197 14.4689 11.0197 14.9993C11.0197 15.5297 11.2304 16.0384 11.6055 16.4134C11.9805 16.7885 12.4892 16.9992 13.0197 16.9992Z" fill="black"></path></svg>
                آیتم های محصول 
                      </NuxtLink>
                      <NuxtLink :to="'/product/editVarity'+item?.id" title="" v-if="isProduct==true" class="btn btn-sm icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
              ویرایش تنوع محصول
                      </NuxtLink>
                    <NuxtLink :to="`/product/otherImage`+item?.id" 
                    title="" v-if="isProduct==true" class="btn btn-sm icon-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5m10.5-11.25h.008v.008h-.008zm.375 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0"/></svg>
                      سایر عکس ها
                  </NuxtLink>
                 
                  

              <NuxtLink v-if="isProduct==true" class="btn btn-sm icon-btn"   :to="'/discount/insertnew?typeId=43&productId='+item?.id" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#333" d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"/><path fill="#333" d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"/><circle cx="7.25" cy="4.25" r="1.25" fill="currentColor"/></svg>
             افزودن تخفیف
              </NuxtLink>
              <NuxtLink v-if="isProduct==true" class="btn btn-sm icon-btn"   :to="'/discount?productId='+item?.id+'&isAvailable='+true" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#333" d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"/><path fill="#333" d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"/><circle cx="7.25" cy="4.25" r="1.25" fill="currentColor"/></svg>
              تخفیف
              </NuxtLink>
              <NuxtLink v-if="isPost == false && isProduct==false" class="btn btn-sm icon-btn"   :to="'/discount/insertnew?typeId=42&brandId='+item?.id" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#333" d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"/><path fill="#333" d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"/><circle cx="7.25" cy="4.25" r="1.25" fill="currentColor"/></svg>
                افزودن تخفیف
              </NuxtLink>
              <NuxtLink v-if="isPost == false && isProduct==false" class="btn btn-sm icon-btn"   :to="'/discount?BrandId='+item?.id+'&isAvailable='+true" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#333" d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"/><path fill="#333" d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"/><circle cx="7.25" cy="4.25" r="1.25" fill="currentColor"/></svg>
                 تخفیف
              </NuxtLink>
              <NuxtLink v-if="isPost != true & isProduct != true" :to="'/categoryBrand?id='+item?.id+'&name='+item?.name" 
                     title=" دسته بندی های مرتبط " 
                     
                      class="btn btn-sm icon-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
  <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg>          دسته بندی
  
    </NuxtLink>
                     <nuxt-link 
                     :to="`/productFeature?catId=${item?.categoryId}&prId=${item?.id}`" v-if="isProduct==true" class="btn btn-sm icon-btn" title="افزودن فیلد اختصاصی">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.49994 20.4999C4.32994 21.3299 5.66994 21.3299 6.49994 20.4999L19.4999 7.49994C20.3299 6.66994 20.3299 5.32994 19.4999 4.49994C18.6699 3.66994 17.3299 3.66994 16.4999 4.49994L3.49994 17.4999C2.66994 18.3299 2.66994 19.6699 3.49994 20.4999Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.0098 8.99023L15.0098 5.99023" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
 فیلد های اختصاصی 
                     </nuxt-link>
                     <!-- <NuxtLink v-if="isPost" :to="'/post/service'+item?.id" 
                     title="انتخاب محصول مرتبط با بلاگ" 
                     
                      class="btn btn-sm icon-btn">
  <svg data-v-b76ad084="" data-v-51213749="" width="25" height="24" viewBox="0 0 25 24" fill="none"
   xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;"><path data-v-b76ad084=""
    data-v-51213749="" fill-rule="evenodd" clip-rule="evenodd"
     d="M8.19967 2.56592C7.92367 3.05189 7.67367 3.65386 7.43567 4.36583C5.59767 9.34258 2.75467 16.6232 1.38167 20.119C0.75867 21.706 2.27667 23.2949 3.89167 22.7459C7.40767 21.547 14.6817 19.0861 19.6547 17.5182L19.6697 17.5142C20.3837 17.2762 20.9857 17.0322 21.4697 16.7642C21.9467 16.4972 22.3747 16.1692 22.6627 15.7343C23.3187 14.7403 22.9547 13.6994 22.5207 12.8944C19.7907 7.83466 16.3777 4.27783 12.1167 1.56997C11.7097 1.31198 11.2537 1.09199 10.7617 1.02299C10.2329 0.943644 9.69357 1.06492 9.24967 1.36298C8.81267 1.65196 8.47667 2.08094 8.19967 2.56592ZM15.1107 9.09159C13.5307 7.40468 11.8087 5.97875 9.57467 4.33183C9.70167 4.01484 9.82267 3.75886 9.93867 3.55487C10.1307 3.21688 10.2767 3.08089 10.3527 3.03089C10.3987 3.0009 10.4227 2.9949 10.4827 3.0029C10.5777 3.01689 10.7557 3.07489 11.0437 3.25788C15.0137 5.77976 18.1907 9.08059 20.7607 13.8444C21.1187 14.5073 21.0027 14.6223 20.9937 14.6313V14.6323C20.9517 14.6953 20.8287 14.8303 20.4957 15.0163C20.3057 15.1223 20.0687 15.2323 19.7757 15.3493C18.1167 12.7124 16.6967 10.7835 15.1107 9.09159ZM13.6507 10.4585C15.0407 11.9405 16.3177 13.6444 17.8217 16.0022C12.9207 17.5712 6.48167 19.7501 3.24567 20.852H3.24367V20.85C4.50667 17.6342 7.02267 11.1925 8.85467 6.28873C10.8077 7.74966 12.2937 9.0096 13.6517 10.4585H13.6507ZM10.0197 12.9994C10.5501 12.9994 11.0588 12.7887 11.4339 12.4136C11.809 12.0386 12.0197 11.5299 12.0197 10.9995C12.0197 10.4691 11.809 9.96041 11.4339 9.58535C11.0588 9.2103 10.5501 8.9996 10.0197 8.9996C9.48924 8.9996 8.98053 9.2103 8.60546 9.58535C8.23038 9.96041 8.01967 10.4691 8.01967 10.9995C8.01967 11.5299 8.23038 12.0386 8.60546 12.4136C8.98053 12.7887 9.48924 12.9994 10.0197 12.9994ZM10.0197 15.9992C10.0197 16.5297 9.80896 17.0383 9.43388 17.4134C9.05881 17.7884 8.5501 17.9991 8.01967 17.9991C7.48924 17.9991 6.98053 17.7884 6.60546 17.4134C6.23038 17.0383 6.01967 16.5297 6.01967 15.9992C6.01967 15.4688 6.23038 14.9602 6.60546 14.5851C6.98053 14.2101 7.48924 13.9993 8.01967 13.9993C8.5501 13.9993 9.05881 14.2101 9.43388 14.5851C9.80896 14.9602 10.0197 15.4688 10.0197 15.9992ZM13.0197 16.9992C13.5501 16.9992 14.0588 16.7885 14.4339 16.4134C14.809 16.0384 15.0197 15.5297 15.0197 14.9993C15.0197 14.4689 14.809 13.9602 14.4339 13.5852C14.0588 13.2101 13.5501 12.9994 13.0197 12.9994C12.4892 12.9994 11.9805 13.2101 11.6055 13.5852C11.2304 13.9602 11.0197 14.4689 11.0197 14.9993C11.0197 15.5297 11.2304 16.0384 11.6055 16.4134C11.9805 16.7885 12.4892 16.9992 13.0197 16.9992Z" fill="black"></path></svg>
    </NuxtLink> -->
                 </div>
             </div>
 
         </div>
         <ModalDelete v-if="showDeleteModal" @closeModal="()=>{showDeleteModal=false}" @haneler="()=>{deleteItem(elId);$emit('getReload');showDeleteModal=false;}" />
         <div class="modal-cover flex justify-center items-center " v-if="modalInfo.showModal==true">
                        <div class="modal bg-white h-auto min-w-[40%] max-h-[80%] min-h-[300px] p-2 rounded">
                            <div class="modal-header p-4 relative flex justify-between">
                                <strong>{{$t('Lookwhoishere')}}</strong>
                                <button class="  " @click="modalInfo.showModal=false">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29303 5.29301C5.48056 5.10553 5.73487 5.00022 6.00003 5.00022C6.26519 5.00022 6.5195 5.10553 6.70703 5.29301L12 10.586L17.293 5.29301C17.3853 5.19749 17.4956 5.12131 17.6176 5.0689C17.7396 5.01649 17.8709 4.98891 18.0036 4.98775C18.1364 4.9866 18.2681 5.0119 18.391 5.06218C18.5139 5.11246 18.6255 5.18672 18.7194 5.28061C18.8133 5.3745 18.8876 5.48615 18.9379 5.60905C18.9881 5.73195 19.0134 5.86363 19.0123 5.99641C19.0111 6.12919 18.9835 6.26041 18.9311 6.38241C18.8787 6.50441 18.8025 6.61476 18.707 6.707L13.414 12L18.707 17.293C18.8892 17.4816 18.99 17.7342 18.9877 17.9964C18.9854 18.2586 18.8803 18.5094 18.6948 18.6948C18.5094 18.8802 18.2586 18.9854 17.9964 18.9877C17.7342 18.99 17.4816 18.8892 17.293 18.707L12 13.414L6.70703 18.707C6.51843 18.8892 6.26583 18.99 6.00363 18.9877C5.74143 18.9854 5.49062 18.8802 5.30521 18.6948C5.1198 18.5094 5.01463 18.2586 5.01236 17.9964C5.01008 17.7342 5.11087 17.4816 5.29303 17.293L10.586 12L5.29303 6.707C5.10556 6.51948 5.00024 6.26517 5.00024 6C5.00024 5.73484 5.10556 5.48053 5.29303 5.29301Z" fill="black"/>
</svg>

                                </button>
                            </div>
                            <hr>
                            <div class="modal-body p-3 border">
                                <p> {{$t('Dearadmin')}} !

                                    <br>
                                    <br>
                                    
                                    <span class="bg-[#e7e7e7] px-2 py-1 ">{{modalInfo.name}}</span>
                                   {{$t('ShowitonthesiteConfirmation')}}

                                </p>
                                <div class="flex mt-4">
                                    <label class="border bg-[#e7e7e7] me-3 p-2 px-3 lg:w-1/2 cursor-pointer" for="no" @click="modalData.adminConfirm = false">
                                        <input id="no" type="radio" name="confirm">
                                     {{$t('no')}}
                                    </label>
                                    <label class="border bg-[#e7e7e7] p-2 px-3 lg:w-1/2 cursor-pointer" for="yes"  @click="modalData.adminConfirm = true">
                                        <input id="yes" type="radio" name="confirm">
                                        {{$t('yes')}}
                                    </label>
                                </div>
                                <hr class="my-3">
                                <p class="mt-3"> {{$t('Whatdateshouldweshow')}}    

</p>
                                <date-picker locale='fa' type="datetime" v-model="modalData.publishDate"  />

                            </div>
                            <div class="moda-footer flex mt-3">
                                <button class="border w-1/2 me-2 p-2 bg-[#713632] text-center text-white rounded" @click="modalInfo.showModal=false"> انصراف </button>
                                
                                <button class="border w-1/2 p-2  bg-[#2563eb] text-center text-white rounded" @click="ConfirmData" > {{$t('confirm')}}</button>

                            </div>
                        </div>
        </div>
     </div>
 </template>
<script setup>
const toast=useToast()
import moment from 'jalali-moment'
const showDeleteModal = ref(false)
const elId = ref();
const props = defineProps({
  add: String,
  data: Object,
  type: String
});
const emit = defineEmits(['getConfirmData'])
const modalInfo = ref({
  showModal: false,
  id: 0,
  name: "انتخاب نشده"
})
const modalData = ref({
  publishDate: "",
  id: null,
  adminConfirm: false
});
const getItem = (id) => {
  if (isProduct.value == true) {
    navigateTo(`/product/insert${id}`);

  } else if (isPost.value == true) {
    navigateTo(`/post/insert${id}`);

  } else {
    navigateTo(`/brand/insert${id}`);
  }
};

const file = (id) => {
  navigateTo(`/product/productRelate${id}`);

}

const addresses = ref({
  product: '/api/product/products',
  post: '/api/post/post',
  brand: '/api/brand/brand'
})
const isProduct = ref(false)
const isPost = ref(false)

onMounted(() => {
  if (props.type == "product") {
    isProduct.value = true
  } else if (props.type == "post") {
    isPost.value = true
  }

})
function ConfirmData(){
  if(modalData.value.publishDate.length>0){
  emit('getConfirmData', modalData.value)
  modalInfo.value.showModal=false 
}else{
    toast.add({description:"تاریخ را وارد کنید",color:'red'})
  }
}
onUpdated(() => {
  // ;
  // 


  // ;
  // ;
  // ;
  //  ? addresses?.value?.product:addresses?.value?.post);
});
const deleteItem = async (id) => {
  ;
  
  if (isProduct.value == true) {
    try {
      const headers = useRequestHeaders(["cookie"]);

      const data = await $fetch(addresses?.value?.product, {
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
  } else if (isPost.value == true) {
    try {
      const headers = useRequestHeaders(["cookie"]);

      const data = await $fetch(addresses?.value?.post, {
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

    }
  } else {
    try {
      const headers = useRequestHeaders(["cookie"]);

      const data = await $fetch(addresses?.value?.brand, {
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

    }
  }


};

const modalHandler = (id, name) => {
  modalInfo.value.showModal = true
  modalData.value.id = id
  modalInfo.value.name = name
}

// const acceptModal = () =>{
// }

</script>
<style lang="scss" scoped>
.table-box {
  .table-title {
    padding-bottom: 15px;

    &>div {
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
    &>div {
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
      // border-left: 1px solid #3333;
      padding: 0 10px;
    }

    &>div {
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

          &>div {
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

    &>div:nth-child(2n) {
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

  .btn{
    border: 1px solid #3333;
    margin: 2px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: #f1f1f1;

    svg{
      width: 15px;
      height: 15px;
      margin-left: 2px;
    }
  }


</style>
 