// Add glassmorphism interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Typing effect for the main title
    function smoothTypeWriter() {
        const titleElement = document.querySelector('.main-title');
        if (!titleElement) return;
        
        // Start typing effect after initial fade-in
        setTimeout(() => {
            // Store the original HTML content
            const originalHTML = titleElement.innerHTML;
            
            // Create the text parts
            const part1 = "I'm cool,";
            const part2 = "but I want to: ";
            const part3 = "be better";
            
            // Clear content and setup
            titleElement.innerHTML = '';
            titleElement.style.opacity = '1';
            titleElement.classList.add('typing-cursor');
            
            let currentText = '';
            let phase = 1;
            let i = 0;
            
            const typing = setInterval(() => {
                if (phase === 1) {
                    // Type first part
                    if (i < part1.length) {
                        currentText += part1.charAt(i);
                        titleElement.innerHTML = currentText;
                        i++;
                    } else {
                        // Add line break and move to next phase
                        currentText += '<br>';
                        titleElement.innerHTML = currentText;
                        phase = 2;
                        i = 0;
                        // Small pause after line break
                        setTimeout(() => {}, 200);
                    }
                } else if (phase === 2) {
                    // Type second part
                    if (i < part2.length) {
                        currentText += part2.charAt(i);
                        titleElement.innerHTML = currentText;
                        i++;
                    } else {
                        phase = 3;
                        i = 0;
                    }
                } else if (phase === 3) {
                    // Type third part with highlight
                    if (i < part3.length) {
                        const highlightedPart = '<span class="highlight">' + part3.substring(0, i + 1) + '</span>';
                        titleElement.innerHTML = currentText + highlightedPart;
                        i++;
                    } else {
                        clearInterval(typing);
                        // Remove cursor class and restore final content
                        setTimeout(() => {
                            titleElement.classList.remove('typing-cursor');
                            titleElement.innerHTML = originalHTML;
                        }, 1000);
                    }
                }
            }, 100);
        }, 1500);
    }
    
    // Typing effect for description
    function typeDescription() {
        const descElement = document.querySelector('.description');
        if (!descElement) return;
        
        setTimeout(() => {
            const fullText = descElement.textContent;
            descElement.textContent = '';
            descElement.style.opacity = '1';
            descElement.style.borderRight = '1px solid #888';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < fullText.length) {
                    descElement.textContent += fullText.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(() => {
                        descElement.style.borderRight = 'none';
                    }, 500);
                }
            }, 40);
        }, 4000); // Start after title is done
    }
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Enhanced share button functionality
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function(e) {
            // Create glassmorphism ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Custom URL to share
            const shareURL = 'https://deepdevjose.github.io/deepdev-courses/';
            
            // Share functionality
            if (navigator.share) {
                navigator.share({
                    title: 'DeepDev Courses',
                    text: 'Check out my programming courses!',
                    url: shareURL
                });
            } else {
                // Copy URL and show QR
                navigator.clipboard.writeText(shareURL).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = '#ffffff';
                    this.style.color = '#0a0a0a';
                    
                    // Show QR modal
                    showQRModal(shareURL);
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                        this.style.color = '';
                    }, 2000);
                });
            }
        });
    }
    
    // Function to show QR modal
    function showQRModal(url) {
        // Create modal
        const modal = document.createElement('div');
        modal.classList.add('qr-modal');
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('qr-modal-content');
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.classList.add('qr-close');
        closeBtn.onclick = () => modal.remove();
        
        // Create title with icon
        const title = document.createElement('h3');
        title.classList.add('qr-title');
        title.innerHTML = `
            <svg class="qr-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <rect x="7" y="7" width="3" height="3"/>
                <rect x="14" y="7" width="3" height="3"/>
                <rect x="7" y="14" width="3" height="3"/>
            </svg>
            Scan QR Code
        `;
        
        // Create description
        const description = document.createElement('p');
        description.textContent = 'Use your phone camera to scan this QR code';
        description.classList.add('qr-description');
        
        // Create QR code container
        const qrContainer = document.createElement('div');
        qrContainer.classList.add('qr-container');
        
        // Create QR code using API with higher resolution
        const qrImg = document.createElement('img');
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=255-255-255&color=0-0-0&margin=10`;
        qrImg.alt = 'QR Code';
        qrImg.classList.add('qr-image');
        
        // Create success message with icon  
        const subtitle = document.createElement('p');
        subtitle.classList.add('qr-subtitle');
        subtitle.innerHTML = `
            <svg class="qr-subtitle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>
            URL copied to clipboard!
        `;
        
        // Create URL display
        const urlText = document.createElement('p');
        urlText.textContent = url;
        urlText.classList.add('qr-url');
        
        // Create action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('qr-actions');
        
        // Copy URL button
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('qr-action-btn');
        copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy URL
        `;
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(url);
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                Copied!
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy URL
                `;
            }, 2000);
        };
        
        // Share button
        const shareBtn = document.createElement('button');
        shareBtn.classList.add('qr-action-btn');
        shareBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16,6 12,2 8,6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Share
        `;
        shareBtn.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: 'DeepDev Courses',
                    url: url
                });
            } else {
                // Fallback for browsers without Web Share API
                navigator.clipboard.writeText(url);
            }
        };
        
        // Assemble modal
        qrContainer.appendChild(qrImg);
        actionsDiv.appendChild(copyBtn);
        actionsDiv.appendChild(shareBtn);
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(description);
        modalContent.appendChild(qrContainer);
        modalContent.appendChild(subtitle);
        modalContent.appendChild(urlText);
        modalContent.appendChild(actionsDiv);
        modal.appendChild(modalContent);
        
        // Add to body
        document.body.appendChild(modal);
        
        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Auto close after 8 seconds
        setTimeout(() => {
            if (modal.parentNode) modal.remove();
        }, 8000);
    }
    
    // Footer links enhanced interactions
    const footerLinks = document.querySelectorAll('.footer-links span');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Smooth click animation
            this.style.transform = 'scale(0.95) translateY(-2px)';
            this.style.color = '#3b82f6';
            setTimeout(() => {
                this.style.transform = 'scale(1) translateY(-2px)';
            }, 150);
        });
        
        // Add hover glow effect
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px #3b82f6';
            this.style.color = '#3b82f6';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.color = '#888';
        });
    });
    
    // Initialize typing effects
    smoothTypeWriter();
    typeDescription();
    
    // Add CSS for glassmorphism effects
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: glassBounceIn 0.8s ease-out;
        }
        
        @keyframes glassBounceIn {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(30px);
            }
            60% {
                opacity: 1;
                transform: scale(1.02) translateY(-5px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0px);
            }
        }
        
        /* Enhanced hover effects */
        .main-title:hover {
            text-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
            transition: text-shadow 0.3s ease;
        }
        
        .highlight:hover {
            filter: brightness(1.2);
            transition: filter 0.3s ease;
        }
        
        /* Subtle parallax for glass elements */
        .header:hover {
            -webkit-backdrop-filter: blur(25px);
            backdrop-filter: blur(25px);
            transition: -webkit-backdrop-filter 0.3s ease, backdrop-filter 0.3s ease;
        }
        
        .footer:hover {
            -webkit-backdrop-filter: blur(25px);
            backdrop-filter: blur(25px);
            transition: -webkit-backdrop-filter 0.3s ease, backdrop-filter 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Courses Navigation Functionality
    initCoursesNavigation();
});

