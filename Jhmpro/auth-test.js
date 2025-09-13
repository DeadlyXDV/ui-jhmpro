// Test functions for JHMPRO Authentication System
// Call these functions from browser console to test

// Test logout functionality
function testLogout() {
    console.log('=== Testing Logout Functionality ===');
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('jhmpro_current_user');
    console.log('Current user before logout:', currentUser);
    
    // Call logout
    if (window.authManager) {
        window.authManager.logout();
    } else if (window.logoutUser) {
        window.logoutUser();
    } else {
        console.error('No logout function available');
        return;
    }
    
    // Check if all data is cleared after a short delay
    setTimeout(() => {
        console.log('=== Checking data after logout ===');
        console.log('Current user:', localStorage.getItem('jhmpro_current_user'));
        console.log('Session start:', localStorage.getItem('jhmpro_session_start'));
        console.log('Reset request:', localStorage.getItem('jhmpro_reset_request'));
        
        // Check all localStorage keys
        const remainingKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('jhmpro_')) {
                remainingKeys.push(key);
            }
        }
        
        if (remainingKeys.length === 0) {
            console.log('✅ All JHMPRO data cleared successfully!');
        } else {
            console.warn('⚠️ Some data still remains:', remainingKeys);
        }
    }, 500);
}

// Test session check
function testSessionCheck() {
    console.log('=== Testing Session Check ===');
    
    const currentUser = localStorage.getItem('jhmpro_current_user');
    
    console.log('Current user:', currentUser);
    
    if (currentUser) {
        console.log('User is logged in');
    } else {
        console.log('No user logged in');
    }
}

// Test force logout
function testForceLogout() {
    console.log('=== Testing Force Logout ===');
    
    if (window.forceLogout) {
        window.forceLogout('Testing force logout');
    } else {
        console.error('forceLogout function not available');
    }
}

// Simulate expired session
function simulateExpiredSession() {
    console.log('=== Simulating Expired Session ===');
    
    // Set session start to 31 minutes ago (past the 30-minute timeout)
    const expiredTime = Date.now() - (31 * 60 * 1000);
    localStorage.setItem('jhmpro_session_start', expiredTime.toString());
    
    console.log('Testing expired authentication...');
    
    // Clear current user to simulate expired state
    localStorage.removeItem('jhmpro_current_user');
    console.log('User authentication cleared');
}

// Clear all JHMPRO data manually
function clearAllData() {
    console.log('=== Manually Clearing All JHMPRO Data ===');
    
    // Clear localStorage
    const localKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('jhmpro_')) {
            localKeys.push(key);
        }
    }
    localKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log('Removed localStorage:', key);
    });
    
    // Clear sessionStorage
    if (typeof sessionStorage !== 'undefined') {
        const sessionKeys = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && key.startsWith('jhmpro_')) {
                sessionKeys.push(key);
            }
        }
        sessionKeys.forEach(key => {
            sessionStorage.removeItem(key);
            console.log('Removed sessionStorage:', key);
        });
    }
    
    console.log('✅ All JHMPRO data cleared!');
}

// Show current auth status
function showAuthStatus() {
    console.log('=== Current Authentication Status ===');
    
    const currentUser = localStorage.getItem('jhmpro_current_user');
    const sessionStart = localStorage.getItem('jhmpro_session_start');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        console.log('Logged in as:', user.fullName, '(' + user.userType + ')');
        console.log('Email:', user.email);
        console.log('Session started:', new Date(parseInt(sessionStart)));
        
        const sessionAge = Date.now() - parseInt(sessionStart);
        const remainingTime = (30 * 60 * 1000) - sessionAge;
        
        if (remainingTime > 0) {
            console.log('Session expires in:', Math.round(remainingTime / 1000 / 60), 'minutes');
        } else {
            console.log('⚠️ Session expired', Math.round(Math.abs(remainingTime) / 1000 / 60), 'minutes ago');
        }
    } else {
        console.log('Not logged in');
    }
    
    // Show all JHMPRO related storage
    console.log('\nLocalStorage keys:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('jhmpro_')) {
            console.log('-', key);
        }
    }
}

// Export functions to global scope for console access
window.testLogout = testLogout;
window.testSessionCheck = testSessionCheck;
window.testForceLogout = testForceLogout;
window.simulateExpiredSession = simulateExpiredSession;
window.clearAllData = clearAllData;
window.showAuthStatus = showAuthStatus;

console.log('🧪 JHMPRO Auth Test Functions Loaded');
console.log('Available functions:');
console.log('- testLogout()');
console.log('- testSessionCheck()');
console.log('- testForceLogout()');
console.log('- simulateExpiredSession()');
console.log('- clearAllData()');
console.log('- showAuthStatus()');
