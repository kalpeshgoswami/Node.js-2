import passport from "passport";
import googlePassport from "passport-google-oauth20"
import User from "../model/userModel.js"
import dotenv from "dotenv";

dotenv.config();

const googleStrategy = googlePassport.Strategy;

passport.use(
    new googleStrategy(
        {

            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, done) {

            try {

                const user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    const newUser = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0]?.value,
                    })
                    return done(null, newUser)
                }
                return done(null, user);

            } catch (error) {

                console.log(error.message);
            }
        }
    )
)

export default passport