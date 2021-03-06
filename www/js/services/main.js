/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

	login: {

  	authenticate: function(data) {

   	 	jQuery.ajax({
          type: 'POST',
          data: data,
          header: {'Content-type' : 'application/json'},
          //change the url for your project
          url: 'http://api.sportspass.com.au/v1/account/login',
          success: function(data){
              ons.notification.alert(data.account.first_name);
              // alert('Your comment was successfully added');
          },
          error: function(){
              console.log(data);
              alert('There was an error adding your comment');
          }
      });
  	}	
  },

  register: {


  	create: function(data) {

  		return data;
  	}
  },

  hotoffers: {

  	list: function() {

  		jQuery.ajax({
        type: 'GET',
        header: {'Content-type' : 'application/json'},
        //change the url for your project
        url: 'http://api.sportspass.com.au/v1/banner/banner-search?search=true',
        success: function(data){

          console.log(data.banners);
          var content = "";
          
          for (i = 0; i < data.banners.length; i++) { 
					    content += "<ons-col>" + data.banners[i].type + "</ons-col>";
					}

					console.log(content);
					

            // alert('Your comment was successfully added');
        },
        error: function(error){
            console.log(error);
            
        }
      });
  	}
  }

};