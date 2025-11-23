import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const ytsAPI = {
  // Listar filmes
  listMovies: (params = {}) => {
    const defaultParams = {
      limit: 20,
      page: 1,
      quality: '1080p',
      sort_by: 'download_count',
      order_by: 'desc'
    };
    
    return api.get('/list_movies.json', {
      params: { ...defaultParams, ...params }
    });
  },

  // Detalhes do filme
  getMovieDetails: (movieId) => 
    api.get(`/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`),

  // Sugestões de filmes
  getMovieSuggestions: (movieId) => 
    api.get(`/movie_suggestions.json?movie_id=${movieId}`),

  // Pesquisa de filmes
  searchMovies: (query, params = {}) => 
    api.get('/list_movies.json', {
      params: { query_term: query, ...params }
    }),
};

// Helper para transformar dados da API
export const transformMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  year: movie.year,
  rating: movie.rating,
  runtime: movie.runtime,
  genres: movie.genres || [],
  summary: movie.summary,
  description: movie.description_full,
  language: movie.language,
  mpa_rating: movie.mpa_rating,
  background_image: movie.background_image,
  background_image_original: movie.background_image_original,
  small_cover_image: movie.small_cover_image,
  medium_cover_image: movie.medium_cover_image,
  large_cover_image: movie.large_cover_image,
  yt_trailer_code: movie.yt_trailer_code,
  torrents: movie.torrents || [],
  cast: movie.cast || [],
  like_count: movie.like_count,
  download_count: movie.download_count
});