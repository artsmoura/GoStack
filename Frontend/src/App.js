import React, {useEffect, useState} from 'react';
import baseURL from './services/api';
import './App.css';
import Header from './components/Header';
import api from './services/api';

function App(){
    //before
    //const lessons = ['Lesson Back-End', 'Lesson Front-End'];
    
    //after
    //allways put the type os useState based of the firts state, in this case lessons is a array []
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        api.get('/lessons').then(response => {
            setLessons(response.data);
        })
    },[]);

    async function handleNewLesson(){
        //before
        //lessons.push(`New Lesson ${Date.now()}`);

        //after
        /* setLessons([...lessons, `New Lesson ${Date.now()}`]) */

       const response = await api.post('lessons', {
            title: `New Lesson ${Date.now()}`,
            owner: "Arthur Simoes"
        })

        const lesson = response.data;

        setLessons([...lessons, lesson])
    }

    return(
        <>
         <Header title="Lesson React" />

             <ul>
                 {lessons.map(lesson =>(
                     <li key={lesson.id}>
                         {lesson.title}
                     </li>
                 ))}
             </ul>

             <button type="button" onClick={handleNewLesson}>New Lesson</button>
        </>

    );
}

export default App;