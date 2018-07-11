// App logic.
window.sportspass = {};

window.sportspass.auth_token = '$2y$13$s9pl51PiMQUX1jXmIbi4y.cOxqAC2td/KtBsDgn.1NEiQdVzVVyhG';
window.sportspass.website    = 'https://sportspass.com.au';

window.sportspass.openExternal = function(el) 
{
	window.open(el.href, "_system");
	return false;
};

/**
 * Action Pop Page
 * backpage
 */
window.sportspass.backPage = function() 
{
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

/**
 * Action auth using parameters
 * @params email
 * @params token
 */
window.sportspass.auth = function(type) 
{
  let user     = sportspass.storage.show('user');

  let website  = sportspass.website + '/' + type + '?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email+'&auth_token='+sportspass.auth_token;

  window.open(website, "_system");
  return false;
};

/**
 * Action Logout mobile application.
 * remove local storage.
 */
window.sportspass.openNotification = function(web) 
{
  window.open(web, "_system");
  return false;
};

/**
 * Action Logout mobile application.
 * remove local storage.
 */
window.sportspass.logout = function() 
{
  sportspass.storage.destroy('user');
  sportspass.storage.destroy('cards');
  sportspass.storage.destroy('hotoffers');
  
  document.querySelector('#mainNavigator').pushPage('main.html', { animation: 'lift'});
};

/**
 * Add Link to element
 * @params id
 * @params type
 */
window.sportspass.addLink = function(id, type, categoryId)
{
  let user = sportspass.storage.show('user');
  let link = '';

  if (categoryId)
  {
    link = 'https://sportspass.com.au/'+type+'?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email+'&auth_token='+sportspass.auth_token+'&id=' + categoryId;
  } else {
    link = 'https://sportspass.com.au/'+type+'?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email+'&auth_token='+sportspass.auth_token;
  }

  document.getElementById(id).setAttribute('href', link);
};

/**
 * Initialize Page
 * @param events
 */
document.addEventListener('init', function(event) 
{
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
      if (user.card == null)
      {
        ons.notification.confirm({
          message: 'Please add your first card to access the SportsPass Member Benefits',
          callback: function(idx) {

            // let website = 'http://sportsnomads.com.au/login?VUNZTXo4eVpoTHRmYlptL25OR3lkQT09='+user.account.email;
            if (idx == 1)
            {
               sportspass.auth('login');
            }
          }
        });
      }
      
	  	document.querySelector('#mainNavigator').pushPage('home.html', { animation: 'lift'});
	  }
  }
});
