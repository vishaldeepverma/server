const db = require('../models');

exports.getUser = async (req, res) => {
    const tokenData = req.headers.tokenData;
    try {
        const userData = await db.User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: tokenData.userid },
        })
        if (userData) {
            res.status(200).send({
                data: userData,
                status: true
            })
        }
    } catch (error) {
        console.error(` you got an error on getUser routes ${err}`)
        res.status(400).send({
            status: false,
            message: err
        })
    }
}