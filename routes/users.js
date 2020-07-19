const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');
// require('./models/user.model');
// require('../passport/index');

router.route('/').get(async(req,res) => {
    
    try{
        await User.find({}, (err, users) => {
            if(users.length === 0) {
                return res.status(200).send('Good request, but don`t have data to show');
            } else if(err) {
                return res.status(404).send(err);
            } else {
                return res.status(200).send(users);
            }
        })
    } catch(err) {
        return res.json('users not found in Database');
    }
});

// Login
router.route('/login').post(async(req,res) => {
    const { email, password } = req.body;

        let user = await User.findOne({email: email, password: password}, (err, userMatch) => {
            if(!userMatch) {
                return res.json({msg: 'user not found!'});
            } else {
                return res.status(200).send(userMatch);
            }
        });
});

// Logout
router.route('/logout').post((req,res) => {
    if (req.params) {
		req.session.destroy();
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
});

// Register
router.route('/signup').post(async(req, res) => {
    const { username, email, password } = req.body
	// ADD VALIDATION
	let user = await User.findOne({ username: username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: "Sorry, already a user with the username: " + username
			});
        }
    }); 
    user = await User.findOne({ email: email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: "Email already registered!"
			});
        }
    }); 
    user = new User({
        username: username,
        email: email,
        password: password
    });
            // const salt = bcrypt.genSalt(10);
            // user.password = bcrypt.hash(user.password, salt);
    user.save();
    return res.status(200).send(user);
});  
    
router.route('/:id').get(async(req,res, next) => {
    console.log(req.params);
    
    if(!req.params.id) {
        res.status(500).send('Id do usuário não informado');
    }

    try {
        const user = await User.findById(req.params.id, (err, user) => {
        if(err) {
            return next(err);
        } else if(!user) {
            return res.status(400).send('user não encontrado');
        } else {
            return res.json(user);
        }
    })} catch(err) {
        return res.status(404).send('was not possible to fetch data from the database');
    }
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