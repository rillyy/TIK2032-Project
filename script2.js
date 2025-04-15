// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Create image modal functionality
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Add click event to each gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Add image loading animation
    galleryImages.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        img.onload = function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        };
        
        // If image is already loaded
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        }
    });
    
    // Add a staggered animation effect for gallery images
    galleryImages.forEach((img, index) => {
        img.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        img.style.opacity = '0';
    });
    
    // Add animation keyframes to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .gallery-grid img {
            opacity: 0;
        }
        
        .gallery-grid img.loading {
            filter: blur(5px);
        }
        
        .gallery-grid img.loaded {
            filter: blur(0);
            transition: filter 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});