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
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Quick search..."
            class="search-input"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-btn">
            🔍
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/browse',
          query: { search: this.searchQuery.trim() }
        });
        this.searchQuery = '';
      }
    }
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-bottom: 3px solid #e50914;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
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
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e50914;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.nav {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e50914;
  background: rgba(229, 9, 20, 0.1);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #e50914;
  border-radius: 2px;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-input {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  width: 200px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn {
  background: #e50914;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #b8070f;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    order: 3;
    width: 100%;
    justify-content: space-around;
  }

  .search-box {
    order: 2;
    width: 100%;
    max-width: 300px;
  }

  .search-input {
    width: 100%;
  }

  .nav-link.router-link-active::after {
    bottom: -8px;
  }
}
</style>