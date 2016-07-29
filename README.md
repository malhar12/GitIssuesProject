# Name of the Web App: GitIssues Repository Project

## Developed By: Malhar Deshpande

## Link where the web app is live: https://gitissuesproj.herokuapp.com/

*******************************************************************************************************************

## INSTRUCTIONS TO USE THE WEB APP:

These instructions are based for the following test input link https://github.com/Shippable/support/issues to the 
public repository of Shippable/support/issues

1. As the web app opens, you will see only a text field input with a submit button. 
2. Enter the input "Shippable/support/issues" in thetext field. 
3. Click the submit button 
4. A table appears on the right side with the analytics. 
5. If a repository does not exist or if we try to access a private/unauthorized repository following text gets displayed
   "The URL did not find a response. Please enter a correct github  url". 

*******************************************************************************************************************

## DESCRIPTION OF THE APP: 

This is an AngularJS app which is integrated with NodeJS skeleton. It is deployed on Heroku platform.
The app asks user to name the repository who'sanalytics need to be derived. Then the app uses name 
of the repository to make a GET request call via Github search api. This app makes use of Bootstrap 
framework to provide the necesscary CSS classes for styling. 

Specifictions of the Github api call are as follows: <br />
1. All the calls GET requestsmade via the Github search api are unauthenticated. <br />
2. Only a call to public repository is possible. <br />
3. GET Request is for all the open issues of a particular open Github repository. <br />
4. So all the reposnses that we get are of open issues. <br />
5. We make use of created_at timestamp to find date of creation of an open issue
   and compare it with current date to see it falls under which category <br />
6. There are 4 categories: <br />
      i. Total number of open issues : All the reposnes will by default fall under this category <br />
      ii. Number of issues that were opened in the last 24 hours. <br />
      iii. Number of issues that are open for more than 24 hours but less than 7 days. <br />
      iv. Number of issues that are open for more than 7 days. <br />
7. Comaprison of current date & created_at timestamp increments counter for the respective ii, iii & iv group. <br />
8. These analytics results are then displayed back to the user in the form of a table. <br />

In order to host website, I have integrated my AngularJS web app with a backend of NodeJS to host it on 
Heroku. I have used the NodeJS skeleton from [site](http://www.nodeclipse.org)

*******************************************************************************************************************

## IMPROVEMENTS THAT CAN BE DONE TO THE WEB APP:

1. Make the code more efficient. To do the timestamp comparisons, I have used a for loop due to which it takes
   around 4-5 seconds to do operations on the response and display it on the screen. This time can be improved
   by making use of a data structure such as a HashTable which has an efficient lookup time complexity. 
2. Add angular mechanism to reset the app to default intital state. Right now, after using the web app for the first 
   time, there is no mechanism to return the app to the initial unused state. 
3. Test the web app for negetive test cases such as <br />
		i. empty string <br />
		ii. sequence of numbers or special characters (basically anything else other than a character) <br />
		iii. invalid length of input <br />
		iv. Access to unauthorized repository <br />
		v. network connection problems 


Made with passion 
-Developed By Malhar Deshpande 

Enjoy using the App !!!

