const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const Blog = require('../models/blog');
const { errorHandler } = require('../helpers/dbErrorHandler');

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
                error: "Questa Email non e' presente nel nostro Database, per piacere registrati."
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

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Sei uscito dal Blog."
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], 
    "type": "JWT",
  });
   
exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Utente non trovato."
            })
        }
        req.profile = user;
        next();
    })
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Utente non trovato."
            })
        }
        if(user !== 1) {
            return res.status(400).json({
                error: "Azioni per Amministratore non autorizzate."
            })
        }
        req.profile = user;
        next();
    })
}

exports.canUpdateDeleteBlogs = (req, res, next) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({slug}).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString();
        if(!authorizedUser) {
            return res.status(400).json({
                error: 'Non autorizzato.'
            })
        }
        next();
    })
}