# Implementation Plan: Home Base Clarity & UI De-cluttering

This plan outlines the steps to simplify the UI and enhance the visibility of the Home Base city.

## Phase 1: UI De-cluttering
- [ ] Task: Write Tests for UI Element Removal
    - [ ] Create a test to verify that the "Verify DST Shift" button and "Social Guardrail" notice are absent from the DOM.
    - [ ] Create a test to verify that the "Ideal Window" notice still renders when a common window exists.
- [ ] Task: Remove Redundant UI Elements
    - [ ] Remove the `#futureToggle` button from `index.html`.
    - [ ] Remove the `#homeNotice` element from `index.html`.
    - [ ] Update the `render` function to remove any logic that attempts to update these removed elements.
- [ ] Task: Conductor - User Manual Verification 'UI De-cluttering' (Protocol in workflow.md)

## Phase 2: Home Base Visual Enhancement
- [ ] Task: Write Tests for Home Base UI
    - [ ] Verify that the Home city row has the enhanced CSS classes.
    - [ ] Verify that the "HOME" badge is rendered within the Home city row.
- [ ] Task: Enhance Home Row Styling
    - [ ] Update the `.home-city-row` CSS to increase the border thickness and add a subtle Amber glow/gradient.
    - [ ] Ensure the styling adheres strictly to the Amber (`#f59e0b`) accent color.
- [ ] Task: Implement "HOME" Badge
    - [ ] Modify the `render` function to inject a "HOME" badge next to the city name for the city marked `isHome: true`.
    - [ ] Use `JetBrains Mono` and uppercase styling for the badge to match the project's technical aesthetic.
- [ ] Task: Conductor - User Manual Verification 'Home Base Visual Enhancement' (Protocol in workflow.md)
