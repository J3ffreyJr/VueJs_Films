<template>
  <div class="browse">
    <div class="container">
      <h1>🎬 Browse Movies</h1>
      <p>Página de busca de filmes - Em desenvolvimento</p>
      <router-link to="/" class="btn btn-secondary">
        ← Voltar para Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Browse'
}
</script>

<style scoped>
.browse {
  min-height: 100vh;
  background: #0f0f0f;
  padding: 4rem 0;
  text-align: center;
}

.browse h1 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.browse p {
  color: #ccc;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn-secondary {
  background: #333;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #444;
  transform: translateY(-2px);
}
</style>