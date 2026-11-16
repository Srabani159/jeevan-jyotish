# Jeevan Jyotish

1. npm install
2. npm run dev   (open the URL shown, usually http://localhost:5173)
3. npm run build (production files go to dist/)

## Project structure

- `src/components/layout/` contains the shared site layout, header and footer.
- `src/components/astrology/` contains reusable astrology-themed visuals.
- `src/pages/` contains route-level pages, including the astrologer profile.
- `src/data/` contains service content used by the pages.
- `src/styles/` contains the site-wide and page-specific stylesheets.
- `src/assets/` contains images, videos and other static media.

Pages outside the home page are lazy-loaded at the route boundary. Edit shared contact
details in `src/components/layout/SiteHeader.jsx` and `src/components/layout/SiteFooter.jsx`.
