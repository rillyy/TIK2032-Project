// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.style.color = '#8a2be2';
        }
    });
    
    // Add social media icons
    const socialIcons = document.createElement('div');
    socialIcons.className = 'social-icons';
    
    // Instagram icon (using unicode for simplicity)
    const instaLink = document.createElement('a');
    instaLink.href = 'https://instagram.com/brrliani_';
    instaLink.target = '_blank';
    instaLink.innerHTML = '📷';
    instaLink.title = 'Instagram';
    
    // Email icon
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:brilliani.jeshia2812@gmail.com';
    emailLink.innerHTML = '✉️';
    emailLink.title = 'Email';
    
    // Add icons to container
    socialIcons.appendChild(instaLink);
    socialIcons.appendChild(emailLink);
    
    // Add container to page
    document.querySelector('.contact-container').appendChild(socialIcons);
    
    // Add a footer if it doesn't exist
    if (!document.querySelector('footer')) {
        const footer = document.createElement('footer');
        footer.innerHTML = '<p>&copy; 2025 RILLY\'S PAGES. All rights reserved.</p>';
        document.body.appendChild(footer);
    }
    
    // Add animation for links
    const links = document.querySelectorAll('.contact-links a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add hover effect for social icons
    const icons = document.querySelectorAll('.social-icons a');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Fix email link if needed
    const emailContactLink = document.querySelector('.contact-links a[href^="brilliani"]');
    if (emailContactLink) {
        emailContactLink.href = 'mailto:brilliani.jeshia2812@gmail.com';
    }
    
    // Add page entrance animation
    const contactContainer = document.querySelector('.contact-container');
    contactContainer.style.opacity = '0';
    contactContainer.style.transform = 'translateY(20px)';
    contactContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Trigger animation after a small delay
    setTimeout(() => {
        contactContainer.style.opacity = '1';
        contactContainer.style.transform = 'translateY(0)';
    }, 200);
    
    // Add floating animation to social icons
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        .social-icons a {
            animation: float 3s ease-in-out infinite;
        }
        
        .social-icons a:nth-child(2) {
            animation-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
});