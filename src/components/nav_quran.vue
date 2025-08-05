<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo-area">
        <router-link to="/">
          <img src="../images/biznizzo-hd-removebg.png" alt="Logo Shafana" class="logo" />
        </router-link>
      </div>
      <form @submit.prevent="onSearch" class="search-form">
        <input v-model="surahInput  " type="text" placeholder="Cari surah..." class="search-input" />
        <span class="material-icons-sharp search-button" @click="onSearch" role="button" tabindex="0">search</span>
      </form>
    </div>
    <router-link to="/">
      <div class="hanging-left">
        <div class="swing-wrapper">
          <svg class="moon-icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" /></svg>
        </div>
      </div>
    </router-link>

    <router-link to="jadwal">

      <div class="hanging-right">
        <div class="swing-wrapper">
          <svg class="ketupat-icon" viewBox="0 0 24 24">
            <path d="M12 2L22 12L12 22L2 12L12 2Z" />
            <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="white" />
          </svg>
        </div>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      surahInput: "",
    };
  },
  methods: {
    async onSearch() {
      const keyword = this.surahInput.trim().toLowerCase();
      if (!keyword) return;

      try {
        const res = await fetch("https://api.quran.gading.dev/surah");
        const json = await res.json();

        const surahList = json.data;
        const match = surahList.find(
          (s) =>
            s.name.transliteration.id.toLowerCase().includes(keyword) ||
            s.number.toString() === keyword
        );

        if (match) {
          this.$router.push(`/alquran/${match.number}`);
        } else {
          alert("Surah tidak ditemukan.");
        }
      } catch (error) {
        console.error("Gagal mencari surah:", error);
        alert("Terjadi kesalahan saat mencari.");
      }

      this.surahInput = "";
    },
  },
};
</script>