CREATE TABLE students (id serial PRIMARY KEY, first_name text NOT NULL, last_name text NOT NULL, username varchar(20), password varchar(20), profile_picture int);
INSERT INTO students (first_name, last_name, username, password, profile_picture) VALUES
( 'Krystian', 'Austin', 'krystian101', 'password123', 0),
( 'Ozan', 'Castillo', 'OzanC', 'OzanRulz', 0),
( 'Clay', 'Ponce', 'Me123', 'PonCE123', 0),
( 'Fred', 'Major', 'superman', 'helloMe', 0);

CREATE TABLE courses (id serial PRIMARY KEY, course text NOT NULL, teacher_first_name text, teacher_last_name text);
INSERT INTO courses (course, teacher_first_name, teacher_last_name) VALUES 
( 'Math', 'Pythagrius', 'Triangle'),
( 'Physics', 'Issac', 'Oldton'),
( 'Nonsense', 'Albert', 'NotSoEinstein'),
( 'English', 'Charles', 'Richard'),
( 'Poetry', 'William', 'Stillsword');

CREATE TABLE students_courses (id serial PRIMARY KEY, student_id int, course_id int, startDate text, stopDate text);
INSERT INTO students_courses (student_id, course_id) VALUES 
( 1, 1 ),
( 1, 3 ),
( 1, 4 ),
( 2, 2 ),
( 2, 5 ),
( 3, 3 ),
( 4, 4 ),
( 4, 5 );
-- will not start with values for start/stop dates

