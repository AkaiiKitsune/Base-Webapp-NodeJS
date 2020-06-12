const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
// let Missionnaire = require('../models/missionnaire');


// Add missionnaire route (GET)
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('missions/add_mission', {
        title: "Ajouter une mission"
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