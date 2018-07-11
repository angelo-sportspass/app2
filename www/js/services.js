/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

sportspass.services = {

  auth_token: '$2y$13$s9pl51PiMQUX1jXmIbi4y.cOxqAC2td/KtBsDgn.1NEiQdVzVVyhG',

  host: 'https://api.sportspass.com.au/v1',
  host2: 'https://api.sportspass.com.au/v2',

  website: 'https://sportspass.com.au/login',

  login(username, password) {

    let endpoint = '/account/login';

    let auth     = {
        user_name: username,
        password: password
    };

    $.ajax({
      type: "POST",
      header: {'Content-type' : 'application/json'},
      url: this.host + endpoint,
      data: auth
    }).done((res) => {

      console.log(res);
      sportspass.storage.store('user', res);
      sportspass.storage.store('auth', auth);

        let message = 'Please add your first card to access the SportsPass Member Benefits!';
        let user = sportspass.storage.show('user');

        if (user)
        {
          let website = this.website + '?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email;

          if (user.card == null)
          {
            ons.notification.confirm({
              message: 'Please add your first card to access the SportsPass Member Benefits',
              callback: function(idx) {
                
                let website = 'https://sportspass.com.au/login?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email;

                if (idx == 1)
                {
                   sportspass.openNotification(website);
                }
              }
            });
          }

          //$("#button-mycards").attr('href', website);
        }

      document.querySelector('#mainNavigator').pushPage('home.html');

    }).fail((res) => {
      console.log(res);
      ons.notification.alert('Invalid Login Credentials.');
    });
  },

  register(firstName, lastName, email, password, postCode) {

    let endpoint = '/account';

    if (email && password)
    {
      $.ajax({
        type: "POST",
        header: {'Content-type' : 'application/json'},
        url: this.host + endpoint,
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          post_code: postCode
        }
      }).done((res) => {

        console.log(res);
        //ons.notification.alert('User was registered successfully!');
        //document.querySelector('#mainNavigator').popPage();

          let login = '/account/login';

          $.ajax({
            type: "POST",
            header: {'Content-type' : 'application/json'},
            url: this.host + login,
            data: {
              user_name: email,
              password: password
            }
          }).done((res) => {

            console.log(res);
            sportspass.storage.store('user', res);

            let user = sportspass.storage.show('user');
            
            let message = 'Please add your first card to access the SportsPass Member Benefits!';
            let website = this.website + '?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email;

            ons.notification.confirm({
              message: message,
              callback: function(idx) {
                switch (idx) {
                  case 0:
                    
                    break;
                  case 1:
                      window.open(website, "_system");
                      return false;
                    break;
                }
              }
            });

            document.querySelector('#mainNavigator').pushPage('home.html');

          });

      }).fail((res) => {
        console.log(res);
        ons.notification.alert('Email already exist!');
      });
    } else {
      ons.notification.alert('There are error on the fields!');
    }
  },

  hotoffers() {

    let endpoint = '/banner/banner-search?search=true';
    let cat   = document.querySelector("#categories").value;
    let data  = {};
    
    if (cat)
    {
        data = {
          banner_type: 'hot_offer',
          categories: JSON.stringify([{
            id: cat
          }])
        };
    } else {
      data.banner_type = 'hot_offer';
    }
    
    sportspass.storage.destroy('hotoffers');

    $.ajax({
      type: "POST",
      header: {'Content-type' : 'application/json'},
      url: this.host + endpoint,
      data: data
    }).done((res) => {

      sportspass.storage.store('hotoffers', res);
      // console.log(res);
     
    }).fail((res) => {
      console.log(res);
      ons.notification.alert('wala!');
    });
  },

  accountCards() {

    let user     = sportspass.storage.show('user');
    let endpoint = '/account/account-member-cards/'+ user.account.id;

    $.ajax({
      type: "GET",
      header: {'Content-type' : 'application/json'},
      url: this.host + endpoint
    }).done((res) => {

      if (res)
      {
        sportspass.storage.store('cards', res.cards);
      }
     
    }).fail((res) => {

      console.log(res);
    });
  }
};
