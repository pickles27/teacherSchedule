require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

client.connect();

function getTeacherNameById(id) {
  let query = "SELECT teacher_name AS name FROM teachers WHERE id = $1";
  let values = [id];
  return client.query(query, values);
}

function addNewClass(teacherId, className) {
  let query = "INSERT INTO classes (teacher_id, class_name) VALUES ($1, $2) RETURNING id, class_name AS name";
  let values = [teacherId, className];
  return client.query(query, values);
}

function getClassList(teacherId) {
  let query = "SELECT id, class_name AS name FROM classes WHERE teacher_id = $1";
  let values = [teacherId];
  return client.query(query, values);
}

function addToSchedule(teacherId, classId, day, hour, minute) {
  let query = "INSERT INTO schedule_entry (teacher_id, class_id, day, hour, minute) VALUES ($1, $2, $3, $4, $5) RETURNING class_id AS classid, day, hour, minute";
  let values = [teacherId, classId, day, hour, minute];
  return client.query(query, values);
}

function getSchedule(teacherId) {
  let query = "SELECT id, teacher_id, class_id, day, hour, minute FROM schedule_entry WHERE teacher_id = $1";
  let values = [teacherId];
  return client.query(query, values);
}

module.exports = {
  getTeacherNameById,
  addNewClass,
  getClassList,
  addToSchedule,
  getSchedule
}

