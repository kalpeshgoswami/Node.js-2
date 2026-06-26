import expresse from "express"
import passport from "../config/passport.js";

const router = expresse.Router();

router.get("/login", (req, res, next) => {
    res.render("login")
})

router.get("/google/login", passport.authenticate("google", { scope: [["email", ["profile"]]] }))

router.get("/google/redirect", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.send("This is callback URI")
})

export default router;