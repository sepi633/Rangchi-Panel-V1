<template>
    <div class="p-6 sm:p-10 space-y-6">
        
        <table class="table">
            <thead>
                <th>ردیف</th>
                <th>ایمیل</th>
                <th>تاریخ</th>
            </thead>
            <tbody>
                <tr v-for="(item , index) in data?.list" :key="item?.id">
                    <th>{{index + 1}}</th>
                    <th>{{ item?.email }}</th>
                    <th>{{moment(item?.createDate).locale('fa').format('YYYY/MM/DD | HH:MM')}}</th>
               
                </tr>

            </tbody>
            </table>

    </div>
   
    
</template>

<script setup>
import moment from 'jalali-moment'
const data = ref()
onMounted(async() => {
   await pageLoader()
});

const pageLoader = async () => {
  try {
   

    const res = await $fetch("/api/newsletter/newsletter", {
      method: "GET",
    });

   data.value = res
    
    console.log(data);
  } catch (error) {
    console.log(error);
    
  }
};


</script>

<style scoped>

.table {
  width: 100%;
  border-collapse: collapse;
}

.table td,
.table th {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
}

.table th {
 
  color: #333333;
}

.table tbody tr:nth-child(even) {
  background-color: #d1e8f5;
}

/*responsive*/

@media (max-width: 500px) {
  .table thead {
    display: none;
  }

  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }
  .table tr {
    margin-bottom: 15px;
  }
  .table td {
    padding-left: 50%;
    text-align: left;
    position: relative;
  }
  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>
