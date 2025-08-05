<template>
  <router-view />
</template>

<script>
export default {
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
