# Specification: Optimized Scaling & Minimal Scrolling

## Overview
This track focuses on refining the application's layout for maximum information density and adding high-value scheduling utilities. The goal is to create a professional, adaptive experience that works flawlessly on all devices while providing actionable scheduling tools.

## Functional Requirements
- **Fluid Adaptive Layout:**
    - Implement a responsive design that adapts to Desktops (large grid), Laptops (compact grid), and Tablets/Mobile (optimized vertical stack).
    - Page-level scrolling is eliminated; internal list scrolling is used for large city sets.
- **Sticky Navigation:** 
    - The "Location & Entity" column remains fixed on the left while the timeline scrolls horizontally on smaller viewports.
    - Header and Legend are pinned to the viewport boundaries.
- **Absolute Date & Scrubber Logic:**
    - Display specific dates (e.g., "11 Feb") next to each city.
    - These dates must update dynamically as the user scrubs across the 24h timeline.
- **Meeting Duration & Actionable Export:**
    - Add a "Duration" selector (30m, 1h, 2h).
    - Each "Best Slot" suggestion will now include a **"Send to Outlook"** link (using the `web.az-outlook.com` format) and a **"Copy Summary"** button for Slack/Email.
- **Feature Preservation:**
    - Ensure **DST Intelligence** (pulsing badges) and **Future View** (Preview Next Week) are fully integrated into the new layout.

## Technical Requirements
- **Modern Outlook Integration:** Use URL templates (`https://outlook.office.com/calendar/0/deeplink/compose?subject=...&startdt=...&enddt=...`) to allow instant calendar drafting.
- **CSS Grid/Flexbox:** Use a robust `display: grid` approach with `sticky` positioning for the location column.

## Acceptance Criteria
1. No page-level vertical scroll; the layout fits the viewport height.
2. Horizontal scrolling is intuitive on mobile/laptop, with city names staying visible.
3. Actual dates (e.g., "11 Feb") are clearly visible and accurate for every city.
4. "Best Slot" suggestions generate valid Outlook calendar links.
5. All previous features (DST, Future Mode, Home Base) function correctly in the new layout.

## Out of Scope
- Native mobile app wrappers (staying as a PWA-ready web app).
- Integration with external Calendar APIs requiring authentication.