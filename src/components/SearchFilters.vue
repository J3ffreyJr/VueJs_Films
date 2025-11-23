<template>
  <div class="search-filters">
    <div class="filters-header">
      <h3>🔍 Filter Movies</h3>
      <button @click="clearFilters" class="clear-btn">Clear All</button>
    </div>

    <div class="filter-group">
      <label>Quality</label>
      <select v-model="filters.quality" class="filter-select">
        <option value="">All Quality</option>
        <option value="2160p">4K (2160p)</option>
        <option value="1080p">1080p</option>
        <option value="720p">720p</option>
        <option value="3D">3D</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Genre</label>
      <select v-model="filters.genre" class="filter-select">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Rating</label>
      <select v-model="filters.minimum_rating" class="filter-select">
        <option value="0">All Ratings</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Sort By</label>
      <select v-model="filters.sort_by" class="filter-select">
        <option value="download_count">Most Downloaded</option>
        <option value="year">Newest</option>
        <option value="rating">Highest Rated</option>
        <option value="title">Title</option>
        <option value="like_count">Most Liked</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Order</label>
      <select v-model="filters.order_by" class="filter-select">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>

    <div class="filter-actions">
      <button @click="applyFilters" class="apply-btn">Apply Filters</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchFilters',
  props: {
    currentFilters: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      filters: {
        quality: '',
        genre: '',
        minimum_rating: '0',
        sort_by: 'download_count',
        order_by: 'desc'
      },
      genres: [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
        'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
        'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller',
        'War', 'Western'
      ]
    };
  },
  watch: {
    currentFilters: {
      handler(newFilters) {
        this.filters = { ...this.filters, ...newFilters };
      },
      immediate: true
    }
  },
  methods: {
    applyFilters() {
      this.$emit('filters-changed', { ...this.filters });
    },
    
    clearFilters() {
      this.filters = {
        quality: '',
        genre: '',
        minimum_rating: '0',
        sort_by: 'download_count',
        order_by: 'desc'
      };
      this.$emit('filters-changed', { ...this.filters });
    }
  }
};
</script>

<style scoped>
.search-filters {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.filters-header h3 {
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
}

.clear-btn {
  background: transparent;
  border: 1px solid #e50914;
  color: #e50914;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #e50914;
  color: #fff;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-group label {
  display: block;
  color: #ccc;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  border-color: #e50914;
}

.filter-select option {
  background: #2d2d2d;
  color: #fff;
}

.filter-actions {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.apply-btn {
  width: 100%;
  background: #e50914;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:hover {
  background: #b8070f;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .search-filters {
    padding: 1rem;
  }
  
  .filters-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>