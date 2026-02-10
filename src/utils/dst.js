function getTimezoneOffset(tz, baseTime = new Date()) {
    try {
        const utcDate = new Date(baseTime.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(baseTime.toLocaleString('en-US', { timeZone: tz }));
        return (tzDate.getTime() - utcDate.getTime()) / 36e5;
    } catch (e) {
        return 0;
    }
}

function isDSTImminent(timezone, daysLimit = 7, baseDate = new Date()) {
    const currentOffset = getTimezoneOffset(timezone, baseDate);
    
    // Check offsets for each day in the limit
    for (let i = 1; i <= daysLimit; i++) {
        const futureDate = new Date(baseDate.getTime() + i * 24 * 36e5);
        const futureOffset = getTimezoneOffset(timezone, futureDate);
        
        if (futureOffset !== currentOffset) {
            return {
                imminent: true,
                currentOffset,
                nextOffset: futureOffset,
                daysUntil: i
            };
        }
    }
    
    return { imminent: false, currentOffset };
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
}

module.exports = { isDSTImminent, getTimezoneOffset, formatDate };