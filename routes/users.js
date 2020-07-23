const express = require('express');
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const utils = require('../lib/utils');

const User = require('../models/user.model');

router.get('/', (req,res, next) => {
    User.find({}, (err, users) => {
        if(users.length === 0) {
            return res.status(301).json({success: false, msg: 'Good request, but don`t have data to show'});
        } else if(err) {
            return res.status(400).json({success: false, msg: 'Error to access the database'});
        } else {
            return res.status(200).json({success: true, user: users, msg: 'Users listed!'});
        }
    })
});

// Login
router.post('/login', (req,res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                res.status(401).json({success: false, msg: "user not found!"});
            }
        
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if(isValid) {
                const tokenObj = utils.issueJWT(user);
                res.status(200).json({success: true, user: user, token: tokenObj.token, expiresIn: tokenObj.expires})
            } else {
                res.status(401).json({success: false, msg: "wrong username or password"});
            }
        })
        .catch(err => {
            next(err);
        })
});

// Logout
router.post('/logout',(req,res, next) => {
    if (req.params) {
		req.session.destroy();
		res.clearCookie('connect.sid') // clean up!
		return res.status(200).json({ msg: 'logging you out' })
	} else {
		return res.status(400).json({ msg: 'no user to log out!' })
	}
});

// Register
router.post('/signup', async(req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
        const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
        });

        newUser.save()
            .then(user => {
                const jwt = utils.issueJWT(user)
                res.status(200).json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
            });
    } catch(err) {
        next(err);
    }
});

// GET user pela ID    
router.get('/:id', (req,res, next) => {
    console.log(req.params);
    try {
        const user = User.findById(req.params.id, (err, user) => {
        if(err) {
            return next(err);
        } else if(!user) {
            return res.status(400).json({success: false, msg: 'user não encontrado'});
        } else {
            return res.status(200).json({success: true, user: user, msg: 'User by Id'});
        }
    })} catch(err) {
        return res.status(404).send('was not possible to fetch data from the database');
    }
});

// editar user pela Id
router.put('/:id', (req,res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(301).json({success: false, msg: 'user not found in Database'});
        } else if(!user) {
            return res.status(400).json({success: false, msg: 'Usuário não encontrado'});
        }else {
            user.save()
                    .then(user => {
                        res.status(200).json({success: true, user: user, msg: 'User updated!'});
                    })
                    .catch(err => {
                        next(err);
                    }) 
    }})   
});

// deletar user pela Id
router.delete('/:id', (req,res, next) => {
    if(!req.body) {
        return res.status(500).send('Not data informed!')
    }
    User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(301).json({success: false, msg: 'User not found in Database'});
        } else {
            return res.status(200).json({success: true, user: user, msg: 'User deleted sucessfully!'});
        }
    })
});

module.exports = router;