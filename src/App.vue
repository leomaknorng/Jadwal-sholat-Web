<template>
  <div class="container">
    <navbar @kota-dicari="updateKota" />
    <JadwalSholat :kotaInput="kota" />
    <Footer />
  </div>
</template>

<script>
import JadwalSholat from './menu/dasboardContent.vue'
import navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

export default {
  components: { JadwalSholat, navbar, Footer },
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
}
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

@media (max-width: 480px) {
  .container h1{
    margin-top: 1rem;
  }
}
</style>
