/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

sportspass.services = {

  host: 'http://api.sportsnomads.com.au/v1',

  login(username, password) {

    let endpoint = '/account/login';

    $.ajax({
      type: "POST",
      header: {'Content-type' : 'application/json'},
      url: this.host + endpoint,
      data: {
        user_name: username,
        password: password
      }
    }).done((res) => {

      console.log(res);
      sportspass.storage.store('user', res);
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
        ons.notification.alert('User was registered successfully!');
        document.querySelector('#mainNavigator').popPage();

      }).fail((res) => {
        console.log(res);
        ons.notification.alert('There are error on the fields!');
      });
    } else {
      ons.notification.alert('There are error on the fields!');
    }
  },

  hotoffers() {

    let endpoint = '/banner/banner-search?search=true';

    $.ajax({
      type: "POST",
      header: {'Content-type' : 'application/json'},
      url: this.host + endpoint,
      data: {
        banner_type: 'hot_offer'
      }
    }).done((res) => {

      sportspass.storage.store('hotoffers', res);
      // console.log(res);
     
    }).fail((res) => {
      console.log(res);
      ons.notification.alert('wala!');
    });
  }
};
