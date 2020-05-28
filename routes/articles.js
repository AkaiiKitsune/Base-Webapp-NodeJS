const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

// Init models
let Article = require('../models/article');
let User = require('../models/user');

// Add article route (GET)
router.get('/add/', ensureAuthenticated, (req, res) => {
    res.render('articles/add_article', {
        title: 'Add Article'
    });
});

// Add article route (POST)
router.post('/add', ensureAuthenticated, (req, res) => {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.user._id;
        article.body = req.body.body;
   
        article.save((err) => {
            if(err) {
                console.log(err);
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        });
});

// Edit route (GET)
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err){
            console.error(err);
        }else{
            res.render('articles/edit_article', {
                title: "Edit",
                article: article
            });
        }
    });
});

// Edit route (POST)
router.post('/edit/:id', ensureAuthenticated, (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.updateOne(query, article, (err) => {
        if(err){
            console.error(err);
            return;
        }else{
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});

// Delete route
router.delete('/:id', ensureAuthenticated, (req, res) => {
    let query = {_id:req.params.id}

    Article.remove(query, (err) => {
        if(err){
            console.error(err);
        }
        req.flash('success', 'Article Deleted');
        res.send('Success')
    });
});

// Article route
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        User.findById(article.author, (err, user) => {
            res.render('articles/article', {
                article: article,
                author: user.name
            });
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

module.exports = router;