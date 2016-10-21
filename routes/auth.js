

module.exports = (app, passport) => {

   app.post("/login", passport.authenticate('login', {
     successRedirect : 'profile',
     failureRedirect : 'login'
   }))
   
   app.post('/checkout', passport.authenticate('signup', {
       successRedirect : 'create',
       failureRedirect : 'sorry',
       failureFlash : true
   }))

}