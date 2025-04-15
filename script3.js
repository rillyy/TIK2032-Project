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
    
    // Add scroll reveal effect for blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Create observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Add animation classes and observe elements
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(post);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .blog-post.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .blog-post h2 {
            position: relative;
            overflow: hidden;
        }
        
        .blog-post h2::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: #f9f9f9;
            left: 0;
            top: 0;
            transform: translateX(-100%);
            animation: revealText 0.8s ease forwards;
        }
        
        @keyframes revealText {
            to {
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add click event for images to open in larger view
    const images = document.querySelectorAll('.blog-post img');
    
    // Create modal elements for image preview
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-image';
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: #fff;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    `;
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Add click event to all images
    images.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    // Add hover effect for links
    const links = document.querySelectorAll('.blog-post a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add book image hover effect
    const bookImages = document.querySelectorAll('.blog-post .image img');
    bookImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(3deg)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});