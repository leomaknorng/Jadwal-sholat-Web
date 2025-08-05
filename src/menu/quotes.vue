<template>
  <div class="quote-card" v-if="ayatText && !error">
    <h3 class="surah-name">{{ surahName }}</h3>
    <p class="ayat-text">{{ ayatText }}</p>
    <p class="ayat-translation">❝ {{ ayatTranslation }} ❞</p>
  </div>

  <div v-else-if="error" class="quote-error">
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "QuotesHarian",
  data() {
    return {
      surahName: "",
      ayatText: "",
      ayatTranslation: "",
      error: null,
    };
  },
  async mounted() {
    try {
      // Ambil semua surah
      const res = await fetch("https://api.quran.gading.dev/surah");
      const json = await res.json();
      const surahList = json.data;

      // Pakai tanggal hari ini untuk randomness konsisten tiap hari
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      const rng = seed % surahList.length;
      const randomSurah = surahList[rng];

      const surahNumber = randomSurah.number;
      const totalAyah = randomSurah.numberOfVerses;
      const ayahNumber = (seed * 17) % totalAyah + 1; // randomness stabil

      // Ambil ayat berdasarkan surah dan ayat
      const resAyat = await fetch(`https://api.quran.gading.dev/surah/${surahNumber}/${ayahNumber}`);
      const jsonAyat = await resAyat.json();
      const ayat = jsonAyat.data;

      this.surahName = `${ayat.surah.name.transliteration.id} (${ayat.surah.name.short}) - Ayat ${ayat.number.inSurah}`;
      this.ayatText = ayat.text.arab;
      this.ayatTranslation = ayat.translation.id;
    } catch (err) {
      this.error = "Gagal memuat ayat harian.";
      console.error(err);
    }
  }
};
</script>

<style scoped>
.quote-card {
  background-color: #ffffff0d;
  backdrop-filter: blur(5px);
  border-left: 5px solid var(--color-accent-green, #3D9970);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #f0f0f0;
}

.surah-name {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #87eec2;
}

.ayat-text {
  font-size: 1.8rem;
  font-family: "Scheherazade New", serif;
  line-height: 2.5rem;
  margin-bottom: 1rem;
  text-align: right;
}

.ayat-translation {
  font-size: 1rem;
  font-style: italic;
  color: #ddd;
}

.quote-error {
  color: red;
  font-style: italic;
  margin: 1rem 0;
}
</style>
