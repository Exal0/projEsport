module.exports = {
    content: [
      './views/**/*.twig', // Indique à Tailwind d'analyser tous les fichiers Twig
      './public/**/*.html', // Si tu as des fichiers HTML dans le dossier public
      './assets/js/**/*.js', // Si tu utilises des fichiers JS dans le dossier assets
    ],
    theme: {
      extend: {
        colors: {
          'blue-900': '#1E2A47', // Exemple d'ajout d'une couleur personnalisée
          'neon-green': '#39FF14', // Vert néon
        },
        backgroundImage: {
          'hero-background': "url('/images/hero-background.jpg')", // Exemple d'image d'arrière-plan
        },
      },
    },
    plugins: [],
  }
  