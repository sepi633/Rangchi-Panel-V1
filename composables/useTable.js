export default function (route,sort ,filter){

const toast=useToast()
const sortBy=computed(()=>{
  if((sort.value.column=='createDate' || sort.value.column=='id') && sort.value.direction== 'asc' ){
    //نزولی جدیدترین
    return 1
  }
  else if((sort.value.column=='createDate'|| sort.value.column=='id')  && sort.value.direction== 'desc'){
    return 2
  }
  else if(sort.value.column=='visitCount' && sort.value.direction== 'desc'){
    return 4
  }
  else if(sort.value.column=='visitCount' && sort.value.direction== 'asc'){
    return 5
  }
  else if(sort.value.column=='priority' && sort.value.direction== 'desc'){
    return 6
  }
  else if(sort.value.column=='priority' && sort.value.direction== 'asc'){
    return 7
  }
  else if(sort.value.column=='price' && sort.value.direction== 'desc'){
    return 8
  }
  else if(sort.value.column=='price' && sort.value.direction== 'asc'){
    return 9
  }
  else if(sort.value.column=='sellCount' && sort.value.direction== 'desc'){
    return 10
  }
  else if(sort.value.column=='sellCount' && sort.value.direction== 'asc'){
    return 11
  }else{
    return 0
  }

})

const pageFrom = computed(() => {
  return (filter.value.pageIndex - 1) * filter.value.pageSize + 1
})
const pageTo = computed(() => {
  return filter.value.pageIndex * filter.value.pageSize + 1
})


async function loadData() {
  try {
    let config = JSON.parse(JSON.stringify(filter.value))
    delete config.list
    config.sortBy=sortBy.value
  
  console.log(config);
    let res = await $fetch(route, {
      method: 'GET',
      query: config
    })
    return res
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
    else
      toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
  }
}



return {sortBy,pageFrom,pageTo,loadData}
}