const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');
let Emplacement = require('../models/emplacement');
let Mission = require('../models/mission');

// Admin route (GET)
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('admin/admin', {
        title: 'Admin panel'
    });
});

// Add location route (GET)
router.get('/add_location', ensureAuthenticated, (req, res) => {
    res.render('admin/add_location', {
        title: 'Admin panel'
    });
});

// Add location route (POST)
router.post('/add_location', ensureAuthenticated, (req, res) => {
    console.log(req.body);


    emplacement = new Emplacement();
    //On renseigne ses valeurs
    emplacement.batiment = req.body.batiment;
    emplacement.detail = req.body.detail;
    emplacement.chambre = req.body.chambre;

    emplacement.save((err) => {
        if(err) { console.error(err); } 
        else {
            req.flash('success', 'Emplacement ajouté');
            res.redirect('/admin');
        }
    });
});

// Attribuer chambre route (GET)
router.get('/attribuer_chambre', ensureAuthenticated, (req, res) => {
    Mission.find( {} ).sort([['dateArrivee', -1]]).then( (missions) => {
        let missionList = [];

        //On itere toutes les missions
        missions.forEach(mission => {
            missionList.push(mission);
        });

        //console.log(missionList);

        res.render('admin/liste_missions', {
            title: "Attribution des chambres",
            missions: missionList
        });
    });
});

// Edit mission route (GET)
router.get('/editer_mission/:id', ensureAuthenticated, (req, res) => {
    Mission.findById(req.params.id, (err, mission) => {
        Emplacement.find( {chambre : true} ).sort([['batiment', 1]]).then( (chambres) => {
            if(err){
                console.error(err);
            }else{
                res.render('admin/editer_mission', {
                    title: "Edit " + mission._id,
                    mission: mission,
                    chambres: chambres
                });
            }
        });
    });
});

// Edit mission route (POST)
router.post('/editer_mission/:id', ensureAuthenticated, (req, res) => {
    Mission.findById(req.params.id, (err, missionTemp) => {
        let mission = {};
        
        mission.createur = missionTemp._id;
        mission.dateArrivee = missionTemp.dateArrivee;
        mission.heureArrivee = missionTemp.heureArrivee;
        mission.dateDepart = missionTemp.dateDepart;
        mission.heureDepart = missionTemp.heureDepart;
        mission.missionnaires = missionTemp.missionnaires;
        mission.lieuInstallation = missionTemp.lieuInstallation;
        mission.alimElectrique = missionTemp.alimElectrique;
        mission.alimSecourue = missionTemp.alimSecourue;
        mission.chambre = req.body.chambre_id;

        let query = {_id:req.params.id};


        Mission.updateOne(query, mission, (err) => {
            if(err){
                console.error(err);
                return;
            }else{
                req.flash('success', 'Chambre Mise a Jour');
                res.redirect('/admin/attribuer_chambre');
            }
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

module.exports = router;