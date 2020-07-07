const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Article = require('../models/article');
let User = require('../models/user');
let Emplacement = require('../models/emplacement');

// Add article route (GET)
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('test/test', {
        title: 'Add Article'
    });

    // let emplacement = new Emplacement();
    // emplacement.Batiment = "Ancien"
    // emplacement.Detail = "Chambre 1"

    // emplacement.save((err) => {
    //     if(err) {
    //         console.log(err);
    //     } 
    // });
});

// Add article route (POST)
router.post('/add', ensureAuthenticated, (req, res) => {
        // let article = new Article();
        // article.title = req.body.title;
        // article.author = req.user._id;
        // article.body = req.body.body;
   
        // article.save((err) => {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         req.flash('success', 'Article Added');
        //         res.redirect('/');
        //     }
        // });
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