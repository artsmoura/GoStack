const express = require('express');
const {v4: uuid_v4} = require('uuid');
 
const app = express();
app.use(express.json());

const lessons = [];

app.get('/lessons', (request, response) => {

    const { title } = request.query;

    const results = title
        ? lessons.filter(lesson => lesson.title.includes(title))
        : lessons;

    return response.json(results);
});

app.post('/lessons', (request, response) => {

    const {title, owner} = request.body;

    const lesson = { id:uuid_v4(), title, owner};

    lessons.push(lesson);

    return response.json(lesson);
});

app.put('/lessons/:id', (request, response) => {

    const { id } = request.params;
    const {title, owner} = request.body;

    const lessonIndex = lessons.findIndex(lesson => lesson.id == id);

    if(lessonIndex < 0){
        return response.status(400).json({ error: 'Lesson not found' });
    }

    const lesson = {
        id,
        title,
        owner,
    };

    lessons[lessonIndex] = lesson;

    return response.json(lesson);
});

app.delete('/lessons/:id', (request, response) => {

    const { id } = request.params;

    const lessonIndex = lessons.findIndex(lesson => lesson.id == id);

    if(lessonIndex < 0){
        return response.status(400).json({ error: 'Lesson not found' });
    }

    lessons.splice(lessonIndex, 1);

    return response.status(204).send();
});

app.listen((3333), () => {
    console.log("Back-End Start 😎")
});