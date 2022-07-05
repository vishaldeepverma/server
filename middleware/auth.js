const { verify } = require("jsonwebtoken");
const userJwtSecret = process.env.JWTSECRET || "abc@123"

const usercheckAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const isTokenValid = await verify(token, userJwtSecret);
        if (isTokenValid) {
            req.headers.tokenData = isTokenValid;
            next();
        } else {
            res.status(400).send({
                status: false,
                msg: "Authentication is required"
            })
        }
    } catch (err) {
        console.error(`middleware Got an error ${err}`);
        res.status(400).send({
            status: false,
            msg: 'Session has been expired Authentication required'
        })
    }


}

module.exports = usercheckAuth;