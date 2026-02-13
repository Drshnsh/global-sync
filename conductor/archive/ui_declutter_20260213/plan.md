# Implementation Plan: Home Base Clarity & UI De-cluttering

This plan outlines the steps to simplify the UI and enhance the visibility of the Home Base city.

## Phase 1: UI De-cluttering
- [x] Task: Write Tests for UI Element Removal (bbcbdde)
    - [x] Create a test to verify that the "Verify DST Shift" button and "Social Guardrail" notice are absent from the DOM.
    - [x] Create a test to verify that the "Ideal Window" notice still renders when a common window exists.
- [x] Task: Remove Redundant UI Elements (bbcbdde)
    - [x] Remove the `#futureToggle` button from `index.html`.
    - [x] Remove the `#homeNotice` element from `index.html`.
    - [x] Update the `render` function to remove any logic that attempts to update these removed elements.
- [ ] Task: Conductor - User Manual Verification 'UI De-cluttering' (Protocol in workflow.md)

## Phase 2: Home Base Visual Enhancement
- [x] Task: Write Tests for Home Base UI (e3d0ca4)
    - [x] Verify that the Home city row has the enhanced CSS classes.
    - [x] Verify that the "HOME" badge is rendered within the Home city row.
- [x] Task: Enhance Home Row Styling (e3d0ca4)
    - [x] Update the `.home-city-row` CSS to increase the border thickness and add a subtle Amber glow/gradient.
    - [x] Ensure the styling adheres strictly to the Amber (`#f59e0b`) accent color.
- [x] Task: Implement "HOME" Badge (e3d0ca4)
    - [x] Modify the `render` function to inject a "HOME" badge next to the city name for the city marked `isHome: true`.
    - [x] Use `JetBrains Mono` and uppercase styling for the badge to match the project's technical aesthetic.
- [x] Task: Fix Time Formatting Logic (e3d0ca4)
    - [x] Identify all locations where `formatTime` or similar logic produces decimal minutes.
    - [x] Update `formatTime` to correctly handle fractional hours by converting them to minutes (e.g., `.5` -> `30`).
    - [x] Verify time formatting in scrubber, suggestions, and city cards.
- [x] Task: Conductor - User Manual Verification 'Home Base Visual Enhancement' (Protocol in workflow.md)

## Phase 3: City Card Redesign
- [x] Task: Research and Design Modern City Card Layout (e3d0ca4)
    - [x] Sketch a higher-hierarchy layout for city names, local times, and offsets.
    - [x] Improve spacing and typography within the left column of each row.
- [x] Task: Implement Redesigned City Cards (e3d0ca4)
    - [x] Update the HTML structure within the `render` function's row generation.
    - [x] Add/update CSS classes to support the new layout (e.g., refined borders, better glassmorphism effects).
- [x] Task: Conductor - User Manual Verification 'City Card Redesign' (Protocol in workflow.md)
