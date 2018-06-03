// App logic.
window.sportspass = {};


document.addEventListener('init', function(event) {

 	var page = event.target;
       // Each page calls its own initialization controller.
  if (sportspass.controllers.hasOwnProperty(page.id)) {
    sportspass.controllers[page.id](page);
  }
 
});
