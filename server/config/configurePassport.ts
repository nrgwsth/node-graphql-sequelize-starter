import * as passport from "passport"
import * as TwitterStartegy from "passport-twitter"
import * as FacebookStrategy from "passport-facebook"
import * as JWTStrategy from "passport-jwt"

import {User} from "./../api/models/index"

export default function(app: Express.Application){
	passport.serializeUser(function(user: any, done) {
		done(null, user.id)
	})

	passport.deserializeUser(function(id: number, done) {
		User.findById(id).then(function(user: any) {
			done(null, user)
		})
		.catch(function(err){
			done(err, null)
		})
	})

	passport.use(new TwitterStartegy.Strategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
	    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	}, function(accessToken: string , refreshToken: string, profile: any, cb: any) {
		User.findOrCreate({
			where: {
				thirdPartyId: profile.id
			},
			defaults: {
				name: profile.displayName,
				profileImage: profile.photos,
				email: profile.email
			}
		}).spread(function(user: any, created: boolean){
			cb(null, user)
		})
	}))

	passport.use(new FacebookStrategy.Strategy({
		clientID: process.env.FACEBOOK_APP_ID,
	    clientSecret: process.env.FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:3000/auth/facebook/callback",
	    profileFields: ['id', 'displayName', 'photos', 'email']
	}, function(accessToken: string , refreshToken: string, profile: any, cb: any) {
		User.findOrCreate({
			where: {
				thirdPartyId: profile.id
			},
			defaults: {
				name: profile.displayName,
				profileImage: profile.photos,
				email: profile.email
			}
		}).spread(function(user: any, created: boolean){
			cb(null, user)
		})
	}))

	const opts: JWTStrategy.StrategyOptions = {
		jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: "secret",
		issuer: "http://localhost:3000",
		audience: "*"
	}

	passport.use(new JWTStrategy.Strategy(opts, function(jwt_payload, done){
		if(jwt_payload){
			done(null, jwt_payload)
		}
	}))
}

