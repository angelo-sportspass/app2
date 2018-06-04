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

        document.querySelector('#mainNavigator').pushPage('login.html', { animation: 'lift'});
    });

    $('#button-register').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('register.html', { animation: 'lift'});
    });

  },

  login(page) {

    $('[component="button/login-action"]').on('click', function() {
      let username = page.querySelector('#user_name').value;
      let password = page.querySelector('#password').value;
      
      // Login now
      sportspass.services.login(username, password);
    });

    $('#register').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('register.html', { animation: 'lift'});
    });
  },

  register(page) {

    $('[component="button/register-action"]').on('click', function() {

      let first_name = page.querySelector('#first_name').value;
      let last_name  = page.querySelector('#last_name').value;
      let email      = page.querySelector('#email').value;
      let post_code  = page.querySelector('#post_code').value;
      let password   = page.querySelector('#password').value;
      
      // Register
      sportspass.services.register(first_name, last_name, email, password, post_code);
    });

    $('#login').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('login.html', { animation: 'lift'});
    });
  },

  homePage(page) {

    $('#hotoffers-page').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('hotoffers.html', { animation: 'lift'});
    });
  },

  hotOffersPage(page) {

    sportspass.services.hotoffers();

    setTimeout(function() { 
      let hotoffers = sportspass.storage.show('hotoffers');
      let banners   = hotoffers.banners;

      if (banners)
      {
        banners.forEach(function(item, index){

          $("#hotoffer-list").append(
            '<ons-col width="50%">' +
              '<img width="100%" src="'+item.image+'" />' +
            '</ons-col>'
          );
        });
      }
    }, 2000);

  }

};
