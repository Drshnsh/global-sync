# Implementation Plan: DST Intelligence & Logic

This plan outlines the steps to implement DST detection and visualization in Global Sync.

## Phase 1: Core DST Detection Logic
- [x] Task: Research and Implement `isDSTImminent` Utility (3e5317c)
    - [ ] Create a JS utility function to check if a timezone has an offset change in the next 7 days.
    - [ ] Write unit tests for the detection logic using known DST transition dates.
- [ ] Task: Integrate Detection into `render` Function
    - [ ] Update the `selectedCities` data structure to include a `hasDSTChange` flag.
    - [ ] Modify the main `render` loop to run the detection for each city.
- [ ] Task: Conductor - User Manual Verification 'Core DST Detection Logic' (Protocol in workflow.md)

## Phase 2: UI Implementation (Warnings & Badges)
- [ ] Task: Design and Implement DST Warning Badge
    - [ ] Create a high-contrast (Amber/Indigo) badge for city rows.
    - [ ] Ensure the badge is visible but non-intrusive, following the "Minimalist Self-Explanation" guideline.
- [ ] Task: Implement Hover Tooltip for DST Details
    - [ ] Show the exact date and offset change when hovering over the DST badge.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation (Warnings & Badges)' (Protocol in workflow.md)

## Phase 3: Future View & Impact Analysis
- [ ] Task: Implement "Preview Next Week" Toggle
    - [ ] Add a global toggle to the header to shift the entire dashboard context +7 days.
- [ ] Task: Dynamic Recalculation for Future State
    - [ ] Ensure all business hour bars and the Common Time Overlay update to reflect future offsets when the toggle is active.
- [ ] Task: Conductor - User Manual Verification 'Future View & Impact Analysis' (Protocol in workflow.md)
