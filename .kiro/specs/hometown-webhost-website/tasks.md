# Implementation Plan: Home Town Web Host Marketing Website

## Overview

This plan implements a static marketing website for Home Town Web Host using the Astro framework. The implementation follows a component-based architecture with static site generation, progressive enhancement for interactivity, and accessibility-first design. The website targets small local businesses and individuals seeking AI-enabled web hosting services.

The implementation will build from the foundation (project structure, base layouts, core components) through feature implementation (pages, forms, responsive behavior) to final polish (SEO, accessibility, performance optimization).

## Tasks

- [ ] 1. Initialize Astro project and configure build infrastructure
  - Create new Astro 5.x project with TypeScript support
  - Configure astro.config.mjs with site URL and build settings
  - Set up CSS structure (reset.css, global.css with custom properties)
  - Configure environment variables for contact endpoint
  - Create site configuration file (src/config.ts) with SiteConfig interface
  - Set up public directory structure for static assets
  - _Requirements: 8.3, 9.4, 9.6_

- [ ] 2. Create content collections and schemas
  - [ ] 2.1 Define content collection schemas in src/content/config.ts
    - Create testimonialsCollection schema with Zod validation
    - Create servicesCollection schema with Zod validation
    - Create pricingCollection schema with Zod validation
    - Export collections object
    - _Requirements: 1.3, 2.1, 3.1_

  - [ ]\* 2.2 Write unit tests for content collection schemas
    - Test schema validation with valid data for each collection
    - Test schema validation with invalid data (missing required fields, wrong types)
    - Test optional field handling
    - _Requirements: 1.3, 2.1, 3.1_

  - [ ] 2.3 Create sample content data files
    - Create at least 2 testimonial entries in src/content/testimonials/
    - Create service description entries for basic, AI-enabled, and custom plans
    - Create pricing plan entries for all service tiers
    - _Requirements: 1.3, 2.1, 3.1_

- [ ] 3. Build base layout and navigation components
  - [ ] 3.1 Create BaseLayout.astro with Props interface
    - Implement HTML document structure with semantic HTML5
    - Add meta tags (title, description, viewport, Open Graph)
    - Include global CSS imports and responsive meta tags
    - Render Header, slot content, and Footer components
    - _Requirements: 5.1, 7.1, 7.7, 9.1, 9.2, 9.3, 9.5_

  - [ ] 3.2 Create Header.astro component
    - Display company name/logo
    - Render navigation menu with Home, Services, Pricing, About, Contact links
    - Highlight active page based on Astro.url.pathname
    - Add aria-current attribute for active link
    - Ensure keyboard accessibility with proper focus indicators
    - _Requirements: 5.1, 5.2, 5.4, 10.5, 10.6_

  - [ ] 3.3 Create MobileMenu.astro component
    - Render hamburger menu icon for mobile viewports
    - Create collapsible navigation menu with vertical stack layout
    - Implement toggle functionality with TypeScript
    - Add focus trap for keyboard accessibility
    - Include proper ARIA attributes (aria-expanded, aria-controls)
    - _Requirements: 5.1, 5.2, 7.2, 10.5_

  - [ ] 3.4 Create Footer.astro component
    - Display Privacy Policy and Terms of Service links
    - Show copyright information with dynamic year
    - Add conditional social media links
    - Ensure all links keyboard accessible
    - Use semantic footer and nav elements
    - _Requirements: 11.1, 11.2, 11.3, 11.5, 11.6, 11.7_

  - [ ]\* 3.5 Write accessibility tests for navigation components
    - Test keyboard navigation through all navigation links
    - Test focus indicators visible on all interactive elements
    - Test mobile menu focus trap
    - Test ARIA attributes correctly applied
    - Run axe-core automated accessibility scan
    - _Requirements: 10.5, 10.6, 10.9_

- [ ] 4. Checkpoint - Verify base structure
  - Ensure all tests pass, verify base layout renders correctly, ask the user if questions arise.

