# Brickell Place Website

Simple, fast, family-oriented website for Brickell Place Condominium Association.

---

## 📁 File Structure

```
bpca-website/
├── index.html              # Main website (single page)
├── css/
│   ├── main.css           # Design system
│   └── responsive.css     # Mobile styles
├── js/
│   └── main.js            # Interactive features
├── images/
│   ├── hero/              # Hero background
│   └── gallery/           # 12 aerial photos
├── documents/
│   ├── newsletters/       # Latest newsletter
│   └── governing/         # 3 governing documents
└── BPCA-LOGO.png          # Logo
```

---

## 🔧 How to Update Content

### Update Newsletter (Monthly)

1. Replace `documents/newsletters/newsletter-latest.pdf` with new file
2. Edit `index.html` (line ~393 in footer)
3. Update month/year in the link text
4. Re-deploy

### Update Contact Info

1. Edit `index.html`
2. Find Contact section (line ~250)
3. Update phone, email, hours, etc.
4. Re-deploy

### Add Photos to Gallery

1. Optimize photo (resize to 1200px width, compress)
2. Copy to `images/gallery/`
3. Edit `js/main.js` (line ~15)
4. Add to `GALLERY_IMAGES` array:
   ```javascript
   { src: 'images/gallery/photo.jpg', alt: 'Description' }
   ```
5. Re-deploy

### Update Amenities

1. Edit `index.html`
2. Find Amenities section (line ~130)
3. Add/edit amenity card
4. Re-deploy

---

## 🎨 Brand Colors

- **Primary Teal**: `#5B9FAD` (from logo)
- **Accent Peach**: `#F4B566` (from newsletters)

---

## 🧪 Test Locally

```bash
# Open in browser
open index.html

# Or run local server
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📞 Current Contact Info

- **Address**: 1901 Brickell Ave, Box D, Miami, FL 33129
- **Phone/WhatsApp**: 305-854-5343
- **Email**: admin@brickellplace.net
- **Hours**: Monday-Friday, 9:00 AM - 4:00 PM
- **Portal**: https://brickellplaceiresidents.buildinglink.com/

---

## ✨ Features

- Single-page design with smooth scrolling
- 13+ amenities showcased
- Photo gallery with lightbox
- Fully responsive (mobile, tablet, desktop)
- No tracking or analytics
- Fast loading

---

**Version**: 1.0.0
