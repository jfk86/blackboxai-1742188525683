// Form validation
function validateForm(formElement) {
    const name = formElement.querySelector('#name').value.trim();
    const email = formElement.querySelector('#email').value.trim();
    const message = formElement.querySelector('#message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Reset previous error states
    clearErrors();
    
    let isValid = true;
    
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-red-500');
}

function clearErrors() {
    document.querySelectorAll('.text-red-500').forEach(el => el.remove());
    document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
}

// Search functionality with loading state
function handleSearch(e) {
    e.preventDefault();
    const button = document.querySelector('#search-button');
    const originalText = button.textContent;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Searching...
    `;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        button.disabled = false;
        button.textContent = originalText;
        
        // Show success message
        const searchResults = document.querySelector('#search-results');
        searchResults.innerHTML = `
            <div class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                Search completed! Contact our team for available packages.
            </div>
        `;
    }, 2000);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Contact form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(contactForm)) {
                const button = contactForm.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                
                // Show loading state
                button.disabled = true;
                button.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                `;
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset form and button state
                    contactForm.reset();
                    button.disabled = false;
                    button.textContent = originalText;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-md';
                    successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    contactForm.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    // Search form submission
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
