<template>
    <div class="bg-black text-white min-h-screen px-12">
      <Locations />
      <UNotifications />
    </div>
  </template>  
  
<script>
  import Locations from './locations/Locations.vue';
  
  export default {
    components: {
      Locations,
    },
  };
</script>
