const dengueContent = {
    basics: {
        "Ano ang Dengue?": {
            tagalog: {
                explanation: "Ang dengue ay isang sakit na dulot ng kagat ng lamok na may dalang dengue virus. Ang lamok na ito ay tinatawag na Aedes aegypti.",
                keyPoints: [
                    "Kumakalat sa pamamagitan ng kagat ng lamok",
                    "Ang lamok na Aedes ay aktibo tuwing umaga at takipsilim",
                    "Hindi direktang nakakahawa sa tao ang dengue"
                ],
                video: "link-to-dengue-basics-video",
                quiz: [
                    {
                        question: "Anong uri ng lamok ang nagdadala ng dengue virus?",
                        options: ["Aedes aegypti", "Anopheles", "Culex"],
                        correct: 0
                    }
                ]
            },
            english: {
                explanation: "Dengue is a disease caused by a virus transmitted through mosquito bites, specifically from the Aedes aegypti mosquito.",
                keyPoints: [
                    "Spreads through mosquito bites",
                    "Aedes mosquitoes are active during dawn and dusk",
                    "Dengue is not directly transmitted between humans"
                ],
                video: "link-to-dengue-basics-video",
                quiz: [
                    {
                        question: "Which type of mosquito carries the dengue virus?",
                        options: ["Aedes aegypti", "Anopheles", "Culex"],
                        correct: 0
                    }
                ]
            }
        },
        "Mga Sintomas": {
            tagalog: {
                explanation: "Ang mga karaniwang sintomas ng dengue ay lagnat, pananakit ng ulo, pananakit ng katawan, at pagduduwal.",
                keyPoints: [
                    "Mataas na lagnat (40°C/104°F)",
                    "Matinding pananakit ng ulo at mata",
                    "Pananakit ng kalamnan at kasukasuan",
                    "Pagduduwal at pagsusuka",
                    "Pamamaga ng lymph nodes",
                    "Pantal sa balat"
                ],
                warningSignals: [
                    "Matinding pananakit ng tiyan",
                    "Patuloy na pagsusuka",
                    "Pagdurugo ng gilagid o ilong",
                    "Pagkahapo o pagod",
                    "Malamig at malambot na balat"
                ],
                video: "link-to-symptoms-video"
            },
            english: {
                // Similar structure for English content
            }
        }
    },
    prevention: {
        "4S Strategy": {
            tagalog: {
                explanation: "Ang 4S ay ang pangunahing estratehiya sa pag-iwas sa dengue.",
                steps: [
                    {
                        name: "Search and Destroy",
                        details: "Hanapin at sirain ang mga pinamumugaran ng lamok"
                    },
                    {
                        name: "Self-Protection",
                        details: "Magsuot ng long sleeves at gumamit ng mosquito repellent"
                    },
                    {
                        name: "Seek Early Consultation",
                        details: "Magpatingin agad sa doktor kung may mga sintomas"
                    },
                    {
                        name: "Support Fogging",
                        details: "Suportahan ang fogging operations sa komunidad"
                    }
                ],
                video: "link-to-4s-strategy-video"
            },
            english: {
                // Similar structure for English content
            }
        }
    }
};

class LessonManager {
    constructor(language = 'tagalog') {
        this.currentLanguage = language;
        this.currentLesson = null;
        this.currentTopic = null;
    }

    getResponse(userInput) {
        // Simple keyword matching for demo purposes
        const keywords = userInput.toLowerCase().split(' ');
        
        if (keywords.includes('dengue')) {
            return this.getBasicInfo();
        } else if (keywords.includes('sintomas') || keywords.includes('symptoms')) {
            return this.getSymptoms();
        } else if (keywords.includes('4s') || keywords.includes('prevention')) {
            return this.get4SStrategy();
        }

        // Default response if no keywords match
        return {
            message: this.currentLanguage === 'tagalog' 
                ? "Pasensya na, hindi ko naintindihan ang iyong tanong. Pwede mo bang i-rephrase ito?"
                : "I'm sorry, I didn't understand your question. Could you rephrase it?",
            suggestions: [
                "Ano ang dengue?",
                "Mga sintomas ng dengue",
                "Paano maiiwasan ang dengue?"
            ]
        };
    }

    getBasicInfo() {
        const content = dengueContent.basics["Ano ang Dengue?"][this.currentLanguage];
        return {
            message: content.explanation,
            keyPoints: content.keyPoints,
            video: content.video
        };
    }

    getSymptoms() {
        const content = dengueContent.basics["Mga Sintomas"][this.currentLanguage];
        return {
            message: content.explanation,
            keyPoints: content.keyPoints,
            warningSignals: content.warningSignals,
            video: content.video
        };
    }

    get4SStrategy() {
        const content = dengueContent.prevention["4S Strategy"][this.currentLanguage];
        return {
            message: content.explanation,
            steps: content.steps,
            video: content.video
        };
    }

    switchLanguage(language) {
        this.currentLanguage = language;
    }
} 