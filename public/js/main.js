/******************************
*******************************
* Created by - Malhar Deshpande
*******************************
*/


angular.module('root', [])
	.controller('LinkDisplayController', function($http){

			//thsi is the scope
			var state = this;


			//boolean variables that will trigger conditions for ng-show directive
			state.tableGate = false;
			state.responseGate = false;
			
			//makes use of the user input from the text field
			//to make a GET request via Github Search api
			//collected response is then transferred to another function for analysis.
			//When making the GET Request, I am only making a reuest for open issues
			//so all the issues that we get in the reposne are open
			state.fetch = function(user){
				if(typeof user === "undefined"){
					state.responseGate = true;
					alert("Empty string is an invalid input. Please enter a valid public repository.");
				} else {
					$http.get("https://api.github.com/repos/"+ user.name +"/support/issues?q=state:open&per_page=100&sort=created&order=asc").then(function(res){
						state.data = res;
						
						var status = state.data.status;

						state.tableGate = true;
						state.logRes = dataManipulate(state.data);

					}, function(error){
						state.responseGate = true;
						alert("Repository not found. Enter a valid name");
					})
				}			


			};

			//Receives the api response, use the created_at field to find out creation date of the open issue
			//and uses the current date to compare it and fit it in a respoective group  of open issues.
			//Group 1 : Total number of open issues
			//Group 2 : Number of issues opened in the last 24 hours
			//Group 3 : Number of issues opened between 24 hours to 7 days
			//Group 4 : Number of issues open for more than 7 days
			function dataManipulate(dat){
				
				var d = new Date();
				var currDate = d.toString().split(" ");
				var currTime = currDate[4].split(":");
				
				var itemsArray = dat.data;
				
				var currMonth;
				var Issues = itemsArray.length; //counter for total number of open issues
				var Issues24 = 0; 				//counter for number of issues opened in the last 24 hours
				var Issues247 = 0;				//counter for number of issues opened between 24 hours to 7 days
				var Issues700 = 0;				//counter for number of issues open for more than 7 days

				
				//Date format by defualt gives month in words instead of a number for cuurent date
				//So created a mechanism to derive number for current month
				var Month =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				for(i=0;i<Month.length;i++){
					if(currDate[1]==Month[i])
						currMonth = i+1;
				}


				var curDate = parseInt(currDate[2]);
				var currYear = parseInt(currDate[3]);
				
				//loop goes through all the open issues and accesses their created_at timestamp
				//and compare it with current date timestamp
				//based on the result of this comparison respective counter gets incremented
				for(i=0;i<itemsArray.length;i++){	
					var diffMilli = moment().diff(itemsArray[i].created_at);
					
					var diff = moment.duration(diffMilli);
					
					var dateAndTime = itemsArray[i].created_at.replace("-",":").replace("-",":").replace("T",":").split(":");
					
					var month = parseInt(dateAndTime[1]);
					var year = parseInt(dateAndTime[0]);

					if(year == currYear && month == currMonth){
						if(diff._data.days == 0 && diff._data.hours <= 23){
							Issues24++;
						} else if(diff._data.days > 0 && diff._data.days <= 7){
							if(diff._data.days == 7 && diff._data.hours >0){
								Issues700++;
							}else{
								Issues247++;
							}
						} else if(diff._data.days > 7){
							Issues700++;
						}
					} else if(year == currYear && month < currMonth){
						if((currMonth - month) == 1){
							if(diff._data.days == 0 && diff._data.hours <= 23){
								Issues24++;
							} else if(diff._data.days > 0 && diff._data.days <= 7){
								if(diff._data.days == 7 && diff._data.hours >0){
									Issues700++;
								}else{
									Issues247++;
								}
							} else if(diff._data.days > 7){
							Issues700++;
							}
						} else{
							Issues700++;
						}
					} else if(year < currYear){
						Issues700++;
					}

					
				}
				//At the end, we pack all our analytics into an array obejct and return  it
				var logObject = [Issues, Issues24, Issues247, Issues700];

				return logObject;
			}
});