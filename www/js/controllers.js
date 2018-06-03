/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/
sportspass.controllers = {

  //////////////////////////
  // Main Page Controller //
  //////////////////////////
  main(page) {
    // Set button functionality to open/close the menu

    $('#button-login').on('click', function() {

        document.querySelector('#mainNavigator').pushPage('login.html');
    });

    $('#button-register').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('register.html');
    });

  },

  login(page) {

    $('[component="button/login-action"]').on('click', function() {
      let username = page.querySelector('#user_name').value;
      let password = page.querySelector('#password').value;
      
      // Login now
      sportspass.services.login(username, password);
    });

  },

  register(page) {
    $('[component="button/register-action"]').on('click', function() {

      let username = page.querySelector('#user_name').value;
      let password = page.querySelector('#password').value;
      
      // Login now
      sportspass.services.login(username, password);
    });

    $('#login').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('login.html');
    });
  }

};
