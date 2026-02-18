# Timeline Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix four UX issues in the Global Sync timeline: (1) date label overlaps hour text at midnight blocks, (2) end-of-day per city is not visually distinct, (3) calendar date picker doesn't update the 7-day strip, (4) DST transitions need a prominent in-timeline callout.

**Architecture:** All changes are contained in `index.html` (single-file app). CSS changes go in the `<style>` block (lines ~27–383). JS changes go in the `<script>` block (lines ~500–889). No new files needed; `src/utils/dst.js` already exposes `isDSTImminent` with the data we need.

**Tech Stack:** Vanilla JS, Tailwind CDN (utility classes), CSS custom properties, flatpickr (calendar), `src/utils/dst.js` (DST util)

---

### Task 1: Fix date-marker-inline overlapping the hour label

**Problem:** `.date-marker-inline` is `position: absolute; top: 50%; transform: translateY(-50%)` — it vertically centres inside the 44px block, colliding with the hour text that's also centred. It needs to sit at the **top** of the block instead.

**File:** `index.html` — CSS block, `.date-marker-inline` rule (lines ~154–172)

**Step 1: Locate the rule**

Find `.date-marker-inline` in the `<style>` block. It currently reads:
```css
.date-marker-inline {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    ...
}
```

**Step 2: Replace `top` and `transform` values**

Change to pin the label to the top of the block with a small margin:
```css
.date-marker-inline {
    position: absolute;
    left: 4px;
    top: 3px;               /* was: top: 50% */
    transform: none;        /* was: translateY(-50%) */
    font-size: 7px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.65);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 2px 4px;
    border-radius: 3px;
    z-index: 10;
    white-space: nowrap;
}
```

**Step 3: Visual verify**

Open `index.html` in browser. At midnight columns (every 24h per city) you should see the date pill pinned to the top-left corner of the block, with the hour text (`12am` / `0:00`) visible below it without overlap.

**Step 4: Commit**

```bash
git add index.html
git commit -m "fix: pin date-marker-inline to top of block to avoid hour-text overlap"
```

---

### Task 2: Make end-of-business-day visually distinct per city

**Problem:** The current code only marks the *start* of business hours with `block-business` styling. There's no visual cue where a city's workday ends. World Time Buddy draws a clear right-edge marker on the last business hour block.

**File:** `index.html` — CSS block (add new rule) + JS `render()` function inside the `selectedCities.forEach` loop (line ~779–800).

**Step 1: Add the CSS class for end-of-day**

Add after the `.block-business` rule in `<style>`:
```css
/* Right-edge marker on last business-hour block */
.block-eod {
    border-right: 3px solid rgba(16, 185, 129, 0.55);
    box-shadow: inset -3px 0 8px rgba(16, 185, 129, 0.12);
}
```

**Step 2: Detect last business-hour block in the JS loop**

Inside `selectedCities.forEach`, the `for (let hTotal ...)` loop builds `hourBlocksHtml`. After computing `localH` and `isBusiness`, add:

```js
// localH of the NEXT block (to detect end-of-business transition)
const nextUtcHour = (hTotal + 1) - homeOffset;
const nextLocalH = ((nextUtcHour + offset) % 24 + 24) % 24;
const isEndOfBusiness = isBusiness && !(nextLocalH >= city.start && nextLocalH < city.end);
```

Then include `block-eod` in the class string:
```js
hourBlocksHtml += `<div class="hour-block ${typeClass} ${city.isHome ? 'block-home' : ''} ${isDayBoundary ? 'block-day-boundary' : ''} ${isEndOfBusiness ? 'block-eod' : ''}">${markerHtml}${utils.formatHourLabel(localH, is24Hour).replace(' ', '')}</div>`;
```

**Step 3: Visual verify**

