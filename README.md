# JHMPRO - Aplikasi Manajemen Bengkel

Aplikasi web untuk manajemen bengkel yang dibuat berdasarkan spesifikasi UI/UX yang komprehensif. Dibangun menggunakan HTML, CSS (Tailwind CSS), dan JavaScript vanilla untuk performa optimal.

## 🚀 Fitur Utama

### Landing Page
- Header navigation responsif dengan hamburger menu untuk mobile
- Hero section dengan gradient background dan CTA buttons
- Services section dengan cards interaktif dan hover effects
- Features section dengan icon dan deskripsi
- Testimonials section
- Footer lengkap dengan informasi kontak

### Dashboard Customer
- Sidebar navigation dengan menu yang mudah digunakan
- Stats cards dengan indikator trend
- Quick actions section untuk aksi cepat (termasuk kelola kendaraan)
- Recent bookings table
- Service history dan reminder notifications
- Manajemen kendaraan terintegrasi

### My Vehicles (Kendaraan Saya)
- Daftar semua kendaraan yang terdaftar
- Stats kendaraan (total, perlu servis, dll)
- Card view dengan informasi lengkap setiap kendaraan
- Quick booking dari halaman kendaraan
- Modal form untuk menambah kendaraan baru
- Integrasi dengan sistem booking

### Booking Service
- Multi-step form dengan progress indicator
- Form validation real-time
- Summary sidebar yang update otomatis
- Responsive design untuk semua perangkat

### Service History
- Filter dan search functionality
- Status badges dengan warna yang konsisten
- Action buttons untuk setiap service record
- Pagination untuk navigasi data

### Admin Dashboard
- Revenue chart menggunakan Chart.js
- Stats cards untuk monitoring KPI
- Recent bookings table dengan action buttons
- Quick actions panel
- Activity log dan top services

### Admin Booking Management
- Filter tabs untuk status booking
- Card-based layout untuk easy scanning
- Booking detail modal
- Progress tracking untuk booking in-progress
- Bulk actions dan search functionality

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1E3A8A` - Header, button utama, elemen penting
- **Secondary Blue**: `#3B82F6` - Aksen dan hover states
- **Light Blue**: `#EFF6FF` - Background cards dan sections
- **Success Green**: `#10B981` - Status berhasil
- **Warning Orange**: `#F59E0B` - Peringatan dan pending status
- **Danger Red**: `#EF4444` - Error dan cancel actions

### Typography
- **Font Family**: Inter atau system font stack
- **Hierarchy**: H1 (2.5rem) → H4 (1.25rem)
- **Body Text**: 1rem dengan line-height optimal

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📁 Struktur File

```
jhmpro/
├── index.html                 # Landing page
├── dashboard-customer.html    # Customer dashboard
├── booking-service.html       # Service booking form
├── service-history.html       # Customer service history
├── admin-dashboard.html       # Admin main dashboard
├── admin-booking.html         # Admin booking management
├── style.css                  # Custom CSS (opsional)
├── jhmpro_ui_specs.md        # UI/UX specifications
└── README.md                 # Dokumentasi project
```

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Semantic markup untuk accessibility
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **JavaScript**: Vanilla JS untuk interactivity
- **Font Awesome**: Icon library
- **Chart.js**: Untuk revenue charts di admin dashboard
- **Google Fonts**: Inter font family

## 🚀 Cara Menjalankan

1. **Clone atau download project**
   ```bash
   git clone [repository-url]
   cd jhmpro
   ```

2. **Buka di browser**
   - Buka `index.html` di browser untuk melihat landing page
   - Atau gunakan live server untuk development

3. **Menggunakan Live Server (Recommended)**
   ```bash
   # Jika menggunakan VS Code dengan Live Server extension
   # Klik kanan pada index.html > Open with Live Server
   
   # Atau menggunakan Python
   python -m http.server 8000
   
   # Atau menggunakan Node.js
   npx serve .
   ```

## 📱 Navigasi Antar Halaman

