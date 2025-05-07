document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    const presentation = document.querySelector('.presentation');
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Current slide index
        const currentSlideIndex = Math.round(presentation.scrollTop / window.innerHeight);
        
        // Navigate with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Space') {
            // Next slide
            if (currentSlideIndex < slides.length - 1) {
                presentation.scrollTo({
                    top: (currentSlideIndex + 1) * window.innerHeight,
                    behavior: 'smooth'
                });
            }
            e.preventDefault();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            // Previous slide
            if (currentSlideIndex > 0) {
                presentation.scrollTo({
                    top: (currentSlideIndex - 1) * window.innerHeight,
                    behavior: 'smooth'
                });
            }
            e.preventDefault();
        } else if (e.key === 'Home') {
            // First slide
            presentation.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            e.preventDefault();
        } else if (e.key === 'End') {
            // Last slide
            presentation.scrollTo({
                top: (slides.length - 1) * window.innerHeight,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    });
    
    // Add animations when slides become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.objective, .feature, .risk, .practice, .scenario, .phase').forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    slides.forEach(slide => {
        observer.observe(slide);
        
        // Set initial state for animated elements
        slide.querySelectorAll('.objective, .feature, .risk, .practice, .scenario, .phase').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    });
    
    // Add slide counter
    const slideCounter = document.createElement('div');
    slideCounter.className = 'slide-counter';
    slideCounter.style.position = 'fixed';
    slideCounter.style.bottom = '1rem';
    slideCounter.style.right = '1rem';
    slideCounter.style.backgroundColor = 'rgba(0,0,0,0.5)';
    slideCounter.style.color = 'white';
    slideCounter.style.padding = '0.5rem 1rem';
    slideCounter.style.borderRadius = '20px';
    slideCounter.style.fontSize = '0.8rem';
    slideCounter.style.zIndex = '100';
    document.body.appendChild(slideCounter);
    
    // Update counter on scroll
    presentation.addEventListener('scroll', function() {
        const currentSlideIndex = Math.round(presentation.scrollTop / window.innerHeight);
        slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
    });
    
    // Initial counter update
    slideCounter.textContent = `1 / ${slides.length}`;
});