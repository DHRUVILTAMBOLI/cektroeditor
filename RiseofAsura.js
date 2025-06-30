// Rise of Asura - Interactive Game Preview
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-scroll preview functionality
    let isAutoScrolling = false;
    let currentSection = 0;
    const sections = ['#home', '#gameplay', '#map', '#enemies', '#abilities', '#download'];
    let scrollTimeout;

    // Function to auto-scroll to next section
    function autoScrollToNext() {
        if (isAutoScrolling) {
            currentSection = (currentSection + 1) % sections.length;
            const targetSection = document.querySelector(sections[currentSection]);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Continue auto-scrolling after 3 seconds
            scrollTimeout = setTimeout(autoScrollToNext, 3000);
        }
    }

    // Start auto-scroll preview
    function startAutoScroll() {
        isAutoScrolling = true;
        autoScrollToNext();
        console.log('Auto-scroll preview started');
    }

    // Stop auto-scroll preview
    function stopAutoScroll() {
        isAutoScrolling = false;
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        console.log('Auto-scroll preview stopped');
    }

    // Mouse wheel event for manual control
    let wheelTimeout;
    document.addEventListener('wheel', function(e) {
        // Stop auto-scroll when user manually scrolls
        stopAutoScroll();
        
        // Restart auto-scroll after 5 seconds of no user interaction
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            startAutoScroll();
        }, 5000);
    });

    // Touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        stopAutoScroll();
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        
        // Restart auto-scroll after 5 seconds of no touch interaction
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            startAutoScroll();
        }, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        stopAutoScroll();
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                currentSection = Math.min(currentSection + 1, sections.length - 1);
                document.querySelector(sections[currentSection]).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                currentSection = Math.max(currentSection - 1, 0);
                document.querySelector(sections[currentSection]).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                break;
            case 'Home':
                e.preventDefault();
                currentSection = 0;
                document.querySelector(sections[0]).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                break;
            case 'End':
                e.preventDefault();
                currentSection = sections.length - 1;
                document.querySelector(sections[sections.length - 1]).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                break;
        }
        
        // Restart auto-scroll after 5 seconds
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            startAutoScroll();
        }, 5000);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Update current section for auto-scroll
                const sectionId = '#' + entry.target.id;
                const sectionIndex = sections.indexOf(sectionId);
                if (sectionIndex !== -1) {
                    currentSection = sectionIndex;
                }
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Map markers interaction
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.querySelector('.marker-icon').style.transform = 'scale(1.2)';
            this.querySelector('.marker-tooltip').style.opacity = '1';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.querySelector('.marker-icon').style.transform = 'scale(1)';
            this.querySelector('.marker-tooltip').style.opacity = '0';
        });
    });

    // Enemy cards hover effects
    const enemyCards = document.querySelectorAll('.enemy-card');
    enemyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Ability items interaction
    const abilityItems = document.querySelectorAll('.ability-item');
    abilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Video placeholder click event
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Simulate video play
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Show video modal or redirect to video
            alert('Gameplay trailer would play here!');
        });
    }

    // Download buttons interaction
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate download
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Windows')) {
                alert('Download for Windows would start here!');
            } else if (buttonText.includes('Steam')) {
                alert('Redirecting to Steam store...');
            }
        });
    });

    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');
    const statFills = document.querySelectorAll('.stat-fill');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
        
        statFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 500);
        });
    }

    // Start auto-scroll after 2 seconds
    setTimeout(() => {
        startAutoScroll();
        animateProgressBars();
    }, 2000);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            alert('Easter egg activated! 🌈');
        }
    });

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    console.log('Rise of Asura Game Preview loaded successfully! 🎮');
    console.log('Use mouse wheel, arrow keys, or let it auto-scroll for the full preview experience.');
}); 