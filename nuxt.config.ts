import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
const larkTheme = require.resolve("@ckeditor/ckeditor5-theme-lark");
export default defineNuxtConfig({

  app: {
    head: {
      // title: "فروشگاه آنلاین  ",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],

    },
  },

  modules: ['@pinia/nuxt', 'nuxt3-leaflet', '@nuxt/ui', [
    '@nuxtjs/i18n',
    {vueI18n: './i18n.config.ts' }
  ]],
  colorMode: {
    preference:'ligth',
     fallback:'ligth'
      },
    
  runtimeConfig:{
    apiSecret:"zzzzz",
    public:{
      // baseUrl:"https://api-clinic.bhpsolution.com",
      baseUrl:"https://api.arioexir.com", 
      imageUploaderUrl:"https://file.arioexir.com/api/PictureUpload",
      showImageBaseUrl:"https://file.arioexir.com",
      fileUploaderUrl:"https://file.arioexir.com/api/FileUpload",
      responseCode:{
        none:0,
        signUp: 1,
        oneFactor:2,
        twoFactor:3,
        locked:4,
        verifyCodeCountError:5
  
      },
      productcategoryId:3,
      bannercategoryId:1,
      postCategoryId:2,
      galleryCategoryId:10054,
      detailCategoryId:4,
      AdvertisementCategoryId:6,
      projectName:"آریو اکسیر"

    }
  },

  css: ["~/assets/css/main.css","~/assets/css/ck.css"],

  

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  

  imports: {
    dirs: ['stores'],
  },

  // plugins: [
  //    { src: "~/plugins/ckeditor.js", mode: "client", ssr: false },
  // ],
  vite: {
    plugins: [ckeditor5({ theme: larkTheme })],
  },
  compatibilityDate: "2024-10-21",
});