- [ ] 5. Create reusable content components
  - [ ] 5.1 Create Hero.astro component
    - Implement Props interface with heading, subheading, ctaText, ctaLink, backgroundImage
    - Render large heading with proper heading hierarchy (H1)
    - Display value proposition text
    - Include prominent CTA button with proper touch target size
    - Support optional background image with contrast overlay
    - _Requirements: 1.1, 1.4, 7.5_

  - [ ] 5.2 Create ServiceCard.astro component
    - Implement Props interface with title, description, icon, features, link
    - Render service title and description
    - Display feature list with proper HTML list elements
    - Include optional icon with alt text
    - Add optional link with proper aria-label
    - _Requirements: 1.2, 2.2, 2.3, 10.1, 10.9_

  - [ ] 5.3 Create PricingCard.astro component
    - Implement Props interface with planName, prices, features, promotionalPrice, additionalCosts
    - Format prices using Intl.NumberFormat with USD currency, 2 decimal places
    - Display both monthly and annual pricing
    - Render promotional pricing with strikethrough on original price
    - Show promotion expiration date in readable format
    - Display additional costs separately from base price
    - List included features
    - Highlight popular plans with visual indicator
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 5.4 Create Testimonial.astro component
    - Implement Props interface with quote, author, businessName, businessType
    - Use semantic HTML (blockquote, cite elements)
    - Display customer quote with proper quotation marks
    - Show author and business information
    - _Requirements: 1.3_

  - [ ]\* 5.5 Write unit tests for price formatting logic
    - Test currency formatting for various amounts (9.99 → "$9.99", 100 → "$100.00", 0 → "$0.00")
    - Test promotional price display with expiration dates
    - Test additional costs calculation and display
    - Test edge cases (negative prices, extremely large prices)
    - _Requirements: 3.1, 3.5_

- [ ] 6. Implement form validation logic
  - [ ] 6.1 Create form-validation.ts module
    - Implement validation functions for name, email, phone, message, websiteName
    - Define error message constants matching design error messages
    - Create validateField function for individual field validation
    - Create validateForm function for full form validation
    - Implement formatPhoneNumber utility if needed
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.9, 4.10_

  - [ ]\* 6.2 Write unit tests for form validation
    - Test email validation with valid examples: "user@example.com", "name+tag@domain.co.uk"
    - Test email validation with invalid examples: "user", "user@", "@domain.com"
    - Test phone validation with valid examples: "+1-555-555-5555", "(555) 555-5555"
    - Test phone validation with invalid examples: "123abc", "phone number"
    - Test length limits at boundaries: 99, 100, 101 characters for name field
    - Test conditional website name validation logic
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.9, 4.10_

- [ ] 7. Create ContactForm.astro component with client-side behavior
  - [ ] 7.1 Build ContactForm.astro component structure
    - Create form with all required fields (name, hasExistingWebsite, websiteName, email, phone, message)
    - Add HTML5 validation attributes (required, maxlength, type, pattern)
    - Implement conditional rendering for websiteName field
    - Include hidden fields for timestamp and userAgent
    - Add proper label associations for all inputs
    - Include error message containers with aria-live regions
    - Display alternative contact methods (email, phone)
    - _Requirements: 4.1, 4.12, 10.7, 10.8_

  - [ ] 7.2 Implement client-side form validation script
    - Import validation functions from form-validation.ts
    - Add event listeners for blur events on each field
    - Display inline error messages below fields
    - Set aria-invalid and aria-describedby attributes
    - Clear errors when user corrects input
    - Prevent form submission if validation fails
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 10.8_

  - [ ] 7.3 Implement form submission logic
    - Handle form submit event
    - Display loading state during submission
    - Implement 30-second timeout
    - POST form data to configured endpoint
    - Handle successful response (display confirmation message)
    - Handle error responses (display error, preserve form data)
    - Handle timeout (display timeout message, preserve form data)
    - Handle network errors (display error, suggest alternatives)
    - _Requirements: 4.2, 4.3, 4.11_

  - [ ]\* 7.4 Write integration tests for contact form
    - Test form submission with valid data → verify endpoint called with correct payload
    - Test form submission with missing required fields → verify error messages displayed
    - Test endpoint returns error → verify error message and data preserved
    - Test endpoint timeout → verify timeout message and data preserved
    - Test conditional website name field logic
    - _Requirements: 4.2, 4.3, 4.11_

