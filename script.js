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
        
        // Create QR code container
        const qrContainer = document.createElement('div');
        qrContainer.classList.add('qr-container');
        
        // Create QR code using API
        const qrImg = document.createElement('img');
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
        qrImg.alt = 'QR Code';
        qrImg.classList.add('qr-image');
        
        // Create text elements
        const title = document.createElement('h3');
        title.textContent = 'Scan QR Code';
        title.classList.add('qr-title');
        
        const subtitle = document.createElement('p');
        subtitle.textContent = 'URL copied to clipboard!';
        subtitle.classList.add('qr-subtitle');
        
        const urlText = document.createElement('p');
        urlText.textContent = url;
        urlText.classList.add('qr-url');
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.classList.add('qr-close');
        closeBtn.onclick = () => modal.remove();
        
        // Assemble modal
        qrContainer.appendChild(qrImg);
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(qrContainer);
        modalContent.appendChild(subtitle);
        modalContent.appendChild(urlText);
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
});
