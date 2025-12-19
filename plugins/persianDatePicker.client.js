import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.use(Vue3PersianDatetimePicker, {
    name: "date-picker",
    props: {
      format: "YYYY-MM-DDTHH:mm",
      displayFormat: "jYYYY-jMM-jDDTHH:mm",
      editable: false,
      inputClass: "w-full ",
      placeholder: "لطفا تاریخ و زمان رو انتخاب کن . . .",
      altFormat: "YYYY-MM-DD HH:mm",
      color: "#00acc1",
      autoSubmit: false,
    },
  });
});
