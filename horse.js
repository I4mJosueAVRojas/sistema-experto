const questions = [
    {
        question: "¿Selecciona un color para el caballo?",
    },
    {
        question: "¿Estatura del caballo?",
    },
    {
        question: "¿Cual es el peso?"
    },
    {
        question: "¿Como es el Pelaje?"
    },
    {
        question: "¿Cual es la altura del caballo?"
    },
    {
        question: "¿Algunas caracteristicas?"
    }
]


//Funcion para mostrar las preguntas

let questionIndex = 0;

function showQuestion() {
    if (questionIndex < questions.length) {
        const currentQuestion = questions[questionIndex]; // Acceder a la pregunta actual

        // Mostrar la pregunta y el campo de texto
        document.getElementById('question').innerHTML = `
            <p><strong>${currentQuestion.question}</strong></p>
            <input type="text" id="user-answer" placeholder="Escribe tu respuesta aquí">
            <br>
            <button onclick="saveAnswersQuestions()">Enviar Respuesta</button>
        `;
    }

    
}

function saveAnswersQuestions(){
    questionIndex++;
    

    const userAnswer = document.getElementById('user-answer').value.trim();

    let answers = [];
    answers.push(userAnswer);


    showQuestion();

}

showQuestion();