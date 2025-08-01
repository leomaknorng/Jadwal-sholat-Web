<template>
  <div class="container">
    <Sidebar />
    <router-view /> <!-- WAJIB ADA -->
  </div>
</template>
<script>
import Sidebar from '../components/navbar.vue'
import DashboardContent from '../menu/dasboardContent.vue'

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    DashboardContent,
  }
};
</script>
