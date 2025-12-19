<template>
    <div class="ticket-box">
        <!-- {{data}} -->
        <div :class="{ 'border-2 border-blue-700 shadow': slectedTicket == data?.id }"
            class="ticketItem bg-white border rounded border-gray-300 py-3 cursor-pointer mb-3 pb-3 p-1 px-3 hover:border-gray-400 "
            :title="'ایجاد شده در' + moment(data.createDate).locale('fa').format('YYYY/MM/DD')">



            <div class="flex items-center bg-yellow-100 border rounded p-1 text-sm"
                v-if="data?.status?.label == 'TicketStatus_Waiting'">

                <svg class="me-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 11.9951C4 9.87339 4.84285 7.83855 6.34315 6.33826C7.84344 4.83797 9.87827 3.99512 12 3.99512C14.1217 3.99512 16.1566 4.83797 17.6569 6.33826C19.1571 7.83855 20 9.87339 20 11.9951C20 14.1168 19.1571 16.1517 17.6569 17.652C16.1566 19.1523 14.1217 19.9951 12 19.9951C9.87827 19.9951 7.84344 19.1523 6.34315 17.652C4.84285 16.1517 4 14.1168 4 11.9951ZM12 1.99512C6.477 1.99512 2 6.47212 2 11.9951C2 17.5181 6.477 21.9951 12 21.9951C17.523 21.9951 22 17.5181 22 11.9951C22 6.47212 17.523 1.99512 12 1.99512ZM13 5.99512C13 5.7299 12.8946 5.47555 12.7071 5.28801C12.5196 5.10047 12.2652 4.99512 12 4.99512C11.7348 4.99512 11.4804 5.10047 11.2929 5.28801C11.1054 5.47555 11 5.7299 11 5.99512V11.9951C11.0001 12.2603 11.1055 12.5146 11.293 12.7021L14.293 15.7021C14.4816 15.8843 14.7342 15.9851 14.9964 15.9828C15.2586 15.9805 15.5094 15.8753 15.6948 15.6899C15.8802 15.5045 15.9854 15.2537 15.9877 14.9915C15.99 14.7293 15.8892 14.4767 15.707 14.2881L13 11.5811V5.99512Z"
                        fill="black" />
                </svg>
                <span> درحال انتظار</span>
            </div>


            <div class="flex items-center bg-blue-100 border rounded p-1"
                v-if="data?.status?.label == 'TicketStatus_Answered'">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M20.61 5.20699C20.7142 5.28706 20.8016 5.38688 20.8672 5.50074C20.9327 5.6146 20.9753 5.74027 20.9922 5.87057C21.0092 6.00087 21.0004 6.13324 20.9662 6.26011C20.932 6.38699 20.8731 6.50588 20.793 6.60999L10.793 19.61C10.7062 19.7228 10.5964 19.8157 10.4709 19.8826C10.3453 19.9496 10.2069 19.9889 10.0649 19.9981C9.92296 20.0073 9.78066 19.9861 9.64754 19.9359C9.51442 19.8857 9.39354 19.8076 9.29298 19.707L4.29298 14.707C4.11082 14.5184 4.01003 14.2658 4.01231 14.0036C4.01458 13.7414 4.11975 13.4906 4.30516 13.3052C4.49057 13.1198 4.74138 13.0146 5.00358 13.0123C5.26578 13.01 5.51838 13.1108 5.70698 13.293L9.90198 17.488L19.207 5.38999C19.287 5.2858 19.3869 5.19842 19.5007 5.13282C19.6146 5.06723 19.7403 5.02472 19.8706 5.00773C20.0009 4.99073 20.1332 4.99958 20.2601 5.03378C20.387 5.06797 20.5059 5.12683 20.61 5.20699Z"
                        fill="black" />
                </svg>

                <span> پاسخ داده شده</span>
            </div>

            <div class="flex items-center bg-red-100 border rounded p-1" v-if="item?.status?.label == 'TicketStatus_Close'">
                <svg class="me-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.127 22.199C16.708 22.5969 17.447 23.0219 18.312 23.3499C19.99 23.9859 21.244 24.0239 21.824 23.9899C23.117 23.9169 23.291 23.0979 22.597 22.08C21.805 20.92 21.042 19.6071 21.117 18.1542C22.3469 16.3375 23.0029 14.1933 23 11.9995C23 5.92476 18.075 1 12 1C5.925 1 1 5.92476 1 11.9995C1 18.0742 5.925 22.9989 12 22.9989C13.458 22.9989 14.851 22.7149 16.127 22.199ZM12 2.9999C9.61305 2.9999 7.32387 3.94807 5.63604 5.63581C3.94821 7.32356 3 9.61263 3 11.9995C3 14.3863 3.94821 16.6754 5.63604 18.3631C7.32387 20.0509 9.61305 20.999 12 20.999C13.37 20.999 14.665 20.694 15.825 20.1491C15.991 20.071 16.1752 20.04 16.3576 20.0596C16.5399 20.0792 16.7134 20.1485 16.859 20.2601C17.382 20.661 18.124 21.14 19.021 21.48C19.411 21.628 19.767 21.735 20.086 21.811C19.753 21.204 19.416 20.4811 19.262 19.8011C19.102 19.0991 18.862 17.8772 19.328 17.2252C20.4185 15.7012 21.0033 13.8734 21 11.9995C21 9.61263 20.0518 7.32356 18.364 5.63581C16.6761 3.94807 14.3869 2.9999 12 2.9999Z"
                        fill="black" />
                </svg>
                <span>بسته شده</span>
            </div>


            <span class="text-sm">شناسه: {{ data?.id }}</span>
            <br>
            <span class="text-sm">کاربر: {{ data?.user?.fullName }}</span>
            <br>
            <span class="text-sm">موضوع: <span v-if="!data?.user?.product">سایر</span></span>
            <br>
            <span class="text-sm">عنوان: {{ data?.name }}</span>
            <br>
            <span class="text-sm" v-if="data?.admin">کارشناس مربوط: {{ data?.admin?.fullName }}</span>
            <div v-else>
                <!-- $emit('setAdmin') -->
                <strong class="text-sm text-red-500">بدون کارشناس</strong>
                <select class="p-1 m-1 rounded" @change="()=>{;
                }" name="" id="">
                    <option value="">لطفا انتخاب کنید</option>
                    <option v-for="element in admins?.list" :value="element?.id" @click="ticketAdminStore.adminId = element.id;$emit('setAdmin')">
                        {{ element.fullName }}</option>
                </select>
            </div>
            <p class="text-sm" v-if="data?.admin">متن تیکت: {{ data?.body }}</p>
            <span class="text-sm block bg-gray-200 p-2 text-xs rounded border">آخرین به روز رسانی: {{ moment(data.updateDate
            ).locale('fa').format('YYYY/MM/DD') }} </span>

        </div>
    </div>
</template>

<script setup>
    import moment from 'jalali-moment';
    const ticketAdminStore = useTicketAdmin();

    defineProps(['data','admins'])

</script>