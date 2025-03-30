document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const images = document.querySelectorAll('.bento-image');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                
                // Close menu after clicking a link
                nav?.classList.remove('active');
                mobileMenuBtn?.classList.remove('active');

                // Update active link
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Header shadow on scroll
        if (header) {
            header.style.boxShadow = scrollPosition > 50 ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
        }
    });

    // Project Details Modal
    const bentoItems = document.querySelectorAll('.bento-item');
    const projectDetailsSection = document.getElementById('project-details');
    const projectContent = document.querySelector('.project-content');
    const closeBtn = document.querySelector('.close-btn');
    
    if (bentoItems.length > 0 && projectDetailsSection && projectContent) {
        bentoItems.forEach(item => {
            item.addEventListener('click', function() {
                const template = document.getElementById(`${this.getAttribute('data-project')}-template`);
                if (template) {
                    projectContent.innerHTML = template.innerHTML;
                    projectDetailsSection.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (closeBtn && projectDetailsSection) {
        closeBtn.addEventListener('click', function() {
            projectDetailsSection.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        projectDetailsSection.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Bento Image Hover Effects
    document.querySelectorAll('.bento-image').forEach(image => {
        image.style.opacity = '0';
        image.addEventListener('mouseenter', () => image.style.opacity = '1');
        image.addEventListener('mouseleave', () => image.style.opacity = '0');
    });


// Intersection Observer for mobile
const observer = new IntersectionObserver(
(entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        } else {
            entry.target.style.opacity = '0';
        }
    });
},
{ threshold: 0.2 } // Adjust threshold as needed
);
images.forEach(image => observer.observe(image));
                



    


// Shape Click Effect
const shape = document.querySelector('.shape');
if (shape) {
    shape.style.transition = 'transform 0.2s ease-in-out';
    shape.addEventListener('click', () => {
        shape.style.transform = 'scale(1.1)';
        setTimeout(() => shape.style.transform = 'scale(1)', 150);
    });
}

   
});


 // Contact Form Handling
 const contactForm = document.querySelector('.contact-form');            
 if (contactForm) {
     contactForm.addEventListener('submit', function(event) {
         event.preventDefault();
         const name = document.getElementById('name')?.value.trim();
         const email = document.getElementById('email')?.value.trim();
         const message = document.getElementById('message')?.value.trim();
         
         if (!name || !email || !message) {
             alert('Please fill in all fields');
             return;
         }
                     

         const submitBtn = this.querySelector('button[type="submit"]');
         submitBtn.textContent = 'Sending...';
         submitBtn.disabled = true;
         console.log("Sending email with:", { name, email, message });            
         emailjs.send(
            "service_oxlwv8g", 
            "template_v5myc33", 
            { name, email, message },
            "h7gXkocBBxesse-2j"
        ).then(() => {
            alert('Message sent successfully!');
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = true;
        }).catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Check the console for details.');
        });
        
         
     });
 }