- [ ] 8. Checkpoint - Verify components and form functionality
  - Ensure all tests pass, manually test form validation and submission, ask the user if questions arise.

- [ ] 9. Create all page routes
  - [ ] 9.1 Create homepage (src/pages/index.astro)
    - Use BaseLayout with proper title and description
    - Render Hero component with company value proposition
    - Load and display testimonials from content collection (at least 2)
    - Render Services_Overview section with ServiceCard components
    - Include CTA button linking to pricing or contact page
    - Implement proper heading hierarchy (H1, H2, H3)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 9.3_

  - [ ] 9.2 Create services page (src/pages/services.astro)
    - Use BaseLayout with services-specific title and description
    - Load services from content collection
    - Render ServiceCard for each service type
    - Highlight AI features and their benefits for small businesses
    - Include technical specifications for each plan type
    - Show "specifications pending" message if technical specs unavailable
    - Include CTA linking to pricing or contact page
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 9.3 Create pricing page (src/pages/pricing.astro)
    - Use BaseLayout with pricing-specific title and description
    - Load pricing plans from content collection
    - Render PricingCard for each plan
    - Sort plans by order field
    - Ensure all prices displayed with 2 decimal places and $ symbol
    - Show promotional pricing where applicable
    - Display additional costs separately
    - Include CTAs for contacting or signing up
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 9.4 Create about page (src/pages/about.astro)
    - Use BaseLayout with about-specific title and description
    - Display mission statement (at least 50 words)
    - Describe target customer base (at least 2 business types)
    - Include statement about supporting local businesses
    - Add company founding information or team backgrounds
    - Include proper heading hierarchy
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 9.5 Create contact page (src/pages/contact.astro)
    - Use BaseLayout with contact-specific title and description
    - Render ContactForm component
    - Display alternative contact information prominently
    - Include proper heading hierarchy
    - _Requirements: 4.1, 4.12_

  - [ ] 9.6 Create legal pages (privacy.astro, terms.astro)
    - Create src/pages/privacy.astro with privacy policy content
    - Create src/pages/terms.astro with terms of service content
    - Use BaseLayout with appropriate titles and descriptions
    - Ensure proper heading hierarchy and readability
    - _Requirements: 11.2, 11.3_

  - [ ] 9.7 Create custom 404 page (src/pages/404.astro)
    - Use BaseLayout with 404-specific title
    - Display user-friendly error message
    - Include navigation back to home
    - Show main navigation menu
    - Maintain site branding
    - _Requirements: 5.6_

  - [ ]\* 9.8 Write snapshot tests for all pages
    - Snapshot test each page's HTML structure
    - Capture snapshots at different viewport sizes
    - Update snapshots when intentional design changes made
    - _Requirements: All page requirements_

- [ ] 10. Implement responsive design styles
  - [ ] 10.1 Create responsive CSS custom properties in global.css
    - Define breakpoint variables (--breakpoint-mobile: 768px, --breakpoint-tablet: 1024px)
    - Define spacing variables (--touch-target-min: 44px, --spacing-min: 8px)
    - Define typography scale with minimum font size (--font-size-mobile-min: 16px)
    - Define color palette with WCAG AA compliant contrast ratios
    - Create CSS Grid and Flexbox utility patterns
    - _Requirements: 7.5, 7.6, 7.8, 10.4_

  - [ ] 10.2 Implement mobile-first responsive layouts (<768px)
    - Apply single-column layout for all content sections
    - Stack navigation items vertically in mobile menu
    - Show hamburger menu icon, hide desktop navigation
    - Ensure all interactive elements have 44x44px touch targets
    - Ensure 8px minimum spacing between interactive elements
    - Set minimum font size to 16px
    - Prevent horizontal scrolling with proper overflow handling
    - Scale images to fit within viewport width
    - _Requirements: 7.1, 7.2, 7.5, 7.6, 7.7, 7.8, 7.9_

  - [ ] 10.3 Implement tablet responsive layouts (768px-1024px)
    - Apply two-column layout for content sections
    - Show horizontal navigation, hide hamburger menu
    - Maintain proper touch target sizes and spacing
    - Adjust typography scale for medium screens
    - _Requirements: 7.3_

  - [ ] 10.4 Implement desktop responsive layouts (>1024px)
    - Apply multi-column layout for content sections
    - Show full horizontal navigation
    - Optimize spacing and typography for large screens
    - Ensure proper max-width for readability
    - _Requirements: 7.4_

  - [ ]\* 10.5 Write responsive behavior integration tests
    - Test layout changes at 768px breakpoint
    - Test hamburger menu appears/disappears at 768px
    - Test touch target sizes on mobile (minimum 44x44px)
    - Test horizontal scrolling prevention at all viewport widths
    - Test image scaling within viewport boundaries
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.7, 7.9_

