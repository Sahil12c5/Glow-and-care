# Glow & Care Store — Luxury Skincare & Botanical Apothecary

A modern, high-performance, responsive e-commerce web application for **Glow & Care Store**, built with **React**, **Vite**, and **Tailwind CSS**. Designed to attract new customers, build trust, drive online purchases, and bring foot traffic to physical store sanctuaries.

---

## Brand Theme & Aesthetic

Inspired directly by the **Glow & Care Store** logo:
- **Eucalyptus / Sage Teal** (`#5F8F7C` / `#4B7464`): Primary brand color representing botanical purity and calm.
- **Champagne Soft Gold** (`#D4B065` / `#C69943`): Accents, star ratings, and celebratory highlights.
- **Petal Blush Pink** (`#F5DAD2` / `#EBBCB0`): Soft accents, wishlist tags, and promotional badges.
- **Warm Luminous Cream** (`#FDFCF9` / `#FAF7F0`): Warm, inviting backdrop reflecting glass-skin glow.
- **Deep Espresso Charcoal** (`#1A202C` / `#2D3748`): High-contrast, readable typography.
- **Typography**: *Playfair Display* (luxury serif for headings) and *Plus Jakarta Sans* (clean sans-serif for body).
- **Dark Mode**: Deep forest emerald `#141A17` with champagne gold accents.

---

## Key Pages & Features

### 1. Home Page
- **Sticky Navbar**: Brand logo (`/logo.jpg`), navigation links, categories dropdown, search overlay trigger (`Ctrl+K` or `/`), wishlist counter badge, bag drawer trigger with live item count, theme switcher, and "Book In-Store Visit" CTA.
- **Hero Section**: Headline *"Glow Naturally. Care Deeply."*, value propositions, CTAs (*Shop The Collection* and *Visit Our Store*), and interactive floating product highlight card.
- **Shop by Category**: Visual collection cards for *Skincare, Hair Care, Makeup, Body Care, Men's Grooming,* and *Gift Sets*.
- **Tabbed Radiance Showcase**: Switch seamlessly between **Best Sellers** and **New Arrivals**.
- **Flash Sale Banner with Live Countdown Timer**: Active hours/minutes/seconds countdown with promo code `WELCOME20`.
- **"Why Choose Us" Pillars**: 100% genuine formulations, free express delivery over ₹999, 14-day returns, and licensed in-store estheticians.
- **Customer Testimonials**: 5-star verified reviews with customer roles and locations.
- **Online + Offline Sanctuary Showcase**: Feature card with opening hours, directions, and instant appointment booking.
- **Instagram Community Gallery**: Interactive gallery with hover overlays.
- **Newsletter Subscription**: Instant unlock of coupon code `GLOW10` upon signing up.

### 2. Shop / Product Listing Page
- **Multi-Factor Filters**:
  - Category selector (All, Skincare, Hair Care, Makeup, Body Care, Men's Grooming, Gift Sets)
  - Price range slider (₹500 to ₹5,000)
  - Brand checkboxes (AuraGlow Organics, Glow Essence, Botanica Pure, LuxeTress Botanical, Noble Grooming, Glow and Care Curated)
  - Skin & hair type checklists (All skin types, Dry & sensitive, Oily & combination, etc.)
  - Minimum star rating filters (4.8★+, 4.5★+, All)
  - In-stock availability toggle
- **Sorting Options**: Featured Curations, Price (Low to High), Price (High to Low), Highest Rated, Newest Arrivals.
- **Layout Switching**: Toggle between 3-column Grid view and Horizontal List view.
- **Pagination**: Paginated navigation with active page indicator.
- **Active Filter Chips**: Click-to-remove chips and "Clear All" reset button.

### 3. Product Detail Page
- **Zoomable Image Gallery**: Multi-image gallery with hover zoom and thumbnail switcher.
- **Pricing & Discounts**: Indian Rupee (`₹`) pricing, strikethrough original price, percentage saved badge, and stock indicators.
- **In-Store Availability Checker**: Live stock lookup across Mumbai, Delhi, and Bengaluru boutiques.
- **Tabbed Information**:
  1. *Full Description & Bio-Actives*
  2. *Ingredients & Clean Standard* (100% transparent list)
  3. *How to Use & Ritual Steps* (with pro tips)
  4. *Verified Customer Reviews* (with live review submission form)
- **Actions**: Quantity selector, "Add to Bag", instant "Buy Now" button, and wishlist toggle.
- **Related Products**: Dynamic carousel of complementary formulations.

### 4. Cart & Multi-Step Checkout
- **Sliding Cart Drawer**: Fast flyout cart accessible from any page.
- **Free Shipping Progress Bar**: Dynamic calculation toward the ₹999 threshold.
- **Coupon Engine**: Real-time validation for codes (`GLOW10`, `WELCOME20`, `CARE50`).
- **Complimentary Gift Wrap**: Option to include luxury gift packaging and a handwritten calligraphy message.
- **Multi-Step Checkout Flow**:
  1. *Shipping Details*: Customer name, email, phone, street address, and PIN.
  2. *Delivery Options*: Standard Doorstep Express vs. Free 60-Minute In-Store Boutique Pickup.
  3. *Payment Options*: UPI (GPay, PhonePe, Paytm, QR), Credit/Debit Cards, Cash on Delivery (COD), and Netbanking.
  4. *Celebratory Order Confirmation*: Confetti animation via `canvas-confetti`, order ID, live tracking number, and receipt summary.

### 5. Physical Store Locator
- Multi-city sanctuary switcher (Mumbai Flagship Sanctuary, New Delhi Heritage Boutique, Bengaluru Botanical Studio).
- High-resolution store images, full addresses, opening hours, direct phone links, and Google Maps iframe embed.
- Direct **WhatsApp Store Chat** link and "Book In-Store Visit" buttons.

### 6. In-Store Skin Consultation Booking Modal
- Reserve a complimentary in-person AI Dermascan appointment.
- Select preferred boutique sanctuary, date, time slot, and primary skin concern.
- Instant booking reference code and 15% in-store discount voucher.

### 7. About Us Page
- Brand philosophy: *Glow Naturally. Care Deeply.*
- Founder's letter and botanical formulation standards.
- Commitments to clean, cruelty-free, dermatologist-curated skincare.

### 8. Contact Page & Interactive FAQs
- Validated customer inquiry form.
- Direct phone, email, and WhatsApp desk links.
- Interactive FAQ accordion for shipping, in-store appointments, and clean beauty standards.

### 9. User Account Dashboard
- Customer VIP tier profile.
- **Order History**: Order status badges and step-by-step delivery progress timeline (*Order Placed -> Eco-Packed -> In Transit -> Delivered*).
- **Wishlist Manager**: View and manage saved items with instant Add to Bag buttons.
- **Saved Addresses**: Manage default shipping addresses.
- **Member Perks & Passes**: Digital 15% off boutique shopping pass.

### 10. Floating WhatsApp Concierge
- Fixed floating button with subtle pulse effect.
- Instant chat popup with pre-filled questions (*"Can I book a consultation today?"*, *"Check store stock"*).

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Social Icons
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Data Source**: Mock product and store catalogs in JSON (`src/data/products.json`, `src/data/stores.json`)
- **State Persistence**: HTML5 `localStorage` for cart, wishlist, user account, orders, and theme

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the directory
cd "glow and care store"

# Install all dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser at:
```
http://localhost:5173/
```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## Promo Codes Available for Demo Testing

- `GLOW10`: 10% off any order (no minimum spend)
- `WELCOME20`: 20% off for new radiance lovers (orders > $30)
- `CARE50`: $15 fixed discount on orders over $60
