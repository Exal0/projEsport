const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


function isAdmin(req, res, next) {
  if (req.user && req.user.class === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ error: "Accès refusé : admin uniquement" });
}


router.post('/tournois', isAdmin, async (req, res) => {
  const { title, description, date, image } = req.body;

  try {
    const tournoi = await prisma.tournament.create({
      data: {
        title,
        description,
        image,
        Date: new Date(date),
        createdById: req.user.id, 
      },
    });

    res.status(201).json(tournoi);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du tournoi" });
  }
});


module.exports = router;
