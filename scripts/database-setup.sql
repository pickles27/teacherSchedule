CREATE DATABASE teacher_schedule_db;
\c teacher_schedule_db;

CREATE TABLE teachers (id SERIAL PRIMARY KEY, 
											 teacher_name VARCHAR(100) NOT NULL);

CREATE TABLE classes (id SERIAL PRIMARY KEY, 
											teacher_id INTEGER REFERENCES teachers(id),
											class_name VARCHAR(100) NOT NULL);

CREATE TABLE schedule_entry (id SERIAL PRIMARY KEY,
														 teacher_id INTEGER REFERENCES teachers(id),
														 class_id INTEGER REFERENCES classes(id),
														 day VARCHAR(10) NOT NULL,
														 hour INTEGER NOT NULL,
														 minute INTEGER NOT NULL);

INSERT INTO teachers (teacher_name) VALUES ('Sally Jones');