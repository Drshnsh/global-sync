# Specification: DST Intelligence & Logic

## Overview
Daylight Savings Time (DST) transitions are a frequent source of coordination errors in global teams. This track implements a proactive intelligence system to detect, warn, and visualize the impact of upcoming DST changes.

## Goals
- **Proactive Awareness:** Detect when a selected city has an upcoming DST transition (within 7 days).
- **Visual Impact Analysis:** Show how the "Golden Hour" (common meeting window) will shift after the transition.
- **Minimalist UX:** Display warnings using high-contrast visual cues without cluttering the UI.

## Technical Requirements
- **Detection Logic:** Use the `Intl.DateTimeFormat` and `date-fns` (or vanilla JS date math) to compare timezone offsets at the current time vs. 7 days in the future.
- **Visualization:**
    - Add a "DST Warning" badge to city rows if a change is imminent.
    - Provide a "Future View" toggle to visualize the timeline for next week.
- **Calculations:** Recalculate `commonStartUTC` and `commonEndUTC` based on the future offsets when "Future View" is active.

## User Stories
1. As a team lead, I want to see a warning if London is moving to BST next week so I don't schedule a meeting that will be 1 hour off.
2. As a user, I want to toggle a "Future View" to see exactly how our common meeting window changes after the DST transition.
