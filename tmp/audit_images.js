const fs = require('fs');
const path = require('path');

const albumsJsonPath = path.join(__dirname, '../src/data/albums.json');
const artbooksDir = path.join(__dirname, '../public/images/artbooks');

const albumsData = JSON.parse(fs.readFileSync(albumsJsonPath, 'utf8'));

const report = [];

albumsData.forEach(album => {
    // Determine the artbook directory
    const slug = album.id; // Usually the slug
    const artbookPath = path.join(artbooksDir, slug);
    const hasArtbookFolder = fs.existsSync(artbookPath);
    
    let mainImg = false;
    let sketchImg = false;
    let desktopImg = false;
    let mobileImg = false;
    let statusText = "❌ Missing Artbook Folder";

    if (hasArtbookFolder) {
        mainImg = fs.existsSync(path.join(artbookPath, 'main.png')) || fs.existsSync(path.join(artbookPath, 'main.jpg'));
        sketchImg = fs.existsSync(path.join(artbookPath, 'sketch.png')) || fs.existsSync(path.join(artbookPath, 'sketch.jpg'));
        desktopImg = fs.existsSync(path.join(artbookPath, 'desktop.png')) || fs.existsSync(path.join(artbookPath, 'desktop.jpg'));
        mobileImg = fs.existsSync(path.join(artbookPath, 'mobile.png')) || fs.existsSync(path.join(artbookPath, 'mobile.jpg'));
        
        if (mainImg && sketchImg && desktopImg && mobileImg) {
            statusText = "✅ Complete Set";
        } else {
            statusText = "⚠️ Partial Set";
        }
    }

    report.push({
        title: album.title,
        id: slug,
        coverArtUrl: album.coverArt,
        hasArtbookFolder,
        mainImg,
        sketchImg,
        desktopImg,
        mobileImg,
        status: statusText
    });
});

const outPath = path.join(__dirname, '../tmp/artbook_raw_report.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log('Report generated at tmp/artbook_raw_report.json');
