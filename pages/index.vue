<template>
    
    
  <main class="p-6 sm:p-10 space-y-6">
    
    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div class="mr-6">
        <h1 class="text-4xl font-semibold mb-2">{{$t('dashboard')}}</h1>
        <h2 class="text-gray-600 ml-0.5">{{projectName}}</h2>
      </div>
      
    </div>
    <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <span class="block text-xl font-bold">{{ $t('name') }}:</span>
          <span class="block text-gray-500">{{ user?.data?.firstName }}</span>
        </div>
      </div>
      <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <span class="block text-xl font-bold">{{ $t('lastname') }} :</span>
          <span class="block text-gray-500">{{ user?.data?.lastName }}</span>
        </div>
      </div>
      <div class="flex items-center p-8 bg-white shadow rounded-lg overflow-hidden">
        <!-- <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full ml-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </div> -->
        <div>
          <span class="inline-block text-xl font-bold">{{ $t('email')  }}:</span>
          <span class="block text-gray-500">{{ user?.data?.email }}</span>
        </div>
      </div>
       <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <NuxtLink to="/merchant">
          <span class="block text-2xl font-bold">درگاه ها</span>
          <span class="block text-gray-500">   ویرایش درگاه ها</span>
        </NuxtLink>
      </div>
      <!-- <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <div>
          <span class="block text-2xl font-bold">{{allPosts?.totalCount}}</span>
          <span class="block text-gray-500">{{ $t('totalNumberOfNews') }}</span>
        </div>
      </div> -->
      
    </section>
    <section class="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 ">
      
    
      <!-- <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <span class="block text-2xl font-bold">139</span>
          <span class="block text-gray-500">{{ $t('totalNumberOfBanners') }}</span>
        </div>
      </div> -->
      <div class="row-span-3  col-start-1 col-end-5 bg-white shadow rounded-lg">
        <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
          <span>گزارشات خلاصه
          </span>
          
          <!-- Refer here for full dropdown menu code: https://tailwindui.com/components/application-ui/elements/dropdowns -->
        </div>
        <div class="overflow-y-auto flex flex-wrap gap-4 p-4" style="max-height: 24rem;">
          <UCard class="w-max">

            <div class="flex gap-4">
              <span class="font-bold"> بازدید از فروشگاه</span>
              :
              <span class="">{{report.visitCount}}</span>
            </div>
            <div class="flex gap-4">
              <span class="font-bold">تعداد کل محصولات</span>
              :
              <span class="">{{report.product}}</span>
            </div>
            <div class="flex gap-4">
              <span class="font-bold">  بیشترین بازدید محصول </span>
              :
              <span class="">{{report.mostvisitname}}({{ report.mostvisit }})</span>
            </div>
            <div class="flex gap-4">
              <span class="font-bold">تعداد  سفارشات پرداخت شده امروز</span>
              :
              <span class="">{{report.report}}</span>
            </div>
          </UCard>
          
          <UCard class="w-max">

            <div class="flex gap-4">
              <span class="font-bold">تعداد کل مقالات</span>
              :
              <span class="">{{report.post}}</span>
            </div>
            <div class="flex gap-4">
              <span class="font-bold">  بیشترین بازدید مقاله </span>
              :
              <span class="max-w-[200px]">{{report.postmostvisit}}({{ report.postmostvisitname }})</span>
            </div>
          </UCard>
          <UCard class="w-max">

            <div class="flex gap-4">
              <span class="font-bold">تعداد کاربران</span>
              :
              <span class="">{{report.user}}</span>
            </div>
            <!-- <div class="flex gap-4">
              <span class="font-bold"> تعداد سرویسکاران</span>
              :
              <span class="max-w-[200px]">{{report.repairshop}}</span>
            </div>
            <div class="flex gap-4">
              <span class="font-bold"> تعداد اتحادیه ها</span>
              :
              <span class="max-w-[200px]">{{report.etehadie}}</span>
            </div> -->
            <!-- <div class="flex gap-4">
              <span class="font-bold"> تعداد نمایندگی ها</span>
              :
              <span class="max-w-[200px]">{{report.agency}}</span>
            </div> -->
          </UCard>
          </div>
      </div>
     
      <div class="flex flex-col row-span-3 bg-white shadow rounded-lg hidden">
        <div class="px-6 py-5 font-semibold border-b border-gray-100">Students by type of studying</div>
        <div class="p-4 flex-grow">
          <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
        </div>
      </div>
    </section>
    <section class="text-center font-semibold text-gray-500">
      <p>   {{ $t('developedwith') }}  &#9749; و &#127925; و &#128150;</p>
      <p>   {{ $t('behpardazan') }}  </p>
    </section>
  </main>