- [ ] 11. Checkpoint - Verify responsive design
  - Ensure all tests pass, manually test on different screen sizes, ask the user if questions arise.

- [ ] 12. Implement accessibility features
  - [ ] 12.1 Add image alt text and ARIA labels
    - Add descriptive alt text for all informational images
    - Mark decorative images with empty alt or role="presentation"
    - Add ARIA labels for icon-only buttons (hamburger menu, social links)
    - Ensure all interactive elements have accessible names
    - _Requirements: 10.1, 10.2, 10.3, 10.9_

  - [ ] 12.2 Implement keyboard focus management
    - Ensure visible focus indicators on all interactive elements (3:1 contrast ratio)
    - Implement logical tab order following visual reading sequence
    - Add focus trap for mobile menu when open
    - Ensure Escape key closes mobile menu
    - Test focus restoration when modals/menus close
    - _Requirements: 10.5, 10.6_

  - [ ] 12.3 Implement form accessibility enhancements
    - Associate all form labels with inputs using for/id or aria-labelledby
    - Add aria-required for required fields
    - Implement aria-invalid and aria-describedby for error messages
    - Create aria-live region for form submission status messages
    - Ensure error messages announced by screen readers
    - _Requirements: 10.7, 10.8_

  - [ ]\* 12.4 Write comprehensive accessibility tests
    - Run axe-core automated accessibility scan on all pages
    - Test keyboard navigation through all interactive elements
    - Verify focus indicators visible with 3:1 contrast ratio
    - Test screen reader announcements for form errors
    - Test mobile menu focus trap with keyboard
    - Verify color contrast ratios meet WCAG 2.1 AA standards (4.5:1 normal, 3:1 large)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_

- [ ] 13. Implement SEO optimization
  - [ ] 13.1 Add SEO meta tags to all pages
    - Ensure unique title tags on every page (50-60 characters)
    - Ensure unique meta descriptions on every page (150-160 characters)
    - Verify single H1 element per page
    - Verify sequential heading hierarchy (H1 → H2 → H3, no gaps)
    - Add Open Graph tags (og:title, og:description, og:image, og:url) to all pages
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

  - [ ] 13.2 Generate sitemap.xml and robots.txt
    - Configure Astro to generate sitemap.xml at build time
    - Include all public pages in sitemap
    - Create robots.txt allowing all search engine crawlers
    - Place both files at root URL path
    - _Requirements: 9.4, 9.6_

  - [ ]\* 13.3 Write SEO validation tests
    - Test meta title length between 50-60 characters on all pages
    - Test meta description length between 150-160 characters on all pages
    - Test single H1 per page and sequential heading levels
    - Test sitemap.xml exists and contains all pages
    - Test Open Graph tags present on all pages
    - Test robots.txt allows crawling
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 14. Implement performance optimizations
  - [ ] 14.1 Optimize images with Astro Image component
    - Replace img tags with Astro's Image component
    - Configure automatic WebP/AVIF conversion
    - Ensure all images < 500KB file size
    - Set appropriate image dimensions and aspect ratios
    - Implement lazy loading for below-fold images (loading="lazy")
    - Add proper width/height attributes to prevent layout shift
    - _Requirements: 8.2, 8.4_

  - [ ] 14.2 Optimize CSS and JavaScript bundles
    - Configure Astro build to minify CSS and JavaScript
    - Ensure CSS bundle < 100KB when transferred
    - Ensure JavaScript bundle < 300KB when transferred
    - Inline critical CSS in document head
    - Defer non-critical CSS and JavaScript
    - _Requirements: 8.3_

  - [ ] 14.3 Configure Astro build for performance
    - Enable Astro's build optimizations (minification, tree-shaking)
    - Configure static asset caching headers
    - Enable gzip/brotli compression
    - Optimize font loading with font-display: swap
    - Preload critical assets (fonts, hero images)
    - _Requirements: 8.1_

  - [ ]\* 14.4 Run performance tests with Lighthouse CI
    - Test First Contentful Paint < 3 seconds on 25 Mbps connection
    - Test image sizes < 500KB
    - Test CSS bundle < 100KB transferred
    - Test JavaScript bundle < 300KB transferred
    - Test lazy loading for below-fold images
    - Generate performance report
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 15. Final integration and verification
  - [ ] 15.1 Conduct cross-browser testing
    - Test on Chrome/Edge (latest)
    - Test on Firefox (latest)
    - Test on Safari (latest)
    - Test on Mobile Safari (iOS)
    - Test on Chrome Mobile (Android)
    - Document and fix any browser-specific issues
    - _Requirements: All requirements_

  - [ ]\* 15.2 Run end-to-end test suite
    - Test complete user journey: homepage → services → pricing → contact form submission
    - Test navigation flow between all pages
    - Test mobile menu open/close behavior
    - Test form validation and submission flow
    - Test responsive breakpoint transitions
    - _Requirements: All requirements_

  - [ ]\* 15.3 Run visual regression tests
    - Capture screenshots at all major breakpoints (375px, 768px, 1024px, 1440px)
    - Test all pages and major UI states
    - Test mobile menu open state
    - Test form error states
    - Compare against baseline screenshots
    - _Requirements: All requirements_

