// Authentication utilities for JHMPRO
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('jhmpro_users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('jhmpro_users', JSON.stringify(this.users));
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const user = localStorage.getItem('jhmpro_current_user');
        return user ? JSON.parse(user) : null;
    }

    // Save current user to localStorage
    saveCurrentUser(user) {
        localStorage.setItem('jhmpro_current_user', JSON.stringify(user));
    }

    // Register new user
    register(userData) {
        // Check if email already exists
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Email sudah terdaftar');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            password: this.hashPassword(userData.password),
            userType: userData.userType,
            createdAt: new Date().toISOString(),
            isActive: true
        };

        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    // Login user
    login(email, password, rememberMe = false) {
        const user = this.users.find(u => u.email === email && u.isActive);
        
        if (!user) {
            throw new Error('Email tidak ditemukan');
        }

        if (!this.verifyPassword(password, user.password)) {
            throw new Error('Password salah');
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Save current user
        if (rememberMe) {
            this.saveCurrentUser(user);
        }

        return user;
    }

    // Logout user
    logout() {
        // Clear all user data
        const keysToRemove = [
            'jhmpro_current_user',
            'jhmpro_reset_request'
        ];
        
        // Clear localStorage items
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Clear any temporary auth data
        const tempKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('jhmpro_temp_')) {
                tempKeys.push(key);
            }
        }
        tempKeys.forEach(key => localStorage.removeItem(key));
        
        // Clear session storage as well
        if (typeof sessionStorage !== 'undefined') {
            const sessionKeys = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && key.startsWith('jhmpro_')) {
                    sessionKeys.push(key);
                }
            }
            sessionKeys.forEach(key => sessionStorage.removeItem(key));
        }
        
        this.currentUser = null;
        
        // Clear any auth-related cookies if they exist
        document.cookie.split(";").forEach(function(c) { 
            const eqPos = c.indexOf("=");
            const name = eqPos > -1 ? c.substr(0, eqPos) : c;
            if (name.trim().startsWith('jhmpro_')) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
        });
        
        // Show logout notification
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.show('Anda telah berhasil logout', 'info');
        }
        
        // Force redirect to login after a short delay
        setTimeout(() => {
            // Clear any remaining interval/timeout
            const highestTimeoutId = setTimeout(";");
            for (let i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
            
            const currentPath = window.location.pathname;
            if (currentPath.includes('/admin/')) {
                window.location.replace('../login.html');
            } else if (currentPath.includes('/Customer/')) {
                window.location.replace('../login.html');
            } else {
                window.location.replace('login.html');
            }
        }, 1000);
    }

    // Simple password hashing (in production, use proper hashing)
    hashPassword(password) {
        return btoa(password); // Base64 encoding for demo
    }

    // Verify password
    verifyPassword(password, hashedPassword) {
        return btoa(password) === hashedPassword;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get user by email
    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    // Password strength checker
    checkPasswordStrength(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[^A-Za-z0-9]/.test(password)
        };

        strength = Object.values(checks).filter(Boolean).length;

        if (strength < 2) return { score: 1, text: 'Lemah', class: 'strength-weak' };
        if (strength < 3) return { score: 2, text: 'Cukup', class: 'strength-fair' };
        if (strength < 4) return { score: 3, text: 'Baik', class: 'strength-good' };
        return { score: 4, text: 'Kuat', class: 'strength-strong' };
    }

    // Email validation
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Phone validation
    validatePhone(phone) {
        const re = /^[0-9]{10,13}$/;
        return re.test(phone.replace(/\D/g, ''));
    }

    // Initialize demo users
    initializeDemoUsers() {
        if (this.users.length === 0) {
            const demoUsers = [
                {
                    id: '1',
                    fullName: 'Admin JHMPRO',
                    email: 'admin@jhmpro.com',
                    phone: '08123456789',
                    password: this.hashPassword('admin123'),
                    userType: 'admin',
                    createdAt: new Date().toISOString(),
                    isActive: true
                },
                {
                    id: '2',
                    fullName: 'Customer Demo',
                    email: 'customer@demo.com',
                    phone: '08987654321',
                    password: this.hashPassword('customer123'),
                    userType: 'customer',
                    createdAt: new Date().toISOString(),
                    isActive: true
                }
            ];

            this.users = demoUsers;
            this.saveUsers();
        }
    }
}

