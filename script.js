// MBTI Assessment handling
function startAssessment() {
    // Implement MBTI assessment logic
    console.log("Starting MBTI assessment...");
}

// Theme handling
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
});

// Chat functionality
class DengXChat {
    constructor() {
        this.messages = [];
        this.currentQuizQuestion = 0;
        this.userProfile = {
            name: '',
            personality: {},
            progress: 0
        };
        this.isTyping = false;
        
        // Initialize UI elements
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.voiceButton = document.querySelector('.voice-button');
        this.sendButton = document.querySelector('.send-button');
        
        // Bind events
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        this.voiceButton.addEventListener('click', () => this.startVoiceInput());
        
        // Start welcome sequence
        this.showWelcomeMessage();
        
        // Initialize progress tree
        this.progressTree = new ProgressTree();
        this.lessonManager = new LessonManager();
        this.quizManager = new QuizManager();
        this.achievementSystem = new AchievementSystem();
        this.startTime = Date.now();
    }

    async showWelcomeMessage() {
        await this.addBotMessage("Kumusta! Ako si DengX, ang iyong kaibigan laban sa dengue. Ano ang iyong pangalan?");
    }

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Clear input
        this.userInput.value = '';

        // Show user message
        await this.addUserMessage(message);

        // Handle different chat states
        if (!this.userProfile.name) {
            this.userProfile.name = message;
            await this.startPersonalityQuiz();
        } else if (this.currentQuizQuestion < personalityQuestions.length) {
            await this.handleQuizAnswer(message);
        } else {
            await this.handleGeneralChat(message);
        }
    }

    async addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    async addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        // Add typing animation
        this.isTyping = true;
        messageDiv.innerHTML = '<div class="typing-animation"></div>';
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show actual message
        messageDiv.textContent = text;
        this.isTyping = false;
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async startPersonalityQuiz() {
        await this.addBotMessage(`Salamat, ${this.userProfile.name}! Para mas makapag-bigay ako ng angkop na mga aralin, sagutin mo muna ang ilang tanong.`);
        await this.askNextQuizQuestion();
    }

    async askNextQuizQuestion() {
        if (this.currentQuizQuestion < personalityQuestions.length) {
            const question = personalityQuestions[this.currentQuizQuestion];
            await this.addBotMessage(question.question);
            this.addQuizOptions(question.options);
        } else {
            await this.finishQuiz();
        }
    }

    addQuizOptions(options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.handleQuizAnswer(option));
            optionsContainer.appendChild(button);
        });

        this.chatMessages.appendChild(optionsContainer);
        this.scrollToBottom();
    }

    async handleQuizAnswer(answer) {
        // Store answer
        this.userProfile.personality[`q${this.currentQuizQuestion}`] = answer;
        this.currentQuizQuestion++;
        
        // Move to next question or finish quiz
        await this.askNextQuizQuestion();
    }

    async finishQuiz() {
        await this.addBotMessage(`Salamat sa pagsagot, ${this.userProfile.name}! Ngayon ay alam ko na kung paano mas maiging magturo sa iyo tungkol sa dengue prevention.`);
        await this.startMainLearningPath();
    }

    async startMainLearningPath() {
        // Initialize progress tree
        this.updateProgressTree(0);
        
        // Start first lesson
        await this.addBotMessage("Simulan natin ang ating unang aralin tungkol sa dengue prevention. Handa ka na ba?");
    }

    updateProgressTree(progress) {
        this.progressTree.updateProgress(progress);
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Paumanhin, hindi supported ang voice input sa browser na ito.');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'tl-PH';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            this.userInput.value = text;
            this.handleUserInput();
        };

        recognition.start();
    }

    async handleGeneralChat(message) {
        const response = this.lessonManager.getResponse(message);
        
        // Handle different response types
        if (response.message) {
            await this.addBotMessage(response.message);
        }
        
        if (response.keyPoints) {
            await this.addBotMessage("Mahahalagang Punto:");
            response.keyPoints.forEach(async point => {
                await this.addBotMessage(`• ${point}`);
            });
        }
        
        if (response.suggestions) {
            await this.addSuggestionButtons(response.suggestions);
        }
    }

    async addSuggestionButtons(suggestions) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'suggestion-buttons';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-button';
            button.textContent = suggestion;
            button.addEventListener('click', () => this.handleUserInput(suggestion));
            buttonsContainer.appendChild(button);
        });
        
        this.chatMessages.appendChild(buttonsContainer);
        this.scrollToBottom();
    }

    async startQuiz(topic) {
        const question = this.quizManager.startQuiz(topic, this.currentLanguage);
        await this.showQuestion(question);
    }

    async showQuestion(questionData) {
        if (questionData.type === 'question') {
            await this.addBotMessage(questionData.question);
            this.addQuizOptions(questionData.options, questionData.questionId);
        } else if (questionData.type === 'summary') {
            await this.showQuizSummary(questionData);
        }
    }

    addQuizOptions(options, questionId) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.handleQuizAnswer(questionId, index));
            optionsContainer.appendChild(button);
        });

        this.chatMessages.appendChild(optionsContainer);
        this.scrollToBottom();
    }

    async handleQuizAnswer(questionId, selectedOption) {
        const result = this.quizManager.checkAnswer(questionId, selectedOption, this.currentLanguage);
        
        if (result.isCorrect) {
            await this.addBotMessage("✅ Tama!");
            this.checkLessonAchievements();
        } else {
            await this.addBotMessage("❌ Hindi tama. Subukan muli!");
        }

        await this.showNextQuestion();
    }

    async showQuizSummary(summary) {
        await this.addBotMessage(`Quiz Results: ${summary.score}/${summary.total} (${summary.percentage}%)`);
        await this.addBotMessage(summary.message);
        
        if (summary.percentage < 60) {
            await this.addBotMessage("Gusto mo bang ulitin ang lesson?");
            this.addYesNoButtons();
        } else {
            await this.addBotMessage("Ready ka na para sa susunod na lesson!");
            this.progressTree.updateProgress(this.currentLesson + 1);
        }
    }

    addYesNoButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'yes-no-buttons';
        
        const yesButton = document.createElement('button');
        yesButton.className = 'btn btn-primary';
        yesButton.textContent = 'Oo';
        yesButton.onclick = () => this.restartLesson();
        
        const noButton = document.createElement('button');
        noButton.className = 'btn btn-secondary';
        noButton.textContent = 'Hindi';
        noButton.onclick = () => this.continueLearning();
        
        buttonsContainer.appendChild(yesButton);
        buttonsContainer.appendChild(noButton);
        this.chatMessages.appendChild(buttonsContainer);
    }

    checkLessonAchievements() {
        const stats = {
            lessonTime: (Date.now() - this.startTime) / 1000, // Convert to seconds
            quizScore: this.quizManager?.score || 0,
            preventionLessonsCompleted: this.progressTree.isTopicCompleted('prevention'),
            allLessonsCompleted: this.progressTree.isAllCompleted()
        };

        this.achievementSystem.checkAchievements(stats);
    }

    async completeLessonSection() {
        this.checkLessonAchievements();
        await this.progressTree.updateProgress(this.currentLesson + 1);
    }
}

// Personality quiz questions
const personalityQuestions = [
    {
        question: "Mas gusto mo bang matuto sa pamamagitan ng videos o text?",
        options: ["Videos", "Text"]
    },
    {
        question: "Mas komportable ka ba mag-aral mag-isa o kasama ang ibang tao?",
        options: ["Mag-isa", "Kasama ang iba"]
    },
    {
        question: "Paano mo mas gustong matuto tungkol sa dengue prevention?",
        options: ["Sa pamamagitan ng mga kwento", "Sa pamamagitan ng mga facts"]
    },
    {
        question: "Ano ang mas gusto mong gawin muna?",
        options: ["Makinig sa instructions", "Subukan agad"]
    },
    {
        question: "Paano mo gustong i-track ang iyong progress?",
        options: ["Visual na representation", "Detailed na listahan"]
    }
];

// Initialize chat when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const dengXChat = new DengXChat();
}); 