function initCoursesNavigation() {
    const courseCards = document.querySelectorAll('.course-card');
    const courseButtons = document.querySelectorAll('.course-btn');
    
    // Course data
    const coursesData = {
        git: {
            title: 'GitHub & Git',
            fullDescription: 'Master version control with Git and GitHub. Learn branching strategies, collaboration workflows, CI/CD integration, and advanced Git techniques used by professional development teams.',
            topics: ['Basic Git commands', 'Branching and merging', 'GitHub workflows', 'Pull requests', 'CI/CD integration', 'Git hooks', 'Collaboration strategies'],
            prerequisites: 'Basic command line knowledge',
            price: '$99',
            nextStart: 'January 15, 2026'
        },
        cpp: {
            title: 'Modern C++',
            fullDescription: 'Learn modern C++ programming from fundamentals to advanced concepts. Cover C++17/20 features, memory management, STL, design patterns, and performance optimization.',
            topics: ['C++ fundamentals', 'Object-oriented programming', 'Memory management', 'STL containers', 'Modern C++ features', 'Design patterns', 'Performance optimization'],
            prerequisites: 'Basic programming knowledge',
            price: '$149',
            nextStart: 'February 1, 2026'
        },
        python: {
            title: 'Python Development',
            fullDescription: 'Complete Python development course covering web development, data science, automation, and more. Build real-world projects and deploy applications.',
            topics: ['Python basics', 'Web development with Flask/Django', 'Data analysis', 'API development', 'Database integration', 'Testing', 'Deployment'],
            prerequisites: 'No prior experience required',
            price: '$129',
            nextStart: 'January 22, 2026'
        }
    };
    
    // Add hover effects and interactions
    courseCards.forEach((card, index) => {
        // Staggered animation on load
        card.style.animationDelay = `${1.2 + (index * 0.2)}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            
            // Add glow effect to icon
            const icon = this.querySelector('.course-icon');
            icon.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Reset icon glow
            const icon = this.querySelector('.course-icon');
            icon.style.filter = 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))';
        });
        
        // Card click handler
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('course-btn')) {
                const courseId = this.dataset.course;
                showCourseModal(courseId, coursesData[courseId]);
            }
        });
    });
    
    // Button click handlers
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.course-card');
            const courseId = card.dataset.course;
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            showCourseModal(courseId, coursesData[courseId]);
        });
    });
}

function showCourseModal(courseId, courseData) {
    // Create modal HTML
    const modalHTML = `
        <div class="course-modal" id="courseModal">
            <div class="course-modal-content">
                <button class="close-modal" onclick="closeCourseModal()">&times;</button>
                <div class="modal-header">
                    <h2 class="modal-title">${courseData.title}</h2>
                    <div class="modal-price">${courseData.price}</div>
                </div>
                <div class="modal-body">
                    <p class="modal-description">${courseData.fullDescription}</p>
                    
                    <div class="modal-section">
                        <h3>What you'll learn:</h3>
                        <ul class="topics-list">
                            ${courseData.topics.map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-info">
                        <div class="info-item">
                            <strong>Prerequisites:</strong> ${courseData.prerequisites}
                        </div>
                        <div class="info-item">
                            <strong>Next cohort starts:</strong> ${courseData.nextStart}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="enroll-btn" onclick="enrollInCourse('${courseId}')">Enroll Now</button>
                    <button class="info-btn" onclick="requestMoreInfo('${courseId}')">Request Info</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Animate modal in
    const modal = document.getElementById('courseModal');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function enrollInCourse(courseId) {
    // Here you would integrate with your enrollment system
    alert(`Enrollment for ${courseId} course initiated! You will be redirected to the enrollment form.`);
    closeCourseModal();
}

function requestMoreInfo(courseId) {
    // Here you would open a contact form or redirect to more info
    alert(`More information requested for ${courseId} course. We'll contact you soon!`);
    closeCourseModal();
}

// Scroll Indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const coursesSection = document.querySelector('.courses-nav');
    
    if (scrollIndicator && coursesSection) {
        scrollIndicator.addEventListener('click', () => {
            coursesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        // Hide scroll indicator when user scrolls down
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.8';
                scrollIndicator.style.pointerEvents = 'auto';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Initialize scroll indicator
initScrollIndicator();
