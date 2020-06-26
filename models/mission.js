let mongoose = require('mongoose');

//Article schema
let missionSchema = mongoose.Schema({
    dates:{
        type: String,
        required: true
    },
    missionnaires:{
        type: Array,
        required: true
    },
    gestionnaire:{
        type: String,
        required: true
    }
});

const Mission = module.exports = mongoose.model('Mission', missionSchema);