For a city with business hours 9–18, the block at `localH === 17` (5pm, the last hour before 6pm) should show a bright green right border, clearly marking end of workday.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add end-of-day marker (block-eod) on last business-hour block per city"
```

---

### Task 3: Calendar picker syncs the 7-day date strip

**Problem:** `renderDateStrip()` always anchors to `today` regardless of which date is selected. When the user picks a date from the flatpickr calendar (e.g. next week), the 7-day strip still shows today + 6, not the picked date + 6.

**File:** `index.html` — JS `renderDateStrip()` function (lines ~559–573)

**Step 1: Locate the current anchor**

```js
function renderDateStrip() {
    dateStrip.innerHTML = '';
    const today = new Date(); today.setHours(0,0,0,0);   // ← always today
    for (let i = 0; i < 7; i++) {
        const d = new Date(today); d.setDate(today.getDate() + i);
```

**Step 2: Change anchor from `today` to `baseDate`**

Replace the `today` anchor with `baseDate` so the strip shows the selected date and the following 6 days:
```js
function renderDateStrip() {
    dateStrip.innerHTML = '';
    const anchor = new Date(baseDate); anchor.setHours(0,0,0,0);
    for (let i = 0; i < 7; i++) {
        const d = new Date(anchor); d.setDate(anchor.getDate() + i);
        const btn = document.createElement('button');
        const isActive = i === 0;   // baseDate itself is always the first/active button
        btn.className = `date-btn ${isActive ? 'active' : ''}`;
        btn.innerHTML = `<span class="text-[10px] font-black uppercase opacity-60">${d.toLocaleDateString('en-US', { weekday: 'short' })}</span><span class="text-lg font-black">${d.getDate()}</span>`;
        btn.onclick = () => { baseDate = new Date(d); render(); };
        dateStrip.appendChild(btn);
    }
    if (fpInstance) fpInstance.setDate(baseDate, false);
    else calendarPicker.value = baseDate.toISOString().split('T')[0];
}
```

**Step 3: Visual verify**

1. Open the app.
2. Pick a date 10 days from now in the calendar.
3. The 7-day strip should now show that date through +6 days, with the first button highlighted active.
4. Click any button in the strip — timeline updates to that date.

**Step 4: Commit**

```bash
git add index.html
git commit -m "fix: date strip anchors to selected baseDate instead of always today"
```

---

### Task 4: Prominent DST callout in the timeline

**Problem:** DST is currently only shown as a small badge in the city's left-panel label column. There is no visual marker on the timeline itself showing *where* the DST transition occurs and what cities are affected.

**Approach:** When `isDSTImminent` returns `{ imminent: true, daysUntil: N }`, compute the timeline column where the transition falls and render:
1. A full-height vertical "DST flash" marker line on the timeline (like a coloured now-marker).
2. A floating pill label above the city rows identifying the DST event.

**File:** `index.html` — CSS block (new rules) + JS `render()` function after city rows are appended.

**Step 1: Add CSS for the DST marker**

Add after `.now-marker` rule in `<style>`:
```css
/* DST transition marker */
.dst-marker {
    position: absolute;
    top: 0; bottom: 0;
    width: 2px;
    background: #fbbf24;
    z-index: 85;
    pointer-events: none;
    box-shadow: 0 0 12px rgba(251, 191, 36, 0.7), 0 0 4px rgba(251, 191, 36, 0.4);
}
.dst-marker-label {
    position: absolute;
    top: 4px;
    transform: translateX(-50%);
    background: rgba(251, 191, 36, 0.15);
    border: 1px solid rgba(251, 191, 36, 0.5);
    color: #fbbf24;
    font-size: 7px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 86;
    pointer-events: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
```

**Step 2: Add DST marker HTML element to `#citiesList`**

In the HTML, inside `#citiesList` (alongside `#nowMarker` and `#scrubber`), add a container div:
```html
<div id="dstMarkersContainer"></div>
```

Full updated `#citiesList` div:
```html
<div class="relative w-max" id="citiesList">
    <div id="commonTimeOverlay" class="common-time-overlay hidden"></div>
    <div id="scrubber" class="absolute top-0 bottom-0 hidden pointer-events-none z-[100]">
        <div class="scrubber-line"></div>
    </div>
    <div id="nowMarker" class="now-marker hidden"></div>
    <div id="dstMarkersContainer"></div>
</div>
```

**Step 3: Add `dstMarkersContainer` to JS constants block**

After `const nowMarker = document.getElementById('nowMarker');` add:
```js
const dstMarkersContainer = document.getElementById('dstMarkersContainer');
```

**Step 4: Render DST markers in `render()` after city rows**

After the now-marker block (after line ~826) and before the closing `}` of `render()`, add:

```js
// DST markers
dstMarkersContainer.innerHTML = '';
const gridWidth = TOTAL_HOURS * BLOCK_WIDTH;
selectedCities.forEach(city => {
    const cityOffset = utils.getTimezoneOffset(city.timezone, baseDate);
    const dstInfo = utils.isDSTImminent(city.timezone, 3, baseDate); // only within 3-day window
    if (!dstInfo.imminent) return;

    // The DST transition occurs at the start of day N from baseDate (in that city's time)
    // We approximate: daysUntil days from home-city midnight = timeline hour daysUntil*24
    // More precisely: find the UTC ms when the offset changes, then convert to timeline hour
    // Simple approach: transition is at midnight of the city's (daysUntil)th day from baseDate
    const dstDayStart = new Date(baseDate.getTime() + dstInfo.daysUntil * 24 * 3600000);
    // Find the UTC hour of that city's midnight:
    // city midnight UTC = dstDayStart - cityOffset * 3600000
    const cityMidnightUTC_ms = dstDayStart.getTime() - cityOffset * 3600000;
    // Timeline hour = (cityMidnightUTC_ms - homeMidnightUTC) / 3600000
    const timelineH = (cityMidnightUTC_ms - homeMidnightUTC) / 3600000;

    if (timelineH < 0 || timelineH > TOTAL_HOURS) return;

    const leftPx = timelineH * BLOCK_WIDTH + OFFSET_X;
    const direction = dstInfo.nextOffset > dstInfo.currentOffset ? '↑ +1h' : '↓ −1h';

    const marker = document.createElement('div');
    marker.className = 'dst-marker';
    marker.style.left = `${leftPx}px`;

    const label = document.createElement('div');
    label.className = 'dst-marker-label';
    label.style.left = `${leftPx}px`;
    label.textContent = `DST ${city.name} ${direction}`;

    dstMarkersContainer.appendChild(marker);
    dstMarkersContainer.appendChild(label);
});
```

Note: `homeMidnightUTC` is already computed earlier in `render()` as:
```js
const homeMidnightUTC = baseDate.getTime() + (-homeOffset) * 3600000;
```
Make sure this variable is defined before the DST block (it is, in the now-marker section).

**Step 5: Add DST to the legend**

In the legend `<div>` at the bottom of `<body>`, add:
```html
<div class="flex items-center gap-2">
    <div class="w-3 h-3 rounded" style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.5);"></div>
    <span class="text-[9px] font-bold uppercase tracking-widest">DST Change</span>
</div>
```

**Step 6: Visual verify**

To test without waiting for a real DST event, temporarily change the DST check window from `3` to `365` — it will then find any DST transition within a year and show the marker. You should see a gold vertical line on the timeline with a pill label like "DST London ↑ +1h". Revert back to `3` days after confirming.

**Step 7: Commit**

```bash
git add index.html
git commit -m "feat: add prominent DST transition markers on timeline with city label and direction"
```

---

## Summary of Changes

| Task | What changes | Key lines |
|------|-------------|-----------|
| 1 | `.date-marker-inline` CSS: `top: 3px`, `transform: none` | ~154–172 |
| 2 | New `.block-eod` CSS + `isEndOfBusiness` detection in render loop | ~779–800 |
| 3 | `renderDateStrip()`: anchor to `baseDate` not `today` | ~559–573 |
| 4 | New `.dst-marker` / `.dst-marker-label` CSS + `dstMarkersContainer` render | ~480–485, ~820+ |
