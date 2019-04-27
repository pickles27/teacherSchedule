CREATE DATABASE teacher_schedule_db;
\c teacher_schedule_db;

CREATE TABLE teachers (teacherId SERIAL PRIMARY KEY, 
											 teacherName VARCHAR(100) NOT NULL);

CREATE TABLE classes (classId SERIAL PRIMARY KEY, 
											teacherId INTEGER REFERENCES teachers(teacherId),
											className VARCHAR(100) NOT NULL);

CREATE TABLE schedule_entry (id SERIAL PRIMARY KEY,
														 teacher INTEGER REFERENCES teachers(teacherId),
														 class INTEGER REFERENCES classes(classId),
														 day VARCHAR(10) NOT NULL,
														 hour INTEGER NOT NULL,
														 minute INTEGER NOT NULL);

INSERT INTO teachers (teacherName) VALUES ('Sally Jones');