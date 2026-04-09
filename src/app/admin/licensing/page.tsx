import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, FileText, AlertCircle, PlayCircle, DollarSign, ShieldAlert, Music } from 'lucide-react';
import styles from './page.module.css';
import { StatusActions, IssueCertificateButton } from './StatusActions';
import { getIssuedLicenses } from '@/lib/s3-storage';
import { CommercialArchiveView } from './CommercialArchive';

// Read JSON DBs natively on the server
function getTableData(filename: string) {
    const dbPath = path.join(process.cwd(), 'src', 'data', filename);
    try {
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
    } catch (e) {
        console.error('Error reading ' + filename, e);
    }
    return [];
}

export default async function AdminLicensingDashboard() {
    const licenses = getTableData('licenses.json').reverse(); // Newest first
    const quotes = getTableData('quotes.json').reverse();
    const whitelists = getTableData('whitelists.json').reverse();
    const advertTracks = getTableData('advertTracks.json');
    const issuedRegistry = await getIssuedLicenses();

    const pendingQuotes = quotes.filter((q: { status: string }) => q.status === 'pending').length;
    const pendingWhitelists = whitelists.filter((w: { status: string }) => w.status === 'pending').length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Link href="/admin" className={styles.backBtn}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1>Licensing Operations</h1>
                    <p>Manage sync licenses, commercial leads, and YouTube clearance claims.</p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <DollarSign size={24} className={styles.statIcon} style={{color: '#4ade80'}} />
                    <h3>Total Licenses Sold</h3>
                    <div className={styles.statValue}>{licenses.length}</div>
                </div>
                <div className={styles.statCard}>
                    <FileText size={24} className={styles.statIcon} style={{color: '#f472b6'}} />
                    <h3>Pending Quotes</h3>
                    <div className={styles.statValue}>{pendingQuotes}</div>
                </div>
                <div className={styles.statCard}>
                    <PlayCircle size={24} className={styles.statIcon} style={{color: '#ef4444'}} />
                    <h3>YouTube Disputes</h3>
                    <div className={styles.statValue}>{pendingWhitelists}</div>
                </div>
            </div>

            {/* LICENSING CHEAT SHEET (unchanged) */}
            <div className="mb-12 grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                        <PlayCircle size={20} /> YouTube &amp; TuneCore Guide
                    </h2>
                    <ul className="space-y-4 text-sm text-white/70 leading-relaxed">
                        <li>
                            <strong className="text-white">Whitelisting:</strong> TuneCore does NOT allow per-video whitelisting. It only whitelists entire channels. 
                        </li>
                        <li>
                            <strong className="text-white">Handling Claims:</strong> Tell the licensee to hit <strong>&quot;Dispute&quot;</strong> on YouTube and upload the PDF certificate we sent them. You can then release the claim in your TuneCore &quot;Disputes&quot; section.
                        </li>
                        <li>
                            <strong className="text-white">The Clean Strategy:</strong> For high-value tracks you sell often, consider disabling &quot;YouTube Monetization&quot; for that track in TuneCore entirely to avoid buyer headaches.
                        </li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/10 border border-pink-500/20 rounded-3xl p-8 backdrop-blur-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-400">
                        <ShieldAlert size={20} /> Rights &amp; Metadata Guide
                    </h2>
                    <ul className="space-y-4 text-sm text-white/70 leading-relaxed">
                        <li>
                            <strong className="text-white">Excel/Mood Update:</strong> To change mood mapping, edit the <code>moodMapping</code> object in <code>scripts/convertExcelToAlbums.js</code> and run <code>node scripts/convertExcelToAlbums.js</code> in your terminal.
                        </li>
                        <li>
                            <strong className="text-white">PDF Certificates:</strong> PDF generation is now active for all completed sales and quotes. Tracking is logged to S3.
                        </li>
                        <li>
                            <strong className="text-white">ASCAP Registration:</strong> Log into ASCAP &rarr; &quot;Register a Work&quot; &rarr; Enter Title + Writers (Gary Birrell 100%) + ISRC. This ensures you collect performance royalties.
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.tablesContainer}>
                
                {/* 1. COMPLETED LICENSES */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><CheckCircle2 size={20} color="#4ade80" /> Completed License Sales</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>License #</th>
                                    <th>Buyer Name</th>
                                    <th>Track</th>
                                    <th>Tier / Usage</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {licenses.length === 0 ? (
                                    <tr><td colSpan={6} className={styles.emptyState}>No completed licenses found.</td></tr>
                                ) : licenses.map((lic: any) => (
                                    <tr key={lic.id}>
                                        <td>{new Date(lic.date).toLocaleDateString()}</td>
                                        <td><code className="text-xs bg-white/5 px-2 py-1 rounded">{lic.certNo || 'NEW'}</code></td>
                                        <td><strong>{lic.buyerName}</strong><br/><small>{lic.buyerEmail}</small></td>
                                        <td>{lic.trackTitle}</td>
                                        <td>
                                            <span className={styles.badge}>{lic.licenseType.toUpperCase()}</span>
                                            <span className={styles.subBadge}>{lic.usage.toUpperCase()}</span>
                                        </td>
                                        <td>
                                            <IssueCertificateButton metadata={{
                                                buyerName: lic.buyerName,
                                                buyerEmail: lic.buyerEmail,
                                                trackTitle: lic.trackTitle,
                                                licenseType: lic.licenseType,
                                                usage: lic.usage,
                                                duration: 'perpetual',
                                                territory: 'Worldwide'
                                            }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 2. CUSTOM QUOTE REQUESTS */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><FileText size={20} color="#f472b6" /> Custom Quote Inbound Leads</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Lead Info</th>
                                    <th>Company</th>
                                    <th>Track Config</th>
                                    <th>Project Details</th>
                                    <th>Status / Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotes.length === 0 ? (
                                    <tr><td colSpan={6} className={styles.emptyState}>No pending quotes.</td></tr>
                                ) : quotes.map((quote: any) => (
                                    <tr key={quote.id}>
                                        <td>{new Date(quote.date).toLocaleDateString()}</td>
                                        <td><strong>{quote.name}</strong><br/><small>{quote.email}</small></td>
                                        <td>{quote.company}</td>
                                        <td>
                                            <strong>{quote.trackTitle}</strong><br/>
                                            <small>{quote.configuration.usage} | {quote.configuration.duration} | {quote.configuration.territory}</small>
                                        </td>
                                        <td style={{ maxWidth: '250px', whiteSpace: 'normal', fontSize: '0.85rem' }}>
                                            {quote.details}
                                        </td>
                                        <td>
                                            <StatusQuoteBadge status={quote.status} />
                                            <StatusActions
                                                id={quote.id}
                                                currentStatus={quote.status}
                                                action="update_quote_status"
                                                options={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'quoted', label: 'Quoted' },
                                                    { value: 'resolved', label: 'Resolved' },
                                                ]}
                                            />
                                            {quote.status === 'resolved' && (
                                                <IssueCertificateButton metadata={{
                                                    buyerName: quote.name,
                                                    buyerEmail: quote.email,
                                                    trackTitle: quote.trackTitle,
                                                    licenseType: 'Custom License',
                                                    usage: quote.configuration.usage,
                                                    duration: quote.configuration.duration,
                                                    territory: quote.configuration.territory
                                                }} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. YOUTUBE CLEARANCE TASKS */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><AlertCircle size={20} color="#ef4444" /> Content ID Clearance Desk</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date Logged</th>
                                    <th>Licensee Info</th>
                                    <th>Track</th>
                                    <th>YouTube URL</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {whitelists.length === 0 ? (
                                    <tr><td colSpan={5} className={styles.emptyState}>No YouTube clearance requests.</td></tr>
                                ) : whitelists.map((wl: any) => (
                                    <tr key={wl.id}>
                                        <td>{new Date(wl.date).toLocaleDateString()}</td>
                                        <td><strong>{wl.name}</strong><br/><small>{wl.email}</small></td>
                                        <td>{wl.trackTitle}</td>
                                        <td><a href={wl.youtubeUrl} target="_blank" rel="noreferrer" className={styles.urlLink}>{wl.youtubeUrl}</a></td>
                                        <td>
                                            <StatusWhitelistBadge status={wl.status} />
                                            <StatusActions
                                                id={wl.id}
                                                currentStatus={wl.status}
                                                action="update_whitelist_status"
                                                options={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'cleared', label: 'Cleared' },
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 4. ISSUED LICENSE REGISTRY (Persistence Registry) */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><ShieldAlert size={20} color="#38bdf8" /> Issued Certificate Registry (S3)</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Issued At</th>
                                    <th>Certificate ID</th>
                                    <th>Licensee</th>
                                    <th>Track Title</th>
                                    <th>Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issuedRegistry.length === 0 ? (
                                    <tr><td colSpan={5} className={styles.emptyState}>No certificates issued yet.</td></tr>
                                ) : issuedRegistry.map((reg: any) => (
                                    <tr key={reg.certNo}>
                                        <td>{new Date(reg.issuedAt).toLocaleString()}</td>
                                        <td><code className="text-xs bg-cyan-900/20 text-cyan-400 px-2 py-1 rounded border border-cyan-800/30">{reg.certNo}</code></td>
                                        <td>{reg.buyerName}</td>
                                        <td>{reg.trackTitle}</td>
                                        <td className="text-xs text-zinc-500 italic">{reg.usage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 5. COMMERCIAL ARCHIVE (ADVERT TRACKS) */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><Music size={20} color="#DA70D6" /> Commercial Archive (Sync for Brands)</h2>
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>
                            {advertTracks.length} high-fidelity assets ready for brand synchronization.
                        </p>
                    </div>
                    <CommercialArchiveView tracks={advertTracks} />
                </section>

            </div>
        </div>
    );
}

function StatusQuoteBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        pending: 'rgba(239,68,68,0.15)',
        quoted: 'rgba(251,191,36,0.15)',
        resolved: 'rgba(74,222,128,0.15)',
    };
    const textColors: Record<string, string> = {
        pending: '#f87171',
        quoted: '#fbbf24',
        resolved: '#4ade80',
    };
    return (
        <span style={{
            display: 'inline-block',
            background: colors[status] || 'transparent',
            color: textColors[status] || '#ccc',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '8px',
        }}>
            {status || 'pending'}
        </span>
    );
}

function StatusWhitelistBadge({ status }: { status: string }) {
    const isPending = !status || status === 'pending';
    return (
        <span style={{
            display: 'inline-block',
            background: isPending ? 'rgba(239,68,68,0.15)' : 'rgba(74,222,128,0.15)',
            color: isPending ? '#f87171' : '#4ade80',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '8px',
            border: isPending ? '1px dashed #ef4444' : 'none',
        }}>
            {isPending ? 'Need to Action' : 'Cleared'}
        </span>
    );
}
