const express = require('express');
const router = express.Router();


function isSuperAdmin(req, res, next) {
  if (req.user && req.user.class === 'SUPERADMIN') {
    next();
  } else {
    res.status(403).send('Accès refusé. Réservé au SUPERADMIN.');
  }
}


router.get('/', isSuperAdmin, (req, res) => {
  res.render('superadmin/dashboard'); 
});

module.exports = router;
