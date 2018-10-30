const express = require ('express');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const OneauthStrategy = require ('passport-oneauth').Strategy;
const app = express ();

const config = require ('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.send('working..')
})

passport.use(new OneauthStrategy({
    clientID: config.ONEAUTH.CLIENT_ID,
    clientSecret: config.ONEAUTH.SECRET,
    callbackURL: "http://127.0.0.1:3030/",
    include : ["facebook","twitter","github","lms"]
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ oneauthId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.listen(3030, () => {
	console.log ('Listening to port 3030...')
})
