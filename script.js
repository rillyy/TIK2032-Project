// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply smooth scroll for links to the same page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add a simple animation to the profile image
    const profileImage = document.querySelector('.image img');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Simple typing effect for the name
    const nameElement = document.querySelector('.content span');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < name.length) {
                nameElement.textContent += name.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Find the WEB PROGRAMMING text element
const highlightElement = document.querySelector('.highlight-text');
  
if (highlightElement) {
  // Add the animated class when page loads
  setTimeout(() => {
    highlightElement.classList.add('animated');
  }, 1000);
  
  // Add click event for explosion effect
  highlightElement.addEventListener('click', function(e) {
    // Get position relative to viewport
    const rect = this.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    // Create explosion effect
    for (let i = 0; i < 30; i++) {
      createParticle(x, y);
    }
    
    // Flash effect
    this.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff';
    setTimeout(() => {
      this.style.textShadow = '';
    }, 300);
  });
}