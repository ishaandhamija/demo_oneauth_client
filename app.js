const express = require ('express');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const OneauthStrategy = require ('passport-oneauth').Strategy;
const app = express ();

const config = require ('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'hbs')

app.get('/home', (req, res) => {
	res.send('working')
})

app.get('/fail', (req, res) => {
	res.send('failed')
})

passport.use(new OneauthStrategy({
    clientID: config.ONEAUTH.CLIENT_ID,
    clientSecret: config.ONEAUTH.SECRET,
    callbackURL: config.ONEAUTH.CALLBACK_URL,
    include : ["facebook","twitter","github","lms"]
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log ('accessToken : ' + accessToken)
  	console.log ('refreshToken : ' + refreshToken)
	console.log ('profile : ' + JSON.stringify(profile))
	console.log ('cb : ' + cb)

    // User.findOrCreate({ oneauthId: profile.id }, function (err, user) {
    //  	return cb(err, user);
    // });
  }
));

app.get('/login', passport.authenticate('oneauth'))
app.get('/', passport.authenticate('oneauth', { successRedirect: '/home', failureRedirect: '/fail' }));

app.listen(3030, () => {
	console.log ('Listening to port 3030...')
})
