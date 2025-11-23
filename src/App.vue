<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
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

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b8070f;
}

/* Selection Styling */
::selection {
  background: #e50914;
  color: #fff;
}

/* Focus Outline */
button:focus,
input:focus,
select:focus {
  outline: 2px solid #e50914;
  outline-offset: 2px;
}

/* Responsive Images */
img {
  max-width: 100%;
  height: auto;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.text-red {
  color: #e50914;
}

.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.p-4 { padding: 1rem; }

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
</style>