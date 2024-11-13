document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Show all projects initially
    projectCards.forEach(card => {
        card.style.display = 'block';
    });

    // Add active state to "All" button by default
    filterButtons[0].classList.add('bg-indigo-600', 'text-white');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white');
            });
            
            // Add active class to clicked button
            button.classList.add('bg-indigo-600', 'text-white');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // For "All" filter
                if (filterValue === 'all') {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                        });
                    }, 300);
                } else {
                    // For specific category filters
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'block';
                            requestAnimationFrame(() => {
                                card.style.opacity = '1';
                            });
                        }, 300);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = mobileMenuButton.querySelector('.hamburger');
    const closeIcon = mobileMenuButton.querySelector('.close');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        const currentScroll = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('text-indigo-600'));
                navLinks[index]?.classList.add('text-indigo-600');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust this value based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        updateActiveLink();
        
        // Add/remove background from nav based on scroll
        const nav = document.querySelector('nav');
        if (window.scrollY > 0) {
            nav.classList.add('bg-white/95');
            nav.classList.remove('bg-white/80');
        } else {
            nav.classList.remove('bg-white/95');
            nav.classList.add('bg-white/80');
        }
    });

    // Typing animation
    const typedTextSpan = document.getElementById("typed-text");
    const text = "Archana Patel";
    let index = 0;

    function type() {
        if (index < text.length) {
            typedTextSpan.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                typedTextSpan.textContent = '';
                index = 0;
                type();
            }, 2000); // Wait 2 seconds before restarting
        }
    }

    // Start the animation when the page loads
    typedTextSpan.textContent = '';
    type();
});
