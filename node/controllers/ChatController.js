const asyncHandler = require("express-async-handler");

const Chat = require("../models/GroupChatModel");
const jwt = require("jsonwebtoken");

const chat = asyncHandler(async (req, res) => {
    try {
        const groupId = req.params.id
        
        const chats = await Chat.find({receiver:groupId}).populate("sender")
        if(chats){
            res.status(200).json({ chats });
            
        }
    } catch (err) {
        console.log(err)
    }
})

const sendMessage = asyncHandler(async (req, res) => {
try {
    const {id,message} = req.body
  const token = req.cookies.jwt
    
    const details = jwt.decode(token)
    const sender = details.user.id
    const userType = details.user.type
    
    const chat = await Chat.create({sender,userType,message,receiver:id
    })
    
    if(chat)
    {
        res.status(200).json({ 'message':"Successfully Sent" });
    
    }
} catch (err) {
    console.log(err)
}

})

module.exports = {chat,sendMessage};