</template>

<script setup>
const {public:{showImageBaseUrl,projectName}} = useRuntimeConfig()

const { locale } = useI18n();
const user = ref()
const allPosts = ref()
onMounted(()=>{
pagePostLoader()
})



const defaultPostData = ref({
Publish: true,
Hashtags: "",
CategoryIds: null,
Active: true,
AdminConfirm: true,
Q: "",
PageIndex: 1,
PageSize: 10,
SortBy: 4,
})
const pagePostLoader = async (pageNumber) => {
try {
  const headers = useRequestHeaders(['cookie'])

  const data = await $fetch('/api/post/posts', {
    method: 'GET',
    headers,
    query: defaultPostData.value
  })


  allPosts.value = data


} catch (error) {

  ;
  // navigateTo("/login")
}

}

const report=ref({
  visitCount:0,
  product:0,
  mostvisit:0,
  mostvisitname:'',
  post:0,
  postmostvisit:0,
  postmostvisitname:'',
  user:0,
  repairshop:0,
  etehadie:0,
  agency:0,
  order:0
})

onMounted(async()=>{
  await getProductvisit()
await getProduct()
await getPost()
await getUser()
// await getrepairshop()
// await getetehadie()
await getorder()
// await getagency()
})
async function getProductvisit() {
try {
    let res=await $fetch('/api/product/productsvisit')
    report.value.visitCount=res

} catch (error) {
    
}
}
async function getProduct() {
try {
    let res=await $fetch('/api/product/products',{
        query:{
            pageSize:1,
            sortBy:4
        }
    })
    report.value.product=res?.totalCount
    report.value.mostvisit=res?.list[0]?.visitCount
    report.value.mostvisitname=res?.list[0]?.name
} catch (error) {
    
}
}
async function getPost() {
try {
    let res=await $fetch('/api/post/posts',{
        query:{
            pageSize:1,
            sortBy:4
        }
    })
    report.value.post=res?.totalCount
    report.value.postmostvisit=res?.list[0]?.visitCount
    report.value.postmostvisitname=res?.list[0]?.name
} catch (error) {
    
}
}
async function getUser() {
try {
    let res=await $fetch('/api/user/user',{
        query:{
            pageSize:1,
        }
    })
    report.value.user=res?.totalCount
    
} catch (error) {
    
}
}
// async function getrepairshop() {
// try {
//     let res=await $fetch('/api/repairshop/repairshops',{
//         query:{
//             pageSize:1,
//             guild:false
//         }
//     })
//     report.value.repairshop=res?.totalCount
    
// } catch (error) {
    
// }
// }
// async function getetehadie() {
// try {
//     let res=await $fetch('/api/repairshop/repairshops',{
//         query:{
//             pageSize:1,
//             guild:true
//         }
//     })
//     report.value.etehadie=res?.totalCount
    
// } catch (error) {
    
// }
// }
async function getagency() {
try {
    let res=await $fetch('/api/agency/agencys',{
        query:{
            pageSize:1,
            
        }
    })
    report.value.agency=res?.totalCount
    
} catch (error) {
    
}
}
async function getorder(){
  try {
    let date=new Date()
    let res =await $fetch('/api/orders/orders',{
        method:'GET',
        query:{
          pageSize:1,
          fromDate:date.toISOString().split("T")[0],
          toDate:date.toISOString().split("T")[0],
          isPaid:true
        }
      })
      report.value.order=res.totalCount
  } catch (error) {}
      
}

</script>
