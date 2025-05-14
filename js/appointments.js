document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const appointmentForm = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    const dateInput = document.getElementById('date');
    
    // Set minimum date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);
    
    // Form submission with animation
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading animation to button
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            appointmentForm.classList.add('hide');
            
            setTimeout(() => {
                successMessage.classList.add('show');
                
                // Reset and show form again after delay
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    
                    setTimeout(() => {
                        appointmentForm.reset();
                        appointmentForm.classList.remove('hide');
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        
                        // Reset all input states
                        inputs.forEach(input => {
                            input.parentNode.classList.remove('focus');
                        });
                    }, 500);
                }, 3000);
            }, 400);
        }, 1500);
    });
    
    // Input animations
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.parentNode.classList.add('focus');
        }
        
        // Add focus class on focus
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focus');
        });
        
        // Remove focus class on blur if empty
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentNode.classList.remove('focus');
            }
        });
    });
    
    // Background particle animation
    createParticles();
});

// Create floating background particles
function createParticles() {
    const container = document.querySelector('body');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('bg-particle');
    
    // Random size
    const size = Math.random() * 15 + 5;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random opacity
    const opacity = Math.random() * 0.07 + 0.03;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Set particle styles
    particle.style.cssText = `
        position: fixed;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: white;
        border-radius: 50%;
        opacity: ${opacity};
        pointer-events: none;
        z-index: 0;
        animation: floatParticle ${duration}s linear infinite;
    `;
    
    // Append to container and set animation delay
    container.appendChild(particle);
    
    // Add animation keyframes once if not already added
    if (!document.querySelector('#particleAnimation')) {
        const style = document.createElement('style');
        style.id = 'particleAnimation';
        style.innerHTML = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}