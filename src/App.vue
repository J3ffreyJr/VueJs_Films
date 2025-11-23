<template>
  <div id="app">
    <div v-if="loading" class="loading">
      <h1>🎬 YTS Clone</h1>
      <p>Carregando...</p>
    </div>
    <div v-else>
      <Header />
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    console.log('App mounted - Vue está funcionando!')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0f0f0f;
  color: #fff;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f0f0f;
}

.loading h1 {
  color: #e50914;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.loading p {
  color: #ccc;
  font-size: 1.2rem;
}
</style>