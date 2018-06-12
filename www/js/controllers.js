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
      let confirm    = page.querySelector('#confirm').checked;

      if (confirm)
      {
        // Register
        sportspass.services.register(first_name, last_name, email, password, post_code);
      } else {
        ons.notification.alert('Please agree to all terms and conditions.');
      }
        
    });

    $('#login').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('login.html', { animation: 'lift'});
    });
  },

  homePage(page) {

    sportspass.services.accountCards();
    let cards = sportspass.storage.show('cards');
    let cashBack = 0.00;

    setTimeout(function() { 

      if (cards)
      {
        var content = "";
        cards.forEach(function(item, index){

          content += '<ons-carousel-item >' +
                      '<img src="'+item.club.front_card_image+'">' +
                      '<p>'+item.first_name +' '+ item.last_name +'</p>' +
                    '</ons-carousel-item>';
          
        });

        $("#carousel").append(content);

        $("#home-ewallet-cashback").append('$ ' + parseFloat(cashBack).toFixed(2));
      }
      
    }, 2000);  

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

          if (item.image)
          {
            $("#hotoffer-list").append(
              '<ons-col width="50%">' +
                '<a href="'+sportspass.services.website+'" onclick="return sportspass.openExternal(this)"><img width="100%" src="'+item.image+'" /></a>' +
              '</ons-col>'
            );
          }
          
        });
      }
    }, 2000);

    $('[component="select/categories"]').on('change', function() {

      let category = page.querySelector("#categories").value;

      sportspass.services.hotoffers();

      $("#hotoffer-list").html("");

      setTimeout(function() { 

          let hotoffers = sportspass.storage.show('hotoffers');
          let banners   = hotoffers.banners;

          if (banners)
          {
            banners.forEach(function(item, index){

              if (item.image)
              {
                $("#hotoffer-list").append(
                  '<ons-col width="50%">' +
                    '<a href="'+sportspass.services.website+'" onclick="return sportspass.openExternal(this)"><img width="100%" src="'+item.image+'" /></a>' +
                  '</ons-col>'
                );
              }
            });
          }
      }, 2000);
    });

  }

};
