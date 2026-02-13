# Specification: Home Base Clarity & UI De-cluttering

## Overview
This track focuses on simplifying the main dashboard interface by removing redundant manual controls and status notices, while simultaneously increasing the visual prominence of the user's "Home Base" city to improve immediate orientation.

## Functional Requirements
- **UI De-cluttering:**
    - Remove the "Verify DST Shift" button from the header.
    - Remove the "Social Guardrail Active" status notice from the status notice area.
    - Ensure the "Ideal Window" (Golden Hour) notice remains functional and visible when applicable.
    - Retain all underlying DST detection logic and automatic "DST SHIFT" badges on city rows.
- **Home Base Visibility:**
    - Enhance the `home-city-row` styling with a more prominent Amber (`#f59e0b`) left border and a subtle background gradient/glow.
    - Add a persistent "HOME" badge next to the city name in the Home city row, using the technical styling consistent with the project's brand.
- **UI & Experience Improvements:**
    - **Time Formatting:** Correct the time display to use proper colon-separated minutes (e.g., "4:30 pm" instead of "4.5 pm") across the entire application, including the scrubber and meeting suggestions.
    - **City Card Redesign:** Improve the overall aesthetic of city cards with better hierarchy, spacing, and modern design principles, maintaining the "Architectural Precision" style.

## Non-Functional Requirements
- **Visual Consistency:** All new UI elements must use the existing color palette (specifically Amber #f59e0b) and typography (Plus Jakarta Sans/JetBrains Mono).
- **Performance:** UI updates must not introduce layout shifts or performance degradation in the main render loop.

## Acceptance Criteria
- [ ] The "Verify DST Shift" button is no longer present in the header.
- [ ] The "Social Guardrail Active" notice is no longer present.
- [ ] Imminent DST changes still trigger the automatic "DST SHIFT" badge on affected cities.
- [ ] The Home city row is immediately distinguishable from other rows via a high-contrast Amber border and background.
- [ ] A "HOME" badge is clearly visible next to the Home city's name.
- [ ] Times are consistently formatted with colons (e.g., 4:30 pm) instead of decimal points.
- [ ] City cards have a significantly improved, award-winning technical aesthetic.

## Out of Scope
- Changing the "Forbidden Zone" logic (11pm-7am).
- Modifying the city search or addition workflow.
