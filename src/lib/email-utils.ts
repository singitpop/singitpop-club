/**
 * Email utility functions for normalization and validation
 */

/**
 * Normalizes email addresses to handle Gmail/Googlemail equivalence
 * Google treats @gmail.com and @googlemail.com as the same account,
 * but Clerk and databases see them as different emails.
 * 
 * This function ensures consistent email handling across the application.
 * 
 * @param email - The email address to normalize
 * @returns Normalized email address with @googlemail.com converted to @gmail.com
 * 
 * @example
 * normalizeEmail('user@googlemail.com') // Returns: 'user@gmail.com'
 * normalizeEmail('user@gmail.com')      // Returns: 'user@gmail.com'
 * normalizeEmail('user@example.com')    // Returns: 'user@example.com'
 */
export function normalizeEmail(email: string): string {
    if (!email) return email;

    // Convert @googlemail.com to @gmail.com for consistency
    // This handles the UK legacy domain that Google still supports
    return email.toLowerCase().replace('@googlemail.com', '@gmail.com');
}

/**
 * Validates if an email address is properly formatted
 * 
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
