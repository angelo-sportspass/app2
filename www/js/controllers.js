/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/
sportspass.controllers = {

  //////////////////////////
  // Main Page Controller //
  //////////////////////////
  main(page) {
    // Set button functionality to open/close the menu

    $('[component="button/button-login"]').on('click', function() {
      document.querySelector('#mainNavigator').pushPage('login.html', { animation: 'lift'});
    });

    $('[component="button/button-register"]').on('click', function() {
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

    $('[component="button/register-page"]').on('click', function() {
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

     $('[component="button/login-page"]').on('click', function() {
        document.querySelector('#mainNavigator').pushPage('login.html', { animation: 'lift'});
    });
  },

  homePage(page) {

    sportspass.services.accountCards();
   
    var content = "";

    setTimeout(function() { 

      let cards = sportspass.storage.show('cards');
      let user = sportspass.storage.show('user');
      let cashBack = 0.00;

      if (cards.length > 0)
      {
        content += '<ons-carousel swipeable auto-scroll auto-refresh overscrollable id="carousel" >';  
          cards.forEach(function(item, index){
            content += '<ons-carousel-item >' +
              '<img src="'+item.club.front_card_image+'">' +
              '<p>'+item.first_name +' '+ item.last_name +'</p>' +
            '</ons-carousel-item>';
          });
        content += '</ons-carousel>';

        $("#mycards-content").html("");
        $("#mycards-content").append(content);

      } else {

        // $("#button-mycards").attr('href', 'http://sportsnomads.com.au/account-club?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email);
        sportspass.addLink('button-mycards', 'account-club');
      }

      sportspass.addLink('button-add-card', 'account-club');
      sportspass.addLink('button-club-perks', 'hotoffers', 25);
      sportspass.addLink('button-cash-back', 'hotoffers', 27);

      $("#home-ewallet-cashback").append('$ ' + parseFloat(cashBack).toFixed(2));
      
    }, 1000);  

    $('[component="button/hotoffers-page"]').on('click', function() {
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
        banners.forEach(function(item, index) {

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
