const questions = [
    { question: "¿Cuál es el color del caballo?" },
    { question: "¿Estatura del caballo?" },
    { question: "¿Cuál es el peso del caballo?" },
    { question: "¿Cómo es el pelaje del caballo?" },
    { question: "¿Algunas caracteristicas del caballo?" }
];

// Iniciar el índice de preguntas
let questionIndex = 0;

// Array para guardar las respuestas
let answers = [];

// Función para mostrar las preguntas
function showQuestion() {
    if (questionIndex < questions.length) {
        const currentQuestion = questions[questionIndex]; // Acceder a la pregunta actual

        // Mostrar la pregunta y el campo de texto
        document.getElementById('question').innerHTML = `
        <p><strong>${currentQuestion.question}</strong></p>
        <div class="input-group">
            <input type="text" id="user-answer" placeholder="Escribe tu respuesta aquí" class="form-control">
            <button onclick="saveAnswersQuestions()" class="btn btn-dark">Enviar</button>
        </div>
        `;

    }
}

// Función para guardar las respuestas
function saveAnswersQuestions() {
    const userAnswer = document.getElementById('user-answer').value.trim();
    if (userAnswer !== "") {
        // Añadir la respuesta al array de respuestas
        answers.push(userAnswer);
        questionIndex++;

        // Si ya se han respondido todas las preguntas, enviar el mensaje a la API
        if (questionIndex === questions.length) {
            sendMessage();
        } else {
            // Mostrar la siguiente pregunta
            showQuestion();
        }
    } else {
        alert("Por favor, escribe una respuesta antes de enviar.");
    }
}

// API key de OpenAI (no olvides proteger esta clave en un entorno real)
const apiKey = 'YOUR-KEY';

// Función para enviar el mensaje a la API de OpenAI
async function sendMessage() {
    // Formatear el mensaje a enviar a la API con las respuestas del usuario
    let textUser = `
    Te paso las características de un caballo. ¿Podrías identificar qué tipo de caballo es según estas características?
    - Color: ${answers[0]}
    - Estatura: ${answers[1]} cm
    - Peso: ${answers[2]} kg
    - Pelaje: ${answers[3]}
    - Altura: ${answers[4]} cm
    - Características adicionales: ${answers[5]}
    
    Por favor, dime a qué raza de caballo pertenece. No es necesario generar texto adicional.
    `;

    // Hacer la solicitud a la API de OpenAI usando el endpoint de ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: textUser }],
            temperature: 0.3,
        }),
    });

    // Obtener los datos de la respuesta
    const data = await response.json();
    console.log(data); // Para depurar y ver la respuesta completa

    // Comprobar que la respuesta contiene 'choices' y obtener el mensaje de respuesta
    if (data && data.choices && data.choices[0].message) {
        const botMessage = data.choices[0].message.content;

        // Mostrar mensaje del chatbot
        const chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += `<br><p><strong>Respuesta:</strong> ${botMessage}</p>`;
    } else {
        console.error("No se encontraron respuestas de la API:", data);
        const chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += `<br><p><strong>Respuesta:</strong> Lo siento, no pude obtener una respuesta en este momento.</p>`;
    }
}

// Llamar a la función para mostrar la primera pregunta
showQuestion();
