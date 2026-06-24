import expresse from "express"

const router = expresse.Router();

router.get("/login", (req, res, next) => {
    res.render("login")
})

export default router;