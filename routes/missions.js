const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');
let User = require('../models/user');
let Emplacement = require('../models/emplacement');


// Add mision route (GET)
router.get('/add', ensureAuthenticated, ensureMissionnaire, (req, res) => {
    Emplacement.find({}).sort([['Batiment', 1]]).then( (emplacements) => {
        User.findById(req.user._id, (err, user) => { if (err) return console.error(err);
            Missionnaire.findById(user.missionnaire, (err, missionnaire) => {
                Missionnaire.find({}).then( (missionnaires) => {
                    if (err) return console.error(err);
                    res.render('missions/add_mission', {
                        title: "Ajouter une mission",
                        user: req.user,
                        missionnaire: missionnaire,
                        missionnaires: missionnaires,
                        emplacements: emplacements
                    });
                });
            });
        }); 
    });
});


//Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Connection Requise');
        res.redirect('/users/login');
    }
}

function ensureMissionnaire(req, res, next){
    User.findById(req.user._id, (err, user) => { if (err) return console.error(err);
        Missionnaire.findById(user.missionnaire, (err, missionnaire) => {
            if(missionnaire != null) return next();
            else {
                req.flash('danger', 'Profil non renseigné');
                res.redirect('/users/profile');
            }
        });
    });
}


module.exports = router;