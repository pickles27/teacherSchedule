Welcome to Teacher Schedule!

Requirements:
* PostgreSQL
* node / npm

//-----------------------------

Install dependencies:

- Run 'npm install' to install dependencies listed in package.json

//-----------------------------

To setup the database:

- The database we create will be named 'teacher_schedule_db'
- If you'd like to restart the program with new data, this database must be dropped before running the SQL script again, using: DROP DATABASE teacher_schedule_db. You can also insert this into the very top of database-setup.sql if you'd like but I left it out to be safe.

- Please run this command to run the SQL script:
		"psql -U myUsername -d postgres -f scripts/database-setup.sql"

- To connect, you must create a .env file in the root directory of this project (same level as package.json file). In this file (saved as ".env") you can write:
	DB_USER=yourUserName
	DB_HOST=localhost
	DB_PASSWORD=yourPassword
	DB_PORT=5432 (whatever port you run postgres on)
	DB_NAME=teacher_schedule_db

//-----------------------------

Start servers:

- Run 'npm start' to start the react dev server.
- Run 'npm run server' to start the Express backend.

//-----------------------------

Start the app:

- Open a browser and type localhost:3000

//-----------------------------


//-----------------------------

Next steps:

- Home page would include some sort of account creation, which would allow the app to be useful to different users.

- User authentication / authorization
	- for purposes of time, teacherId / teacherName are hardcoded

- Currently, functionality to add classes is supported, but not edit/delete. These would need to be added to the app.

- Other columns could be added to the tables in the database with more teacher info. For simplicity only teacherId and teacherName are included.

- Add unique constraints in database for each teacher's class names, and input validation

- Add notifications :)
