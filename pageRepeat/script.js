const recordBtn = document.getElementById('recordBtn');
const resultText = document.getElementById('resultText');

// Проверка поддержки браузером
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    recordBtn.disabled = true;
    recordBtn.textContent = '❌ Ваш браузер не поддерживает распознавание речи';
    console.error('Web Speech API не поддерживается');
} else {
    const recognition = new SpeechRecognition();
    
    // Настройки
    recognition.lang = 'ru-RU';        // Русский язык
    recognition.interimResults = true; // Показывать промежуточные результаты
    recognition.continuous = true;     // Записывать до команды stop, а не только одну фразу
    recognition.maxAlternatives = 1;   // Количество альтернатив
    
    let isRecording = false;
    
    recordBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
            recordBtn.classList.remove('recording');
            recordBtn.textContent = '🎤 Начать запись';
            isRecording = false;
        } else {
            recognition.start();
            recordBtn.classList.add('recording');
            recordBtn.textContent = '🔴 Остановить запись';
            isRecording = true;
            resultText.value = ''; // Очистить предыдущий текст
        }
    });
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Показываем промежуточный результат (серым, если нужно)
        resultText.value = finalTranscript + (interimTranscript ? '[' + interimTranscript + ']' : '');
    };
    
    recognition.onerror = (event) => {
        console.error('Ошибка:', event.error);
        resultText.value = `Ошибка: ${event.error}`;
        if (isRecording) {
            recognition.stop();
            recordBtn.classList.remove('recording');
            recordBtn.textContent = '🎤 Начать запись';
            isRecording = false;
        }
    };
    
    recognition.onend = () => {
        // Если запись закончилась не по кнопке, синхронизируем UI
        if (isRecording) {
            recordBtn.classList.remove('recording');
            recordBtn.textContent = '🎤 Начать запись';
            isRecording = false;
        }
    };
}