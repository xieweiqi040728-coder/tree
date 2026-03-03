document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 500);
    }, 3000);

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const layers = document.querySelectorAll('.parallax-layer');
        
        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    const wallpaperCards = document.querySelectorAll('.wallpaper-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards
            wallpaperCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-brand') === filterValue || 
                    card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Resolution filter
    const resOptions = document.querySelectorAll('.res-option');
    resOptions.forEach(option => {
        option.addEventListener('click', function() {
            resOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Wallpaper customization
    const brightnessSlider = document.getElementById('brightnessSlider');
    const contrastSlider = document.getElementById('contrastSlider');
    const saturationSlider = document.getElementById('saturationSlider');
    const previewImage = document.querySelector('.wallpaper-preview img');
    
    function updateFilters() {
        previewImage.style.filter = `
            brightness(${brightnessSlider.value}%)
            contrast(${contrastSlider.value}%)
            saturate(${saturationSlider.value}%)
        `;
    }
    
    brightnessSlider.addEventListener('input', updateFilters);
    contrastSlider.addEventListener('input', updateFilters);
    saturationSlider.addEventListener('input', updateFilters);

    // Effect buttons
    const effectButtons = document.querySelectorAll('.effect-btn');
    effectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const effect = this.getAttribute('data-effect');
            effectButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            switch(effect) {
                case 'grayscale':
                    previewImage.style.filter += ' grayscale(100%)';
                    break;
                case 'sepia':
                    previewImage.style.filter += ' sepia(100%)';
                    break;
                case 'vintage':
                    previewImage.style.filter += ' sepia(50%) contrast(1.2)';
                    break;
                case 'hdr':
                    previewImage.style.filter += ' contrast(1.5) saturate(1.8)';
                    break;
            }
        });
    });

    // Favorite button animation
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.style.color = '#ff4d4d';
            
            // Bounce animation
            icon.style.animation = 'heartBeat 0.6s ease';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        });
    });

    // Preview modal
    const previewButtons = document.querySelectorAll('.preview-btn');
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageType = this.getAttribute('data-image');
            const card = this.closest('.wallpaper-card');
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            const imgSrc = card.querySelector('.wallpaper-img').src;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.style.display = 'flex';
            
            // Add entrance animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });
    
    modalClose.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Mouse position tracking for light effect
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.wallpaper-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Download buttons
    const downloadButtons = document.querySelectorAll('.download-btn, .btn-download-lg');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Create download animation
            this.innerHTML = '<i class="fas fa-check"></i> DOWNLOADED!';
            this.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i> DOWNLOAD';
                this.style.background = '';
            }, 2000);
        });
    });

    // Theme toggle
    const themeButton = document.querySelector('.btn-theme');
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            document.body.style.setProperty('--primary', '#0a0a0f');
            document.body.style.setProperty('--secondary', '#1a1a2e');
            themeButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.style.setProperty('--primary', '#1a1a2e');
            document.body.style.setProperty('--secondary', '#16213e');
            themeButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    const subscribeBtn = newsletterForm.querySelector('.btn-subscribe');
    
    subscribeBtn.addEventListener('click', () => {
        const email = newsletterForm.querySelector('input').value;
        if (email && email.includes('@')) {
            subscribeBtn.innerHTML = '<i class="fas fa-check"></i> SUBSCRIBED!';
            subscribeBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
            
            setTimeout(() => {
                subscribeBtn.innerHTML = 'SUBSCRIBE';
                subscribeBtn.style.background = '';
                newsletterForm.querySelector('input').value = '';
            }, 3000);
        }
    });

    // Smooth scroll for navigation links
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

    // Add entrance animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.wallpaper-card, .section-header, .brand-slide').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});