- [ ] 16. Final checkpoint - Production readiness verification
  - Ensure all tests pass, verify performance budgets met, verify accessibility compliance, ask the user if deployment configuration questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- Unit tests validate specific examples and edge cases for validation logic
- Integration tests validate component interactions and user flows
- Accessibility tests ensure WCAG 2.1 AA compliance
- Performance tests enforce performance budgets
- The website is built with Astro's static site generation for optimal performance
- Form validation uses HTML5 validation with progressive JavaScript enhancement
- Responsive design follows mobile-first approach with three breakpoints (mobile, tablet, desktop)
- All interactive elements meet accessibility standards with keyboard support and ARIA attributes
- SEO optimization includes proper meta tags, semantic HTML, and sitemap generation
- Property-based testing is not applicable for this primarily presentational feature

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1"]
    },
    {
      "id": 1,
      "tasks": ["2.1", "3.1"]
    },
    {
      "id": 2,
      "tasks": ["2.2", "2.3", "3.2", "3.4"]
    },
    {
      "id": 3,
      "tasks": ["3.3", "5.1", "5.2", "5.4"]
    },
    {
      "id": 4,
      "tasks": ["3.5", "5.3", "6.1"]
    },
    {
      "id": 5,
      "tasks": ["5.5", "6.2", "7.1"]
    },
    {
      "id": 6,
      "tasks": ["7.2"]
    },
    {
      "id": 7,
      "tasks": ["7.3"]
    },
    {
      "id": 8,
      "tasks": ["7.4", "9.1", "9.4", "9.6", "9.7"]
    },
    {
      "id": 9,
      "tasks": ["9.2", "9.5", "10.1"]
    },
    {
      "id": 10,
      "tasks": ["9.3", "9.8", "10.2"]
    },
    {
      "id": 11,
      "tasks": ["10.3"]
    },
    {
      "id": 12,
      "tasks": ["10.4"]
    },
    {
      "id": 13,
      "tasks": ["10.5", "12.1"]
    },
    {
      "id": 14,
      "tasks": ["12.2", "13.1"]
    },
    {
      "id": 15,
      "tasks": ["12.3", "13.2"]
    },
    {
      "id": 16,
      "tasks": ["12.4", "13.3", "14.1"]
    },
    {
      "id": 17,
      "tasks": ["14.2"]
    },
    {
      "id": 18,
      "tasks": ["14.3"]
    },
    {
      "id": 19,
      "tasks": ["14.4", "15.1"]
    },
    {
      "id": 20,
      "tasks": ["15.2", "15.3"]
    }
  ]
}
```
