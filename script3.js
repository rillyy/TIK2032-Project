// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 800);
    }, 1500);
});

// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Background Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const isstar = Math.random() > 0.7;
        
        if (isstar) {
            particle.className = 'star';
            particle.style.width = Math.random() * 8 + 4 + 'px';
            particle.style.height = particle.style.width;
        } else {
            particle.className = 'particle';
            particle.style.width = Math.random() * 12 + 4 + 'px';
            particle.style.height = particle.style.width;
        }
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Scroll to Top FAB
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Surprise Me FAB
const surprises = [
    () => {
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => document.body.style.animation = '', 500);
    },
    () => {
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach((post, index) => {
            setTimeout(() => {
                post.style.animation = 'bounce 1s ease';
                setTimeout(() => post.style.animation = '', 1000);
            }, index * 200);
        });
    },
    () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => img.style.transform = '', 1000);
        });
    },
    () => {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => document.body.style.filter = '', 2000);
    }
];

document.getElementById('surpriseMe').addEventListener('click', () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    randomSurprise();
});

// Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

const buttons = document.querySelectorAll('.fab, .links a, .blog-post a');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.blog-post, .image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Dynamic Navigation Background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(139, 69, 19, 0.95)';
        nav.style.backdropFilter = 'blur(25px)';
    } else {
        nav.style.background = 'rgba(139, 69, 19, 0.9)';
        nav.style.backdropFilter = 'blur(20px)';
    }
});

// Image Lazy Loading Effect
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'all 0.5s ease';
});

// Enhanced Hover Effects for Blog Posts
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.style.background = 'rgba(205, 133, 63, 0.6)';
        post.style.borderColor = 'rgba(245, 222, 179, 0.9)';
    });
    
    post.addEventListener('mouseleave', () => {
        post.style.background = 'rgba(139, 69, 19, 0.4)';
        post.style.borderColor = 'rgba(205, 133, 63, 0.5)';
    });
});

// Pulse Animation for FABs
setInterval(() => {
    document.querySelectorAll('.fab').forEach(fab => {
        fab.classList.add('pulse');
        setTimeout(() => fab.classList.remove('pulse'), 2000);
    });
}, 5000);

// Music Section Special Effects
const musicSection = document.querySelector('.blog-post:last-of-type');
if (musicSection) {
    musicSection.addEventListener('mouseenter', () => {
        const musicImages = musicSection.querySelectorAll('img');
        musicImages.forEach((img, index) => {
            setTimeout(() => {
                img.style.transform = 'scale(1.05) rotate(2deg)';
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            }, index * 100);
        });
    });
    
    musicSection.addEventListener('mouseleave', () => {
        const musicImages = musicSection.querySelectorAll('img');
        musicImages.forEach(img => {
            img.style.transform = 'scale(1) rotate(0deg)';
            img.style.filter = 'sepia(20%)';
        });
    });
}