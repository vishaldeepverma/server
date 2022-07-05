const db = require('../models');

exports.createUsertheme = async (req, res) => {
    const tokenData = req.headers.tokenData;
    const data = {
        ...req.body, userId: tokenData.userid
    }
    try {
        const userData = await db.Userstheme.create({
            ...data
        });
        return res.status(200).send({
            data: userData,
            status: true
        })
    } catch (error) {
        console.error(` you got an error on getUser routes ${err}`)
        res.status(400).send({
            status: false,
            message: err
        })
    }
}

exports.getUsertheme = async (req, res) => {
    const tokenData = req.headers.tokenData;
    try {
        const userData = await db.Userstheme.findOne({
            where: { userId: tokenData.userid },
        })
        return res.status(200).send({
            data: userData,
            status: true
        })
    } catch (error) {
        console.error(` you got an error on getUser routes ${err}`)
        res.status(400).send({
            status: false,
            message: err
        })
    }
}

exports.updatetheme = async (req, res) => {
    const tokenData = req.headers.tokenData;
    const userId = req.body.userid || tokenData.userid;
    const body = req.body;
    const updateObj = {
        theme: body.theme,
        title: body.title
    }
    try {
        const userData = await db.Userstheme.update(updateObj, {
            where: { userId: userId },
        })
        return res.status(200).send({
            data: userData,
            status: true
        })
    } catch (error) {
        console.error(` you got an error on update theme routes ${error}`)
        res.status(400).send({
            status: false,
            message: error
        })
    }
}

