let mongoose = require('mongoose');

//Article schema
let emplacementSchema = mongoose.Schema({
    Batiment:{
        type: String,
        required: true
    },
    Detail:{
        type: String,
        required: true
    }
});

const Emplacement = module.exports = mongoose.model('Emplacement', emplacementSchema);