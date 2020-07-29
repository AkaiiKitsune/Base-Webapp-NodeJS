let mongoose = require('mongoose');

//Article schema
let missionSchema = mongoose.Schema({
    createur:{
        type: String,
        required: true
    },
    dateArrivee:{
        type: String,
        required: true
    },
    heureArrivee:{
        type: String,
        required: true
    },
    dateDepart:{
        type: String,
        required: true
    },
    heureDepart:{
        type: String,
        required: true
    },
    missionnaires:{
        type: Array,
        required: true
    },
    lieuInstallation:{
        type: String,
        required: true
    },
    alimElectrique:{
        type: Number,
        required: true
    },
    alimSecourue:{
        type: String,
        required: true
    },
    chambre:{
        type: String,
        required: false
    }
});

const Mission = module.exports = mongoose.model('Mission', missionSchema);