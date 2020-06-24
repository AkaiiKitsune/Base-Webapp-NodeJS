const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');
let User = require('../models/user');


// Add missionnaire route (GET)
router.get('/add', ensureAuthenticated, (req, res) => {
    User.findById(req.user._id, (err, person) => {
        if (err) return console.error(err);
        //Si on trouve un id, on recupere ensuite les infos de celui-ci
        Missionnaire.findById(person.missionnaire, (err, person) => {
            if (err) return console.error(err);
            res.render('missions/add_mission', {
                title: "Ajouter une mission",
                user: req.user,
                missionnaire: person
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


module.exports = router;