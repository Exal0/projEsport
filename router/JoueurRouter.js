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

        

        const hashedPassword = await bcrypt.hash(password, 10)

        const player = await prisma.player.create({
            data: {
                email: email,
                password: hashedPassword,
                pseudo: pseudo,
                confirm_password: hashedPassword,
                part: 'USER'
            }
        })

        return res.redirect('/login')
       
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erreur serveur" })
    }

    
})


JoueurRouter.get('/login', (req, res) => {
    res.render('pages/login.twig', {
        title: "Connexion",
        error: null
    });
});


JoueurRouter.post('/login', async (req, res) => {
    const { pseudo, password } = req.body;

    try {
       
        const player = await prisma.player.findFirst({ where: { pseudo } });

        if (!player) {
            return res.render('pages/login.twig', { 
                title: "Connexion",
                error: "Pseudo ou mot de passe incorrect"
            });
        }

        
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.render('pages/login.twig', {
                title: "Connexion",
                error: "Pseudo ou mot de passe incorrect"
            });
        }

       
        req.session.user = {
            id: user.id,
            pseudo: user.pseudo,
           part: user.part
        };

       
        return res.redirect('/home');
    } catch (error) {
        console.error(error);
        return res.status(500).render('pages/login.twig', {
            title: "Connexion",
            error: "Erreur serveur"
        });
    }
});


JoueurRouter.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('pages/home.twig', {
        title: "Accueil",
        user: req.session.user
    });
});



JoueurRouter.get('/login', (req, res)=> {
res.render('pages/login.twig', {title: "Connexion"})


})





module.exports = JoueurRouter