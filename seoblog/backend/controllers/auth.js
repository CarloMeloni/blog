const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: "L'email e' gia' stata utilizzata."
            });
        }

        const {name, email, password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;
        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: "Ti sei registrato al blog, vai al Login."
            })
        })
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    //CHECK IF USER EXISTS
    User.findOne({ email }).exec(( err, user ) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Questa Email non e' presente nel nostro Database, per piacere Registrati."
            })
        }

        //AUTHENTICATE
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email e password non corrispondono."
            })
        }

        //GENERATE A TOKEN AND SEND IT TO THE CLIENT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "100d" });

        res.cookie('token', token, { expiresIn: "100d" });
        const { _id, username, name, email, role } = user;

        return res.json({
            token, 
            user: { _id, username, name, email, role }
        })
    })
};