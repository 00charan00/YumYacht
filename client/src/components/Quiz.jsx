import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


function App() {
    const [quizname, setQuizname] = useState('');
    const [questions, setQuestions] = useState([{ question: '', opt1: '', opt2: '', opt3: '', opt4: '', ans: '' }]);
    const navigate = useNavigate();

    const handleQuestionChange = (index, key, value) => {
        const newQuestions = [...questions];
        newQuestions[index][key] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', opt1: '', opt2: '', opt3: '', opt4: '', ans: '' }]);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://quizlinx.onrender.com/create-quiz', { quizname, questions });
            console.log(res.data);


            toast.success('Quiz created!');
            navigate('/home');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar/>

        <div className="App bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
            <input
                type="text"
                placeholder="Enter Quiz Name"
                value={quizname}
                onChange={(e) => setQuizname(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            {questions.map((question, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                    <input
                        type="text"
                        placeholder="Enter Question"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Option 1"
                        value={question.opt1}
                        onChange={(e) => handleQuestionChange(index, 'opt1', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Option 2"
                        value={question.opt2}
                        onChange={(e) => handleQuestionChange(index, 'opt2', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Option 3"
                        value={question.opt3}
                        onChange={(e) => handleQuestionChange(index, 'opt3', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Option 4"
                        value={question.opt4}
                        onChange={(e) => handleQuestionChange(index, 'opt4', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Correct Option"
                        value={question.ans}
                        onChange={(e) => handleQuestionChange(index, 'ans', e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                </div>
            ))}
            <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Question</button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Create Quiz</button>
        </div>
            <Footer/>
        </div>
    );
}

export default App;
