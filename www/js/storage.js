/***********************************************************************************
 * Sportspass Storage. A data storage. *
 ***********************************************************************************/

 sportspass.storage = {

 	namespace: 'sportspass_',

 	store(key, value) {
 		localStorage.setItem(this.namespace + key, JSON.stringify(value));
 	},

 	show(key) {
		let item = localStorage.getItem(this.namespace + key);
		return JSON.parse(item);
 	},

 	destroy(key) {
		localStorage.removeItem(this.namespace + key);
 	}
 };