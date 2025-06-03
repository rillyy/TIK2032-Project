// Gallery data - Complete with all information
        const galleryData = [
            {
                src: "Photos/BCA BEASISWA foto.png",
                alt: "Achievement Moment",
                caption: "Golden Achievement Moment",
                category: "events",
                metadata: "🏆 Achievement"
            },
            {
                src: "Photos/IMG_20241225_120428.jpg",
                alt: "Christmas Memory",
                caption: "Christmas Celebration 2024",
                category: "memories",
                metadata: "🎄 December"
            },
            {
                src: "Photos/IMG-20250603-WA0005.jpg",
                alt: "Casual Moment",
                caption: "Candid Captured Moment",
                category: "casual",
                metadata: "📸 Casual"
            },
            {
                src: "Photos/WhatsApp Image 2025-03-09 at 22.12.29_54c26fa2.jpg",
                alt: "Spring Evening",
                caption: "Spring Evening Vibes",
                category: "memories",
                metadata: "🌸 March"
            },
            {
                src: "Photos/IMG_20241225_121250.jpg",
                alt: "Holiday Spirit",
                caption: "Holiday Spirit Moment",
                category: "memories",
                metadata: "✨ Holiday"
            },
            {
                src: "Photos/SMA GUEE.jpg",
                alt: "School Days",
                caption: "Nostalgic School Days",
                category: "events",
                metadata: "🎓 School"
            }
        ];

        let currentImageIndex = 0;

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loader after content loads
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 1500);

            // Create background particles
            createParticles();

            // Initialize filter functionality
            initializeFilters();

            // Add title click effect
            addTitleClickEffect();

            // Add keyboard navigation
            document.addEventListener('keydown', handleKeyNavigation);
        });

        // Create floating particles
        function createParticles() {
            const particleContainer = document.getElementById('particles');
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size and position
                const size = Math.random() * 8 + 4;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random animation delay
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                
                particleContainer.appendChild(particle);
            }
        }

        // Initialize filter functionality
        function initializeFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter photos
                    const filter = this.getAttribute('data-filter');
                    filterPhotos(filter);
                });
            });
        }

        // Filter photos based on category
        function filterPhotos(category) {
            const photoFrames = document.querySelectorAll('.photo-frame');
            
            photoFrames.forEach((frame, index) => {
                if (category === 'all' || frame.getAttribute('data-category') === category) {
                    frame.style.display = 'block';
                    frame.style.animation = 'none';
                    setTimeout(() => {
                        frame.style.animation = `fadeInUp 0.8s ease forwards`;
                        frame.style.animationDelay = (index * 0.1) + 's';
                    }, 10);
                } else {
                    frame.style.display = 'none';
                }
            });
        }

        // Add title click effect
        function addTitleClickEffect() {
            const title = document.getElementById('galleryTitle');
            
            title.addEventListener('click', function() {
                createExplosionEffect(event.clientX, event.clientY);
                
                // Cycle through different title texts
                const titles = [
                    "RILLY'S GALLERY",
                    "CAPTURED MOMENTS",
                    "PHOTO COLLECTION"
                ];
                
                const currentText = this.textContent;
                const currentIndex = titles.indexOf(currentText);
                const nextIndex = (currentIndex + 1) % titles.length;
                
                this.style.transform = 'scale(0.8)';
                this.style.opacity = '0.5';
                
                setTimeout(() => {
                    this.textContent = titles[nextIndex];
                    this.style.transform = 'scale(1)';
                    this.style.opacity = '1';
                }, 300);
            });
        }

        // Create explosion effect
        function createExplosionEffect(x, y) {
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'explosion-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = Math.random() * 100 + 50;
                const life = Math.random() * 1000 + 500;
                
                document.body.appendChild(particle);
                
                let startTime = Date.now();
                
                function animate() {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / life;
                    
                    if (progress < 1) {
                        const distance = velocity * progress;
                        const newX = x + Math.cos(angle) * distance;
                        const newY = y + Math.sin(angle) * distance + (progress * progress * 200);
                        
                        particle.style.left = newX + 'px';
                        particle.style.top = newY + 'px';
                        particle.style.opacity = 1 - progress;
                        
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                }
                
                animate();
            }
        }

        // Modal functions
        function openModal(index) {
            currentImageIndex = index;
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            modalImage.src = galleryData[index].src;
            modalImage.alt = galleryData[index].alt;
            modalCaption.textContent = galleryData[index].caption;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add random vintage effect
            const effects = ['photo-effect-sepia', 'photo-effect-vintage', 'photo-effect-warm', 'photo-effect-cool'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            modalImage.className = randomEffect;
        }

        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryData.length;
            updateModalImage();
        }

        function previousImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
            updateModalImage();
        }

        function updateModalImage() {
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            // Add transition effect
            modalImage.style.opacity = '0';
            modalImage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modalImage.src = galleryData[currentImageIndex].src;
                modalImage.alt = galleryData[currentImageIndex].alt;
                modalCaption.textContent = galleryData[currentImageIndex].caption;
                
                // Add random vintage effect
                const effects = ['photo-effect-sepia', 'photo-effect-vintage', 'photo-effect-warm', 'photo-effect-cool'];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                modalImage.className = randomEffect;
                
                modalImage.style.opacity = '1';
                modalImage.style.transform = 'scale(1)';
            }, 200);
        }

        // Keyboard navigation
        function handleKeyNavigation(event) {
            const modal = document.getElementById('imageModal');
            
            if (modal.style.display === 'block') {
                switch(event.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case 'ArrowLeft':
                        previousImage();
                        break;
                    case 'ArrowRight':
                        nextImage();
                        break;
                }
            }
        }

        // Add smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add parallax effect to background
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('body::before');
            const speed = scrolled * 0.5;
            
            // Update background position based on scroll
            document.body.style.backgroundPosition = `center ${speed}px`;
        });

        // Add hover sound effect simulation
        document.querySelectorAll('.photo-frame').forEach(frame => {
            frame.addEventListener('mouseenter', function() {
                // Visual feedback for hover
                this.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            frame.addEventListener('mouseleave', function() {
                this.style.filter = '';
            });
        });

        // Auto-cycle through gallery title
        setInterval(() => {
            const title = document.getElementById('galleryTitle');
            const titles = [
                "RILLY'S GALLERY", 
                "CAPTURED MOMENTS",
                "PHOTO COLLECTION"
            ];
            
            const currentText = title.textContent;
            const currentIndex = titles.indexOf(currentText);
            const nextIndex = (currentIndex + 1) % titles.length;
            
            title.style.transition = 'all 0.5s ease';
            title.style.opacity = '0.7';
            
            setTimeout(() => {
                title.textContent = titles[nextIndex];
                title.style.opacity = '1';
            }, 250);
        }, 8000);
