const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Init models
let Missionnaire = require('../models/missionnaire');
let User = require('../models/user');
let Mission = require('../models/mission');

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
        const email = req.body.email;
        const password = req.body.password;

        let newUser = new User({
            email:email,
            username:username,
            password:password,
            missionnaire:'000000000000'
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
        successRedirect:'/users/profile',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

// Profile (GET)
router.get('/profile', ensureAuthenticated, (req, res) => {
    // Verifie si un missionnaire est attribué a l'utilisateur
    User.findById(req.user._id, (err, person) => { if (err) return console.error(err);
        //Si on trouve un id, on recupere ensuite les infos de celui-ci
        Missionnaire.findById(person.missionnaire, (err, person) => {
            if (err) return console.error(err);
            if(!person) {
                req.flash('danger', 'Veuillez renseigner vos informations');
                res.render('users/profile', {
                    title: "Profil de " + req.user.username,
                    user: req.user,
                    missionnaire: person
                });
            }else{
                //Mission.find( { missionnaires : person._id.toString() }, (err, missions) => {
                Mission.find( {missionnaires: {$elemMatch: {"id" : person._id.toString()}}}, (err, missions) => {

                    //Et on Affiche la page
                    res.render('users/profile', {
                        title: "Profil de " + req.user.username,
                        user: req.user,
                        missionnaire: person,
                        missions: missions
                    });
                });
            }
        });
    });
});

// Profile Edit (GET)
router.get('/profile/edit', ensureAuthenticated, (req, res) => {
    User.findById(req.user._id, (err, person) => { if (err) return console.error(err);
        //Si on trouve un id, on recupere ensuite les infos de celui-ci
        Missionnaire.findById(person.missionnaire, (err, person) => {
            if (err) return console.error(err);

            let cardtitle = "Edition du profil";

            if(!person) {
                cardtitle = 'Creation du profil';
                person = new Missionnaire();
            }

            res.render('users/edit_profile', {
                title: "Profil de " + req.user.username,
                cardtitle: cardtitle,
                user: req.user,
                missionnaire: person
            });
        });
    });
});

// Profile Edit (POST)
router.post('/profile/edit', ensureAuthenticated, (req, res) => {
    // Verifie si un missionnaire est attribué a l'utilisateur
    User.findOne({ '_id': req.user._id }, 'missionnaire', (err, person) => { if (err) return console.error(err);

        //On supprime un eventuel ancien profil
        Missionnaire.deleteOne({ '_id': person.missionnaire }, (err) => { if (err) return console.error(err); });
        //Ensuite on crée un objet missionnaire
        missionnaire = new Missionnaire();
        
        User.updateOne({'_id': req.user._id }, {'missionnaire' : missionnaire._id}, (err) => { if (err) return console.error(err); });

        //On renseigne ses valeurs
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
            if(err) { console.error(err); } 
            else {
                req.flash('success', 'Profil mis a jour');
                res.redirect('/users/profile');
            }
        });
    });
});


//Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Vous avez été déconnecté');
    res.redirect('/users/login');
});


module.exports = router;