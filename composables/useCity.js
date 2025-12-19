export default function () {
  const states = ref([
    {
      name: "آذربايجان شرقي",
      id: 1,
    },
    {
      name: "آذربايجان غربي",
      id: 2,
    },
    {
      name: "اردبيل",
      id: 3,
    },
    {
      name: "اصفهان",
      id: 4,
    },
    {
      name: "البرز",
      id: 5,
    },
    {
      name: "ايلام",
      id: 6,
    },
    {
      name: "بوشهر",
      id: 7,
    },
    {
      name: "تهران",
      id: 8,
    },
    {
      name: "چهارمحال و بختياري",
      id: 9,
    },
    {
      name: "خراسان جنوبي",
      id: 10,
    },
    {
      name: "خراسان رضوي",
      id: 11,
    },
    {
      name: "خراسان شمالي",
      id: 12,
    },
    {
      name: "خوزستان",
      id: 13,
    },
    {
      name: "زنجان",
      id: 14,
    },
    {
      name: "سمنان",
      id: 15,
    },
    {
      name: "سيستان و بلوچستان",
      id: 16,
    },
    {
      name: "فارس",
      id: 17,
    },
    {
      name: "قزوين",
      id: 18,
    },
    {
      name: "قم",
      id: 19,
    },
    {
      name: "كردستان",
      id: 20,
    },
    {
      name: "كرمان",
      id: 21,
    },
    {
      name: "كرمانشاه",
      id: 22,
    },
    {
      name: "كهگيلويه و بويراحمد",
      id: 23,
    },
    {
      name: "گلستان",
      id: 24,
    },
    {
      name: "گيلان",
      id: 25,
    },
    {
      name: "لرستان",
      id: 26,
    },
    {
      name: "مازندران",
      id: 27,
    },
    {
      name: "مركزي",
      id: 28,
    },
    {
      name: "هرمزگان",
      id: 29,
    },
    {
      name: "همدان",
      id: 30,
    },
    {
      name: "يزد",
      id: 31,
    },
  ]);

  async function getCity(_stateId) {
    try {
      let res = await $fetch("/api/city/cities", {
        method: "get",
        query: {
          StateId: _stateId,
          pageSize:6000
        },
      });
      return res?.list || []
    } catch (error) {
      return []
    }
  }



  async function getNeighborhood(_cityId) {
    try {
      let res = await $fetch("/api/Neighborhood/Neighborhoods", {
        method: "get",
        query: {
          cityId: _cityId,
        },
      });
      return res?.list || []
    } catch (error) { }
  }

  return {
    states,
    getCity,
    getNeighborhood
  }
}