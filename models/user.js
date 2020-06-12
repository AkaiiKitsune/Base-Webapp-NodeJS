let mongoose = require('mongoose');

//User schema
let userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }, 
    missionnaire:{
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', userSchema);