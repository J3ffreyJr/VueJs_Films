<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Download YIFY Movies: HD Small Size</h1>
        <p class="hero-subtitle">
          Welcome to the official YTS.MX website. Here you can browse and download 
          YIFY movies in excellent 720p, 1080p, and 3D quality, all at the smallest file size.
        </p>
        <div class="hero-actions">
          <router-link to="/browse" class="btn btn-primary">
            🎬 Browse Movies
          </router-link>
          <button @click="scrollToLatest" class="btn btn-secondary">
            🔥 Latest Movies
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Movies -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2>🔥 Featured Movies</h2>
          <router-link to="/browse" class="see-all">See All →</router-link>
        </div>
        
        <MovieGrid :movies="featuredMovies" :loading="loading" />
      </div>
    </section>

    <!-- Latest Movies -->
    <section ref="latestSection" class="latest-section">
      <div class="container">
        <div class="section-header">
          <h2>🎬 Latest Movies</h2>
          <div class="sort-options">
            <button 
              v-for="option in sortOptions" 
              :key="option.value"
              :class="['sort-btn', { active: currentSort === option.value }]"
              @click="sortMovies(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        
        <MovieGrid :movies="latestMovies" :loading="loading" />
        
        <div class="load-more">
          <button 
            @click="loadMore" 
            class="load-more-btn"
            :disabled="loadingMore"
          >
            {{ loadingMore ? 'Loading...' : 'Load More Movies' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ytsAPI, transformMovieData } from '@/services/yts-api';
import MovieGrid from '@/components/MovieGrid.vue';

export default {
  name: 'Home',
  components: {
    MovieGrid
  },
  data() {
    return {
      featuredMovies: [],
      latestMovies: [],
      loading: false,
      loadingMore: false,
      currentPage: 1,
      currentSort: 'download_count',
      sortOptions: [
        { label: 'Most Downloaded', value: 'download_count' },
        { label: 'Newest', value: 'year' },
        { label: 'Highest Rated', value: 'rating' }
      ]
    };
  },
  async mounted() {
    await this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      this.loading = true;
      
      try {
        // Load featured movies (highly rated)
        const featuredResponse = await ytsAPI.listMovies({
          limit: 8,
          minimum_rating: 8,
          sort_by: 'rating'
        });
        
        // Load latest movies
        const latestResponse = await ytsAPI.listMovies({
          limit: 20,
          sort_by: this.currentSort
        });
        
        this.featuredMovies = featuredResponse.data.data.movies.map(transformMovieData);
        this.latestMovies = latestResponse.data.data.movies.map(transformMovieData);
      } catch (error) {
        console.error('Error loading movies:', error);
        this.featuredMovies = this.getMockMovies().slice(0, 8);
        this.latestMovies = this.getMockMovies();
      } finally {
        this.loading = false;
      }
    },
    
    async sortMovies(sortBy) {
      this.currentSort = sortBy;
      this.loading = true;
      
      try {
        const response = await ytsAPI.listMovies({
          limit: 20,
          sort_by: sortBy
        });
        this.latestMovies = response.data.data.movies.map(transformMovieData);
      } catch (error) {
        console.error('Error sorting movies:', error);
        this.latestMovies = this.getMockMovies();
      } finally {
        this.loading = false;
      }
    },
    
    async loadMore() {
      this.loadingMore = true;
      this.currentPage++;
      
      try {
        const response = await ytsAPI.listMovies({
          limit: 20,
          page: this.currentPage,
          sort_by: this.currentSort
        });
        
        const newMovies = response.data.data.movies.map(transformMovieData);
        this.latestMovies = [...this.latestMovies, ...newMovies];
      } catch (error) {
        console.error('Error loading more movies:', error);
        this.currentPage--;
      } finally {
        this.loadingMore = false;
      }
    },
    
    scrollToLatest() {
      this.$refs.latestSection.scrollIntoView({ behavior: 'smooth' });
    },
    
    getMockMovies() {
      return [
        {
          id: 1,
          title: 'The Shawshank Redemption',
          year: 1994,
          rating: 9.3,
          runtime: 142,
          genres: ['Drama'],
          summary: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
          medium_cover_image: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
          download_count: 1500000,
          torrents: [{ quality: '1080p' }, { quality: '720p' }]
        },
        {
          id: 2,
          title: 'The Godfather',
          year: 1972,
          rating: 9.2,
          runtime: 175,
          genres: ['Crime', 'Drama'],
          summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
          medium_cover_image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
          download_count: 1200000,
          torrents: [{ quality: '1080p' }]
        }
      ];
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('https://images.unsplash.com/photo-1489599809505-7c8e1c8bfc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  padding: 8rem 0;
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
  flex-wrap: wrap;
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

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
}

.featured-section,
.latest-section {
  padding: 4rem 0;
  background: #0f0f0f;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  color: #fff;
  font-size: 2rem;
  margin: 0;
}

.see-all {
  color: #e50914;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.see-all:hover {
  color: #b8070f;
}

.sort-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sort-btn {
  background: #333;
  color: #ccc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.sort-btn.active,
.sort-btn:hover {
  background: #e50914;
  color: #fff;
}

.load-more {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  background: #e50914;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #b8070f;
  transform: translateY(-2px);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .featured-section,
  .latest-section {
    padding: 2rem 0;
  }
}
</style>