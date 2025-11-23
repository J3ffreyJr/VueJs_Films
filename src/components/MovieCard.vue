<template>
  <div class="movie-card" @click="goToDetail">
    <div class="movie-poster">
      <img
        :src="movie.medium_cover_image || '/placeholder-movie.jpg'"
        :alt="movie.title"
        class="poster-img"
        @error="handleImageError"
      />
      <div class="movie-overlay">
        <div class="rating">
          ⭐ {{ movie.rating }}/10
        </div>
        <div class="year">
          {{ movie.year }}
        </div>
        <div class="quality">
          {{ getBestQuality }}
        </div>
      </div>
    </div>
    
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      
      <div class="movie-meta">
        <span class="runtime">⏱️ {{ movie.runtime }} min</span>
        <span class="downloads">📥 {{ formatNumber(movie.download_count) }}</span>
      </div>
      
      <div class="movie-genres">
        <span
          v-for="genre in movie.genres.slice(0, 2)"
          :key="genre"
          class="genre-tag"
        >
          {{ genre }}
        </span>
      </div>
      
      <p class="movie-summary">
        {{ truncateSummary(movie.summary) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    getBestQuality() {
      if (!this.movie.torrents || this.movie.torrents.length === 0) return 'HD';
      const qualities = this.movie.torrents.map(t => t.quality);
      if (qualities.includes('2160p')) return '4K';
      if (qualities.includes('1080p')) return '1080p';
      if (qualities.includes('720p')) return '720p';
      return 'HD';
    }
  },
  methods: {
    goToDetail() {
      this.$router.push(`/movie/${this.movie.id}`);
    },
    
    handleImageError(event) {
      event.target.src = '/placeholder-movie.jpg';
    },
    
    truncateSummary(summary, length = 120) {
      if (!summary) return 'No summary available.';
      return summary.length > length ? summary.substring(0, length) + '...' : summary;
    },
    
    formatNumber(num) {
      if (!num) return '0';
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
    }
  }
};
</script>

<style scoped>
.movie-card {
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #333;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(229, 9, 20, 0.2);
  border-color: #e50914;
}

.movie-poster {
  position: relative;
  padding-top: 150%;
  overflow: hidden;
}

.poster-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .poster-img {
  transform: scale(1.05);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rating, .year, .quality {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.rating {
  align-self: flex-start;
  color: #f5c518;
}

.year {
  align-self: flex-start;
  background: rgba(229, 9, 20, 0.8);
}

.quality {
  align-self: flex-end;
  background: rgba(76, 175, 80, 0.8);
}

.movie-info {
  padding: 1.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #888;
}

.movie-genres {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.genre-tag {
  background: #333;
  color: #ccc;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.movie-summary {
  color: #999;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .movie-info {
    padding: 1rem;
  }
  
  .movie-title {
    font-size: 1rem;
  }
  
  .movie-summary {
    font-size: 0.85rem;
  }
}
</style>