import json
import os

ALBUMS_PATH = 'src/data/albums.json'

with open(ALBUMS_PATH, 'r') as f:
    albums = json.load(f)

# Track 10 and 11 fix for Echoes/Long Way Home (from my previous manual corruption)
# I need to ensure the structure is actually correct now.
# Since it's valid now, I'll just apply the Batch 5 restoration.

def upgrade_album(album_id_old, album_id_new, artbook_path):
    for album in albums:
        if album.get('id') == album_id_old:
            album['id'] = album_id_new
            album['artbook'] = {
                "path": artbook_path,
                "assets": {
                    "main": "main.png",
                    "sketch": "sketch.png",
                    "desktop": "desktop.png",
                    "mobile": "mobile.png"
                },
                "lyrics": True
            }
            # Update track.albumId
            for track in album.get('tracks', []):
                track['albumId'] = album_id_new
            print(f"Upgraded {album_id_old} to {album_id_new}")
            return True
    return False

def add_artbook_only(album_id, artbook_path):
    for album in albums:
        if album.get('id') == album_id:
            album['artbook'] = {
                "path": artbook_path,
                "assets": {
                    "main": "main.png",
                    "sketch": "sketch.png",
                    "desktop": "desktop.png",
                    "mobile": "mobile.png"
                },
                "lyrics": True
            }
            print(f"Added artbook to {album_id}")
            return True
    return False

# 1. Desert Winds and Open Roads (ID: desert-winds-and-open-roads-2026) - already has ID, just needs artbook
add_artbook_only("desert-winds-and-open-roads-2026", "/images/artbooks/desert-winds-and-open-roads-2026")

# 2. Dust and Diamonds
upgrade_album("dust-and-diamonds-2025", "dust-and-diamonds-2026", "/images/artbooks/dust-and-diamonds-2026")

# 3. Empire Under Lights
upgrade_album("empire-under-lights-2025", "empire-under-lights-2026", "/images/artbooks/empire-under-lights-2026")

# 4. Append missing Echoes of Yesterday and Always and Forever if not present
# (I'll check if they are already there)
existing_ids = [a.get('id') for a in albums]

new_albums = [
    {
        "id": "echoes-of-yesterday-2026",
        "title": "Echoes of Yesterday",
        "year": 2026,
        "genre": ["Country"],
        "coverArt": "cover.png",
        "tracks": [],
        "releaseDate": "2026-03-20",
        "folderPath": "Echoes of Yesterday",
        "mp3Count": 11,
        "type": "standard",
        "trending": False,
        "exclusive": False,
        "artbook": {
            "path": "/images/artbooks/echoes-of-yesterday-2026",
            "assets": { "main": "main.png", "sketch": "sketch.png", "desktop": "desktop.png", "mobile": "mobile.png" },
            "lyrics": True
        },
        "accessTier": "free"
    },
    {
        "id": "always-and-forever-2026",
        "title": "Always and Forever",
        "year": 2026,
        "genre": ["Pop"],
        "coverArt": "cover.png",
        "tracks": [],
        "releaseDate": "2026-03-20",
        "folderPath": "Always and Forever",
        "mp3Count": 11,
        "type": "standard",
        "trending": False,
        "exclusive": False,
        "artbook": {
            "path": "/images/artbooks/always-and-forever-2026",
            "assets": { "main": "main.png", "sketch": "sketch.png", "desktop": "desktop.png", "mobile": "mobile.png" },
            "lyrics": True
        },
        "accessTier": "free"
    }
]

for na in new_albums:
    if na['id'] not in existing_ids:
        albums.append(na)
        print(f"Added new album {na['id']}")

with open(ALBUMS_PATH, 'w') as f:
    json.dump(albums, f, indent=2)

print("Batch 5 Restoration Script Completed Successfully.")
