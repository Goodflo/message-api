
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true," Please be specific by clarifying the title" ]
        },

        body: {
            type: String,
            required: true
        }
    },
        {
            timestamps: true
        }

)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;