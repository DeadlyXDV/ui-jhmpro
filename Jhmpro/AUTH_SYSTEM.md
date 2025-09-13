# Sistem Autentikasi JHMPRO

Sistem login dan registrasi yang telah dibuat untuk aplikasi JHMPRO dengan fitur lengkap dan modern.

## File yang Dibuat

### Halaman Utama
- `login.html` - Halaman login dengan validasi dan demo credentials
- `register.html` - Halaman registrasi dengan pilihan user type (Admin/Customer)
- `forgot-password.html` - Halaman lupa password
- `reset-password.html` - Halaman reset password

### JavaScript Files
- `auth.js` - Authentication manager dengan localStorage
- `session.js` - Session management dan route protection

### CSS Updates
- `style.css` - Tambahan styling untuk halaman auth

## Fitur yang Tersedia

### 🔐 Login
- Validasi email dan password
- Demo credentials untuk testing
- Remember me functionality
- Social login buttons (UI only)
- Loading states dan error handling
- Auto-redirect berdasarkan user type

### 📝 Registrasi
- Validasi real-time
- Password strength indicator
- User type selection (Admin/Customer)
- Terms & conditions checkbox
- Duplicate email checking
- Success animation

### 🔑 Lupa Password
- Email validation
- Reset link simulation
- Success confirmation
- Help contact information

### 🛡️ Session Management
- 30 menit session timeout
- Auto-logout pada expired session
- Activity tracking
- Route protection

## Demo Credentials

### Admin
- **Email:** admin@jhmpro.com
- **Password:** admin123
- **Redirect:** admin/admin-dashboard.html

### Customer
- **Email:** customer@demo.com
- **Password:** customer123
- **Redirect:** Customer/dashboard-customer.html

## Cara Penggunaan

1. **Akses halaman login**: Buka `login.html`
2. **Testing**: Gunakan tombol "Fill Admin" atau "Fill Customer" untuk auto-fill credentials
3. **Registrasi baru**: Klik link "Daftar sekarang" di halaman login
4. **Lupa password**: Klik link "Lupa password?" di halaman login

## Integrasi dengan Halaman Existing

### Navigation Update
- Link "Masuk" dan "Daftar" di header sudah diupdate ke halaman auth
- Mobile menu juga sudah disesuaikan

### Route Protection
Untuk halaman yang memerlukan autentikasi, tambahkan:
```javascript
// Di awal file JavaScript halaman
RouteProtection.requireAuth(); // Untuk semua user
RouteProtection.requireRole('admin'); // Khusus admin
RouteProtection.requireRole('customer'); // Khusus customer
```

## Data Storage

### LocalStorage Keys
- `jhmpro_users` - Array semua user yang terdaftar
- `jhmpro_current_user` - User yang sedang login
- `jhmpro_session_start` - Timestamp session mulai
- `jhmpro_reset_request` - Data reset password request

## Fitur Teknis

### Validasi
- Email format validation
- Password strength checking
- Phone number validation
- Real-time error feedback

### Security
- Password hashing (Base64 untuk demo)
- Session timeout management
- CSRF protection ready
- Input sanitization

### UX/UI
- Smooth animations
- Ripple effects
- Loading states
- Responsive design
- Dark mode ready
- Error handling yang user-friendly

## Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Production Notes
Untuk production, pertimbangkan:
- Ganti localStorage dengan server-side authentication
- Implementasi proper password hashing (bcrypt)
- HTTPS enforcement
- Rate limiting
- Email service integration
- Database integration
