

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const bentoImages = document.querySelectorAll('.bento-image');
    
        // Ensure all images are hidden on load
        bentoImages.forEach(image => {
            image.style.opacity = '0';
        });
    
        // Add hover effects
        bentoImages.forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
            });
    
            image.addEventListener('mouseleave', function() {
                this.style.opacity = '0';
            });
        });
    });
    

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                // Update active link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Header shadow on scroll
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Project Details Modal
    const bentoItems = document.querySelectorAll('.bento-item');
    const projectDetailsSection = document.getElementById('project-details');
    const projectContent = document.querySelector('.project-content');
    const closeBtn = document.querySelector('.close-btn');
    
    bentoItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const template = document.getElementById(`${projectId}-template`);
            
            if (template) {
                projectContent.innerHTML = template.innerHTML;
                projectDetailsSection.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            projectDetailsSection.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close project details when clicking outside
    projectDetailsSection.addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const bentoImages = document.querySelectorAll('.bento-image');

    bentoImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            showBentoImage(this);
        });

        image.addEventListener('mouseleave', function() {
            hideBentoImage(this);
        });
    });
});

// Hide the bento image when the user is not hovering over it
function hideBentoImage(image) {
    image.style.opacity = '0';
}

// Show the bento image when the user is hovering over it
function showBentoImage(image) {
    image.style.opacity = '1';
}

const shape = document.querySelector(".shape")

shape.addEventListener("click", () => {


    // Quick visual feedback (pulse effect)
    shape.style.transform = "scale(1.1)";
    setTimeout(() => shape.style.transform = "scale(1)", 150);
});


// Add a transition to the shape
shape.style.transition = "transform 0.2s ease-in-out";
