class ProgressTree {
    constructor() {
        this.treeContainer = document.getElementById('tree-container');
        this.lessons = [
            {
                id: 1,
                title: "Pangunahing Kaalaman",
                subtitle: "Basic Understanding",
                icon: "🦟",
                content: {
                    intro: "Alamin ang tungkol sa dengue fever at kung paano ito kumakalat.",
                    topics: ["Ano ang Dengue?", "Mga Sintomas", "Pagkalat ng Sakit"]
                }
            },
            {
                id: 2,
                title: "Pag-iwas sa Dengue",
                subtitle: "Prevention Methods",
                icon: "🏠",
                content: {
                    intro: "Matutuhan ang mga paraan ng pag-iwas sa dengue.",
                    topics: ["4S Strategy", "Paglilinis ng Kapaligiran", "Personal na Proteksyon"]
                }
            },
            {
                id: 3,
                title: "Pagtukoy ng Sintomas",
                subtitle: "Symptom Recognition",
                icon: "🏥",
                content: {
                    intro: "Matutunan kung kailan dapat magpatingin sa doktor.",
                    topics: ["Warning Signs", "Emergency Symptoms", "Kailan Magpakonsulta"]
                }
            }
        ];
        this.init();
    }

    init() {
        this.createTreeStructure();
        this.updateProgress(0);
    }

    createTreeStructure() {
        const treeHtml = `
            <div class="tree-wrapper">
                ${this.lessons.map((lesson, index) => `
                    <div class="lesson-node ${index === 0 ? 'active' : 'locked'}" id="lesson-${lesson.id}">
                        <div class="node-icon">${lesson.icon}</div>
                        <div class="node-content">
                            <h3>${lesson.title}</h3>
                            <p>${lesson.subtitle}</p>
                        </div>
                        <div class="progress-indicator"></div>
                    </div>
                    ${index < this.lessons.length - 1 ? '<div class="connector"></div>' : ''}
                `).join('')}
            </div>
        `;
        this.treeContainer.innerHTML = treeHtml;
    }

    updateProgress(lessonId) {
        const nodes = document.querySelectorAll('.lesson-node');
        nodes.forEach((node, index) => {
            if (index < lessonId) {
                node.classList.add('completed');
                node.classList.remove('active', 'locked');
            } else if (index === lessonId) {
                node.classList.add('active');
                node.classList.remove('completed', 'locked');
            } else {
                node.classList.add('locked');
                node.classList.remove('completed', 'active');
            }
        });
    }
} 