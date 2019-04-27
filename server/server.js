const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const db = require('../database/db.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/teacherInfo', (req, res) => {
  var teacherId = req.query.id;
  db.getTeacherNameById(teacherId)
  .then(result => {
    res.status(200).send(result.rows[0]);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/newClass', (req, res) => {
  var teacherId = req.body.teacherId;
  var className = req.body.className;
  db.addNewClass(teacherId, className)
  .then(result => {
    res.status(200).send(result.rows[0]);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/classList', (req, res) => {
  var teacherId = req.query.teacherId
  db.getClassList(teacherId)
  .then(result => {
    res.status(200).send(result.rows);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/scheduleClass', (req, res) => {
  var teacherId = req.body.teacherId;
  var classId = req.body.classId;
  var day = req.body.day;
  var hour = req.body.hour;
  var minute = req.body.minute;
  db.addToSchedule(teacherId, classId, day, hour, minute)
  .then(result => {
    res.status(200).send(result.rows);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/getSchedule', (req, res) => {
  var teacherId = req.query.teacherId;
  db.getSchedule(teacherId)
  .then(result => {
    res.status(200).send(result.rows);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}.......`));
