<template>
  <div class="browse">
    <div class="container">
      <div class="browse-layout">
        <!-- Sidebar Filters -->
        <aside class="sidebar">
          <SearchFilters 
            :current-filters="activeFilters"
            @filters-changed="handleFiltersChange"
          />
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <div class="content-header">
            <h1>🎬 Browse Movies</h1>
            <div class="results-info">
              <span class="results-count">{{ totalMovies }} movies found</span>
              <div class="view-options">
                <button 
                  :class="['view-btn', { active: viewMode === 'grid' }]"
                  @click="viewMode = 'grid'"
                >
                  ▦ Grid
                </button>
                <button 
                  :class="['view-btn', { active: viewMode === 'list' }]"
                  @click="viewMode = 'list'"
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>

          <div v-if="searchQuery" class="search-query">
            <h3>Search results for: "{{ searchQuery }}"</h3>
            <button @click="clearSearch" class="clear-search">× Clear</button>
          </div>

          <MovieGrid 
            :movies="movies"
            :loading="loading"
            :view-mode="viewMode"
          />

          <div v-if="!loading && movies.length > 0" class="pagination">
            <button 
              @click="loadPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              ← Previous
            </button>
            
            <span class="page-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            
            <button 
              @click="loadPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              Next →
            </button>
          </div>

          <div v-if="!loading && movies.length === 0" class="no-results">
            <div class="no-results-content">
              <h3>🎭 No movies found</h3>
              <p>Try adjusting your search criteria or filters.</p>
              <button @click="clearAll" class="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { ytsAPI, transformMovieData } from '@/services/yts-api';
import SearchFilters from '@/components/SearchFilters.vue';
import MovieGrid from '@/components/MovieGrid.vue';

export default {
  name: 'Browse',
  components: {
    SearchFilters,
    MovieGrid
  },
  data() {
    return {
      movies: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
      totalMovies: 0,
      viewMode: 'grid',
      activeFilters: {
        quality: '',
        genre: '',
        minimum_rating: '0',
        sort_by: 'download_count',
        order_by: 'desc'
      },
      searchQuery: ''
    };
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.handleRouteQuery(query);
      },
      immediate: true
    }
  },
  methods: {
    async handleRouteQuery(query) {
      this.searchQuery = query.search || '';
      
      const filters = { ...this.activeFilters };
      
      if (this.searchQuery) {
        filters.query_term = this.searchQuery;
      }
      
      await this.loadMovies(filters);
    },
    
    async loadMovies(filters = {}) {
      this.loading = true;
      
      try {
        const response = await ytsAPI.listMovies({
          page: this.currentPage,
          ...filters
        });
        
        const data = response.data.data;
        this.movies = data.movies.map(transformMovieData);
        this.totalMovies = data.movie_count;
        this.totalPages = Math.ceil(data.movie_count / 20);
      } catch (error) {
        console.error('Error loading movies:', error);
        this.movies = this.getMockMovies();
        this.totalMovies = this.movies.length;
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },
    
    handleFiltersChange(filters) {
      this.activeFilters = filters;
      this.currentPage = 1;
      this.loadMovies(filters);
    },
    
    async loadPage(page) {
      if (page < 1 || page > this.totalPages) return;
      
      this.currentPage = page;
      await this.loadMovies(this.activeFilters);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    clearSearch() {
      this.$router.push({ query: { ...this.$route.query, search: undefined } });
    },
    
    clearAll() {
      this.activeFilters = {
        quality: '',
        genre: '',
        minimum_rating: '0',
        sort_by: 'download_count',
        order_by: 'desc'
      };
      this.searchQuery = '';
      this.currentPage = 1;
      this.$router.push({ query: {} });
    },
    
    getMockMovies() {
      // Return mock data similar to Home.vue
      return [...Array(20)].map((_, index) => ({
        id: index + 1,
        title: `Movie Title ${index + 1}`,
        year: 2020 + (index % 4),
        rating: (5 + Math.random() * 5).toFixed(1),
        runtime: 90 + (index * 10) % 120,
        genres: ['Action', 'Drama', 'Comedy'].slice(0, 1 + index % 3),
        summary: 'This is a movie summary that describes the plot and main characters of the film.',
        medium_cover_image: '/placeholder-movie.jpg',
        download_count: Math.floor(Math.random() * 1000000),
        torrents: [{ quality: '1080p' }, { quality: '720p' }]
      }));
    }
  }
};
</script>

<style scoped>
.browse {
  min-height: 100vh;
  background: #0f0f0f;
  padding: 2rem 0;
}

.browse-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h1 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #333;
}

.results-count {
  color: #ccc;
  font-weight: 500;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  background: #333;
  color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn.active,
.view-btn:hover {
  background: #e50914;
  color: #fff;
}

.search-query {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #e50914;
}

.search-query h3 {
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
}

.clear-search {
  background: transparent;
  border: 1px solid #e50914;
  color: #e50914;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.clear-search:hover {
  background: #e50914;
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid #333;
}

.pagination-btn {
  background: #333;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #e50914;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  color: #ccc;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-content h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.no-results-content p {
  color: #ccc;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #e50914;
  color: #fff;
}

.btn-primary:hover {
  background: #b8070f;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .browse-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .sidebar {
    order: 2;
  }
  
  .main-content {
    order: 1;
  }
}

@media (max-width: 768px) {
  .browse {
    padding: 1rem 0;
  }
  
  .results-info {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .search-query {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>