// Initialize EmailJS
// IMPORTANT: Replace with your actual Public Key
(function() {
    // emailjs.init("YOUR_PUBLIC_KEY");
})();

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    /* ===== Dark Mode Logic ===== */
    const theme = localStorage.getItem('theme');
    
    // Check local storage or system preference
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle Theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ===== Scroll Animation using Intersection Observer ===== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    /* ===== Form Validation & Submission ===== */
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
    };

    const showSuccess = (input) => {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    };

    const checkRequired = (inputArr) => {
        let isValid = true;
        inputArr.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    };

    const getFieldName = (input) => {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const submitBtn = document.getElementById('submitBtn');

            // Validate
            let isValid = checkRequired([name, email, message]);
            
            if (email.value.trim() !== '' && !validateEmail(email.value.trim())) {
                 showError(email, 'Email is not valid');
                 isValid = false;
            }

            if (isValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Simulate EmailJS sending (Replace with actual EmailJS code below)
                /*
                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                    from_name: name.value,
                    reply_to: email.value,
                    message: message.value,
                }).then(() => {
                    // Success
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = 'Message sent successfully!';
                    contactForm.reset();
                    document.querySelectorAll('.form-input').forEach(input => {
                        input.classList.remove('success');
                    });
                }).catch((error) => {
                    // Error
                    formFeedback.className = 'form-feedback error';
                    formFeedback.textContent = 'Failed to send message. Please try again.';
                    console.error('EmailJS Error:', error);
                }).finally(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                });
                */

                // MOCK SUCCESS for demonstration
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = 'Message sent successfully! (Mock)';
                    contactForm.reset();
                    document.querySelectorAll('.form-input').forEach(input => {
                        input.classList.remove('success');
                    });
                    
                    // Clear feedback after 5 seconds
                    setTimeout(() => {
                        formFeedback.className = 'form-feedback';
                        formFeedback.textContent = '';
                    }, 5000);
                }, 1500);
            }
        });
    }

    /* ===== Active Navigation Link on Scroll ===== */
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active'); // Add active class CSS if wanted
            }
        });
    });
});
