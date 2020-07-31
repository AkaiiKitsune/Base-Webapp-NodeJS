const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');
let User = require('../models/user');
let Emplacement = require('../models/emplacement');
let Mission = require('../models/mission');


// Add miSsion route (GET)
router.get('/add', ensureAuthenticated, ensureMissionnaire, (req, res) => {
    Emplacement.find({}).sort([['batiment', 1]]).then( (emplacements) => {
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

// Add mision route (POST)
router.post('/add', ensureAuthenticated, ensureMissionnaire, (req, res) => {
    let mission = new Mission();

    //On renseigne ses valeurs
    User.findById(req.user._id, (err, user) => { if (err) return console.error(err);
        Missionnaire.findById(user.missionnaire, (err, missionnaire) => { if (err) return console.error(err);

            let missionnaires = JSON.parse(req.body.missionnaires);

            mission.createur = missionnaire._id;
            mission.dateArrivee = req.body.dateArrivee;
            mission.heureArrivee = req.body.heureArrivee;
            mission.dateDepart = req.body.dateDepart;
            mission.heureDepart = req.body.heureDepart;
            mission.missionnaires = missionnaires;
            mission.lieuInstallation = req.body.lieuInstallation;
            mission.alimElectrique = req.body.alimElectrique;
            mission.alimSecourue = req.body.alimSecourue;

            console.log(mission);

            mission.save((err) => {
                if(err) { 
                    console.error(err); 
                    req.flash('danger', 'Erreur lors de l\'ajout de la mission');
                    res.redirect('/users/profile');
                } 
                else {
                    req.flash('success', 'Mission ajoutée');
                    res.redirect('/users/profile');
                }
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