// Form utilities
class FormUtils {
    static showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }

    static hideError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }

    static showLoading(buttonId, loadingText) {
        const button = document.getElementById(buttonId);
        const text = button.querySelector('[id$="Text"]');
        const spinner = button.querySelector('[id$="Spinner"]');
        
        if (text && spinner) {
            button.disabled = true;
            text.textContent = loadingText;
            spinner.classList.remove('hidden');
        }
    }

    static hideLoading(buttonId, originalText) {
        const button = document.getElementById(buttonId);
        const text = button.querySelector('[id$="Text"]');
        const spinner = button.querySelector('[id$="Spinner"]');
        
        if (text && spinner) {
            button.disabled = false;
            text.textContent = originalText;
            spinner.classList.add('hidden');
        }
    }

    static togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        const eye = document.getElementById(fieldId + 'Eye');
        
        if (field && eye) {
            if (field.type === 'password') {
                field.type = 'text';
                eye.classList.remove('fa-eye');
                eye.classList.add('fa-eye-slash');
            } else {
                field.type = 'password';
                eye.classList.remove('fa-eye-slash');
                eye.classList.add('fa-eye');
            }
        }
    }

    static addRippleEffect() {
        document.querySelectorAll('.ripple').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Notification system
class NotificationManager {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[type] || 'bg-blue-500';

        const icon = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        }[type] || 'fa-info-circle';

        notification.className += ` ${bgColor} text-white`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
}

// Simple route protection utilities
window.RouteProtection = {
    requireAuth: function(redirectUrl = 'login.html') {
        const currentUser = localStorage.getItem('jhmpro_current_user');
        if (!currentUser) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },

    requireRole: function(requiredRole, redirectUrl = 'index.html') {
        const userData = localStorage.getItem('jhmpro_current_user');
        if (!userData) {
            window.location.href = redirectUrl;
            return false;
        }
        
        const user = JSON.parse(userData);
        if (user.userType !== requiredRole) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.show('Anda tidak memiliki akses ke halaman ini.', 'error');
            }
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },

    preventAuthAccess: function(redirectUrl = null) {
        const userData = localStorage.getItem('jhmpro_current_user');
        if (userData) {
            const user = JSON.parse(userData);
            const defaultRedirect = user.userType === 'admin' 
                ? 'admin/admin-dashboard.html' 
                : 'Customer/dashboard-customer.html';
            
            window.location.href = redirectUrl || defaultRedirect;
            return false;
        }
        return true;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth manager
    window.authManager = new AuthManager();
    window.authManager.initializeDemoUsers();
    
    // Add ripple effects
    FormUtils.addRippleEffect();
    
    // Add global functions
    window.togglePassword = FormUtils.togglePassword;
    window.showNotification = NotificationManager.show;
});

// Global logout function that can be called from any page
window.logoutUser = function() {
    if (window.authManager) {
        window.authManager.logout();
    } else {
        // Fallback if authManager not available
        localStorage.removeItem('jhmpro_current_user');
        localStorage.removeItem('jhmpro_reset_request');
        
        // Clear temporary data
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('jhmpro_temp_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Show notification if available
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.show('Anda telah berhasil logout', 'info');
        }
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = '../login.html';
        }, 1000);
    }
};

// Get current user
window.getCurrentUser = function() {
    const userData = localStorage.getItem('jhmpro_current_user');
    return userData ? JSON.parse(userData) : null;
};

// Force logout function - clears everything and redirects immediately
window.forceLogout = function(reason = 'Session ended') {
    // Clear all localStorage
    const localKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('jhmpro_')) {
            localKeys.push(key);
        }
    }
    localKeys.forEach(key => localStorage.removeItem(key));
    
    // Clear all sessionStorage
    if (typeof sessionStorage !== 'undefined') {
        const sessionKeys = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && key.startsWith('jhmpro_')) {
                sessionKeys.push(key);
            }
        }
        sessionKeys.forEach(key => sessionStorage.removeItem(key));
    }
    
    // Clear cookies
    document.cookie.split(";").forEach(function(c) { 
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        if (name.trim().startsWith('jhmpro_')) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    });
    
    // Clear intervals and timeouts
    const highestTimeoutId = setTimeout(";");
    for (let i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    
    // Show notification
    if (typeof NotificationManager !== 'undefined') {
        NotificationManager.show(reason, 'warning');
    }
    
    // Immediate redirect
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/')) {
        window.location.replace('../login.html');
    } else if (currentPath.includes('/Customer/')) {
        window.location.replace('../login.html');
    } else {
        window.location.replace('login.html');
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, FormUtils, NotificationManager };
}
