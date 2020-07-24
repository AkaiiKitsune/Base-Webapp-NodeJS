let mongoose = require('mongoose');

//Article schema
let emplacementSchema = mongoose.Schema({
    batiment:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        required: true
    }
});

const Emplacement = module.exports = mongoose.model('Emplacement', emplacementSchema);