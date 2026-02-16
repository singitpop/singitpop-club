export const capitalizeTitle = (title: string): string => {
    if (!title) return '';

    // Split into words, handle non-breaking spaces and hyphens if needed
    // Simple approach: standard space split
    return title
        .toLowerCase()
        .split(' ')
        .map(word => {
            // Keep small words lowercase unless it's the first word
            // But user specifically wants "Unspoken Fire" (both caps) even if "Fire" is debatable?
            // "Unspoken Fire" -> Capitalize all meaningful words.
            // Let's just capitalize first letter of EVERY word for simplicity and standard Title Case.
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};
