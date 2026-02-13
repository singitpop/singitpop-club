/**
 * Script to fix capitalization in albumData.ts
 * Ensures all album and track titles have proper title case
 */

const fs = require('fs');
const path = require('path');

const albumDataPath = path.join(__dirname, '../src/data/albumData.ts');

// Words that should remain lowercase in titles (articles, conjunctions, prepositions)
const lowercaseWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
    'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'is', 'it',
    'from', 'with', 'into', 'onto', 'upon', 'over', 'under'
]);

// Words that should always be uppercase
const uppercaseWords = new Set(['dj', 'uk', 'usa', 'nyc', 'la', 'tv', 'cd', 'ep', 'lp']);

function toTitleCase(str) {
    return str
        .split(' ')
        .map((word, index) => {
            const lowerWord = word.toLowerCase();

            // Always capitalize first and last word
            if (index === 0 || index === str.split(' ').length - 1) {
                // Check if it's an acronym that should be uppercase
                if (uppercaseWords.has(lowerWord)) {
                    return word.toUpperCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }

            // Check if word should be all uppercase (acronyms)
            if (uppercaseWords.has(lowerWord)) {
                return word.toUpperCase();
            }

            // Check if word should remain lowercase
            if (lowercaseWords.has(lowerWord)) {
                return lowerWord;
            }

            // Capitalize first letter
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

function fixCapitalization() {
    console.log('Reading albumData.ts...');
    let content = fs.readFileSync(albumDataPath, 'utf8');

    let fixCount = 0;

    // Fix album titles
    content = content.replace(/"title":\s*"([^"]+)"/g, (match, title) => {
        const fixed = toTitleCase(title);
        if (fixed !== title) {
            console.log(`  Album/Track: "${title}" → "${fixed}"`);
            fixCount++;
        }
        return `"title": "${fixed}"`;
    });

    console.log(`\nFixed ${fixCount} titles`);
    console.log('Writing changes to albumData.ts...');

    fs.writeFileSync(albumDataPath, content, 'utf8');
    console.log('✅ Done!');
}

try {
    fixCapitalization();
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
