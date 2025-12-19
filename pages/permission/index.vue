<template>
    <div class="bg-white p-3 border rounded flex flex-wrap">
        <!-- {{ roles }} -->
        <div class=" w-1/3 pe-2">
            <div class="select-roles">
            <label for=""> {{ $t('ChooseArole') }}:</label>
            <div class="mr-3" v-for="item in roles?.list" :key="item?.id">
                <input  class="mx-1" type="radio" :checked="item?.id==selectedRole.id" name="role" 
                v-model="selectedRole" @change="pageLoader(selectedRole.id)" :value="item" :id="item?.name">
                <label  class="cursor-pointer" :for="item?.name">{{ item?.name }}</label>
            </div>
            
        </div>
    <!-- <button @click="pageLoader(selectedRole.id)" class="bg-blue-700  hover:bg-blue-800 mt-3 w-full text-white py-2 px-3 rounded">
        نمایش
    </button> -->

    <!-- <button v-if="canVeiw == false"
     @click="checkPermission()" class="bg-orange-500  hover:bg-orange-600 mt-3 w-full text-white py-2 px-3 rounded">
        برسی
    </button> -->

    
    <button 
     @click="postRolePermissin()" class="bg-green-700 hover:bg-green-800 mt-3 w-full text-white py-2 px-3 rounded">
     {{ $t('confirm') }}
    </button>
<!-- 
    <p class=" justify-between w-full" v-for="item in permissionStore.permissionList">
        {{ item?.name }} , {{ item?.id }}
        
        <hr class="w-full">
    </p> -->
            

        </div>



   <TreeInputTreeSelect class="lg:w-2/3" :pageData="allPermissions"></TreeInputTreeSelect>


    <div class="permissionList flex flex-wrap hidden">
        <details class="w-1/2" v-for="(item,num) in allPermissions?.list" :key="item?.id">
            <summary>
                <input type="checkbox" name="" id="">
                {{num+1}}. {{ item?.id }}
            
                <!-- {{ checkPermission(item?.id,userPermissions)}} -->
            </summary>
            <div class="ps-5">
                <details  v-for="(event,index) in item?.children" :key="event?.id">
                    <summary>
                        <input type="checkbox" name="" id="">
                        {{index+1}}. {{ event?.name }}</summary>
                        <div class="ps-5">
                <details  v-for="(element,k) in item?.children" :key="element?.id">
                    <summary>
                        <input type="checkbox" name="" id="">
                        {{k+1}}. {{ element?.name }}</summary>
                    <div>
                        
                    </div>            
                </details>
            </div>             
                </details>
            </div>            
        </details>
        <!-- {{ allPermissions.list }} -->
    </div>

    </div>
   
</template>

<script setup>

const toast = useToast();

const allPermissions = ref()
const permissionStore = usePermission()
const roles = ref()
const selectedRole = ref({});
const selectedList=ref([]);
const canVeiw = ref(false)
const permissionData = ref({
    roleDto:{},
    permissionsDto:[]
   })
const defaultData = ref({
  "roleId": null,
  "pageIndex": 1,
  "pageSize": 200,
  "q": null,
  "sortBy": 11,
  "available": null
});

const userPermissions = ref()
onMounted(()=>{
    pageLoader(1)
    getRoles()

    
})
const pageLoader = async (id) => {
    getRolePermission(id)
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/permissions/permissions', {
            method: 'GET',
            headers,
            query:defaultData.value
        })
        

        allPermissions.value = data
        // ;
        // ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const getRolePermission = async (id) => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/permissions/rolePermissions', {
            method: 'GET',
            headers,
            query:{
                roleId:id
            }
        })
        

        userPermissions.value = data
        permissionStore.permissionList = data?.data?.permissionsDto

        ;
        ;
        // pageLoader()
    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const getRoles = async () => {
    ;
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/role/role', {
            method: 'GET',
            headers,
            
        })


        roles.value = data
        selectedRole.value = data.list[0]
        ;
        ;
        ;
    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const checkPermission =async ()=>{
    const persmissionSelected = document.querySelectorAll(".persmission-input")
    ;
   
    for (let index = 0; index < persmissionSelected.length; index++) {
       
        if(persmissionSelected[index].checked == true ){
              selectedList.value.push(JSON.parse(persmissionSelected[index].value))
           

         
           
        }else{
            
            
            selectedList.value.filter((el)=>{el == persmissionSelected[index].value })
            
        }
    }
   ;
            ;

    canVeiw.value =true


}

const postRolePermissin = async () =>{
    checkPermission()
 ;
   permissionData.value.roleDto=selectedRole.value
   permissionData.value.permissionsDto = selectedList.value
   ;
        try {
            const headers = useRequestHeaders(['cookie'])

            const data = await $fetch('/api/permissions/rolePermissions', {
                method: 'post',
                headers,
                body:permissionData.value
            
            })

            if(data.isSuccess ){
                getRolePermission(selectedRole.value.id)
                toast.add({description:'با موفقیت  ثبت شد !',color:'green'})
            }
           else{
            insert.messages.forEach((el)=>{
                toast.add({description:el.item1,color:'red'})
                })
           }

        } catch (error) {

            ;
            // navigateTo("/login")
        }
}

</script>