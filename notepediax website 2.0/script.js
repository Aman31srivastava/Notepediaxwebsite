document.addEventListener('DOMContentLoaded', function() {
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    // Sample search data (replace with actual content from your pages)
    const searchData = [
        { title: 'JEE Preparation Course', type: 'course', url: 'courses.html?category=jee' },
        { title: 'NEET Physics Notes', type: 'enote', url: 'enotes.html?subject=physics' },
        { title: 'Organic Chemistry Video', type: 'video', url: 'youtube.html?topic=organic' },
        { title: 'NDA Maths E-Notes and Videos', type: 'enote', url: 'youtube.html?topic=organic' },
        { title: 'Organic Chemistry Video', type: 'video', url: 'youtube.html?topic=organic' }
    ];

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        displayResults(results);
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            resultElement.innerHTML = `
                <a href="${result.url}">
                    <span class="result-type">${result.type}</span>
                    <span class="result-title">${result.title}</span>
                </a>
            `;
            searchResults.appendChild(resultElement);
        });

        searchResults.style.display = 'block';
    }

    // Event listeners
    searchButton.addEventListener('click', () => performSearch(searchInput.value));
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });
    // Welcome Popup - Enhanced
    const welcomePopup = document.getElementById('welcomePopup');
    const closePopup = document.getElementById('closePopup');
    
    function showWelcomePopup() {
        if (!localStorage.getItem('welcomePopupShown')) {
            welcomePopup.style.display = 'flex';
            welcomePopup.style.opacity = '0';
            
            // Fade in animation
            setTimeout(() => {
                welcomePopup.style.opacity = '1';
                welcomePopup.style.transition = 'opacity 0.3s ease';
            }, 10);
            
            localStorage.setItem('welcomePopupShown', 'true');
        }
    }

    function hideWelcomePopup() {
        welcomePopup.style.opacity = '0';
        setTimeout(() => {
            welcomePopup.style.display = 'none';
        }, 300);
    }

    if (welcomePopup && closePopup) {
        // Initialize popup
        showWelcomePopup();
        
        // Close button event
        closePopup.addEventListener('click', hideWelcomePopup);
        
        // Close when clicking outside content
        welcomePopup.addEventListener('click', function(e) {
            if (e.target === welcomePopup) {
                hideWelcomePopup();
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Carousel Functionality
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    const itemCount = items.length;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Auto-rotate carousel every 5 seconds
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);

    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // In a real app, you would send this to your server
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add active class to current nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id') || '';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'homepage.html')) {
                link.classList.add('active');
            }
        });
    });

    // Initialize active link on page load
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

// Homepage Todo List Functionality
if (document.getElementById('homepageTodoInput')) {
    const homepageTodoInput = document.getElementById('homepageTodoInput');
    const homepageAddBtn = document.getElementById('homepageAddBtn');
    const homepageTodoList = document.getElementById('homepageTodoList');
    const homepageRemainingCount = document.getElementById('homepageRemainingCount');
    
    let homepageTodos = JSON.parse(localStorage.getItem('homepageTodos')) || [];

    function renderHomepageTodos() {
        homepageTodoList.innerHTML = '';
        homepageTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            `;
            
            const checkbox = li.querySelector('.todo-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                li.classList.toggle('completed', todo.completed);
                updateHomepageStats();
                saveHomepageTodos();
                
                if (todo.completed) {
                    setTimeout(() => {
                        if (todo.completed) {
                            homepageTodos = homepageTodos.filter(t => t !== todo);
                            saveHomepageTodos();
                            renderHomepageTodos();
                        }
                    }, 1000);
                }
            });
            
            deleteBtn.addEventListener('click', () => {
                homepageTodos = homepageTodos.filter(t => t !== todo);
                saveHomepageTodos();
                renderHomepageTodos();
            });
            
            homepageTodoList.appendChild(li);
        });
        
        updateHomepageStats();
    }

    function updateHomepageStats() {
        const activeCount = homepageTodos.filter(todo => !todo.completed).length;
        homepageRemainingCount.textContent = activeCount;
    }

    function saveHomepageTodos() {
        localStorage.setItem('homepageTodos', JSON.stringify(homepageTodos));
    }

    homepageAddBtn.addEventListener('click', () => {
        const text = homepageTodoInput.value.trim();
        if (text) {
            homepageTodos.push({ text, completed: false });
            saveHomepageTodos();
            renderHomepageTodos();
            homepageTodoInput.value = '';
        }
    });

    homepageTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            homepageAddBtn.click();
        }
    });

    // Initial render
    renderHomepageTodos();
}
});
