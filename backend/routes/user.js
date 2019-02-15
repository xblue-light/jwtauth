
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const List = require('../models/List');

// Route => "/api/users/register"
router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

// Route => "/api/users/login"
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, 'secret', {
                        expiresIn: 3600
                    }, (err, token) => {
                        if(err) console.error('There is some error in token', err);
                        else {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
                else {
                    errors.password = 'Incorrect Password';
                    return res.status(400).json(errors);
                }
            });
        });
});

// Route => "/api/users/me"
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// GET ALL LISTS
router.get('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const docs = await List
            .find({ createdBy: req.user.id })
            .lean()
            .exec();

        res.status(200).json(docs);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

// POST LIST
router.post('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const doc = await List.create({ ...req.body, createdBy: req.user.id });
        res.status(200).json(doc);
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
});


module.exports = router;

