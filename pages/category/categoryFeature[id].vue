<template>
    <div class="box">
        <strong>دوره های دسته بندی</strong>

        <div class="flex flex-wrap mt-4">
            <div v-for="item in pageData?.list" class="lg:w-1/4 w-1/2 p-1">
                <div class="min-h-[100px] border relative hover:border-blue-900
            rounded bg-white flex flex-col lg:items-center justify-center p-1" :title="item?.name">
                    <span class="text-xs">دوره</span>
                    <strong class="p-2 text-lg">{{ item?.daysCount }}</strong>
                    <span class="text-xs">روزه</span>
                    <span class="text-xs block w-full bg-gray-200 p-1 text-center border rounded mt-1">قیمت: {{ item?.price }} تومان</span>

                    <div class="absolute left-0 top-0 h-100 w-[70px]">
                        <button @click="getCategoryItem(item?.id)"
                            class="bg-blue-800 hover:bg-blue-900 text-white text-xs p-1 w-[60px] rounded m-1   text-center">ویرایش</button>
                        <button
                            class="bg-red-800 hover:bg-red-900 text-white text-xs p-1 w-[60px] rounded m-1 text-center">حذف</button>
                    </div>
                </div>

            </div>
            <div class="lg:w-1/4 w-1/2 p-1">
                <div class="min-h-[100px] border 
            rounded bg-white flex flex-col items-center justify-center">
                    <strong class="p-2 text-lg">+</strong>
                </div>

            </div>
        </div>
        <hr>
        <div class="form bg-white  border rounded m-1 flex flex-wrap p-2">
            <div class="lg:w-1/3 w-full p-1">

                <label for="">عنوان:</label>

                <br>
                <input class="border bg-[#fbfbfb] p-1 w-full" v-model="defaultData.name" type="text">
            </div>

            <div class="lg:w-1/3 w-full p-1">

                <label for="">قیمت: <sub>(به تومان)</sub></label>

                <br>
                <input class="border bg-[#fbfbfb] p-1 w-full" type="text" v-model="defaultData.price">
            </div>
            <div class="lg:w-1/3 w-full p-1">

                <label for="">تعدادروز:</label>

                <br>
                <input class="border bg-[#fbfbfb] p-1 w-full" type="text" v-model="defaultData.daysCount">
            </div>

            <div class="lg:w-2/3 w-full p-1">

                <label for="">خلاصه:</label>

                <br>
                <input class="border bg-[#fbfbfb] p-1 w-full" type="text" v-model="defaultData.summary">
            </div>
            <div class="lg:w-1/3 w-full p-1">
                <label for=""></label><br>
                <button @click="submitInfo('insert')" class="bg-green-700 w-full hover:bg-green-800 text-white p-1 ">ثبت
                    </button>
                    <button @click="submitInfo('edite')" class="bg-blue-700 w-full hover:bg-blue-800 text-white p-1 ">ویرایش
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const addStatus = ref(false)
const pageData = ref()
const isEdite = ref(false)
const toast=useToast()
const defaultData = ref({
    "name": "",
    "summary": "",
    "description": "",
    "pictureId": null,
    "daysCount": null,
    "priority": 0,
    "price": null,
    "categoryId": route.params.id,
    "active": true
})

onMounted(() => {
    pageLoader()
    // ;
})

const pageLoader = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/categoryItem/category', {
            method: 'GET',
            headers,
            query: {
                id: route.params.id
            }
        })



        pageData.value = data
        // newCategory.value.parentId = pageData?.value.parentId
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const getCategoryItem = async (id) => {
    isEdite.value = true

    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/categoryItem/categoryItem', {
            method: 'GET',
            headers,
            query: {
                catId: id
            }
        })
        addStatus.value = true


        defaultData.value = data.data
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const loading=ref(false)

const submitInfo = async (type) => {
        if(loading.value)
    return
    loading.value=true
    ;
    if (type == 'insert') {
        try {
            const headers = useRequestHeaders(['cookie'])
            const insert = await $fetch(('/api/categoryItem/category'), {
                method: "POST",
                body: defaultData.value,
                headers: {
                    'Accept': 'application/json'
                }
            })
            
            if (insert?.isSuccess == true) {
                
                
                pageLoader()
                resetForm()
                addStatus.value = false;
                

            } else {
                insert?.messages.forEach(element => {
                    toast.add({description:element?.item1,color:'red'});
                });
                
            }

        } catch (error) {
            ;
        }
        finally {
            
        }
    }
    if (type == 'edite') {
        try {
            const headers = useRequestHeaders(['cookie'])
            const insert = await $fetch(('/api/categoryItem/category'), {
                method: "PUT",
                body: defaultData.value,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (insert?.isSuccess == true) {
                pageLoader()
                resetForm()
                
            }


        } catch (error) {
            ;
        }
        finally {
            addStatus.value = false;

        }
    }
    
    loading.value=false
}

const resetForm = () => {
    defaultData.value = {
        "name": "",
        "summary": "",
        "description": "",
        "pictureId": null,
        "createDate": "",
        "daysCount": null,
        "priority": 0,
        "price": null,
        "categoryId": route.params.id,
        "active": true
    }
}
</script>