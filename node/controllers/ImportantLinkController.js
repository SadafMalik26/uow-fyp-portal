
const asyncHandler = require("express-async-handler");

const ImportantLink = require("../models/ImportantLinkModel");
const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const links = await ImportantLink.find({})
    if(links)
    {
      res.status(200).json({links});

    }
})

const add = asyncHandler(async (req, res) => {
try {
    const {title,description,url} = req.body
    const link = await ImportantLink.create({
        title,description,url
      });
      
      if(link)
      {
        res.status(200).json({ 'message': "Success!" });

      }
} catch (err) {
    console.log(err)
}
})

module.exports = {get,add};
