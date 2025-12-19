<template>
<div>
    <div class="order-list">
        <strong>سفارش {{ route.params.id }} </strong>
        <hr class="my-2">
        <div class="flex flex-wrap">

            <div class="w-full  h-full p-1 " v-for="item in orderItemData?.list" :key="item" :title="item">
                <div class="bg-white   relative rounded p-2 border flex flex-col justify-start items-center min-h-[100px] item-box">

                    <strong class="text-[18px]">{{ item?.product?.name }}</strong>
                    <!-- <hr class="my-2">
                <img class="w-full h-[200px] object-contain" :src="showImageBaseUrl+item?.product?.picture?.url" /> -->
                    <ul class="w-full">

                        <li>
                            <strong>قیمت : {{ item?.price?.toLocaleString() }} تومان</strong>
                        </li>
                        <li>
                            <strong>قیمت پایه : {{ item?.basePrice?.toLocaleString() }} تومان</strong>
                        </li>
                        <li>
                            <strong class="text-red-600" v-if="item?.discountPrice > 0"> تخفیف : {{ item?.discountPrice?.toLocaleString() }} تومان</strong>
                            <strong v-else>تخفیف : -</strong>
                        </li>
                        <!-- <li>
                <strong>base Price: {{ item?.basePrice }}</strong>
               </li> -->

                        <li>
                            <strong> فروشگاه : {{ item?.store?.name }}</strong>
                        </li>
                        <li>
                            <strong> توضیحات : {{ item?.description }}</strong>
                        </li>
                        <li class="rounded absolute top-1 left-1 text-red-500 bg-red-100 p-1 w-max" v-if="item?.deleted">
                            <strong> غیر فعال </strong>
                        </li>
                        <li v-else class="rounded absolute top-1 left-1  text-green-600 bg-green-100 w-max p-1">
                            <strong> فعال </strong>
                        </li>
                        <li class="flex justify-end mt-2">
                        <div class=" cursor-pointer bg-green-600 text-[#fff] w-max p-1 rounded" @click="()=>{modal.openModal();currentProductItem=item?.productOrderItems}">
                            جزییات
                        </div>
                        <div class=" ms-1 cursor-pointer bg-orange-400 text-[#fff] w-max p-1 rounded" @click="()=>{modalPut.openModal();currentOrderItem=item;modal.closeModal()}">
                            ویرایش
                        </div>

                        </li>

                    </ul>

                    <br>

                </div>
            </div>
            <Modal ref="modal">
                <template v-slot:header>
                    محصولات سفارش داده شده این فروشگاه
                </template>
                <template v-slot:body>
                    <div>
                        <!-- {{ currentProductItem }} -->
                        <div class=" w-full p-2">
                            <div class="hidden   rounded border  lg:flex info-line p-1 items-center justify-between">
                                <div class="w-3/12">
                                    <strong> محصول </strong>
                                </div>
                                <div class="w-1/12">
                                    <strong> تعداد</strong>
                                </div>
                                <div class="w-2/12">
                                    <strong> قیمت </strong>
                                </div>
                                <div class="w-3/12">
                                    <strong> قیمت پایه </strong>
                                </div>
                                <div class="w-1/12">
                                    <strong> تخفیف </strong>
                                </div>
                                <!-- <div class="w-1/12">
                <strong> قیمت </strong>
              </div> -->

                            </div>
                            <div class="border-b flex text-sm [&>div]:p-1 text-balance flex-wrap justify-between" v-for="(item, index) in currentProductItem" :key="index">
                                <div class="p-0 w-full lg:w-3/12 flex   lg:items-center">
                                    <strong class="lg:hidden mx-2">محصول: </strong>
                                    <p>
                                        {{ item?.productItem?.product?.name }} ({{ item?.productItem?.varietyItem?.name	 }} )
                                    </p>
                                </div>
                                <div class=" p-0 w-full lg:w-1/12 flex  lg:items-center ">
                                    <strong class="lg:hidden mx-2"> تعداد : </strong>
                                    <div class="flex items-center justify-center ">
                                        <p>
                                            {{ item?.count }}
                                        </p>
                                    </div>
                                </div>
                                <div class="p-0 w-full lg:w-2/12 flex   lg:items-center">
                                    <strong class="lg:hidden mx-2">قیمت: </strong>
                                    <span> {{ item?.price?.toLocaleString() }} تومان</span>
                                </div>
                                <div class=" p-0 w-full lg:w-3/12 flex   lg:items-center">
                                    <strong class="lg:hidden mx-2">قیمت پایه: </strong>
                                    <span> {{ item?.basePrice?.toLocaleString() }} تومان</span>
                                </div>
                                <div class="p-0 w-full lg:w-1/12 flex   lg:items-center">
                                    <strong class="lg:hidden mx-2">تخفیف: </strong>
                                    <span v-if="item?.discountPrice > 0"> {{ item?.discountPrice?.toLocaleString() }}تومان <span class=" text-red-600">({{item?.discountPercent}} %)</span> </span>
                                    <span v-else> - </span>
                                </div>
                                <!-- <div
              class="p-0 w-full lg:w-1/12 flex  lg:items-center"
            >
              <strong class="lg:hidden mx-2">قیمت: </strong>
              <span> {{ (item.maxPrice || 0 ).toLocaleString() }} - {{ (item.minPrice || 0 ).toLocaleString() }} تومان </span>
            </div> -->

                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <button class=" p-1 bg-red-500 text-[#fff] rounded" @click="modal.closeModal">بستن</button>

                </template>
            </Modal>
            <Modal ref="modalPut">
                <template v-slot:header>
                    ویرایش
                </template>
                <template v-slot:body>
                    <div class="flex flex-wrap">
                        <div class=" lg:w-2/3 flex flex-col">
                            <!-- {{ currentOrderItem.description }} -->

                            <label for="">توضیحات</label>

                            <textarea class="border w-full rounded p-1.5 mt-1" type="text" name="" id="" placeholder="توضیحات ...." v-model="currentOrderItem.description"></textarea>
                        </div>
                        <div class="flex lg:w-1/3  items-center ps-3">
                            <!-- {{ currentOrderItem.deleted }} -->
                            <label for="del">حذف محصولات این فروشنده از سفارش</label>
                            <input type="checkbox" name="" id="del" class="ms-2" v-model="currentOrderItem.deleted">
                        </div>

                    </div>
                </template>
                <template v-slot:footer>
                    <button class="w-[100px] p-1 bg-green-500 text-[#fff] rounded" @click="confirmInfo">ثبت</button>

                </template>
            </Modal>
            <!-- <Paging class="w-full" :pageCount="parseInt(allDetails?.totalCount / allDetails?.pageSize) + 1" :pageIndex="allDetails?.pageIndex"
    @getPageNummber="(n) => { defaultData.PageIndex = n; pageLoader(); }"></Paging> -->

        </div>
    </div>

    <!-- <Paging :pageIndex="ordersData?.pageIndex" :pageCount="pageCount" /> -->
