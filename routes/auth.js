var express = require('express');
var router = express.Router();           

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: '025177faf1587f2b9a4f',
  clientSecret: 'd168e529f35472343da65c989a8153a7415efaa0',
  callbackURL: "http://localhost:9000/auth/github/callback" 
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

router.get('/logout', function(req, res){
  console.log('logout')
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
  // res.clearCookie('connect.sid',);
  // console.log(req.cookies);
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });


module.exports = router