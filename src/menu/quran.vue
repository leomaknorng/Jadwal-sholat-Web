<!-- src/menu/AlquranDigital.vue -->
<template>
  <div class="quran-page">
    <h2 class="section-title">Daftar Surah <span class="kota-highlight">Al'Quran</span></h2>
    <Ayatharian />
    <div v-if="loading" class="loading">Memuat daftar surah...</div>
    <div v-else class="surah-grid">
      <div
      v-for="surah in surahList"
      :key="surah.number"
      class="surah-card"
      @click="pilihSurah(surah.number)"
      >
        <h3 class="surah-title">{{ surah.number }}. {{ surah.englishName }}</h3>
        <p class="surah-subtitle">
          {{ surah.name }} — {{ surah.englishNameTranslation }}
        </p>
        <small>{{ surah.numberOfAyahs }} ayat</small>
      </div>
    </div>
  </div>
</template>

<script>
import Ayatharian from "@/menu/quotes.vue";

export default {
  name: "AlquranDigital",
  components: {
    Ayatharian,
  },
  data() {
    return {
      loading: true,
      surahList: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("https://api.alquran.cloud/v1/surah");
      const json = await res.json();
      this.surahList = json.data;
    } catch (error) {
      console.error("Gagal memuat daftar surah:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    pilihSurah(nomor) {
  this.$router.push(`/alquran/${nomor}`);
}
  },
};
</script>

<style scoped>
.quran-page {
  padding: 2rem;
  padding-top: 60px;
  text-align: center;
}

.section-title {
  width: 100%;
  max-width: 100%;
  font-family: "Montserrat", sans-serif;
   font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 800;
  color: #F0F0F0;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}


.loading {
  font-style: italic;
}

.surah-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.surah-card {
  background-color: var(--color-accent-green, #3D9970);
  color: white;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}
.surah-card:hover {
  background-color: var(--color-dark-secondary, #2C3E50);
  transform: translateY(-4px);
}

.surah-title {
  font-size: 1.1rem;
  margin: 0;
}

.surah-subtitle {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .section-title{
    margin-top: 2rem;
  }
}
</style>
