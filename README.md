# Student Microservice

This microservice is a part of a larger application that is meant to provide services to students and teachers. There are five microservices that work together; they are depicted here: https://app.diagrams.net/#G1Lv49geXhtRD7t88zu8SpjHmqQDpfSxgc. 

The Marketplace serves as a login/home page and is where students can view available classes and sign up for them. The Teacher page is the profile page for teachers where they can view students in their classes and post new classes to be available for students. T The Messaging service allows users to communicate with eachother and saves their messges. The forum service allows users to communicate in a reddit-style environment.

I created the student service. The Student page is a profile page for students where they can view their courses, personalize their schedule, and choose a very nice profile picture. It stores the information for all students accross several tables (outlined here again: https://app.diagrams.net/#G1Lv49geXhtRD7t88zu8SpjHmqQDpfSxgc). This includes what courses they are taking, their teachers, their schedule, and profile picture. When updated, this information is changed in the databases and will persist. 

## Running the Student Microservice
To run the student microservice, clone and fork this repository and run docker-compose up in the students directory. 

Since this page is meant to be called from a login request, simulate the login before opening the page so the cookie is set appropriately. 

1. To simulate a login request, open another tab to: http://localhost:6004/login?username=krystian101&password=password123. This will create a cooke that is read upon opening the student page.

2. Open your browser to http://localhost:6001 (not 6002).  It should now load with Krystian's information. 


Note: If you try to open the page (http://localhost:6001) without setting the cookie first, you're gonna have a bad time. Bring down the whole service and re-run docker-compose up. Then re-read the directions and try again you hoolagin.


This service is meant to be used in conjunction with the other services. Students are directed to this page from the Marketplace. When a student logs in, a query is sent to localhost:6004 (or 6001, proxy allows requests sent to the react front end) (students db hosted in students microservice) and the database is queried for that username and password. If found, a cookie is created with the student's id. On load, the student page (localhost:6001) pulls the id from the cookie and displays the student's name, profile picture, classes, and personalized schedule (querried from stored db). 

