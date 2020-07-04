const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require('../models/user.model');
const { forwardAuthenticated } = require('../config/auth');

router.route('/login', forwardAuthenticated).get((req, res) => res.redirect('/login'));
router.route('/auth', forwardAuthenticated).get((req, res) => res.redirect('/auth'));

router.route('/').get(async(req,res) => {
    
    await User.find({}, (err, users) => {
        if(users.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(users);
        }
    })
});
// Login
router.route('/login').post(async(req,res) => {
    
    if(!req.body) {
        res.status('400').send('Preencher os campos obriatórios antes de enviar!');
        return;
    }
    await passport.authenticate('local')(req, res,() => {
        res.redirect('/api');
    }) 
});

// Logout
router.route('/logout').post(async(req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.status(200).redirect('/user/login');
})

// Register
router.route('/auth').post(async(req, res) => {
    if(!req.body) {
        return res.status(500).send('Informar todos os campos antes de enviar');
    }

    const {username, email, password, password2} = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }
    
      if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
    
      if (errors.length > 0) {
        res.send('Error to access');
      } else {
        User.findOne({ email: email, username: username }).then(user => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
            res.status(400).send('Email already exists');
          } else {
            const newUser = new User({
              username,
              email,
              password
            });
    
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {throw err;}
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    res.redirect('/api');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
      }
    });
    

router.route('/:id').get(async(req,res, next) => {

    if(!req.params.id) {
        res.status(500).send('Id do usuário não informado');
    }

    await User.findById(req.params.id, (err, user) => {
        if(err) {
            return next(err);
        } else if(!user) {
            return res.status(404).send('user não encontrado')
        } else {
            return res.status(200).send(user);
        }
    })
});


router.route('/:id').post(async(req,res, next) => {
    if(!req.params.id) {
        return res.status(500).send('Id não informado');
    }
    
    await User.findById(req.params.id, (err, user) => {
        if(err) {
            next(err);
        } else if(!user) {
            return res.status(404).send('User não encontrado')
        }else {
            user.total = req.body.total;
            user.productId = req.body.productId;
            user.category = req.body.category;
            user.picture = req.body.picture;
            user.price = req.body.price;
            
            product.save()
                    .then(user => {
                        res.status(200).redirect(`/${user._id}`);
                    })
                    .catch(err => {
                        console.log(err);
                    })
    }})   
});


router.route('/:id').put(async(req,res, next) => {
    if(!req.params.id) {
        return res.status(500).send('ID não informado');
    }
    
    await User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(500).send('user not found in Database');
        } else if(!user) {
            return res.status(404).send('usero não encontrado');
        }else {
            user.save()
                    .then(user => {
                        res.status(200).send(user);
                    })
                    .catch(err => {
                        next(err);
                    }) 
    }})   
});

router.route('/:id').delete(async(req,res) => {
    if(!req.body) {
        return res.status(500).send('Not data informed!')
    }
    await User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(404).send('User not found in Database');
        } else {
            return res.status(200).send('User deleted sucessfully!');
        }
    })
});

module.exports = router;