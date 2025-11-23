<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">YTS Clone - TESTE</h1>
        <p class="hero-subtitle">
          Se você está vendo esta mensagem, o Vue.js está funcionando!
        </p>
        <div class="hero-actions">
          <router-link to="/browse" class="btn btn-primary">
            🎬 Browse Movies
          </router-link>
        </div>
      </div>
    </section>

    <section class="info-section">
      <div class="container">
        <h2>✅ Vue.js está funcionando!</h2>
        <p>O projeto está rodando corretamente no localhost:3000</p>
        
        <div class="debug-info">
          <h3>Informações de Debug:</h3>
          <ul>
            <li>✅ Vue 3 carregado</li>
            <li>✅ Vue Router funcionando</li>
<li>✅ Componentes carregando</li>
            <li>🚀 Próximo passo: Adicionar mais funcionalidades</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    console.log('Home page loaded!')
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 6rem 0;
  text-align: center;
  color: #fff;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #e50914;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: #ccc;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e50914;
  color: #fff;
}

.btn-primary:hover {
  background: #b8070f;
  transform: translateY(-2px);
}

.info-section {
  padding: 4rem 0;
  background: #0f0f0f;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.info-section h2 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info-section p {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.debug-info {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  border-left: 4px solid #e50914;
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.debug-info h3 {
  color: #e50914;
  margin-bottom: 1rem;
}

.debug-info ul {
  color: #ccc;
  list-style: none;
}

.debug-info li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
}

.debug-info li:last-child {
  border-bottom: none;
}
</style>