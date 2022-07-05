const { Op } = require('sequelize');
const db = require('../models');
const { genSalt, hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const userJwtSecret = process.env.JWTSECRET || "abc@123"

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).send({
                msg: "some fields are empty",
                status: false
            })
        }
        const isUserExist = await db.User.findOne({
            where: {
                email: {
                    [Op.like]: '%' + email + '%'
                }
            },
        });

        if (isUserExist) {
            const isMatch = await compare(password, isUserExist.password);
            if (isMatch) {
                const payload = {
                    userid: isUserExist.id
                }
                const token = await sign(payload, userJwtSecret, {
                    expiresIn: '200h'
                });
                res.status(200).send({
                    msg: "successfully login",
                    token: token,
                    userid: isUserExist.id,
                    status: true
                })
            } else {
                res.status(200).send({
                    msg: "Please enter correct Password",
                    status: false
                })
            }
        } else {
            res.status(200).send({
                msg: "User not found",
                status: false
            })
        }
    } catch (error) {
        console.error(`login in userroute get err --> ${error}`);
        return res.status(400).send({
            msg: "some error is occured"
        })
    }
}

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExist = await db.User.findOne({
            where: {
                email: {
                    [Op.like]: '%' + email + '%'
                }
            }
        });
        if (!isUserExist) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            if (hashedPassword) {
                req.body.password = hashedPassword;
                const result = await db.User.create(req.body)
                if (result) {
                    res.status(200).send({
                        msg: "user successfully registered",
                        status: true
                    })
                } else {
                    res.status(500).send({
                        status: false,
                        message: "some Internal error occur"
                    })
                }
            }
        } else {
            res.status(200).send({
                msg: "User is already Exist",
                status: false
            })
        }
    } catch (err) {
        console.error(` you got an error on signup routes ${err}`)
        res.status(400).send({
            status: false,
            message: err
        })
    }
}


// module.exports = userController;