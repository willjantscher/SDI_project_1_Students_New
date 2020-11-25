# Student Microservice

This microservice is a part of a larger application that is meant to provide services to students and teachers. There are five microservices that work together; they are depicted here: https://app.diagrams.net/#G1Lv49geXhtRD7t88zu8SpjHmqQDpfSxgc. The Marketplace serves as a login/home page and is where students can view available classes and sign up for them. The Teacher page is the profile page for teachers where they can view students in their classes and post new classes to be available for students. The Student page is a profile page for students where they can view their courses, personalize their schedule, and choose a very nice profile picture. The Messaging service allows users to communicate with eachother and saves their messges. The forum service allows users to communicate in a reddit-style environment.

## Running the Student Microservice
To run the student microservice, clone and fork this repository and run docker-compose up in the students directory. Then, open your browser to http://localhost:6001 (not 6002). 

Note: this service is meant to be used in conjunction with the other services. Students are directed to this page from the Marketplace. When a student logs in, a query is sent to localhost:6004 (students db hosted in students microservice) and the database is queried for that username and password. If found, a cookie is created with the student's id. On load, the student page (localhost:6001) pulls the id from the cookie and displays the student's name, profile picture, classes, and personalized schedule (querried from stored db). 

To simulate a login request, open another tab (or use postman) to: http://localhost:6004/login?username=krystian101&password=password123 and then reload the localhost:6001 page. It should now load with Krystian's information.

