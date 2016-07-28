angular.module('root', [])
	.controller('LinkDisplayController', function($http){

			var state = this;

			var information = [];
			
			state.fetch = function(user){
				$http.get("https://api.github.com/search/issues?q=" + user.name + "+is:open&sort=created&order=asc?page=4&per_page=100").then(function(res){
					state.data = res;
					console.log(state.data);
					state.logRes = dataManipulate(state.data);
				})		


			};

			function dataManipulate(dat){
				
				var d = new Date();
				var currDate = d.toString().split(" ");
				var currTime = currDate[4].split(":");
				
				var itemsArray = dat.data.items;
				
				var currMonth;
				var Issues = itemsArray.length;
				var Issues24 = 0;
				var Issues247 = 0;
				var Issues700 = 0;

				
				
				var Month =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				for(i=0;i<Month.length;i++){
					if(currDate[1]==Month[i])
						currMonth = i+1;
				}
				var curDate = parseInt(currDate[2]);
				var currYear = parseInt(currDate[3]);
				
				
				for(i=0;i<itemsArray.length;i++){
					var dateAndTime = itemsArray[i].updated_at.replace("-",":").replace("-",":").replace("T",":").split(":");
					var month = parseInt(dateAndTime[1]);
					var year = parseInt(dateAndTime[0]);
					var date = parseInt(dateAndTime[2]);
					if(currYear == year){
						if(currMonth == month){
							if(curDate == date){
								Issues24++;
							} else {
								if((currDate - date)<=7){
									Issues247++;
								} else{
									Issues700++;
								}
							}
						}else{
							Issues700++;
						}
					} else {
						Issues700++;
					}
				}

				var logObject = [Issues, Issues24, Issues247, Issues700];

				return logObject;
			}
});

