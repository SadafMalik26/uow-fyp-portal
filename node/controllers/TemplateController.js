const asyncHandler = require("express-async-handler");

const Template = require("../models/TemplateModel");
var fs = require('fs');

const get = asyncHandler(async (req, res) => {
    try {
        const templates = await Template.find()
        res.status(200).json({ templates });
    } catch (err) {
        res.status(500).json({ 'message': e });

    }

})

const add = asyncHandler(async (req, res) => {

    try {

        const { title } = req.body
        const document = {
            data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
        }
        const template = await Template.create({
            document, title
        });

        if (template) {
            res.status(200).json({ 'message': "Succussfully Added" });
        } else
            throw new Error("error");

    } catch (err) {
        res.status(500).json({ 'message': e });

    }
})

const update = asyncHandler(async (req, res) => {

    try {
        const { title } = req.body
        const document = {
            data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
            
        }
        const template = await Template.findOneAndUpdate({title},{document})
        if (template) {
            res.status(200).json({ 'message': "Succussfully Added" });
        } else
            throw new Error("error");
    } catch (err) {
        throw new Error(err);

    }
})

module.exports = { add, get ,update};