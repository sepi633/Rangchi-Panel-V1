import { defineStore } from 'pinia'

export const usePermission = defineStore('permissionStore', {
  
  state: () => {
    return {
      roleName:"",
      roleId:"",
      permissionList:[],
    }
  },
}) 