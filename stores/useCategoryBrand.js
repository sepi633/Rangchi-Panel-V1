import { defineStore } from 'pinia'

export const useCategoryBrand = defineStore('categoryBrand', {
  
  state: () => {
    return {
      
      list:[],
    }
  },
  actions:{
    async getcategoryBrand (state){
      try {
  

        const data = await $fetch("/api/category/categoryBrand", {
          method: "GET",
          query:{
            id:state
          }
        });
     
     
        this.list = data.data

     
      } catch (error) {
     
        // navigateTo("/login")
      }
    }
  }
}) 