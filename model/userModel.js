const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
Name:{
    type: String, 
    required: true
},
Password:{
    type: String,
    required: true
},
todos:[{
    type: mongoose.Schema.Types.ObjectId, ref: "Todo"
}]
});

module.exports = mongoose.model('User', userSchema)