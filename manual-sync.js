"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_s3_1 = require("@aws-sdk/client-s3");
var XLSX = __importStar(require("xlsx"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
// Load env vars from .env.local
try {
    var envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        var envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach(function (line) {
            var _a = line.split('='), key = _a[0], value = _a[1];
            if (key && value) {
                process.env[key.trim()] = value.trim().replace(/"/g, '');
            }
        });
    }
}
catch (e) {
    console.warn("Could not load .env.local");
}
var s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});
var BUCKET_NAME = 'singitpop-music';
var ALBUMS_JSON_KEY = 'data/albums.json';
// Helper to stream S3 body to buffer
function streamToBuffer(stream) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var chunks = [];
                    stream.on('data', function (chunk) { return chunks.push(Buffer.from(chunk)); });
                    stream.on('error', function (err) { return reject(err); });
                    stream.on('end', function () { return resolve(Buffer.concat(chunks)); });
                })];
        });
    });
}
// Convert Excel Sheet to JSON
function parseExcel(buffer) {
    var workbook = XLSX.read(buffer, { type: 'buffer' });
    // Prefer 'Songs' sheet if it exists, otherwise default to first
    var sheetName = workbook.SheetNames.includes('Songs') ? 'Songs' : workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}
function runSync() {
    return __awaiter(this, void 0, void 0, function () {
        var excelKey, prefixes, _i, prefixes_1, prefix, listCmd, listRes, found, getCommand, s3Response, buffer, rawRows, listFoldersCmd, listFoldersRes, s3Folders, albumsMap, trackIdCounter, rowsByAlbum_1, _loop_1, _a, _b, _c, albumTitle, rows, albums, jsonBuffer, uploadCommand, error_1;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    console.log("Starting Manual Sync...");
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 14, , 15]);
                    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
                        console.error('Error: Missing AWS Credentials');
                        return [2 /*return*/];
                    }
                    // 1. Find Excel File (Check multiple locations)
                    console.log('Searching for Excel file...');
                    excelKey = null;
                    prefixes = ['admin/', 'metadata/', 'albums/covers/'];
                    _i = 0, prefixes_1 = prefixes;
                    _f.label = 2;
                case 2:
                    if (!(_i < prefixes_1.length)) return [3 /*break*/, 5];
                    prefix = prefixes_1[_i];
                    listCmd = new client_s3_1.ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix });
                    return [4 /*yield*/, s3Client.send(listCmd)];
                case 3:
                    listRes = _f.sent();
                    found = (_d = listRes.Contents) === null || _d === void 0 ? void 0 : _d.find(function (c) { return c.Key && c.Key.match(/\.xlsx?$|\.xlsl$/i); });
                    if (found) {
                        excelKey = found.Key;
                        return [3 /*break*/, 5];
                    }
                    _f.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!excelKey) {
                        console.error('Excel file not found.');
                        return [2 /*return*/];
                    }
                    console.log('Using Excel file:', excelKey);
                    getCommand = new client_s3_1.GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
                    return [4 /*yield*/, s3Client.send(getCommand)];
                case 6:
                    s3Response = _f.sent();
                    if (!s3Response.Body) {
                        console.error('Empty Excel file.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, streamToBuffer(s3Response.Body)];
                case 7:
                    buffer = _f.sent();
                    rawRows = parseExcel(buffer);
                    console.log("Parsed ".concat(rawRows.length, " rows."));
                    listFoldersCmd = new client_s3_1.ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: 'albums/', Delimiter: '/' });
                    return [4 /*yield*/, s3Client.send(listFoldersCmd)];
                case 8:
                    listFoldersRes = _f.sent();
                    s3Folders = ((_e = listFoldersRes.CommonPrefixes) === null || _e === void 0 ? void 0 : _e.map(function (p) { return p.Prefix; })) || [];
                    albumsMap = new Map();
                    trackIdCounter = 1;
                    rowsByAlbum_1 = new Map();
                    rawRows.forEach(function (row) {
                        var title = row['Album Title'] || row['Album']; // Fallback
                        if (!title)
                            return;
                        if (!rowsByAlbum_1.has(title))
                            rowsByAlbum_1.set(title, []);
                        rowsByAlbum_1.get(title).push(row);
                    });
                    _loop_1 = function (albumTitle, rows) {
                        var normalizedTitle, matchedFolderPrefix, slug_1, listFilesCmd, listFilesRes, files, coverFile, coverUrl, releaseDateVal, currentYear, year, releaseDateStr, excelEpoch, msPerDay, jsDate, parts, d, baseSlug, albumId, type, albumObj, _loop_2, _g, rows_1, row;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    normalizedTitle = albumTitle.toString().toLowerCase().trim();
                                    matchedFolderPrefix = s3Folders.find(function (prefix) {
                                        var _a;
                                        // prefix is "albums/Boots & Fall Roots/"
                                        // folderName is "boots & fall roots"
                                        var folderName = (_a = prefix.split('/')[1]) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim();
                                        return folderName === normalizedTitle;
                                    });
                                    // Fallback: Slug Match
                                    if (!matchedFolderPrefix) {
                                        slug_1 = normalizedTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                        matchedFolderPrefix = s3Folders.find(function (prefix) { return prefix.toLowerCase().includes(slug_1); });
                                    }
                                    if (!matchedFolderPrefix) {
                                        return [2 /*return*/, "continue"];
                                    }
                                    listFilesCmd = new client_s3_1.ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: matchedFolderPrefix });
                                    return [4 /*yield*/, s3Client.send(listFilesCmd)];
                                case 1:
                                    listFilesRes = _h.sent();
                                    files = listFilesRes.Contents || [];
                                    coverFile = files.find(function (f) {
                                        var name = f.Key.split('/').pop().toLowerCase();
                                        return name === 'cover.png' || name === 'cover.jpg';
                                    });
                                    coverUrl = coverFile ? "https://".concat(BUCKET_NAME, ".s3.eu-north-1.amazonaws.com/").concat(coverFile.Key) : null;
                                    releaseDateVal = rows[0]['Release Date'];
                                    currentYear = new Date().getFullYear();
                                    year = currentYear.toString();
                                    releaseDateStr = "".concat(currentYear, "-01-01");
                                    if (releaseDateVal) {
                                        // Excel stores dates as serial numbers (days since 1900-01-01)
                                        if (typeof releaseDateVal === 'number') {
                                            excelEpoch = new Date(1899, 11, 30);
                                            msPerDay = 24 * 60 * 60 * 1000;
                                            jsDate = new Date(excelEpoch.getTime() + releaseDateVal * msPerDay);
                                            if (!isNaN(jsDate.getTime()) && jsDate.getFullYear() > 1900 && jsDate.getFullYear() <= currentYear + 10) {
                                                year = jsDate.getFullYear().toString();
                                                releaseDateStr = jsDate.toISOString().split('T')[0];
                                            }
                                        }
                                        else if (typeof releaseDateVal === 'string') {
                                            parts = releaseDateVal.split(/[-/]/);
                                            if (parts.length === 3) {
                                                // Try YYYY-MM-DD format
                                                if (parts[0].length === 4) {
                                                    year = parts[0];
                                                    releaseDateStr = releaseDateVal;
                                                }
                                                // Try DD/MM/YYYY format
                                                else if (parts[2].length === 4) {
                                                    year = parts[2];
                                                    releaseDateStr = "".concat(parts[2], "-").concat(parts[1], "-").concat(parts[0]);
                                                }
                                            }
                                        }
                                        else {
                                            d = new Date(releaseDateVal);
                                            if (!isNaN(d.getTime()) && d.getFullYear() > 1900 && d.getFullYear() <= currentYear + 10) {
                                                year = d.getFullYear().toString();
                                                releaseDateStr = d.toISOString().split('T')[0];
                                            }
                                        }
                                    }
                                    baseSlug = albumTitle.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    albumId = "".concat(baseSlug, "-").concat(year);
                                    type = albumTitle.toLowerCase().includes('live') ? 'live' : 'studio';
                                    albumObj = {
                                        id: albumId,
                                        title: albumTitle,
                                        year: year,
                                        genre: rows[0]['Genre'] ? [rows[0]['Genre']] : ['Pop'],
                                        coverArt: coverUrl || "https://".concat(BUCKET_NAME, ".s3.eu-north-1.amazonaws.com/albums/covers/default.jpg"),
                                        tracks: [],
                                        releaseDate: releaseDateStr,
                                        folderPath: matchedFolderPrefix.split('/')[1],
                                        type: type
                                    };
                                    _loop_2 = function (row) {
                                        var songTitle = row['Song Title'] || row['Title'];
                                        if (!songTitle)
                                            return "continue";
                                        // Find audio files
                                        // Look for file that contains the song title (fuzzy match)
                                        // Normalize: "Golden Leaves..." -> "golden leaves"
                                        var normalize = function (s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); };
                                        var targetName = normalize(songTitle);
                                        // Helper to check if file is valid
                                        var isValidFile = function (key) {
                                            var fileName = key.split('/').pop() || '';
                                            var nameWithoutExt = fileName.replace(/\.(mp3|wav)$/i, '');
                                            if (/[-\s](1|2|3|4)$/.test(nameWithoutExt))
                                                return false;
                                            var lastThreeChars = nameWithoutExt.slice(-3).toLowerCase();
                                            if (lastThreeChars === 'you')
                                                return true;
                                            var lastChar = nameWithoutExt.slice(-1).toLowerCase();
                                            if (lastChar === 'u')
                                                return false;
                                            return true;
                                        };
                                        var mp3File = files.find(function (f) {
                                            var key = f.Key.toLowerCase();
                                            return key.endsWith('.mp3') && normalize(key).includes(targetName) && isValidFile(f.Key);
                                        });
                                        var wavFile = files.find(function (f) {
                                            var key = f.Key.toLowerCase();
                                            return key.endsWith('.wav') && normalize(key).includes(targetName) && isValidFile(f.Key);
                                        });
                                        var trackCoverUrl = null;
                                        var trackCover = files.find(function (f) {
                                            var key = f.Key.toLowerCase();
                                            var keyParts = key.split('/');
                                            if (keyParts.length >= 4) {
                                                var subfolderName = keyParts[2];
                                                var fileName = keyParts[keyParts.length - 1];
                                                var isCoverFile = fileName.startsWith('cover.') &&
                                                    (fileName.endsWith('.png') || fileName.endsWith('.jpg') ||
                                                        fileName.endsWith('.jpeg') || fileName.endsWith('.webp'));
                                                return normalize(subfolderName).includes(targetName) && isCoverFile;
                                            }
                                            return false;
                                        });
                                        if (trackCover) {
                                            trackCoverUrl = "https://".concat(BUCKET_NAME, ".s3.eu-north-1.amazonaws.com/").concat(trackCover.Key);
                                        }
                                        var isSingle = (row['Album/Single'] === 'Single') || (row['Genre'] && row['Genre'].toLowerCase().includes('single'));
                                        var track = {
                                            id: trackIdCounter++,
                                            title: songTitle,
                                            duration: row['Time'] || '3:30',
                                            plays: '0',
                                            price: 0.99,
                                            audioUrl: mp3File ? "https://".concat(BUCKET_NAME, ".s3.eu-north-1.amazonaws.com/").concat(mp3File.Key) : null,
                                            highResUrl: wavFile ? "https://".concat(BUCKET_NAME, ".s3.eu-north-1.amazonaws.com/").concat(wavFile.Key) : null,
                                            coverArt: trackCoverUrl,
                                            sourceFolder: albumObj.folderPath,
                                            albumId: albumId,
                                            isSingle: isSingle
                                        };
                                        albumObj.tracks.push(track);
                                    };
                                    // F. Process Tracks
                                    for (_g = 0, rows_1 = rows; _g < rows_1.length; _g++) {
                                        row = rows_1[_g];
                                        _loop_2(row);
                                    }
                                    if (albumObj.tracks.length > 0) {
                                        albumsMap.set(albumId, albumObj);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, _b = rowsByAlbum_1.entries();
                    _f.label = 9;
                case 9:
                    if (!(_a < _b.length)) return [3 /*break*/, 12];
                    _c = _b[_a], albumTitle = _c[0], rows = _c[1];
                    return [5 /*yield**/, _loop_1(albumTitle, rows)];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11:
                    _a++;
                    return [3 /*break*/, 9];
                case 12:
                    albums = Array.from(albumsMap.values());
                    // 5. Upload JSON
                    console.log("Generated ".concat(albums.length, " albums. Uploading..."));
                    jsonBuffer = Buffer.from(JSON.stringify(albums, null, 2));
                    uploadCommand = new client_s3_1.PutObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: ALBUMS_JSON_KEY,
                        Body: jsonBuffer,
                        ContentType: 'application/json',
                        CacheControl: 'max-age=60'
                    });
                    return [4 /*yield*/, s3Client.send(uploadCommand)];
                case 13:
                    _f.sent();
                    console.log('Upload Complete! Database updated.');
                    return [3 /*break*/, 15];
                case 14:
                    error_1 = _f.sent();
                    console.error('Sync failed:', error_1);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
runSync();
