const { isDSTImminent } = require('../src/utils/dst');

describe('isDSTImminent', () => {
    test('it should detect imminent DST change', () => {
        // London moves to BST on March 29, 2026
        const testDate = new Date('2026-03-25T12:00:00Z');
        const result = isDSTImminent('Europe/London', 7, testDate);
        expect(result.imminent).toBe(true);
        expect(result.nextOffset).toBe(1); // BST is UTC+1
    });

    test('it should not detect change if none is imminent', () => {
        const testDate = new Date('2026-01-15T12:00:00Z');
        const result = isDSTImminent('Europe/London', 7, testDate);
        expect(result.imminent).toBe(false);
    });

    test('it should detect change precisely 1 day before', () => {
        // US Daylight Savings starts March 8, 2026
        const testDate = new Date('2026-03-07T12:00:00Z');
        const result = isDSTImminent('America/New_York', 7, testDate);
        expect(result.imminent).toBe(true);
        expect(result.daysUntil).toBe(1);
    });
});
