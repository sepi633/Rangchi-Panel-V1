import { defineStore } from 'pinia'

export const useAuth = defineStore('authStore', {
  
  state: () => {
    return {
      firstName:"",
      lastName:"",
      username:null,
      otpCode:null,
      user:null,
      acceptOtp:false,
      userId:0,
      userData:null
    }
  },
  actions:{
       async getCurrentUser() {
            try {
                const req = await $fetch("/api/auth/user", {
                    method: "GET",
                });

                this.userData = req.data||{};
                return true
            } catch (error) {
               throw error
            }
        },
    async checkOtp() {
         try {

             const checkOtpData = await $fetch(('/api/auth/checkOtp'), {
                 method: "POST",
                 body: {
                     mobile:this.username,
                     code:this.otpCode
                 },
                 
             })
             if(checkOtpData.isSuccess){
              this.acceptOtp=true

             } else{
              this.acceptOtp=false
              
              errors.value=checkOtpData.messages
          }
         
             
         } catch (error) {
             ;
         }

     }
  }
})