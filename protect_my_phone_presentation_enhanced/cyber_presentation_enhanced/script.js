document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const pageCounter = document.querySelector('.page-counter');
    const toggleAccessibilityBtn = document.getElementById('toggle-accessibility');
    const accessibilityOptions = document.querySelector('.accessibility-options');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const highContrastBtn = document.getElementById('high-contrast');
    const normalContrastBtn = document.getElementById('normal-contrast');
    const languageSelector = document.getElementById('language-selector');
    const readAloudBtn = document.getElementById('read-aloud');
    const screenReader = document.getElementById('screen-reader');
    const languageContents = document.querySelectorAll('.language-content');
    const quizStartBtn = document.querySelector('.quiz-start-btn');
    const quizRestartBtn = document.querySelector('.quiz-restart-btn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizResult = document.querySelector('.quiz-result');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const scoreValue = document.querySelector('.score-value');
    const resultMessage = document.querySelector('.result-message');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    let currentSlide = 0;
    let currentQuizQuestion = 0;
    let quizScore = 0;
    let fontSize = 16; // Base font size in pixels
    let isReading = false;
    let speechSynthesis = window.speechSynthesis;
    let speechUtterance = null;
    
    // Initialize first slide
    showSlide(currentSlide);
    
    // Navigation functions
    function showSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                
                // Add animation classes to elements
                const elements = slide.querySelectorAll('.content > *');
                elements.forEach((el, j) => {
                    el.classList.add('fade-in');
                    el.style.animationDelay = `${j * 0.1}s`;
                });
                
                // Update counter
                pageCounter.textContent = `${index + 1}/${slides.length}`;
                
                // Stop reading if in progress
                if (isReading) {
                    stopReading();
                }
            }
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Accessibility functions
    function toggleAccessibility() {
        accessibilityOptions.classList.toggle('show');
    }
    
    function changeFontSize(direction) {
        if (direction === 'increase') {
            fontSize = Math.min(fontSize + 2, 24); // Max font size
        } else {
            fontSize = Math.max(fontSize - 2, 12); // Min font size
        }
        
        document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    }
    
    function toggleContrast(mode) {
        if (mode === 'high') {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }
    
    function changeLanguage(lang) {
        languageContents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.lang === lang) {
                content.classList.add('active');
            }
        });
        
        // Reset current slide
        showSlide(0);
    }
    
    function readCurrentSlide() {
        if (isReading) {
            stopReading();
            return;
        }
        
        const currentContent = slides[currentSlide].querySelector('.content');
        const textToRead = currentContent.textContent.trim();
        
        if (speechSynthesis && textToRead) {
            isReading = true;
            readAloudBtn.innerHTML = '<i class="fas fa-stop"></i> Arrêter la lecture';
            
            speechUtterance = new SpeechSynthesisUtterance(textToRead);
            speechUtterance.lang = languageSelector.value === 'fr' ? 'fr-FR' : 
                                  languageSelector.value === 'es' ? 'es-ES' : 
                                  languageSelector.value === 'ar' ? 'ar-SA' : 'en-US';
            
            speechUtterance.onend = function() {
                isReading = false;
                readAloudBtn.innerHTML = '<i class="fas fa-volume-up"></i> Lecture à voix haute';
            };
            
            speechSynthesis.speak(speechUtterance);
        }
    }
    
    function stopReading() {
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
        
        isReading = false;
        readAloudBtn.innerHTML = '<i class="fas fa-volume-up"></i> Lecture à voix haute';
    }
    
    // Quiz functions
    function startQuiz() {
        quizIntro.classList.remove('active');
        showQuizQuestion(0);
        quizScore = 0;
    }
    
    function showQuizQuestion(index) {
        quizQuestions.forEach((question, i) => {
            question.classList.remove('active');
            if (i === index) {
                question.classList.add('active');
            }
        });
        
        currentQuizQuestion = index;
    }
    
    function checkAnswer(option) {
        const allOptions = option.parentElement.querySelectorAll('.quiz-option');
        
        // Disable all options
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Mark selected option
        option.classList.add('selected');
        
        // Check if correct
        if (option.dataset.correct === 'true') {
            option.classList.add('correct');
            quizScore++;
        } else {
            option.classList.add('incorrect');
            
            // Show correct answer
            allOptions.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });
        }
        
        // Go to next question after delay
        setTimeout(() => {
            if (currentQuizQuestion < quizQuestions.length - 1) {
                showQuizQuestion(currentQuizQuestion + 1);
            } else {
                showQuizResult();
            }
        }, 1500);
    }
    
    function showQuizResult() {
        quizQuestions.forEach(question => {
            question.classList.remove('active');
        });
        
        quizResult.classList.add('active');
        scoreValue.textContent = quizScore;
        
        // Set result message
        if (quizScore === 3) {
            resultMessage.textContent = 'Excellent ! Vous êtes un expert en cybersécurité !';
        } else if (quizScore === 2) {
            resultMessage.textContent = 'Bien ! Vous avez de bonnes connaissances en cybersécurité.';
        } else {
            resultMessage.textContent = 'Continuez à apprendre ! La pratique est la clé de la sécurité.';
        }
    }
    
    function restartQuiz() {
        // Reset all options
        quizOptions.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
        
        quizResult.classList.remove('active');
        quizIntro.classList.add('active');
    }
    
    // Event listeners - Navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'Home') {
            showSlide(0);
        } else if (e.key === 'End') {
            showSlide(slides.length - 1);
        }
    });
    
    // Event listeners - Accessibility
    toggleAccessibilityBtn.addEventListener('click', toggleAccessibility);
    increaseFontBtn.addEventListener('click', () => changeFontSize('increase'));
    decreaseFontBtn.addEventListener('click', () => changeFontSize('decrease'));
    highContrastBtn.addEventListener('click', () => toggleContrast('high'));
    normalContrastBtn.addEventListener('click', () => toggleContrast('normal'));
    languageSelector.addEventListener('change', (e) => changeLanguage(e.target.value));
    readAloudBtn.addEventListener('click', readCurrentSlide);
    
    // Quiz event listeners
    if (quizStartBtn) {
        quizStartBtn.addEventListener('click', startQuiz);
    }
    
    if (quizRestartBtn) {
        quizRestartBtn.addEventListener('click', restartQuiz);
    }
    
    quizOptions.forEach(option => {
        option.addEventListener('click', () => checkAnswer(option));
    });
    
    // Action buttons
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Télécharger')) {
                alert('Téléchargement de la présentation en cours...');
                // Here you would implement actual download functionality
            } else if (this.textContent.includes('Partager')) {
                alert('Options de partage...');
                // Here you would implement sharing functionality
            }
        });
    });
    
    // Initialize with French content
    changeLanguage('fr');
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
    
    // Close accessibility panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggleAccessibilityBtn.contains(e.target) && 
            !accessibilityOptions.contains(e.target) && 
            accessibilityOptions.classList.contains('show')) {
            accessibilityOptions.classList.remove('show');
        }
    });
});