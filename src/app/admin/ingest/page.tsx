
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Terminal, Zap, Trash2, AlertTriangle } from 'lucide-react';

export default function IngestPage() {
    const [folderName, setFolderName] = useState('');
    const [deleteTarget, setDeleteTarget] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const logContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const readStream = async (response: Response) => {
        if (!response.body) {
            setLogs(prev => [...prev, "❌ No response body received."]);
            return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            const lines = text.split('\n').filter(Boolean);
            setLogs(prev => [...prev, ...lines]);
        }
    };

    const handleIngest = async () => {
        if (!folderName) return;
        setIsRunning(true);
        setLogs([]); // clear old logs

        try {
            const response = await fetch('/api/admin/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderName })
            });
            await readStream(response);
        } catch (error) {
            setLogs(prev => [...prev, `❌ Network Error: ${error}`]);
        } finally {
            setIsRunning(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        if (!confirm(`⚠️ ARE YOU SURE?\n\nThis will remove "${deleteTarget}" from the website entirely.\n(Files remain on S3, but data is wiped).\n\nThis cannot be easily undone.`)) return;

        setIsDeleting(true);
        setLogs([]);

        try {
            const response = await fetch('/api/admin/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderName: deleteTarget })
            });
            await readStream(response);
        } catch (error) {
            setLogs(prev => [...prev, `❌ Network Error: ${error}`]);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#888', textDecoration: 'none' }}>
                <ArrowLeft size={16} /> Back to Admin
            </Link>

            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap color="#FFD700" fill="#FFD700" />
                Album Manager
            </h1>

            <p style={{ color: '#aaa', marginBottom: '2rem' }}>
                Manage full album lifecycles. Run locally.
            </p>

            {/* INGEST SECTION */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #4ade80', background: 'rgba(255,255,255,0.03)' }}>
                <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
                    🚀 Ingest New Album
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '1rem' }}>
                    Reads from folder: <code>Desktop/Singitpop/READY FOR WEBSITE/</code>
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Folder Name</label>
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            placeholder='e.g. October Boots'
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1.2rem'
                            }}
                        />
                    </div>
                    <button
                        onClick={handleIngest}
                        disabled={!folderName || isRunning || isDeleting}
                        className="primary-button"
                        style={{
                            height: '56px',
                            padding: '0 2rem',
                            fontSize: '1.2rem',
                            opacity: (!folderName || isRunning || isDeleting) ? 0.5 : 1,
                            cursor: (!folderName || isRunning || isDeleting) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            background: '#22c55e', // Green
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold'
                        }}
                    >
                        {isRunning ? <div className="spinner" style={{ width: 20, height: 20, borderTopColor: 'white', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', animation: 'spin 1s linear infinite' }}></div> : <Play fill="currentColor" size={20} />}
                        {isRunning ? 'Running...' : 'Run Magic'}
                    </button>
                </div>
            </div>

            {/* DELETE SECTION */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
                <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '1.4rem' }}>
                    <Trash2 size={24} /> Remove Album
                </h2>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '4px' }}>
                    <AlertTriangle size={18} color="#ef4444" style={{ marginTop: '2px' }} />
                    <p style={{ fontSize: '0.9rem', color: '#fca5a5', margin: 0 }}>
                        Removes the album from website data immediately. <br />
                        <b>Note:</b> Does not delete S3 files or Stripe products (Safety Precaution).
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#fca5a5' }}>Album Title</label>
                        <input
                            type="text"
                            value={deleteTarget}
                            onChange={(e) => setDeleteTarget(e.target.value)}
                            placeholder='e.g. October Boots'
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid #7f1d1d',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1.2rem'
                            }}
                        />
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={!deleteTarget || isRunning || isDeleting}
                        style={{
                            height: '56px',
                            padding: '0 2rem',
                            fontSize: '1.2rem',
                            background: '#7f1d1d',
                            border: '1px solid #991b1b',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            opacity: (!deleteTarget || isRunning || isDeleting) ? 0.5 : 1,
                            cursor: (!deleteTarget || isRunning || isDeleting) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem'
                        }}
                    >
                        {isDeleting ? <div className="spinner" style={{ width: 20, height: 20, borderTopColor: 'white', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', animation: 'spin 1s linear infinite' }}></div> : <Trash2 size={20} />}
                        {isDeleting ? 'Removing...' : 'Remove'}
                    </button>
                </div>
            </div>

            {/* Terminal Output */}
            <div style={{
                background: '#0d0d0d',
                borderRadius: '8px',
                border: '1px solid #333',
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', borderRadius: '8px 8px 0 0' }}>
                    <Terminal size={14} color="#888" />
                    <span style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'monospace' }}>ADMIN CONSOLE OUTPUT</span>
                </div>
                <div
                    ref={logContainerRef}
                    style={{
                        padding: '1rem',
                        fontFamily: 'monospace',
                        color: '#0f0',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        flex: 1,
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {logs.length === 0 ? <span style={{ color: '#555' }}>Waiting for command...</span> : logs.map((line, i) => (
                        <div key={i} style={{ opacity: 0.9, marginBottom: '2px' }}>{line}</div>
                    ))}
                    {(isRunning || isDeleting) && <span className="blink">_</span>}
                </div>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .blink { animation: blink 1s step-end infinite; }
                @keyframes blink { 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}
