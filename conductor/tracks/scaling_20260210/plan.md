# Implementation Plan: Optimized Scaling & Minimal Scrolling

This plan outlines the steps to implement a responsive, information-dense layout with sticky navigation and actionable scheduling tools.

## Phase 1: Foundation - Fluid Adaptive Layout [checkpoint: 5b88667]
- [x] Task: Re-engineer CSS for Viewport-Based Height (8b84549)
    - [x] Update `tailwind.config` with custom viewport utility classes.
    - [x] Implement a `flex flex-col h-screen` wrapper to eliminate page-level scrolling.
- [x] Task: Implement Sticky Navigation Grid (8b84549)
    - [x] Refactor the city list to use `sticky left-0` for the location column.
    - [x] Ensure horizontal scrolling is contained within the timeline area only.
- [x] Task: Conductor - User Manual Verification 'Fluid Adaptive Layout' (Protocol in workflow.md) (5b88667)

## Phase 2: Logic - Dynamic Absolute Dates [checkpoint: aa18582]
- [x] Task: Implement Absolute Date Utility (eb85499)
    - [x] Write tests for a date-formatting utility that handles day-wrapping logic.
    - [x] Integrate this utility into the `render` function to display labels like "11 Feb".
- [x] Task: Synchronize Dates with Scrubber (eb85499)
    - [x] Update the mouse-move logic to calculate and display the *relative date* for every city as you scrub across midnight.
- [x] Task: Conductor - User Manual Verification 'Dynamic Absolute Dates' (Protocol in workflow.md) (aa18582)

## Phase 3: Utility - Duration & Outlook Integration
- [~] Task: Build Meeting Duration Logic
    - [ ] Add a duration selector UI (30m, 1h, 2h).
    - [ ] Update the `suggestMeetings` algorithm to respect the selected duration.
- [ ] Task: Implement "Send to Outlook" Action
    - [ ] Create a utility to generate Outlook calendar deep-links from suggested slots.
    - [ ] Add the "Copy Summary" clipboard action for Slack integration.
- [ ] Task: Conductor - User Manual Verification 'Duration & Outlook Integration' (Protocol in workflow.md)

## Phase 4: Polish - Feature Integration & Mobile
- [ ] Task: Re-integrate DST & Future View
    - [ ] Ensure Pulsing Badges and Future Mode are properly positioned in the new sticky layout.
- [ ] Task: Mobile Vertical Stack Optimization
    - [ ] Implement media queries to transition from horizontal grid to a simplified vertical stack on narrow viewports.
- [ ] Task: Conductor - User Manual Verification 'Polish & Mobile' (Protocol in workflow.md)
