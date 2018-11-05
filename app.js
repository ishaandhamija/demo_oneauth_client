const express = require ('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');
const passport = require ('./passport');
const OneauthStrategy = require ('passport-oneauth').Strategy;
const app = express ();

// const User = require ('./models/user')
const config = require ('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(session({
    secret: 'somesecretstring'
}))
app.use(passport.initialize())
app.use(passport.session())

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

	return cb (null, profile)
	// return User.create( {id: profile.id, role: profile.role} )
	// .then(user => {
	// 	return cb (null, user)
	// })
	// .catch(err => {
	// 	console.err (err)
	// })

    // User.findOrCreate({ oneauthId: profile.id }, function (err, user) {
    //  	return cb(err, user);
    // });
  }
));

// app.use(passport.initialize());
// app.use(passport.session());

app.get('/login', passport.authenticate('oneauth'))
app.get('/', passport.authenticate('oneauth', { failureRedirect: '/fail' }), 
	function (req, res) {
		console.log('req: ' + req)
		res.send('/home')
	});

app.listen(3030, () => {
	console.log ('Listening to port 3030...')
})
