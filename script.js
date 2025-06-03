// Loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1000);
});

// Create floating particles
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Main DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundParticles();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
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
    
    // Profile image hover effect
    const profileImage = document.getElementById('profileImg');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Typing effect for the name
    const nameElement = document.getElementById('nameSpan');
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
    
    // Highlight text animation and explosion effect
    const highlightElement = document.getElementById('highlightText');
    if (highlightElement) {
        // Add animated class after delay
        setTimeout(() => {
            highlightElement.classList.add('animated');
        }, 2000);
        
        // Add click event for explosion effect
        highlightElement.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            // Create explosion effect
            for (let i = 0; i < 30; i++) {
                createExplosionParticle(x, y);
            }
            
            // Flash effect
            this.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff';
            setTimeout(() => {
                this.style.textShadow = '';
            }, 300);
        });
    }
    
    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Create explosion particles
function createExplosionParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    let life = 100;
    
    function animateParticle() {
        if (life <= 0) {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
            return;
        }
        
        x += vx * 0.01;
        y += vy * 0.01;
        vy += gravity;
        life--;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life / 100;
        
        requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
}

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-particles');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    if (mouseTrail.length > 20) {
        mouseTrail.shift();
    }
    
    // Occasionally create a trail particle
    if (Math.random() < 0.1) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

// Create trail particles
function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(255, 255, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transition = 'opacity 1s ease-out';
        particle.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1000);
    }, 100);
}