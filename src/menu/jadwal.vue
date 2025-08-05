<template>
 <div class="main-content-wrapper">
    <h2 class="section-title">Jadwal Sholat <span class="kota-highlight">{{ kotaNama }}</span></h2>

    <div v-if="loading" class="info-message loading-message">
      <span class="material-icons-sharp">hourglass_empty</span>
      <span>Memuat data...</span>
    </div>
    <div v-if="error" class="info-message error-message">
      <span class="material-icons-sharp">error_outline</span>
      <span>{{ error }}</span>
    </div>

    <div class="jadwal-grid-container">
      <div v-if="jadwal" class="card jadwal-harian-card">
        <div class="card-header">
          <h4 class="card-title">{{ tanggalIndonesia }}</h4>
        </div>
        <div class="hijri-date">{{ hijriDate }}</div>
        <ul class="jadwal-list">
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">timer</span> Imsak</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.imsak) }}</strong>
  </li>
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">mosque</span> Subuh</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.subuh) }}</strong>
  </li>
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">wb_sunny</span> Dzuhur</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.dzuhur) }}</strong>
  </li>
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">brightness_5</span> Ashar</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.ashar) }}</strong>
  </li>
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">nights_stay</span> Maghrib</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.maghrib) }}</strong>
  </li>
  <li class="jadwal-item">
    <span class="prayer-label"><span class="material-symbols-sharp">dark_mode</span> Isya</span>
    <strong class="prayer-time">{{ convertToAMPM(jadwal.isya) }}</strong>
  </li>
</ul>
      </div>

      <div v-if="jadwalBulanan.length" class="card jadwal-bulanan-card">
        <div class="card-header">
          <span class="material-icons-sharp">calendar_month</span>
          <h3 class="card-title2">BULANAN — {{ kotaNama }}</h3>
        </div>
        <div class="table-responsive custom-scrollbar">
          <table class="jadwal-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Imsak</th>
                <th>Subuh</th>
                <th>Dzuhur</th>
                <th>Ashar</th>
                <th>Maghrib</th>
                <th>Isya</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in jadwalBulanan" :key="index" :class="{ 'current-day-row': item.tanggal === tanggalIndonesia }">
                <td class="table-date">{{ item.tanggal }}</td>
                <td>{{ convertToAMPM(item.imsak) }}</td>
                <td>{{ convertToAMPM(item.subuh) }}</td>
                <td>{{ convertToAMPM(item.dzuhur) }}</td>
                <td>{{ convertToAMPM(item.ashar) }}</td>
                <td>{{ convertToAMPM(item.maghrib) }}</td>
                <td>{{ convertToAMPM(item.isya) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/API/axios'; // sesuaikan path jika beda struktur

export default {
  props: {
    kotaInput: {
      type: String,
      default: "malang"
    }
  },
  data() {
    return {
      kotaNama: "",
      jadwal: null,
      jadwalBulanan: [],
      tanggal: "",
      tanggalIndonesia: "",
      loading: false,
      error: null,
      hijriDate: "",
      kalenderHijriah: []
    };
  },
  watch: {
    kotaInput: {
      immediate: true,
      async handler() {
        await this.cariJadwal();
        await this.getHijriDate(this.tanggal);
      }
    }
  },
  methods: {
    async cariJadwal() {
      this.loading = true;
      this.error = null;
      this.jadwal = null;
      this.jadwalBulanan = [];

      const today = new Date();
      const tanggalIso = today.toISOString().split("T")[0];
      this.tanggal = tanggalIso;
      this.tanggalIndonesia = today.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });

      try {
        const resKota = await api.get(`sholat/kota/cari/${this.kotaInput}`);
        const dataKota = resKota.data;

        if (!dataKota.status || dataKota.data.length === 0) {
          throw new Error("Kota tidak ditemukan.");
        }

        const kota = dataKota.data[0];
        const idKota = kota.id;
        this.kotaNama = kota.lokasi;

        const resJadwal = await api.get(`sholat/jadwal/${idKota}/${tanggalIso}`);
        const dataJadwal = resJadwal.data;

        if (!dataJadwal.status) {
          throw new Error("Gagal mengambil jadwal harian.");
        }

        this.jadwal = dataJadwal.data.jadwal;

        // Ambil jadwal bulanan
        const dateObj = new Date(tanggalIso);
        const tahun = dateObj.getFullYear();
        const bulan = String(dateObj.getMonth() + 1).padStart(2, '0');
        await this.ambilJadwalBulanan(idKota, tahun, bulan);

      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async ambilJadwalBulanan(kotaId, tahun, bulan) {
      try {
        const res = await api.get(`sholat/jadwal/${kotaId}/${tahun}/${bulan}`);
        const json = res.data;

        if (json.status && json.data && json.data.jadwal) {
          this.jadwalBulanan = json.data.jadwal;
        } else {
          console.warn("Gagal mengambil jadwal bulanan");
        }
      } catch (err) {
        console.error("Error ambilJadwalBulanan:", err);
      }
    },

    async getHijriDate(dateStr) {
      try {
        const res = await api.get(`cal/hijr/${dateStr}?adj=-1`);
        const json = res.data;
        if (json?.data?.date?.[1]) {
          this.hijriDate = json.data.date[1];
        } else {
          this.hijriDate = "Tanggal Hijriah tidak ditemukan";
        }
      } catch (error) {
        console.error("Gagal memuat tanggal Hijriah:", error);
        this.hijriDate = "Gagal memuat tanggal Hijriah";
      }
    },

    convertToAMPM(time24) {
      const [hour, minute] = time24.split(':');
      const h = parseInt(hour);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minute} ${ampm}`;
    }
  }
}
</script>
