import { cn, sanitize, isValidEmail, isValidLength, formatDate } from '@/lib/utils';

describe('Utility Functions', () => {
    describe('cn()', () => {
        it('merges class names correctly', () => {
            expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
        });

        it('ignores false, null, and undefined values', () => {
             expect(cn('btn', false && 'active', null, undefined, 'primary')).toBe('btn primary');
        });
    });

    describe('sanitize()', () => {
        it('escapes HTML special characters', () => {
            expect(sanitize('<script>alert("XSS")</script>&')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;&amp;');
        });
    });

    describe('isValidEmail()', () => {
        it('returns true for valid emails', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name+tag@sub.domain.org')).toBe(true);
        });

        it('returns false for invalid emails', () => {
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('test@example')).toBe(false);
            expect(isValidEmail('not-an-email')).toBe(false);
        });
    });

    describe('isValidLength()', () => {
        it('returns true when string length is within bounds', () => {
            expect(isValidLength('hello', 3, 10)).toBe(true);
        });
        
        it('returns false when string is too short or too long', () => {
            expect(isValidLength('hi', 3, 10)).toBe(false);
            expect(isValidLength('this is too long', 3, 10)).toBe(false);
        });
    });

    describe('formatDate()', () => {
        it('formats the date string into month and year', () => {
            // Note: Output might vary slightly by locale, but en-US should be consistent on standard environments
            expect(formatDate('2024-05-15')).toContain('May');
            expect(formatDate('2024-05-15')).toContain('2024');
        });
    });
});
