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
    },
    chambre:{
        type: Boolean,
        required: false
    },
    status:{
        type: String,
        required: false
    }
});

const Emplacement = module.exports = mongoose.model('Emplacement', emplacementSchema);