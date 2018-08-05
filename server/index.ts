import * as Express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as Sequelize from "sequelize"
import * as passport from "passport"
import * as path from "path"
const dotenv = require("dotenv")
dotenv.config()
import authRouter from "./api/auth/index"
import apiRouter from "./api/index"
import configurePassport from "./config/configurePassport"

import "./api/models/"

const app = Express()
const PORT: number = Number(process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(Express.static("static"))
configurePassport(app)
app.use("/api/auth", authRouter)
app.use("/api", apiRouter)
app.get("/", function(req, res){
	res.sendFile(path.resolve(__dirname, "../static/index.html"))
})


app.listen(PORT, function(){
	console.log(`Server is listening on PORT ${PORT}`)
})
