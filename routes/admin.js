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


    emplacement.save((err) => {
        if(err) { console.error(err); } 
        else {
            req.flash('success', 'Emplacement ajouté');
            res.redirect('/admin');
        }
    });
});

// Add location route (GET)
router.get('/attribuer_chambre', ensureAuthenticated, (req, res) => {
    Mission.find( {} ).sort([['dateArrivee', -1]]).then( (missions) => {
        let missionList = [];

        //On itere toutes les missions
        missions.forEach(mission => {
            missionList.push(mission);
        });

        //console.log(missionList);

        res.render('admin/attribuer_chambre', {
            title: "Attribution des chambres",
            missions: missionList
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