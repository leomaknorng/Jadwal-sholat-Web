<!-- src/menu/AlquranDetail.vue -->
<template>
  <div class="surah-detail">
    <h2 class="surah-title">Surah {{ namaLatin }} <small>({{ namaArab }})</small></h2>
    <p class="subinfo">Jumlah Ayat: {{ jumlahAyat }}</p>
    <div class="back-wrap">
      <button class="back-button" @click="$router.back()">← Kembali</button>
    </div>

    <div v-if="loading" class="loading">Memuat ayat...</div>

    <div v-else class="ayat-list">
      <div v-for="ayat in ayatList" :key="ayat.number.inSurah" class="ayat-card">
        <div class="arab">{{ ayat.text }}</div>
        <div class="translation">{{ ayat.translation }}</div>
        <div class="ayat-number">({{ ayat.number.inSurah }})</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuranDetail",
  data() {
    return {
      namaArab: "",
      namaLatin: "",
      jumlahAyat: 0,
      ayatList: [],
      loading: true,
    };
  },
  async mounted() {
    await this.loadSurah();
  },
  watch: {
    '$route.params.nomor': {
      immediate: false,
      handler() {
        this.loadSurah();
      }
    }
  },
  methods: {
    async loadSurah() {
      this.loading = true;
      const nomor = this.$route.params.nomor;
      console.log("Load surah:", nomor);

      try {
        const res = await fetch(`https://api.quran.gading.dev/surah/${nomor}`);
        const json = await res.json();
        const data = json.data;

        this.namaArab = data.name.short;
        this.namaLatin = data.name.transliteration.id;
        this.jumlahAyat = data.numberOfVerses;
        this.ayatList = data.verses.map((ayat) => ({
          number: ayat.number,
          text: ayat.text.arab,
          translation: ayat.translation.id,
        }));
      } catch (e) {
        console.error("Gagal ambil ayat:", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.surah-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.surah-title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 0.2rem;
}

.back-wrap{
  display: flex;
  align-items: start;
}

.back-button {
  margin-bottom: 1rem;
  background-color: var(--color-accent-green, #3D9970);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.back-button:hover {
  background-color: var(--color-dark-secondary, #2C3E50);
}

.subinfo {
  text-align: center;
  color: #777;
  margin-bottom: 1.5rem;
}
.loading {
  text-align: center;
  font-style: italic;
}
.ayat-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.ayat-card {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
.arab {
    color: black;
  font-size: 1.8rem;
  text-align: right;
  direction: rtl;
  margin-bottom: 0.5rem;
}
.translation {
  font-size: 1rem;
  text-align: left;
  color: #333;
}
.ayat-number {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}
</style>
