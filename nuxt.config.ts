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
      baseUrl:"https://rangchi-api.bhptest.ir", 
      imageUploaderUrl:"https://rangchi-file.bhptest.ir/api/PictureUpload",
      showImageBaseUrl:"https://rangchi-file.bhptest.ir",
      fileUploaderUrl:"https://rangchi-file.bhptest.ir/api/FileUpload",
      responseCode:{
        none:0,
        signUp: 1,
        oneFactor:2,
        twoFactor:3,
        locked:4,
        verifyCodeCountError:5
  
      },
      productcategoryId:10185,
      bannercategoryId:10184,
      postCategoryId:10183,
      galleryCategoryId:10,
      detailCategoryId:4,
      AdvertisementCategoryId:6,
      projectName:"رنگچی"

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