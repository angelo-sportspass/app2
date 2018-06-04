// App logic.
window.sportspass = {};

window.sportspass.openExternal = function(el) {
	window.open(el.href, "_system");
	return false;
};

window.sportspass.backPage = function() {

	if (page.id == 'login' || page.id == 'main')
  {
  	let user = sportspass.storage.show('user');
	  if (user)
	  {
	  	document.querySelector('#mainNavigator').pushPage('home.html', { animation: 'lift'});
	  }
  } else {
  	document.querySelector('#mainNavigator').popPage();
  }
	
};

document.addEventListener('init', function(event) {

  var page = event.target;

       // Each page calls its own initialization controller.
  if (sportspass.controllers.hasOwnProperty(page.id)) {
    sportspass.controllers[page.id](page);
  }

  if (page.id == 'login' || page.id == 'main')
  {
  	let user = sportspass.storage.show('user');
	  if (user)
	  {
	  	document.querySelector('#mainNavigator').pushPage('home.html', { animation: 'lift'});
	  }
  }
  
});
