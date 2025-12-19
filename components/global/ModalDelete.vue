<template>
    <div class="modal m-0">
        <div class="content p-3 rounded">
            <div class="modal-header py-2 border-b ">
                <strong>حذف  </strong>
            </div>
            <div class="modal-body py-3">
                <span>آیا از حذف این آیتم اطمینان دارید؟</span>
            </div>
            <div class="modal-footer flex justify-end items-center">
                <button class="btn cancel bg-red-500 m-2 text-white px-3 py-1 w-full lg:w-3/6 rounded" @click="$emit('closeModal')">خیر! منصرف شدم</button>
                <button class="btn submite bg-[#136b57] m-2 text-white px-3 py-1 w-full lg:w-3/6 rounded" @click="()=>{$emit('haneler');}">تمایل به حذف دارم</button>
            </div>
        </div>
    </div>
</template>

<script  setup>

defineProps(['handeler'])


</script>

<style scoped lang="scss">
.modal{
    background-color: #0000006b;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    margin: 0 !important;
    .content{
        background-color: #fff;;
        max-width: 500px;
        width: 100% !important;
        width: max-content;
       
    }
}
</style>