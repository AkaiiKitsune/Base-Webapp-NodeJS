let mongoose = require('mongoose');

//User schema
let missionnaireSchema = mongoose.Schema({
    //Missionnaire
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    dateNaissance:{
        type: String,
        required: true
    },
    telephone:{
        type: Number,
        required: true
    },
    numSecuriteSociale:{
        type: Number,
        required: true
    },
    adresseFacturation:{
        type: String,
        required: false
    },
    
    //Compagnie
    numSiret:{
        type: Number,
        required: true
    },
    nomEntreprise:{
        type: String,
        required: true
    },
    adresseEntreprise:{
        type: String,
        required: true
    },

    //Miscellaneous
    createur:{
        type: String,
        required: true
    }
});

const Missionnaire = module.exports = mongoose.model('Missionnaire', missionnaireSchema);