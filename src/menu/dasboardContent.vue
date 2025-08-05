<template>
  <div class="dashboard-menu">
    <div class="hanging-left">
      <div class="swing-wrapper">
        <svg class="moon-icon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/>
        </svg>
      </div>
    </div>

    <div class="hanging-right">
      <div class="swing-wrapper">
        <svg class="ketupat-icon" viewBox="0 0 24 24">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" />
          <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="white"/>
        </svg>
      </div>
    </div>

    <!-- Konten utama -->
    <h2 class="welcome-title">Selamat datang</h2>
    <p class="subtext">Tingkatkan Iman Anda, Mulailah Dari Sini:</p>

    <div class="card-container">
      <div class="menu-card" @click="$router.push('/jadwal')">
        <div class="emoji">🕌</div>
        <h3>Jadwal Sholat</h3>
      </div>
      <div class="menu-card" @click="$router.push('/quran')">
        <div class="emoji">📖</div>
        <h3>Al-Qur’an Digital</h3>
      </div>
    </div>
  </div>
</template>




<style scoped>
.dashboard-menu {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 4rem 1.5rem;
}

.hanging-left,
.hanging-right {
  position: absolute;
  top: 20px; /* Revisi dari top: 100% menjadi top: 20px */
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 5;
}

/* Posisi horizontal */
.hanging-left {
  left: 20px;
}

.hanging-right {
  right: 30px;
}

/* Animasi ayunan */
.swing-wrapper {
  animation: swing 3s ease-in-out infinite alternate;
  transform-origin: top center;
  will-change: transform;
}

/* Delay animasi untuk urutan */
.swing-wrapper:nth-child(2) {
  animation-delay: 0.4s;
}

/* SVG ikon */
.hanging-left svg,
.hanging-right svg {
  pointer-events: auto;
  transition: transform 0.3s ease;
  opacity: 0.85;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.15));
}

/* Ukuran & warna ikon */
.moon-icon {
  width: 6em;
  height: 6em;
  fill: var(--color-accent-gold, #FFD700);
}

.ketupat-icon {
  width: 6em;
  height: 6em;
  fill: var(--color-accent-green, #3D9970);
}

/* Keyframe untuk efek swing */
@keyframes swing {
  0% {
    transform: rotate(0deg) translateY(0);
  }
  50% {
    transform: rotate(4deg) translateY(-3px);
  }
  100% {
    transform: rotate(-4deg) translateY(0);
  }
}


.welcome-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.6rem, 5.8vw, 3.2rem); /* Sedikit lebih ramping agar tidak terlalu besar di layar kecil */
  font-weight: 800; /* Turunkan dari 900 agar lebih seimbang dan tidak terlalu berat */
  color: #f9fafb; /* Putih halus untuk tampilan lembut */
  margin-bottom: 1rem;
  line-height: 1.25;
  letter-spacing: -0.5px;
  text-align: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  text-shadow:
    1px 1px 2px rgba(0, 0, 0, 0.2),
    0 0 6px rgba(61, 153, 112, 0.25); /* Tambahkan glow hijau lembut */
  animation: fadeInDown 0.7s ease-out both;
}

.subtext {
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(1.1rem, 2.4vw, 1.25rem); /* Konsisten antara desktop dan mobile */
  font-weight: 400;
  color: #cbd5e0; /* Abu biru yang soft dan seimbang */
  line-height: 1.8;
  max-width: 720px;
  margin: 0 auto 3rem auto;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  opacity: 0.95;
  animation: fadeInUp 1s ease-out both;
}



/* Animasi sederhana */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Container untuk Card */
.card-container {
display: flex;
justify-content: center;
gap: 3rem;
flex-wrap: wrap;
max-width: 1300px;
margin: 0 auto;
}

.menu-card {
width: min(90vw, 360px);
height: 320px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer;
position: relative;
overflow: hidden;
z-index: 0;
border-radius: 28px;
background: linear-gradient(145deg, #3fae63, #287c50);
color: white;
box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
border: 1px solid rgba(255, 255, 255, 0.15);
transition: all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
transform-style: preserve-3d;
will-change: transform, box-shadow;
}

.menu-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  z-index: 2;
  opacity: 0.6;
  pointer-events: none;
} 

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

.menu-card:hover::before {
  animation: shimmer 1.6s linear infinite;
}

/* Efek hover utama */
.menu-card:hover {
background: linear-gradient(145deg, #1f2937, #2d3748);
transform: translateY(-12px) scale(1.04) rotateX(3deg);
box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
border-color: rgba(255, 255, 255, 0.3);
}

/* Efek partikel halus (simulate) */
.menu-card::after {
content: '';
position: absolute;
bottom: -10px;
right: -10px;
width: 120px;
height: 120px;
background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%);
filter: blur(8px);
transform: rotate(30deg);
z-index: 1;
pointer-events: none;
transition: opacity 0.3s ease;
}

/* Emoji besar */
.menu-card .emoji {
font-size: 4.8rem;
margin-bottom: 1rem;
z-index: 2;
filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
transition: transform 0.3s ease;
}

.menu-card:hover .emoji {
transform: scale(1.1);
}

/* Judul */
.menu-card h3 {
font-family: 'Poppins', sans-serif;
font-size: 1.8rem;
font-weight: 700;
margin: 0;
z-index: 2;
text-align: center;
padding: 0 1.2rem;
letter-spacing: -0.015em;
text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}


/* Media Queries untuk Responsivitas (Penyesuaian untuk visibilitas) */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.5rem;
  }
  .subtext {
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }
  .card-container {
    gap: 2rem;
  }
  .menu-card {
    width: min(90vw, 320px);
    height: 280px;
  }
  .menu-card .emoji {
    font-size: 4rem;
  }
  .menu-card h3 {
    font-size: 1.6rem;
  }
  .ketupat-icon{
    width: 4em;
    height: 4em;
  }

  .moon-icon{
    width: 4em;
    height: 4em;
  }

  .hanging-left{
    top: 0.4em;
    left: -0.1em;
  }

  .hanging-right{
    top: 0.1em;
    right: 0.8em;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2.2rem;
    line-height: 1.2;
  }
  .subtext {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  .menu-card {
    width: 88vw;
    height: 250px;
    border-radius: 25px;
  }
  .menu-card .emoji {
    font-size: 3.5rem;
  }
  .menu-card h3 {
    font-size: 1.4rem;
  }
}

/* Tambahkan ini di akhir file CSS-mu */

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Terapkan animasi ke menu-card secara bergantian */
.menu-card {
  opacity: 0; /* Mulai dari tidak terlihat */
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}

/* Animasi untuk card ganjil: dari kiri */
.menu-card:nth-child(odd) {
  animation-name: fadeInLeft;
  animation-delay: 0.2s;
}

/* Animasi untuk card genap: dari kanan */
.menu-card:nth-child(even) {
  animation-name: fadeInRight;
  animation-delay: 0.4s;
}

</style>
