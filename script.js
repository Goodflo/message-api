const jsonServer = require("json-server");
const express = require('express');
const mongoose = require("mongoose");
const Message = require('./model/messageModel');


const server = jsonServer.create();
const router = jsonServer.router("db.json");
const  middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000

server.use(middlewares);
server.use(router);



const app = express();


//json middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
   
     let greetings = "welcome TO, ALUX-API";
    res.send(greetings.toUpperCase());
   
    
})
//FETCH ALL DATA
app.get('/message', async(req, res) =>{
    try {
        const messages = await Message.find().then({});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//UPDATE MESSAGE
app.put('/message/:id', async(req, res)=>{
    try {
        // let message = {};
        const {id} = req.params;
       const messages = await Message.findByIdAndUpdate(id, req.body);
       if(!messages){
         return res.status(404).json({message: "Cannot not find message by " + id });
       } 
        res.status(200).json(messages)
   

   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//ADD MESSAGE
app.post('/message', async(req, res) =>{
    try {
       const message = await Message.create(req.body)
       res.status(200).json(message);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// DELETE MESSAGE
app.delete('/message/:id', async(req, res)=>{
    const {id} = req.params;
    const messages = await Message.findByIdAndDelete(id);
    if (!messages) {
        return res.status(404).json({message: "Cannot delete message by ID" + id + " check the ID"})
    }
    res.status(200).json("Successfully deleted message with ID" + id)
}) 

// Connecting to the MongoDB
mongoose.connect("mongodb+srv://wisdom:wisdom2502@aluxapi.2ewxrpe.mongodb.net/alux-API?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to DB")

//Setting Port 
    //     app.listen(3000, () => {
    //   console.log('Listening on port');
})

//Catching some Erorrs
// }).catch((error)=>{
//     console.log(error);
// });


server.listen(port);