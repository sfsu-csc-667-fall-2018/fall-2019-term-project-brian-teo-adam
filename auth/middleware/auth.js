module.exports = {

    ensureAuthenticated: function(request, response, next) {
      if (request.isAuthenticated()) {
        console.log("next::::: ", request)
        return next();
      }
      //req.flash('error_msg', 'Please log in to view that resource');
      response.redirect('/users/login');
    },
    forwardAuthenticated: function(request, response, next) {
      if (!request.isAuthenticated()) {
        return next();
      }
      response.redirect('/dashboard');      
    }
  };
  