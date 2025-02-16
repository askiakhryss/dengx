class QuizManager {
    constructor() {
        this.quizzes = {
            basics: [
                {
                    id: 'q1',
                    tagalog: {
                        question: "Anong uri ng lamok ang nagdadala ng dengue virus?",
                        options: [
                            "Aedes aegypti",
                            "Anopheles",
                            "Culex",
                            "Mansonia"
                        ],
                        correct: 0,
                        explanation: "Ang Aedes aegypti lamok ang pangunahing tagapagdala ng dengue virus."
                    },
                    english: {
                        question: "Which mosquito species carries the dengue virus?",
                        options: [
                            "Aedes aegypti",
                            "Anopheles",
                            "Culex",
                            "Mansonia"
                        ],
                        correct: 0,
                        explanation: "The Aedes aegypti mosquito is the primary carrier of the dengue virus."
                    }
                },
                {
                    id: 'q2',
                    tagalog: {
                        question: "Kailan pinakamadalas kumagat ang mga lamok na may dalang dengue?",
                        options: [
                            "Madaling araw at takipsilim",
                            "Tanghali",
                            "Hatinggabi",
                            "Lahat ng oras"
                        ],
                        correct: 0,
                        explanation: "Ang Aedes mosquito ay aktibo tuwing madaling araw at takipsilim."
                    },
                    english: {
                        question: "When are dengue-carrying mosquitoes most active?",
                        options: [
                            "Dawn and dusk",
                            "Noon",
                            "Midnight",
                            "All times"
                        ],
                        correct: 0,
                        explanation: "Aedes mosquitoes are most active during dawn and dusk."
                    }
                }
            ],
            prevention: [
                // Prevention quiz questions
            ],
            symptoms: [
                // Symptoms quiz questions
            ]
        };
        
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.score = 0;
    }

    startQuiz(topic, language = 'tagalog') {
        this.currentQuiz = this.quizzes[topic];
        this.currentQuestion = 0;
        this.score = 0;
        return this.getNextQuestion(language);
    }

    getNextQuestion(language) {
        if (!this.currentQuiz || this.currentQuestion >= this.currentQuiz.length) {
            return this.getQuizSummary(language);
        }

        const question = this.currentQuiz[this.currentQuestion][language];
        return {
            type: 'question',
            question: question.question,
            options: question.options,
            questionId: this.currentQuiz[this.currentQuestion].id
        };
    }

    checkAnswer(questionId, selectedOption, language) {
        const question = this.currentQuiz.find(q => q.id === questionId);
        const isCorrect = question[language].correct === selectedOption;
        
        if (isCorrect) {
            this.score++;
        }

        const response = {
            type: 'answer',
            isCorrect,
            explanation: question[language].explanation,
            correctOption: question[language].options[question[language].correct]
        };

        this.currentQuestion++;
        return response;
    }

    getQuizSummary(language) {
        const totalQuestions = this.currentQuiz.length;
        const percentage = (this.score / totalQuestions) * 100;
        
        return {
            type: 'summary',
            score: this.score,
            total: totalQuestions,
            percentage,
            message: this.getScoreMessage(percentage, language)
        };
    }

    getScoreMessage(percentage, language) {
        if (language === 'tagalog') {
            if (percentage >= 80) {
                return "Napakagaling! Mahusay ang iyong pag-unawa sa dengue prevention!";
            } else if (percentage >= 60) {
                return "Magaling! May mga bagay pa tayong dapat pag-aralan.";
            } else {
                return "Kailangan pa nating pag-aralan ang tungkol sa dengue. Subukan nating ulitin ang lesson!";
            }
        } else {
            if (percentage >= 80) {
                return "Excellent! You have a great understanding of dengue prevention!";
            } else if (percentage >= 60) {
                return "Good job! There are still some things we need to learn.";
            } else {
                return "We need to study more about dengue. Let's try the lesson again!";
            }
        }
    }
} 