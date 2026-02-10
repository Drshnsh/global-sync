# Implementation Plan: DST Intelligence & Logic

This plan outlines the steps to implement DST detection and visualization in Global Sync.

## Phase 1: Core DST Detection Logic [checkpoint: 5da9172]
- [x] Task: Research and Implement `isDSTImminent` Utility (3e5317c)
    - [x] Create a JS utility function to check if a timezone has an offset change in the next 7 days.
    - [x] Write unit tests for the detection logic using known DST transition dates.
- [x] Task: Integrate Detection into `render` Function (3a3468e)
    - [x] Update the `selectedCities` data structure to include a `hasDSTChange` flag.
    - [x] Modify the main `render` loop to run the detection for each city.
- [x] Task: Conductor - User Manual Verification 'Core DST Detection Logic' (Protocol in workflow.md) (5da9172)

## Phase 2: UI Implementation (Warnings & Badges) [checkpoint: dbc09ab]
- [x] Task: Design and Implement DST Warning Badge (2c4123d)
    - [x] Create a high-contrast (Amber/Indigo) badge for city rows.
    - [x] Ensure the badge is visible but non-intrusive, following the "Minimalist Self-Explanation" guideline.
- [x] Task: Implement Hover Tooltip for DST Details (2c4123d)
    - [x] Show the exact date and offset change when hovering over the DST badge.
- [x] Task: Conductor - User Manual Verification 'UI Implementation (Warnings & Badges)' (Protocol in workflow.md) (dbc09ab)

## Phase 3: Future View & Impact Analysis
- [ ] Task: Implement "Preview Next Week" Toggle
    - [ ] Add a global toggle to the header to shift the entire dashboard context +7 days.
- [ ] Task: Dynamic Recalculation for Future State
    - [ ] Ensure all business hour bars and the Common Time Overlay update to reflect future offsets when the toggle is active.
- [ ] Task: Conductor - User Manual Verification 'Future View & Impact Analysis' (Protocol in workflow.md)
