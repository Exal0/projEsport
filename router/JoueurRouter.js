const authguard = require('../services/authguard')
const {PrismaClient} = require('@prisma/client')
const JoueurRouter = require('express').Router()


const prisma = new PrismaClient()

JoueurRouter.get('/subscribe', (req,res)=>{
    res.render("pages/subscribe.twig",
    {
        title: "Inscription"

    })
})



JoueurRouter.post("/subscribe", authguard, async(req,res)=>{
try {
    if (req.body.password === req.body.confirm_password){       
    
    const player = await prisma.player.create({
        data: {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password,
            game: req.body.game,
            role: req.body.role,
            rank: req.body.rank,
        }
    })2
alert("Inscription réussie")
        res.redirect("/login")
       
        
    }

    else throw ({confirm_password: "les mots de passe ne correspondent pas"})
}
 catch (error){
    if (error.code === "P2002"){
        error={email: "Cet email est déjà utilisé"}
        res.render("pages/subscribe.twig",{
            error: error,
            title: "Inscription"
        })
    }
}
})

JoueurRouter.get('/login', (req, res)=> {
res.render('pages/login.twig', {title: "Connexion"})


})





module.exports = JoueurRouter