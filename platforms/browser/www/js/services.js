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
      ons.notification.alert('naa!');


    }).fail((res) => {
      console.log(res);
      ons.notification.alert('wala!');
    });
  }
};
