/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

	//////////////////////////
  // Main Page Controller //
  //////////////////////////
  mainPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/login"]').onclick = function() {
   
      document.querySelector('#mainNavigator').pushPage('login.html');
    };


		page.querySelector('[component="button/register"]').onclick = function() {
   
      document.querySelector('#mainNavigator').pushPage('register.html');
    };
  },


  //////////////////////////
  // Login Page Controller //
  //////////////////////////
  loginPage: function(page) {
  	page.querySelector('[component="button/login-action"]').onclick = function() {


  		document.querySelector('#mainNavigator').pushPage('home.html');

  		// var userName = page.querySelector('#user_name').value;
  		// var passWord = page.querySelector('#password').value;

  		// if (userName && passWord)
  		// {
  			
  		// 	var auth = myApp.services.login.authenticate({
	   //      	user_name: userName,
	   //      	password: passWord
	   //      }
	   //    );
  			
  		// } 
  		// else {
    //     // Show alert if the input title is empty.
    //     ons.notification.alert('You must provide username and password.');
    //   }
  	};

  	page.querySelector('[component="button/register"]').onclick = function() {
      document.querySelector('#mainNavigator').pushPage('register.html');
    };
  },

  //////////////////////////
  // Register Page Controller //
  //////////////////////////
	registerPage: function(page) {
		page.querySelector('[component="button/register-action"]').onclick = function() {

			var firstName = page.querySelector('#first_name').value;
			var lastName  = page.querySelector('#last_name').value;

  		var email     = page.querySelector('#email').value;
  		var passWord  = page.querySelector('#password').value;

  		var postCode  = page.querySelector('#post_code').value;

  		if (email && 
  			passWord && 
  			firstName && 
  			lastName
  		)
  		{
  			var create = myApp.services.register.create(
	        {
	        	first_name: firstName,
	        	last_name: lastName,
	        	email: email,
	        	password: passWord,
	        	post_code: postCode
	        }
	      );

	  		if (create)
	  		{
	  			console.log(create);
	  		}
  		} else {
  			ons.notification.alert('You must provide required fields.');
  		}
  	};
	},

	homePage: function(page) {

		page.querySelector('[component="button/hotoffers-page"]').onclick = function() {
			document.querySelector('#mainNavigator').pushPage('hotoffers.html');
		};

	},

	hotOffersPage: function(page) {

		var list = myApp.services.hotoffers.list();
		console.log(list);
	},

	testData: function(data)
	{
		console.log();
	}
};











