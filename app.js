const Joi = require("joi");
const config = require("config");
const express = require("express");
const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db')

app.use(express.json()) //Middleware
app.use(express.urlencoded({extended: true})) //urlencoded middleware
app.use(express.static('public'))


app.use(helmet())

// dbDebugger('Connected to database...');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan Enabled...');
}
app.use(logger)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`) //always on caps, Always arrange code this pattern.
console.log(`app: ${app.get('env')}`) //

console.log('Application Name' + config.get('name'));
console.log('Mail Server' + config.get('mail.host'));
console.log('Mail Password' + config.get('mail.password'));

// app.use(function (req, res, next) {
//   console.log("Login...");
//   next();
// });


const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "javascript" },
];

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

// app.get('/api/courses', (req, res) => {
//         res.send([1, 2, 3])
//     });


// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params)
// });

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query)
// });

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course with the id not found");

  const { error } = validateCourse(req.body);

  if (error) return;
  res.status(400).send(error.details[0].message);

//   course.push = req.body.name;
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  const { error } = validateCourse(req.body);
  //   console.log(result);

  if (error) return nres.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course was not found");

  const schema = {
    name: Joi.string().min(3).required(),
  };

  // const result = Joi.validate(req.body, schema)
  // const result = validateCourse(req.body)
  const { error } = validateCourse(req.body);

  // if(result.error){ res.status(404).send(result.error.details[0].message);
  //   return;
  // }
  if (error) return;
  res.status(404).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(error.details[0].message);
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course)
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000; //this is to inform node to use port 3000, if it isnt available.

// app.get('/api/courses', (req, res) => {
//     res.send(["javascript", "react", "node"])
// });
// app.get('/api/courses/:id', (req, res) =>

app.listen(3000, () => {
  console.log(`listening on port ${port}...`);
});
