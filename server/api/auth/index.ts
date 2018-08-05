import {Router} from "express"
import * as passport from "passport"
import * as jwt from "jsonwebtoken"

const auth = Router()

auth.get("/twitter", function(req, res, next) {
	debugger
	passport.authenticate("twitter", {session: false}, function(err, user, info){
		if(err || !user){
			return res.status(400).json({
				message: "Login failed",
				user: user
			})
		}

		req.login(user, {session: false}, function(err){
			if(err){
				res.send(err)
			}

			const token = jwt.sign(user, "secret")

			return res.json({
				user, token
			})
		})
	})
})


export default auth