const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');


// Add missionnaire route (GET)
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('missionnaires/add_missionnaire', {
        title: "Ajouter un missionnaire"
    });
});

// Add missionnaire route (POST)
router.post('/add', ensureAuthenticated, (req, res) => {
    let missionnaire = new Missionnaire();
    missionnaire.nom = req.body.nom;
    missionnaire.prenom = req.body.prenom;
    missionnaire.adresse = req.body.adresse;
    missionnaire.dateNaissance = req.body.dateNaissance;
    missionnaire.telephone = req.body.telephone;
    missionnaire.numSecuriteSociale = req.body.numSecuriteSociale;
    missionnaire.adresseFacturation = req.body.adresseFacturation;

    missionnaire.numSiret = req.body.numSiret;
    missionnaire.nomEntreprise = req.body.nomEntreprise;
    missionnaire.adresseEntreprise = req.body.adresseEntreprise;

    missionnaire.createur = req.user._id;

    missionnaire.save((err) => {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Missionnaire Ajouté');
            res.redirect('/');
        }
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