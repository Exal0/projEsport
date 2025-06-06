const express = require('express')
const JoueurRouter = require('./router/JoueurRouter')

const session = require('express-session')






const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret : "alexLaChips",
    resave: false,
    saveUninitialized: true,
}))


app.use(JoueurRouter)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})