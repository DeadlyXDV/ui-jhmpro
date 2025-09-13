/**
 * JHMPRO Navigation Enhancement Script
 * Adds interactive features and navigation improvements
 */

// Navigation Enhancement Functions
const JHMPRONav = {
    
    // Initialize navigation enhancements
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupPageTransitions();
        this.setupBackButton();
        this.setupKeyboardNavigation();
        console.log('JHMPRO Navigation enhancements loaded');
    },

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Toggle hamburger icon
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });

            // Close menu when clicking on links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                });
            });
        }
    },

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
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
    },

    // Page transition effects
    setupPageTransitions() {
        // Add loading state to navigation links
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.href !== window.location.href) {
                    this.style.opacity = '0.7';
                    this.style.pointerEvents = 'none';
                    
                    // Add loading spinner if it's a button-style link
                    if (this.classList.contains('bg-primary-blue') || 
                        this.classList.contains('bg-secondary-blue')) {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + originalText;
                    }
                }
            });
        });
    },

    // Browser back button handling
    setupBackButton() {
        // Store the previous page in sessionStorage
        if (document.referrer && document.referrer.includes(window.location.origin)) {
            sessionStorage.setItem('jhmpro_previous_page', document.referrer);
        }

        // Handle back buttons that don't have specific hrefs
        document.querySelectorAll('.back-button:not([href])').forEach(button => {
            button.addEventListener('click', () => {
                const previousPage = sessionStorage.getItem('jhmpro_previous_page');
                if (previousPage) {
                    window.location.href = previousPage;
                } else {
                    window.history.back();
                }
            });
        });
    },

    // Keyboard navigation support
    setupKeyboardNavigation() {
        // Add keyboard support for navigation
        document.addEventListener('keydown', (e) => {
            // Alt + H for Home/Landing page
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                if (window.location.pathname.includes('admin') || window.location.pathname.includes('Customer')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
            
            // Alt + D for Dashboard
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                if (window.location.pathname.includes('admin')) {
                    window.location.href = 'admin-dashboard.html';
                } else if (window.location.pathname.includes('Customer')) {
                    window.location.href = 'dashboard-customer.html';
                } else {
                    // From main index, determine which dashboard to go to
                    window.location.href = 'Customer/dashboard-customer.html';
                }
            }
            
            // Alt + B for Booking
            if (e.altKey && e.key === 'b') {
                e.preventDefault();
                if (window.location.pathname.includes('Customer')) {
                    window.location.href = 'booking-service.html';
                } else {
                    window.location.href = 'Customer/booking-service.html';
                }
            }
            
            // Alt + S for Service History
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                if (window.location.pathname.includes('Customer')) {
                    window.location.href = 'service-history.html';
                } else {
                    window.location.href = 'Customer/service-history.html';
                }
            }
            
            // Alt + V for My Vehicles
            if (e.altKey && e.key === 'v') {
                e.preventDefault();
                if (window.location.pathname.includes('Customer')) {
                    window.location.href = 'my-vehicles.html';
                } else {
                    window.location.href = 'Customer/my-vehicles.html';
                }
            }
            
            // Escape to close mobile menu
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const mobileMenuButton = document.getElementById('mobile-menu-button');
                    const icon = mobileMenuButton?.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    },

    // Utility function to highlight current page in navigation
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const isInCustomerFolder = currentPath.includes('/Customer/');
        const isInAdminFolder = currentPath.includes('/admin/');
        
        // Handle admin sidebar navigation
        const adminSidebar = document.querySelector('#sidebar nav');
        if (adminSidebar && isInAdminFolder) {
            // Remove any existing active indicators
            adminSidebar.querySelectorAll('.bg-gray-primary.border-l-4').forEach(el => {
                el.classList.remove('bg-gray-primary', 'border-l-4', 'border-secondary-blue');
                el.classList.add('hover:bg-gray-primary');
                // Change icon color back to gray
                const icon = el.querySelector('i');
                if (icon) {
                    icon.classList.remove('text-secondary-blue');
                    icon.classList.add('text-gray-400');
                }
            });

            // Find the matching navigation link and set it as active
            adminSidebar.querySelectorAll('a').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.classList.add('bg-gray-primary', 'border-l-4', 'border-secondary-blue');
                    link.classList.remove('hover:bg-gray-primary');
                    // Change icon color to blue
                    const icon = link.querySelector('i');
                    if (icon) {
                        icon.classList.remove('text-gray-400');
                        icon.classList.add('text-secondary-blue');
                    }
                }
            });
        }
        
        // Handle customer sidebar navigation (if exists)
        const customerSidebar = document.querySelector('#sidebar nav');
        if (customerSidebar && isInCustomerFolder) {
            customerSidebar.querySelectorAll('a').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.classList.add('bg-gray-primary', 'border-l-4', 'border-secondary-blue');
                    const icon = link.querySelector('i');
                    if (icon) {
                        icon.classList.remove('text-gray-400');
                        icon.classList.add('text-secondary-blue');
                    }
                }
            });
        }
        
        // Handle regular navigation links
        document.querySelectorAll('nav a:not(#sidebar nav a), .sidebar a').forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Check for exact match or relative path match
            if (linkHref === currentPage || 
                (isInCustomerFolder && linkHref === `Customer/${currentPage}`) ||
                (isInAdminFolder && linkHref === `admin/${currentPage}`) ||
                (!isInCustomerFolder && !isInAdminFolder && linkHref === currentPage)) {
                link.classList.add('active', 'text-primary-blue');
                link.classList.remove('text-secondary-blue');
            }
        });

        // Handle header navigation active states
        const headerNavLinks = document.querySelectorAll('header nav a');
        headerNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Check if current page matches the link
            if ((linkHref === 'dashboard-customer.html' && currentPage === 'dashboard-customer.html') ||
                (linkHref === currentPage)) {
                link.classList.add('text-primary-blue', 'font-semibold');
                link.classList.remove('text-secondary-blue');
            }
        });
    },

    // Add breadcrumb navigation
    generateBreadcrumb() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;

        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const isInCustomerFolder = currentPath.includes('/Customer/');
        const isInAdminFolder = currentPath.includes('/admin/');
        
        const pageNames = {
            'index.html': 'Beranda',
            'dashboard-customer.html': 'Dashboard Customer',
            'booking-service.html': 'Booking Servis',
            'my-vehicles.html': 'Kendaraan Saya',
            'service-history.html': 'Riwayat Servis',
            'admin-dashboard.html': 'Admin Dashboard',
            'admin-booking.html': 'Manajemen Booking',
            'admin-customers.html': 'Manajemen Customer',
            'admin-services.html': 'Manajemen Layanan',
            'admin-inventory.html': 'Inventori',
            'admin-reports.html': 'Laporan',
            'admin-staff.html': 'Manajemen Staff'
        };

        const currentPageName = pageNames[currentPage] || 'Halaman';
        
        let breadcrumbHTML = '';
        
        if (isInCustomerFolder) {
            breadcrumbHTML = `
                <a href="../index.html" class="text-secondary-blue hover:text-primary-blue">Beranda</a>
                <span class="mx-2 text-gray-400">/</span>
                <a href="dashboard-customer.html" class="text-secondary-blue hover:text-primary-blue">Dashboard Customer</a>
                <span class="mx-2 text-gray-400">/</span>
                <span class="text-gray-600">${currentPageName}</span>
            `;
        } else if (isInAdminFolder) {
            breadcrumbHTML = `
                <a href="../index.html" class="text-secondary-blue hover:text-primary-blue">Beranda</a>
                <span class="mx-2 text-gray-400">/</span>
                <a href="admin-dashboard.html" class="text-secondary-blue hover:text-primary-blue">Admin Dashboard</a>
                <span class="mx-2 text-gray-400">/</span>
                <span class="text-gray-600">${currentPageName}</span>
            `;
        } else {
            breadcrumbHTML = `
                <span class="text-gray-600">${currentPageName}</span>
            `;
        }
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    JHMPRONav.init();
    JHMPRONav.highlightCurrentPage();
    JHMPRONav.generateBreadcrumb();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh any dynamic content when page becomes visible
        console.log('JHMPRO page is now visible');
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JHMPRONav;
}
