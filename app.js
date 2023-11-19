const Joi = require('joi');
const express = require ('express');
const app = express();
app.use(express.json());  //Middleware
const courses = [
    {id: 1, name: "html"},
    {id: 2, name: "css"},
    {id: 3, name: "javascript"},
]

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

app.get('/api/courses', (req, res) => {
        res.send(courses)
    });

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course with the id not found");

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);
    // if (result.error){
    //     res.status(400).send(result.error)
    //     return;
    // }
    if (result.error){
            res.status(400).send(result.error.details[0].message)
            return;
        }

    // if (!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required and it should not be less than 3')
    //     return
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course)
});

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id===parseInt(req.params.id))
    if(!course) res.status(404).send('The course was not found');

    const schema = {
        name :Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema)

    if(result.error){ res.status(404).send(result.error.details[0].message); 
    return;
}

course.name =req.body.name
res.send(course)
});

const port = process.env.PORT || 3000; //this is to inform node to use port 3000, if it isnt available.

// app.get('/api/courses', (req, res) => {
//     res.send(["javascript", "react", "node"])
// });
 
app.listen(3000, () => {console.log(`listening on port ${port}...`)});

