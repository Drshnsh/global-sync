/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('UI Elements Existence', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Verify DST Shift button should be removed', () => {
        const futureToggle = document.getElementById('futureToggle');
        expect(futureToggle).toBeNull();
    });

    test('Social Guardrail Active notice should be removed', () => {
        const homeNotice = document.getElementById('homeNotice');
        expect(homeNotice).toBeNull();
    });

    test('Ideal Window notice should still exist', () => {
        const goldenHourNotice = document.getElementById('goldenHourNotice');
        expect(goldenHourNotice).not.toBeNull();
        expect(goldenHourNotice.textContent).toContain('Ideal Window');
    });
});
