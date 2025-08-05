<template>
  <div class="container">
    <Sidebar @kota-dicari="updateKota"/>
    <router-view :kotaInput="kota" />
    <Footer />
  </div>
</template>
<script>
import Sidebar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Footer
  },
  data() {
    return {
      kota: 'malang' // kota default
    }
  },
  methods: {
    updateKota(kotaBaru) {
      this.kota = kotaBaru
    }
  }
};
</script>
