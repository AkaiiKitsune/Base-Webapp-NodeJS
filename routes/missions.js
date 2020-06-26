const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Missionnaire = require('../models/missionnaire');
let User = require('../models/user');


// Add mision route (GET)
router.get('/add', ensureAuthenticated, (req, res) => {
    User.findById(req.user._id, (err, user) => { if (err) return console.error(err);
        Missionnaire.findById(user.missionnaire, (err, missionnaire) => {
            Missionnaire.find({}).then(function (missionnaires) {
                    if (err) return console.error(err);
                    res.render('missions/add_mission', {
                        title: "Ajouter une mission",
                        user: req.user,
                        missionnaire: missionnaire,
                        missionnaires: missionnaires
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


module.exports = router;