- **Landing Page** (`index.html`) → Entry point utama
- **Customer Dashboard** (`dashboard-customer.html`) → Dashboard pelanggan
- **Booking Service** (`booking-service.html`) → Form booking servis
- **Service History** (`service-history.html`) → Riwayat servis pelanggan
- **Admin Dashboard** (`admin-dashboard.html`) → Dashboard admin
- **Admin Booking** (`admin-booking.html`) → Manajemen booking admin

## ✨ Fitur UI/UX

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast support
- Focus indicators yang jelas

### Performance
- Optimized images dan assets
- Minimal JavaScript untuk fast loading
- CDN untuk external libraries
- Responsive images

### Mobile Experience
- Touch-friendly button sizes (min 44px)
- Swipe gestures untuk cards
- Hamburger menu untuk navigation
- Optimized viewport dan meta tags

### Animations & Interactions
- Smooth transitions (200-300ms)
- Hover effects pada interactive elements
- Loading states dan skeleton screens
- Micro-animations untuk feedback

## 🔧 Customization

### Mengubah Warna
Edit konfigurasi Tailwind di setiap file HTML:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-blue': '#YOUR_COLOR',
                // ... warna lainnya
            }
        }
    }
}
```

### Menambah Font
Ganti URL Google Fonts di `<head>` section:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Custom CSS
Tambahkan styling custom di `style.css` atau inline di HTML.

## 🔗 Navigation Structure

### Page Flow
```
Landing Page (index.html)
├── "Masuk" button → Customer Dashboard
├── "Daftar" button → Booking Service
├── "Mulai Sekarang" button → Booking Service
├── "Lihat Demo" button → Admin Dashboard
└── "Pelajari Lebih Lanjut" → Smooth scroll to services section

Customer Dashboard (dashboard-customer.html)
├── Sidebar: "Booking Servis" → Booking Service
├── Sidebar: "Riwayat Servis" → Service History
├── Quick Action: "Booking Servis Baru" → Booking Service
├── Quick Action: "Lihat Riwayat" → Service History
└── "Keluar" → Landing Page

Booking Service (booking-service.html)
├── "Kembali" button → Customer Dashboard
└── Header logo → Landing Page

Service History (service-history.html)
├── Sidebar navigation → Customer Dashboard, Booking Service
└── "Keluar" → Landing Page

Admin Dashboard (admin-dashboard.html)
├── Sidebar: "Manajemen Booking" → Admin Booking Management
├── Header logo → Landing Page
└── "Keluar" → Landing Page

Admin Booking Management (admin-booking.html)
├── Sidebar: "Dashboard" → Admin Dashboard
├── Header logo → Landing Page
├── Breadcrumb: "Dashboard" → Admin Dashboard
└── "Keluar" → Landing Page
```

### Mobile Navigation
- All pages include responsive hamburger menu for mobile devices
- Mobile menus automatically close when navigation links are clicked
- Smooth scrolling implemented for anchor links on landing page

## 🧪 Testing Navigation

### Navigation Test Checklist
- [x] Landing page CTA buttons link to correct pages
- [x] Mobile menu buttons function correctly
- [x] Customer dashboard sidebar navigation works
- [x] Admin dashboard navigation functions properly
- [x] All logout buttons redirect to landing page
- [x] Back buttons in forms return to appropriate dashboards
- [x] Breadcrumb navigation works in admin pages
- [x] Quick action buttons link to correct destinations
- [x] Header logos link back to landing page
- [x] Mobile responsive navigation menus

### Cross-Browser Compatibility
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)
- Progressive enhancement with fallbacks for older browsers

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

Untuk pertanyaan atau dukungan:
- Email: support@jhmpro.com
- Phone: +62 21 1234 5678
- WhatsApp: [Link WhatsApp]

## 🔄 Version History

- **v1.0.0** - Initial release dengan semua fitur utama
- Landing page, customer dashboard, booking system
- Admin dashboard dan booking management
- Responsive design dan accessibility features

---

**Dibuat dengan ❤️ untuk JHMPRO**
