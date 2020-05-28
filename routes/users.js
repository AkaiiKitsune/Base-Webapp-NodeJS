const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Init models
let User = require('../models/user');

// Register Form (GET)
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Register Process (POST)
router.post('/register', [
    check('password')
        .isLength({ min:8 }).withMessage("Mot de passe trop court (min : 8 characteres)")
        .matches('[0-9]').withMessage("Le mot de passe doit contenir au moins 1 chiffre")
        .matches('[a-z]').withMessage("Le mot de passe doit contenir au moins 1 minuscule")
        .matches('[A-Z]').withMessage("Le mot de passe doit contenir au moins 1 majuscule")
        .custom((value, {req, loc, path}) => {         // check si les mot de passes correspondent
            if (value !== req.body.password2) {
                return false;
            } else {
                return value;
            }
        }).withMessage("Les mots de passe ne correspondent pas")
    ], (req, res) => {
         
    //Get errors
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('users/register', {
            errors: errors.errors
        });
    }else{
        const username = req.body.username;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;

        let newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) console.error(err);

                newUser.password = hash;
                newUser.save( () => {
                    if(err) console.error(err);
                    else { 
                        req.flash('success', 'Inscription réussie');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

// Login Form (GET)
router.get('/login', (req, res) => {
    res.render('users/login');
});

// Login Form (POST)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Vous avez été déconnecté');
    res.redirect('/users/login');
});


module.exports = router;