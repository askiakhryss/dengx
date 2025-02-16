class AchievementSystem {
    constructor() {
        this.achievements = {
            quickLearner: {
                id: 'quickLearner',
                tagalog: {
                    title: "Masigasig na Mag-aaral",
                    description: "Nakumpleto ang unang lesson sa loob ng 10 minuto!"
                },
                english: {
                    title: "Quick Learner",
                    description: "Completed first lesson within 10 minutes!"
                },
                icon: "🎓",
                earned: false
            },
            perfectScore: {
                id: 'perfectScore',
                tagalog: {
                    title: "Perpektong Puntos",
                    description: "Nakakuha ng 100% sa quiz!"
                },
                english: {
                    title: "Perfect Score",
                    description: "Got 100% on a quiz!"
                },
                icon: "⭐",
                earned: false
            },
            preventionPro: {
                id: 'preventionPro',
                tagalog: {
                    title: "Prevention Pro",
                    description: "Nakumpleto ang lahat ng prevention lessons!"
                },
                english: {
                    title: "Prevention Pro",
                    description: "Completed all prevention lessons!"
                },
                icon: "🛡️",
                earned: false
            },
            communityHero: {
                id: 'communityHero',
                tagalog: {
                    title: "Bayani ng Komunidad",
                    description: "Nakumpleto ang lahat ng lessons!"
                },
                english: {
                    title: "Community Hero",
                    description: "Completed all lessons!"
                },
                icon: "🦸‍♂️",
                earned: false
            }
        };

        this.createAchievementsPanel();
    }

    createAchievementsPanel() {
        const panel = document.createElement('div');
        panel.className = 'achievements-panel';
        panel.innerHTML = `
            <div class="achievements-header">
                <h3>Mga Badge</h3>
            </div>
            <div class="achievements-grid">
                ${Object.values(this.achievements).map(achievement => `
                    <div class="achievement-card ${achievement.earned ? 'earned' : 'locked'}" 
                         id="${achievement.id}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-info">
                            <h4>${achievement.tagalog.title}</h4>
                            <p>${achievement.tagalog.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.body.appendChild(panel);
    }

    async awardAchievement(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].earned) {
            this.achievements[achievementId].earned = true;
            
            // Update UI
            const achievementCard = document.getElementById(achievementId);
            achievementCard.classList.remove('locked');
            achievementCard.classList.add('earned');
            
            // Show celebration animation
            await this.showCelebration(achievementId);
        }
    }

    async showCelebration(achievementId) {
        const achievement = this.achievements[achievementId];
        
        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.className = 'achievement-celebration';
        overlay.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">${achievement.icon}</div>
                <h3>${achievement.tagalog.title}</h3>
                <p>${achievement.tagalog.description}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add confetti effect
        this.createConfetti();
        
        // Remove after animation
        setTimeout(() => {
            overlay.remove();
        }, 3000);
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    checkAchievements(stats) {
        if (stats.lessonTime <= 600) { // 10 minutes
            this.awardAchievement('quickLearner');
        }
        if (stats.quizScore === 100) {
            this.awardAchievement('perfectScore');
        }
        if (stats.preventionLessonsCompleted === true) {
            this.awardAchievement('preventionPro');
        }
        if (stats.allLessonsCompleted === true) {
            this.awardAchievement('communityHero');
        }
    }
} 