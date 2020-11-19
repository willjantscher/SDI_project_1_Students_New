CREATE TABLE students (id serial PRIMARY KEY, first_name text, last_name text, username varchar(20), password varchar(20), credit int);
INSERT INTO students (first_name, last_name, username, password, credit) VALUES
( 'Krystian', 'Austin', 'krystian101', 'password123', 1234),
( 'Ozan', 'Castillo', 'OzanC', 'OzanRulz', 9983),
( 'Clay', 'Ponce', 'Me123', 'PonCE123', 3091),
( 'Fred', 'Major', 'superman', 'helloMe', 8675);
