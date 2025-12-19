<template>
  <div>
    <h2>مختصات جدید نشانگر:</h2>
    <p>عرض جغرافیایی: {{ lat }}</p>
    <p>طول جغرافیایی: {{ lng }}</p>

    <LMap
      style="height: 350px; width: 100%;"
      :zoom="13"
      :center="[lat, lng]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />

      <!-- نشانگر قابل جابجایی -->
      <LMarker
        :lat-lng="[lat, lng]"
        draggable
        @dragend="onMarkerDragEnd"
      >
        <LTooltip>من را جابجا کن!</LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import {LTileLayer ,LMarker,LTooltip ,LMap} from '@vue-leaflet/vue-leaflet'
const props = defineProps(['location'])
const emit = defineEmits(['getLatLong'])

// تعریف مختصات اولیه
const lat = ref(props.location[0]) // عرض جغرافیایی اولیه
const lng = ref(props.location[1]) // طول جغرافیایی اولیه

// تابع برای به‌روزرسانی مختصات نشانگر
const onMarkerDragEnd = (event) => {
  const { lat: newLat, lng: newLng } = event.target.getLatLng()
  lat.value = newLat
  lng.value = newLng;

  emit('getLatLong',[lat, lng])
}
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
