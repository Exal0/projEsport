const authguard = require('../services/authguard')
const {PrismaClient} = require('@prisma/client')
const JoueurRouter = require('express').Router()
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

JoueurRouter.get('/subscribe', (req, res) => {
    res.render("pages/subscribe.twig", {
        title: "Inscription",
        error: null
    })
})



JoueurRouter.post('/subscribe', async (req, res) => {
    try {
        const { email, password, pseudo, confirm_password } = req.body

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" })
        }

        const existpseudo = await prisma.player.findUnique({ where: { pseudo } });
        if (existpseudo) {
            return res.render('pages/subscribe.twig', { error: "Ce pseudo est déjà utilisé" });
        }

        const existingemail = await prisma.player.findUnique({ where: { email } });
        if (existingemail) {
            return res.render('pages/subscribe.twig', { error: "Cet email est déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const player = await prisma.player.create({
            data: {
                email: email,
                password: hashedPassword,
                pseudo: pseudo,
                confirm_password: hashedPassword,
                class: 'USER'
            }
        })

        return res.redirect('/login')
       
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erreur serveur" })
    }

    
})




JoueurRouter.get('/login', (req, res)=> {
res.render('pages/login.twig', {title: "Connexion"})


})





module.exports = JoueurRouter