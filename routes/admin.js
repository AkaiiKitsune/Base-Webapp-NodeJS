const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let User = require('../models/user');
let Emplacement = require('../models/emplacement');

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