</div>
</template>

<script>
const toast = useToast()
const {
    public: {
        showImageBaseUrl,
        productcategoryId
    },
} = useRuntimeConfig();
const isShow = ref();
const modal = ref()
const orderStatusList = ref([]);
const state = ref(null);
const status = ref(null);
const orderStateList = ref([]);
const orderItemData = ref();
const currentProductItem = ref()
const loader = ref(false)
const route = useRoute()
const modalPut = ref()
const currentOrderItem = ref()
const statusObject = ref({
    "id": 0,
    "statusId": 0
})
// const defaultData = ref({
//   Publish: null,
//   Hashtags: "",
//   CategoryIds: null,
//   Active: null,
//   AdminConfirm: null,
//   Q: "",
//   PageIndex: 1,
//   PageSize: 10,
//   SortBy: 0,
// })
onMounted(() => {
    // GETProductOrderStatus();
    // GETProductOrderState();
    getOrderItem()
})

const getOrderItem = async () => {
    // alert("s")
    loader.value = true
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/productOrderStore/productOrderStore', {
            method: 'GET',
            headers,
            query: {
                ProductOrderId: route.params.id
            }
        })

        orderItemData.value = data
        loader.value = false;;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const confirmInfo = async () => {

    try {
        const response = await $fetch('/api/productOrderStore/ProductOrderStore', {
            method: 'put',
            query: {
                storeId: currentOrderItem.value.storeId,

            },
            body: currentOrderItem.value
        })
        if (response.isSuccess) {
            modalPut.value.closeModal();
            getOrderItem()
            toast.add({
                description: 'با موفقیت انجام شد !',
                color: 'green'
            })
        } else {
            insert.messages.forEach(element => {
                toast.add({
                    description: element.item1,
                    color: 'red'
                });

            })

        }
    } catch (error) {
        ;

    }

}
</script>

<style scoped>
table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
}

table tr {
    border: 1px solid #ddd;
    padding: .35em;
    background-color: #fff;
}

table tr:nth-child(2n) {
    background-color: rgb(236, 236, 236) !important;
}

table thead tr {
    background-color: #2563eb !important;
}

th {
    background-color: unset;
}

table th,
table td {
    padding: .625em;
    text-align: center;
}

table th {
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
}

@media screen and (max-width: 600px) {
    table {
        border: 0;
    }

    table caption {
        font-size: 1.3em;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
    }

    table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;
    }

    table td::before {
        /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }

    table td:last-child {
        border-bottom: 0;
    }
}

/* general styling */
body {
    font-family: "Open Sans", sans-serif;
    line-height: 1.25;
}
</style>
