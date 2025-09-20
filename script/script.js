// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
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
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const service = formData.get('service');
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!service || !name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification(`Thank you, ${name}! Your inquiry for ${getServiceName(service)} has been received. Mark will contact you at ${email} within 24 hours.`, 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    function getServiceName(serviceValue) {
        const services = {
            'wedding': 'Wedding Cinematography',
            'documentary': 'Documentary Production',
            'commercial': 'Commercial Videography',
            'photography': 'Professional Photography',
            'other': 'Other Service'
        };
        return services[serviceValue] || 'your requested service';
    }
});

// Portfolio placeholder interaction
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.querySelector('span').textContent;
            showNotification(`${category} portfolio content coming soon! Mark is currently working on amazing new projects.`, 'info');
        });
        
        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Hover effect enhancement
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Navigation scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '0.8rem 0';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'none';
            nav.style.padding = '1rem 0';
        }
    });
});

// Service card animations
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;  
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4BB543' : type === 'error' ? '#FF3333' : '#333'};
        color: #fff;
        padding: 1rem 1.5rem;   
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;          
        align-items: center;
        z-index: 1000;      
        animation: slide-in 0.5s ease, fade-out 0.5s ease 4.5s forwards;        
    `;
    
    // Append to body
    document.body.appendChild(notification);        
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);       
}