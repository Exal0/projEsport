const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  res.render('pages/home.twig', {
    title: 'Accueil'
  });
});

module.exports = router;
