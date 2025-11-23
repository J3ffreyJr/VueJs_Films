<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🎬</span>
          <span class="logo-text">YTS Clone</span>
        </div>

        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/browse" class="nav-link">Browse Movies</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: #1a1a1a;
  border-bottom: 3px solid #e50914;
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e50914;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e50914;
  background: rgba(229, 9, 20, 0.1);
}
</style>