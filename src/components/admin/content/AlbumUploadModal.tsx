
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Music, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import styles from './AlbumUploadModal.module.css'; // We'll create this CSS module next

interface AlbumUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface TrackInput {
    id: string; // temp id for UI
    title: string;
    file: File | null;
    isSingle: boolean;
}

export default function AlbumUploadModal({ isOpen, onClose, onSuccess }: AlbumUploadModalProps) {
    // Form State
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [genre, setGenre] = useState('Pop');
    const [albumType, setAlbumType] = useState('standard');
    const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [coverArt, setCoverArt] = useState<File | null>(null);
    const [tracks, setTracks] = useState<TrackInput[]>([{ id: '1', title: '', file: null, isSingle: false }]);

    // UI State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Mock progress

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverArt(e.target.files[0]);
        }
    };

    const addTrack = () => {
        setTracks([...tracks, { id: Math.random().toString(), title: '', file: null, isSingle: false }]);
    };

    const removeTrack = (index: number) => {
        const newTracks = [...tracks];
        newTracks.splice(index, 1);
        setTracks(newTracks);
    };

    const updateTrack = (index: number, field: keyof TrackInput, value: any) => {
        const newTracks = [...tracks];
        newTracks[index] = { ...newTracks[index], [field]: value };
        setTracks(newTracks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        // Validation
        if (!title || !coverArt || tracks.some(t => !t.title || !t.file)) {
            setError("Please fill in all fields and upload all files.");
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('year', year.toString());
            formData.append('genre', genre);
            formData.append('albumType', albumType);
            formData.append('releaseDate', releaseDate);
            formData.append('coverArt', coverArt);

            tracks.forEach((track, index) => {
                formData.append(`track_${index}_title`, track.title);
                if (track.file) formData.append(`track_${index}_file`, track.file);
                formData.append(`track_${index}_isSingle`, track.isSingle.toString());
            });

            // Mock Progress
            const interval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 500);

            const res = await fetch('/api/admin/albums/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(interval);

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Upload failed");
            }

            setUploadProgress(100);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={styles.modal}
                    >
                        <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>

                        <div className={styles.header}>
                            <h2>Upload New Album</h2>
                            <p>Add metadata, artwork, and audio files directly to S3.</p>
                        </div>

                        {error && (
                            <div className={styles.error}>
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {success ? (
                            <div className={styles.success}>
                                <CheckCircle size={48} />
                                <h3>Upload Complete!</h3>
                                <p>The album has been added to the library.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.grid}>
                                    <div className={styles.field}>
                                        <label>Album Title</label>
                                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Midnight Memories" required />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Year</label>
                                        <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))} required />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Genre</label>
                                        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} placeholder="e.g. Pop" required />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Album Type</label>
                                        <select value={albumType} onChange={e => setAlbumType(e.target.value)}>
                                            <option value="standard">Standard</option>
                                            <option value="studio">Studio</option>
                                            <option value="country">Country</option>
                                            <option value="live">Live</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Release Date</label>
                                        <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} required />
                                    </div>
                                </div>

                                {/* Cover Art Upload */}
                                <div className={styles.uploadSection}>
                                    <label>Cover Artwork</label>
                                    <label
                                        htmlFor="coverArtInput"
                                        className={styles.dropzone}
                                        style={{ borderColor: coverArt ? '#4ade80' : '#333', cursor: 'pointer' }}
                                    >
                                        {coverArt ? (
                                            <div className={styles.fileSelected}>
                                                <ImageIcon size={24} />
                                                <span>{coverArt.name}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload size={24} />
                                                <span>Click to upload cover art (JPG/PNG)</span>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        id="coverArtInput"
                                        type="file"
                                        onChange={handleCoverArtChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                {/* Track List */}
                                <div className={styles.trackSection}>
                                    <div className={styles.trackHeader}>
                                        <label>Tracks</label>
                                        <button type="button" onClick={addTrack} className={styles.addBtn}>+ Add Track</button>
                                    </div>

                                    <div className={styles.trackList}>
                                        {tracks.map((track, i) => (
                                            <div key={track.id} className={styles.trackRow}>
                                                <span className={styles.trackNum}>{i + 1}</span>
                                                <input
                                                    type="text"
                                                    placeholder="Track Title"
                                                    value={track.title}
                                                    onChange={(e) => updateTrack(i, 'title', e.target.value)}
                                                    className={styles.trackTitleInput}
                                                    required
                                                />
                                                <div className={styles.fileInputWrapper}>
                                                    <label htmlFor={`file-${track.id}`} className={styles.fileLabel}>
                                                        {track.file ? <CheckCircle size={14} color="#4ade80" /> : <Music size={14} />}
                                                        {track.file ? "Ready" : "Select Audio"}
                                                    </label>
                                                    <input
                                                        id={`file-${track.id}`}
                                                        type="file"
                                                        onChange={(e) => e.target.files && updateTrack(i, 'file', e.target.files[0])}
                                                        accept="audio/*"
                                                        hidden
                                                    />
                                                </div>
                                                <div className={styles.singleToggle}>
                                                    <input
                                                        type="checkbox"
                                                        checked={track.isSingle}
                                                        onChange={(e) => updateTrack(i, 'isSingle', e.target.checked)}
                                                    />
                                                    <span>Single?</span>
                                                </div>
                                                {tracks.length > 1 && (
                                                    <button type="button" onClick={() => removeTrack(i)} className={styles.removeBtn}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.footer}>
                                    <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isSubmitting}>Cancel</button>
                                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="spin" />
                                                Uploading... {uploadProgress}%
                                            </>
                                        ) : 'Upload Album'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
